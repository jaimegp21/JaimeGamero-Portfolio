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

  // Lógica para el envío del formulario en segundo plano
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevenimos el comportamiento por defecto (recargar la página)

      const form = e.target;
      const data = new FormData(form);
      
      fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          // Si el envío fue exitoso
          formStatus.innerHTML = "¡Gracias por tu mensaje! Ha sido enviado correctamente.";
          formStatus.className = 'success';
          form.reset(); // Limpiamos los campos del formulario
        } else {
          // Si hubo un problema en el servidor de Formspree
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              formStatus.innerHTML = "Oops! Hubo un problema al enviar tu formulario.";
            }
            formStatus.className = 'error';
          })
        }
      }).catch(error => {
        // Si hubo un problema de red
        formStatus.innerHTML = "Oops! Hubo un problema de red al enviar tu formulario.";
        formStatus.className = 'error';
      });
    });
  }

});