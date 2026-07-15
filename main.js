// Get DOM elements
const themeBtn = document.getElementById("themeBtn");
const THEME_KEY = "ahmed-theme"; // key used to store theme in localStorage
const themes = ["light", "dark", "auto"]; // available themes
const ham = document.getElementById("hamburger");
const mobPanel = document.getElementById("mobilePanel");
const form = document.getElementById("contact-form");

// --- Footer Year ---
// Automatically set the current year in the footer element with id="year"
document.getElementById("year").textContent = new Date().getFullYear();

// --- Page Load Animation ---
// When the page fully loads, add a "loaded" class to <body> to trigger CSS animations
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// --- Theme Management ---
// Apply selected theme to the <html> element and update the button icon
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  themeBtn.textContent =
    theme === "dark" ? "☀️" : theme === "light" ? "🌙" : "🌓"; // update button icon
}

// Load saved theme from localStorage or default to "light"
function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);
  return savedTheme;
}

// Set initial theme
let currentTheme = loadTheme();

// --- Theme Toggle Button ---
// Cycle through themes (light → dark → auto → light)
themeBtn.addEventListener("click", () => {
  const currentIndex = (themes.indexOf(currentTheme) + 1) % themes.length;

  currentTheme = themes[currentIndex];
  localStorage.setItem(THEME_KEY, currentTheme); // save theme

  // Change hamburger color depending on theme
  if (currentTheme === "dark" || currentTheme === "auto") {
    ham.style.color = "#e8e8e8"; // light color in dark mode
  } else {
    ham.style.color = "#000"; // dark color in light mode
  }

  applyTheme(currentTheme);
});

// --- Mobile Navigation ---
// Toggle mobile panel open/close when hamburger is clicked
ham?.addEventListener("click", () => {
  mobPanel.classList.toggle("open");
});

// Close mobile panel when a link inside it is clicked
mobPanel?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobPanel.classList.remove("open");
  });
});

// --- Projects "Show more" toggle ---
const projectsGrid = document.getElementById("projectsGrid");
const showMoreBtn = document.getElementById("showMoreBtn");
const projects = projectsGrid
  ? Array.from(projectsGrid.querySelectorAll(".project"))
  : [];
let projectsExpanded = false;

const getMaxVisibleProjects = () =>
  window.matchMedia("(min-width: 1000px)").matches ? 3 : 2;

const renderProjectVisibility = () => {
  if (!showMoreBtn) return;

  const maxVisible = getMaxVisibleProjects();
  const hiddenCount = Math.max(0, projects.length - maxVisible);

  projects.forEach((project, index) => {
    const hideProject = !projectsExpanded && index >= maxVisible;
    project.classList.toggle("hidden-project", hideProject);
  });

  if (hiddenCount > 0) {
    showMoreBtn.textContent = projectsExpanded
      ? "Show less"
      : `Show ${hiddenCount} more`;
  } else {
    projectsExpanded = false;
  }
};

showMoreBtn?.addEventListener("click", () => {
  projectsExpanded = !projectsExpanded;
  renderProjectVisibility();
});

window.addEventListener("resize", () => {
  renderProjectVisibility();
});

renderProjectVisibility();

// --- Contact Form ---
// When the form is submitted, prevent normal submission and open email client with filled details
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const name = encodeURIComponent(formData.get("name"));
  const email = encodeURIComponent(formData.get("email"));
  const message = encodeURIComponent(formData.get("message"));

  // Email subject and body with form data
  const subject = `New project from ${decodeURIComponent(name)}`;
  const body = `Name: ${decodeURIComponent(name)}%0AEmail: ${decodeURIComponent(
    email,
  )}%0A%0A${decodeURIComponent(message)}`;

  // Open mail client (mailto link)
  window.location.href = `mailto:ahmed_ashraf2010@yahoo.com?subject=${encodeURIComponent(
    subject,
  )}&body=${body}`;
});
