const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.get("SELECT * FROM profile WHERE id = 1", [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
});

router.post("/", (req, res) => {
  const {
    minecraft_username,
    discord,
    age,
    timezone,
    experience,
    why_staff,
    availability,
  } = req.body;

  db.run(
    `
    INSERT INTO profile (
      id, minecraft_username, discord, age, timezone,
      experience, why_staff, availability
    )
    VALUES (1, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      minecraft_username = excluded.minecraft_username,
      discord = excluded.discord,
      age = excluded.age,
      timezone = excluded.timezone,
      experience = excluded.experience,
      why_staff = excluded.why_staff,
      availability = excluded.availability
    `,
    [
      minecraft_username,
      discord,
      age,
      timezone,
      experience,
      why_staff,
      availability,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

module.exports = router;