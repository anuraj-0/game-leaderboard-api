const prisma = require("../config/db.js");

// Get Game Popularity Score
async function calculateGamePopularity() {
  try {
    const games = await prisma.game.findMany({
      include: { participants: true },
    });

    let maxValues = {
      dailyPlayers: 1,
      concurrentPlayers: 1,
      upvotes: 1,
      sessionLength: 1,
      dailySessions: 1,
    };

    let gameData = games.map((game) => {
      const now = new Date();
      const yesterdayStart = new Date(now);
      yesterdayStart.setDate(now.getDate() - 1);
      yesterdayStart.setHours(0, 0, 0, 0);

      const yesterdayEnd = new Date(yesterdayStart);
      yesterdayEnd.setHours(23, 59, 59, 999);

      const w1 = game.participants.filter(
        (p) => p.joinedAt >= yesterdayStart && p.joinedAt <= yesterdayEnd
      ).length;

      const w2 = game.participants.filter((p) => !p.exitedAt).length;
      const w3 = game.upvotes || 0;

      const yesterdayParticipants = game.participants.filter(
        (p) => p.joinedAt >= yesterdayStart && p.joinedAt <= yesterdayEnd
      );

      const w4 = Math.max(
        ...yesterdayParticipants.map((p) =>
          p.exitedAt ? (p.exitedAt - p.joinedAt) / 1000 : 0
        ),
        0
      );

      const w5 = yesterdayParticipants.length;

      maxValues.dailyPlayers = Math.max(maxValues.dailyPlayers, w1);
      maxValues.concurrentPlayers = Math.max(maxValues.concurrentPlayers, w2);
      maxValues.upvotes = Math.max(maxValues.upvotes, w3);
      maxValues.sessionLength = Math.max(maxValues.sessionLength, w4);
      maxValues.dailySessions = Math.max(maxValues.dailySessions, w5);

      return { game, w1, w2, w3, w4, w5 };
    });

    for (const data of gameData) {
      const { game, w1, w2, w3, w4, w5 } = data;

      const popularityScore = Number(
        0.3 * (w1 / maxValues.dailyPlayers) +
          0.2 * (w2 / maxValues.concurrentPlayers) +
          0.25 * (w3 / maxValues.upvotes) +
          0.15 * (w4 / maxValues.sessionLength) +
          0.1 * (w5 / maxValues.dailySessions)
      );

      await prisma.gamePopularity.upsert({
        where: { gameId: game.id },
        update: { popularityScore, updatedAt: new Date() },
        create: { gameId: game.id, popularityScore },
      });
    }

    console.log("Game popularity updated!");
  } catch (error) {
    console.error("Error updating game popularity:", error);
  }
}

const getPopularity = async (req, res) => {
  try {
    await calculateGamePopularity();
    const games = await prisma.game.findMany({
      include: { gamePopularity: true },
      orderBy: { gamePopularity: { popularityScore: "desc" } },
    });

    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getPopularity };
