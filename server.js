const express = require("express");
const app = express();
const path = require("path");

// Require routes
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Use routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// HTML 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Port info
const PORT = process.env.PORT || 8080;

// Listener
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));

