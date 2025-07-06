document.addEventListener('DOMContentLoaded', () => {

  // LÓGICA PARA LA ANIMACIÓN DEL SCROLL
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-section');
      }
    });
  });
  const hiddenElements = document.querySelectorAll('.hidden-section');
  hiddenElements.forEach((el) => observer.observe(el));


  // LÓGICA MENÚ DE HAMBURGUESA
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    // Abrir y cerrar menú con el botón
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('nav-open');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav-open');
      });
    });
  }

});