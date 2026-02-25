require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Basic Probes for Kubernetes
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));
app.get('/ready', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.status(200).json({ status: 'OK' });
    } catch (err) {
        res.status(503).json({ status: 'UNAVAILABLE', error: err.message });
    }
});
app.get('/metrics', (req, res) => res.status(200).send('metrics placeholder'));

// --- Blog Posts API Routes ---

// GET: All posts
app.get('/api/posts', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM posts ORDER BY createdAt DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// POST: Create a new post
app.post('/api/posts', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            return res.status(400).json({ error: 'Title, content, and author are required.' });
        }

        const [result] = await db.query(
            'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
            [title, content, author]
        );

        const [newPost] = await db.query('SELECT * FROM posts WHERE id = ?', [result.insertId]);
        res.status(201).json(newPost[0]);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// PUT: Update publish status OR likes
app.put('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { isPublished, action } = req.body;

        if (action === 'like') {
            await db.query('UPDATE posts SET likes = likes + 1 WHERE id = ?', [id]);
        } else if (isPublished !== undefined) {
            await db.query('UPDATE posts SET isPublished = ? WHERE id = ?', [isPublished, id]);
        } else {
            return res.status(400).json({ error: 'Invalid update action' });
        }

        const [updatedPost] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
        res.json(updatedPost[0]);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// DELETE: Remove a post
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM posts WHERE id = ?', [id]);
        res.json({ message: 'Post deleted successfully', id });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

app.listen(port, () => {
    console.log(`Blog Backend API listening on port ${port}`);
});
