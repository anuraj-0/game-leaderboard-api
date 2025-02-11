const express = require("express");
const { gameController } = require("../controllers/index");

const router = express.Router();

router.post("/games", gameController.createNewGame);
router.get("/games", gameController.getAllGames);
router.post("/games/:id/start", gameController.startGame);
router.post("/games/:id/end", gameController.endGame);
router.post("/games/:gameId/join", gameController.joinGame);
router.post("/games/:gameId/exit", gameController.exitGame);
router.post("/games/:gameId/score", gameController.assignScore);

module.exports = router;
