const express = require("express");
const { personalizeAnswer } = require("../services/personalizer");

const router = express.Router();

router.post("/", (req, res) => {
  const { serverName, serverDescription, baseAnswer } = req.body;

  res.json({
    answer: personalizeAnswer({
      serverName,
      serverDescription,
      baseAnswer
    })
  });
});

module.exports = router;
