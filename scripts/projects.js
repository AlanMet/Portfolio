const tagColors = {
  // Existing Tags - Brighter/Distinct Colors
  "JavaScript": "#F7DF1E", // Kept bright yellow
  "Python": "#3498DB",     // Brighter blue
  "Dart": "#40C4FF",     // Lighter, vibrant blue
  "C#": "#A020F0",     // Vibrant purple
  "Flutter": "#42A5F5",     // Material Design blue
  "Tkinter": "#FFA726",     // Brighter orange
  "Machine Learning": "#FF7043", // Deep Orange (more distinct from other oranges)
  "NLP": "#66BB6A",     // Brighter green
  "Reinforcement Learning": "#EC407A", // Vibrant pink
  "WebSockets": "#29B6F6",     // Light Blue
  "Firebase": "#FFCA28",     // Kept yellow-orange
  "Leadership": "#26A69A",     // Teal
  "Research": "#BA68C8",     // Light Purple
  "Cybersecurity": "#EF5350", // Slightly lighter red
  "Linear Algebra": "#26C6DA", // Brighter cyan
  "UX Design": "#00ACC1",     // Stronger Cyan/Teal
  "From Scratch": "#9CCC65",     // Brighter light green
  "Library": "#AB47BC",     // Medium Purple
  "Mobile": "#FFA000",     // Amber/Orange
  "Game Development": "#EF5350", // Red (Distinct)
  ".NET": "#7E57C2",     // Deep Purple
  "Engine": "#FF7043",     // Deep Orange
  "Numerical Computing": "#5C6BC0", // Indigo
  "Security": "#F44336",     // Kept Red
  "Encryption": "#78909C",     // Blue Grey
  "Node.js": "#8CC84B",     // Brighter Node green
  "TypeScript": "#3178C6",     // Kept TypeScript blue
  "AI": "#FF9100",     // Vibrant Orange
  "LLM": "#FF6D00",     // Strong Orange
  "Graphics": "#4CAF50",     // Kept green
  "JWT": "#757575",     // Medium Grey
  "default": "#BDBDBD",     // Lighter gray

  // Added Tags from your JSON data
  "Full-Stack": "#7E57C2",      // Deep Purple (shared with .NET for consistency)
  "Web Development": "#29B6F6", // Light Blue (shared with WebSockets)
  "Blockchain": "#FFD54F",      // Amber
  "REST API": "#B0BEC5",      // Light Blue Grey
  "SQL": "#D32F2F",      // Darker Red
  "Mobile Development": "#FFB74D", // Light Orange
  "UI/UX": "#AB47BC",         // Medium Purple (shared with Library)
  "Desktop Application": "#546E7A", // Dark Blue Grey
  "AI Art": "#F06292"       // Light Pink
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
      if (project.tags && project.tags.length) {
        // Pick a single tag color at random instead of averaging so the color stays bright.
        const tagColorValues = project.tags.map(tag => tagColors && tagColors[tag] ? tagColors[tag] : (tagColors && tagColors.default ? tagColors.default : '#eee'));
        const randomIndex = Math.floor(Math.random() * tagColorValues.length);
        mixedBorderColor = tagColorValues[randomIndex];
      }
    }

    // New format: has id, title, summary, description
    if (project.id && project.title && project.title[lang]) {
      const hasDetail = project.description && project.description[lang];
      const url = hasDetail ? `project-detail.html?id=${project.id}&lang=${lang}` : project.github;
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
    window._projectsData = projectsData; // Store for re-rendering
    renderProjects(projectsData);
  } catch (error) {
    console.error("Could not fetch or render projects:", error);
  }
}

// Run the initialization function when the DOM is ready.
document.addEventListener('DOMContentLoaded', initializeProjects);