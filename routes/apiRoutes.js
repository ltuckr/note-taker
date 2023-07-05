const fs = require('fs')
const path = require('path')
const db = require('../db/db.json');
const uuid = require("uuid");
const express = require('express');
const router = express.Router();

//Routing functions

// GET notes
router.get('/notes', (req, res) => {
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });
  
  // POST notes
  router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid.v4();
  
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
  
      const notes = JSON.parse(data);
      notes.push(newNote);
  
      fs.writeFile('../db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.json(notes);
      });
    });
  });
  
  // DELETE notes/:id
  router.delete('/:id', (req, res) => {
    const noteId = req.params.id;
  
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
  
      let notes = JSON.parse(data);
      notes = notes.filter((note) => note.id !== noteId);
  
      fs.writeFile('../db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.json(notes);
      });
    });
  });
  
  module.exports = router;