const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('./config/firebase-admin');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Firebase Admin test endpoint
app.get('/api/admin-test', async (req, res) => {
    try {
        const listUsersResult = await admin.auth().listUsers(1);
        res.json({ 
            message: 'Firebase Admin is working!',
            userCount: listUsersResult.users.length 
        });
    } catch (error) {
        console.error('Firebase Admin test failed:', error);
        res.status(500).json({ 
            error: 'Firebase Admin test failed',
            details: error.message 
        });
    }
});

// Registry routes
app.use('/api/registries', require('./routes/registries'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: 'error',
        message: 'Something went wrong!' 
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});