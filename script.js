// ==========================================
// 1. ANIMAÇÕES GSAP (Carregamento e Scroll)
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// Animação inicial da Hero (Fade In subindo)
gsap.from(".gsap-hero", {
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.2, // Anima um elemento após o outro (Badge -> H1 -> P -> Botões)
  ease: "power3.out",
  delay: 0.2
});

// Animação das seções ao rolar a página
gsap.utils.toArray('.gsap-section').forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%", // A animação começa quando o topo da seção atinge 80% da tela
      toggleActions: "play none none reverse" // Anima ao descer e reverte ao subir muito
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
});

// ==========================================
// 2. DADOS E LÓGICA DA GALERIA
// ==========================================
const allPhotos = [
  // Categoria: O Apartamento
  { src: "planta.png", category: "O Apartamento" },
  { src: "entrada.jpg", category: "O Apartamento" },
  { src: "cozinha.jpg", category: "O Apartamento" },
  { src: "sala.jpg", category: "O Apartamento" },
  { src: "quarto1.jpg", category: "O Apartamento" },
  { src: "quarto2.jpg", category: "O Apartamento" },
  { src: "quarto3.jpg", category: "O Apartamento" },
  { src: "banheiro.jpg", category: "O Apartamento" },
  { src: "banheiro1.jpg", category: "O Apartamento" },
  
  // Categoria: Lazer e Áreas Comuns
  { src: "piscina.jpg", category: "Lazer e Condomínio" },
  { src: "churrasqueira.jpg", category: "Lazer e Condomínio" },
  { src: "academia.jpg", category: "Lazer e Condomínio" },
  { src: "brinquedoteca.jpg", category: "Lazer e Condomínio" },
  { src: "playground.jpg", category: "Lazer e Condomínio" },
  { src: "espaco-beleza.jpg", category: "Lazer e Condomínio" },
  { src: "salao-festas.jpg", category: "Lazer e Condomínio" },
  { src: "camarote.jpg", category: "Lazer e Condomínio" },
  { src: "teen.jpg", category: "Lazer e Condomínio" },
  
  // Categoria: Infraestrutura e Serviços
  { src: "hero-building.jpg", category: "Estrutura" },
  { src: "lavanderia.jpg", category: "Estrutura" }
];

function renderGallery() {
  const container = document.getElementById('gallery-content');
  const categories = [...new Set(allPhotos.map(p => p.category))];
  let html = '';
  
  categories.forEach(cat => {
    html += `<h3 class="gallery-category-title">${cat}</h3>`;
    html += `<div class="gallery-grid">`;
    allPhotos.forEach((photo, globalIndex) => {
      if(photo.category === cat) {
        html += `<img src="${photo.src}" alt="${cat}" onclick="openCarousel(${globalIndex})" loading="lazy">`;
      }
    });
    html += `</div>`;
  });
  
  container.innerHTML = html;
}

// Modal Principal de Galeria
const galleryModal = document.getElementById('gallery-modal');

function openGallery(startIndex = null) {
  document.body.style.overflow = 'hidden'; 
  galleryModal.classList.add('active');
  if(startIndex !== null) openCarousel(startIndex);
}

function closeGallery() {
  document.body.style.overflow = 'auto';
  galleryModal.classList.remove('active');
}

// Carousel (Slider Escuro)
let currentIndex = 0;
const carouselModal = document.getElementById('carousel-modal');
const carouselImage = document.getElementById('carousel-image');
const counterText = document.getElementById('carousel-counter');

function openCarousel(index) {
  currentIndex = index;
  updateCarouselImage();
  carouselModal.classList.add('active');
}

function closeCarousel() { carouselModal.classList.remove('active'); }

function updateCarouselImage() {
  carouselImage.src = allPhotos[currentIndex].src;
  counterText.innerText = `${currentIndex + 1} / ${allPhotos.length}`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % allPhotos.length;
  updateCarouselImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
  updateCarouselImage();
}

// Controles pelo teclado
document.addEventListener('keydown', (e) => {
  if(carouselModal.classList.contains('active')) {
    if(e.key === 'Escape') closeCarousel();
    if(e.key === 'ArrowRight') nextImage();
    if(e.key === 'ArrowLeft') prevImage();
  } else if(galleryModal.classList.contains('active') && e.key === 'Escape') {
    closeGallery();
  }
});

// Menu Mobile simples
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  mobileBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '60px';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = 'white';
    navLinks.style.padding = '20px';
    navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
  });
});