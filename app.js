const express = require('express');
const connectDB = require('./config/db');
const path = require('path'); // Import path module
const app = express();
const cors = require('cors');

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Enable CORS
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'simple-blog-frontend', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'simple-blog-frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
