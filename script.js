const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

const setMenuOpen = open => {
  navLinks.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
};

menuBtn.addEventListener('click', () => {
  setMenuOpen(menuBtn.getAttribute('aria-expanded') !== 'true');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenuOpen(false);
});
document.getElementById('year').textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll(
  '.section-head, .panel, .stat, .skill, .project, .contact-box'
);

if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

  revealElements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.transitionDelay = `${(index % 4) * 70}ms`;
    revealObserver.observe(element);
  });
}
