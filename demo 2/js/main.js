/* ═══════════════════════════════════════════════════════════════
   SPICE PETALS — main.js
   Everything here is plain JavaScript, no libraries.
   ═══════════════════════════════════════════════════════════════ */

/* ── 1. Sticky nav (adds a background once you scroll) ───────── */
const nav = document.getElementById("site-nav");
if (nav) {
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ── 2. Mobile menu ───────────────────────────────────────────── */
const toggle = document.getElementById("nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");
if (toggle && mobileMenu) {
  toggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  // Close the menu when a link inside it is tapped
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ── 3. Scroll reveals (fade-in as sections appear) ───────────── */
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((el) => observer.observe(el));
} else {
  // Fallback: show everything
  revealItems.forEach((el) => el.classList.add("in"));
}

/* ── 4. Photo viewer (lightbox) ───────────────────────────────── */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxCount = document.getElementById("lightbox-count");
const items = Array.from(document.querySelectorAll(".gallery-item"));
let current = 0;

function showPhoto(index) {
  current = (index + items.length) % items.length;
  const item = items[current];
  lightboxImg.src = item.dataset.src;
  lightboxImg.alt = item.dataset.caption;
  lightboxCaption.textContent = item.dataset.caption;
  lightboxCount.textContent = `${current + 1} / ${items.length}`;
  lightbox.hidden = false;
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
}

if (lightbox && items.length) {
  items.forEach((item, i) => item.addEventListener("click", () => showPhoto(i)));

  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev").addEventListener("click", () => showPhoto(current - 1));
  document.getElementById("lightbox-next").addEventListener("click", () => showPhoto(current + 1));

  // Click the dark backdrop to close
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  // Keyboard: ← / → to browse, Esc to close
  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showPhoto(current + 1);
    if (event.key === "ArrowLeft") showPhoto(current - 1);
  });
}

/* ── 5. Cookie & policies banner (shows once, first visit) ────── */
const banner = document.getElementById("cookie-banner");
const CONSENT_KEY = "spice-petals-cookie-consent";

function showBanner() {
  banner.classList.add("visible");
}

function hideBanner() {
  banner.classList.remove("visible");
}

if (banner) {
  // First visit: show after a short beat
  if (!localStorage.getItem(CONSENT_KEY)) {
    setTimeout(showBanner, 1200);
  }

  document.getElementById("cookie-accept").addEventListener("click", () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    hideBanner();
  });

  document.getElementById("cookie-decline").addEventListener("click", () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    hideBanner();
  });

  // Footer "Cookie settings" re-opens the banner
  const settings = document.getElementById("cookie-settings");
  if (settings) settings.addEventListener("click", showBanner);
}

/* ── 6. Footer year ───────────────────────────────────────────── */
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
