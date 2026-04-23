// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample book data
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" }
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET a single book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// POST a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT to update a book
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  const { title, author } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  res.json(book);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.json({ message: 'Book deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`API Bookstore running at http://localhost:${PORT}`);
});  