$ErrorActionPreference = "Stop"

$root = "C:\Users\jeffr\Desktop\StaffForge"

Write-Host "=== StaffForge Desktop Installer Generator ==="

if (!(Test-Path $root)) {
  Write-Host "StaffForge folder not found: $root"
  exit 1
}

New-Item -ItemType Directory -Force -Path "$root\desktop" | Out-Null
New-Item -ItemType Directory -Force -Path "$root\server\src\routes" | Out-Null

# README.md
@'
# StaffForge

StaffForge is a full-stack Minecraft staff application command center.

It helps manage Minecraft staff applications, generate tailored answers, safely autofill application forms for review, track statuses, prepare for interviews, export moderation CVs, and back up data.

## Features

- Profile manager
- Server tracker
- Application status tracker
- Answer generator
- AI-style answer personalizer
- Browser autofill extension
- Question mapper
- Email status parser
- Resume export
- Interview preparation
- Analytics dashboard
- Backup export
- Google integration scaffold
- Electron desktop app
- Windows installer support

## Tech Stack

- React + Vite
- Node.js + Express
- SQLite
- Electron
- Electron Builder
- jsPDF
- Browser Extension Manifest V3

## Run Backend

```bash
cd server
npm install
npm run dev