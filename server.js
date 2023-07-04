// Sets up Express and routing connectivity
const express = require("express");
const app = express();
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");

// Routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Port info
const PORT = process.env.PORT || 8080;

// Listener
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
