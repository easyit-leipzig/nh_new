'use strict';
const toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const backdrop = document.querySelector('.mobile-backdrop');
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  toggle?.setAttribute('aria-expanded', String(open));
  if (backdrop) backdrop.hidden = !open;
}
toggle?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
backdrop?.addEventListener('click', () => setMenu(false));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
sidebar?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
}), {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
