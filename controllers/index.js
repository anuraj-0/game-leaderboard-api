// importing controllers from individual files
const contestantController = require("./contestantController");
const gameController = require("./gameController");
const leaderboardController = require("./leaderboardController");
const popularityController = require("./popularityController");

module.exports = {
  contestantController,
  gameController,
  leaderboardController,
  popularityController,
};
