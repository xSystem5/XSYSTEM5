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

document.getElementById('messageButton').addEventListener('click', function(event) {
  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popupContent');

  // Obtener las coordenadas del botón
  const rect = event.target.getBoundingClientRect();

  // Calcular las coordenadas para centrar el popup
  const popupWidth = popupContent.offsetWidth;
  const popupHeight = popupContent.offsetHeight;

  // Calcular la posición del popup
  const left = rect.left + window.scrollX + (rect.width / 2) - (popupWidth / 2);
  const top = rect.bottom + window.scrollY + 10; // Un pequeño margen hacia abajo

  // Establecer las coordenadas del popup
  popup.style.left = `${left}px`;
  popup.style.top = `${top}px`;

  // Mostrar el popup con animación
  popup.classList.remove('hidden');
  setTimeout(() => {
    popupContent.classList.remove('scale-50', 'opacity-0');
    popupContent.classList.add('scale-100', 'opacity-100');
  }, 10);
});

document.getElementById('closePopup').addEventListener('click', function() {
  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popupContent');

  // Ocultar el popup con animación
  popupContent.classList.remove('scale-100', 'opacity-100');
  popupContent.classList.add('scale-50', 'opacity-0');
  setTimeout(() => {
    popup.classList.add('hidden');
  }, 300);
});


// Servicios
function toggleServiceForm(service) {
  // Esconder todos los formularios primero
  const forms = document.querySelectorAll('.hidden');
  forms.forEach(form => form.classList.add('hidden'));
  
  // Mostrar el formulario correspondiente al servicio seleccionado
  const formToShow = document.getElementById(`${service}-form`);
  formToShow.classList.remove('hidden');
}




