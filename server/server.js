const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Weather API
app.get("/api/weather", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=17.385&longitude=78.4867&current_weather=true"
    );
    res.json(response.data.current_weather);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// ✅ Currency API
app.get("/api/currency", async (req, res) => {
  try {
    const response = await axios.get("https://api.exchangerate-api.com/v4/latest/INR");
    res.json(response.data.rates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch currency data" });
  }
});

// ✅ Quote API
app.get("/api/quote", async (req, res) => {
  try {
    const response = await axios.get("https://api.quotable.io/random");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

// ✅ Server Start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
