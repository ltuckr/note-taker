const express = require('express');
const router = express.Router();
const path = require('path');

// GET /
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// GET /notes
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'notes.html'));
});

// GET *
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;