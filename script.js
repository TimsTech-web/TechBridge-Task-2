/* ============ TechBridge — SPA navigation & rendering ============ */

const PROGRAMS = {
  'data-analytics': {
    title: 'Data Analytics',
    img: 'img/data-analytics.png',
    alt: 'Data analytics dashboard on a monitor in an office',
    duration: '30 Days',
    mode: 'Remote (Online)',
    level: 'Beginner Friendly',
    details: 'The Data Analytics track takes you from spreadsheets to storytelling with data. You will learn to collect, clean, analyse and visualise data using industry-standard tools, and finish with a capstone project that analyses a real dataset end-to-end.',
    why: [
      '<b>High demand:</b> data roles are among the fastest-growing jobs globally',
      '<b>Every industry needs it</b> — finance, health, retail, government, tech',
      '<b>No coding required to start;</b> you progress into SQL and Python naturally',
      '<b>Portfolio-driven:</b> graduate with dashboards and reports you can show employers',
      '<b>Career paths:</b> Data Analyst, BI Analyst, Operations Analyst, Research Analyst'
    ],
    qualified: [
      'Any graduates (any discipline) seeking a tech career',
      'Career switchers from non-technical backgrounds',
      'Accountants, marketers, bankers and administrators who work with data',
      'Anyone comfortable with basic computer use and ready to commit 30 Days'
    ],
    requirements: [
      'A laptop (minimum 4GB RAM) with internet access',
      'Basic computer literacy (files, browsers, email)',
      'Willingness to attend live sessions and submit weekly assignments',
      'Completed application form and <b>membership of the TechBridge WhatsApp Community</b>',
    ]
  },
  'web-development': {
    title: 'Web Development',
    img: 'img/web-dev.png',
    alt: 'Developer writing code on dual monitors',
    duration: '30 Days',
    mode: 'Remote (Online)',
    level: 'Beginner Friendly',
    details: 'The Web Development track turns you into a job-ready front-end developer. Starting from HTML and CSS, you will master modern JavaScript, responsive design, Git/GitHub and deployment — building real websites every single week.',
    why: [
      '<b>Build things people can see and use</b> — instant, tangible results',
      '<b>Massive job market:</b> every business needs a web presence',
      '<b>Freelance-ready:</b> start earning from client projects even before full-time roles',
      '<b>Clear roadmap:</b> HTML → CSS → JavaScript → frameworks → portfolio',
      '<b>Career paths:</b> Front-End Developer, Web Designer, UI Engineer, Freelancer'
    ],
    qualified: [
      'Any graduates (any discipline) passionate about building for the web',
      'Self-taught coders who want structure and mentorship',
      'Designers, content creators and entrepreneurs who want to build their own products',
      'Anyone with a laptop, curiosity and 30 Days of commitment'
    ],
    requirements: [
      'A laptop (minimum 4GB RAM) capable of running a code editor',
      'No prior coding experience required — we start from zero',
      'Willingness to attend live sessions and complete weekly build projects',
      'Completed application form and <b>membership of the TechBridge WhatsApp Community</b>',
    ]
  }
};

const PAGES = ['home', 'about', 'program', 'admission', 'apply'];
let currentProgram = 'data-analytics';

/* ---------- Router ---------- */
function showPage(page, programKey) {
  if (!PAGES.includes(page)) page = 'home';
  if (programKey && PROGRAMS[programKey]) currentProgram = programKey;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');

  if (page === 'program') renderProgram(currentProgram);

  document.querySelectorAll('.nav-link').forEach(l =>
    l.classList.toggle('active', l.dataset.page === page));

  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('programDropdown').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function route() {
  const hash = location.hash.replace('#', '') || 'home';
  const [page, prog] = hash.split('/');
  showPage(page, prog);
}

/* ---------- Program rendering ---------- */
function li(items) { return items.map(i => `<li>${i}</li>`).join(''); }

function renderProgram(key) {
  const p = PROGRAMS[key];
  document.querySelectorAll('[data-prog-tab]').forEach(b =>
    b.classList.toggle('active', b.dataset.progTab === key));

  document.getElementById('programContent').innerHTML = `
    <div class="prog-hero">
      <div>
        <span class="badge">Programme Track</span>
        <h2>${p.title}</h2>
        <p>${p.details}</p>
        <div class="prog-meta">
          <span>Duration: ${p.duration}</span>
          <span>${p.mode}</span>
          <span>${p.level}</span>
        </div>
        <a href="#apply" class="btn-primary" data-page="apply">Enroll Now</a>
      </div>
      <img src="${p.img}" alt="${p.alt}">
    </div>

    <div class="prog-blocks">
      <div class="prog-block">
        <h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2-6.3-4.5-6.3 4.5L8 13.8 2 9.2h7.6z"/></svg>
        Why Choose ${p.title}?</h3>
        <ul>${li(p.why)}</ul>
      </div>
      <div class="prog-block">
        <h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
        Who Is Qualified?</h3>
        <ul>${li(p.qualified)}</ul>
      </div>
      <div class="prog-block" style="grid-column:1/-1">
        <h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        Requirements for the Programme</h3>
        <ul>${li(p.requirements)}</ul>
      </div>
    </div>

    <div class="prog-enroll">
      <h3>Ready to enroll in ${p.title}?</h3>
      <p>Applications close soon — secure your seat in the 2026/2027 cohort.</p>
      <a href="#apply" class="btn-white" data-page="apply">Enroll Now — Apply Today</a>
    </div>`;
}

/* ---------- Global click delegation ---------- */
document.addEventListener('click', e => {
  const link = e.target.closest('[data-page]');
  if (link) {
    e.preventDefault();
    const prog = link.dataset.program ? '/' + link.dataset.program : '';
    location.hash = link.dataset.page + prog; // triggers route()
    return;
  }
  const tab = e.target.closest('[data-prog-tab]');
  if (tab) {
    currentProgram = tab.dataset.progTab;
    renderProgram(currentProgram);
    history.replaceState(null, '', '#program/' + currentProgram);
  }
});

/* ---------- Dropdown (desktop hover + click toggle) ---------- */
const dd = document.getElementById('programDropdown');
const toggle = dd.querySelector('.drop-toggle');
toggle.addEventListener('click', e => {
  e.preventDefault();
  dd.classList.toggle('open');
});
document.addEventListener('click', e => {
  if (!dd.contains(e.target)) dd.classList.remove('open');
});
dd.addEventListener('mouseenter', () => dd.classList.add('open'));
dd.addEventListener('mouseleave', () => dd.classList.remove('open'));

/* ---------- Mobile hamburger ---------- */
document.getElementById('hamburger').addEventListener('click', () =>
  document.getElementById('navLinks').classList.toggle('open'));

/* ---------- Apply form ---------- */
document.getElementById('applyForm').addEventListener('submit', e => {
  e.preventDefault();
  const wa = document.getElementById('waConfirm');
  if (!wa.checked) {
    alert('You MUST join the TechBridge WhatsApp Community before submitting.');
    return;
  }
  e.target.hidden = true;
  document.getElementById('applySuccess').hidden = false;
});

/* ---------- Init ---------- */
window.addEventListener('hashchange', route);
route();
