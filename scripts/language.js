const defaultLanguage = "en";
const languagePath = "/languages/";
const languageSelectors = document.querySelectorAll("#lang-select, #mobile-lang-select");

function setLanguage(lang) {
    localStorage.setItem("lang", lang);
    configurePageLanguage(lang);
    loadAndApplyTranslations(lang);
    // Update both selectors
    languageSelectors.forEach(selector => {
        if (selector.value !== lang) {
            selector.value = lang;
        }
    });
}

function handleTranslationError(error) {
    console.error("Translation error:", error);
}
  

function applyTranslations(data) {
    console.log("Applying translations");
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (data[key]) {
        el.textContent = data[key];
      }
    });
}

const languageCache = {};

function fetchTranslationData(lang) {
    if (languageCache[lang]) {
        return Promise.resolve(languageCache[lang]);
    }

    console.log(`Fetching ${lang}...`);
    return fetch(`./languages/${lang}.json`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            return response.json();
        })
        .then(data => {
            languageCache[lang] = data;
            return data;
        })
        .catch(err => {
            console.error("Translation load error:", err.message);
        });
}

function loadAndApplyTranslations(lang) {
    fetchTranslationData(lang)
    .then(applyTranslations)
    .catch(handleTranslationError);
}

function isRightToLeft(lang) {
    const rtlLanguages = ["ar", "ja"];
    return rtlLanguages.includes(lang);
}

function setLanguageAttributes(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRightToLeft(lang) ? "rtl" : "ltr";
}

function configurePageLanguage(lang) {
    setLanguageAttributes(lang);
}

function getBrowserLanguage(){
    return navigator.language.split("-")[0] || "en";
}

function getSavedLanguage(){
    return localStorage.getItem("lang");
}

function getInitialLanguage(){
    return getSavedLanguage() || getBrowserLanguage();
}

function changeLanguage(event) {
    setLanguage(event.target.value);
}

async function loaded() {
    // First, check if the project initializer function exists
    if (typeof initializeProjects === 'function') {
        // If it exists, wait for it to finish loading and rendering the projects
        await initializeProjects();
    }
    
    // NOW, with the projects loaded, proceed with translation
    const lang = getInitialLanguage();
    
    // Set initial value for all selectors
    languageSelectors.forEach(selector => {
        selector.value = lang;
    });
    
    configurePageLanguage(lang);
    loadAndApplyTranslations(lang);
}

document.addEventListener("DOMContentLoaded", loaded);

// Add change event listeners to all language selectors
languageSelectors.forEach(selector => {
    selector.addEventListener("change", changeLanguage);
});