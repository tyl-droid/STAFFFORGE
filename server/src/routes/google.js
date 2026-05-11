const express = require("express");
const { google } = require("googleapis");

const router = express.Router();

router.get("/status", (req, res) => {
  res.json({
    gmail: "OAuth ready",
    calendar: "OAuth ready",
    polling: "Available",
    note: "Configure Google OAuth credentials to enable live access."
  });
});

router.post("/parse-gmail-message", (req, res) => {
  const text = (req.body.text || "").toLowerCase();

  let status = "UNKNOWN";

  if (text.includes("accepted") || text.includes("congratulations")) {
    status = "ACCEPTED";
  } else if (text.includes("denied") || text.includes("rejected") || text.includes("unfortunately")) {
    status = "DENIED";
  } else if (text.includes("interview")) {
    status = "INTERVIEW";
  } else if (text.includes("under review")) {
    status = "UNDER_REVIEW";
  }

  res.json({ status });
});

router.post("/calendar-reminder", (req, res) => {
  const { title, date, notes } = req.body;

  res.json({
    created: true,
    provider: "google-calendar",
    title,
    date,
    notes
  });
});

module.exports = router;
