// ── ASSESSMENT FORM MODULE ─────────────────────────────
// One task: build the assessment form, validate, return the data.
//
// Usage:
//   import { renderAssessmentForm, getFormData } from './assessment-form.js';
//   renderAssessmentForm(containerId, nativeLang, onSubmit);
//
// The form is rendered inside the given container.
// onSubmit is called with the form data when valid.

const FORM_LABELS = {
  'Deutsch': {
    title: 'Dein persönlicher Lernpfad',
    name: 'Dein Name',
    target: 'Welche Sprache möchtest du lernen?',
    reason: 'Warum lernst du diese Sprache?',
    reasons: ['Arbeit', 'Familie', 'Reise', 'Prüfung', 'Sonstiges'],
    level: 'Dein aktuelles Niveau',
    levels: ['Anfänger — ich kenne kaum Wörter', 'Grundkenntnisse — ich kann ein paar Sätze', 'Mittelstufe — ich kann mich verständigen'],
    goal: 'Was ist dein konkretes Ziel?',
    goalPlaceholder: 'z.B. Mit meiner Schwiegerfamilie in Medellín sprechen',
    deadline: 'Bis wann möchtest du es erreichen?',
    deadlinePlaceholder: 'z.B. August 2026',
    time: 'Wie viel Zeit hast du pro Woche?',
    times: ['1–2 Stunden', '3–4 Stunden', '5–6 Stunden', 'Mehr als 6 Stunden'],
    targets: ['Spanisch', 'Deutsch', 'Englisch'],
    btn: 'Meinen Lernpfad erstellen →',
    error: 'Bitte alle Felder ausfüllen'
  },
  'Español': {
    title: 'Tu camino de aprendizaje',
    name: 'Tu nombre',
    target: '¿Qué idioma quieres aprender?',
    reason: '¿Por qué aprendes este idioma?',
    reasons: ['Trabajo', 'Familia', 'Viaje', 'Examen', 'Otro'],
    level: 'Tu nivel actual',
    levels: ['Principiante — casi no conozco palabras', 'Básico — puedo decir algunas frases', 'Intermedio — puedo comunicarme'],
    goal: '¿Cuál es tu objetivo concreto?',
    goalPlaceholder: 'Ej. Hablar con la familia de mi pareja en Medellín',
    deadline: '¿Para cuándo quieres lograrlo?',
    deadlinePlaceholder: 'Ej. Agosto 2026',
    time: '¿Cuánto tiempo tienes por semana?',
    times: ['1–2 horas', '3–4 horas', '5–6 horas', 'Más de 6 horas'],
    targets: ['Español', 'Alemán', 'Inglés'],
    btn: 'Crear mi camino →',
    error: 'Por favor completa todos los campos'
  },
  'English': {
    title: 'Your Personal Learning Path',
    name: 'Your name',
    target: 'Which language do you want to learn?',
    reason: 'Why are you learning this language?',
    reasons: ['Work', 'Family', 'Travel', 'Exam', 'Other'],
    level: 'Your current level',
    levels: ['Beginner — I barely know any words', 'Elementary — I know a few phrases', 'Intermediate — I can communicate'],
    goal: 'What is your concrete goal?',
    goalPlaceholder: 'e.g. Speak with my in-laws in Medellín',
    deadline: 'By when do you want to achieve it?',
    deadlinePlaceholder: 'e.g. August 2026',
    time: 'How much time do you have per week?',
    times: ['1–2 hours', '3–4 hours', '5–6 hours', 'More than 6 hours'],
    targets: ['Spanish', 'German', 'English'],
    btn: 'Create my learning path →',
    error: 'Please fill all fields'
  }
};

// Normalize target language to internal code (Spanish/German/English)
function normalizeTarget(target) {
  const map = {
    'Spanisch': 'Spanish', 'Español': 'Spanish', 'Spanish': 'Spanish',
    'Deutsch':  'German',  'Alemán':  'German',  'German':  'German',
    'Englisch': 'English', 'Inglés':  'English', 'English': 'English'
  };
  return map[target] || 'Spanish';
}

export function renderAssessmentForm(containerId, nativeLang, capyIcon, onSubmit) {
  const L = FORM_LABELS[nativeLang] || FORM_LABELS['English'];

  const form = document.createElement('div');
  form.className = 'message spikiu';
  form.innerHTML = `
    <div class="avatar-spikiu">${capyIcon}</div>
    <div style="flex:1;min-width:0;">
      <div class="bubble spikiu" style="max-width:100%;background:#fff;border:1.5px solid #e8e4df;border-radius:0.3rem 1.2rem 1.2rem 1.2rem;padding:1.5rem;">
        <div style="font-family:'Lora',serif;font-size:1rem;font-weight:700;color:#2d6a4f;margin-bottom:1.2rem;">${L.title}</div>

        ${field('name', L.name, 'input', null, '...')}
        ${field('target', L.target, 'select', L.targets)}
        ${field('reason', L.reason, 'select', L.reasons)}
        ${field('level', L.level, 'select', L.levels)}
        ${field('goal', L.goal, 'input', null, L.goalPlaceholder)}
        ${field('deadline', L.deadline, 'input', null, L.deadlinePlaceholder)}
        ${field('time', L.time, 'select', L.times)}

        <div id="form-error" style="display:none;font-size:0.82rem;color:#c0392b;margin-bottom:0.8rem;">${L.error}</div>

        <button id="form-submit" style="width:100%;background:#2d6a4f;color:white;border:none;border-radius:100px;padding:0.85rem;font-family:'DM Sans',sans-serif;font-size:0.95rem;font-weight:600;cursor:pointer;transition:background 0.2s;">
          ${L.btn}
        </button>
      </div>
    </div>`;

  const container = document.getElementById(containerId);
  container.appendChild(form);
  container.scrollTop = container.scrollHeight;

  // Wire up submit button
  form.querySelector('#form-submit').onclick = () => {
    const data = getFormData();
    if (!data) {
      form.querySelector('#form-error').style.display = 'block';
      return;
    }
    // Add internal target language code
    data.targetLangCode = normalizeTarget(data.target);
    data.nativeLang = nativeLang;
    onSubmit(data);
  };
}

function field(id, label, type, options, placeholder) {
  if (type === 'input') {
    return `
      <div style="margin-bottom:0.9rem;">
        <label style="font-size:0.78rem;font-weight:600;color:#6b6560;display:block;margin-bottom:0.3rem;">${label}</label>
        <input id="f-${id}" type="text" placeholder="${placeholder || ''}" style="width:100%;padding:0.6rem 0.9rem;border:1.5px solid #e8e4df;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:0.92rem;color:#1a1816;outline:none;">
      </div>`;
  }
  if (type === 'select') {
    return `
      <div style="margin-bottom:0.9rem;">
        <label style="font-size:0.78rem;font-weight:600;color:#6b6560;display:block;margin-bottom:0.3rem;">${label}</label>
        <select id="f-${id}" style="width:100%;padding:0.6rem 0.9rem;border:1.5px solid #e8e4df;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:0.92rem;color:#1a1816;outline:none;background:#fff;">
          <option value="">—</option>
          ${options.map(o => `<option value="${o}">${o}</option>`).join('')}
        </select>
      </div>`;
  }
  return '';
}

export function getFormData() {
  const name     = document.getElementById('f-name').value.trim();
  const target   = document.getElementById('f-target').value;
  const reason   = document.getElementById('f-reason').value;
  const level    = document.getElementById('f-level').value;
  const goal     = document.getElementById('f-goal').value.trim();
  const deadline = document.getElementById('f-deadline').value.trim();
  const time     = document.getElementById('f-time').value;

  if (!name || !target || !reason || !level || !goal || !deadline || !time) {
    return null;
  }

  return { name, target, reason, level, goal, deadline, time };
}
