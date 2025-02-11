const prisma = require("../config/db.js");

// Create a new game
const createNewGame = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Game name is required" });
    }

    const game = await prisma.game.create({
      data: { name },
    });

    res.status(201).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all games
const getAllGames = async (req, res) => {
  try {
    const games = await prisma.game.findMany();
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Start a game
const startGame = async (req, res) => {
  try {
    const gameId = parseInt(req.params.id);
    const { contestantId } = req.body;

    if (!gameId || !contestantId) {
      return res
        .status(400)
        .json({ error: "Game ID and Contestant ID are required" });
    }

    // Step 1: Check if the game exists
    const game = await prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Step 2: Check if the contestant exists
    const contestant = await prisma.contestant.findUnique({
      where: { id: contestantId },
    });

    if (!contestant) {
      return res.status(404).json({ error: "Contestant not found" });
    }

    // Step 3: Find existing participant entry
    const existingParticipant = await prisma.participant.findUnique({
      where: { gameId_contestantId: { gameId, contestantId } },
    });

    let participant;
    if (existingParticipant) {
      // Restart the game session
      participant = await prisma.participant.update({
        where: { id: existingParticipant.id },
        data: { startedAt: new Date(), endedAt: null, score: 0 },
      });
    } else {
      // Create a new participant entry
      participant = await prisma.participant.create({
        data: { gameId, contestantId, startedAt: new Date(), score: 0 },
      });
    }

    // Step 4: Update game status to "in-progress"
    await prisma.game.update({
      where: { id: gameId },
      data: { status: "in-progress" },
    });

    res.status(200).json({
      message: "Game started successfully!",
      participant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// End a game
const endGame = async (req, res) => {
  try {
    const gameId = parseInt(req.params.id);
    const { contestantId } = req.body;

    if (!contestantId) {
      return res.status(400).json({ error: "Contestant ID is required" });
    }

    const participant = await prisma.participant.update({
      where: { gameId_contestantId: { gameId, contestantId } },
      data: { endedAt: new Date() },
    });

    res.json({ message: "Game ended!", participant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Game not found or error occurred" });
  }
};

// Allow contestant to join a game
const joinGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { contestantId } = req.body;

    const participation = await prisma.participant.create({
      data: {
        gameId: parseInt(gameId),
        contestantId: parseInt(contestantId),
      },
    });

    res.json({ message: "Contestant joined the game!", participation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error joining game" });
  }
};

// Allow contestant to exit a game
const exitGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { contestantId } = req.body;

    await prisma.participant.deleteMany({
      where: {
        gameId: parseInt(gameId),
        contestantId: parseInt(contestantId),
      },
    });

    res.json({ message: "Contestant exited the game!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error exiting game" });
  }
};

// Assign a score to a contestant in a game
const assignScore = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { contestantId, score } = req.body;

    if (score === undefined || isNaN(score)) {
      return res.status(400).json({ error: "Score must be a number" });
    }

    const updatedParticipant = await prisma.participant.updateMany({
      where: {
        gameId: parseInt(gameId),
        contestantId: parseInt(contestantId),
      },
      data: { score: parseInt(score) },
    });

    if (updatedParticipant.count === 0) {
      return res.status(404).json({ error: "Participant not found in game" });
    }

    res.json({ message: "Score updated!", score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating score" });
  }
};

module.exports = {
  createNewGame,
  getAllGames,
  startGame,
  endGame,
  joinGame,
  exitGame,
  assignScore,
};
