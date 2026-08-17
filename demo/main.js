gsap.registerPlugin(ScrollTrigger);
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Lenis smooth scroll ---------- */
let lenis = null;
if (!reduced && window.Lenis) {
  lenis = new Lenis({ duration: 1.25, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
// anchor links through lenis
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -70 });
    else target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------- custom cursor ---------- */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if (window.matchMedia('(hover:hover)').matches) {
  let mx = -100, my = -100, rx = -100, ry = -100;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  gsap.ticker.add(() => {
    rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
  });
  document.querySelectorAll('a,button,.menu-card,.gallery figure').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('grow'));
    el.addEventListener('mouseleave', () => ring.classList.remove('grow'));
  });
}

/* ---------- magnetic buttons ---------- */
if (window.matchMedia('(hover:hover)').matches && !reduced) {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4 });
    });
    el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' }));
  });
}

/* ---------- split headline chars ---------- */
function splitChars(el) {
  const text = el.textContent;
  el.textContent = '';
  const frag = document.createDocumentFragment();
  text.split(' ').forEach((word, wi, arr) => {
    const w = document.createElement('span');
    w.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top';
    word.split('').forEach(ch => {
      const c = document.createElement('span');
      c.className = 'char';
      c.textContent = ch;
      w.appendChild(c);
    });
    frag.appendChild(w);
    if (wi < arr.length - 1) frag.appendChild(document.createTextNode(' '));
  });
  el.appendChild(frag);
  return el.querySelectorAll('.char');
}

/* ---------- preloader ---------- */
const preloader = document.getElementById('preloader');
const preWord = document.getElementById('preloaderWord');
const preChars = splitChars(preWord);
const counter = { v: 0 };
const countEl = document.getElementById('preloaderCount');

const introTl = gsap.timeline();
if (reduced) {
  preloader.style.display = 'none';
  document.querySelectorAll('.will-reveal').forEach(el => (el.style.opacity = 1));
} else {
  introTl
    .to(preChars, { y: 0, duration: 0.9, stagger: 0.035, ease: 'power4.out', startAt: { y: '110%' } })
    .to('#preloaderBar', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0.1)
    .to(counter, {
      v: 100, duration: 1.6, ease: 'power2.inOut',
      onUpdate: () => (countEl.textContent = String(Math.round(counter.v)).padStart(2, '0'))
    }, 0.1)
    .to(preChars, { y: '-110%', duration: 0.7, stagger: 0.025, ease: 'power3.in' }, '+=0.15')
    .to('.preloader-count,.preloader-bar', { opacity: 0, duration: 0.4 }, '<')
    .to(preloader, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' })
    .to('#curtain', { scaleY: 1, duration: 0.01 }, '<')
    .set(preloader, { display: 'none' })
    .to('#curtain', { scaleY: 0, transformOrigin: 'bottom', duration: 0.9, ease: 'power4.inOut' }, '<0.15')
    // hero entrance
    .from('.site-header', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .from('#heroTitle .line > span', { yPercent: 110, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, '-=0.6')
    .fromTo('.hero [data-fade]', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, '-=0.7')
    .fromTo('.hero-media', { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=1.0');
  // mark hero fades as done so scroll triggers skip them
  introTl.eventCallback('onComplete', () => {
    document.querySelectorAll('.hero [data-fade]').forEach(el => el.classList.add('revealed'));
  });
}

/* ---------- scroll reveals ---------- */
if (!reduced) {
  document.querySelectorAll('[data-fade]').forEach(el => {
    if (el.closest('.hero')) return; // handled by intro timeline
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onComplete: () => el.classList.add('revealed')
    });
  });

  document.querySelectorAll('[data-split]').forEach(el => {
    const chars = splitChars(el);
    gsap.fromTo(chars, { yPercent: 110, rotate: 4 }, {
      yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.012, ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true }
    });
    el.style.opacity = 1;
    el.classList.add('revealed');
  });

  /* parallax layers */
  document.querySelectorAll('[data-parallax]').forEach(el => {
    gsap.to(el, {
      yPercent: parseFloat(el.dataset.parallax) * 100, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
    });
  });
  document.querySelectorAll('[data-parallax-img]').forEach(img => {
    gsap.fromTo(img, { yPercent: -8, scale: 1.15 }, {
      yPercent: 8, scale: 1.15, ease: 'none',
      scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
  });
  document.querySelectorAll('[data-float]').forEach(el => {
    gsap.fromTo(el, { y: 60 }, {
      y: -60, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.4 }
    });
  });

  /* hero image ken-burns */
  gsap.to('#heroImg', {
    scale: 1.02, duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true
  });

  /* marquee */
  const track = document.getElementById('marqueeTrack');
  const marqueeTween = gsap.to(track, { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });
  ScrollTrigger.create({
    trigger: '.marquee', start: 'top bottom', end: 'bottom top',
    onUpdate: self => marqueeTween.timeScale(1 + Math.abs(self.getVelocity()) / 900)
  });

  /* video parallax */
  gsap.fromTo('#ambienceVideo', { yPercent: -6 }, {
    yPercent: 6, ease: 'none',
    scrollTrigger: { trigger: '.video-wrap', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });

  /* scroll progress */
  gsap.to('.scroll-progress', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
  });
}

/* ---------- counters ---------- */
document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || 0, 10);
  if (reduced) { el.textContent = target.toFixed(decimals); return; }
  const obj = { v: 0 };
  ScrollTrigger.create({
    trigger: el, start: 'top 88%', once: true,
    onEnter: () => gsap.to(obj, {
      v: target, duration: 1.8, ease: 'power2.out',
      onUpdate: () => (el.textContent = obj.v.toFixed(decimals))
    })
  });
});

/* ---------- header on scroll ---------- */
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
if (lenis) lenis.on('scroll', e => header.classList.toggle('scrolled', e.scroll > 40));
onScroll();

/* ---------- video play/pause ---------- */
const video = document.getElementById('ambienceVideo');
const playBtn = document.getElementById('videoPlay');
// autoplay when in view
ScrollTrigger.create({
  trigger: '.video-wrap', start: 'top 80%', end: 'bottom 20%',
  onEnter: () => { video.play().then(() => playBtn.classList.add('hidden')).catch(() => {}); },
  onLeave: () => video.pause(),
  onEnterBack: () => { video.play().catch(() => {}); },
  onLeaveBack: () => video.pause()
});
playBtn.addEventListener('click', () => {
  if (video.paused) { video.play(); playBtn.classList.add('hidden'); }
});
video.addEventListener('click', () => {
  if (video.paused) { video.play(); playBtn.classList.add('hidden'); }
  else { video.pause(); playBtn.classList.remove('hidden'); playBtn.textContent = '▶'; }
});
