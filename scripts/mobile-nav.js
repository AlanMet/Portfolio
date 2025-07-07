const navToggle = document.querySelector('.nav-toggle');
const body = document.body;

// First, check if the toggle button exists on the page
if (navToggle) {
    navToggle.addEventListener('click', () => {
        // When the button is clicked, it adds or removes the '.nav-open' class from the <body> tag
        body.classList.toggle('nav-open');
    });
}