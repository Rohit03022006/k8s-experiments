const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'miniblog_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Test the connection immediately
pool.getConnection()
    .then(conn => {
        console.log('Successfully connected to MySQL database');
        conn.release();
    })
    .catch(err => {
        console.error('Failed to connect to MySQL:', err.message);
    });

module.exports = pool;
