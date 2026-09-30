const body = document.body;
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle.querySelector("use");
const savedTheme = localStorage.getItem("northstar-theme");

if (savedTheme === "dark") {
  body.classList.add("theme-dark");
}

function updateThemeControl() {
  const isDark = body.classList.contains("theme-dark");
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
  body.classList.toggle("theme-dark");
  localStorage.setItem(
    "northstar-theme",
    body.classList.contains("theme-dark") ? "dark" : "light",
  );
  updateThemeControl();
});

const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");
const menuIcon = menuToggle.querySelector("use");

function closeMenu() {
  mainNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuIcon.setAttribute("href", "#i-menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
  menuIcon.setAttribute("href", isOpen ? "#i-close" : "#i-menu");
});

mainNav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));

const searchToggle = document.querySelector("#search-toggle");
const searchBar = document.querySelector("#search-bar");
const searchInput = document.querySelector("#site-search");
const searchFeedback = document.querySelector("#search-feedback");

searchToggle.addEventListener("click", () => {
  const isOpen = searchBar.hidden;
  searchBar.hidden = !isOpen;
  searchToggle.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) searchInput.focus();
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    searchFeedback.textContent = "Enter a doctor, service, or topic to search.";
    searchInput.focus();
    return;
  }

  const matches = [
    ...document.querySelectorAll(
      "main h1, main h2, main h3, main p, .doctor-specialty",
    ),
  ].filter((element) => element.textContent.toLowerCase().includes(query));
  if (matches.length) {
    matches[0].scrollIntoView({ behavior: "smooth", block: "center" });
    searchFeedback.textContent = `${matches.length} matching result${matches.length === 1 ? "" : "s"}. Showing the first.`;
  } else {
    searchFeedback.textContent =
      "No matches yet. Try a care service or doctor’s name.";
  }
});

const loginDialog = document.querySelector("#login-dialog");
document
  .querySelector("#login-open")
  .addEventListener("click", () => loginDialog.showModal());
document
  .querySelector("#login-close")
  .addEventListener("click", () => loginDialog.close());
document
  .querySelector("#login-book")
  .addEventListener("click", () => loginDialog.close());
loginDialog.addEventListener("click", (event) => {
  if (event.target === loginDialog) loginDialog.close();
});

document.querySelector("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#login-feedback").textContent =
    "Patient portal access will be available soon. Please call (800) 555-0140 for help.";
});

document
  .querySelector("#appointment-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const firstName = new FormData(event.currentTarget).get("firstName");
    document.querySelector("#appointment-feedback").textContent =
      `Thanks, ${firstName}. Our care team will be in touch soon.`;
    event.currentTarget.reset();
  });

const stories = [
  {
    quote:
      "“For the first time, I left a doctor’s office feeling like my questions actually mattered. I found the kind of care I didn’t know I was missing.”",
    name: "Sarah M.",
    description: "Northstar patient since 2021",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
  },
  {
    quote:
      "“Dr. Brooks remembered what I’d told him weeks earlier. I felt heard, included, and genuinely cared for from day one.”",
    name: "James R.",
    description: "Northstar patient since 2022",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
  },
  {
    quote:
      "“Finding someone our whole family trusts changed everything. Even my daughter looks forward to going to the doctor now.”",
    name: "Michelle T.",
    description: "Northstar patient since 2020",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&h=100&q=80",
  },
];
let activeStory = 0;

function showStory(index) {
  activeStory = (index + stories.length) % stories.length;
  const story = stories[activeStory];
  document.querySelector("#story-quote").textContent = story.quote;
  document.querySelector("#story-name").textContent = story.name;
  document.querySelector("#story-description").textContent = story.description;
  document.querySelector("#story-avatar").src = story.avatar;
  document.querySelector(".story-count").innerHTML =
    `${String(activeStory + 1).padStart(2, "0")} <span>/</span> ${String(stories.length).padStart(2, "0")}`;
}

document
  .querySelector("#story-prev")
  .addEventListener("click", () => showStory(activeStory - 1));
document
  .querySelector("#story-next")
  .addEventListener("click", () => showStory(activeStory + 1));

document
  .querySelector("#newsletter-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#newsletter-feedback").textContent =
      "You’re on the list. Take good care.";
    event.currentTarget.reset();
  });

document.querySelector("#current-year").textContent = new Date().getFullYear();

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document
    .querySelectorAll(".reveal")
    .forEach((element) => revealObserver.observe(element));
} else {
  body.classList.add("no-motion");
}
