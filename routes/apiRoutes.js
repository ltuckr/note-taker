const fs = require('fs');
const path = require('path');
const dbFilePath = path.join(__dirname, '..', 'db', 'db.json');

const uuid = require('uuid');
const express = require('express');
const router = express.Router();

// GET notes
router.get('/', (req, res) => {
  console.log('Received GET request to /api/notes');
  fs.readFile(dbFilePath, 'utf8', (err, data) => { 
    if (err) {
      console.error(err); // Log any errors
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST notes
router.post('/', (req, res) => {
  console.log('Received POST request to /api/notes');
  const newNote = req.body;
  newNote.id = uuid.v4();

  fs.readFile(dbFilePath, 'utf8', (err, data) => { 
    if (err) {
      console.error(err); // Log any errors
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => { 
      if (err) {
        console.error(err); // Log any errors
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(newNote);
    });
  });
});

// DELETE notes/:id
router.delete('/:id', (req, res) => {
  console.log('Received DELETE request to /api/notes/:id');
  const noteId = req.params.id;

  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err); // Log any errors
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== noteId);

    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => { 
      if (err) {
        console.error(err); // Log any errors
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(notes);
    });
  });
});

module.exports = router;
