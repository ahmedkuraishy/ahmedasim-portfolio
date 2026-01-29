require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const connectDB = require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/admin', authRoutes); // Auth routes often grouped, but here specifically admin login
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
