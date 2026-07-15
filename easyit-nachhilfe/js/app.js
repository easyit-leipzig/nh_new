/*
=================================================================
 easyIT – Navigation und Scroll-Hervorhebung
=================================================================

 Aufgaben:
 1. Mobilmenü öffnen und schließen.
 2. Auf der Startseite den sichtbaren Inhaltsabschnitt erkennen.
 3. Den passenden Hauptmenüpunkt hervorheben – auch dann, wenn
    dieser auf eine Unterseite statt auf einen Anker verweist.
 4. Auf Unterseiten den zugehörigen Hauptpunkt dauerhaft aktiv halten.
 5. Die Seitenleiste ohne sichtbare Scrollbar bedienen.
=================================================================
*/

const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
const sidebarWindow = document.querySelector(".sidebar-scroll-window");
const scrollUpButton = document.querySelector(".sidebar-scroll-button--up");
const scrollDownButton = document.querySelector(".sidebar-scroll-button--down");

const mainNavigationLinks = [
  ...document.querySelectorAll(".sidebar nav a[data-nav-section]")
];

/* -------------------------------------------------------------
   Hilfsfunktion: genau einen Hauptmenüpunkt aktiv setzen
   ------------------------------------------------------------- */
function setActiveMainNavigation(sectionName) {
  if (!sectionName) return;

  mainNavigationLinks.forEach(link => {
    const isActive = link.dataset.navSection === sectionName;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  revealActiveNavigationLink();
}

/* -------------------------------------------------------------
   Unterseiten:
   Der Body enthält data-active-nav="faecher", "methodik" usw.
   Dadurch bleibt der übergeordnete Hauptmenüpunkt aktiv.
   ------------------------------------------------------------- */
function applyPageLevelNavigationState() {
  const activeSection = document.body.dataset.activeNav;

  if (activeSection) {
    setActiveMainNavigation(activeSection);
  }
}

/* -------------------------------------------------------------
   Startseite:
   Scrollposition bestimmen und sichtbaren Abschnitt hervorheben.

   Wichtig:
   Der Menülink "Fächer" verweist auf faecher.html. Deshalb wird
   nicht mehr die href-Adresse verglichen, sondern data-nav-section.
   ------------------------------------------------------------- */
function setupStartPageScrollSpy() {
  if (document.body.dataset.page !== "startseite") return;

  const observedSections = [
    ...document.querySelectorAll("main section[id]")
  ].filter(section =>
    mainNavigationLinks.some(
      link => link.dataset.navSection === section.id
    )
  );

  if (!observedSections.length) return;

  let visibleSections = new Map();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleSections.set(entry.target.id, entry.intersectionRatio);
      } else {
        visibleSections.delete(entry.target.id);
      }
    });

    if (visibleSections.size === 0) return;

    const activeSection = [...visibleSections.entries()]
      .sort((a, b) => b[1] - a[1])[0][0];

    setActiveMainNavigation(activeSection);
  }, {
    root: null,
    rootMargin: "-18% 0px -62% 0px",
    threshold: [0.01, 0.15, 0.35, 0.6]
  });

  observedSections.forEach(section => observer.observe(section));

  /*
   * Fallback für sehr kurze Abschnitte oder schnelle Scrollbewegungen:
   * Der Abschnitt, dessen Oberkante der Bezugslinie am nächsten liegt,
   * wird aktiv gesetzt.
   */
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (ticking) return;

    ticking = true;

    window.requestAnimationFrame(() => {
      const referenceLine = window.innerHeight * 0.30;

      const nearestSection = observedSections
        .map(section => ({
          id: section.id,
          distance: Math.abs(section.getBoundingClientRect().top - referenceLine)
        }))
        .sort((a, b) => a.distance - b.distance)[0];

      if (nearestSection) {
        setActiveMainNavigation(nearestSection.id);
      }

      ticking = false;
    });
  }, { passive: true });
}

/* -------------------------------------------------------------
   Mobilmenü
   ------------------------------------------------------------- */
menuToggle?.addEventListener("click", () => {
  const isOpen = sidebar?.classList.toggle("open") ?? false;

  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar?.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/* -------------------------------------------------------------
   Seitenleiste ohne sichtbare Scrollbar
   ------------------------------------------------------------- */
function getSidebarScrollStep() {
  if (!sidebarWindow) return 0;

  return Math.max(
    120,
    Math.round(sidebarWindow.clientHeight * 0.60)
  );
}

function updateSidebarButtons() {
  if (
    !sidebar ||
    !sidebarWindow ||
    !scrollUpButton ||
    !scrollDownButton
  ) {
    return;
  }

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
  sidebarWindow?.scrollBy({
    top: -getSidebarScrollStep(),
    behavior: "smooth"
  });
});

scrollDownButton?.addEventListener("click", () => {
  sidebarWindow?.scrollBy({
    top: getSidebarScrollStep(),
    behavior: "smooth"
  });
});

sidebarWindow?.addEventListener("scroll", updateSidebarButtons, {
  passive: true
});

sidebarWindow?.addEventListener("wheel", event => {
  if (!sidebarWindow) return;

  const canMove =
    (event.deltaY < 0 && sidebarWindow.scrollTop > 0) ||
    (event.deltaY > 0 &&
      sidebarWindow.scrollTop + sidebarWindow.clientHeight <
      sidebarWindow.scrollHeight);

  if (canMove) {
    event.preventDefault();

    sidebarWindow.scrollBy({
      top: event.deltaY,
      behavior: "auto"
    });
  }
}, { passive: false });

sidebarWindow?.addEventListener("keydown", event => {
  if (!sidebarWindow) return;

  const step = getSidebarScrollStep();
  const actions = {
    ArrowUp: -56,
    ArrowDown: 56,
    PageUp: -step,
    PageDown: step,
    Home: -sidebarWindow.scrollHeight,
    End: sidebarWindow.scrollHeight
  };

  if (!(event.key in actions)) return;

  event.preventDefault();

  sidebarWindow.scrollBy({
    top: actions[event.key],
    behavior: "smooth"
  });
});

/* -------------------------------------------------------------
   Aktiven Menüpunkt im sichtbaren Bereich halten
   ------------------------------------------------------------- */
function revealActiveNavigationLink() {
  if (!sidebarWindow) return;

  const activeLink = sidebarWindow.querySelector("nav a.active");

  if (!activeLink) return;

  /*
   * Kein scrollIntoView() verwenden:
   * Diese Methode kann auch das gesamte Dokument verschieben.
   * Hier wird ausschließlich der interne Menübereich angepasst.
   */
  const linkTop = activeLink.offsetTop;
  const linkBottom = linkTop + activeLink.offsetHeight;
  const visibleTop = sidebarWindow.scrollTop;
  const visibleBottom = visibleTop + sidebarWindow.clientHeight;

  if (linkTop < visibleTop) {
    sidebarWindow.scrollTo({
      top: Math.max(0, linkTop - 12),
      behavior: "auto"
    });
  } else if (linkBottom > visibleBottom) {
    sidebarWindow.scrollTo({
      top: linkBottom - sidebarWindow.clientHeight + 12,
      behavior: "auto"
    });
  }

  updateSidebarButtons();
}


/* -------------------------------------------------------------
   Startposition absichern
   -------------------------------------------------------------
   Ohne expliziten Anker startet die Seite immer oben. So kann der
   Browser keine alte Scrollposition wiederherstellen.
   ------------------------------------------------------------- */
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

/* -------------------------------------------------------------
   Initialisierung
   ------------------------------------------------------------- */
window.addEventListener("resize", updateSidebarButtons);
window.addEventListener("load", () => {
  applyPageLevelNavigationState();
  updateSidebarButtons();
});

if ("ResizeObserver" in window && sidebarWindow) {
  const resizeObserver = new ResizeObserver(updateSidebarButtons);

  resizeObserver.observe(sidebarWindow);

  const sidebarContent = sidebarWindow.querySelector(
    ".sidebar-scroll-content"
  );

  if (sidebarContent) {
    resizeObserver.observe(sidebarContent);
  }
}

/* Sofort initialisieren, auch wenn das Skript mit defer geladen wird. */
applyPageLevelNavigationState();
setupStartPageScrollSpy();
window.setTimeout(updateSidebarButtons, 0);
