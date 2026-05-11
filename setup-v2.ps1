# =========================
# StaffForge v2 Scaffolder
# =========================

$root = "C:\Users\jeffr\Desktop\StaffForge"

Write-Host "Creating StaffForge v2 files..."

# Backend folders
New-Item -ItemType Directory -Force -Path "$root\server\src\services" | Out-Null
New-Item -ItemType Directory -Force -Path "$root\server\src\routes" | Out-Null

# Frontend folders
New-Item -ItemType Directory -Force -Path "$root\web\src\pages" | Out-Null
New-Item -ItemType Directory -Force -Path "$root\web\src\utils" | Out-Null

# Backend service files
@(
  "personalizer.js",
  "emailParser.js",
  "analytics.js",
  "backup.js"
) | ForEach-Object {
  New-Item -ItemType File -Force -Path "$root\server\src\services\$_" | Out-Null
}

# Backend route files
@(
  "questionMappings.js",
  "resume.js",
  "emailParser.js",
  "backup.js"
) | ForEach-Object {
  New-Item -ItemType File -Force -Path "$root\server\src\routes\$_" | Out-Null
}

# Frontend pages
@(
  "ResumeExport.jsx",
  "InterviewPrep.jsx",
  "EmailParser.jsx",
  "QuestionMapper.jsx",
  "Personalizer.jsx",
  "BackupRestore.jsx",
  "ExtensionGuide.jsx"
) | ForEach-Object {
  New-Item -ItemType File -Force -Path "$root\web\src\pages\$_" | Out-Null
}

# Frontend utils
@(
  "exportPdf.js",
  "exportWord.js",
  "downloadJson.js"
) | ForEach-Object {
  New-Item -ItemType File -Force -Path "$root\web\src\utils\$_" | Out-Null
}

Write-Host "StaffForge v2 file structure created successfully."