const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username } = req.body;

  res.json({
    success: true,
    message: "User registration scaffold complete.",
    username
  });
});

router.post("/login", async (req, res) => {
  const { username } = req.body;

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET || "staffforge-secret",
    { expiresIn: "7d" }
  );

  res.json({
    success: true,
    token,
    username
  });
});

module.exports = router;
