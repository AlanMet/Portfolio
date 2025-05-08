
const toggleButton = document.querySelector("#theme-toggle");

function getSystemTheme(){
    return window.matchMedia("(preferes-color-scheme: dark)").matches ? "dark" : "light";
}

function getSavedTheme(){
    return localStorage.getItem("theme");
}

function applyTheme(theme){
    document.documentElement.setAttribute("data-theme", theme);
}

function setTheme(theme){
    localStorage.setItem("theme", theme);
    applyTheme(theme);
}

function toggleTheme(){
    console.log("clicked.");
    const current = getCurrentTheme();
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
}

function getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") || getSystemTheme();
}

function loaded(){
    const theme = getSavedTheme() || getSystemTheme();
    console.log(theme);
    applyTheme(theme);
}

document.addEventListener("DOMContentLoaded", loaded);
toggleButton.addEventListener("click", toggleTheme);