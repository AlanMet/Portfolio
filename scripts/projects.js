// A color map for technology tags.
const tagColors = {
  "JavaScript": "#F7DF1E", "Python": "#3776AB", "Dart": "#0175C2", "C#": "#9B4F96",
  "Flutter": "#02569B", "Tkinter": "#FFD580", "Machine Learning": "#F9872A", "NLP": "#4CAF50",
  "Reinforcement Learning": "#E91E63", "WebSockets": "#2196F3", "Firebase": "#FFCA28",
  "Leadership": "#607D8B", "Research": "#795548", "Cybersecurity": "#F44336",
  "Linear Algebra": "#00BCD4", "UX Design": "#009688", "default": "#6c757d"
};

// --- Color mixing helper functions (no changes here) ---
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

function mixColors(colorArray) {
  const rgbColors = colorArray.map(hex => hexToRgb(hex)).filter(c => c !== null);
  if (rgbColors.length === 0) return tagColors.default;
  const total = rgbColors.reduce((acc, c) => { acc.r += c.r; acc.g += c.g; acc.b += c.b; return acc; }, { r: 0, g: 0, b: 0 });
  const avg = { r: Math.round(total.r / rgbColors.length), g: Math.round(total.g / rgbColors.length), b: Math.round(total.b / rgbColors.length) };
  return `rgb(${avg.r}, ${avg.g}, ${avg.b})`;
}

/**
 * Renders all projects into the grid.
 * This function now accepts the project data as an argument.
 */
function renderProjects(projectsData) {
  // Get language from <html lang="..."> or default to 'en'
  var lang = document.documentElement.lang || 'en';
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;
  grid.innerHTML = '';

  for (const project of projectsData) {
    let tagsHtml = '';
    let mixedBorderColor = tagColors && tagColors.default ? tagColors.default : '#eee';
    if (project.tags) {
      tagsHtml = project.tags.map(tag => {
        const color = tagColors && tagColors[tag] ? tagColors[tag] : (tagColors && tagColors.default ? tagColors.default : '#eee');
        return `<span style="background-color: ${color};">${tag}</span>`;
      }).join('');
      if (typeof mixColors === 'function') {
        const tagColorValues = project.tags.map(tag => tagColors && tagColors[tag] ? tagColors[tag] : (tagColors && tagColors.default ? tagColors.default : '#eee'));
        mixedBorderColor = mixColors(tagColorValues);
      }
    }

    // New format: has id, title, summary, description
    if (project.id && project.title && project.title[lang]) {
      const hasDetail = project.description && project.description[lang];
      const url = hasDetail ? `project-detail.html?id=${project.id}` : project.github;
      const projectCardHtml = `
        <a href="${url}" target="${hasDetail ? '_self' : '_blank'}" rel="noopener noreferrer" class="project-link">
          <article class="project-card" style="border-left-color: ${mixedBorderColor};">
            <h3>${project.title[lang]}</h3>
            ${project.summary && project.summary[lang] ? `<p>${project.summary[lang]}</p>` : ''}
              ${''}
            <div class="project-tags">
              ${tagsHtml}
            </div>
          </article>
        </a>
      `;
      grid.insertAdjacentHTML('beforeend', projectCardHtml);
    } else {
      // Old format: titleKey, descKey, link
      const projectCardHtml = `
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
          <article class="project-card" style="border-left-color: ${mixedBorderColor};">
            <h3 data-i18n="${project.titleKey}"></h3>
            <p data-i18n="${project.descKey}"></p>
            <div class="project-tags">
              ${tagsHtml}
            </div>
          </article>
        </a>
      `;
      grid.insertAdjacentHTML('beforeend', projectCardHtml);
    }
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
  } catch (error) {
    console.error("Could not fetch or render projects:", error);
  }
}

// Run the initialization function when the DOM is ready.
document.addEventListener('DOMContentLoaded', initializeProjects);