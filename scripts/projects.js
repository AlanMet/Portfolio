import colorManager from './colorManager.js';

/**
 * Renders all projects into the grid.
 * This function now accepts the project data as an argument.
 */
function renderProjects(projectsData) {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;
  grid.innerHTML = '';

  for (const project of projectsData) {
    const tagsHtml = project.tags.map(tag => {
      const color = colorManager.getColor(tag);
      return `<span style="background-color: ${color};">${tag}</span>`;
    }).join('');

    const tagColors = project.tags.map(tag => colorManager.getColor(tag));
    // Mix first two colors for border, or use first color if only one tag
    const mixedBorderColor = tagColors.length > 1 
        ? colorManager.mixColors(tagColors[0], tagColors[1])
        : tagColors[0];

    const projectCardHtml = `
      <a href="/project-detail.html?title=${encodeURIComponent(project.title)}" class="project-link">
        <article class="project-card" style="border-left-color: ${mixedBorderColor};">
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="project-tags">
            ${tagsHtml}
          </div>
        </article>
      </a>
    `;
    grid.insertAdjacentHTML('beforeend', projectCardHtml);
  }
}

/**
 * Main function to fetch data and initialize the projects page.
 */
async function initializeProjects() {
  try {
    const response = await fetch('./data/projects.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const projectsData = await response.json();
    renderProjects(projectsData);
    
    // After rendering projects, fetch and apply the current language
    const currentLang = localStorage.getItem('lang') || 'en';
    const translationData = await fetchTranslationData(currentLang);
    applyTranslations(translationData);
    
    return true;
  } catch (error) {
    console.error("Could not fetch or render projects:", error);
    return false;
  }
}

// Export for use in language.js
window.initializeProjects = initializeProjects;

// Run the initialization function when the DOM is ready.
document.addEventListener('DOMContentLoaded', initializeProjects);