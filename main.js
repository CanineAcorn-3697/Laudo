/* ============================================================
   FICHA MÉDICA DE EMERGÊNCIA — Pedro Seabra Dornellas
   main.js
   ============================================================ */

/* ---------- BOLHAS FLUTUANTES NO HERO ---------- */
function createBubbles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const bubbles = [
    { width: 80, top: "10%", left: "5%", delay: "0s" },
    { width: 50, top: "20%", left: "88%", delay: "1s" },
    { width: 100, top: "70%", left: "50%", delay: "2s" },
    { width: 40, top: "50%", left: "20%", delay: "3s" },
  ];

  bubbles.forEach(({ width, top, left, delay }) => {
    const el = document.createElement("div");
    el.classList.add("bubble");
    el.style.cssText = `
      width: ${width}px;
      height: ${width}px;
      top: ${top};
      left: ${left};
      animation-delay: ${delay};
    `;
    hero.appendChild(el);
  });
}

/* ---------- ANIMAÇÃO DOS CARDS AO ROLAR A PÁGINA ---------- */
function observeCards() {
  const cards = document.querySelectorAll(".card");

  // Se o navegador não suportar IntersectionObserver, mostra tudo normalmente
  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => (card.style.opacity = "1"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // anima só uma vez
        }
      });
    },
    { threshold: 0.1 },
  );

  cards.forEach((card) => observer.observe(card));
}

/* ---------- TOOLTIP NO BOTÃO "ADICIONAR NÚMERO" ---------- */
function setupContactTooltips() {
  const placeholderBtns = document.querySelectorAll(
    ".btn-call[data-placeholder]",
  );

  placeholderBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert(
        '📞 Para adicionar este número, edite o arquivo index.html\ne substitua o atributo href="tel:+55..." pelo número real.',
      );
    });
  });
}

/* ---------- BOTÃO "VOLTAR AO TOPO" ---------- */
function setupBackToTop() {
  const btn = document.createElement("button");
  btn.id = "back-to-top";
  btn.textContent = "↑";
  btn.title = "Voltar ao topo";
  btn.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 20px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, #FF6B6B, #FF8E53);
    color: white;
    font-size: 20px;
    font-weight: 900;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(255,107,107,0.4);
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s, transform 0.3s;
    z-index: 200;
    font-family: 'Nunito', sans-serif;
  `;
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    const show = window.scrollY > 300;
    btn.style.opacity = show ? "1" : "0";
    btn.style.transform = show ? "translateY(0)" : "translateY(10px)";
    btn.style.pointerEvents = show ? "auto" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- DESTAQUE AO CLICAR NO NÚMERO DE EMERGÊNCIA ---------- */
function setupCallFeedback() {
  const callBtns = document.querySelectorAll(".btn-call");

  callBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Pulsa o botão visualmente ao clicar
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });
}

/* ---------- HORA ATUAL NO RODAPÉ ---------- */
function updateFooterTime() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  const timeEl = document.createElement("div");
  timeEl.id = "footer-time";
  timeEl.style.cssText = `
    margin-top: 10px;
    font-size: 12px;
    opacity: 0.7;
    font-family: 'Nunito', sans-serif;
  `;
  footer.appendChild(timeEl);

  function tick() {
    const now = new Date();
    const formatted = now.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    timeEl.textContent = `🕐 Página acessada em: ${formatted}`;
  }

  tick();
  setInterval(tick, 1000);
}

/* ---------- INICIALIZAÇÃO ---------- */
document.addEventListener("DOMContentLoaded", () => {
  createBubbles();
  observeCards();
  setupContactTooltips();
  setupBackToTop();
  setupCallFeedback();
  updateFooterTime();
});
