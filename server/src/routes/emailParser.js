const express = require("express");
const { parseEmailStatus } = require("../services/emailParser");

const router = express.Router();

router.post("/", (req, res) => {
  const { text } = req.body;
  const status = parseEmailStatus(text || "");
  res.json({ status });
});

module.exports = router;
