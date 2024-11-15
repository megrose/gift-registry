const express = require('express');
const router = express.Router();

// Get all registries
router.get('/', async (req, res) => {
    try {
        res.json({ message: 'Get all registries' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single registry
router.get('/:id', async (req, res) => {
    try {
        res.json({ message: `Get registry ${req.params.id}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create registry
router.post('/', async (req, res) => {
    try {
        res.json({ message: 'Create registry' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;