const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = Number(process.env.PORT) || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    status: 'error', 
    message: 'Route not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error', 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server with automatic port fallback if the preferred port is busy.
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`📊 API Health: http://localhost:${port}/api/health`);
    console.log(`📦 Projects API: http://localhost:${port}/api/projects`);
    console.log(`📧 Contact API: http://localhost:${port}/api/contact`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`⚠️ Port ${port} is already in use. Retrying on ${nextPort}...`);
      startServer(nextPort);
      return;
    }

    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  });
};

startServer(PORT);

module.exports = app;
