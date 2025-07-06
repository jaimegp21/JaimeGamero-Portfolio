// Esperamos a que todo el documento HTML esté completamente cargado y listo
document.addEventListener('DOMContentLoaded', () => {

  // --- LÓGICA PARA LA ANIMACIÓN DE SCROLL "FADE-IN" ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-section');
      }
    });
  });
  const hiddenElements = document.querySelectorAll('.hidden-section');
  hiddenElements.forEach((el) => observer.observe(el));


  // --- LÓGICA PARA EL MENÚ HAMBURGUESA ---
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('nav-open');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav-open');
      });
    });
  }


  // --- LÓGICA PARA EL CARRUSEL DE SKILLS (SOLO EN MÓVIL) ---
  const carousel = document.querySelector('.carrusel-skills');

  // Comprobamos si estamos en una pantalla de tipo móvil
  if (carousel && window.matchMedia("(max-width: 768px)").matches) {
    let scrollInterval;
    let resumeTimeout;
    const scrollSpeed = 1; 
    const resumeDelay = 3000;

    const startAutoScroll = () => {
      clearInterval(scrollInterval);
      scrollInterval = setInterval(() => {
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += scrollSpeed;
        }
      }, 25);
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
      clearTimeout(resumeTimeout);
    };

    const resumeAutoScroll = () => {
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(startAutoScroll, resumeDelay);
    };

    carousel.addEventListener('touchstart', stopAutoScroll, { passive: true });
    carousel.addEventListener('touchend', resumeAutoScroll);
    carousel.addEventListener('touchcancel', resumeAutoScroll);

    startAutoScroll();
  }

});