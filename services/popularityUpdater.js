const { popularityController } = require("../controllers/index");

function startPopularityUpdater() {
  console.log("Starting game popularity auto-refresh...");
  setInterval(() => {
    popularityController();
  }, 5 * 60 * 1000);
}

module.exports = { startPopularityUpdater };
