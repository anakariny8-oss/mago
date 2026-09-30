const KEY="mago-v3";
function today(){return new Date().toISOString().slice(0,10)}
function shift(key,n){const d=new Date(key+"T12:00:00");d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)}
function id(){return crypto.randomUUID()}
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]})}
function fmtMin(n){n=Number(n||0);const h=Math.floor(n/60),m=n%60;return h?h+"h "+String(m).padStart(2,"0"):m+"min"}
function fmtHours(n){n=Number(n||0);return Number.isInteger(n)?n+"h":n.toFixed(1).replace(".",",")+"h"}
function dateLabel(k){return new Date(k+"T12:00:00").toLocaleDateString("pt-BR",{day:"2-digit",month:"short"}).replace(".","")}
function fullDate(k){return new Date(k+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"long"})}
function seed(){
  const a=(s,c)=>({id:id(),name:s,color:c});
  return {
    settings:{dailyMinutes:120,theme:"light"},
    subjects:[a("Vigilância Sanitária","#2563eb"),a("Língua Portuguesa","#7c3aed"),a("Raciocínio Lógico e Matemático","#0f766e"),a("História e Geografia do Tocantins","#d97706"),a("Legislação","#dc2626"),a("Arquiteto","#64748b")],
    topics:[
      {id:id(),subject:"Vigilância Sanitária",name:"Lei 9.782/1999 — SNVS e Anvisa",theory:75,questions:18,correct:14,status:"andamento",reviews:[shift(today(),-8),shift(today(),-1),today()]},
      {id:id(),subject:"Vigilância Sanitária",name:"Decreto 3.029/1999",theory:35,questions:10,correct:7,status:"andamento",reviews:[shift(today(),1),shift(today(),7)]},
      {id:id(),subject:"Vigilância Sanitária",name:"Lei 6.360/1976",theory:0,questions:0,correct:0,status:"nao-iniciado",reviews:[]},
      {id:id(),subject:"Vigilância Sanitária",name:"Decreto 8.077/2013",theory:100,questions:22,correct:19,status:"concluido",reviews:[shift(today(),-20),shift(today(),-1),today()]},
      {id:id(),subject:"Língua Portuguesa",name:"Interpretação de textos",theory:80,questions:30,correct:24,status:"andamento",reviews:[shift(today(),-2),shift(today(),7)]},
      {id:id(),subject:"Língua Portuguesa",name:"Acentuação e ortografia",theory:50,questions:20,correct:15,status:"andamento",reviews:[today()]},
      {id:id(),subject:"Raciocínio Lógico e Matemático",name:"Proposições e conectivos",theory:40,questions:15,correct:9,status:"andamento",reviews:[shift(today(),1)]},
      {id:id(),subject:"História e Geografia do Tocantins",name:"Formação histórica do Tocantins",theory:25,questions:8,correct:5,status:"andamento",reviews:[]},
      {id:id(),subject:"Legislação",name:"Princípios da Administração Pública",theory:15,questions:6,correct:4,status:"andamento",reviews:[]},
      {id:id(),subject:"Arquiteto",name:"Projeto e representação gráfica",theory:0,questions:0,correct:0,status:"nao-iniciado",reviews:[]}
    ],
    questions:[
      {id:id(),subject:"Vigilância Sanitária",topic:"Lei 9.782/1999 — SNVS e Anvisa",total:18,correct:14,date:shift(today(),-1)},
      {id:id(),subject:"Língua Portuguesa",topic:"Interpretação de textos",total:20,correct:16,date:shift(today(),-2)},
      {id:id(),subject:"Raciocínio Lógico e Matemático",topic:"Proposições e conectivos",total:15,correct:9,date:today()}
    ],
    sessions:[
      {id:id(),subject:"Vigilância Sanitária",topic:"Lei 9.782/1999",minutes:62,date:today(),createdAt:Date.now()-3600000},
      {id:id(),subject:"Língua Portuguesa",topic:"Interpretação de textos",minutes:48,date:shift(today(),-1),createdAt:Date.now()-90000000},
      {id:id(),subject:"Raciocínio Lógico e Matemático",topic:"Proposições",minutes:70,date:shift(today(),-2),createdAt:Date.now()-180000000},
      {id:id(),subject:"Vigilância Sanitária",topic:"Decreto 8.077/2013",minutes:54,date:shift(today(),-3),createdAt:Date.now()-270000000}
    ],
    cycle:[
      {id:id(),subject:"Vigilância Sanitária",hours:4,priority:5},
      {id:id(),subject:"Língua Portuguesa",hours:3,priority:4},
      {id:id(),subject:"Raciocínio Lógico e Matemático",hours:3,priority:4},
      {id:id(),subject:"História e Geografia do Tocantins",hours:2,priority:3},
      {id:id(),subject:"Legislação",hours:2,priority:3},
      {id:id(),subject:"Arquiteto",hours:1,priority:2}
    ],
    diary:[
      {id:id(),date:shift(today(),-1),mood:"🙂",text:"Rendi bem em Português. Preciso voltar em interpretação de textos e fazer mais questões."},
      {id:id(),date:shift(today(),-3),mood:"😀",text:"Sessão boa de Vigilância Sanitária. A lei 9.782 está começando a ficar mais familiar."}
    ]
  }
}
let state=load(),view="dashboard",reviewFilter="all",modalType="",editTopicId="",toastTimer=null,timer=null;
function load(){try{return JSON.parse(localStorage.getItem(KEY))||seed()}catch{return seed()}}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function totalQuestions(){return state.questions.reduce(function(a,q){a.total+=Number(q.total);a.correct+=Number(q.correct);return a},{total:0,correct:0})}
function acc(t,c){return t?Math.round(c/t*100):0}
function todayMinutes(){return state.sessions.filter(function(s){return s.date===today()}).reduce(function(a,s){return a+Number(s.minutes)},0)}
function weekMinutes(){let n=0;for(let i=0;i<7;i++)n+=state.sessions.filter(function(s){return s.date===shift(today(),-i)}).reduce(function(a,s){return a+Number(s.minutes)},0);return n}
function dueReviews(){return state.topics.flatMap(function(t){return (t.reviews||[]).map(function(d,i){return {topic:t,date:d,index:i}})}).filter(function(r){return r.date<=today()})}
function streak(){const days=new Set(state.sessions.map(function(s){return s.date}));let d=today(),n=0;while(days.has(d)){n++;d=shift(d,-1)}return n}
function subjectStats(name){const qs=state.questions.filter(function(q){return q.subject===name});return qs.reduce(function(a,q){a.total+=q.total;a.correct+=q.correct;return a},{total:0,correct:0})}
function subjectProgress(name){const ts=state.topics.filter(function(t){return t.subject===name});return ts.length?Math.round(ts.reduce(function(a,t){return a+t.theory},0)/ts.length):0}
function color(name){const s=state.subjects.find(function(x){return x.name===name});return s?s.color:"#2563eb"}
function render(){
  applyTheme();document.getElementById("dateLabel").textContent=fullDate(today());document.getElementById("pageTitle").textContent=({"dashboard":"Dashboard","today":"Hoje","edital":"Edital","questions":"Questões","reviews":"Revisões","cycle":"Ciclo de estudos","diary":"Diário"}[view]||"Dashboard");
  document.querySelectorAll(".view").forEach(function(v){v.classList.toggle("active",v.id===view+"View")});document.querySelectorAll(".nav-item").forEach(function(v){v.classList.toggle("active",v.dataset.view===view)});
  renderSidebar();renderDashboard();renderToday();renderEdital();renderQuestions();renderReviews();renderCycle();renderDiary();
}
function renderSidebar(){const m=todayMinutes(),p=Math.min(100,Math.round(m/state.settings.dailyMinutes*100)),d=dueReviews().length;document.getElementById("sidebarFocus").textContent=fmtMin(m);document.getElementById("sidebarProgress").style.width=p+"%";document.getElementById("sidebarFocusMeta").textContent="Meta de "+fmtMin(state.settings.dailyMinutes);document.getElementById("reviewBadge").textContent=d;document.getElementById("reviewBadge").style.display=d?"grid":"none"}
function renderDashboard(){
  const m=todayMinutes(),p=Math.min(100,Math.round(m/state.settings.dailyMinutes*100)),q=totalQuestions(),d=dueReviews();
  document.getElementById("dailyPercent").textContent=p+"%";document.getElementById("dailyRing").style.background="conic-gradient(#60a5fa "+p*3.6+"deg,#ffffff1f "+p*3.6+"deg)";
  document.getElementById("statToday").textContent=fmtHours(m/60);document.getElementById("statQuestions").textContent=q.total;document.getElementById("statAccuracy").textContent=acc(q.total,q.correct)+"%";document.getElementById("statReviews").textContent=d.length;document.getElementById("statStreak").textContent=streak()+" dias";
  document.getElementById("welcomeTitle").textContent=m>=state.settings.dailyMinutes?"Meta concluída. Mandou bem!":"Bora estudar?";document.getElementById("welcomeText").textContent=m?"Você já estudou "+fmtMin(m)+" hoje. O próximo bloco pode ser curto e objetivo.":"Comece com um bloco de foco e deixe o Mago registrar o resto.";
  const cycle=state.cycle.slice().sort(function(a,b){return b.priority-a.priority}).slice(0,4);
  document.getElementById("dashboardSchedule").innerHTML=cycle.length?cycle.map(function(c,i){return '<div class="schedule-item"><div class="time-pill">'+["08:00","10:00","14:00","16:00"][i]+'</div><div class="item-main"><strong>'+esc(c.subject)+'</strong><small>'+c.hours+'h por semana · prioridade '+c.priority+'/5</small></div><span class="item-badge">'+(i===0?"Próximo":"Planejado")+'</span></div>'}).join(""):'<div class="empty"><strong>Ciclo vazio</strong>Adicione matérias.</div>';
  document.getElementById("dashboardReviews").innerHTML=d.length?d.slice(0,4).map(function(r){return '<div class="review-mini"><span class="status-dot '+(r.date===today()?"active":r.date<today()?"done":"")+'"></span><div class="item-main"><strong>'+esc(r.topic.name)+'</strong><small>'+esc(r.topic.subject)+' · revisão '+(r.index+1)+'</small></div><span class="item-badge">'+(r.date<today()?"Atrasada":"Hoje")+'</span></div>'}).join(""):'<div class="empty"><strong>Você está em dia 🎉</strong>Nenhuma revisão pendente.</div>';
  const subs=state.subjects.slice().sort(function(a,b){return b.priority-a.priority});
  document.getElementById("subjectPerformance").innerHTML=subs.map(function(s){const x=subjectStats(s.name),a=acc(x.total,x.correct);return '<div class="perf-item"><strong title="'+esc(s.name)+'">'+esc(s.name)+'</strong><div class="progress-line"><span style="width:'+a+'%;background:'+s.color+'"></span></div><span>'+a+'%</span></div>'}).join("");
  const vals=[];for(let i=0;i<7;i++)vals.push(state.sessions.filter(function(s){return s.date===shift(today(),i-6)}).reduce(function(a,s){return a+s.minutes},0));const max=Math.max.apply(null,vals.concat([60]));
  document.getElementById("weekChart").innerHTML=vals.map(function(v,i){return '<div class="bar-col"><div class="bar-wrap"><div class="week-bar" style="height:'+Math.max(5,Math.round(v/max*100))+'%;opacity:'+(v?1:.35)+'"></div></div><em>'+v+'m</em><label>'+new Date(shift(today(),i-6)+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"short"}).replace(".","")+'</label></div>'}).join("");
  document.getElementById("dashboardSubjects").innerHTML=subs.map(function(s){return '<div class="subject-overview-card"><strong>'+esc(s.name)+'</strong><small>'+state.topics.filter(function(t){return t.subject===s.name}).length+' assuntos</small><div class="progress-line"><span style="width:'+subjectProgress(s.name)+'%;background:'+s.color+'"></span></div><small>'+subjectProgress(s.name)+'% de teoria</small></div>'}).join("");
}
function renderToday(){
  const m=todayMinutes(),p=Math.min(100,Math.round(m/state.settings.dailyMinutes*100));document.getElementById("todayGoalValue").textContent=p+"%";document.getElementById("todayBigProgress").style.width=p+"%";document.getElementById("todayGoalMinutes").textContent=fmtMin(m)+" feitos";document.getElementById("todayGoalTarget").textContent=state.settings.dailyMinutes+"min meta";
  document.getElementById("todayBlocks").innerHTML=state.cycle.slice().sort(function(a,b){return b.priority-a.priority}).map(function(c,i){return '<div class="study-block"><span class="block-time">'+["08:00","10:00","14:00","16:00","18:00"][i%5]+'</span><div><strong>'+esc(c.subject)+'</strong><small>'+Math.max(30,Math.round(c.hours*60/Math.max(state.cycle.length,1)))+'min · prioridade '+c.priority+'/5</small></div><span class="status-dot '+(i<Math.floor(m/50)?"done":"active")+'"></span></div>'}).join("")||'<div class="empty"><strong>Seu ciclo está vazio.</strong>Adicione matérias para criar os blocos.</div>';
  const ss=state.sessions.filter(function(s){return s.date===today()}).sort(function(a,b){return b.createdAt-a.createdAt});document.getElementById("todaySessions").innerHTML=ss.length?ss.map(function(s){return '<div class="simple-item"><div class="time-pill">FOCO</div><div class="item-main"><strong>'+esc(s.subject)+'</strong><small>'+esc(s.topic||"Estudo livre")+'</small></div><strong>'+fmtMin(s.minutes)+'</strong></div>'}).join(""):'<div class="empty">Nenhuma sessão registrada hoje.</div>';
}
function renderEdital(){
  const sel=document.getElementById("subjectFilter"),old=sel.value;sel.innerHTML='<option value="">Todas as matérias</option>'+state.subjects.map(function(s){return '<option>'+esc(s.name)+'</option>'}).join("");sel.value=state.subjects.some(function(s){return s.name===old})?old:"";
  const q=(document.getElementById("topicSearch").value||"").toLowerCase(),sf=sel.value,st=document.getElementById("statusFilter").value,rows=state.topics.filter(function(t){return (!q||(t.name+" "+t.subject).toLowerCase().includes(q))&&(!sf||t.subject===sf)&&(!st||t.status===st)});
  const done=state.topics.filter(function(t){return t.status==="concluido"}).length,avg=state.topics.length?Math.round(state.topics.reduce(function(a,t){return a+t.theory},0)/state.topics.length):0;
  document.getElementById("editalSummary").innerHTML='<span class="summary-pill"><strong>'+state.topics.length+'</strong> assuntos</span><span class="summary-pill"><strong>'+done+'</strong> concluídos</span><span class="summary-pill"><strong>'+avg+'%</strong> teoria média</span><span class="summary-pill"><strong>'+totalQuestions().total+'</strong> questões</span>';
  document.getElementById("editalTableBody").innerHTML=rows.length?rows.map(topicRow).join(""):'<tr><td colspan="7"><div class="empty">Nenhum assunto encontrado.</div></td></tr>';
}
function topicRow(t){
  const q=Number(t.questions||0),c=Number(t.correct||0),rev=t.reviews||[];let chips="";
  [24,7,30].forEach(function(n,i){const cls=rev[i]&&rev[i]<today()?"done":rev[i]===today()?"today":"";chips+='<span class="revision-chip '+cls+'">'+(n===24?"24h":n+"d")+'</span>'});
  return '<tr><td><span class="topic-name">'+esc(t.name)+'</span><span class="topic-sub">'+esc(t.subject)+'</span></td><td><div class="theory-mini"><strong>'+t.theory+'%</strong><div class="progress-line"><span style="width:'+t.theory+'%;background:'+color(t.subject)+'"></span></div></div></td><td>'+q+'</td><td>'+(q?acc(q,c)+"%":"—")+'</td><td><div class="revision-chips">'+chips+'</div></td><td><select class="status-select '+t.status+'" data-status="'+t.id+'"><option value="nao-iniciado" '+(t.status==="nao-iniciado"?"selected":"")+'>Não iniciado</option><option value="andamento" '+(t.status==="andamento"?"selected":"")+'>Em andamento</option><option value="concluido" '+(t.status==="concluido"?"selected":"")+'>Concluído</option><option value="revisar" '+(t.status==="revisar"?"selected":"")+'>Revisar</option></select></td><td><button class="row-action" data-edit-topic="'+t.id+'">⋯</button></td></tr>';
}
function renderQuestions(){
  const q=totalQuestions();document.getElementById("qTotal").textContent=q.total;document.getElementById("qCorrect").textContent=q.correct;document.getElementById("qPercent").textContent=acc(q.total,q.correct)+"%";
  const rows=state.questions.slice().sort(function(a,b){return b.date.localeCompare(a.date)});document.getElementById("questionHistory").innerHTML=rows.length?rows.map(function(r){const a=acc(r.total,r.correct);return '<div class="question-row"><strong>'+esc(r.subject)+'</strong><span>'+esc(r.topic||"Geral")+'</span><span>'+r.total+' questões</span><span>'+r.correct+' acertos</span><span class="'+(a>=80?"accuracy-good":a>=60?"accuracy-warn":"accuracy-bad")+'">'+a+'%</span></div>'}).join(""):'<div class="empty"><strong>Nenhuma questão registrada.</strong>Comece pelo primeiro bloco.</div>';
}
function renderReviews(){
  let rows=state.topics.flatMap(function(t){return (t.reviews||[]).map(function(d,i){return {topic:t,date:d,index:i}})});rows.sort(function(a,b){return a.date.localeCompare(b.date)});
  rows=rows.filter(function(r){return reviewFilter==="all"||(reviewFilter==="today"&&r.date===today())||(reviewFilter==="overdue"&&r.date<today())||(reviewFilter==="future"&&r.date>today())});
  document.getElementById("reviewGrid").innerHTML=rows.length?rows.map(function(r){const cls=r.date<today()?"overdue":r.date===today()?"today":"";const label=r.date<today()?"Atrasada":r.date===today()?"Hoje":dateLabel(r.date);return '<article class="review-card '+cls+'"><div class="review-top"><strong>'+esc(r.topic.name)+'</strong><span class="review-date">'+label+'</span></div><p>'+esc(r.topic.subject)+' · revisão '+(r.index+1)+'. Volte no conteúdo e tente recuperar os pontos principais sem olhar.</p><div class="review-meta"><small>'+dateLabel(r.date)+'</small>'+(r.date<=today()?'<button data-review="'+r.topic.id+'" data-index="'+r.index+'">Concluir + próxima</button>':"")+'</div></article>'}).join(""):'<div class="panel"><div class="empty"><strong>Nenhuma revisão nessa filtragem.</strong>Tudo organizado.</div></div>';
}
function renderCycle(){
  const total=state.cycle.reduce(function(a,c){return a+c.hours},0),stud=weekMinutes();document.getElementById("cycleTotalTitle").textContent=fmtHours(total)+" planejadas";document.getElementById("cycleSubtitle").textContent=state.cycle.length+" matérias distribuídas";document.getElementById("cycleStudied").textContent=fmtHours(stud/60);
  document.getElementById("cycleList").innerHTML=state.cycle.length?state.cycle.slice().sort(function(a,b){return b.priority-a.priority}).map(function(c){const p=total?Math.min(100,Math.round(c.hours/total*100*2.5)):0;return '<div class="cycle-row"><div class="cycle-subject"><strong>'+esc(c.subject)+'</strong><small>Prioridade '+c.priority+'/5</small></div><div class="cycle-hours"><strong>'+c.hours+'h</strong> / semana</div><div class="progress-line"><span style="width:'+p+'%;background:'+color(c.subject)+'"></span></div><div class="cycle-action"><button class="row-action" data-del-cycle="'+c.id+'">Excluir</button></div></div>'}).join(""):'<div class="empty"><strong>Ciclo vazio.</strong>Adicione as matérias mais importantes.</div>';
}
function renderDiary(){
  document.getElementById("diaryDate").value=document.getElementById("diaryDate").value||today();const rows=state.diary.slice().sort(function(a,b){return b.date.localeCompare(a.date)});document.getElementById("diaryList").innerHTML=rows.length?rows.map(function(e){return '<article class="diary-entry"><div class="diary-entry-top"><strong>'+e.mood+' · '+fullDate(e.date)+'</strong><small>'+dateLabel(e.date)+'</small></div><p>'+esc(e.text)+'</p></article>'}).join(""):'<div class="empty"><strong>Seu diário está vazio.</strong>Registre o primeiro dia.</div>';
}
function applyTheme(){document.body.classList.toggle("dark-mode",state.settings.theme==="dark");document.getElementById("themeButton").innerHTML=state.settings.theme==="dark"?"☾ <span>Tema escuro</span>":"☼ <span>Tema claro</span>"}
function toast(msg){const e=document.getElementById("toast");e.textContent=msg;e.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(function(){e.classList.remove("show")},2200)}
function nav(v){view=v;document.querySelector(".sidebar").classList.remove("open");document.getElementById("mobileOverlay").classList.remove("show");render();window.scrollTo({top:0,behavior:"smooth"})}
function grid(items){return '<div class="form-grid">'+items.map(function(x){return '<div class="field"><label>'+x.label+'</label>'+x.field+'</div>'}).join("")+'</div>'}
function openModal(type,topic){
  modalType=type;editTopicId=topic?topic.id:"";document.getElementById("modalBackdrop").hidden=false;document.getElementById("modalTitle").textContent=({study:"Registrar estudo",questions:"Registrar questões",topic:topic?"Editar assunto":"Adicionar assunto",review:"Agendar revisão",cycle:"Adicionar ao ciclo",timer:"Sessão de foco"}[type]||"Registrar");
  const opts=state.subjects.map(function(s){return '<option>'+esc(s.name)+'</option>'}).join("");let html="";
  if(type==="study")html=grid([{label:"Matéria",field:'<select id="mSubject">'+opts+'</select>'},{label:"Assunto",field:'<input id="mTopic" placeholder="Ex.: Lei 9.782/1999">'},{label:"Minutos",field:'<input id="mMinutes" type="number" min="1" value="50">'}]);
  if(type==="questions")html=grid([{label:"Matéria",field:'<select id="mSubject">'+opts+'</select>'},{label:"Assunto",field:'<input id="mTopic" placeholder="Assunto das questões">'},{label:"Questões / acertos",field:'<div class="two-inputs"><input id="mTotal" type="number" min="1" value="20"><input id="mCorrect" type="number" min="0" value="14"></div>'}]);
  if(type==="topic"){const sub=topic?topic.subject:(state.subjects[0]?state.subjects[0].name:"");html=grid([{label:"Matéria",field:topic?'<input id="mSubject" value="'+esc(sub)+'" disabled>':'<select id="mSubject">'+opts+'</select>'},{label:"Assunto",field:'<input id="mTopic" required value="'+esc(topic?topic.name:"")+'">'},{label:"Teoria concluída (%)",field:'<input id="mTheory" type="number" min="0" max="100" value="'+(topic?topic.theory:0)+'">'},{label:"Questões / acertos",field:'<div class="two-inputs"><input id="mTotal" type="number" min="0" value="'+(topic?topic.questions:0)+'"><input id="mCorrect" type="number" min="0" value="'+(topic?topic.correct:0)+'"></div>'},{label:"Status",field:'<select id="mStatus"><option value="nao-iniciado">Não iniciado</option><option value="andamento">Em andamento</option><option value="concluido">Concluído</option><option value="revisar">Revisar</option></select>'}]);}
  if(type==="review")html=grid([{label:"Assunto",field:'<select id="mTopicId">'+state.topics.map(function(t){return '<option value="'+t.id+'">'+esc(t.subject)+" — "+esc(t.name)+"</option>"}).join("")+'</select>'},{label:"Data",field:'<input id="mDate" type="date" value="'+today()+'">'}]);
  if(type==="cycle")html=grid([{label:"Matéria",field:'<select id="mSubject">'+opts+'</select>'},{label:"Horas / semana",field:'<input id="mHours" type="number" min=".5" step=".5" value="2">'},{label:"Prioridade (1 a 5)",field:'<input id="mPriority" type="number" min="1" max="5" value="3">'}]);
  if(type==="timer")html='<div class="timer-box"><p style="color:var(--muted);font-size:10px">Escolha a matéria e inicie seu bloco.</p>'+grid([{label:"Matéria",field:'<select id="mSubject">'+opts+'</select>'},{label:"Assunto",field:'<input id="mTopic" placeholder="Opcional">' }])+'<div class="timer-big" id="timerBig">25:00</div><div class="timer-controls"><button type="button" class="outline-button" data-preset="25">25m</button><button type="button" class="outline-button" data-preset="50">50m</button><button type="button" class="outline-button" data-preset="90">90m</button><button type="button" class="primary-button" id="timerStart">Começar</button><button type="button" class="outline-button" id="timerFinish">Registrar</button></div></div>';
  document.getElementById("modalFields").innerHTML=html;
  if(topic)document.getElementById("mStatus").value=topic.status;
  if(topic)document.getElementById("mCorrect").value=topic.correct;
}
function closeModal(){if(timer&&timer.running){clearInterval(timer.interval);timer.running=false}modalType="";document.getElementById("modalBackdrop").hidden=true}
function addSession(subject,topic,minutes){if(!subject||minutes<=0)return;state.sessions.push({id:id(),subject:subject,topic:topic||"Estudo livre",minutes:Number(minutes),date:today(),createdAt:Date.now()});save();render();toast("Estudo registrado!")}
function addQuestions(subject,topic,total,correct){if(!subject||total<=0||correct<0||correct>total)return;state.questions.push({id:id(),subject:subject,topic:topic||"Geral",total:Number(total),correct:Number(correct),date:today()});const t=state.topics.find(function(x){return x.subject===subject&&x.name.toLowerCase()===(topic||"").toLowerCase()});if(t){t.questions=Number(t.questions)+Number(total);t.correct=Number(t.correct)+Number(correct);if(t.status==="nao-iniciado")t.status="andamento"}save();render();toast("Questões registradas!")}
function startTimer(){const subject=document.getElementById("mSubject")?document.getElementById("mSubject").value:"";const topic=document.getElementById("mTopic")?document.getElementById("mTopic").value:"";if(!subject){toast("Escolha uma matéria.");return}if(!timer)timer={seconds:1500,duration:1500,running:false,interval:null,subject:subject,topic:topic};timer.subject=subject;timer.topic=topic;if(timer.running){clearInterval(timer.interval);timer.running=false;document.getElementById("timerStart").textContent="Continuar";return}timer.running=true;document.getElementById("timerStart").textContent="Pausar";timer.interval=setInterval(function(){timer.seconds--;updateTimer();if(timer.seconds<=0){clearInterval(timer.interval);timer.running=false;addSession(timer.subject,timer.topic,Math.round(timer.duration/60));closeModal();toast("Foco concluído 🎉")}},1000)}
function updateTimer(){const m=String(Math.floor(timer.seconds/60)).padStart(2,"0"),s=String(timer.seconds%60).padStart(2,"0");const e=document.getElementById("timerBig");if(e)e.textContent=m+":"+s}
function preset(n){if(!timer)timer={};if(timer.interval)clearInterval(timer.interval);timer.seconds=n*60;timer.duration=n*60;timer.running=false;updateTimer();if(document.getElementById("timerStart"))document.getElementById("timerStart").textContent="Começar"}
function bind(){
  document.addEventListener("click",function(e){
    const n=e.target.closest("[data-view]");if(n){nav(n.dataset.view);return}
    const a=e.target.closest("[data-action]");if(a){const x=a.dataset.action;if(x==="open-timer")openModal("timer");if(x==="go-edital")nav("edital");if(x==="go-today")nav("today");if(x==="go-reviews")nav("reviews");if(x==="go-cycle")nav("cycle");if(x==="go-diary")nav("diary");if(x==="add-study")openModal("study");if(x==="add-questions")openModal("questions");if(x==="add-topic")openModal("topic");if(x==="add-review")openModal("review");if(x==="add-cycle")openModal("cycle")}
    const rf=e.target.closest("[data-review-filter]");if(rf){reviewFilter=rf.dataset.reviewFilter;document.querySelectorAll("[data-review-filter]").forEach(function(b){b.classList.toggle("active",b===rf)});renderReviews()}
    const rr=e.target.closest("[data-review]");if(rr){const t=state.topics.find(function(x){return x.id===rr.dataset.review});if(t){const i=Number(rr.dataset.index);t.reviews[i]=shift(today(),i===0?1:i===1?7:30);if(i>=2)t.reviews.push(shift(today(),60));t.status="revisar";save();render();toast("Revisão concluída! Próxima agendada.")}}
    const dc=e.target.closest("[data-del-cycle]");if(dc){state.cycle=state.cycle.filter(function(c){return c.id!==dc.dataset.delCycle});save();render();toast("Removido do ciclo.")}
    const et=e.target.closest("[data-edit-topic]");if(et){const t=state.topics.find(function(x){return x.id===et.dataset.editTopic});if(t)openModal("topic",t)}
    const pr=e.target.closest("[data-preset]");if(pr)preset(Number(pr.dataset.preset))
    if(e.target.id==="timerStart")startTimer()
    if(e.target.id==="timerFinish"&&timer){const elapsed=Math.max(0,Math.round((timer.duration-timer.seconds)/60));if(elapsed) addSession(timer.subject, timer.topic, elapsed);closeModal();preset(25)}
  });
  document.getElementById("quickActionButton").addEventListener("click",function(){openModal("study")});
  document.getElementById("timerHeaderButton").addEventListener("click",function(){openModal("timer")});
  document.getElementById("themeButton").addEventListener("click",function(){state.settings.theme=state.settings.theme==="dark"?"light":"dark";save();render()});
  document.getElementById("resetButton").addEventListener("click",function(){if(confirm("Restaurar os dados demo?")){state=seed();save();render();toast("Dados restaurados.")}});
  document.getElementById("modalClose").addEventListener("click",closeModal);document.getElementById("modalCancel").addEventListener("click",closeModal);document.getElementById("modalBackdrop").addEventListener("click",function(e){if(e.target.id==="modalBackdrop")closeModal()});
  document.getElementById("modalForm").addEventListener("submit",function(e){e.preventDefault();if(modalType==="study"){addSession(document.getElementById("mSubject").value,document.getElementById("mTopic").value,Number(document.getElementById("mMinutes").value));closeModal();return}if(modalType==="questions"){addQuestions(document.getElementById("mSubject").value,document.getElementById("mTopic").value,Number(document.getElementById("mTotal").value),Number(document.getElementById("mCorrect").value));closeModal();return}if(modalType==="topic"){let t=editTopicId?state.topics.find(function(x){return x.id===editTopicId}):null;if(!t){t={id:id(),subject:document.getElementById("mSubject").value,name:"",theory:0,questions:0,correct:0,status:"nao-iniciado",reviews:[]};state.topics.push(t)}t.name=document.getElementById("mTopic").value.trim();t.subject=t.subject||document.getElementById("mSubject").value;t.theory=Math.max(0,Math.min(100,Number(document.getElementById("mTheory").value)));t.questions=Math.max(0,Number(document.getElementById("mTotal").value));t.correct=Math.max(0,Math.min(t.questions,Number(document.getElementById("mCorrect").value)));t.status=document.getElementById("mStatus").value;save();render();closeModal();toast("Assunto salvo!");return}if(modalType==="review"){const t=state.topics.find(function(x){return x.id===document.getElementById("mTopicId").value});if(t){t.reviews=(t.reviews||[]).concat([document.getElementById("mDate").value]).sort();save();render();toast("Revisão agendada!")}closeModal();return}if(modalType==="cycle"){state.cycle.push({id:id(),subject:document.getElementById("mSubject").value,hours:Number(document.getElementById("mHours").value),priority:Number(document.getElementById("mPriority").value)});save();render();closeModal();toast("Matéria adicionada ao ciclo!");return}});
  document.getElementById("topicSearch").addEventListener("input",renderEdital);document.getElementById("subjectFilter").addEventListener("change",renderEdital);document.getElementById("statusFilter").addEventListener("change",renderEdital);
  document.getElementById("editalTableBody").addEventListener("change",function(e){const x=e.target.closest("[data-status]");if(x){const t=state.topics.find(function(a){return a.id===x.dataset.status});if(t){t.status=x.value;save();render()}}});
  document.getElementById("diaryForm").addEventListener("submit",function(e){e.preventDefault();const tx=document.getElementById("diaryText").value.trim();if(!tx)return;state.diary.push({id:id(),date:document.getElementById("diaryDate").value||today(),mood:document.getElementById("diaryMood").value,text:tx});save();document.getElementById("diaryText").value="";render();toast("Anotação salva!")});
  document.getElementById("mobileMenuButton").addEventListener("click",function(){document.getElementById("sidebar").classList.add("open");document.getElementById("mobileOverlay").classList.add("show")});
  document.getElementById("mobileOverlay").addEventListener("click",function(){document.getElementById("sidebar").classList.remove("open");document.getElementById("mobileOverlay").classList.remove("show")});
}
bind();document.getElementById("diaryDate").value=today();render();