const express = require("express");
const cors = require("cors");
require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.use("/api/profile", require("./routes/profile"));
app.use("/api/servers", require("./routes/servers"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/email-parser", require("./routes/emailParser"));
app.use("/api/personalizer", require("./routes/resume"));
app.use("/api/question-mappings", require("./routes/questionMappings"));
app.use("/api/backup", require("./routes/backup"));
app.use("/api/confidence", require("./routes/confidence"));
app.use("/api/gmail", require("./routes/gmail"));
app.use("/api/google", require("./routes/google"));
app.use("/api/auth", require("./routes/auth"));

const { startEmailPolling } = require("./services/emailPoller");
startEmailPolling();

app.get("/", (req, res) => {
  res.json({
    app: "StaffForge API",
    status: "online"
  });
});

app.listen(PORT, () => {
  console.log(`[StaffForge] API running on http://localhost:${PORT}`);
});


