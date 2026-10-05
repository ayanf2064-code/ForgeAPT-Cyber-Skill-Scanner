/* ============================================================
   ForgeAPT — Application Logic (Updated)
   Practical & Exam = text input (THM style / short answer)
   MCQs = multiple choice only
   ============================================================ */

const state = {
  t1: { current: 0, answers: {}, score: 0 },
  t2: { current: 0, answers: {}, score: 0 },
  t3: { current: 0, answers: {}, score: 0, hintsUsed: {}, timer: null, timeLeft: 30 * 60, started: false },
  resultsGenerated: false
};


// ---------- Particles (3D-ish floating dots) ----------

// ---------- FULL 3D CYBER BACKGROUND (Three.js) ----------
function initCyber3D() {
  const canvas = document.getElementById('webgl-bg');
  if (!canvas || typeof THREE === 'undefined') {
    console.warn('Three.js not loaded, falling back to CSS only');
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Particle field
  const particleCount = 1200;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    const c = Math.random() > 0.5 ? 0x22d3ee : 0xa78bfa;
    colors[i * 3] = ((c >> 16) & 255) / 255;
    colors[i * 3 + 1] = ((c >> 8) & 255) / 255;
    colors[i * 3 + 2] = (c & 255) / 255;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const pMat = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // Wireframe torus (cyber ring)
  const torusGeo = new THREE.TorusGeometry(8, 0.15, 8, 64);
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.rotation.x = Math.PI / 2.5;
  scene.add(torus);

  // Second ring
  const torus2 = new THREE.Mesh(
    new THREE.TorusGeometry(11, 0.08, 6, 80),
    new THREE.MeshBasicMaterial({ color: 0xa78bfa, wireframe: true, transparent: true, opacity: 0.15 })
  );
  torus2.rotation.x = Math.PI / 3;
  scene.add(torus2);

  // Connecting lines (network feel)
  const linePositions = [];
  for (let i = 0; i < 40; i++) {
    const a = Math.random() * Math.PI * 2;
    const b = Math.random() * Math.PI * 2;
    const r = 15 + Math.random() * 10;
    linePositions.push(
      Math.cos(a) * r, Math.sin(a) * r * 0.3, Math.sin(b) * r,
      Math.cos(b) * r, Math.sin(b) * r * 0.3, Math.cos(a) * r
    );
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lines = new THREE.LineSegments(
    lineGeo,
    new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.12 })
  );
  scene.add(lines);

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    const t = Date.now() * 0.0003;
    particles.rotation.y = t * 0.4;
    particles.rotation.x = t * 0.15;
    torus.rotation.z = t * 0.8;
    torus2.rotation.z = -t * 0.5;
    lines.rotation.y = t * 0.2;
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function initParticles() {
  const container = document.getElementById('particles');
  if (!container || container.childElementCount > 0) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 14) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    container.appendChild(p);
  }
}

// ---------- Global assessment timer (starts when user clicks Start) ----------
let globalTimerInterval = null;
let globalSeconds = 0;

function startGlobalTimer() {
  const el = document.getElementById('globalTimer');
  if (!el) return;
  el.classList.add('visible');
  if (globalTimerInterval) return;
  globalTimerInterval = setInterval(() => {
    globalSeconds++;
    const m = Math.floor(globalSeconds / 60);
    const s = globalSeconds % 60;
    el.textContent = `⏱ ${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }, 1000);
}



function normalize(str) {
  return (str || "").toLowerCase().trim().replace(/\s+/g, " ");
}

function isAccepted(userAnswer, acceptedList) {
  const n = normalize(userAnswer);
  return acceptedList.some(a => normalize(a) === n || n.includes(normalize(a)) || normalize(a).includes(n));
}

// ---------- Navigation ----------
function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const view = document.getElementById(viewId);
  if (view) view.classList.add('active');
  const btn = document.querySelector(`.nav-btn[data-view="${viewId}"]`);
  if (btn) btn.classList.add('active');

  if (viewId === 'task1') renderT1();
  if (viewId === 'task2') renderT2();
  if (viewId === 'task3') {
    renderT3();
    if (!state.t3.started) startExamTimer();
  }
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showView(btn.dataset.view));
});

function startAssessment() {
  startGlobalTimer();
  showView('task1');
}

// ---------- Theme ----------
document.getElementById('themeToggle').addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
});

// ---------- TASK 1: Practical (THM style - text input) ----------
function renderT1() {
  const q = PRACTICAL_QUESTIONS[state.t1.current];
  const container = document.getElementById('t1Container');
  const prevAnswer = state.t1.answers[q.id] || "";

  container.innerHTML = `
    <div class="q-difficulty ${q.difficulty}">${q.difficulty.toUpperCase()}</div>
    <div class="q-category">${q.category} • ${q.module}</div>
    <div class="scenario-box">${q.scenario.replace(/\n/g, '<br>')}</div>
    <div class="q-text">${q.question}</div>
    <div class="input-area">
      <input type="text" id="t1Input" class="answer-input" placeholder="Type your answer / command here..." value="${prevAnswer.replace(/"/g, '&quot;')}" autocomplete="off" spellcheck="false" />
      <button class="btn secondary" onclick="checkT1()">Check Answer</button>
    </div>
    <div id="t1Feedback" class="feedback"></div>
  `;

  document.getElementById('t1Counter').textContent = `Question ${state.t1.current + 1} / ${PRACTICAL_QUESTIONS.length}`;
  document.getElementById('t1Score').textContent = `Score: ${state.t1.score}`;
  document.getElementById('t1Progress').style.width = `${((state.t1.current + 1) / PRACTICAL_QUESTIONS.length) * 100}%`;
  document.getElementById('t1Prev').disabled = state.t1.current === 0;
  document.getElementById('t1Next').textContent = state.t1.current === PRACTICAL_QUESTIONS.length - 1 ? 'Finish Practical →' : 'Next →';

  // Enter key support
  const input = document.getElementById('t1Input');
  if (input) {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') checkT1(); });
    input.focus();
  }
}

function checkT1() {
  const q = PRACTICAL_QUESTIONS[state.t1.current];
  const input = document.getElementById('t1Input');
  const userAns = input.value;
  state.t1.answers[q.id] = userAns;

  const feedback = document.getElementById('t1Feedback');
  const correct = isAccepted(userAns, q.accepted);

  // recalculate full score
  state.t1.score = 0;
  PRACTICAL_QUESTIONS.forEach(qq => {
    if (state.t1.answers[qq.id] && isAccepted(state.t1.answers[qq.id], qq.accepted)) {
      state.t1.score++;
    }
  });

  if (correct) {
    feedback.innerHTML = `<div class="feedback-ok">Correct! ${q.explanation || ''}</div>`;
  } else {
    feedback.innerHTML = `<div class="feedback-bad">Not quite. Hint: ${q.hint}<br><small>Expected something like: <code>${q.answer}</code></small></div>`;
  }
  document.getElementById('t1Score').textContent = `Score: ${state.t1.score}`;
}

function nextT1() {
  // save current input even if not checked
  const input = document.getElementById('t1Input');
  if (input) {
    const q = PRACTICAL_QUESTIONS[state.t1.current];
    state.t1.answers[q.id] = input.value;
    // silent score update
    state.t1.score = 0;
    PRACTICAL_QUESTIONS.forEach(qq => {
      if (state.t1.answers[qq.id] && isAccepted(state.t1.answers[qq.id], qq.accepted)) state.t1.score++;
    });
  }

  if (state.t1.current < PRACTICAL_QUESTIONS.length - 1) {
    state.t1.current++;
    renderT1();
  } else {
    showView('task2');
  }
}

function prevT1() {
  const input = document.getElementById('t1Input');
  if (input) {
    const q = PRACTICAL_QUESTIONS[state.t1.current];
    state.t1.answers[q.id] = input.value;
  }
  if (state.t1.current > 0) {
    state.t1.current--;
    renderT1();
  }
}

// ---------- TASK 2: MCQs only ----------
function renderT2() {
  const q = MCQ_QUESTIONS[state.t2.current];
  const container = document.getElementById('t2Container');
  const selected = state.t2.answers[q.id];

  container.innerHTML = `
    <div class="q-category">${q.category}</div>
    <div class="q-text">${q.question}</div>
    <div class="options">
      ${q.options.map((opt, i) => `
        <div class="option ${selected === i ? 'selected' : ''}" onclick="selectT2(${i})">
          <input type="radio" name="t2opt" ${selected === i ? 'checked' : ''} />
          <label>${opt}</label>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('t2Counter').textContent = `Question ${state.t2.current + 1} / ${MCQ_QUESTIONS.length}`;
  document.getElementById('t2Score').textContent = `Score: ${state.t2.score}`;
  document.getElementById('t2Progress').style.width = `${((state.t2.current + 1) / MCQ_QUESTIONS.length) * 100}%`;
  document.getElementById('t2Prev').disabled = state.t2.current === 0;
  document.getElementById('t2Next').textContent = state.t2.current === MCQ_QUESTIONS.length - 1 ? 'Finish MCQs →' : 'Next →';
}

function selectT2(idx) {
  const q = MCQ_QUESTIONS[state.t2.current];
  state.t2.answers[q.id] = idx;
  state.t2.score = 0;
  MCQ_QUESTIONS.forEach(qq => {
    if (state.t2.answers[qq.id] === qq.correct) state.t2.score++;
  });
  renderT2();
}

function nextT2() {
  if (state.t2.current < MCQ_QUESTIONS.length - 1) {
    state.t2.current++;
    renderT2();
  } else {
    showView('task3');
  }
}

function prevT2() {
  if (state.t2.current > 0) {
    state.t2.current--;
    renderT2();
  }
}

// ---------- TASK 3: Exam (short answer - NO MCQs) ----------
function startExamTimer() {
  state.t3.started = true;
  const display = document.getElementById('timerDisplay');
  display.classList.remove('hidden');

  state.t3.timer = setInterval(() => {
    state.t3.timeLeft--;
    const m = Math.floor(state.t3.timeLeft / 60);
    const s = state.t3.timeLeft % 60;
    display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    if (state.t3.timeLeft <= 60) display.classList.add('danger');
    if (state.t3.timeLeft <= 0) {
      clearInterval(state.t3.timer);
      alert('Time is up! Generating results...');
      generateResults();
      showView('results');
    }
  }, 1000);
}

function renderT3() {
  const q = EXAM_QUESTIONS[state.t3.current];
  const container = document.getElementById('t3Container');
  const prevAnswer = state.t3.answers[q.id] || "";
  const hintShown = state.t3.hintsUsed[q.id];

  container.innerHTML = `
    <div class="q-category">${q.category} • Short Answer</div>
    <div class="q-text">${q.question}</div>
    <div class="input-area">
      <input type="text" id="t3Input" class="answer-input" placeholder="Type your answer here..." value="${prevAnswer.replace(/"/g, '&quot;')}" autocomplete="off" spellcheck="false" />
    </div>
    ${hintShown ? `<div class="hint-box">Hint: ${q.hint}</div>` : ''}
  `;

  document.getElementById('t3Counter').textContent = `Question ${state.t3.current + 1} / ${EXAM_QUESTIONS.length}`;
  document.getElementById('t3Score').textContent = `Score: ${state.t3.score}`;
  document.getElementById('t3Progress').style.width = `${((state.t3.current + 1) / EXAM_QUESTIONS.length) * 100}%`;
  document.getElementById('t3Prev').disabled = state.t3.current === 0;
  document.getElementById('t3Hint').disabled = !!hintShown;
  document.getElementById('t3Next').textContent = state.t3.current === EXAM_QUESTIONS.length - 1 ? 'Submit Exam →' : 'Next →';

  const input = document.getElementById('t3Input');
  if (input) {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') nextT3(); });
    input.focus();
  }
}

function recalculateT3Score() {
  let score = 0;
  EXAM_QUESTIONS.forEach(qq => {
    if (state.t3.answers[qq.id] && isAccepted(state.t3.answers[qq.id], qq.accepted)) {
      score += 2;
    }
  });
  Object.keys(state.t3.hintsUsed).forEach(id => {
    if (state.t3.hintsUsed[id]) score -= 2;
  });
  state.t3.score = Math.max(0, score);
}

function showHint() {
  const q = EXAM_QUESTIONS[state.t3.current];
  if (!state.t3.hintsUsed[q.id]) {
    // save current answer first
    const input = document.getElementById('t3Input');
    if (input) state.t3.answers[q.id] = input.value;
    state.t3.hintsUsed[q.id] = true;
    recalculateT3Score();
    renderT3();
  }
}

function nextT3() {
  const input = document.getElementById('t3Input');
  if (input) {
    const q = EXAM_QUESTIONS[state.t3.current];
    state.t3.answers[q.id] = input.value;
    recalculateT3Score();
  }

  if (state.t3.current < EXAM_QUESTIONS.length - 1) {
    state.t3.current++;
    renderT3();
  } else {
    if (state.t3.timer) clearInterval(state.t3.timer);
    generateResults();
    showView('results');
  }
}

function prevT3() {
  const input = document.getElementById('t3Input');
  if (input) {
    const q = EXAM_QUESTIONS[state.t3.current];
    state.t3.answers[q.id] = input.value;
  }
  if (state.t3.current > 0) {
    state.t3.current--;
    renderT3();
  }
}

// ---------- RESULTS ----------
function generateResults() {
  state.resultsGenerated = true;
  if (state.t3.timer) clearInterval(state.t3.timer);
  document.getElementById('timerDisplay').classList.add('hidden');

  // final score calc
  state.t1.score = 0;
  PRACTICAL_QUESTIONS.forEach(qq => {
    if (state.t1.answers[qq.id] && isAccepted(state.t1.answers[qq.id], qq.accepted)) state.t1.score++;
  });
  recalculateT3Score();

  const categories = {
    'Linux': { correct: 0, total: 0 },
    'Networking': { correct: 0, total: 0 },
    'Web Hacking': { correct: 0, total: 0 },
    'Hacking': { correct: 0, total: 0 },
    'Tools': { correct: 0, total: 0 },
    'AI': { correct: 0, total: 0 },
    'Recon': { correct: 0, total: 0 }
  };

  PRACTICAL_QUESTIONS.forEach(q => {
    const cat = q.category;
    if (!categories[cat]) categories[cat] = { correct: 0, total: 0 };
    categories[cat].total++;
    if (state.t1.answers[q.id] && isAccepted(state.t1.answers[q.id], q.accepted)) categories[cat].correct++;
  });

  MCQ_QUESTIONS.forEach(q => {
    const cat = q.category;
    if (!categories[cat]) categories[cat] = { correct: 0, total: 0 };
    categories[cat].total++;
    if (state.t2.answers[q.id] === q.correct) categories[cat].correct++;
  });

  EXAM_QUESTIONS.forEach(q => {
    const cat = q.category;
    if (!categories[cat]) categories[cat] = { correct: 0, total: 0 };
    categories[cat].total++;
    if (state.t3.answers[q.id] && isAccepted(state.t3.answers[q.id], q.accepted)) categories[cat].correct++;
  });

  const totalPossibleT1 = PRACTICAL_QUESTIONS.length;
  const totalPossibleT2 = MCQ_QUESTIONS.length;
  const totalPossibleT3 = EXAM_QUESTIONS.length * 2;

  const overallPercent = Math.round(
    ((state.t1.score / totalPossibleT1) * 0.3 +
     (state.t2.score / totalPossibleT2) * 0.35 +
     (state.t3.score / totalPossibleT3) * 0.35) * 100
  );

  let overallLevel = 'weak';
  if (overallPercent >= 85) overallLevel = 'excellent';
  else if (overallPercent >= 70) overallLevel = 'good';
  else if (overallPercent >= 50) overallLevel = 'medium';

  const catLevels = [];
  Object.keys(categories).forEach(name => {
    const c = categories[name];
    if (c.total === 0) return;
    const pct = Math.round((c.correct / c.total) * 100);
    let level = 'weak';
    if (pct >= 85) level = 'excellent';
    else if (pct >= 70) level = 'good';
    else if (pct >= 50) level = 'medium';
    catLevels.push({ name, pct, level, correct: c.correct, total: c.total });
  });
  catLevels.sort((a, b) => a.pct - b.pct);

  const weakest = catLevels.filter(c => c.level === 'weak' || c.level === 'medium');

  const recommendations = [];
  if (weakest.length === 0) {
    recommendations.push('You are strong across the board. Move to advanced topics: Red Teaming, Bug Bounty programs, AI Red Teaming, and real projects.');
  } else {
    recommendations.push('Team should start learning from the weakest areas so no one is left behind:');
    weakest.forEach(w => {
      if (w.name === 'Linux') recommendations.push('Linux: Practice privilege escalation (SUID, capabilities, cron, PATH hijacking). Use TryHackMe “Linux PrivEsc” room.');
      if (w.name === 'Networking') recommendations.push('Networking: Master TCP/IP, ARP, routing, and Nmap thoroughly. Do practical labs on packet analysis with Wireshark.');
      if (w.name === 'Web Hacking') recommendations.push('Web Hacking: Complete PortSwigger Web Security Academy (SQLi, XSS, Auth, Access Control). Practice on DVWA / Juice Shop.');
      if (w.name === 'Hacking') recommendations.push('Core Hacking Methodology: Re-watch CyberMindSpace modules 1–10 and take notes. Practice full kill-chain on HTB Starting Point.');
      if (w.name === 'Tools') recommendations.push('Tools: Spend dedicated time with Burp Suite, Nmap NSE, sqlmap, Gobuster, and Metasploit. Build muscle memory.');
      if (w.name === 'AI') recommendations.push('AI Security: Study prompt injection, RAG security, and LLM red teaming. Follow the upcoming AI Security series from CyberMindSpace.');
      if (w.name === 'Recon') recommendations.push('Reconnaissance: Master passive OSINT, CT logs, subdomain enum, and Google dorking before any active scanning.');
    });
  }
  recommendations.push('After improving the weak areas, re-take this assessment as a team and compare progress.');

  const container = document.getElementById('resultsContainer');
  container.innerHTML = `
    <div class="results-grid">
      <div class="score-summary">
        <div class="score-card">
          <div class="big">${state.t1.score}/${totalPossibleT1}</div>
          <div>Practical (THM style)</div>
        </div>
        <div class="score-card">
          <div class="big">${state.t2.score}/${totalPossibleT2}</div>
          <div>MCQs</div>
        </div>
        <div class="score-card">
          <div class="big">${state.t3.score}/${totalPossibleT3}</div>
          <div>Exam (short answer)</div>
        </div>
        <div class="score-card">
          <div class="big">${overallPercent}%</div>
          <div>Overall</div>
          <span class="level-badge ${overallLevel}">${overallLevel.toUpperCase()}</span>
        </div>
      </div>

      <h3 style="margin-bottom:14px;">Category Breakdown</h3>
      <div class="category-list">
        ${catLevels.map(c => `
          <div class="cat-row">
            <div class="cat-name">${c.name}</div>
            <div class="cat-bar"><div class="cat-fill ${c.level}" style="width:${c.pct}%"></div></div>
            <div class="cat-level">${c.pct}% • ${c.level}</div>
          </div>
        `).join('')}
      </div>

      <div class="recommendation">
        <h3>Team Recommendation</h3>
        <ul>
          ${recommendations.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>

      <div style="text-align:center; margin-top:28px;">
        <button class="btn primary" onclick="location.reload()">Retake Assessment</button>
        <button class="btn ghost" style="margin-left:10px;" onclick="window.print()">Print Report</button>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  // slight delay so Three.js CDN is ready
  setTimeout(initCyber3D, 100);
});
