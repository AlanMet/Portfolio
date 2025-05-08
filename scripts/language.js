const defaultLanguage = "en";
const languagePath = "/languages/";
const languageSelector = document.querySelector("#lang-select");

function setLanguage(lang) {
    localStorage.setItem("lang", lang);
    configurePageLanguage(lang);
    loadAndApplyTranslations(lang);
}

function handleTranslationError(error) {
    console.error("Translation error:", error);
}
  

function applyTranslations(data) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (data[key]) {
        el.textContent = data[key];
      }
    });
}

function fetchTranslationData(lang) {
    return fetch(`/languages/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            return data;
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

function changeLanguage(){
    setLanguage(languageSelector.value);
}

function loaded(){
const lang = getInitialLanguage();
  configurePageLanguage(lang);
  loadAndApplyTranslations(lang);
}

document.addEventListener("DOMContentLoaded", loaded);
languageSelector.addEventListener("change", changeLanguage);