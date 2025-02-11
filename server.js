// server.js

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { startPopularityUpdater } = require("./services/popularityUpdater");

const apiRoutes = require("./routes/index");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Leaderboard API is running!");
});

// API routes
app.use(apiRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // Periodic popularity updater
  startPopularityUpdater();
});
