const express = require("express");
const { parseGmailMock } = require("../services/gmailIntegration");

const router = express.Router();

router.post("/", (req, res) => {
  const { emails } = req.body;

  res.json({
    results: parseGmailMock(emails || [])
  });
});

module.exports = router;
