const express = require("express");
const { leaderboardController } = require("../controllers/index");

const router = express.Router();

router.get("/leaderboard/global", leaderboardController.getGlobalLeaderboard);
router.get(
  "/leaderboard/game/:gameId",
  leaderboardController.getGameLeaderboard
);

module.exports = router;
