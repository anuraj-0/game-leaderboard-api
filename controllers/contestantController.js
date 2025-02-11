const prisma = require("../config/db.js");

// Create a new contestant
const createContestant = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const contestant = await prisma.contestant.create({
      data: { name },
    });

    res.status(201).json(contestant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all contestants
const getAllContestants = async (req, res) => {
  try {
    const contestants = await prisma.contestant.findMany();
    res.json(contestants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a contestant
const deleteContestant = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.contestant.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Contestant deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Contestant not found or error occurred" });
  }
};

module.exports = { createContestant, getAllContestants, deleteContestant };
