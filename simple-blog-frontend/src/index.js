import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';
import axios from 'axios';
import * as serviceWorker from './serviceWorker'; // Import the service worker

// Set default headers for axios
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
root.render(<App />); // Render App

// Register the service worker
serviceWorker.register();
