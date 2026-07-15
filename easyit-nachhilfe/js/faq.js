/*
=================================================================
 FAQ-SEITE
 - Mobilmenü
 - Seitenleistensteuerung ohne sichtbare Scrollbar
 - FAQ-Suche
 - aktive Kategorie in der Unter-Navigation
=================================================================
*/

const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
const sidebarWindow = document.querySelector(".sidebar-scroll-window");
const scrollUpButton = document.querySelector(".sidebar-scroll-button--up");
const scrollDownButton = document.querySelector(".sidebar-scroll-button--down");

/* Hauptmenüpunkt FAQ dauerhaft aktiv halten */
document
  .querySelectorAll(".sidebar nav a[data-nav-section]")
  .forEach(link => {
    const active = link.dataset.navSection === "faq";
    link.classList.toggle("active", active);

    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

/* Mobilmenü */
menuToggle?.addEventListener("click", () => {
  const open = sidebar?.classList.toggle("open") ?? false;
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar?.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/* Seitenleiste */
function sidebarStep() {
  return Math.max(
    120,
    Math.round((sidebarWindow?.clientHeight || 0) * 0.6)
  );
}

function updateSidebarButtons() {
  if (!sidebar || !sidebarWindow || !scrollUpButton || !scrollDownButton) {
    return;
  }

  const tolerance = 2;
  const canUp = sidebarWindow.scrollTop > tolerance;
  const canDown =
    sidebarWindow.scrollTop + sidebarWindow.clientHeight <
    sidebarWindow.scrollHeight - tolerance;

  scrollUpButton.hidden = !canUp;
  scrollDownButton.hidden = !canDown;

  sidebar.classList.toggle("has-overflow-above", canUp);
  sidebar.classList.toggle("has-overflow-below", canDown);
}

scrollUpButton?.addEventListener("click", () => {
  sidebarWindow?.scrollBy({
    top: -sidebarStep(),
    behavior: "smooth"
  });
});

scrollDownButton?.addEventListener("click", () => {
  sidebarWindow?.scrollBy({
    top: sidebarStep(),
    behavior: "smooth"
  });
});

sidebarWindow?.addEventListener(
  "scroll",
  updateSidebarButtons,
  { passive: true }
);

window.addEventListener("resize", updateSidebarButtons);
window.addEventListener("load", updateSidebarButtons);

/* FAQ-Suche */
const searchInput = document.querySelector("#faq-search-input");
const searchStatus = document.querySelector("#faq-search-status");
const faqItems = [...document.querySelectorAll(".faq-item")];

function normalizeText(value) {
  return String(value || "")
    .toLocaleLowerCase("de")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function filterFaq() {
  const query = normalizeText(searchInput?.value.trim());
  let matches = 0;

  faqItems.forEach(item => {
    const visible =
      query === "" ||
      normalizeText(item.textContent).includes(query);

    item.classList.toggle("is-filtered-out", !visible);

    if (visible) {
      matches += 1;

      if (query !== "") {
        item.open = true;
      }
    }
  });

  if (!searchStatus) return;

  if (query === "") {
    searchStatus.textContent =
      `${faqItems.length} Fragen in fünf Themenbereichen`;
  } else if (matches === 1) {
    searchStatus.textContent = "Eine passende Frage gefunden.";
  } else {
    searchStatus.textContent =
      `${matches} passende Fragen gefunden.`;
  }
}

searchInput?.addEventListener("input", filterFaq);
filterFaq();

/* Aktive FAQ-Kategorie */
const categoryLinks = [...document.querySelectorAll(".faq-subnav a")];
const categories = [...document.querySelectorAll(".faq-category[id]")];

const categoryObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    categoryLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${entry.target.id}`
      );
    });
  });
}, {
  rootMargin: "-25% 0px -65% 0px",
  threshold: 0
});

categories.forEach(category => categoryObserver.observe(category));

if ("ResizeObserver" in window && sidebarWindow) {
  const observer = new ResizeObserver(updateSidebarButtons);
  observer.observe(sidebarWindow);

  const content =
    sidebarWindow.querySelector(".sidebar-scroll-content");

  if (content) {
    observer.observe(content);
  }
}

window.setTimeout(updateSidebarButtons, 0);
