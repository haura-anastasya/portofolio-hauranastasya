
// ======================================
// HAURA ANASTASYA — PORTFOLIO JAVASCRIPT
// ======================================


// 1. GLOBAL SETTINGS

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


// ======================================
// 2. INTRO / WELCOME SCREEN
// ======================================

const introScreen = document.getElementById("introScreen");
const introTyping = document.getElementById("introTyping");
const introLoadingBar = document.getElementById("introLoadingBar");

const introText = "haura-portfolio.com";

let introIndex = 0;
let introTimeout;

function hideIntro() {
    if (!introScreen) return;

    introScreen.classList.add("hide");

    setTimeout(() => {
        introScreen.remove();
    }, prefersReducedMotion ? 0 : 1100);
}

function typeIntro() {
    if (!introTyping || !introScreen) return;

    if (introIndex < introText.length) {
        introTyping.textContent += introText.charAt(introIndex);
        introIndex++;

        introTimeout = setTimeout(typeIntro, 75);
    } else {
        introTimeout = setTimeout(hideIntro, 700);
    }
}

window.addEventListener("load", () => {

    if (!introScreen) return;

    if (prefersReducedMotion) {
        hideIntro();
        return;
    }

    if (introLoadingBar) {
        requestAnimationFrame(() => {
            introLoadingBar.style.width = "100%";
        });
    }

    typeIntro();

});

// Fallback if intro takes too long
setTimeout(() => {
    if (introScreen && document.body.contains(introScreen)) {
        clearTimeout(introTimeout);
        hideIntro();
    }
}, 7000);


// ======================================
// 3. HERO TYPING ANIMATION
// ======================================

const heroTyping = document.getElementById("heroTyping");

const heroRoles = [
    "Creative Designer",
    "Website Developer",
    "Game Designer",
    "Marketing Communication Enthusiast",
    "Digital Content Creator"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let heroTimeout;

function typeHero() {

    if (!heroTyping) return;

    const currentRole = heroRoles[roleIndex];

    charIndex += isDeleting ? -1 : 1;

    heroTyping.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 40 : 75;

    if (!isDeleting && charIndex === currentRole.length) {

        isDeleting = true;
        speed = 1700;

    } else if (isDeleting && charIndex === 0) {

        isDeleting = false;

        roleIndex = (roleIndex + 1) % heroRoles.length;

        speed = 400;

    }

    heroTimeout = setTimeout(typeHero, speed);
}

if (heroTyping) {

    if (prefersReducedMotion) {

        heroTyping.textContent = heroRoles[0];

    } else {

        typeHero();

    }

}


// ======================================
// 4. MOBILE NAVIGATION
// ======================================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

function closeMobileMenu() {

    if (!nav || !menuBtn) return;

    nav.classList.remove("open");

    menuBtn.textContent = "☰";

    menuBtn.setAttribute("aria-expanded", "false");

}

if (menuBtn && nav) {

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("open");

        menuBtn.textContent = isOpen ? "✕" : "☰";

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

    // Close menu after clicking navigation links

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMobileMenu);

    });

    // Close menu when clicking outside

    document.addEventListener("click", event => {

        if (
            !nav.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            closeMobileMenu();

        }

    });

    // Close menu when switching to desktop view

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {
            closeMobileMenu();
        }

    });

}


// ======================================
// 5. SCROLL REVEAL ANIMATION
// ======================================

const revealElements = document.querySelectorAll(".reveal");

if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion
) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("show");

    });

}


// ======================================
// 6. MOUSE SPOTLIGHT EFFECT
// ======================================

const mouseGlow = document.querySelector(".mouse-glow");

const supportsMouse = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;

if (
    mouseGlow &&
    supportsMouse &&
    !prefersReducedMotion
) {

    document.addEventListener("mousemove", event => {

        mouseGlow.style.left = `${event.clientX}px`;

        mouseGlow.style.top = `${event.clientY}px`;

        mouseGlow.style.opacity = "1";

    });

    document.addEventListener("mouseleave", () => {

        mouseGlow.style.opacity = "0";

    });

}


// ======================================
// 7. SCROLL PROGRESS BAR
// ======================================

const progressBar = document.getElementById("scrollProgress");

function updateProgress() {

    if (!progressBar) return;

    const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollHeight > 0
        ? (window.scrollY / scrollHeight) * 100
        : 0;

    progressBar.style.width = `${progress}%`;

}

window.addEventListener("scroll", updateProgress, {
    passive: true
});

window.addEventListener("resize", updateProgress);

updateProgress();


// ======================================
// 8. BACK TO TOP BUTTON
// ======================================

const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {

    if (!backToTop) return;

    backToTop.classList.toggle(
        "visible",
        window.scrollY > 400
    );

}

window.addEventListener("scroll", toggleBackToTop, {
    passive: true
});

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: prefersReducedMotion ? "auto" : "smooth"

        });

    });

}

toggleBackToTop();


// ======================================
// 9. AUTOMATIC FOOTER YEAR
// ======================================

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


// ======================================
// 10. IMAGE FALLBACK
// ======================================

// Prevent broken images from looking distracting

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        img.classList.add("image-error");

    });

});


// ======================================
// END OF PORTFOLIO JAVASCRIPT
// ======================================
