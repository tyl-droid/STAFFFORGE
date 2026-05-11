const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  const backup = {};

  db.get("SELECT * FROM profile WHERE id = 1", [], (err, profile) => {
    if (err) return res.status(500).json({ error: err.message });

    backup.profile = profile || {};

    db.all("SELECT * FROM servers", [], (err, servers) => {
      if (err) return res.status(500).json({ error: err.message });

      backup.servers = servers;

      db.all("SELECT * FROM applications", [], (err, applications) => {
        if (err) return res.status(500).json({ error: err.message });

        backup.applications = applications;

        db.all("SELECT * FROM question_mappings", [], (err, mappings) => {
          if (err) return res.status(500).json({ error: err.message });

          backup.question_mappings = mappings;
          backup.exported_at = new Date().toISOString();

          res.json(backup);
        });
      });
    });
  });
});

module.exports = router;
