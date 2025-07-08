// scripts/theme.js

const themeToggles = document.querySelectorAll("#theme-toggle, #mobile-theme-toggle");
const themeIcons = document.querySelectorAll("#theme-toggle i, #mobile-theme-toggle i");

function updateIcons() {
    // Get the current theme directly from the HTML attribute
    const currentTheme = document.documentElement.getAttribute("data-theme");
    
    themeIcons.forEach(icon => {
        if (currentTheme === "dark") {
            icon.classList.remove("ri-sun-line");
            icon.classList.add("ri-moon-line");
        } else {
            icon.classList.remove("ri-moon-line");
            icon.classList.add("ri-sun-line");
        }
    });
}

function toggleTheme() {
    themeIcons.forEach(icon => icon.classList.add("icon-animating"));
    
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Set the new theme and save it
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Update the icons to reflect the new theme
    updateIcons();
}

// --- Event Listeners ---

// Update the icons as soon as the DOM is ready
document.addEventListener("DOMContentLoaded", updateIcons);

// Listen for clicks on the toggle buttons
themeToggles.forEach(toggle => {
    toggle.addEventListener("click", toggleTheme);
});

// Clean up the animation class
themeIcons.forEach(icon => {
    icon.addEventListener("animationend", () => {
        icon.classList.remove("icon-animating");
    });
});