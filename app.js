const KEY='mago-v4';

function today(){return new Date().toISOString().slice(0,10)}
function shift(date,n){const d=new Date(date+'T12:00:00');d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)}
function uid(){return crypto.randomUUID()}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]})}
function fmtMin(v){v=Number(v||0);const h=Math.floor(v/60),m=v%60;return h?(h+'h '+String(m).padStart(2,'0')):m+'min'}
function fmtHours(v){v=Number(v||0);return v%1===0?v+'h':v.toFixed(1).replace('.',',')+'h'}
function dateText(k){return new Date(k+'T12:00:00').toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.','')}
function fullDate(k){return new Date(k+'T12:00:00').toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'})}

function makeSeed(){
  function subject(name,color,priority){return {id:uid(),name:name,color:color,priority:priority}}
  return {
    settings:{dailyMinutes:120,weekMinutes:16,examName:'Inspetor em Vigilância Sanitária',theme:'light'},
    subjects:[
      subject('Vigilância Sanitária','#2563eb',5),
      subject('Língua Portuguesa','#7c3aed',4),
      subject('Raciocínio Lógico e Matemático','#0f766e',4),
      subject('História e Geografia do Tocantins','#d97706',3),
      subject('Legislação','#dc2626',3),
      subject('Arquiteto','#64748b',2)
    ],
    topics:[
      {id:uid(),subject:'Vigilância Sanitária',name:'Lei 9.782/1999 — SNVS e Anvisa',theory:75,questions:18,correct:14,status:'andamento',reviews:[shift(today(),-8),shift(today(),-1),today()]},
      {id:uid(),subject:'Vigilância Sanitária',name:'Decreto 3.029/1999',theory:35,questions:10,correct:7,status:'andamento',reviews:[shift(today(),1),shift(today(),7)]},
      {id:uid(),subject:'Vigilância Sanitária',name:'Lei 6.360/1976',theory:0,questions:0,correct:0,status:'nao-iniciado',reviews:[]},
      {id:uid(),subject:'Vigilância Sanitária',name:'Decreto 8.077/2013',theory:100,questions:22,correct:19,status:'concluido',reviews:[shift(today(),-20),shift(today(),-1),today()]},
      {id:uid(),subject:'Língua Portuguesa',name:'Interpretação de textos',theory:80,questions:30,correct:24,status:'andamento',reviews:[shift(today(),-2),shift(today(),7)]},
      {id:uid(),subject:'Língua Portuguesa',name:'Acentuação e ortografia',theory:50,questions:20,correct:15,status:'andamento',reviews:[today()]},
      {id:uid(),subject:'Raciocínio Lógico e Matemático',name:'Proposições e conectivos',theory:40,questions:15,correct:9,status:'andamento',reviews:[shift(today(),1)]},
      {id:uid(),subject:'História e Geografia do Tocantins',name:'Formação histórica do Tocantins',theory:25,questions:8,correct:5,status:'andamento',reviews:[]},
      {id:uid(),subject:'Legislação',name:'Princípios da Administração Pública',theory:15,questions:6,correct:4,status:'andamento',reviews:[]},
      {id:uid(),subject:'Arquiteto',name:'Projeto e representação gráfica',theory:0,questions:0,correct:0,status:'nao-iniciado',reviews:[]}
    ],
    questions:[
      {id:uid(),subject:'Vigilância Sanitária',topic:'Lei 9.782/1999 — SNVS e Anvisa',total:18,correct:14,date:shift(today(),-1)},
      {id:uid(),subject:'Língua Portuguesa',topic:'Interpretação de textos',total:20,correct:16,date:shift(today(),-2)},
      {id:uid(),subject:'Raciocínio Lógico e Matemático',topic:'Proposições e conectivos',total:15,correct:9,date:today()}
    ],
    sessions:[
      {id:uid(),subject:'Vigilância Sanitária',topic:'Lei 9.782/1999',minutes:62,date:today(),createdAt:Date.now()-3600000},
      {id:uid(),subject:'Língua Portuguesa',topic:'Interpretação de textos',minutes:48,date:shift(today(),-1),createdAt:Date.now()-90000000},
      {id:uid(),subject:'Raciocínio Lógico e Matemático',topic:'Proposições',minutes:70,date:shift(today(),-2),createdAt:Date.now()-180000000},
      {id:uid(),subject:'Vigilância Sanitária',topic:'Decreto 8.077/2013',minutes:54,date:shift(today(),-3),createdAt:Date.now()-270000000}
    ],
    cycle:[
      {id:uid(),subject:'Vigilância Sanitária',hours:4,priority:5},
      {id:uid(),subject:'Língua Portuguesa',hours:3,priority:4},
      {id:uid(),subject:'Raciocínio Lógico e Matemático',hours:3,priority:4},
      {id:uid(),subject:'História e Geografia do Tocantins',hours:2,priority:3},
      {id:uid(),subject:'Legislação',hours:2,priority:3},
      {id:uid(),subject:'Arquiteto',hours:1,priority:2}
    ],
    diary:[
      {id:uid(),date:shift(today(),-1),mood:'🙂',text:'Rendi bem em Português. Preciso voltar em interpretação de textos e fazer mais questões.'},
      {id:uid(),date:shift(today(),-3),mood:'😀',text:'Sessão boa de Vigilância Sanitária. A lei 9.782 está começando a ficar mais familiar.'}
    ]
  }
}

function load(){
  try{
    const current=localStorage.getItem(KEY);
    if(current){return JSON.parse(current)}
    const old=localStorage.getItem('mago-v3')||localStorage.getItem('mago-v2')||localStorage.getItem('mago-study-v1');
    if(old){
      const parsed=JSON.parse(old);
      const base=makeSeed();
      if(parsed.subjects)base.subjects=parsed.subjects.map(function(s,i){return {id:s.id||uid(),name:s.name,color:s.color||['#2563eb','#7c3aed','#0f766e','#d97706','#dc2626','#64748b'][i%6],priority:5-i%5}})
      if(parsed.sessions)base.sessions=parsed.sessions;
      if(parsed.goals){
        base.sessions=base.sessions;
      }
      return base;
    }
  }catch(e){}
  return makeSeed();
}
let state=load();
let currentView='dashboard';
let reviewFilter='all';
let modalType='';
let editingTopicId='';
let toastTimer=null;
let focusTimer={duration:1500,seconds:1500,running:false,interval:null,subject:'',topic:''};

function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function totalQuestions(){return state.questions.reduce(function(a,q){a.total+=Number(q.total||0);a.correct+=Number(q.correct||0);return a},{total:0,correct:0})}
function accuracy(total,correct){return total?Math.round(correct/total*100):0}
function todayMinutes(){return state.sessions.filter(function(s){return s.date===today()}).reduce(function(a,s){return a+Number(s.minutes||0)},0)}
function weekMinutes(){let n=0;for(let i=0;i<7;i++){const day=shift(today(),-i);n+=state.sessions.filter(function(s){return s.date===day}).reduce(function(a,s){return a+Number(s.minutes||0)},0)}return n}
function streak(){const set=new Set(state.sessions.map(function(s){return s.date}));let d=today(),n=0;while(set.has(d)){n++;d=shift(d,-1)}return n}
function dueReviews(){return state.topics.flatMap(function(t){return (t.reviews||[]).map(function(date,index){return {topic:t,date:date,index:index}})}).filter(function(r){return r.date<=today()})}
function subjectTopics(name){return state.topics.filter(function(t){return t.subject===name})}
function subjectQuestions(name){return state.questions.filter(function(q){return q.subject===name}).reduce(function(a,q){a.total+=Number(q.total||0);a.correct+=Number(q.correct||0);return a},{total:0,correct:0})}
function subjectTime(name){return state.sessions.filter(function(s){return s.subject===name}).reduce(function(a,s){return a+Number(s.minutes||0)},0)}
function subjectTheory(name){const t=subjectTopics(name);return t.length?Math.round(t.reduce(function(a,x){return a+Number(x.theory||0)},0)/t.length):0}
function subjectColor(name){const s=state.subjects.find(function(x){return x.name===name});return s?s.color:'#2563eb'}
function subjectPriority(name){const s=state.subjects.find(function(x){return x.name===name});return s?s.priority:3}

function navigate(view){
  currentView=view;
  document.querySelectorAll('.page').forEach(function(p){p.classList.toggle('active',p.id===view+'Page')});
  document.querySelectorAll('.nav-item[data-view]').forEach(function(n){n.classList.toggle('active',n.dataset.view===view)});
  document.getElementById('pageTitle').textContent=({dashboard:'Visão geral',today:'Hoje',edital:'Meu edital',questions:'Questões',reviews:'Revisões',cycle:'Ciclo',performance:'Desempenho',diary:'Diário'}[view]||'Visão geral');
  closeMobile();
  window.scrollTo({top:0,behavior:'smooth'});
  render();
}
function render(){
  document.getElementById('dateLabel').textContent=fullDate(today());
  renderSidebar();renderDashboard();renderToday();renderEdital();renderQuestions();renderReviews();renderCycle();renderPerformance();renderDiary();renderGame();applyTheme();refreshFocusSubjects();
}

function gameStats(){
  const minutes=state.sessions.reduce(function(a,s){return a+Number(s.minutes||0)},0);
  const questions=totalQuestions().total;
  const completed=state.topics.filter(function(t){return t.status==='concluido'}).length;
  const reviews=state.topics.flatMap(function(t){return t.reviews||[]}).filter(function(d){return d<today()}).length;
  const xp=minutes*2+questions*5+completed*40+reviews*10;
  const level=Math.floor(xp/500)+1;
  const current=xp%500;
  const rank=level<3?'Aprendiz':level<6?'Mago Novato':level<10?'Mago de Batalha':level<15?'Arquimago':'Mestre Arcano';
  return {xp:xp,level:level,current:current,next:500-current,rank:rank};
}
function renderGame(){
  const g=gameStats(),todayMin=todayMinutes(),goal=state.settings.dailyMinutes;
  const xpPct=Math.round(g.current/500*100),mana=Math.max(0,Math.min(100,100-Math.round(todayMin/Math.max(goal,1)*35)));
  document.getElementById('sideLevel').textContent=g.level;
  document.getElementById('sideXp').textContent=g.xp+' XP';
  document.getElementById('rankName').textContent=g.rank;
  document.getElementById('rankText').textContent='Nível '+g.level+' · '+g.xp+' XP acumulados';
  document.getElementById('xpText').textContent=g.current+' / 500 XP';
  document.getElementById('xpBar').style.width=xpPct+'%';
  document.getElementById('xpNext').textContent=g.next+' XP para o próximo nível';
  document.getElementById('manaText').textContent=mana+'%';
  document.getElementById('questText').textContent=Math.min(todayMin,goal)+' / '+fmtHours(goal/60);
  document.getElementById('questSub').textContent=todayMin>=goal?'Missão concluída ✦':'Faltam '+fmtMin(Math.max(0,goal-todayMin));
  const quests=[
    {icon:'⏱',title:'Feitiço do foco',desc:'Estude pelo menos 50 minutos',done:todayMin>=50},
    {icon:'⚔',title:'Desafio das questões',desc:'Resolva 20 questões',done:state.questions.filter(function(q){return q.date===today()}).reduce(function(a,q){return a+q.total},0)>=20},
    {icon:'↻',title:'Ritual da memória',desc:'Conclua uma revisão vencida',done:dueReviews().some(function(r){return r.date<=today()})===false}
  ];
  document.getElementById('questBoard').innerHTML=quests.map(function(q){return '<div class="quest-row '+(q.done?'completed':'')+'"><span class="quest-icon">'+q.icon+'</span><div><strong>'+q.title+'</strong><small>'+q.desc+'</small></div><b>'+ (q.done?'✓':'○') +'</b></div>'}).join('');
  const achievements=[
    {icon:'🔥',name:'Primeira chama',desc:'Estudou em 3 dias seguidos',done:streak()>=3},
    {icon:'📚',name:'Grimório aberto',desc:'Concluiu 5 assuntos',done:completedTopics()>=5},
    {icon:'⚔',name:'Caçador de erros',desc:'Resolveu 50 questões',done:totalQuestions().total>=50},
    {icon:'🌙',name:'Guardião da constância',desc:'Acumulou 10 dias de estudo',done:streak()>=10}
  ];
  document.getElementById('achievementBoard').innerHTML=achievements.map(function(a){return '<div class="achievement '+(a.done?'unlocked':'locked')+'"><span>'+a.icon+'</span><div><strong>'+a.name+'</strong><small>'+a.desc+'</small></div><b>'+ (a.done?'✦':'🔒') +'</b></div>'}).join('');
}
function completedTopics(){return state.topics.filter(function(t){return t.status==='concluido'}).length}
function renderSidebar(){
  const m=todayMinutes(),pct=Math.min(100,Math.round(m/state.settings.dailyMinutes*100)),d=dueReviews().length;
  document.getElementById('sideMinutes').textContent=fmtMin(m);document.getElementById('sideProgress').style.width=pct+'%';document.getElementById('sideGoal').textContent=fmtHours(state.settings.dailyMinutes/60);document.getElementById('reviewBadge').textContent=d;document.getElementById('reviewBadge').style.display=d?'grid':'none';document.getElementById('todayDot').style.display=m?'block':'none';
}
function renderDashboard(){
  const m=todayMinutes(),pct=Math.min(100,Math.round(m/state.settings.dailyMinutes*100)),q=totalQuestions(),d=dueReviews();
  document.getElementById('heroPct').textContent=pct+'%';const heroBar=document.getElementById('heroProgressBar');if(heroBar)heroBar.style.width=pct+'%';const heroCaption=document.getElementById('heroGoalCaption');if(heroCaption)heroCaption.textContent=fmtMin(m)+' de estudo';
  document.getElementById('heroTitle').textContent=m>=state.settings.dailyMinutes?'Meta do dia batida!':'Bora estudar?';document.getElementById('heroText').textContent=m?'Você já estudou '+fmtMin(m)+' hoje. Mais um bloco e você avança.':'Escolha uma matéria e comece.';
  document.getElementById('metricMinutes').textContent=fmtHours(m/60);document.getElementById('metricQuestions').textContent=q.total;document.getElementById('metricAccuracy').textContent=accuracy(q.total,q.correct)+'%';document.getElementById('metricReviews').textContent=d.length;document.getElementById('metricStreak').textContent=streak()+' dias';
  const best=state.cycle.slice().sort(function(a,b){return b.priority-a.priority}).slice(0,4);
  document.getElementById('nextStudy').innerHTML=best.length?best.map(function(c,i){return '<div class="schedule-row"><div class="time-chip">'+['08:00','10:00','14:00','16:00'][i]+'</div><div class="row-main"><strong>'+esc(c.subject)+'</strong><small>'+c.hours+'h semanais · prioridade '+c.priority+'/5</small></div><span class="status-pill">'+(i===0?'Próximo':'Planejado')+'</span></div>'}).join(''):'<div class="section-empty"><strong>Seu ciclo está vazio.</strong>Adicione matérias ao seu ciclo.</div>';
  document.getElementById('reviewPreview').innerHTML=d.length?d.slice(0,4).map(function(r){return '<div class="review-row"><span class="status-dot '+(r.date===today()?'active':'done')+'"></span><div class="row-main"><strong>'+esc(r.topic.name)+'</strong><small>'+esc(r.topic.subject)+' · '+(r.date<today()?'atrasada':'hoje')+'</small></div><span class="status-pill">'+(r.date<today()?'Atrasada':'Hoje')+'</span></div>'}).join(''):'<div class="section-empty"><strong>Tudo em dia ✦</strong>Nenhuma revisão para agora.</div>';
  const vals=[];for(let i=0;i<7;i++){const day=shift(today(),i-6);vals.push(state.sessions.filter(function(s){return s.date===day}).reduce(function(a,s){return a+Number(s.minutes||0)},0))}
  const max=Math.max.apply(null,vals.concat([60]));document.getElementById('weekTotal').textContent=fmtHours(weekMinutes()/60);
  document.getElementById('weekChart').innerHTML=vals.map(function(v,i){return '<div class="bar-col"><div class="bar-wrap"><div class="week-bar" style="height:'+Math.max(5,Math.round(v/max*100))+'%;opacity:'+(v?1:.35)+'"></div></div><em>'+v+'m</em><label>'+new Date(shift(today(),i-6)+'T12:00:00').toLocaleDateString('pt-BR',{weekday:'short'}).replace('.','')+'</label></div>'}).join('');
  const weak=state.subjects.map(function(s){const q=subjectQuestions(s.name);return {s:s,a:accuracy(q.total,q.correct),theory:subjectTheory(s.name)}}).filter(function(x){return x.a<70||x.theory<40}).sort(function(a,b){return a.a-b.a||a.theory-b.theory}).slice(0,4);
  document.getElementById('attentionList').innerHTML=weak.length?weak.map(function(x){const label=x.a<70?'acerto '+x.a+'%':'teoria '+x.theory+'%';return '<div class="attention-row"><span class="subject-color" style="background:'+x.s.color+'"></span><div class="row-main"><strong>'+esc(x.s.name)+'</strong><small>'+label+'</small></div><div class="attention-bar"><div class="progress-track"><span style="width:'+Math.max(x.a,x.theory)+'%;background:'+x.s.color+'"></span></div></div></div>'}).join(''):'<div class="section-empty"><strong>Sem alerta no momento.</strong>Continue registrando seus estudos.</div>';
  const subs=state.subjects.slice().sort(function(a,b){return b.priority-a.priority});document.getElementById('subjectCards').innerHTML=subs.map(function(s){return '<div class="subject-card"><div class="subject-card-top"><h4>'+esc(s.name)+'</h4><span class="priority">P'+s.priority+'</span></div><small>'+subjectTopics(s.name).length+' assuntos · '+subjectQuestions(s.name).total+' questões</small><div class="progress-track"><span style="width:'+subjectTheory(s.name)+'%;background:'+s.color+'"></span></div><small>'+subjectTheory(s.name)+'% de teoria</small></div>'}).join('');
}
function renderToday(){
  const m=todayMinutes(),pct=Math.min(100,Math.round(m/state.settings.dailyMinutes*100));document.getElementById('goalTitle').textContent=fmtHours(state.settings.dailyMinutes/60)+' de estudo';document.getElementById('goalPct').textContent=pct+'%';document.getElementById('goalBar').style.width=pct+'%';document.getElementById('goalDone').textContent=fmtMin(m)+' estudados';document.getElementById('goalTarget').textContent=state.settings.dailyMinutes+'min de meta';
  const cycle=state.cycle.slice().sort(function(a,b){return b.priority-a.priority});document.getElementById('todayPlan').innerHTML=cycle.length?cycle.map(function(c,i){return '<div class="plan-row"><div class="time-chip">'+['08:00','10:00','14:00','16:00','18:00'][i%5]+'</div><div class="row-main"><strong>'+esc(c.subject)+'</strong><small>'+Math.max(30,Math.round(c.hours*60/Math.max(cycle.length,1)))+'min · prioridade '+c.priority+'/5</small></div><span class="plan-state '+(i<Math.floor(m/50)?'done':'ready')+'"></span></div>'}).join(''):'<div class="section-empty"><strong>Sem ciclo.</strong>Adicione as matérias que quer estudar.</div>';
  const sessions=state.sessions.filter(function(s){return s.date===today()}).sort(function(a,b){return b.createdAt-a.createdAt});document.getElementById('todaySessions').innerHTML=sessions.length?sessions.map(function(s){return '<div class="session-row"><div class="time-chip">FOCO</div><div class="row-main"><strong>'+esc(s.subject)+'</strong><small>'+esc(s.topic||'Estudo livre')+'</small></div><strong>'+fmtMin(s.minutes)+'</strong></div>'}).join(''):'<div class="section-empty">Nenhuma sessão registrada hoje.</div>';
}
function renderEdital(){
  const subjectFilter=document.getElementById('topicSubjectFilter'),old=subjectFilter.value;subjectFilter.innerHTML='<option value="">Todas as matérias</option>'+state.subjects.map(function(s){return '<option>'+esc(s.name)+'</option>'}).join('');subjectFilter.value=state.subjects.some(function(s){return s.name===old})?old:'';
  const query=(document.getElementById('topicSearch').value||'').toLowerCase(),filterSubject=subjectFilter.value,filterStatus=document.getElementById('topicStatusFilter').value;
  const rows=state.topics.filter(function(t){return (!query||(t.name+' '+t.subject).toLowerCase().includes(query))&&(!filterSubject||t.subject===filterSubject)&&(!filterStatus||t.status===filterStatus)});
  const total=state.topics.length,done=state.topics.filter(function(t){return t.status==='concluido'}).length,avg=total?Math.round(state.topics.reduce(function(a,t){return a+t.theory},0)/total):0,q=totalQuestions();
  document.getElementById('editalSummary').innerHTML='<span class="summary-chip"><strong>'+total+'</strong>assuntos</span><span class="summary-chip"><strong>'+done+'</strong>concluídos</span><span class="summary-chip"><strong>'+avg+'%</strong>teoria média</span><span class="summary-chip"><strong>'+q.total+'</strong>questões</span>';
  const grouped={};rows.forEach(function(t){if(!grouped[t.subject])grouped[t.subject]=[];grouped[t.subject].push(t)});
  document.getElementById('editalSections').innerHTML=Object.keys(grouped).map(function(subject){const list=grouped[subject],s=state.subjects.find(function(x){return x.name===subject})||{color:'#2563eb',priority:3};return '<section class="subject-section"><div class="subject-section-header"><div class="subject-title-wrap"><span class="subject-color" style="background:'+s.color+'"></span><div><h3>'+esc(subject)+'</h3><small>'+list.length+' assunto(s) · prioridade '+s.priority+'/5</small></div></div><span class="status-pill">'+subjectTheory(subject)+'% teoria</span></div><div class="subject-section-body">'+list.map(topicRow).join('')+'</div></section>'}).join('')||'<div class="card"><div class="section-empty"><strong>Nenhum assunto encontrado.</strong>Ajuste os filtros ou importe seu edital.</div></div>';
}
function topicRow(t){
  const q=Number(t.questions||0),c=Number(t.correct||0),r=t.reviews||[];let chips='';[24,7,30].forEach(function(n,i){const d=r[i],cls=d===today()?'today':(d&&d<today()?'done':'');chips+='<span class="rev-chip '+cls+'">'+(n===24?'24h':n+'d')+'</span>'});
  return '<div class="topic-row"><div class="topic-main"><strong>'+esc(t.name)+'</strong><small>'+esc(t.subject)+'</small></div><div class="tiny-stat"><b>'+t.theory+'%</b><div class="mini-progress"><span style="width:'+t.theory+'%;background:'+subjectColor(t.subject)+'"></span></div></div><div class="tiny-stat"><b>'+q+'</b><span>questões</span></div><div class="tiny-stat"><b>'+(q?accuracy(q,c)+'%':'—')+'</b><span>acerto</span></div><div class="rev-chips">'+chips+'</div><select class="topic-status '+t.status+'" data-status-topic="'+t.id+'"><option value="nao-iniciado" '+(t.status==='nao-iniciado'?'selected':'')+'>Não iniciado</option><option value="andamento" '+(t.status==='andamento'?'selected':'')+'>Em andamento</option><option value="concluido" '+(t.status==='concluido'?'selected':'')+'>Concluído</option><option value="revisar" '+(t.status==='revisar'?'selected':'')+'>Revisar</option></select><button class="row-action" data-edit-topic="'+t.id+'">⋯</button></div>'
}
function renderQuestions(){
  const q=totalQuestions();document.getElementById('questionTotal').textContent=q.total;document.getElementById('questionCorrect').textContent=q.correct;document.getElementById('questionPercent').textContent=accuracy(q.total,q.correct)+'%';
  document.getElementById('questionBySubject').innerHTML=state.subjects.map(function(s){const x=subjectQuestions(s.name);const a=accuracy(x.total,x.correct);return '<div class="question-by-subject-row"><strong>'+esc(s.name)+'</strong><div class="progress-track"><span style="width:'+a+'%;background:'+s.color+'"></span></div><span>'+a+'%</span></div>'}).join('');
  const errors=state.questions.filter(function(x){return accuracy(x.total,x.correct)<70}).sort(function(a,b){return accuracy(a.total,a.correct)-accuracy(b.total,b.correct)}).slice(0,5);document.getElementById('errorNotebook').innerHTML=errors.length?errors.map(function(x){return '<div class="error-row"><div class="error-top"><strong>'+esc(x.topic||'Geral')+'</strong><span>'+accuracy(x.total,x.correct)+'%</span></div><small>'+esc(x.subject)+' · '+(x.total-x.correct)+' erro(s)</small></div>'}).join(''):'<div class="section-empty"><strong>Nenhum bloco abaixo de 70%.</strong>Continue registrando para encontrar seus pontos fracos.</div>';
  const rows=state.questions.slice().sort(function(a,b){return b.date.localeCompare(a.date)});document.getElementById('questionHistory').innerHTML=rows.length?rows.map(function(x){const a=accuracy(x.total,x.correct),cls=a>=80?'good':a>=60?'warn':'bad';return '<div class="question-history-row"><strong>'+esc(x.subject)+'</strong><span>'+esc(x.topic||'Geral')+'</span><span>'+x.total+' questões</span><span>'+x.correct+' acertos</span><span class="'+cls+'">'+a+'%</span></div>'}).join(''):'<div class="section-empty">Nenhum bloco registrado.</div>';
}
function renderReviews(){
  let rows=state.topics.flatMap(function(t){return (t.reviews||[]).map(function(d,i){return {topic:t,date:d,index:i}})}).sort(function(a,b){return a.date.localeCompare(b.date)});
  rows=rows.filter(function(r){return reviewFilter==='all'||(reviewFilter==='today'&&r.date===today())||(reviewFilter==='overdue'&&r.date<today())||(reviewFilter==='future'&&r.date>today())});
  document.getElementById('reviewGrid').innerHTML=rows.length?rows.map(function(r){const cls=r.date<today()?'overdue':r.date===today()?'today':'';const label=r.date<today()?'Atrasada':r.date===today()?'Hoje':dateText(r.date);return '<article class="review-card '+cls+'"><div class="review-card-top"><strong>'+esc(r.topic.name)+'</strong><span>'+label+'</span></div><p>'+esc(r.topic.subject)+' · revisão '+(r.index+1)+'. Tente lembrar os pontos principais antes de consultar o material.</p><div class="review-bottom"><small>'+dateText(r.date)+'</small>'+(r.date<=today()?'<button data-complete-review="'+r.topic.id+'" data-review-index="'+r.index+'">Concluir + próxima</button>':'')+'</div></article>'}).join(''):'<div class="card"><div class="section-empty"><strong>Nenhuma revisão nessa categoria.</strong>Tudo organizado por aqui.</div></div>';
}
function renderCycle(){
  const total=state.cycle.reduce(function(a,c){return a+Number(c.hours||0)},0),stud=weekMinutes(),coverage=Math.min(100,Math.round(total?stud/60/total*100:0));document.getElementById('cycleHours').textContent=fmtHours(total);document.getElementById('cycleStudied').textContent=fmtHours(stud/60);document.getElementById('cycleCoverage').textContent=coverage+'%';
  document.getElementById('cycleList').innerHTML=state.cycle.length?state.cycle.slice().sort(function(a,b){return b.priority-a.priority}).map(function(c){const p=total?Math.min(100,Math.round(c.hours/total*100)):0;let bars='';for(let i=1;i<=5;i++)bars+='<i class="'+(i<=c.priority?'on':'')+'"></i>';return '<div class="cycle-list-row"><strong>'+esc(c.subject)+'</strong><span>'+c.hours+'h / semana</span><div class="priority-bars">'+bars+'</div><div class="progress-track"><span style="width:'+p+'%;background:'+subjectColor(c.subject)+'"></span></div><button data-del-cycle="'+c.id+'">Excluir</button></div>'}).join(''):'<div class="section-empty"><strong>Ciclo vazio.</strong>Adicione as matérias prioritárias.</div>';
}
function renderPerformance(){
  document.getElementById('timeBySubject').innerHTML=state.subjects.slice().sort(function(a,b){return subjectTime(b.name)-subjectTime(a.name)}).map(function(s){const v=subjectTime(s.name);const max=Math.max.apply(null,state.subjects.map(function(x){return subjectTime(x.name)}).concat([60]));return '<div class="analytic-row"><strong>'+esc(s.name)+'</strong><div class="progress-track"><span style="width:'+Math.round(v/max*100)+'%;background:'+s.color+'"></span></div><span>'+fmtMin(v)+'</span></div>'}).join('');
  document.getElementById('coverageBySubject').innerHTML=state.subjects.slice().sort(function(a,b){return subjectTheory(a.name)-subjectTheory(b.name)}).map(function(s){const v=subjectTheory(s.name);return '<div class="analytic-row"><strong>'+esc(s.name)+'</strong><div class="progress-track"><span style="width:'+v+'%;background:'+s.color+'"></span></div><span>'+v+'%</span></div>'}).join('');
  document.getElementById('performanceTable').innerHTML=state.subjects.map(function(s){const q=subjectQuestions(s.name);return '<tr><td class="subject-cell">'+esc(s.name)+'</td><td>'+subjectTheory(s.name)+'%</td><td>'+q.total+'</td><td class="'+(accuracy(q.total,q.correct)>=80?'good':accuracy(q.total,q.correct)>=60?'warn':'bad')+'">'+accuracy(q.total,q.correct)+'%</td><td class="muted">'+fmtMin(subjectTime(s.name))+'</td><td>P'+s.priority+'</td></tr>'}).join('');
}
function renderDiary(){
  document.getElementById('diaryDate').value=document.getElementById('diaryDate').value||today();const rows=state.diary.slice().sort(function(a,b){return b.date.localeCompare(a.date)});document.getElementById('diaryEntries').innerHTML=rows.length?rows.map(function(x){return '<article class="diary-entry"><div class="diary-entry-top"><strong>'+x.mood+' · '+fullDate(x.date)+'</strong><small>'+dateText(x.date)+'</small></div><p>'+esc(x.text)+'</p></article>'}).join(''):'<div class="section-empty"><strong>Seu diário está vazio.</strong>Escreva sua primeira anotação.</div>';
}
function applyTheme(){document.body.classList.toggle('dark-mode',state.settings.theme==='dark');document.getElementById('themeButton').innerHTML=state.settings.theme==='dark'?'☾ <span>Tema escuro</span>':'☼ <span>Tema claro</span>'}
function toast(msg){const e=document.getElementById('toast');e.textContent=msg;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){e.classList.remove('show')},2200)}
function closeMobile(){document.getElementById('sidebar').classList.remove('open');document.getElementById('mobileOverlay').classList.remove('show')}
function val(id){return document.getElementById(id)?document.getElementById(id).value:''}
function formGrid(items){return '<div class="form-grid">'+items.map(function(x){return '<div class="field"><label>'+x.label+'</label>'+x.field+'</div>'}).join('')+'</div>'}

function openModal(type,topic){
  modalType=type;editingTopicId=topic?topic.id:'';document.getElementById('modalBackdrop').hidden=false;document.getElementById('modalTitle').textContent=({study:'Registrar estudo',questions:'Registrar questões',topic:topic?'Editar assunto':'Adicionar assunto',review:'Agendar revisão',cycle:'Adicionar matéria',import:'Importar edital',settings:'Configurações'}[type]||'Registrar');
  const opts=state.subjects.map(function(s){return '<option>'+esc(s.name)+'</option>'}).join('');let html='';
  if(type==='study')html=formGrid([{label:'Matéria',field:'<select id="mSubject">'+opts+'</select>'},{label:'Assunto',field:'<input id="mTopic" placeholder="Ex.: Lei 9.782/1999">'},{label:'Minutos',field:'<input id="mMinutes" type="number" min="1" value="50">'}]);
  if(type==='questions')html=formGrid([{label:'Matéria',field:'<select id="mSubject">'+opts+'</select>'},{label:'Assunto',field:'<input id="mTopic" placeholder="Assunto das questões">'},{label:'Questões / acertos',field:'<div class="two-inputs"><input id="mTotal" type="number" min="1" value="20"><input id="mCorrect" type="number" min="0" value="14"></div>'}]);
  if(type==='topic'){const subject=topic?topic.subject:(state.subjects[0]?state.subjects[0].name:'');html=formGrid([{label:'Matéria',field:topic?'<input value="'+esc(subject)+'" disabled>':'<select id="mSubject">'+opts+'</select>'},{label:'Assunto',field:'<input id="mTopic" required value="'+esc(topic?topic.name:'')+'">'},{label:'Teoria concluída (%)',field:'<input id="mTheory" type="number" min="0" max="100" value="'+(topic?topic.theory:0)+'">'},{label:'Questões / acertos',field:'<div class="two-inputs"><input id="mTotal" type="number" min="0" value="'+(topic?topic.questions:0)+'"><input id="mCorrect" type="number" min="0" value="'+(topic?topic.correct:0)+'"></div>'},{label:'Status',field:'<select id="mStatus"><option value="nao-iniciado">Não iniciado</option><option value="andamento">Em andamento</option><option value="concluido">Concluído</option><option value="revisar">Revisar</option></select>'}]);}
  if(type==='review')html=formGrid([{label:'Assunto',field:'<select id="mTopicId">'+state.topics.map(function(t){return '<option value="'+t.id+'">'+esc(t.subject)+' — '+esc(t.name)+'</option>'}).join('')+'</select>'},{label:'Data',field:'<input id="mDate" type="date" value="'+today()+'">'}]);
  if(type==='cycle')html=formGrid([{label:'Matéria',field:'<select id="mSubject">'+opts+'</select>'},{label:'Horas por semana',field:'<input id="mHours" type="number" min=".5" step=".5" value="2">'},{label:'Prioridade (1 a 5)',field:'<input id="mPriority" type="number" min="1" max="5" value="3">'}]);
  if(type==='import')html='<div class="form-grid"><div class="hint"><b>Formato simples:</b> uma linha por assunto usando <b>Matéria | Assunto</b>. Ex.: Vigilância Sanitária | Lei 9.782/1999.</div><div class="field"><label>Conteúdo do edital</label><textarea id="mImportText" class="import-box" placeholder="Vigilância Sanitária | Lei 9.782/1999\nLíngua Portuguesa | Interpretação de textos"></textarea></div></div>';
  if(type==='settings')html=formGrid([{label:'Nome da prova / concurso',field:'<input id="mExam" value="'+esc(state.settings.examName)+'">'},{label:'Meta diária em minutos',field:'<input id="mDaily" type="number" min="15" max="720" value="'+state.settings.dailyMinutes+'">'},{label:'Meta semanal em minutos',field:'<input id="mWeekly" type="number" min="60" max="5000" value="'+state.settings.weekMinutes+'"></input>'}])+'<div class="hint" style="margin-top:10px">Os seus dados ficam salvos neste navegador. A plataforma não precisa de Supabase para funcionar.</div>';
  document.getElementById('modalFields').innerHTML=html;
  if(topic){document.getElementById('mStatus').value=topic.status}
}
function closeModal(){modalType='';editingTopicId='';document.getElementById('modalBackdrop').hidden=true}
function refreshFocusSubjects(){const sel=document.getElementById('focusSubject');if(!sel)return;const old=sel.value;sel.innerHTML='<option value="">Escolha uma matéria</option>'+state.subjects.map(function(s){return '<option>'+esc(s.name)+'</option>'}).join('');if(state.subjects.some(function(s){return s.name===old}))sel.value=old}
function startFocus(){const subject=document.getElementById('focusSubject').value,topic=document.getElementById('focusTopic').value;if(!subject){toast('Escolha uma matéria.');return}focusTimer.subject=subject;focusTimer.topic=topic;if(focusTimer.running){clearInterval(focusTimer.interval);focusTimer.running=false;document.getElementById('focusToggle').textContent='Continuar';return}focusTimer.running=true;document.getElementById('focusToggle').textContent='Pausar';focusTimer.interval=setInterval(function(){focusTimer.seconds--;updateFocusDisplay();if(focusTimer.seconds<=0){clearInterval(focusTimer.interval);focusTimer.running=false;addSession(focusTimer.subject,focusTimer.topic,Math.round(focusTimer.duration/60));resetFocus(25);toast('Foco concluído 🎉')}},1000)}
function updateFocusDisplay(){const e=document.getElementById('focusDisplay');if(!e)return;const m=String(Math.floor(focusTimer.seconds/60)).padStart(2,'0'),s=String(focusTimer.seconds%60).padStart(2,'0');e.textContent=m+':'+s}
function resetFocus(minutes){clearInterval(focusTimer.interval);focusTimer.running=false;focusTimer.duration=minutes*60;focusTimer.seconds=focusTimer.duration;updateFocusDisplay();const b=document.getElementById('focusToggle');if(b)b.textContent='Começar'}
function addSession(subject,topic,minutes){if(!subject||!minutes||minutes<=0)return;state.sessions.push({id:uid(),subject:subject,topic:topic||'Estudo livre',minutes:Number(minutes),date:today(),createdAt:Date.now()});save();render();toast('Estudo salvo.')}
function addQuestions(subject,topic,total,correct){if(!subject||total<=0||correct<0||correct>total)return;state.questions.push({id:uid(),subject:subject,topic:topic||'Geral',total:Number(total),correct:Number(correct),date:today()});const target=state.topics.find(function(t){return t.subject===subject&&t.name.toLowerCase()===(topic||'').toLowerCase()});if(target){target.questions=Number(target.questions||0)+Number(total);target.correct=Number(target.correct||0)+Number(correct);if(target.status==='nao-iniciado')target.status='andamento'}save();render();toast('Questões registradas.')}
function completeReview(idTopic,index){const t=state.topics.find(function(x){return x.id===idTopic});if(!t)return;const i=Number(index);t.reviews=t.reviews||[];t.reviews[i]=shift(today(),i===0?1:i===1?7:30);if(i>=2)t.reviews.push(shift(today(),60));t.status='revisar';save();render();toast('Revisão concluída. Próxima foi agendada.')}
function autoCycle(){state.cycle=state.subjects.slice().sort(function(a,b){return b.priority-a.priority}).map(function(s){const old=state.cycle.find(function(c){return c.subject===s.name});return {id:old?old.id:uid(),subject:s.name,hours:old?old.hours:Math.max(1,6-s.priority),priority:s.priority}});save();render();toast('Ciclo reorganizado pela prioridade!')}
function importEdital(text){
  const lines=text.split(/\n/).map(function(x){return x.trim()}).filter(Boolean);let added=0;
  lines.forEach(function(line){const parts=line.split('|');if(parts.length<2)return;const subject=parts[0].trim(),name=parts.slice(1).join('|').trim();if(!name)return;if(!state.subjects.some(function(s){return s.name===subject}))state.subjects.push({id:uid(),name:subject,color:['#2563eb','#7c3aed','#0f766e','#d97706','#dc2626','#64748b'][state.subjects.length%6],priority:3});state.topics.push({id:uid(),subject:subject,name:name,theory:0,questions:0,correct:0,status:'nao-iniciado',reviews:[]});added++});
  save();render();toast(added+' assunto(s) importado(s).')
}
function downloadJSON(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='mago-backup-'+today()+'.json';a.click();URL.revokeObjectURL(url)}
function bind(){
  document.addEventListener('click',function(e){
    const nav=e.target.closest('[data-view]');if(nav){navigate(nav.dataset.view);return}
    const target=e.target.closest('[data-view-target]');if(target){navigate(target.dataset.viewTarget);return}
    const action=e.target.closest('[data-action]');if(action){const x=action.dataset.action;if(x==='focus'){navigate('today');setTimeout(function(){document.getElementById('focusSubject').focus()},100)}if(x==='study')openModal('study');if(x==='questions')openModal('questions');if(x==='topic')openModal('topic');if(x==='review')openModal('review');if(x==='cycle')openModal('cycle');if(x==='import')openModal('import');if(x==='settings')openModal('settings');if(x==='export')downloadJSON();if(x==='auto-cycle')autoCycle()}
    const tab=e.target.closest('[data-review-tab]');if(tab){reviewFilter=tab.dataset.reviewTab;document.querySelectorAll('[data-review-tab]').forEach(function(b){b.classList.toggle('active',b===tab)});renderReviews()}
    const done=e.target.closest('[data-complete-review]');if(done)completeReview(done.dataset.completeReview,done.dataset.reviewIndex)
    const del=e.target.closest('[data-del-cycle]');if(del){state.cycle=state.cycle.filter(function(c){return c.id!==del.dataset.delCycle});save();render();toast('Matéria removida do ciclo.')}
    const edit=e.target.closest('[data-edit-topic]');if(edit){const t=state.topics.find(function(x){return x.id===edit.dataset.editTopic});if(t)openModal('topic',t)}
    const preset=e.target.closest('[data-preset]');if(preset){resetFocus(Number(preset.dataset.preset))}
  });
  document.getElementById('headerRegisterButton').addEventListener('click',function(){openModal('study')});
  document.getElementById('headerFocusButton').addEventListener('click',function(){navigate('today')});
  document.getElementById('globalSearchButton').addEventListener('click',function(){navigate('edital');setTimeout(function(){document.getElementById('topicSearch').focus()},100)});
  document.getElementById('themeButton').addEventListener('click',function(){state.settings.theme=state.settings.theme==='dark'?'light':'dark';save();render()});
  document.getElementById('resetButton').addEventListener('click',function(){if(confirm('Restaurar o Mago para os dados demo?')){state=makeSeed();save();render();toast('Demo restaurada.')}});
  document.getElementById('mobileMenu').addEventListener('click',function(){document.getElementById('sidebar').classList.add('open');document.getElementById('mobileOverlay').classList.add('show')});
  document.getElementById('mobileOverlay').addEventListener('click',closeMobile);
  document.getElementById('modalClose').addEventListener('click',closeModal);document.getElementById('modalCancel').addEventListener('click',closeModal);document.getElementById('modalBackdrop').addEventListener('click',function(e){if(e.target.id==='modalBackdrop')closeModal()});
  document.getElementById('modalForm').addEventListener('submit',function(e){
    e.preventDefault();
    if(modalType==='study'){addSession(val('mSubject'),val('mTopic'),Number(val('mMinutes')));closeModal();return}
    if(modalType==='questions'){addQuestions(val('mSubject'),val('mTopic'),Number(val('mTotal')),Number(val('mCorrect')));closeModal();return}
    if(modalType==='topic'){
      let t=editingTopicId?state.topics.find(function(x){return x.id===editingTopicId}):null;if(!t){t={id:uid(),subject:val('mSubject'),name:'',theory:0,questions:0,correct:0,status:'nao-iniciado',reviews:[]};state.topics.push(t)}
      t.name=val('mTopic').trim();t.theory=Math.max(0,Math.min(100,Number(val('mTheory'))));t.questions=Math.max(0,Number(val('mTotal')));t.correct=Math.max(0,Math.min(t.questions,Number(val('mCorrect'))));t.status=val('mStatus');save();render();closeModal();toast('Assunto salvo!');return
    }
    if(modalType==='review'){const t=state.topics.find(function(x){return x.id===val('mTopicId')});if(t){t.reviews=(t.reviews||[]).concat([val('mDate')]).sort();save();render();toast('Revisão agendada.')}closeModal();return}
    if(modalType==='cycle'){state.cycle.push({id:uid(),subject:val('mSubject'),hours:Number(val('mHours')),priority:Number(val('mPriority'))});save();render();closeModal();toast('Matéria entrou no ciclo.');return}
    if(modalType==='import'){importEdital(val('mImportText'));closeModal();return}
    if(modalType==='settings'){state.settings.examName=val('mExam').trim();state.settings.dailyMinutes=Math.max(15,Number(val('mDaily')));state.settings.weekMinutes=Math.max(60,Number(val('mWeekly')));save();render();closeModal();toast('Configurações salvas!');return}
  });
  document.getElementById('topicSearch').addEventListener('input',renderEdital);document.getElementById('topicSubjectFilter').addEventListener('change',renderEdital);document.getElementById('topicStatusFilter').addEventListener('change',renderEdital);
  document.getElementById('editalSections').addEventListener('change',function(e){const x=e.target.closest('[data-status-topic]');if(x){const t=state.topics.find(function(a){return a.id===x.dataset.statusTopic});if(t){t.status=x.value;save();render();toast('Status atualizado.')}}});
  document.getElementById('focusToggle').addEventListener('click',startFocus);document.getElementById('focusReset').addEventListener('click',function(){resetFocus(25)});document.getElementById('focusFinish').addEventListener('click',function(){if(!focusTimer.subject){focusTimer.subject=document.getElementById('focusSubject').value;focusTimer.topic=document.getElementById('focusTopic').value}const elapsed=Math.max(0,Math.round((focusTimer.duration-focusTimer.seconds)/60));if(elapsed>0&&focusTimer.subject)addSession(focusTimer.subject,focusTimer.topic,elapsed);resetFocus(25)});
  document.getElementById('diaryForm').addEventListener('submit',function(e){e.preventDefault();const text=document.getElementById('diaryText').value.trim();if(!text)return;state.diary.push({id:uid(),date:document.getElementById('diaryDate').value||today(),mood:document.getElementById('diaryMood').value,text:text});save();document.getElementById('diaryText').value='';render();toast('Anotação salva!')});
}
bind();document.getElementById('diaryDate').value=today();updateFocusDisplay();render();