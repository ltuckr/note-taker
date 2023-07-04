// Sets up Express connectivity
const express = require("express");
const app = express();

// Routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Port info
const PORT = process.env.PORT || 8080;

// Listener
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
