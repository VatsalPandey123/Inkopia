// Handle splash page redirect
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Splash redirect
  if (body.classList.contains("splash-page")) {
    setTimeout(() => {
      window.location.href = "home.html";
    }, 2600);
  }

  // === Theme Toggle ===
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme");

  // Apply saved theme
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  // Toggle on click
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Update year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Wishlist button toggle (simple demo)
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.toggle("wishlist-active");
      btn.textContent = isActive ? "♥ In Wishlist" : "♡ Wishlist";
    });
  });

  // Catalog page search & filter
  const searchInput = document.getElementById("searchInput");
  const genreFilter = document.getElementById("genreFilter");
  const catalogGrid = document.getElementById("catalogGrid");
  const noResults = document.getElementById("noResults");

  function filterBooks() {
    if (!catalogGrid) return;

    const cards = catalogGrid.querySelectorAll(".book-card");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const genre = genreFilter ? genreFilter.value : "all";

    let visibleCount = 0;

    cards.forEach((card) => {
      const title = card.getAttribute("data-title").toLowerCase();
      const author = card.getAttribute("data-author").toLowerCase();
      const cardGenre = card.getAttribute("data-genre");

      const matchesText =
        !query ||
        title.includes(query) ||
        author.includes(query) ||
        cardGenre.toLowerCase().includes(query);

      const matchesGenre = genre === "all" || cardGenre === genre;

      if (matchesText && matchesGenre) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterBooks);
  }

  if (genreFilter) {
    genreFilter.addEventListener("change", filterBooks);
  }

  // Contact form handler (demo only)
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formSuccess) {
        formSuccess.style.display = "block";
      }
      contactForm.reset();
    });
  }
});
