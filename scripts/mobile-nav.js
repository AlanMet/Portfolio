const navToggles = document.querySelectorAll('.nav-toggle');
const body = document.body;
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-top a, .mobile-nav-bottom a');

function closeNav() {
    body.classList.remove('nav-open');
}

// Toggle menu when any hamburger is clicked
navToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from bubbling to document
        body.classList.toggle('nav-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (body.classList.contains('nav-open') && 
        !mobileNav.contains(e.target) && 
        !navToggle.contains(e.target)) {
        closeNav();
    }
});

// Close menu when clicking on links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeNav();
    });
});

// Close menu when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('nav-open')) {
        closeNav();
    }
});

// Prevent clicks inside mobile nav from closing the menu
mobileNav.addEventListener('click', (e) => {
    e.stopPropagation();
});