// Easy Sheets Backend Server
// Features:
// - Connect to MongoDB using Mongoose
// - Use dotenv for environment variables
// - Basic routes: /api/sheets, /api/sheets/:id, /api/sheets/:id/save
// - User routes: /api/users/register, /api/users/login, /api/users/me
// - Permissions routes: /api/permissions/:sheetId
// - Enable CORS and JSON parsing
// - JWT-based authentication
// - Log requests to console
// - Start server on port 8080

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const sheetRoutes = require('./routes/sheets');
const userRoutes = require('./routes/users');
const permissionRoutes = require('./routes/permissions');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Endpoints
app.use('/api/sheets', sheetRoutes);
app.use('/api/users', userRoutes);
app.use('/api/permissions', permissionRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});