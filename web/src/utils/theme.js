export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("staffforge-theme", theme);
}

export function loadTheme() {
  const saved = localStorage.getItem("staffforge-theme") || "terminal";
  document.documentElement.setAttribute("data-theme", saved);
  return saved;
}
