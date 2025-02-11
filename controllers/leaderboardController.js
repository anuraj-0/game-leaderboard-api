const prisma = require("../config/db.js");

// Get Global Leaderboard (All Games)
const getGlobalLeaderboard = async (req, res) => {
  try {
    const { date } = req.query; // Extract date from query param
    const parsedDate = new Date(date);

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }

    // Fetch leaderboard filtered by date
    const leaderboard = await prisma.participant.findMany({
      where: {
        startedAt: {
          gte: new Date(parsedDate.setUTCHours(0, 0, 0, 0)), // Start of the day
          lt: new Date(parsedDate.setUTCHours(23, 59, 59, 999)), // End of the day
        },
      },
      include: { contestant: true, game: true },
      orderBy: { score: "desc" },
    });

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching global leaderboard" });
  }
};

// Get Game-Specific Leaderboard
const getGameLeaderboard = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { date } = req.query;
    const parsedDate = new Date(date);

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }

    // Check if gameId is a valid number
    if (!gameId || isNaN(gameId)) {
      return res.status(400).json({ error: "Invalid game ID!" });
    }

    // Check if game exists
    const game = await prisma.game.findUnique({
      where: { id: parseInt(gameId) },
    });

    if (!game) {
      return res.status(404).json({ error: "Game not found!" });
    }

    // Fetch leaderboard for the game
    const leaderboard = await prisma.participant.findMany({
      where: {
        gameId: Number(gameId),
        startedAt: {
          gte: new Date(parsedDate.setUTCHours(0, 0, 0, 0)), // Start of the day
          lt: new Date(parsedDate.setUTCHours(23, 59, 59, 999)), // End of the day
        },
      },
      include: { contestant: true },
      orderBy: { score: "desc" },
    });

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching game leaderboard" });
  }
};

module.exports = {
  getGlobalLeaderboard,
  getGameLeaderboard,
};
