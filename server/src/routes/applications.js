const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.all(
    `
    SELECT 
      applications.*,
      servers.name AS server_name,
      servers.application_url
    FROM applications
    LEFT JOIN servers ON applications.server_id = servers.id
    ORDER BY applications.id DESC
    `,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

router.post("/", (req, res) => {
  const { server_id, status, date_applied, notes } = req.body;

  db.run(
    `
    INSERT INTO applications (server_id, status, date_applied, notes)
    VALUES (?, ?, ?, ?)
    `,
    [server_id, status || "DRAFTED", date_applied, notes],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        id: this.lastID,
        server_id,
        status: status || "DRAFTED",
        date_applied,
        notes,
      });
    }
  );
});

router.patch("/:id/status", (req, res) => {
  const { status } = req.body;

  db.run(
    "UPDATE applications SET status = ? WHERE id = ?",
    [status, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.run("DELETE FROM applications WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;