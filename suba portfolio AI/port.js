const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let stars = [], W, H;
function initStars() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  stars = [];
  const N = Math.floor((W * H) / 4000);
  for (let i = 0; i < N; i++) {
    stars.push({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.005,
      speed: Math.random() * 0.15 + 0.05
    });
  }
}
function drawStars() {
  ctx.clearRect(0, 0, W, H);
  for (const s of stars) {
    s.a += s.da;
    if (s.a <= 0 || s.a >= 1) s.da *= -1;
    s.y -= s.speed;
    if (s.y < 0) { s.y = H; s.x = Math.random() * W; }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,180,255,${s.a})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
initStars();
drawStars();
window.addEventListener('resize', initStars);

/* ===== TYPING EFFECT ===== */
const typingTargets = ['Subasri', 'Developer', 'Designer', 'ProjectCoordinator'];
let ti = 0, ci = 0, deleting = false;
const nameEl = document.getElementById('hero-name');
function typeLoop() {
  const current = typingTargets[ti];
  if (!deleting) {
    nameEl.textContent = current.slice(0, ++ci);
    if (ci === current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    nameEl.textContent = current.slice(0, --ci);
    if (ci === 0) { deleting = false; ti = (ti + 1) % typingTargets.length; setTimeout(typeLoop, 300); return; }
  }
  setTimeout(typeLoop, deleting ? 60 : 100);
}
typeLoop();

/* ===== MOUSE PARALLAX on hero visual ===== */
document.addEventListener('mousemove', e => {
  const mx = (e.clientX / window.innerWidth - 0.5) * 20;
  const my = (e.clientY / window.innerHeight - 0.5) * 20;
  const frame = document.querySelector('.glass-frame');
  const ring = document.querySelector('.orbit-ring');
  if (frame) frame.style.transform = `perspective(800px) rotateY(${-10 + mx * 0.3}deg) rotateX(${5 + my * 0.2}deg)`;
  if (ring) ring.style.transform = `translate(-50%,-50%) rotateX(75deg) translateX(${mx * 0.5}px)`;
});

/* ===== SCROLL REVEAL ===== */
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
reveals.forEach(el => obs.observe(el));

/* ===== ACTIVE NAV ===== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navItems.forEach(n => n.classList.remove('active'));
      const active = document.querySelector(`.nav-item[data-section="${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObs.observe(s));

/* ===== SMOOTH SCROLL for nav links ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ===== THEME TOGGLE (light/dark accent swap) ===== */
let lightMode = false;
function toggleTheme() {
  lightMode = !lightMode;
  document.documentElement.style.setProperty('--bg', lightMode ? '#0d0014' : '#050508');
  document.documentElement.style.setProperty('--purple', lightMode ? '#d400ff' : '#a855f7');
}

/* ===== SKILL TAG HOVER SPARKLE ===== */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05) translateY(-2px)';
  });
  tag.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});