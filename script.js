document.addEventListener('DOMContentLoaded', function () {

    // ═══════════════════════════════════════
    // TYPING EFFECT
    // ═══════════════════════════════════════
    const subtitleEl = document.getElementById('typed-subtitle');
    if (subtitleEl) {
        const phrases = [
            'CS Senior at Stony Brook University',
            'Computer Vision Researcher',
            'Deep Learning Engineer',
            'CEO of CO;Ders Us'
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let speed = 80;

        function typeEffect() {
            const current = phrases[phraseIdx];
            if (isDeleting) {
                subtitleEl.textContent = current.substring(0, charIdx - 1);
                charIdx--;
                speed = 40;
            } else {
                subtitleEl.textContent = current.substring(0, charIdx + 1);
                charIdx++;
                speed = 80;
            }

            if (!isDeleting && charIdx === current.length) {
                speed = 2200;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                speed = 400;
            }

            setTimeout(typeEffect, speed);
        }

        setTimeout(typeEffect, 700);
    }

    // ═══════════════════════════════════════
    // NAVBAR SCROLL EFFECTS
    // ═══════════════════════════════════════
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-resume-btn)');

    function updateNavbar() {
        const scrollY = window.pageYOffset;

        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ═══════════════════════════════════════
    // SCROLL PROGRESS BAR
    // ═══════════════════════════════════════
    const progressBar = document.getElementById('scrollProgress');

    function updateProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }

    // ═══════════════════════════════════════
    // SCROLL REVEAL
    // ═══════════════════════════════════════
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.reveal').forEach((el) => {
        const parent = el.parentElement;
        const siblings = parent.querySelectorAll('.reveal');
        const siblingIndex = Array.from(siblings).indexOf(el);
        el.dataset.delay = siblingIndex * 80;
        revealObserver.observe(el);
    });

    // ═══════════════════════════════════════
    // MOBILE NAV TOGGLE
    // ═══════════════════════════════════════
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function closeMobileMenu() {
        if (navMenu && navMenu.classList.contains('is-open')) {
            navMenu.classList.remove('is-open');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', '메뉴 열기');
            }
            document.body.classList.remove('menu-open');
        }
    }

    function openMobileMenu() {
        if (navMenu) {
            navMenu.classList.add('is-open');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'true');
                navToggle.setAttribute('aria-label', '메뉴 닫기');
            }
            document.body.classList.add('menu-open');
        }
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            if (navMenu.classList.contains('is-open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }

    // ═══════════════════════════════════════
    // SMOOTH SCROLL FOR NAV LINKS
    // ═══════════════════════════════════════
    const allNavLinks = document.querySelectorAll('.nav-menu a[href^="#"], .hero-buttons a[href^="#"]');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                closeMobileMenu();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    // ═══════════════════════════════════════
    // COMBINED SCROLL LISTENER
    // ═══════════════════════════════════════
    let ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNavbar();
                updateProgress();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Footer year
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    updateNavbar();
    updateProgress();
});
