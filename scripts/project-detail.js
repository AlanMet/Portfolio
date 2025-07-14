// Tag color map (copied from projects.js)
const tagColors = {
  "JavaScript": "#F7DF1E", "Python": "#3776AB", "Dart": "#0175C2", "C#": "#9B4F96",
  "Flutter": "#02569B", "Tkinter": "#FFD580", "Machine Learning": "#F9872A", "NLP": "#4CAF50",
  "Reinforcement Learning": "#E91E63", "WebSockets": "#2196F3", "Firebase": "#FFCA28",
  "Leadership": "#607D8B", "Research": "#795548", "Cybersecurity": "#F44336",
  "Linear Algebra": "#00BCD4", "UX Design": "#009688", "From Scratch": "#8BC34A",
  "Library": "#9C27B0", "Mobile": "#FF9800", "Game Development": "#E91E63",
  ".NET": "#512BD4", "Engine": "#607D8B", "Numerical Computing": "#2196F3",
  "Security": "#F44336", "Encryption": "#795548", "Node.js": "#339933",
  "TypeScript": "#3178C6", "AI": "#FF6F00", "LLM": "#FF5722",
  "Graphics": "#4CAF50", "JWT": "#000000", "default": "#6c757d"
};

// scripts/project-detail.js
// Dynamically loads project details based on ?id= in URL and language

function getLang() {
  return document.documentElement.lang || 'en';
}

function getProjectId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderProjectDetail(projects) {
  const id = getProjectId();
  const lang = getLang();
  let proj = projects.find(p => p.id === id);
  if (!proj && projects.length) proj = projects[0];
  if (!proj) return;
  // Title
  document.getElementById('project-title').textContent = proj.title?.[lang] || proj.title?.en || 'Untitled';
  // Image
  const imgEl = document.getElementById('project-image');
  if (proj.images && proj.images.length) {
    imgEl.src = proj.images[0];
    imgEl.style.display = '';
  } else {
    imgEl.style.display = 'none';
  }
  // Tags (with color)
  const tagsEl = document.getElementById('project-tags');
  tagsEl.innerHTML = proj.tags ? proj.tags.map(tag => {
    const color = tagColors && tagColors[tag] ? tagColors[tag] : (tagColors && tagColors.default ? tagColors.default : '#222');
    return `<span style="background-color: ${color}; color: #fff;">${tag}</span>`;
  }).join('') : '';
  // Summary (with RTL/LTR border)
  const summaryEl = document.getElementById('project-summary');
  const summaryText = proj.summary && proj.summary[lang] ? proj.summary[lang] : '';
  summaryEl.textContent = summaryText;
  const dir = document.documentElement.getAttribute('dir') || (lang === 'ar' ? 'rtl' : 'ltr');
  summaryEl.style.borderLeft = dir === 'rtl' ? 'none' : '3px solid var(--text-color)';
  summaryEl.style.borderRight = dir === 'rtl' ? '3px solid var(--text-color)' : 'none';
  summaryEl.style.paddingLeft = dir === 'rtl' ? '0' : '1rem';
  summaryEl.style.paddingRight = dir === 'rtl' ? '1rem' : '0';
  // Description
  const descriptionText = proj.description && proj.description[lang] ? proj.description[lang] : '';
  const formattedDescription = descriptionText.replace(/\n/g, '<br>');
  document.getElementById('project-description').innerHTML = formattedDescription ? `<p>${formattedDescription}</p>` : '';
  // Back button
  const backBtn = document.getElementById('back-to-projects');
  backBtn.textContent = lang === 'fr' ? '← Retour aux projets' : lang === 'ar' ? '← العودة للمشاريع' : '← Back to Projects';
  // GitHub
  const githubBtn = document.getElementById('project-github');
  if (proj.github) {
    githubBtn.href = proj.github;
    githubBtn.style.display = '';
  } else {
    githubBtn.style.display = 'none';
  }
  // Demo
  const demoBtn = document.getElementById('project-demo');
  if (proj.demo) {
    demoBtn.href = proj.demo;
    demoBtn.style.display = '';
  } else {
    demoBtn.style.display = 'none';
  }
}

function loadProjectDetail() {
  fetch('data/projects.json')
    .then(function(res) { return res.json(); })
    .then(function(projects) {
      window._projectData = projects;
      renderProjectDetail(projects);
    });
}

document.addEventListener('DOMContentLoaded', loadProjectDetail);

// Listen for language change and re-render detail
document.querySelectorAll('#lang-select, #mobile-lang-select').forEach(function(sel) {
  sel.addEventListener('change', function() {
    if (window._projectData) {
      renderProjectDetail(window._projectData);
    }
  });
});
