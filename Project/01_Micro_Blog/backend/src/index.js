const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { createClient } = require('redis');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Metrics state (simple counter)
let requestCount = 0;

// Database connection configs from Environment variables
const dbConfig = {
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'microdb',
};

// Redis connection from Environment variables
const redisUrl = `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`;
let redisClient;
let mysqlPool;

async function initClients() {
    try {
        // Redis
        redisClient = createClient({ url: redisUrl });
        redisClient.on('error', (err) => console.log('Redis Client Error', err));
        await redisClient.connect();
        console.log('Connected to Redis successfully');

        // MySQL
        mysqlPool = mysql.createPool(dbConfig);
        console.log('Connected to MySQL successfully');
    } catch (err) {
        console.error('Error initializing clients:', err);
    }
}

initClients();

app.use((req, res, next) => {
    requestCount++;
    next();
});

// Health Probes for Kubernetes
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Service is healthy' });
});

app.get('/ready', async (req, res) => {
    try {
        await mysqlPool.query('SELECT 1');
        await redisClient.ping();
        res.status(200).json({ status: 'OK', message: 'Service is ready and connected to dependencies' });
    } catch (error) {
        res.status(503).json({ status: 'UNAVAILABLE', error: error.message });
    }
});

app.get('/metrics', (req, res) => {
    // Basic prometheus format metrics
    res.set('Content-Type', 'text/plain');
    res.send(`
# HELP http_requests_total The total number of HTTP requests.
# TYPE http_requests_total counter
http_requests_total ${requestCount}
`);
});

// API Routes
app.get('/api/users', async (req, res) => {
    try {
        const cacheKey = 'users:all';
        const cachedUsers = await redisClient.get(cacheKey);

        if (cachedUsers) {
            return res.json({ source: 'redis-cache', data: JSON.parse(cachedUsers) });
        }

        const [rows] = await mysqlPool.query('SELECT * FROM users');
        await redisClient.setEx(cacheKey, 60, JSON.stringify(rows)); // cache for 60 seconds

        res.json({ source: 'mysql-database', data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const [result] = await mysqlPool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        await redisClient.del('users:all'); // Invalidate cache on new write
        res.status(201).json({ id: result.insertId, name, email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Backend API listening on port ${port}`);
});
