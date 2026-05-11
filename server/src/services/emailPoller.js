const cron = require("node-cron");

function startEmailPolling() {
  cron.schedule("*/15 * * * *", () => {
    console.log("[StaffForge] Email polling check...");
  });
}

module.exports = { startEmailPolling };
