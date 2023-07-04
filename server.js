const express = require('express');
const app = express();
const path = require('path');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use('/api/notes', apiRoutes);
app.use('/', htmlRoutes);

// Port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
