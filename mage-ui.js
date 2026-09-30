/* Modo Arcano: camada de interação visual, sem substituir o app principal. */
(() => {
  const $ = (s) => document.querySelector(s);

  // Menu mobile
  const sidebar = $('#sidebar');
  const overlay = $('#mobileOverlay');
  const menu = $('#mobileMenu');
  const closeMenu = () => { sidebar?.classList.remove('open'); overlay?.classList.remove('active'); };
  menu?.addEventListener('click', () => { sidebar?.classList.add('open'); overlay?.classList.add('active'); });
  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', closeMenu));

  // Chat arcano local: mantém o site independente de backend.
  const toggle = $('#arcaneChatToggle');
  const panel = $('#arcaneChatPanel');
  const close = $('#arcaneChatClose');
  const messages = $('#arcaneChatMessages');
  const input = $('#arcaneChatInput');
  const form = $('#arcaneChatForm');

  const openChat = () => { if(!panel) return; panel.setAttribute('aria-hidden','false'); input?.focus(); };
  const closeChat = () => panel?.setAttribute('aria-hidden','true');
  toggle?.addEventListener('click', () => panel?.getAttribute('aria-hidden') === 'true' ? openChat() : closeChat());
  close?.addEventListener('click', closeChat);

  function addMessage(text, who='mage'){
    const row = document.createElement('div');
    row.className = 'arcane-message ' + who;
    row.innerHTML = who === 'mage' ? '<span>✦</span><p></p>' : '<p></p>';
    row.querySelector('p').textContent = text;
    messages?.appendChild(row);
    if(messages) messages.scrollTop = messages.scrollHeight;
  }

  function answer(q){
    const s = q.toLowerCase();
    if(s.includes('progresso') || s.includes('desempenho')){
      return 'Abra Desempenho para enxergar tempo, cobertura e acertos. O Mago já mantém esses registros no seu painel.';
    }
    if(s.includes('agora') || s.includes('estudar') || s.includes('próximo')){
      return 'Seu próximo feitiço é abrir Hoje e começar o primeiro bloco disponível. Uma sessão por vez.';
    }
    if(s.includes('revis')){
      return 'O círculo de Revisões concentra o que precisa voltar à memória. Comece pelas atrasadas e depois siga para as de hoje.';
    }
    return 'Posso te guiar pelo Mago. Tente perguntar sobre o que estudar agora, seu progresso ou suas revisões.';
  }

  function send(text){
    const q = text.trim();
    if(!q) return;
    addMessage(q,'user');
    input.value = '';
    const cast = document.createElement('div');
    cast.className = 'spell-cast';
    document.body.appendChild(cast);
    window.setTimeout(() => {
      cast.remove();
      addMessage(answer(q),'mage');
    }, 650);
  }

  form?.addEventListener('submit', e => { e.preventDefault(); send(input.value); });
  document.querySelectorAll('[data-chat]').forEach(b => b.addEventListener('click', () => { openChat(); send(b.dataset.chat); }));

  // Pequena conjuração visual em ações importantes, sem bloquear cliques.
  document.addEventListener('click', e => {
    const target = e.target.closest('.primary-btn,.hero-primary,[data-action="focus"]');
    if(!target || target.closest('.arcane-chat')) return;
    const cast = document.createElement('div');
    cast.className = 'spell-cast';
    document.body.appendChild(cast);
    window.setTimeout(() => cast.remove(), 850);
  });
})();