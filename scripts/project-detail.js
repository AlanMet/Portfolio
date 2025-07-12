// scripts/project-detail.js
// Dynamically loads project details based on ?id= in URL and language

function getLang() {
  // Try to get language from <html lang="..."> or default to 'en'
  return document.documentElement.lang || 'en';
}

function getProjectId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderProjectDetail(projects) {
  console.log('Rendering project detail for ID:', getProjectId());
  const id = getProjectId();
  const lang = getLang();
  // fallback: if no project matches, try first project
  let proj = projects.find(p => p.id === id);
  if (!proj && projects.length) proj = projects[0];
  const container = document.getElementById('project-detail');
  if (!container) return;
  if (!proj) {
    container.innerHTML = '<h2>Project not found</h2>';
    return;
  }
  container.innerHTML = `
    <h1>${proj.title?.[lang] || proj.title?.en || 'Untitled'}</h1>
    ${proj.summary && proj.summary[lang] ? `<h3>${proj.summary[lang]}</h3>` : ''}
    ${proj.images && proj.images.length ? proj.images.map(img => `<img src='${img}' alt='' style='max-width:100%;margin-bottom:1rem;'>`).join('') : ''}
    ${proj.description && proj.description[lang] ? `<p>${proj.description[lang]}</p>` : ''}
    <div class="project-tags">
      ${proj.tags ? proj.tags.map(tag => `<span>${tag}</span>`).join('') : ''}
    </div>
    <div style="margin-top:2rem;">
      ${proj.github ? `<a href='${proj.github}' target='_blank'>GitHub</a>` : ''}
      ${proj.demo ? ` | <a href='${proj.demo}' target='_blank'>Live Demo</a>` : ''}
    </div>
  `;
}

function loadProjectDetail() {
  fetch('data/projects.json')
    .then(function(res) { return res.json(); })
    .then(renderProjectDetail);
}

document.addEventListener('DOMContentLoaded', loadProjectDetail);
