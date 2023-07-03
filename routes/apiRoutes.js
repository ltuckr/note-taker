const fs = require('fs')
const path = require('path')
const db = require('./db/db.json')

//Routing functions
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        res.json(dbData)
    });   
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    // ID each note
    newNote.id = uuidv4();
    db.push(newNote);
    // Update the JSON db with new data
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
});

// DELETE
app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    fs.readFile(path.join(__dirname, "db/db.json"), "utf-8", (err, data) => {
        if (err) throw err;
        let notesDB = JSON.parse(data);
        const filteredNotes = notesDB.filter(values => values.id !== noteId);
        fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(filteredNotes), "utf-8", err => {
            if (err) throw err;
            console.log("The note has been removed.");
            res.end();
        });
    });
});