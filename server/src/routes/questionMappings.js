const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.all("SELECT * FROM question_mappings ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { pattern, answer_key } = req.body;

  db.run(
    "INSERT INTO question_mappings (pattern, answer_key) VALUES (?, ?)",
    [pattern, answer_key],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        id: this.lastID,
        pattern,
        answer_key
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.run(
    "DELETE FROM question_mappings WHERE id = ?",
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

module.exports = router;
