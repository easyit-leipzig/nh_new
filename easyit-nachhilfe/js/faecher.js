/* Fächerseiten: Mobilmenü, Menüblätterung und Akkordeon-Komfort */

const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
const sidebarWindow = document.querySelector(".sidebar-scroll-window");
const scrollUpButton = document.querySelector(".sidebar-scroll-button--up");
const scrollDownButton = document.querySelector(".sidebar-scroll-button--down");

menuToggle?.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

function sidebarStep() {
  return Math.max(120, Math.round((sidebarWindow?.clientHeight || 0) * 0.6));
}

function updateSidebarButtons() {
  if (!sidebar || !sidebarWindow || !scrollUpButton || !scrollDownButton) return;

  const tolerance = 2;
  const canMoveUp = sidebarWindow.scrollTop > tolerance;
  const canMoveDown =
    sidebarWindow.scrollTop + sidebarWindow.clientHeight <
    sidebarWindow.scrollHeight - tolerance;

  scrollUpButton.hidden = !canMoveUp;
  scrollDownButton.hidden = !canMoveDown;
  sidebar.classList.toggle("has-overflow-above", canMoveUp);
  sidebar.classList.toggle("has-overflow-below", canMoveDown);
}

scrollUpButton?.addEventListener("click", () => {
  sidebarWindow?.scrollBy({ top: -sidebarStep(), behavior: "smooth" });
});

scrollDownButton?.addEventListener("click", () => {
  sidebarWindow?.scrollBy({ top: sidebarStep(), behavior: "smooth" });
});

sidebarWindow?.addEventListener("scroll", updateSidebarButtons, { passive: true });
window.addEventListener("resize", updateSidebarButtons);
window.addEventListener("load", updateSidebarButtons);

sidebarWindow?.addEventListener("wheel", event => {
  const canMove =
    (event.deltaY < 0 && sidebarWindow.scrollTop > 0) ||
    (event.deltaY > 0 &&
      sidebarWindow.scrollTop + sidebarWindow.clientHeight <
      sidebarWindow.scrollHeight);

  if (canMove) {
    event.preventDefault();
    sidebarWindow.scrollBy({ top: event.deltaY, behavior: "auto" });
  }
}, { passive: false });

/*
 * Optionaler Komfort:
 * Beim Öffnen eines Akkordeons wird kein anderes automatisch geschlossen.
 * Dadurch können mehrere Themen zum direkten Vergleich offen bleiben.
 */
document.querySelectorAll(".subject-accordion").forEach(item => {
  item.addEventListener("toggle", () => {
    /* Kein automatischer Seitensprung beim Öffnen. */
  });
});

if ("ResizeObserver" in window && sidebarWindow) {
  const observer = new ResizeObserver(updateSidebarButtons);
  observer.observe(sidebarWindow);

  const content = sidebarWindow.querySelector(".sidebar-scroll-content");
  if (content) observer.observe(content);
}

window.setTimeout(updateSidebarButtons, 0);


/* Hauptmenüpunkt der aktuellen Unterseite dauerhaft hervorheben */
const pageNavigationSection = document.body.dataset.activeNav;

if (pageNavigationSection) {
  document
    .querySelectorAll(".sidebar nav a[data-nav-section]")
    .forEach(link => {
      const isCurrent =
        link.dataset.navSection === pageNavigationSection;

      link.classList.toggle("active", isCurrent);

      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
}


/* Seite ohne expliziten Anker immer oben starten */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", () => {
  const hasExplicitTarget =
    window.location.hash &&
    document.querySelector(window.location.hash);

  if (!hasExplicitTarget) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  updateSidebarButtons();
});
