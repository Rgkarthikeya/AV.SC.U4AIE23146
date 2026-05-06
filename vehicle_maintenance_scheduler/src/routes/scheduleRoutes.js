const express = require("express");

const router = express.Router();

const {
  getSchedulerData
} = require("../controllers/schedulerController");

router.get("/schedule", getSchedulerData);

module.exports = router;