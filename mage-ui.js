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
// Ícones: substitui caracteres Unicode inconsistentes por SVGs leves e nítidos.
const iconPaths={
  dashboard:'<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  today:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
  edital:'<path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  questions:'<path d="m5 12 4 4L19 6"/>',
  reviews:'<path d="M20 11a8 8 0 1 0 1 4"/><path d="M20 5v6h-6"/>',
  cycle:'<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
  performance:'<path d="M5 19V9M12 19V5M19 19v-7"/>',
  diary:'<path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2.6V20a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.6-1H6v-2.6h.4A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h2.6V5a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1A1.7 1.7 0 0 0 19 10a1.7 1.7 0 0 0 1.6 1h.4v2.6h-.4a1.7 1.7 0 0 0-1.2.4"/> '
};
function installArcaneIcons(){
  const keys=['dashboard','today','edital','questions','reviews','cycle','performance','diary'];
  document.querySelectorAll('.nav-item').forEach((el,i)=>{
    const key=el.dataset.action==='settings'?'settings':keys[i];
    const span=el.querySelector('span'); if(!span||!iconPaths[key]) return;
    span.innerHTML='<svg class="arcane-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+iconPaths[key]+'</svg>';
  });
}
installArcaneIcons();
