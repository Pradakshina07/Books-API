const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];
let nextId = 1;

// Home route
app.get('/', (req, res) => {
  res.send('API Working ✅');
});

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Add book
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title & Author required' });
  }

  const newBook = {
    id: nextId++,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// RESET ALL DATA
app.delete('/reset', (req, res) => {
  books = [];
  nextId = 1;
  res.json({ message: 'All data deleted' });
});

// START SERVER (must be LAST)
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});