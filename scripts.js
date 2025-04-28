// server.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3000;

// Use middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API endpoint to get the API key (only for development)
app.get('/api/config', (req, res) => {
  // Only send the API key to requests from localhost
  const origin = req.get('origin') || '';
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
    res.json({
      apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
    });
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});