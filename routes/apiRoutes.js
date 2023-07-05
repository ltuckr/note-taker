const fs = require('fs');
const path = require('path');
const dbFilePath = path.join(__dirname, '..', 'db', 'db.json');
const db = require(dbFilePath);
const uuid = require('uuid');
const express = require('express');
const router = express.Router();

// GET notes
router.get('/', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST notes
router.post('/', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();

  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(notes);
    });
  });
});

// DELETE notes/:id
router.delete('/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) throw err;

    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== noteId);

    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(notes);
    });
  });
});

module.exports = router;
