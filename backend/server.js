const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.MONGO_URI) {
  console.warn('MONGO_URI is not defined. Starting server without MongoDB connection.');
} else {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  publish_year: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

app.post('/api/books', async (req, res) => {
  try {
    const { title, author, isbn, category, publish_year } = req.body;

    if (!title || !author || !isbn || !category || !publish_year) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newBook = new Book({
      title,
      author,
      isbn,
      category,
      publish_year,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

