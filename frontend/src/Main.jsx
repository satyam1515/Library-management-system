import { useState } from 'react';
import axios from 'axios';
import './App.css';

const initialBook = {
  title: '',
  author: '',
  isbn: '',
  category: '',
  publish_year: '',
};

function Main() {
  const [formData, setFormData] = useState(initialBook);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      publish_year: Number(formData.publish_year),
    };

    if (!payload.title || !payload.author || !payload.isbn || !payload.category || !payload.publish_year) {
      setIsError(true);
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/books', payload);
      setIsError(false);
      setMessage('Book added successfully!');
      setFormData(initialBook);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding book.';
      setIsError(true);
      setMessage(errorMessage);
    }
  };

  return (
    <div className="container">
      <h1>Library Management System</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Book Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />

        <label htmlFor="isbn">ISBN</label>
        <input
          id="isbn"
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <label htmlFor="publish_year">Publish Year</label>
        <input
          id="publish_year"
          type="number"
          name="publish_year"
          value={formData.publish_year}
          onChange={handleChange}
        />

        <button type="submit">Add Book</button>
      </form>

      {message && <p className={isError ? 'error' : 'success'}>{message}</p>}
    </div>
  );
}

export default Main;
