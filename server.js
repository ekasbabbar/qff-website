
// Load environment variables
require('dotenv').config();

const express = require('express');
const path = require('path');
const os = require('os');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || config.PORT;
const HOST = process.env.HOST || config.HOST;
const GOOGLE_FORM_URL = process.env.GOOGLE_FORM_URL || '';

// Get local IP address
function getLocalIP() {
    // Check if LOCAL_IP is set in environment variables
    if (process.env.LOCAL_IP) {
        return process.env.LOCAL_IP;
    }
    
    // Use the configured host IP as default
    return HOST;
}

// Serve static files from src directory
app.use(express.static(path.join(__dirname, 'src')));

// Serve images from public directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Handle favicon
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/favicon.ico'));
});

// Main route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});

// API route for registration form submission
// Deprecated local registration; use GOOGLE_FORM_URL instead
app.post('/api/register', express.json(), (req, res) => {
    if (GOOGLE_FORM_URL) {
        return res.status(410).json({
            success: false,
            message: 'Direct registration disabled. Use provided Google Form.',
            redirectUrl: GOOGLE_FORM_URL
        });
    }
    return res.status(503).json({
        success: false,
        message: 'Registration is not available yet. Configure GOOGLE_FORM_URL.'
    });
});

// Public config for client
app.get('/api/config', (req, res) => {
    res.json({
        googleFormUrl: GOOGLE_FORM_URL
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'src/index.html'));
});

// Start server with error handling
const server = app.listen(PORT, HOST, () => {
    const localIP = getLocalIP();
    const eventName = process.env.EVENT_NAME || config.EVENT_NAME;
    const eventLocation = process.env.EVENT_LOCATION || config.EVENT_LOCATION;
    
    console.log(`\n ${eventName} Website Server ON`);
    console.log('================================================');
    console.log(`Local:     http://localhost:${PORT}`);
    console.log(`Network:   http://${localIP}:${PORT}`);
    console.log(`Health:    http://${localIP}:${PORT}/api/health`);
    console.log('================================================');
});

// Handle port already in use error
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`\n❌ Port ${PORT} is already in use!`);
        console.log('🔧 Solutions:');
        console.log('   1. Run: start-clean.bat (kills existing processes)');
        console.log('   2. Or change PORT in server.js');
        console.log('   3. Or kill the process manually\n');
        process.exit(1);
    } else {
        console.error('Server error:', err);
        process.exit(1);
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down server...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n👋 Shutting down server...');
    process.exit(0);
});
