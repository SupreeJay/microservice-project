const express = require('express');
const path = require('path');
const { inputCleaner, inputValidator } = require('./middleware');

const app = express();

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 1. Define explicit routes BEFORE express.static
app.get('/', (req, res) => {
  return res.redirect('/form');
});

app.get('/form', (req, res) => {
  return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 2. Serve static files after explicit routes
app.use(express.static(path.join(__dirname, 'public')));

// 3. POST submission route
app.post('/submit', inputCleaner, inputValidator, (req, res) => {
  const { username, comment } = req.body;
  res.send(`Sanitised Username: ${username}, Comment: ${comment}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;