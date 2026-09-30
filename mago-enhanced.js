/* Mago v5 — núcleo de estudos e rotina TDAH */
(() => {
  const STORAGE='mago-v5';
  const LEGACY='mago-v4';
  const officialTopics=[{"id":1,"subject":"Vigilância Sanitária","name":"Processo saúde-doença"},{"id":2,"subject":"Vigilância Sanitária","name":"Níveis de prevenção em saúde"},{"id":3,"subject":"Vigilância Sanitária","name":"Evolução da vigilância sanitária no Brasil"},{"id":4,"subject":"Vigilância Sanitária","name":"Vigilância sanitária: conceitos, áreas de abrangência e funções"},{"id":5,"subject":"Vigilância Sanitária","name":"Lei Federal nº 9.782/1999 – Define o Sistema Nacional de Vigilância Sanitária, cria a Agência Nacional de Vigilância Sanitária (Anvisa) e dá outras providências"},{"id":6,"subject":"Vigilância Sanitária","name":"Decreto Federal nº 3.029/1999 – Aprova o Regulamento da Agência Nacional de Vigilância Sanitária (Anvisa) e dá outras providências"},{"id":7,"subject":"Vigilância Sanitária","name":"Instrumentos de ação da vigilância sanitária"},{"id":8,"subject":"Vigilância Sanitária","name":"Lei Federal nº 6.360/1976 – Dispõe sobre a vigilância sanitária a que ficam sujeitos os medicamentos, drogas, insumos farmacêuticos, correlatos, cosméticos, saneantes e outros produtos"},{"id":9,"subject":"Vigilância Sanitária","name":"Decreto Federal nº 8.077/2013 – Regulamenta as condições para o funcionamento de empresas sujeitas ao licenciamento sanitário e o registro, controle e monitoramento dos produtos de que trata a Lei Federal nº 6.360/1976"},{"id":10,"subject":"Vigilância Sanitária","name":"Lei Federal nº 6.437/1977 – Configura infrações à legislação sanitária federal e estabelece as respectivas sanções"},{"id":11,"subject":"Vigilância Sanitária","name":"Lei Federal nº 5.991/1973 – Dispõe sobre o controle sanitário do comércio de drogas, medicamentos, insumos farmacêuticos e correlatos"},{"id":12,"subject":"Vigilância Sanitária","name":"Decreto Federal nº 74.170/1974 – Regulamenta a Lei Federal nº 5.991/1973"},{"id":13,"subject":"Arquiteto","name":"RDC nº 50/2002 – Regulamento Técnico para planejamento, programação, elaboração e avaliação de projetos físicos de estabelecimentos assistenciais de saúde"},{"id":14,"subject":"Arquiteto","name":"RDC nº 51/2011 – Requisitos mínimos para análise, avaliação e aprovação de projetos físicos de estabelecimentos de saúde no Sistema Nacional de Vigilância Sanitária"},{"id":15,"subject":"Arquiteto","name":"Lei nº 13.589/2018 – Manutenção de instalações e equipamentos de sistemas de climatização de ambientes"},{"id":16,"subject":"Arquiteto","name":"Lei Federal nº 10.098/2000 – Normas gerais e critérios básicos para a promoção da acessibilidade das pessoas com deficiência ou com mobilidade reduzida"},{"id":17,"subject":"Língua Portuguesa","name":"Leitura, compreensão e interpretação de textos de diferentes gêneros"},{"id":18,"subject":"Língua Portuguesa","name":"Tipologia e gêneros textuais"},{"id":19,"subject":"Língua Portuguesa","name":"Ortografia oficial"},{"id":20,"subject":"Língua Portuguesa","name":"Acentuação gráfica"},{"id":21,"subject":"Língua Portuguesa","name":"Emprego da pontuação"},{"id":22,"subject":"Língua Portuguesa","name":"Classes de palavras e suas flexões"},{"id":23,"subject":"Língua Portuguesa","name":"Estrutura e formação de palavras"},{"id":24,"subject":"Língua Portuguesa","name":"Concordância verbal e nominal"},{"id":25,"subject":"Língua Portuguesa","name":"Regência verbal e nominal"},{"id":26,"subject":"Língua Portuguesa","name":"Colocação pronominal"},{"id":27,"subject":"Língua Portuguesa","name":"Emprego do sinal indicativo de crase"},{"id":28,"subject":"Língua Portuguesa","name":"Sintaxe da oração e do período"},{"id":29,"subject":"Língua Portuguesa","name":"Coesão e coerência textual"},{"id":30,"subject":"Língua Portuguesa","name":"Significação das palavras"},{"id":31,"subject":"Língua Portuguesa","name":"Reescrita de frases e substituição de palavras ou trechos"},{"id":32,"subject":"Língua Portuguesa","name":"Correspondência entre tempos e modos verbais"},{"id":33,"subject":"Língua Portuguesa","name":"Redação oficial"},{"id":34,"subject":"Raciocínio Lógico e Matemático","name":"Conjuntos numéricos"},{"id":35,"subject":"Raciocínio Lógico e Matemático","name":"Razões e proporções"},{"id":36,"subject":"Raciocínio Lógico e Matemático","name":"Regra de três simples e composta"},{"id":37,"subject":"Raciocínio Lógico e Matemático","name":"Porcentagem"},{"id":38,"subject":"Raciocínio Lógico e Matemático","name":"Juros simples e compostos"},{"id":39,"subject":"Raciocínio Lógico e Matemático","name":"Equações, inequações e sistemas de equações"},{"id":40,"subject":"Raciocínio Lógico e Matemático","name":"Funções"},{"id":41,"subject":"Raciocínio Lógico e Matemático","name":"Sequências"},{"id":42,"subject":"Raciocínio Lógico e Matemático","name":"Matrizes e determinantes"},{"id":43,"subject":"Raciocínio Lógico e Matemático","name":"Probabilidade"},{"id":44,"subject":"Raciocínio Lógico e Matemático","name":"Análise combinatória"},{"id":45,"subject":"Raciocínio Lógico e Matemático","name":"Estatística descritiva"},{"id":46,"subject":"Raciocínio Lógico e Matemático","name":"Proposições lógicas"},{"id":47,"subject":"Raciocínio Lógico e Matemático","name":"Conectivos"},{"id":48,"subject":"Raciocínio Lógico e Matemático","name":"Tabelas-verdade"},{"id":49,"subject":"Raciocínio Lógico e Matemático","name":"Equivalências e negações"},{"id":50,"subject":"Raciocínio Lógico e Matemático","name":"Argumentação lógica"},{"id":51,"subject":"Raciocínio Lógico e Matemático","name":"Diagramas lógicos"},{"id":52,"subject":"Raciocínio Lógico e Matemático","name":"Resolução de problemas envolvendo raciocínio lógico-matemático"},{"id":53,"subject":"História e Geografia do Tocantins","name":"Processo histórico de criação do Estado do Tocantins"},{"id":54,"subject":"História e Geografia do Tocantins","name":"Organização política e administrativa"},{"id":55,"subject":"História e Geografia do Tocantins","name":"Formação territorial"},{"id":56,"subject":"História e Geografia do Tocantins","name":"Aspectos demográficos"},{"id":57,"subject":"História e Geografia do Tocantins","name":"Povos indígenas e comunidades quilombolas"},{"id":58,"subject":"História e Geografia do Tocantins","name":"Patrimônio histórico, cultural e ambiental"},{"id":59,"subject":"História e Geografia do Tocantins","name":"Clima"},{"id":60,"subject":"História e Geografia do Tocantins","name":"Vegetação"},{"id":61,"subject":"História e Geografia do Tocantins","name":"Relevo"},{"id":62,"subject":"História e Geografia do Tocantins","name":"Hidrografia"},{"id":63,"subject":"História e Geografia do Tocantins","name":"Recursos naturais"},{"id":64,"subject":"História e Geografia do Tocantins","name":"Unidades de Conservação"},{"id":65,"subject":"História e Geografia do Tocantins","name":"Economia do Estado"},{"id":66,"subject":"História e Geografia do Tocantins","name":"Desenvolvimento regional"},{"id":67,"subject":"História e Geografia do Tocantins","name":"Matriz produtiva"},{"id":68,"subject":"História e Geografia do Tocantins","name":"Matriz energética"},{"id":69,"subject":"Legislação","name":"Sistema Único de Saúde (SUS): princípios, diretrizes, organização, regionalização, financiamento e gestão"},{"id":70,"subject":"Legislação","name":"Participação e controle social no SUS"},{"id":71,"subject":"Legislação","name":"Conselhos de Saúde, Conferências de Saúde e Comissões Intergestores"},{"id":72,"subject":"Legislação","name":"Constituição da República Federativa do Brasil de 1988 – Capítulo II da Seguridade Social, Seção II – Da Saúde"},{"id":73,"subject":"Legislação","name":"Lei Federal nº 8.080, de 19 de setembro de 1990"},{"id":74,"subject":"Legislação","name":"Lei Federal nº 8.142, de 28 de dezembro de 1990"},{"id":75,"subject":"Legislação","name":"Decreto Federal nº 7.508, de 28 de junho de 2011"},{"id":76,"subject":"Legislação","name":"Política Nacional de Humanização (PNH)"},{"id":77,"subject":"Legislação","name":"Política Nacional de Saúde do Trabalhador e da Trabalhadora"}];
  const byId=new Map(officialTopics.map(t=>[t.id,t]));
  const q=(s)=>document.querySelector(s);
  const qa=(s)=>Array.from(document.querySelectorAll(s));
  const normalize=(s)=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const clone=(v)=>JSON.parse(JSON.stringify(v));
  const localToday=()=>{
    const d=new Date();
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  };
  const localShift=(date,n)=>{
    const d=new Date(date+'T12:00:00'); d.setDate(d.getDate()+Number(n));
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  };
  const timeToMin=(v)=>{const [h,m]=String(v||'08:00').split(':').map(Number);return h*60+m};
  const minToTime=(v)=>String(Math.floor(v/60)%24).padStart(2,'0')+':'+String(v%60).padStart(2,'0');
  const dateLabel=(d)=>{
    return new Date(d+'T12:00:00').toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'2-digit'}).replace('.','');
  };
  const topicKey=(s,n)=>normalize(s)+'|'+normalize(n);
  const reviewDates=(t)=>Array.isArray(t.reviews)?t.reviews.map(r=>typeof r==='string'?r:r?.date).filter(Boolean):[];

  function seedTopics(withDemo=false){
    return officialTopics.map((x)=>({
      id:'edital-'+x.id, editalId:x.id, subject:x.subject, name:x.name,
      theory:withDemo && [5,6,8,9].includes(x.id)?([5,6,8,9].indexOf(x.id)===3?100:([5,6,8,9].indexOf(x.id)+1)*20):0,
      questions:withDemo && x.id===5?18:0,
      correct:withDemo && x.id===5?14:0,
      status:withDemo && x.id===5?'andamento':'nao-iniciado',
      reviews:withDemo && x.id===5?[localShift(localToday(),-1),localToday()]:[],
      custom:false
    }));
  }

  function makeEnhancedSeed(){
    const subjects=[
      ['Vigilância Sanitária','#2563eb',5],
      ['Língua Portuguesa','#7c3aed',4],
      ['Raciocínio Lógico e Matemático','#0f766e',4],
      ['História e Geografia do Tocantins','#d97706',3],
      ['Legislação','#dc2626',3],
      ['Arquiteto','#64748b',2]
    ].map(([name,color,priority])=>({id:'sub-'+normalize(name).replace(/\W+/g,'-'),name,color,priority}));
    const t=seedTopics(true);
    return {
      settings:{
        dailyMinutes:120,weekMinutes:960,examName:'Inspetor em Vigilância Sanitária — Arquiteto',theme:'dark',
        blockMinutes:50,breakMinutes:10,studyDays:[1,2,3,4,5,6],
        availableStart:'18:00',availableEnd:'22:00',tdahMode:true,autoSchedule:true
      },
      subjects,t,
      questions:t[4]?[{id:uid(),subject:t[4].subject,topic:t[4].name,total:18,correct:14,date:localShift(localToday(),-1)}]:[],
      sessions:[
        {id:uid(),subject:'Vigilância Sanitária',topic:t[4]?.name||'',minutes:62,date:localToday(),createdAt:Date.now()-3600000}
      ],
      cycle:[
        {id:uid(),subject:'Vigilância Sanitária',hours:4,priority:5},
        {id:uid(),subject:'Língua Portuguesa',hours:3,priority:4},
        {id:uid(),subject:'Raciocínio Lógico e Matemático',hours:3,priority:4},
        {id:uid(),subject:'História e Geografia do Tocantins',hours:2,priority:3},
        {id:uid(),subject:'Legislação',hours:2,priority:3},
        {id:uid(),subject:'Arquiteto',hours:1.5,priority:2}
      ],
      schedule:[],
      reviewHistory:[],
      diary:[],
      customTopics:[]
    };
  }

  function mapLegacyTopic(old){
    const n=normalize(old?.name);
    const subject=old?.subject||'';
    const rules=[
      [/9\.782\/1999|snvs.*anvisa/,5],
      [/3\.029\/1999/,6],
      [/6\.360\/1976/,8],
      [/8\.077\/2013/,9],
      [/interpretacao.*texto/,17],
      [/acentuacao/,20],
      [/proposicoes.*conectivos/,47],
      [/formacao.*historica/,53],
      [/principios.*administracao/,69]
    ];
    const hit=rules.find(([re])=>re.test(n));
    if(hit) return byId.get(hit[1]);
    return officialTopics.find(x=>normalize(x.subject)===normalize(subject)&&normalize(x.name)===n)||null;
  }

  function migrateState(){
    if(!state || typeof state!=='object') state=makeEnhancedSeed();
    state.settings=Object.assign(makeEnhancedSeed().settings,state.settings||{});
    state.subjects=Array.isArray(state.subjects)&&state.subjects.length?state.subjects.map((s,i)=>({
      id:s.id||'sub-'+i,name:s.name,color:s.color||['#2563eb','#7c3aed','#0f766e','#d97706','#dc2626','#64748b'][i%6],priority:Number(s.priority||3)
    })):makeEnhancedSeed().subjects;
    state.questions=Array.isArray(state.questions)?state.questions:[];
    state.sessions=Array.isArray(state.sessions)?state.sessions:[];
    state.cycle=Array.isArray(state.cycle)?state.cycle:[];
    state.diary=Array.isArray(state.diary)?state.diary:[];
    state.schedule=Array.isArray(state.schedule)?state.schedule:[];
    state.reviewHistory=Array.isArray(state.reviewHistory)?state.reviewHistory:[];
    state.customTopics=Array.isArray(state.customTopics)?state.customTopics:[];
    const oldTopics=Array.isArray(state.topics)?state.topics:[];
    const oldByOfficial=new Map();
    oldTopics.forEach(old=>{
      const hit=old?.editalId&&byId.get(Number(old.editalId)) || mapLegacyTopic(old);
      if(hit) oldByOfficial.set(hit.id,old);
      else if(old?.name) state.customTopics.push(Object.assign({custom:true},clone(old)));
    });
    state.topics=seedTopics(false).map(base=>{
      const old=oldByOfficial.get(base.editalId);
      if(!old) return base;
      return Object.assign(base,{
        theory:Math.max(0,Math.min(100,Number(old.theory??old.estudado??0))),
        questions:Math.max(0,Number(old.questions||0)),
        correct:Math.max(0,Math.min(Number(old.questions||0),Number(old.correct||0))),
        status:old.status||base.status,
        reviews:reviewDates(old)
      });
    });
    // garante que toda matéria oficial exista
    for(const t of state.topics){
      if(!state.subjects.some(s=>normalize(s.name)===normalize(t.subject))){
        state.subjects.push({id:'sub-'+normalize(t.subject).replace(/\W+/g,'-'),name:t.subject,color:'#8064d8',priority:3});
      }
    }
    // normalização das sessões
    state.sessions=state.sessions.map(s=>({
      id:s.id||uid(),subject:s.subject||'',topic:s.topic||'',minutes:Math.max(1,Number(s.minutes||0)),
      date:/^\d{4}-\d{2}-\d{2}$/.test(s.date||'')?s.date:localToday(),createdAt:Number(s.createdAt||Date.now())
    })).filter(s=>s.subject&&s.minutes>0);
    save();
  }

  // Corrige datas para o fuso local e centraliza o armazenamento.
  today=localToday;
  shift=localShift;
  makeSeed=makeEnhancedSeed;
  save=function(){try{const data=JSON.stringify(state);localStorage.setItem(STORAGE,data);localStorage.setItem(LEGACY,data)}catch(e){console.error(e);toast('Não foi possível salvar os dados.')}}; 
  migrateState();

  function safeGoal(){return Math.max(15,Number(state.settings.dailyMinutes||120));}
  function weekGoal(){return Math.max(60,Number(state.settings.weekMinutes||960));}
  function getTodaySessions(date=localToday()){return state.sessions.filter(s=>s.date===date);}
  function dayMinutes(date=localToday()){return getTodaySessions(date).reduce((a,s)=>a+Number(s.minutes||0),0);}
  function weekSessions(start=localToday()){return state.sessions.filter(s=>s.date>=localShift(start,-6)&&s.date<=start);}
  function weekStudied(start=localToday()){return weekSessions(start).reduce((a,s)=>a+Number(s.minutes||0),0);}
  function getTopic(id){return state.topics.find(t=>t.id===id||String(t.editalId)===String(id));}
  function topicForSession(subject,topicName){
    const n=normalize(topicName);
    return state.topics.find(t=>normalize(t.subject)===normalize(subject)&&normalize(t.name)===n)
      || state.topics.find(t=>normalize(t.subject)===normalize(subject)&&n&&normalize(t.name).includes(n))
      || null;
  }
  function accuracy2(total,correct){return total?Math.round(Number(correct||0)/Number(total||1)*100):0;}
  function scheduleSort(a,b){return (a.date+a.time).localeCompare(b.date+b.time);}
  function nextPlanned(){return state.schedule.filter(s=>s.status==='planned'&&s.date>=localToday()).sort(scheduleSort)[0]||null;}

  function pickTopicForSubject(subject){
    const list=state.topics.filter(t=>normalize(t.subject)===normalize(subject));
    if(!list.length) return '';
    const due=list.filter(t=>reviewDates(t).some(d=>d<=localToday()));
    const pool=due.length?due:list.filter(t=>t.status!=='concluido');
    const chosen=(pool.length?pool:list).slice().sort((a,b)=>{
      const ar=reviewDates(a).some(d=>d<=localToday())?0:1, br=reviewDates(b).some(d=>d<=localToday())?0:1;
      return ar-br||Number(a.theory||0)-Number(b.theory||0);
    })[0];
    return chosen?.name||'';
  }

  function generateSchedule(days=7){
    const start=localToday(), studyDays=new Set((state.settings.studyDays||[1,2,3,4,5,6]).map(Number));
    const dates=[];
    for(let i=0;i<days;i++){
      const d=localShift(start,i);
      const dow=new Date(d+'T12:00:00').getDay();
      if(studyDays.has(dow)) dates.push(d);
    }
    if(!dates.length){toast('Escolha ao menos um dia de estudo.');return;}
    const cycle=state.cycle.filter(c=>Number(c.hours)>0).slice();
    if(!cycle.length){toast('Monte o ciclo antes de gerar o cronograma.');navigate('cycle');return;}
    const totalMinutes=weekGoal();
    const cycleTotal=cycle.reduce((a,c)=>a+Number(c.hours||0)*60,0)||totalMinutes;
    let remaining=cycle.map(c=>({c,minutes:Math.round((Number(c.hours||0)*60/cycleTotal)*totalMinutes)}));
    let allocated=remaining.reduce((a,x)=>a+x.minutes,0);
    remaining[0].minutes+=totalMinutes-allocated;
    const block=Math.max(15,Number(state.settings.blockMinutes||50));
    const brk=Math.max(0,Number(state.settings.breakMinutes||10));
    const startMin=timeToMin(state.settings.availableStart||'18:00');
    const endMin=timeToMin(state.settings.availableEnd||'22:00');
    const available=(endMin>startMin?endMin-startMin:240);
    const dailyTarget=Math.max(block,Math.ceil(totalMinutes/dates.length/block)*block);
    state.schedule=state.schedule.filter(s=>!(s.status!=='done'&&s.date>=start&&s.date<=localShift(start,days-1)));
    let cursor=0;
    dates.forEach(date=>{
      let used=0, slot=startMin;
      let guard=0;
      while(slot+block<=endMin && used+block<=dailyTarget && guard<200 && remaining.some(x=>x.minutes>0)){
        guard++;
        let choices=remaining.filter(x=>x.minutes>0).sort((a,b)=>b.minutes-a.minutes||Number(b.c.priority||3)-Number(a.c.priority||3));
        if(!choices.length) break;
        const chosen=choices[cursor%choices.length]; cursor++;
        const mins=Math.min(block,chosen.minutes);
        const topic=pickTopicForSubject(chosen.c.subject);
        state.schedule.push({id:uid(),date,time:minToTime(slot),subject:chosen.c.subject,topic,minutes:mins,status:'planned',createdAt:Date.now()});
        chosen.minutes-=mins; used+=mins; slot+=mins+brk;
      }
    });
    save();render();toast('Cronograma gerado para os próximos '+dates.length+' dias.');
  }

  function markSchedule(id,status){
    const s=state.schedule.find(x=>x.id===id); if(!s)return;
    if(status==='done' && s.status!=='done'){
      s.status='done';
      if(!state.sessions.some(x=>x.scheduleId===s.id)){
        state.sessions.push({id:uid(),scheduleId:s.id,subject:s.subject,topic:s.topic||'Estudo livre',minutes:Number(s.minutes||50),date:s.date,createdAt:Date.now()});
      }
    } else if(status) s.status=status;
    save();render();toast(status==='done'?'Bloco concluído e registrado.':'Bloco atualizado.');
  }

  function addSessionEnhanced(subject,topic,minutes,date){
    const mins=Number(minutes||0); if(!subject||mins<=0){toast('Informe matéria e um tempo válido.');return;}
    const day=/^\d{4}-\d{2}-\d{2}$/.test(date||'')?date:localToday();
    state.sessions.push({id:uid(),subject,topic:topic||'Estudo livre',minutes:Math.round(mins),date:day,createdAt:Date.now()});
    save();render();toast('Estudo salvo no seu grimório.');
  }
  addSession=addSessionEnhanced;

  function editSession(id,session){
    openModal('editSession',session);
  }
  function removeSession(id){
    const s=state.sessions.find(x=>x.id===id); if(!s)return;
    if(!confirm('Excluir este registro de estudo?'))return;
    state.sessions=state.sessions.filter(x=>x.id!==id); 
    if(s.scheduleId){const sch=state.schedule.find(x=>x.id===s.scheduleId);if(sch)sch.status='planned';}
    save();render();toast('Registro excluído.');
  }

  function addQuestionsEnhanced(subject,topic,total,correct,date){
    const n=Number(total||0),c=Number(correct||0); if(!subject||n<=0||c<0||c>n){toast('Confira o número de questões e acertos.');return;}
    const day=/^\d{4}-\d{2}-\d{2}$/.test(date||'')?date:localToday();
    state.questions.push({id:uid(),subject,topic:topic||'Geral',total:n,correct:c,date:day});
    const target=topicForSession(subject,topic);
    if(target){
      target.questions=Number(target.questions||0)+n;
      target.correct=Number(target.correct||0)+c;
      if(target.status==='nao-iniciado')target.status='andamento';
      const a=accuracy2(n,c);
      const next=a<60?1:a<80?3:a<90?7:30;
      const ds=reviewDates(target);
      if(!ds.length) target.reviews=[localShift(day,next)];
      else target.reviews=ds;
    }
    save();render();toast('Questões registradas e diagnóstico atualizado.');
  }
  addQuestions=addQuestionsEnhanced;

  function completeReviewEnhanced(idTopic,index,rating='remembered'){
    const t=getTopic(idTopic); if(!t)return;
    const dates=reviewDates(t); if(!dates[index])return;
    const scheduled=dates[index], completedOn=localToday();
    const map={forgot:1,hard:3,remembered:7,mastered:30};
    const days=map[rating]||7;
    const next=localShift(completedOn,days);
    state.reviewHistory.push({id:uid(),topicId:t.id,topic:t.name,subject:t.subject,scheduledDate:scheduled,completedDate:completedOn,rating,nextDate:next});
    dates[index]=next; t.reviews=dates; t.status='revisar';
    save();render();toast('Revisão salva. Próxima em '+days+' dia(s).');
  }
  completeReview=completeReviewEnhanced;

  function autoCycleEnhanced(){
    const totalH=weekGoal()/60;
    const subs=state.subjects.slice();
    const weight=subs.reduce((a,s)=>a+Math.max(1,Number(s.priority||3)),0)||1;
    let used=0;
    state.cycle=subs.sort((a,b)=>b.priority-a.priority).map((s,i)=>{
      let h=Math.round((totalH*Math.max(1,Number(s.priority||3))/weight)*2)/2;
      if(i===subs.length-1) h=Math.max(.5,Math.round((totalH-used)*2)/2);
      used+=h;
      return {id:state.cycle.find(c=>normalize(c.subject)===normalize(s.name))?.id||uid(),subject:s.name,hours:h,priority:Number(s.priority||3)};
    });
    generateSchedule(7);toast('Ciclo redistribuído pela prioridade.');
  }
  autoCycle=autoCycleEnhanced;

  function openEnhancedModal(type,payload){
    modalType=type; editingTopicId=payload?.id||'';
    const back=q('#modalBackdrop'), fields=q('#modalFields'), title=q('#modalTitle');
    if(!back||!fields)return;
    back.hidden=false;
    const opts=state.subjects.map(s=>'<option value="'+esc(s.name)+'">'+esc(s.name)+'</option>').join('');
    const topicOpts=state.topics.map(t=>'<option value="'+esc(t.name)+'">'+esc(t.subject)+' — '+esc(t.name)+'</option>').join('');
    const grid=(items)=>'<div class="form-grid">'+items.map(x=>'<div class="field"><label>'+x.label+'</label>'+x.field+'</div>').join('')+'</div>';
    if(type==='study'){
      title.textContent='Registrar estudo';
      fields.innerHTML=grid([
        {label:'Matéria',field:'<select id="mSubject">'+opts+'</select>'},
        {label:'Assunto',field:'<input id="mTopic" placeholder="Assunto estudado">'},
        {label:'Data',field:'<input id="mDate" type="date" value="'+localToday()+'">'},
        {label:'Minutos',field:'<input id="mMinutes" type="number" min="1" step="1" value="'+(state.settings.blockMinutes||50)+'">'}
      ])+'<div class="focus-hint">💜 Para não travar: registre mesmo sessões curtas. O objetivo é medir consistência, não perfeição.</div>';
      q('#mSubject').value=payload?.subject||state.subjects[0]?.name||'';
      return;
    }
    if(type==='editSession'){
      title.textContent='Corrigir registro';
      fields.innerHTML=grid([
        {label:'Matéria',field:'<select id="mEditSubject">'+opts+'</select>'},
        {label:'Assunto',field:'<input id="mEditTopic" value="'+esc(payload?.topic||'')+'">'},
        {label:'Data',field:'<input id="mEditDate" type="date" value="'+(payload?.date||localToday())+'">'},
        {label:'Minutos',field:'<input id="mEditMinutes" type="number" min="1" value="'+Number(payload?.minutes||50)+'">'}
      ]);
      q('#mEditSubject').value=payload?.subject||state.subjects[0]?.name||'';
      return;
    }
    if(type==='schedule'){
      title.textContent='Montar meu cronograma';
      const days=state.settings.studyDays||[1,2,3,4,5,6];
      fields.innerHTML=grid([
        {label:'Bloco padrão (minutos)',field:'<input id="mBlock" type="number" min="15" max="180" step="5" value="'+Number(state.settings.blockMinutes||50)+'">'},
        {label:'Pausa entre blocos',field:'<input id="mBreak" type="number" min="0" max="60" step="5" value="'+Number(state.settings.breakMinutes||10)+'">'},
        {label:'Começo',field:'<input id="mStart" type="time" value="'+(state.settings.availableStart||'18:00')+'">'},
        {label:'Fim',field:'<input id="mEnd" type="time" value="'+(state.settings.availableEnd||'22:00')+'">'}
      ])+
      '<div class="field day-picker"><label>Dias de estudo</label><div class="day-grid">'+
      [0,1,2,3,4,5,6].map(d=>'<label><input type="checkbox" class="study-day" value="'+d+'" '+(days.includes(d)?'checked':'')+'><span>'+['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][d]+'</span></label>').join('')+
      '</div></div><div class="focus-hint">O Mago distribui sua meta semanal entre os dias escolhidos e prioriza revisões vencidas.</div>';
      return;
    }
    if(type==='subject'){
      title.textContent=payload?'Editar matéria':'Nova matéria';
      fields.innerHTML=grid([
        {label:'Nome',field:'<input id="mSubjectName" required value="'+esc(payload?.name||'')+'">'},
        {label:'Prioridade (1 a 5)',field:'<input id="mSubjectPriority" type="number" min="1" max="5" value="'+Number(payload?.priority||3)+'">'},
        {label:'Cor',field:'<input id="mSubjectColor" type="color" value="'+(payload?.color||'#8064d8')+'">'}
      ]);
      return;
    }
    if(type==='settings'){
      title.textContent='Configurações do grimório';
      fields.innerHTML=grid([
        {label:'Nome da prova / concurso',field:'<input id="mExam" value="'+esc(state.settings.examName||'')+'">'},
        {label:'Meta diária',field:'<input id="mDaily" type="number" min="15" max="720" value="'+Number(state.settings.dailyMinutes||120)+'">'},
        {label:'Meta semanal (minutos)',field:'<input id="mWeekly" type="number" min="60" max="5000" value="'+Number(state.settings.weekMinutes||960)+'">'}
      ])+
      '<div class="settings-tdah"><strong>Modo TDAH</strong><label><input id="mTdah" type="checkbox" '+(state.settings.tdahMode?'checked':'')+'> decisões mínimas: mostrar um próximo passo por vez</label><p>Blocos curtos, pausas e cronograma visível ficam ativados.</p></div>'+
      '<div class="focus-hint">Seus dados ficam salvos neste navegador. Use Exportar/Restaurar para ter uma cópia de segurança.</div>';
      return;
    }
    if(type==='review') {
      title.textContent='Agendar revisão';
      fields.innerHTML=grid([{label:'Assunto',field:'<select id="mTopicId">'+topicOpts+'</select>'},{label:'Data',field:'<input id="mDate" type="date" value="'+localToday()+'">'}]);
      return;
    }
    if(type==='cycle'){
      title.textContent='Adicionar matéria ao ciclo';
      fields.innerHTML=grid([{label:'Matéria',field:'<select id="mSubject">'+opts+'</select>'},{label:'Horas por semana',field:'<input id="mHours" type="number" min=".5" step=".5" value="2">'},{label:'Prioridade neste ciclo',field:'<input id="mPriority" type="number" min="1" max="5" value="3">'}]);
      return;
    }
    // para os tipos legados, reproduzimos o modal original
    return legacyOpenModal(type,payload);
  }
  const legacyOpenModal=openModal;
  openModal=openEnhancedModal;

  // Alguns campos do modal de configurações são persistidos mesmo com o submit legado.
  document.addEventListener('change',e=>{
    if(e.target.id==='mTdah'){state.settings.tdahMode=e.target.checked;save();render();}
  });

  const legacyRenderToday=renderToday;
  const legacyRenderCycle=renderCycle;
  const legacyRenderReviews=renderReviews;
  const legacyRenderDashboard=renderDashboard;

  function renderScheduleBoard(){
    const root=q('#scheduleBoard'); if(!root)return;
    const start=localToday(), end=localShift(start,6);
    const rows=state.schedule.filter(s=>s.date>=start&&s.date<=end).sort(scheduleSort);
    const by={}; rows.forEach(s=>(by[s.date]??=[]).push(s));
    const dates=[];
    for(let i=0;i<7;i++){const d=localShift(start,i); if((state.settings.studyDays||[1,2,3,4,5,6]).includes(new Date(d+'T12:00:00').getDay())) dates.push(d);}
    root.innerHTML=dates.map(d=>{
      const day=by[d]||[];
      const total=day.reduce((a,s)=>a+Number(s.minutes||0),0);
      return '<div class="schedule-day"><div class="schedule-day-head"><div><strong>'+dateLabel(d)+'</strong><span>'+day.length+' bloco(s)</span></div><b>'+fmtMin(total)+'</b></div>'+
      (day.length?day.map(s=>'<div class="schedule-item '+s.status+'"><span class="schedule-time">'+esc(s.time)+'</span><div class="schedule-main"><strong>'+esc(s.subject)+'</strong><small>'+esc(s.topic||'Estudo livre')+' · '+s.minutes+' min</small></div><span class="schedule-state">'+(s.status==='done'?'Concluído':s.status==='skipped'?'Pulou':'Pendente')+'</span><div class="schedule-actions">'+(s.status!=='done'?'<button data-schedule-done="'+s.id+'">Concluir</button><button data-schedule-skip="'+s.id+'">Pular</button>':'')+'</div></div>').join(''):'<div class="schedule-empty">Nenhum bloco neste dia.</div>')+'</div>';
    }).join('') || '<div class="schedule-empty">Escolha os dias e gere seu cronograma.</div>';
  }

  function renderTodayEnhanced(){
    legacyRenderToday();
    renderScheduleBoard();
    const box=q('#todaySessions'); if(!box)return;
    const sessions=getTodaySessions().slice().sort((a,b)=>b.createdAt-a.createdAt);
    box.innerHTML=sessions.length?sessions.map(s=>'<div class="session-row enhanced-session"><div class="time-chip">'+esc(s.date===localToday()?'HOJE':s.date)+'</div><div class="row-main"><strong>'+esc(s.subject)+'</strong><small>'+esc(s.topic||'Estudo livre')+'</small></div><strong>'+fmtMin(s.minutes)+'</strong><div class="session-actions"><button data-edit-session="'+s.id+'">Editar</button><button data-del-session="'+s.id+'">Excluir</button></div></div>').join(''):'<div class="section-empty">Nenhum estudo registrado hoje.</div>';
    const next=q('#nextStudy');
    const n=nextPlanned();
    if(next&&n){
      next.innerHTML='<div class="next-spell"><span class="next-spell-rune">✦</span><div><span>PRÓXIMO FEITIÇO</span><strong>'+esc(n.subject)+'</strong><small>'+esc(n.topic||'Estudo livre')+' · '+n.minutes+' min · '+n.time+'</small></div><button class="primary-btn" data-schedule-done="'+n.id+'">Começar</button></div>';
    }
  }
  renderToday=renderTodayEnhanced;

  function renderDashboardEnhanced(){
    legacyRenderDashboard();
    const n=nextPlanned(); const box=q('#nextStudy');
    if(box&&n)box.innerHTML='<div class="next-spell"><span class="next-spell-rune">✦</span><div><span>PRÓXIMO FEITIÇO</span><strong>'+esc(n.subject)+'</strong><small>'+esc(n.topic||'Estudo livre')+' · '+n.minutes+' min · '+n.time+'</small></div><button class="primary-btn" data-schedule-done="'+n.id+'">Começar</button></div>';
    const week=q('#weekTotal');if(week)week.textContent=fmtHours(weekStudied()/60)+' / '+fmtHours(weekGoal()/60);
  }
  renderDashboard=renderDashboardEnhanced;

  function renderCycleEnhanced(){
    legacyRenderCycle();
    const box=q('#subjectManager');if(!box)return;
    box.innerHTML=state.subjects.map(s=>{
      const inCycle=state.cycle.some(c=>normalize(c.subject)===normalize(s.name));
      return '<div class="subject-manage-row"><span class="subject-color" style="background:'+s.color+'"></span><div><strong>'+esc(s.name)+'</strong><small>Prioridade '+s.priority+'/5 · '+(inCycle?'no ciclo':'fora do ciclo')+'</small></div><button data-edit-subject="'+s.id+'">Editar</button><button data-del-subject="'+s.id+'">Excluir</button></div>';
    }).join('');
    const heads=document.querySelector('#cyclePage .page-header .button-row');
    if(heads&&!heads.querySelector('[data-action="subject"]'))heads.insertAdjacentHTML('afterbegin','<button class="outline-btn" data-action="subject">＋ Nova matéria</button>');
  }
  renderCycle=renderCycleEnhanced;

  function renderReviewsEnhanced(){
    let rows=state.topics.flatMap(t=>reviewDates(t).map((date,index)=>({topic:t,date,index}))).sort((a,b)=>a.date.localeCompare(b.date));
    rows=rows.filter(r=>reviewFilter==='all'||(reviewFilter==='today'&&r.date===localToday())||(reviewFilter==='overdue'&&r.date<localToday())||(reviewFilter==='future'&&r.date>localToday()));
    const root=q('#reviewGrid');if(!root)return;
    root.innerHTML=rows.length?rows.map(r=>{
      const overdue=r.date<localToday(),todayR=r.date===localToday();
      return '<article class="review-card '+(overdue?'overdue':todayR?'today':'')+'"><div class="review-card-top"><strong>'+esc(r.topic.name)+'</strong><span>'+ (overdue?'Atrasada':todayR?'Hoje':dateLabel(r.date)) +'</span></div><p>'+esc(r.topic.subject)+' · revisão '+(r.index+1)+' · Antes de abrir o material, tente lembrar em voz alta os pontos principais.</p><div class="review-bottom"><small>'+dateLabel(r.date)+'</small>'+
      (r.date<=localToday()?'<div class="review-ratings"><button data-review-rate="forgot" data-review-topic="'+r.topic.id+'" data-review-index="'+r.index+'">Esqueci</button><button data-review-rate="hard" data-review-topic="'+r.topic.id+'" data-review-index="'+r.index+'">Difícil</button><button data-review-rate="remembered" data-review-topic="'+r.topic.id+'" data-review-index="'+r.index+'">Lembrei</button><button data-review-rate="mastered" data-review-topic="'+r.topic.id+'" data-review-index="'+r.index+'">Dominei</button></div>':'')+'</div></article>';
    }).join(''):'<div class="card"><div class="section-empty"><strong>Nenhuma revisão aqui.</strong>Use a fila para recuperar o conteúdo no tempo certo.</div></div>';
  }
  renderReviews=renderReviewsEnhanced;

  // Evento para o cronograma, sessões e matérias.
  document.addEventListener('click',e=>{
    const start=e.target.closest('[data-start-schedule]');
    if(start){
      const s=state.schedule.find(x=>x.id===start.dataset.startSchedule);
      if(s){
        navigate('today');
        const fs=q('#focusSubject'), ft=q('#focusTopic');
        if(fs){fs.value=s.subject;}
        if(ft){ft.value=s.topic||'';}
        resetFocus(Number(s.minutes||state.settings.blockMinutes||50));
        startFocus();
        toast('Bloco iniciado. Foco no que importa agora.');
      }
      return;
    }
    const restore=e.target.closest('[data-action="restore"]');
    if(restore){q('#restoreInput')?.click();return;}
    const done=e.target.closest('[data-schedule-done]');
    if(done){e.preventDefault();markSchedule(done.dataset.scheduleDone,'done');return;}
    const skip=e.target.closest('[data-schedule-skip]');
    if(skip){markSchedule(skip.dataset.scheduleSkip,'skipped');return;}
    const es=e.target.closest('[data-edit-session]');
    if(es){const s=state.sessions.find(x=>x.id===es.dataset.editSession);if(s)openModal('editSession',s);return;}
    const ds=e.target.closest('[data-del-session]');
    if(ds){removeSession(ds.dataset.delSession);return;}
    const rr=e.target.closest('[data-review-rate]');
    if(rr){completeReviewEnhanced(rr.dataset.reviewTopic,rr.dataset.reviewIndex,rr.dataset.reviewRate);return;}
    const esu=e.target.closest('[data-edit-subject]');
    if(esu){const s=state.subjects.find(x=>x.id===esu.dataset.editSubject);if(s)openModal('subject',s);return;}
    const dsu=e.target.closest('[data-del-subject]');
    if(dsu){
      const s=state.subjects.find(x=>x.id===dsu.dataset.delSubject);if(!s)return;
      const used=state.sessions.some(x=>normalize(x.subject)===normalize(s.name))||state.questions.some(x=>normalize(x.subject)===normalize(s.name))||state.topics.some(x=>normalize(x.subject)===normalize(s.name));
      if(used){toast('Esta matéria já tem registros. Edite o nome ou mantenha-a para preservar seu histórico.');return;}
      if(confirm('Excluir esta matéria?')){state.subjects=state.subjects.filter(x=>x.id!==s.id);state.cycle=state.cycle.filter(c=>normalize(c.subject)!==normalize(s.name));save();render();}
    }
    const sched=e.target.closest('[data-action="schedule"]');
    if(sched){openModal('schedule');return;}
    const subj=e.target.closest('[data-action="subject"]');
    if(subj){openModal('subject');return;}
  });

  q('#modalForm')?.addEventListener('submit',e=>{
    if(modalType==='editSession'){
      e.preventDefault();
      const s=state.sessions.find(x=>x.id===editingTopicId);
      if(s){s.subject=q('#mEditSubject').value;s.topic=q('#mEditTopic').value.trim();s.date=q('#mEditDate').value||localToday();s.minutes=Math.max(1,Number(q('#mEditMinutes').value||0));save();closeModal();render();toast('Registro corrigido.');}
      return;
    }
    if(modalType==='schedule'){
      e.preventDefault();
      state.settings.blockMinutes=Math.max(15,Number(q('#mBlock').value||50));
      state.settings.breakMinutes=Math.max(0,Number(q('#mBreak').value||10));
      state.settings.availableStart=q('#mStart').value||'18:00';
      state.settings.availableEnd=q('#mEnd').value||'22:00';
      state.settings.studyDays=qa('.study-day:checked').map(x=>Number(x.value));
      save();generateSchedule(7);closeModal();return;
    }
    if(modalType==='subject'){
      e.preventDefault();
      const name=q('#mSubjectName').value.trim();if(!name){toast('Dê um nome para a matéria.');return;}
      const priority=Math.max(1,Math.min(5,Number(q('#mSubjectPriority').value||3))),color=q('#mSubjectColor').value||'#8064d8';
      const existing=editingTopicId?state.subjects.find(s=>s.id===editingTopicId):null;
      if(existing){
        const old=existing.name;existing.name=name;existing.priority=priority;existing.color=color;
        state.topics.forEach(t=>{if(normalize(t.subject)===normalize(old))t.subject=name;});
        state.sessions.forEach(s=>{if(normalize(s.subject)===normalize(old))s.subject=name;});
        state.questions.forEach(s=>{if(normalize(s.subject)===normalize(old))s.subject=name;});
        state.cycle.forEach(c=>{if(normalize(c.subject)===normalize(old))c.subject=name;c.priority=normalize(c.subject)===normalize(name)?priority:c.priority;});
      } else {
        if(state.subjects.some(s=>normalize(s.name)===normalize(name))){toast('Essa matéria já existe.');return;}
        state.subjects.push({id:uid(),name,priority,color});
        state.cycle.push({id:uid(),subject:name,hours:.5,priority});
      }
      save();render();closeModal();toast('Matéria salva.');
      return;
    }
  },true);

  // O submit legado continua responsável por estudo/questões/tópicos/revisões/ciclo/settings.
  // Acrescenta data ao estudo e recursos TDAH às configurações.
  const modalForm=q('#modalForm');
  modalForm?.addEventListener('submit',()=>{
    if(modalType==='settings'){
      const tdah=q('#mTdah');state.settings.tdahMode=!!tdah?.checked;
      state.settings.blockMinutes=state.settings.blockMinutes||50;
      state.settings.breakMinutes=state.settings.breakMinutes||10;
      state.settings.studyDays=state.settings.studyDays||[1,2,3,4,5,6];
      state.settings.availableStart=state.settings.availableStart||'18:00';
      state.settings.availableEnd=state.settings.availableEnd||'22:00';
      save();
    }
  });

  q('#restoreInput')?.addEventListener('change',e=>{
    const file=e.target.files?.[0]; if(!file)return;
    const reader=new FileReader();
    reader.onload=()=>{
      try{
        const imported=JSON.parse(String(reader.result||''));
        if(!imported || typeof imported!=='object' || !Array.isArray(imported.sessions) || !Array.isArray(imported.topics)){
          throw new Error('backup inválido');
        }
        state=Object.assign(makeEnhancedSeed(),imported);
        migrateState();
        if(!Array.isArray(state.schedule))state.schedule=[];
        if(!Array.isArray(state.reviewHistory))state.reviewHistory=[];
        save(); render();
        toast('Backup restaurado com sucesso.');
      }catch(err){console.error(err);toast('Não foi possível restaurar esse backup.');}
      e.target.value='';
    };
    reader.readAsText(file);
  });

  // Novo botão de cronograma no cabeçalho da página Hoje, caso ainda não exista.
  const todayHead=document.querySelector('#todayPage .page-header .button-row')||document.querySelector('#todayPage .page-header > div:last-child');
  if(todayHead && !todayHead.querySelector('[data-action="schedule"]')){
    todayHead.insertAdjacentHTML('beforeend','<button class="outline-btn" data-action="schedule">✦ Cronograma</button>');
  }
  if(!state.schedule.length) generateSchedule(7);
  if(state.settings.autoSchedule && !state.schedule.some(s=>s.date>=localToday()&&s.status==='planned')) generateSchedule(7);
  render();
})();