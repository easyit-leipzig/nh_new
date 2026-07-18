/**
 * Datei: js/main.js
 * Projekt: easyIT-Nachhilfe – vollständige Neuentwicklung
 * Zweck: Progressive Interaktionen ohne externe Bibliotheken.
 *
 * Strukturen und Attribute:
 * - .menu-toggle steuert #navLinks.
 * - aria-expanded beschreibt den Zustand für Hilfstechnologien.
 * - data-demo-form markiert statische Formulare ohne Serververarbeitung.
 * - data-year erhält automatisch das aktuelle Jahr.
 */
(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('#navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'page');
  });
  document.querySelectorAll('[data-year]').forEach((node) => node.textContent = new Date().getFullYear());
  document.querySelectorAll('[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) status.textContent = 'Die Eingabe wurde lokal geprüft. Für den Versand muss noch ein PHP- oder API-Endpunkt angebunden werden.';
    });
  });
})();
