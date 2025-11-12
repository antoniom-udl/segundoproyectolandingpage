// main.js - animaciones, reveal, progress bars, toast, lazy-loading, year fade
document.addEventListener('DOMContentLoaded', () => {
/* --------------------- Helper: add reveal class to many elements --------------------- */
const selectorsToReveal = [
'.card', '.section-title', '.section-title h4', '.carousel-caption .hero-overlay',
'.aside-card', '.scrollspy-panel .row > div', '#destacados .card-body', '.opiniones .carousel-item img',
'.reposteria', '.menu-eq .card', '.toast'
];


// add reveal class automatically (so you don't have to touch HTML)
selectorsToReveal.forEach(sel => {
document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
});


/* --------------------- IntersectionObserver for reveal --------------------- */
const revealObserver = new IntersectionObserver((entries, ob) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('in-view');
// small optimization: stop observing once visible
ob.unobserve(entry.target);
}
});
}, {threshold: 0.12});


document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* --------------------- Progress bars animation --------------------- */
document.querySelectorAll('.progress-bar').forEach(pb => {
// store the target (from inline style or attribute)
const real = pb.style.width || pb.getAttribute('aria-valuenow') + '%' || pb.dataset.width || '0%';
pb.dataset.targetWidth = real;
// start at 0 so we can animate
pb.style.width = '0';
});


const pbObserver = new IntersectionObserver((entries, ob) => {
entries.forEach(entry => {
if (!entry.isIntersecting) return;
const el = entry.target;
const target = el.dataset.targetWidth || '0%';
// small delay for stagger feel
setTimeout(() => { el.style.width = target; }, 80);
ob.unobserve(el);
});
}, {threshold: 0.25});


document.querySelectorAll('.progress-bar').forEach(el => pbObserver.observe(el));


/* --------------------- Lazy-load images (except hero carousel) --------------------- */
document.querySelectorAll('img').forEach(img => {
// skip images already explicitly marked (for example hero images)
if (img.closest('#heroCarousel') || img.hasAttribute('data-no-lazy')) return;
if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
});


});