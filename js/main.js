/**
 * main.js — Calistenia
 * Menú móvil, animaciones de entrada, sección activa
 */

/* === Menú hamburguesa === */
const navToggle = document.querySelector('.nav-toggle');
const mainNav   = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen.toString());
    navToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.innerHTML = '&#9776;';
    });
  });
}

/* === Animación de entrada con IntersectionObserver === */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

// Solo tarjetas, no la timeline (para evitar retrasos)
document.querySelectorAll('.beneficio-card, .ejercicio-card, .habilidad-card, .nivel-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.4s ease, transform 0.4s ease`;
  observer.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
  <style>.visible { opacity: 1 !important; transform: translateY(0) !important; }</style>
`);

/* === Link activo en el menú según sección visible === */
const sections = document.querySelectorAll('main section[id]');
const navLinks  = document.querySelectorAll('.main-nav a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));
