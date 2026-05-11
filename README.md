# StaffForge

> **The ultimate Minecraft staff application command center.**

StaffForge is a professional full-stack platform and desktop application that helps players create, manage, track, and optimize staff applications for Minecraft servers.

Built for aspiring **Helpers, Moderators, and Administrators**, StaffForge combines application management, AI-assisted answer generation, interview preparation, and productivity tools into one unified dashboard.

---

## Features

### Application Management

* Create and manage multiple application profiles
* Track applications across different Minecraft servers
* Monitor application statuses:

  * Pending
  * Accepted
  * Denied
  * Interview
* View acceptance analytics and historical data

### Automation Tools

* Universal browser autofill
* Custom question-to-answer mapping
* AI-assisted personalized answer generation
* One-click profile switching

### Career Development Tools

* Moderation résumé/CV builder
* Interview preparation and practice questions
* Staff experience tracker
* Skills and achievements manager

### Integrations

* Gmail email parsing
* Automatic email polling for application updates
* Google Calendar interview reminders
* Supabase cloud synchronization

### Desktop Application

* Cross-platform Electron desktop app
* Windows installer support
* Auto-updater
* Custom application icon

### Security

* Authentication system
* Multi-user accounts
* JWT-based session management
* Secure local storage

---

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express

### Database

* SQLite (local)
* Supabase (cloud)

### Integrations

* Google APIs (Gmail and Calendar)

### Desktop

* Electron
* Electron Builder

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/tyl-droid/STAFFFORGE.git
cd STAFFFORGE
```

### Install Dependencies

```bash
npm install
cd web
npm install
cd ..
```

### Start Development Mode

```bash
npm run dev
```

### Launch Desktop App

```bash
npm run desktop
```

### Build Production Installer

```bash
npm run build
npm run dist
```

---

## Project Structure

```text
STAFFFORGE/
├── server/        # Express API and database
├── web/           # React frontend
├── electron/      # Electron desktop wrapper
├── dist/          # Generated installers
└── README.md
```

---

## Safety Philosophy

StaffForge is designed to help users prepare high-quality staff applications while maintaining authenticity and full user control.

### Important Principles

* StaffForge never submits applications automatically.
* All autofill actions require manual review before submission.
* Users remain fully responsible for all content they submit.
* AI-generated suggestions are designed to enhance authenticity, not replace it.

---

## Use Cases

StaffForge is ideal for:

* Applying for Helper, Moderator, and Administrator positions
* Tracking multiple applications across different Minecraft servers
* Preparing for interviews and moderation scenarios
* Organizing moderation experience, skills, and achievements

---

## Roadmap

* [ ] Application Templates Marketplace
* [ ] Advanced Analytics Dashboard
* [ ] AI Interview Simulator
* [ ] Discord Integration
* [ ] Mobile Companion App
* [ ] Multi-language Support

---

## Author

**Tyler Jeffries (Nexi / Nexi_CSN)**
Founder of Community Shield Network (CSN) and BLACKGRID

* GitHub: [tyl-droid](https://github.com/tyl-droid?utm_source=chatgpt.com)
* YouTube: [CommunityShieldOfficial](https://www.youtube.com/@CommunityShieldOfficial?utm_source=chatgpt.com)

---

## License

This project is licensed under the MIT License.

---

## Disclaimer

StaffForge is an independent productivity tool and is not affiliated with Mojang, Microsoft, or any Minecraft server network.
