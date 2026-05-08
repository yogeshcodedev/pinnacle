// ── NAV TOGGLE (MOBILE) ──────────────────────────────────────────
const navbtn = document.getElementById('navbtn');
const navbox = document.getElementById('navbox');
const navicon = document.getElementById('navicon');

navbtn.addEventListener('click', () => {
    navbox.classList.toggle('hidden');
    if (navbox.classList.contains('hidden')) {
        navicon.classList.remove('fa-xmark');
        navicon.classList.add('fa-bars');
    } else {
        navicon.classList.remove('fa-bars');
        navicon.classList.add('fa-xmark');
    }
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
    if (!navbox.contains(e.target) && !navbtn.contains(e.target)) {
        if (!navbox.classList.contains('hidden')) {
            navbox.classList.add('hidden');
            navicon.classList.remove('fa-xmark');
            navicon.classList.add('fa-bars');
        }
    }
});

// Close nav on nav link click (mobile)
navbox.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
            navbox.classList.add('hidden');
            navicon.classList.remove('fa-xmark');
            navicon.classList.add('fa-bars');
        }
    });
});

// ── STICKY HEADER ────────────────────────────────────────────────
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ── SCROLL TO TOP BUTTON ─────────────────────────────────────────
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// ── FADE-IN ANIMATION ─────────────────────────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ── COUNTER ANIMATION ─────────────────────────────────────────────
function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString('en-IN') + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ── FLOOR PLAN TABS ───────────────────────────────────────────────
function showPlan(id, btn) {
    document.querySelectorAll('.plan-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
}

// ── SPECIFICATION TABS ────────────────────────────────────────────
function showSpec(id, btn) {
    document.querySelectorAll('.stab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.stab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
}

// ── GALLERY LIGHTBOX ──────────────────────────────────────────────
function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
    if (e.target === document.getElementById('lightbox')) {
        document.getElementById('lightbox').classList.remove('open');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('lightbox').classList.remove('open');
        document.body.style.overflow = '';
    }
});

// ── CONTACT FORM ──────────────────────────────────────────────────
function submitForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.f-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
        document.getElementById('successMsg').style.display = 'block';
        btn.textContent = 'Send Enquiry';
        btn.disabled = false;
        e.target.reset();
        setTimeout(() => {
            document.getElementById('successMsg').style.display = 'none';
        }, 5000);
    }, 1200);
}

// ── ACTIVE NAV HIGHLIGHT ON SCROLL ───────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.style.color = link.getAttribute('href') === '#' + id ? '#c9963a' : '';
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));
