require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Portfolio = require("./models/Portfolio");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.get("/api/portfolio", async (req, res) => {
  try {
    const data = await Portfolio.findOne().sort({ createdAt: -1 });
    if (!data) {
      return res.status(404).json({ message: "Portfolio data not found. Please seed the database." });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
