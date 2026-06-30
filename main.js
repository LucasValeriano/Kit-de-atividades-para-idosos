document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     FAQ Accordion
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');
    
    questionButton.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // Fecha todos os outros FAQs abertos
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      
      // Alterna o FAQ clicado
      if (isOpen) {
        item.classList.remove('active');
        answerDiv.style.maxHeight = null;
      } else {
        item.classList.add('active');
        // Define a altura máxima dinamicamente baseada no scroll height do elemento
        answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================================
     Contador de Escassez (Countdown)
     ========================================================================== */
  const countdownEl = document.getElementById('countdown');
  const scarcityBar = document.getElementById('scarcityBar');
  
  // Duração de 15 minutos (900 segundos)
  const duration = 15 * 60;
  let timerKey = 'scarcity_timer_value';
  let targetTime;

  // Verifica se já existe um cronômetro rodando no localStorage
  let savedTime = localStorage.getItem(timerKey);
  let now = Math.floor(Date.now() / 1000);

  if (savedTime && parseInt(savedTime) > now) {
    targetTime = parseInt(savedTime);
  } else {
    targetTime = now + duration;
    localStorage.setItem(timerKey, targetTime);
  }

  function updateCountdown() {
    let currentNow = Math.floor(Date.now() / 1000);
    let timeLeft = targetTime - currentNow;

    if (timeLeft <= 0) {
      // Quando zerar, reinicia mais 15 minutos para manter a escassez rodando em loops
      targetTime = Math.floor(Date.now() / 1000) + duration;
      localStorage.setItem(timerKey, targetTime);
      timeLeft = duration;
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    countdownEl.textContent = `${formattedMinutes}:${formattedSeconds}`;
  }

  // Executa uma vez de imediato e depois a cada segundo
  updateCountdown();
  const timerInterval = setInterval(updateCountdown, 1000);

  /* ==========================================================================
     Animação de Scroll Reveal Sutil
     ========================================================================== */
  const revealElements = document.querySelectorAll(
    '.hero-content, .hero-image-wrapper, .bento-card, .target-card, .bonus-card, .pricing-card, .testimonial-card, .faq-item'
  );

  const revealOnScroll = () => {
    const triggerBottom = (window.innerHeight / 5) * 4.5;

    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;

      // Adiciona uma classe de animação quando o elemento entra na janela de visualização
      if (elTop < triggerBottom) {
        el.classList.add('revealed');
      }
    });
  };

  // Inicializa o efeito nos elementos aplicando estilos de transição iniciais
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  // CSS dinâmico para os elementos revelados
  const styleSheet = document.createElement('style');
  styleSheet.innerText = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleSheet);

  window.addEventListener('scroll', revealOnScroll);
  // Executa uma vez no início para revelar elementos que já estão no topo (como o hero)
  revealOnScroll();

  /* ==========================================================================
     Efeito de Toque (Ripple Effect) em Botões
     ========================================================================== */
  const rippleButtons = document.querySelectorAll('.ripple');

  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Apenas cria o efeito se o clique for físico e não uma ação direta de rolagem
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      ripple.style.width = '100px';
      ripple.style.height = '100px';
      ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      ripple.style.animation = 'ripple-animation 0.6s linear';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Estilos da animação ripple
  const rippleStyle = document.createElement('style');
  rippleStyle.innerText = `
    @keyframes ripple-animation {
      to {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
});
