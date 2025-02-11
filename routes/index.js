// importing routes from individual files

const express = require("express");

const contestantRoute = require("./contestant");
const gameRoute = require("./game");
const leaderboardRoute = require("./leaderboard");
const popularityRoute = require("./popularity");

const router = express.Router();

router.use(contestantRoute);
router.use(gameRoute);
router.use(leaderboardRoute);
router.use(popularityRoute);

module.exports = router;
