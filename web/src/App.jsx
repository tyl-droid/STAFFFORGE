import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";

const API = "http://localhost:5000";

const defaultProfile = {
  minecraft_username: "",
  discord: "",
  age: "",
  timezone: "",
  experience: "",
  why_staff: "",
  availability: "",
};

const statuses = [
  "DRAFTED",
  "READY_TO_SUBMIT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "INTERVIEW",
  "ACCEPTED",
  "DENIED",
  "WITHDRAWN",
];

const answerKeys = [
  "minecraftUsername",
  "discord",
  "age",
  "timezone",
  "languages",
  "gamemodes",
  "whyStaff",
  "asset",
  "experience",
  "availability",
  "strengthsWeaknesses",
  "hacker",
  "argument",
  "favorite",
  "anythingElse",
];

function App() {
  const [page, setPage] = useState("dashboard");
  const [profile, setProfile] = useState(defaultProfile);
  const [servers, setServers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [message, setMessage] = useState("");

  const [serverForm, setServerForm] = useState({ name: "", website: "", application_url: "", notes: "" });
  const [appForm, setAppForm] = useState({ server_id: "", status: "DRAFTED", date_applied: "", notes: "" });
  const [emailText, setEmailText] = useState("");
  const [emailResult, setEmailResult] = useState("");
  const [mappingForm, setMappingForm] = useState({ pattern: "", answer_key: "whyStaff" });
  const [personalizer, setPersonalizer] = useState({ serverName: "", serverDescription: "", baseAnswer: "" });
  const [personalizedAnswer, setPersonalizedAnswer] = useState("");

  async function loadAll() {
    const [p, s, a, m] = await Promise.all([
      fetch(`${API}/api/profile`).then(r => r.json()),
      fetch(`${API}/api/servers`).then(r => r.json()),
      fetch(`${API}/api/applications`).then(r => r.json()),
      fetch(`${API}/api/question-mappings`).then(r => r.json()).catch(() => []),
    ]);
    setProfile({ ...defaultProfile, ...p });
    setServers(s);
    setApplications(a);
    setMappings(m);
  }

  useEffect(() => { loadAll(); }, []);

  const analytics = useMemo(() => {
    const total = applications.length;
    const accepted = applications.filter(a => a.status === "ACCEPTED").length;
    const denied = applications.filter(a => a.status === "DENIED").length;
    const review = applications.filter(a => a.status === "UNDER_REVIEW").length;
    const interview = applications.filter(a => a.status === "INTERVIEW").length;
    const rate = total ? Math.round((accepted / total) * 100) : 0;
    return { total, accepted, denied, review, interview, rate };
  }, [applications]);

  async function saveProfile() {
    await fetch(`${API}/api/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setMessage("Profile saved.");
    loadAll();
  }

  async function addServer() {
    if (!serverForm.name.trim()) return setMessage("Server name required.");
    await fetch(`${API}/api/servers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serverForm),
    });
    setServerForm({ name: "", website: "", application_url: "", notes: "" });
    setMessage("Server added.");
    loadAll();
  }

  async function deleteServer(id) {
    await fetch(`${API}/api/servers/${id}`, { method: "DELETE" });
    setMessage("Server deleted.");
    loadAll();
  }

  async function addApplication() {
    if (!appForm.server_id) return setMessage("Choose a server first.");
    await fetch(`${API}/api/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appForm),
    });
    setAppForm({ server_id: "", status: "DRAFTED", date_applied: "", notes: "" });
    setMessage("Application created.");
    loadAll();
  }

  async function updateStatus(id, status) {
    await fetch(`${API}/api/applications/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setMessage("Status updated.");
    loadAll();
  }

  async function deleteApplication(id) {
    await fetch(`${API}/api/applications/${id}`, { method: "DELETE" });
    setMessage("Application deleted.");
    loadAll();
  }

  function generateAnswers(serverName = "this server") {
    return `Minecraft Username:
${profile.minecraft_username || "N/A"}

Discord:
${profile.discord || "N/A"}

Age:
${profile.age || "N/A"}

Timezone:
${profile.timezone || "N/A"}

Why do you want to become staff on ${serverName}?
${profile.why_staff || "I want to become staff because I enjoy helping players, supporting communities, and keeping servers safe, fair, and welcoming."}

Previous experience:
${profile.experience || "Previous Minecraft and forum moderation experience."}

Why should we choose you?
You should choose me because I am reliable, mature, and focused on protecting the community. I can handle reports, help players, de-escalate arguments, and follow staff procedures properly.

Availability:
${profile.availability || "Most evenings and weekends."}`;
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
    setMessage("Copied to clipboard.");
  }

  function exportPdf() {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(`StaffForge Moderation CV

Minecraft Username: ${profile.minecraft_username}
Discord: ${profile.discord}
Age: ${profile.age}
Timezone: ${profile.timezone}

Experience:
${profile.experience}

Why Staff:
${profile.why_staff}

Availability:
${profile.availability}

Skills:
- Moderation
- Conflict resolution
- Report handling
- Community safety
- Leadership
- Teamwork`, 180);

    doc.text(lines, 10, 15);
    doc.save("StaffForge-Moderation-CV.pdf");
  }

  function exportWord() {
    const html = `
      <html><body>
      <h1>StaffForge Moderation CV</h1>
      <p><b>Minecraft Username:</b> ${profile.minecraft_username}</p>
      <p><b>Discord:</b> ${profile.discord}</p>
      <p><b>Age:</b> ${profile.age}</p>
      <p><b>Timezone:</b> ${profile.timezone}</p>
      <h2>Experience</h2><p>${profile.experience}</p>
      <h2>Why Staff</h2><p>${profile.why_staff}</p>
      <h2>Availability</h2><p>${profile.availability}</p>
      </body></html>
    `;
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "StaffForge-Moderation-CV.doc";
    a.click();
  }

  async function parseEmail() {
    const res = await fetch(`${API}/api/email-parser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: emailText }),
    });
    const data = await res.json();
    setEmailResult(data.status);
  }

  async function addMapping() {
    await fetch(`${API}/api/question-mappings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mappingForm),
    });
    setMappingForm({ pattern: "", answer_key: "whyStaff" });
    setMessage("Question mapping added.");
    loadAll();
  }

  async function deleteMapping(id) {
    await fetch(`${API}/api/question-mappings/${id}`, { method: "DELETE" });
    setMessage("Mapping deleted.");
    loadAll();
  }

  async function runPersonalizer() {
    const res = await fetch(`${API}/api/personalizer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personalizer),
    });
    const data = await res.json();
    setPersonalizedAnswer(data.answer);
  }

  async function backupData() {
    const data = await fetch(`${API}/api/backup`).then(r => r.json());
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "staffforge-backup.json";
    a.click();
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>?? StaffForge</h1>
        {["dashboard","profile","servers","applications","generator","personalizer","resume","interview","email","mapper","backup","extension","analytics"].map(p => (
          <button key={p} onClick={() => setPage(p)}>{p.toUpperCase()}</button>
        ))}
      </aside>

      <main className="main">
        {message && <div className="message">{message}</div>}

        {page === "dashboard" && <>
          <h2>Dashboard</h2>
          <div className="grid">
            <div className="card"><h3>{servers.length}</h3><p>Servers</p></div>
            <div className="card"><h3>{analytics.total}</h3><p>Applications</p></div>
            <div className="card"><h3>{analytics.review}</h3><p>Under Review</p></div>
            <div className="card"><h3>{analytics.accepted}</h3><p>Accepted</p></div>
          </div>
        </>}

        {page === "profile" && <>
          <h2>Profile</h2>
          {Object.keys(defaultProfile).map(key =>
            ["experience","why_staff","availability"].includes(key) ? (
              <textarea key={key} placeholder={key} value={profile[key] || ""} onChange={e => setProfile({ ...profile, [key]: e.target.value })} />
            ) : (
              <input key={key} placeholder={key} value={profile[key] || ""} onChange={e => setProfile({ ...profile, [key]: e.target.value })} />
            )
          )}
          <button onClick={saveProfile}>Save Profile</button>
        </>}

        {page === "servers" && <>
          <h2>Servers</h2>
          <input placeholder="Server name" value={serverForm.name} onChange={e => setServerForm({ ...serverForm, name: e.target.value })} />
          <input placeholder="Website" value={serverForm.website} onChange={e => setServerForm({ ...serverForm, website: e.target.value })} />
          <input placeholder="Application URL" value={serverForm.application_url} onChange={e => setServerForm({ ...serverForm, application_url: e.target.value })} />
          <textarea placeholder="Notes" value={serverForm.notes} onChange={e => setServerForm({ ...serverForm, notes: e.target.value })} />
          <button onClick={addServer}>Add Server</button>
          {servers.map(s => <div className="listItem" key={s.id}><b>{s.name}</b><p>{s.notes}</p>{s.application_url && <a target="_blank" href={s.application_url}>Open Application</a>}<button onClick={() => deleteServer(s.id)}>Delete</button></div>)}
        </>}

        {page === "applications" && <>
          <h2>Applications</h2>
          <select value={appForm.server_id} onChange={e => setAppForm({ ...appForm, server_id: e.target.value })}>
            <option value="">Choose server</option>
            {servers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select value={appForm.status} onChange={e => setAppForm({ ...appForm, status: e.target.value })}>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
          <input type="date" value={appForm.date_applied} onChange={e => setAppForm({ ...appForm, date_applied: e.target.value })} />
          <textarea placeholder="Notes" value={appForm.notes} onChange={e => setAppForm({ ...appForm, notes: e.target.value })} />
          <button onClick={addApplication}>Create Application</button>
          {applications.map(a => <div className="listItem" key={a.id}><b>{a.server_name}</b><p>{a.status}</p><select value={a.status} onChange={e => updateStatus(a.id, e.target.value)}>{statuses.map(s => <option key={s}>{s}</option>)}</select><button onClick={() => deleteApplication(a.id)}>Delete</button></div>)}
        </>}

        {page === "generator" && <>
          <h2>Answer Generator</h2>
          {servers.map(s => {
            const text = generateAnswers(s.name);
            return <div className="listItem" key={s.id}><h3>{s.name}</h3><textarea readOnly value={text} /><button onClick={() => copyText(text)}>Copy</button></div>
          })}
        </>}

        {page === "personalizer" && <>
          <h2>AI Personalization</h2>
          <input placeholder="Server name" value={personalizer.serverName} onChange={e => setPersonalizer({ ...personalizer, serverName: e.target.value })} />
          <textarea placeholder="Server description/rules/values" value={personalizer.serverDescription} onChange={e => setPersonalizer({ ...personalizer, serverDescription: e.target.value })} />
          <textarea placeholder="Base answer" value={personalizer.baseAnswer} onChange={e => setPersonalizer({ ...personalizer, baseAnswer: e.target.value })} />
          <button onClick={runPersonalizer}>Personalize</button>
          <textarea readOnly value={personalizedAnswer} />
          <button onClick={() => copyText(personalizedAnswer)}>Copy Personalized Answer</button>
        </>}

        {page === "resume" && <>
          <h2>Resume Export</h2>
          <button onClick={exportPdf}>Export PDF</button>
          <button onClick={exportWord}>Export Word</button>
        </>}

        {page === "interview" && <>
          <h2>Interview Prep</h2>
          {[
            "Why do you want to become staff?",
            "How would you handle a toxic player?",
            "What would you do if your friend broke the rules?",
            "How would you handle a hacker?",
            "What are your strengths and weaknesses?",
            "Why should we choose you over other applicants?"
          ].map(q => <div className="listItem" key={q}><b>{q}</b><p>Practice answering calmly, fairly, and with evidence-based moderation.</p></div>)}
        </>}

        {page === "email" && <>
          <h2>Email Status Parser</h2>
          <textarea placeholder="Paste application email/message here" value={emailText} onChange={e => setEmailText(e.target.value)} />
          <button onClick={parseEmail}>Parse Status</button>
          {emailResult && <div className="card"><h3>{emailResult}</h3></div>}
        </>}

        {page === "mapper" && <>
          <h2>Question Mapper</h2>
          <input placeholder="Question pattern" value={mappingForm.pattern} onChange={e => setMappingForm({ ...mappingForm, pattern: e.target.value })} />
          <select value={mappingForm.answer_key} onChange={e => setMappingForm({ ...mappingForm, answer_key: e.target.value })}>
            {answerKeys.map(k => <option key={k}>{k}</option>)}
          </select>
          <button onClick={addMapping}>Add Mapping</button>
          {mappings.map(m => <div className="listItem" key={m.id}><b>{m.pattern}</b><p>{m.answer_key}</p><button onClick={() => deleteMapping(m.id)}>Delete</button></div>)}
        </>}

        {page === "backup" && <>
          <h2>Backup / Restore</h2>
          <button onClick={backupData}>Download Backup JSON</button>
        </>}

        {page === "extension" && <>
          <h2>Extension Guide</h2>
          <div className="panel">
            <p>Use the StaffForge Autofill extension on application pages. It fills recognised questions only and never submits forms.</p>
            <p>Reload it from edge://extensions after editing content.js.</p>
          </div>
        </>}

        {page === "analytics" && <>
          <h2>Analytics</h2>
          <div className="grid">
            <div className="card"><h3>{analytics.total}</h3><p>Total</p></div>
            <div className="card"><h3>{analytics.review}</h3><p>Review</p></div>
            <div className="card"><h3>{analytics.interview}</h3><p>Interview</p></div>
            <div className="card"><h3>{analytics.accepted}</h3><p>Accepted</p></div>
            <div className="card"><h3>{analytics.denied}</h3><p>Denied</p></div>
            <div className="card"><h3>{analytics.rate}%</h3><p>Acceptance Rate</p></div>
          </div>
        </>}
      </main>
    </div>
  );
}

export default App;
