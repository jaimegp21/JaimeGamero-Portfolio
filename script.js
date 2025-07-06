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

//CARRUSEL DE SKILLS AUTOMÁTICO 

// Esperamos a que todo el contenido de la página se cargue
document.addEventListener('DOMContentLoaded', () => {

  const carousel = document.querySelector('.carrusel-skills');
  if (!carousel) return; // Si no existe el carrusel, no hacemos nada

  let scrollInterval;
  let resumeTimeout;
  const scrollSpeed = 1; 
  const resumeDelay = 3000; 

  // Función que inicia el movimiento automático
  const startAutoScroll = () => {
    // Si ya hay un intervalo, lo limpiamos para evitar que se acelere
    clearInterval(scrollInterval);

    scrollInterval = setInterval(() => {
      
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft += scrollSpeed;
      }
    }, 20); // Intervalo de tiempo para un movimiento suave 
  };

  // Función para detener el movimiento
  const stopAutoScroll = () => {
    clearInterval(scrollInterval);
    clearTimeout(resumeTimeout);
  };

  // Función para reanudar el movimiento después de una pausa
  const resumeAutoScroll = () => {
    clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      startAutoScroll();
    }, resumeDelay);
  };


  // Para el ratón del ordenador
  carousel.addEventListener('mouseenter', stopAutoScroll);
  carousel.addEventListener('mouseleave', resumeAutoScroll);

  // Para dispositivos táctiles
  carousel.addEventListener('touchstart', stopAutoScroll, { passive: true });
  carousel.addEventListener('touchend', resumeAutoScroll);
  carousel.addEventListener('touchcancel', resumeAutoScroll);


  startAutoScroll();

});