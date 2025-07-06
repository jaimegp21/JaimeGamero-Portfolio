document.addEventListener('DOMContentLoaded', () => {

  // LÓGICA PARA LA ANIMACIÓN DE SCROLL 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-section');
      }
    });
  });
  const hiddenElements = document.querySelectorAll('.hidden-section');
  hiddenElements.forEach((el) => observer.observe(el));


  // LÓGICA PARA EL MENÚ HAMBURGUESA 
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


  // LÓGICA PARA EL CARRUSEL DE SKILLS 
  const carousel = document.querySelector('.carrusel-skills');
  const prevButton = document.getElementById('prev-skill');
  const nextButton = document.getElementById('next-skill');

  if (carousel && prevButton && nextButton) {
    let scrollInterval = null; // Variable para el auto-scroll
    let resumeTimeout;
    const scrollSpeed = 1; 
    const resumeDelay = 3000;

    // Funciones para el modo automático (Móvil)
    const startAutoScroll = () => {
      if (scrollInterval) clearInterval(scrollInterval); // Prevenir duplicados
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
      scrollInterval = null;
      clearTimeout(resumeTimeout);
    };

    const resumeAutoScroll = () => {
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(startAutoScroll, resumeDelay);
    };

    // Funciones para el modo manual (Escritorio)
    const updateArrowState = () => {
      prevButton.disabled = carousel.scrollLeft === 0;
      nextButton.disabled = carousel.scrollLeft + carousel.clientWidth + 1 >= carousel.scrollWidth;
    };

    const handleNextClick = () => {
      const scrollAmount = carousel.querySelector('.slide').offsetWidth * 3;
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const handlePrevClick = () => {
      const scrollAmount = carousel.querySelector('.slide').offsetWidth * 3;
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };


    // El Controlador Principal que decide qué hacer
    const setupCarouselByDevice = () => {
      // Limpiamos todo para empezar de cero cada vez que cambia el tamaño
      stopAutoScroll();
      prevButton.removeEventListener('click', handlePrevClick);
      nextButton.removeEventListener('click', handleNextClick);
      carousel.removeEventListener('scroll', updateArrowState);
      carousel.removeEventListener('touchstart', stopAutoScroll);
      carousel.removeEventListener('touchend', resumeAutoScroll);
      
      // Comprobamos si estamos en una pantalla de tipo móvil
      if (window.matchMedia("(max-width: 768px)").matches) {
        // MODO MÓVIL: Auto-scroll
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
        carousel.addEventListener('touchstart', stopAutoScroll, { passive: true });
        carousel.addEventListener('touchend', resumeAutoScroll);
        startAutoScroll();
      } else {
        // MODO ESCRITORIO: Flechas
        prevButton.style.display = 'flex';
        nextButton.style.display = 'flex';
        carousel.addEventListener('scroll', updateArrowState);
        prevButton.addEventListener('click', handlePrevClick);
        nextButton.addEventListener('click', handleNextClick);
        updateArrowState(); // Actualizamos estado inicial de las flechas
      }
    };
    
    // Ejecutamos la configuración al cargar la página
    setupCarouselByDevice();
    // Y también cada vez que se redimensione la ventana
    window.addEventListener('resize', setupCarouselByDevice);
  }
});