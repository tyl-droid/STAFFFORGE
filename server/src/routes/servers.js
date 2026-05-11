const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.all("SELECT * FROM servers ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { name, website, application_url, notes } = req.body;

  db.run(
    "INSERT INTO servers (name, website, application_url, notes) VALUES (?, ?, ?, ?)",
    [name, website, application_url, notes],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        id: this.lastID,
        name,
        website,
        application_url,
        notes,
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.run("DELETE FROM servers WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;