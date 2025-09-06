const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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

    // Validation: Team name is required
    if (!teamName || teamName.trim() === '') {
      return res.status(400).json({ error: 'Team name is required' });
    }

    // If members is a string, convert to array
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

    // Read existing data
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const existingData = JSON.parse(fileContent);

    // Add new registration
    existingData.push(registrationData);

    // Write updated data back to file
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
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
