const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to InfoHub API!");
});

// Weather route
app.get("/weather", (req, res) => {
  res.json({ city: "Hyderabad", temperature: "30°C", condition: "Sunny" });
});

// Quote route
app.get("/quote", (req, res) => {
  res.json({ quote: "The best way to predict the future is to invent it." });
});

// Convert route
app.get("/convert", (req, res) => {
  res.json({ usd: 1, inr: 83.12 });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
