// Small JS: smooth scrolling and minor interactions
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Simple toggle for details on older browsers
  if (!('open' in document.createElement('details'))) {
    document.querySelectorAll('.faq-accordion details').forEach(function(d) {
      var summary = d.querySelector('summary');
      summary.style.cursor = 'pointer';
      summary.addEventListener('click', function() {
        if (d.classList.contains('open')) { d.classList.remove('open'); } else { d.classList.add('open'); }
      });
    });
  }

  // Implementação do efeito CardFlip para os depoimentos
  document.querySelectorAll('.testimonial-click').forEach(card => {
    const back = card.querySelector('.back');
    const infoText = card.dataset.img;
    
    // Adicionar evento para flip do card
    card.addEventListener('click', () => {
      document.querySelectorAll('.testimonial-click.flipped').forEach(c => {
        if (c !== card) c.classList.remove('flipped');
      });
      card.classList.toggle('flipped');
    });

    // Função para abrir o modal de imagem ampliada
    card.addEventListener('click', () => {
      const modal = document.querySelector('.testimonial-modal');
      const modalImg = modal.querySelector('img');
      const imgSrc = card.dataset.img;

      modalImg.src = imgSrc;
      modal.style.display = 'flex';
    });
  });

  // Fechar o modal de imagem ampliada
  const modalCloseBtn = document.querySelector('.testimonial-modal-close');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      const modal = document.querySelector('.testimonial-modal');
      modal.style.display = 'none';
    });
  }

  // Fechar o modal clicando fora da imagem
  const modal = document.querySelector('.testimonial-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Seleciona o ícone do menu hamburguer e o menu de navegação
  const menuHamburger = document.getElementById("menu-hamburger");
  const mainNav = document.getElementById("main-nav");

  // Adiciona o evento de clique ao ícone do hamburguer
  menuHamburger.addEventListener("click", function() {
    mainNav.classList.toggle("open");  // Adiciona ou remove a classe 'open' ao menu
  });
});
