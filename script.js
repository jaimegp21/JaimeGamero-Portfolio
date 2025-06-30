// Animación de aparición para las secciones
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-section');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden-section');
hiddenElements.forEach((el) => observer.observe(el));

// --- CÓDIGO PARA EL MENÚ HAMBURGUESA ---
const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Abrir y cerrar menú con el botón
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('nav-open');
  hamburger.classList.toggle('hamburger-open');
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('nav-open');
    hamburger.classList.remove('hamburger-open');
  });
});