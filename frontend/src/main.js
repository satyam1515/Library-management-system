import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main.jsx';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null, React.createElement(Main))
);
