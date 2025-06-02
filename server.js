const express = require('express');
const cors = require('cors');
const path = require('path');
const steganographyRoutes = require('./routes/steganography');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api/steganography', steganographyRoutes);

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Image Steganography Server running on port ${PORT}`);
    console.log(`📱 Open your browser to http://localhost:${PORT}`);
}); 