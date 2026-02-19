// =============================================
// RAVI VERMA FITNESS COACH - MAIN SCRIPT
// =============================================

// PRELOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    const pre = document.getElementById('pre');
    if (pre) pre.classList.add('hide');
  }, 2000);
});

// NAVBAR SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) nav.classList.add('sc');
  else nav.classList.remove('sc');
});

// MOBILE MENU
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mob');
const mc = document.getElementById('mc');
if (hbg) hbg.addEventListener('click', () => mob.classList.add('on'));
if (mc) mc.addEventListener('click', () => mob.classList.remove('on'));
document.querySelectorAll('.mob a').forEach(a => {
  a.addEventListener('click', () => mob.classList.remove('on'));
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// COUNTER ANIMATION
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + '+'; clearInterval(timer); }
    else el.textContent = Math.floor(start) + '+';
  }, 16);
}

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = true;
      animateCounter(entry.target, parseInt(entry.target.dataset.count));
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// AOS INIT
if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 80 });
}

// CONTACT FORM
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#00c853,#009624)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; form.reset(); }, 3000);
  });
}

// WHATSAPP CLICK TRACKING (Facebook Pixel)
document.querySelectorAll('.wa-link, .btn-w').forEach(el => {
  el.addEventListener('click', () => {
    if (typeof fbq !== 'undefined') fbq('track', 'Contact', { content_name: 'WhatsApp' });
  });
});

// FACEBOOK CLICK TRACKING
document.querySelectorAll('.fb-link, .btn-f').forEach(el => {
  el.addEventListener('click', () => {
    if (typeof fbq !== 'undefined') fbq('track', 'Contact', { content_name: 'Facebook' });
  });
});

// ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nlinks a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) link.style.color = '#00c853';
      else link.style.color = '';
    }
  });
});

// INSTAGRAM POSTS - Open in new tab
document.querySelectorAll('.ipost').forEach(post => {
  post.addEventListener('click', () => {
    window.open('https://www.instagram.com/ravi_fitnesscoach_/', '_blank');
  });
});

// BACK TO TOP
const backTop = document.getElementById('backTop');
if (backTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backTop.style.opacity = '1';
    else backTop.style.opacity = '0';
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
