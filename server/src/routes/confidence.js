const express = require("express");
const { scoreMatch } = require("../services/confidence");

const router = express.Router();

router.post("/", (req, res) => {
  const { question, pattern } = req.body;
  res.json({
    confidence: scoreMatch(question, pattern)
  });
});

module.exports = router;
