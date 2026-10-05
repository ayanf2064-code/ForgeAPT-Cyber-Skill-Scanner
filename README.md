<p align="center">
  <img src="https://img.shields.io/badge/ForgeAPT-Cyber%20%26%20AI%20Skill%20Scanner-22d3ee?style=for-the-badge&logo=shield&logoColor=white" alt="ForgeAPT" />
</p>

<h1 align="center">⬡ ForgeAPT — Cyber & AI Skill Scanner</h1>

<p align="center">
  <strong>A unique team assessment tool</strong> built for small elite groups who want to grow together like a real APT team — structured, practical, zero fluff.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-cyan?style=flat-square" />
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20Linux%20%7C%20macOS-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/stack-Pure%20HTML%2FCSS%2FJS-purple?style=flat-square" />
  <img src="https://img.shields.io/badge/status-Production%20Ready-success?style=flat-square" />
  <img src="https://img.shields.io/badge/offline-100%25%20Localhost-orange?style=flat-square" />
</p>

---

## Why this project exists

After studying the practical modules from **CyberMindSpace (Almadad Ali Sir)**, a small group of learners realised a common problem:

> Everyone says “I’m ready” — but nobody has a clear, honest map of their actual level.

This tool forces the truth.

1. You complete **3 tasks**
2. The system shows a precise **knowledge matrix** (Linux, Networking, Web Hacking, Tools, AI, Recon…)
3. The whole team starts learning from the **weakest common areas**

No one is left behind. That’s how real teams become dangerous (in the ethical sense).

---

## Features

| Task | Description |
|------|-------------|
| **01 — Practical Lab** | 9 scenario-based questions (Easy / Medium / Hard) drawn from real modules: Recon, Scanning, SQLi, PrivEsc, MITM, AI Prompt Injection… |
| **02 — 30 MCQs** | 10 Hacking • 10 Tools • 10 AI Security |
| **03 — Timed Exam** | 20 questions • **30-minute timer** • Hints available (−2 points each) |

**After completion you get:**
- Overall percentage + level (Weak / Medium / Good / Excellent)
- Per-category breakdown with visual bars
- Clear team recommendations on where to start learning next
- Dark cyber theme + light mode toggle
- 100% offline — no data leaves your machine

---

## Modules covered

Based on the free practical course by **Cyber Mind Space / Almadad Ali**:

- Introduction to Ethical Hacking
- Footprinting & Reconnaissance
- Scanning Networks
- Enumeration
- Vulnerability Analysis
- System Hacking (Windows & Linux Privilege Escalation)
- Malware Threats • Sniffing • Social Engineering • DoS
- Session Hijacking • IDS / Firewalls / Honeypots
- Web Server Security • Web Application Hacking • SQL Injection
- Wireless & Mobile concepts
- **+ AI Security** (Prompt Injection, RAG, Jailbreaking, Red Teaming)

---

## How to run (Windows / Linux / macOS)

### Option 1 — Simplest (no server)
Just open `index.html` in any modern browser (Chrome, Firefox, Edge, Brave).

### Option 2 — Proper localhost (recommended)

```bash
# Python 3
python -m http.server 8080
# then open → http://localhost:8080
```

```bash
# Node.js
npx serve .
```

```bash
# PHP
php -S localhost:8080
```

No installation of extra packages required. Everything is pure frontend.

---

## Project structure

```
cyber-skill-scanner/
├── index.html          # Main entry point
├── css/
│   └── style.css       # Dark cyber theme + light mode
├── js/
│   ├── data.js         # All questions (Practical + MCQ + Exam)
│   └── app.js          # Logic, scoring, timer, results engine
├── README.md
├── LICENSE
└── .gitignore
```

---

## How the team should use it

1. Everyone takes the assessment individually (or in the first meeting).
2. Compare results.
3. Look at the **weakest categories** across the team.
4. Start daily/weekly learning from those weak areas (practical + labs).
5. Re-take the assessment after 2–4 weeks and track improvement.

This is exactly how an elite small team compounds skill.

---

## Customisation

- Want more questions? → Edit `js/data.js`
- Want different categories or scoring weights? → Edit `js/app.js` → `generateResults()`
- Want to change the timer? → Look for `30 * 60` in `app.js`

---

## Disclaimer

This tool is for **educational and ethical purposes only**.  
Only test systems you own or have explicit written permission to test.  
The creators of this project and CyberMindSpace are not responsible for any misuse.

---

## Credits

- Concept & Vision → Your Team
- Question design inspired by practical modules of **Cyber Mind Space (Almadad Ali)**
- Built as a clean, self-contained, GitHub-ready project

---

<p align="center">
  <strong>Stay ethical. Stay hungry. Forge the team.</strong>
</p>
