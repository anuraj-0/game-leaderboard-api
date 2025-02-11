const express = require("express");
const { popularityController } = require("../controllers/index");

const router = express.Router();

router.get("/popularity", popularityController.getPopularity);

module.exports = router;
