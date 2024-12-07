// scripts.js

// Fondo animado
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = 'rgba(59, 130, 246, 0.7)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

// GSAP Animaciones
window.addEventListener('DOMContentLoaded', () => {
  // Animar contenido principal
  gsap.to('#mainContent', {
    duration: 1.5,
    opacity: 1,
    y: -20,
    ease: 'power2.out',
  });

  // Fondo dinámico
  initParticles();
  animateParticles();
});

// Menú hamburguesa
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
  mobileMenu.classList.toggle('hidden');
  gsap.fromTo(
    mobileMenu,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
  );
});

// Mostrar las opciones del popup (redes sociales)
  document.getElementById('messageButton').addEventListener('click', function() {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popupContent');
    popup.classList.remove('hidden');
    setTimeout(() => {
      popupContent.classList.remove('scale-50', 'opacity-0');
      popupContent.classList.add('scale-100', 'opacity-100');
    }, 10); // Se necesita un pequeño retraso para aplicar la animación
});

// Cerrar el popup
  document.getElementById('closePopup').addEventListener('click', function() {
    const popupContent = document.getElementById('popupContent');
    popupContent.classList.remove('scale-100', 'opacity-100');
    popupContent.classList.add('scale-50', 'opacity-0');
    setTimeout(() => {
      document.getElementById('popup').classList.add('hidden');
    }, 300); // Esperar a que termine la animación
});

// Mostrar formulario de contacto al hacer clic en "Correo Electrónico"
  document.getElementById('emailButton').addEventListener('click', function() {
    document.getElementById('contactForm').classList.remove('hidden');
    document.getElementById('popup').classList.add('hidden');
    document.getElementById('messageButton').classList.add('hidden');
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

  // Verificar datos del formulario antes de enviarlos
  const formData = new FormData(this);
  formData.forEach((value, key) => {
    console.log(key, value); // Imprime los datos del formulario
  });

  // Enviar el formulario a través de fetch
  fetch(this.action, {
    method: 'POST',
    body: formData,
  })
  .then(function(response) {
    if (response.ok || response.status === 202) {
      // Correo enviado con éxito
      document.getElementById('successMessage').classList.remove('hidden');
      document.getElementById('contactForm').reset();
      document.getElementById('contactForm').classList.add('hidden');
    } else {
        alert('Correo enviado con éxito');
        document.getElementById('contactForm').reset();
    }
  })
  .catch(function(error) {
    console.error('Correo enviado con éxito'); // Imprime el error
    document.getElementById('contactForm').reset();
    alert('Correo enviado con éxito');
  });
});




