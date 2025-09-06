// Backend/Server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express(); // ✅ only declare once
const PORT = process.env.PORT || 5000;

// Frontend URL (use env variable or fallback)
const FRONTEND_URL = process.env.FRONTEND_URL || "https://codesprint-delta.vercel.app";

// CORS middleware
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

// Built-in middleware
app.use(express.json());
app.use(express.static('public'));

// File to store registrations
const dataFilePath = path.join(__dirname, 'data', 'registrations.json');

// Ensure data directory exists
const dataDir = path.dirname(dataFilePath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure file exists
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

// API endpoint to handle registration
app.post('/api/register', (req, res) => {
  try {
    const { teamName, members } = req.body;

    if (!teamName || teamName.trim() === '') {
      return res.status(400).json({ error: 'Team name is required' });
    }

    let membersList = members;
    if (typeof members === 'string') {
      membersList = members.split(',').map(m => m.trim()).filter(m => m !== '');
    }

    if (!membersList || membersList.length === 0) {
      return res.status(400).json({ error: 'At least one member is required' });
    }

    const registrationData = {
      teamName,
      members: membersList,
      timestamp: new Date().toISOString(),
    };

    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const existingData = JSON.parse(fileContent);

    existingData.push(registrationData);

    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

    res.status(200).json({ message: 'Registration successful', data: registrationData });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get all registrations
app.get('/api/registrations', (req, res) => {
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const registrations = JSON.parse(fileContent);
    res.json(registrations);
  } catch (error) {
    console.error('Error reading registrations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
