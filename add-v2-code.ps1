$root = "C:\Users\jeffr\Desktop\StaffForge"

@'
function parseEmailStatus(text = "") {
  const t = text.toLowerCase();

  if (t.includes("congratulations") || t.includes("accepted") || t.includes("successful")) {
    return "ACCEPTED";
  }

  if (t.includes("unfortunately") || t.includes("denied") || t.includes("rejected")) {
    return "DENIED";
  }

  if (t.includes("interview") || t.includes("voice chat") || t.includes("schedule a time")) {
    return "INTERVIEW";
  }

  if (t.includes("under review") || t.includes("reviewing") || t.includes("being reviewed")) {
    return "UNDER_REVIEW";
  }

  if (t.includes("received") || t.includes("submitted")) {
    return "SUBMITTED";
  }

  return "UNKNOWN";
}

module.exports = { parseEmailStatus };
'@ | Set-Content "$root\server\src\services\emailParser.js"

@'
function personalizeAnswer({ serverName, serverDescription, baseAnswer }) {
  const name = serverName || "this server";
  const desc = (serverDescription || "").toLowerCase();

  let focus = "community safety, fairness, and player support";

  if (desc.includes("lifesteal")) focus = "competitive fairness, rule enforcement, and handling conflict calmly";
  if (desc.includes("skyblock")) focus = "helping players with progression, economy questions, and community support";
  if (desc.includes("survival") || desc.includes("smp")) focus = "community trust, grief prevention, and welcoming new players";
  if (desc.includes("minigame")) focus = "fast support, consistency, and handling reports across active games";
  if (desc.includes("roleplay")) focus = "respectful communication, rule clarity, and protecting immersion";

  return `${baseAnswer}

For ${name}, I would especially focus on ${focus}. I would make sure to represent the server professionally, follow staff procedures, and support both new and experienced players.`;
}

module.exports = { personalizeAnswer };
'@ | Set-Content "$root\server\src\services\personalizer.js"

@'
const express = require("express");
const { parseEmailStatus } = require("../services/emailParser");

const router = express.Router();

router.post("/", (req, res) => {
  const { text } = req.body;
  const status = parseEmailStatus(text || "");
  res.json({ status });
});

module.exports = router;
'@ | Set-Content "$root\server\src\routes\emailParser.js"

@'
const express = require("express");
const { personalizeAnswer } = require("../services/personalizer");

const router = express.Router();

router.post("/", (req, res) => {
  const { serverName, serverDescription, baseAnswer } = req.body;
  res.json({
    answer: personalizeAnswer({ serverName, serverDescription, baseAnswer })
  });
});

module.exports = router;
'@ | Set-Content "$root\server\src\routes\resume.js"

@'
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
      res.json({ id: this.lastID, pattern, answer_key });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.run("DELETE FROM question_mappings WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
'@ | Set-Content "$root\server\src\routes\questionMappings.js"

@'
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
'@ | Set-Content "$root\server\src\routes\backup.js"

Write-Host "Backend v2 code added."