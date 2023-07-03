const path = require("path");

pp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

//*
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//App listener
app.listen(PORT, () =>
    console.log(`Note taker is listening on ${PORT}`))