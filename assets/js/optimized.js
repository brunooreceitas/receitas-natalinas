// ====== JS FINAL OTIMIZADO ======

const menuHamburger = document.getElementById("menu-hamburger");
const mainNav = document.getElementById("main-nav");

if (menuHamburger) {
  menuHamburger.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

// Modal de depoimentos
const modal = document.querySelector(".testimonial-modal");
const modalImg = modal ? modal.querySelector("img") : null;
const modalClose = modal ? modal.querySelector(".testimonial-modal-close") : null;

// Abre a imagem ampliada
const testimonialImages = document.querySelectorAll(".testimonial-click");

testimonialImages.forEach(img => {
  img.addEventListener("click", () => {
    if (!modal || !modalImg) return;
    modalImg.src = img.dataset.img;
    modal.style.display = "flex";
  });
});

// Fecha ao clicar no X
if (modalClose) {
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// Fecha clicando fora
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
}
