//connectivity
const fs = require('fs')
const path = require('path')
const db = require('./db/db.json')

//Route
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        res.json(dbData)
    });   
})
//POST 
app.post('/api/notes', (req, res) => {
    const newNote = req.body
   //ID's each note
    newNote.id = uuidv4()
    db.push(newNote)
   //update the json db with new data
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db)
})