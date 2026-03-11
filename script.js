const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});


// Espera a página carregar
window.addEventListener('load', () => {
    const intro = document.querySelector('.intro-netflix');
    
    // Depois de 3.5 segundos (tempo da animação + um pouco de sobra)
    setTimeout(() => {
        intro.style.display = 'none'; 
    }, 3500);
});