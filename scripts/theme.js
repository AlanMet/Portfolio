// scripts/theme.js

const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle.querySelector("i");

function updateIcon() {
    // Get the current theme directly from the HTML attribute
    const currentTheme = document.documentElement.getAttribute("data-theme");
    
    if (currentTheme === "dark") {
        themeIcon.classList.remove("ri-sun-line");
        themeIcon.classList.add("ri-moon-line");
    } else {
        themeIcon.classList.remove("ri-moon-line");
        themeIcon.classList.add("ri-sun-line");
    }
}

function toggleTheme() {
    themeIcon.classList.add("icon-animating");
    
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Set the new theme and save it
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Update the icon to reflect the new theme
    updateIcon();
}

// --- Event Listeners ---

// Update the icon as soon as the DOM is ready
document.addEventListener("DOMContentLoaded", updateIcon);

// Listen for clicks on the toggle button
themeToggle.addEventListener("click", toggleTheme);

// Clean up the animation class
themeIcon.addEventListener("animationend", () => {
    themeIcon.classList.remove("icon-animating");
});