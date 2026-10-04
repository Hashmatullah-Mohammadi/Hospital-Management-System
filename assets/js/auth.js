const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle.querySelector("use");
const savedTheme = localStorage.getItem("northstar-theme");

if (savedTheme === "dark") document.body.classList.add("theme-dark");

function updateThemeControl() {
  const isDark = document.body.classList.contains("theme-dark");
  themeIcon.setAttribute("href", isDark ? "#i-sun" : "#i-moon");
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
  document.querySelector('meta[name="theme-color"]').content = isDark
    ? "#0c1823"
    : "#f8fafc";
}

updateThemeControl();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("theme-dark");
  localStorage.setItem(
    "northstar-theme",
    document.body.classList.contains("theme-dark") ? "dark" : "light",
  );
  updateThemeControl();
});

document
  .querySelector("#login-form, #register-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#auth-feedback").textContent =
      "Patient account access is not connected yet. Please call (800) 555-0140 for assistance.";
  });
