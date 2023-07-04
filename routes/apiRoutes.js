const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Get all notes
router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes' });
    }

    let notes = [];

    try {
      notes = JSON.parse(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to parse notes' });
    }

    res.json(notes);
  });
});

// Create a new note
router.post('/', (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: 'Title and text are required fields' });
  }

  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes' });
    }

    let notes = [];

    try {
      notes = JSON.parse(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to parse notes' });
    }

    const newNote = {
      id: notes.length + 1,
      title,
      text
    };

    notes.push(newNote);

    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to write note' });
      }

      res.status(201).json(newNote);
    });
  });
});

// Delete a note
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes' });
    }

    let notes = [];

    try {
      notes = JSON.parse(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to parse notes' });
    }

    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }

    notes.splice(noteIndex, 1);

    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to delete note' });
      }

      res.sendStatus(204);
    });
  });
});

module.exports = router;
