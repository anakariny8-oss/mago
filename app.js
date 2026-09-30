const STORAGE_KEY = "mago-study-v1";

const seed = {
  subjects: [
    { id: "mat", name: "Matemática", detail: "Exatas", progress: 62 },
    { id: "por", name: "Português", detail: "Linguagens", progress: 48 },
    { id: "hist", name: "História", detail: "Humanas", progress: 34 },
    { id: "bio", name: "Biologia", detail: "Natureza", progress: 27 }
  ],
  goals: [
    { id: crypto.randomUUID(), title: "Resolver 20 questões de Matemática", subject: "Matemática", done: false, date: todayKey() },
    { id: crypto.randomUUID(), title: "Revisar sistema circulatório", subject: "Biologia", done: false, date: todayKey() }
  ],
  sessions: [
    { id: crypto.randomUUID(), subject: "Matemática", minutes: 52, date: todayKey(), createdAt: Date.now() - 86400000 },
    { id: crypto.randomUUID(), subject: "Português", minutes: 35, date: dateOffset(-1), createdAt: Date.now() - 172800000 },
    { id: crypto.randomUUID(), subject: "História", minutes: 48, date: dateOffset(-2), createdAt: Date.now() - 259200000 },
    { id: crypto.randomUUID(), subject: "Matemática", minutes: 70, date: dateOffset(-3), createdAt: Date.now() - 345600000 }
  ],
  theme: "light"
};

let state = loadState();
let currentView = "dashboard";
let modalType = null;
let timerSeconds = 25 * 60;
let timerDurationSeconds = 25 * 60;
let timerRunning = false;
let timerInterval = null;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
function dateOffset(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved || structuredClone(seed);
  } catch {
    return structuredClone(seed);
  }
}
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function formatDate(key) {
  const d = new Date(`${key}T12:00:00`);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");
}
function formatFullDate(key) {
  return new Date(`${key}T12:00:00`).toLocaleDateString("pt-BR", {
    weekday: "long", day: "2-digit", month: "long"
  });
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}
function totalMinutes() {
  return state.sessions.reduce((sum, item) => sum + Number(item.minutes || 0), 0);
}
function weekMinutes() {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 6);
  minDate.setHours(0, 0, 0, 0);
  return state.sessions
    .filter(s => new Date(`${s.date}T23:59:59`) >= minDate)
    .reduce((sum, item) => sum + Number(item.minutes || 0), 0);
}
function getStreak() {
  const days = new Set(state.sessions.map(s => s.date));
  let streak = 0;
  let cursor = new Date();
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
function getTodayMinutes() {
  return state.sessions.filter(s => s.date === todayKey()).reduce((sum, s) => sum + Number(s.minutes || 0), 0);
}
function getTodayGoals() {
  return state.goals.filter(g => g.date === todayKey());
}
function subjectColor(index) {
  const values = ["#6d5dfc", "#19a974", "#e7a523", "#dc5c67", "#2b8ed8", "#a55eea"];
  return values[index % values.length];
}
function render() {
  renderHeader();
  renderDashboard();
  renderSubjects();
  renderSessions();
  renderGoals();
  refreshTimerSubjects();
  applyTheme();
}
function renderHeader() {
  document.getElementById("todayLabel").textContent = formatFullDate(todayKey());
  const titles = { dashboard: "Seu painel", subjects: "Matérias", sessions: "Sessões de estudo", goals: "Metas" };
  document.getElementById("pageTitle").textContent = titles[currentView];
}
function renderDashboard() {
  const todayGoals = getTodayGoals();
  const done = todayGoals.filter(g => g.done).length;
  const goalTarget = Math.max(todayGoals.length, 1);
  const goalPercent = Math.round((done / goalTarget) * 100);
  document.getElementById("dailyProgressBar").style.width = `${goalPercent}%`;
  document.getElementById("dailyProgressText").textContent = `${done} / ${todayGoals.length} metas concluídas`;
  document.getElementById("todayPercent").textContent = `${goalPercent}%`;
  document.getElementById("todayRing").style.background =
    `conic-gradient(var(--accent) ${goalPercent * 3.6}deg, var(--surface-2) ${goalPercent * 3.6}deg)`;
  document.getElementById("streakValue").textContent = getStreak();
  document.getElementById("totalHours").textContent = formatHours(totalMinutes());
  document.getElementById("weekHours").textContent = formatHours(weekMinutes());
  const today = getTodayMinutes();
  document.getElementById("heroMessage").textContent = today
    ? `Você já acumulou ${formatMinutes(today)} de foco hoje. Continue no seu ritmo.`
    : "Defina uma meta pequena e faça o primeiro bloco de foco.";
  document.getElementById("sidebarFocus").textContent = today ? `${formatMinutes(today)} de foco` : "Comece com intenção";
  document.getElementById("sidebarFocusMeta").textContent = today ? `${getStreak()} dia(s) cultivando constância` : "Uma pequena sessão já conta.";

  document.getElementById("todayGoals").innerHTML = todayGoals.length
    ? todayGoals.map(goalHTML).join("")
    : `<div class="empty-state">Nenhuma meta para hoje. Crie uma e comece pequeno.</div>`;

  const values = Array.from({ length: 7 }, (_, i) => {
    const key = dateOffset(i - 6);
    return state.sessions.filter(s => s.date === key).reduce((sum, s) => sum + Number(s.minutes || 0), 0);
  });
  const max = Math.max(...values, 60);
  document.getElementById("activityChart").innerHTML = values.map(v =>
    `<div class="activity-bar" style="height:${Math.max(8, Math.round(v / max * 100))}%"><span>${v}m</span></div>`
  ).join("");
  document.getElementById("chartLabels").innerHTML = values.map((_, i) =>
    `<span>${new Date(`${dateOffset(i - 6)}T12:00:00`).toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "")}</span>`
  ).join("");
  document.getElementById("streakSpark").innerHTML = values.map(v =>
    `<span style="height:${Math.max(18, Math.min(100, 18 + v / max * 82))}%"></span>`
  ).join("");

  document.getElementById("subjectPreview").innerHTML = state.subjects.slice(0, 6).map(subjectHTML).join("");
}
function subjectHTML(subject, index = state.subjects.findIndex(s => s.id === subject.id)) {
  const color = subjectColor(index < 0 ? 0 : index);
  return `<article class="subject-card">
    <div class="subject-top">
      <div>
        <h4>${escapeHTML(subject.name)}</h4>
        <p>${escapeHTML(subject.detail || "Matéria")}</p>
      </div>
      <span class="subject-dot" style="background:${color}"></span>
    </div>
    <div class="subject-percent">${Number(subject.progress || 0)}%</div>
    <div class="subject-progress"><span style="width:${Math.min(100, Number(subject.progress || 0))}%;background:${color}"></span></div>
  </article>`;
}
function goalHTML(goal) {
  return `<div class="goal-item ${goal.done ? "completed" : ""}">
    <button class="goal-check ${goal.done ? "done" : ""}" data-goal-toggle="${goal.id}" aria-label="Concluir meta">${goal.done ? "✓" : ""}</button>
    <div><strong>${escapeHTML(goal.title)}</strong><small>${escapeHTML(goal.subject || "Geral")} · ${formatDate(goal.date)}</small></div>
    <button class="delete-button" data-goal-delete="${goal.id}" aria-label="Excluir meta">×</button>
  </div>`;
}
function renderSubjects() {
  document.getElementById("subjectList").innerHTML = state.subjects.map((s, i) => subjectHTML(s, i)).join("") ||
    `<div class="empty-state">Nenhuma matéria cadastrada.</div>`;
}
function renderSessions() {
  const sorted = [...state.sessions].sort((a, b) => b.createdAt - a.createdAt);
  document.getElementById("sessionList").innerHTML = sorted.length
    ? sorted.map(s => `<div class="session-item">
        <div><strong>${escapeHTML(s.subject)}</strong><small>${formatDate(s.date)}</small></div>
        <strong class="session-duration">${formatMinutes(s.minutes)}</strong>
      </div>`).join("")
    : `<div class="empty-state">Nenhuma sessão registrada ainda.</div>`;
}
function renderGoals() {
  const sorted = [...state.goals].sort((a, b) => a.date.localeCompare(b.date) || Number(a.done) - Number(b.done));
  document.getElementById("goalListFull").innerHTML = sorted.length
    ? sorted.map(goalHTML).join("")
    : `<div class="empty-state">Crie sua primeira meta.</div>`;
}
function formatMinutes(minutes) {
  const m = Number(minutes || 0);
  const h = Math.floor(m / 60);
  const min = m % 60;
  return h ? `${h}h ${min}min` : `${min}min`;
}
function formatHours(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}
function navigate(view) {
  currentView = view;
  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.view === view));
  document.querySelectorAll(".view").forEach(el => el.classList.remove("active"));
  document.getElementById(`${view}View`).classList.add("active");
  renderHeader();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function openModal(type) {
  modalType = type;
  const title = { session: "Registrar sessão", goal: "Nova meta", subject: "Nova matéria" }[type];
  document.getElementById("modalTitle").textContent = title;
  const fields = {
    session: `<div class="form-grid">
      <div class="field"><label for="sessionSubject">Matéria</label><select id="sessionSubject" required>${state.subjects.map(s => `<option>${escapeHTML(s.name)}</option>`).join("")}</select></div>
      <div class="field"><label for="sessionMinutes">Minutos estudados</label><input id="sessionMinutes" type="number" min="1" max="1440" value="25" required></div>
    </div>`,
    goal: `<div class="form-grid">
      <div class="field"><label for="goalTitle">Meta</label><input id="goalTitle" maxlength="100" placeholder="Ex.: Revisar capítulo 3" required></div>
      <div class="field"><label for="goalSubject">Matéria</label><select id="goalSubject"><option>Geral</option>${state.subjects.map(s => `<option>${escapeHTML(s.name)}</option>`).join("")}</select></div>
      <div class="field"><label for="goalDate">Data</label><input id="goalDate" type="date" value="${todayKey()}" required></div>
    </div>`,
    subject: `<div class="form-grid">
      <div class="field"><label for="subjectName">Nome</label><input id="subjectName" maxlength="50" placeholder="Ex.: Física" required></div>
      <div class="field"><label for="subjectDetail">Categoria</label><input id="subjectDetail" maxlength="50" placeholder="Ex.: Natureza"></div>
      <div class="field"><label for="subjectProgress">Progresso inicial</label><input id="subjectProgress" type="number" min="0" max="100" value="0" required></div>
    </div>`
  };
  document.getElementById("modalFields").innerHTML = fields[type];
  document.getElementById("modalBackdrop").hidden = false;
  setTimeout(() => document.querySelector("#modalFields input, #modalFields select")?.focus(), 0);
}
function closeModal() {
  document.getElementById("modalBackdrop").hidden = true;
  modalType = null;
}
function addSession(subject, minutes) {
  if (!subject || subject === "Escolha uma matéria") return;
  state.sessions.push({ id: crypto.randomUUID(), subject, minutes, date: todayKey(), createdAt: Date.now() });
  saveState(); render();
}
function updateTimerDisplay() {
  const m = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
  const s = (timerSeconds % 60).toString().padStart(2, "0");
  document.getElementById("timerDisplay").textContent = `${m}:${s}`;
}
function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  document.getElementById("timerToggle").textContent = "Começar";
}
function startTimer() {
  if (!timerRunning && !subjectForTimer.value) {
    subjectForTimer.focus();
    return;
  }
  if (timerRunning) {
    stopTimer();
    return;
  }
  timerRunning = true;
  document.getElementById("timerToggle").textContent = "Pausar";
  timerInterval = setInterval(() => {
    if (timerSeconds <= 0) {
      stopTimer();
      addSession(subjectForTimer.value, Math.max(1, Math.round(timerDurationSeconds / 60)));
      timerSeconds = timerDurationSeconds;
      updateTimerDisplay();
      alert("Sessão concluída e registrada!");
      return;
    }
    timerSeconds--;
    updateTimerDisplay();
  }, 1000);
}
function applyTheme() {
  document.body.classList.toggle("dark", state.theme === "dark");
  document.getElementById("themeButton").textContent = state.theme === "dark" ? "☾" : "☼";
}

document.addEventListener("click", event => {
  const nav = event.target.closest("[data-view]");
  if (nav) navigate(nav.dataset.view);

  const viewTarget = event.target.closest("[data-view-target]");
  if (viewTarget) navigate(viewTarget.dataset.viewTarget);

  const toggle = event.target.closest("[data-goal-toggle]");
  if (toggle) {
    const goal = state.goals.find(g => g.id === toggle.dataset.goalToggle);
    if (goal) goal.done = !goal.done;
    saveState(); render();
  }
  const del = event.target.closest("[data-goal-delete]");
  if (del) {
    state.goals = state.goals.filter(g => g.id !== del.dataset.goalDelete);
    saveState(); render();
  }
  const preset = event.target.closest("[data-minutes]");
  if (preset) {
    stopTimer();
    timerSeconds = Number(preset.dataset.minutes) * 60;
    timerDurationSeconds = timerSeconds;
    updateTimerDisplay();
  }
});

document.getElementById("quickSessionButton").addEventListener("click", () => openModal("session"));
document.getElementById("addSessionButton").addEventListener("click", () => openModal("session"));
document.getElementById("addGoalButton").addEventListener("click", () => openModal("goal"));
document.getElementById("addGoalInline").addEventListener("click", () => openModal("goal"));
document.getElementById("addSubjectButton").addEventListener("click", () => openModal("subject"));
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalCancel").addEventListener("click", closeModal);
document.getElementById("modalBackdrop").addEventListener("click", event => {
  if (event.target.id === "modalBackdrop") closeModal();
});
document.getElementById("themeButton").addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  saveState(); applyTheme();
});
document.getElementById("resetDataButton").addEventListener("click", () => {
  if (!confirm("Restaurar os dados de exemplo?")) return;
  state = structuredClone(seed);
  saveState(); render();
});
document.getElementById("modalForm").addEventListener("submit", event => {
  event.preventDefault();
  if (modalType === "session") {
    const subject = document.getElementById("sessionSubject").value;
    const minutes = Number(document.getElementById("sessionMinutes").value);
    if (minutes > 0) addSession(subject, minutes);
  }
  if (modalType === "goal") {
    state.goals.push({
      id: crypto.randomUUID(),
      title: document.getElementById("goalTitle").value.trim(),
      subject: document.getElementById("goalSubject").value,
      done: false,
      date: document.getElementById("goalDate").value
    });
    saveState(); render();
  }
  if (modalType === "subject") {
    state.subjects.push({
      id: crypto.randomUUID(),
      name: document.getElementById("subjectName").value.trim(),
      detail: document.getElementById("subjectDetail").value.trim() || "Matéria",
      progress: Number(document.getElementById("subjectProgress").value)
    });
    saveState(); render();
  }
  closeModal();
});
document.getElementById("timerToggle").addEventListener("click", startTimer);
document.getElementById("timerReset").addEventListener("click", () => {
  stopTimer(); timerDurationSeconds = 25 * 60; timerSeconds = timerDurationSeconds; updateTimerDisplay();
});
document.getElementById("timerFinish").addEventListener("click", () => {
  stopTimer();
  const elapsedSeconds = timerDurationSeconds - timerSeconds;
  const elapsed = Math.max(1, Math.round(elapsedSeconds / 60));
  const subject = subjectForTimer.value;
  if (subject && elapsedSeconds > 0) addSession(subject, elapsed);
  timerDurationSeconds = 25 * 60; timerSeconds = timerDurationSeconds; updateTimerDisplay();
});
const subjectForTimer = document.getElementById("timerSubject");
function refreshTimerSubjects() {
  const selected = subjectForTimer.value;
  subjectForTimer.innerHTML = `<option value="">Escolha uma matéria</option>${state.subjects.map(s => `<option>${escapeHTML(s.name)}</option>`).join("")}`;
  subjectForTimer.value = state.subjects.some(s => s.name === selected) ? selected : "";
}


render();
updateTimerDisplay();
