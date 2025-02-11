const express = require("express");
const { contestantController } = require("../controllers/index");

const router = express.Router();

router.post("/contestants", contestantController.createContestant);
router.get("/contestants", contestantController.getAllContestants);
router.delete("/contestants/:id", contestantController.deleteContestant);

module.exports = router;
