const fs = require('fs');
const path = require('path');
const dbFilePath = path.join(__dirname, '..', 'db', 'db.json');

const uuid = require('uuid');
const express = require('express');
const router = express.Router();

// GET notes
router.get('/notes', (req, res) => {
  console.log('Received GET request to /api/notes');
  fs.readFile(dbFilePath, 'utf8', (err, data) => { 
    if (err) {
      console.error('Error reading database file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST notes
router.post('/notes', (req, res) => {
  console.log('Received POST request to /api/notes');
  
  // Create a new note with a unique ID
  const newNote = req.body;
  newNote.id = uuid.v4();

  // Read the existing notes from the database file
  fs.readFile(dbFilePath, 'utf8', (readErr, data) => {
    if (readErr) {
      console.error('Error reading database file:', readErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Parse the existing notes data
    let notes = JSON.parse(data);

    // Add the new note to the array
    notes.push(newNote);

    // Write the updated notes array back to the database file
    fs.writeFile(dbFilePath, JSON.stringify(notes), (writeErr) => {
      if (writeErr) {
        console.error('Error writing to database file:', writeErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Respond with the newly created note
      res.json(newNote);
    });
  });
});

// DELETE notes/:id
router.delete('/notes/:id', (req, res) => {
  console.log('Received DELETE request to /api/notes/:id');
  const noteId = req.params.id;

  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading database file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== noteId);

    fs.writeFile(dbFilePath, JSON.stringify(notes), (writeErr) => { 
      if (writeErr) {
        console.error('Error writing to database file:', writeErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(notes);
    });
  });
});

module.exports = router;
