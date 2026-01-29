const Portfolio = require("../models/Portfolio");

exports.getPortfolio = async (req, res) => {
  try {
    const data = await Portfolio.findOne().sort({ createdAt: -1 });
    if (!data) {
      return res.status(404).json({ message: "Portfolio data not found. Please seed the database." });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    let data = await Portfolio.findOne().sort({ createdAt: -1 });
    if (!data) {
      data = new Portfolio(req.body);
    } else {
      Object.assign(data, req.body);
    }
    await data.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
