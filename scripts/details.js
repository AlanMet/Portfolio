import colorManager from './colorManager.js';

async function imageExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

async function loadProjectDetails() {
    // Get the project title from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectTitle = decodeURIComponent(urlParams.get('title'));

    if (!projectTitle) {
        window.location.href = '/projects.html';
        return;
    }

    try {
        // Fetch project data
        const response = await fetch('/data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const projects = await response.json();
        
        // Find the project
        const project = projects.find(p => p.title === projectTitle);
        if (!project) {
            window.location.href = '/projects.html';
            return;
        }

        // Update page title
        document.title = `${project.title} | Alan`;

        // Render project details
        const mainContent = document.querySelector('main');
        const tagsHtml = project.tags.map(tag => {
            const color = colorManager.getColor(tag);
            return `<span class="project-tag" style="background-color: ${color};">${tag}</span>`;
        }).join('');

        const hasMultipleImages = project.media?.images?.length > 1;
        let mediaHtml = '';
        if (project.media?.images?.length > 0) {
            const imageExists = await fetch(project.media.images[0], { method: 'HEAD' })
                .then(response => response.ok)
                .catch(() => false);
            
            if (imageExists) {
                mediaHtml = `<img src="${project.media.images[0]}" alt="${project.title}" loading="lazy" class="project-image">`;
            }
        }

        const linksHtml = `
            <div class="project-links">
                ${project.links?.github ? `
                    <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="read-more">GitHub →</a>
                ` : ''}
                ${project.links?.demo ? `
                    <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="read-more">Demo →</a>
                ` : ''}
            </div>
        `;

        mainContent.innerHTML = `
            <a href="/projects.html" class="read-more">← Back</a>
            <article class="project-detail">
                <header class="project-header">
                    <h1>${project.title}</h1>
                </header>
                
                <div class="project-content">
                    ${mediaHtml}
                    <div class="project-tags">
                        ${tagsHtml}
                    </div>

                    <div class="project-summary">
                        <p>${project.summary}</p>
                    </div>
                    
                    <div class="project-description">
                        <p>${project.detailed_description}</p>
                    </div>
                    
                    ${linksHtml}
                </div>
            </article>
        `;

        // Store images array globally for navigation
        window.projectImages = project.media?.images || [];
        window.currentImageIndex = 0;

        // Store images in window object for navigation functions
        window.projectImages = images;
        window.currentImageIndex = currentImageIndex;
    } catch (error) {
        console.error("Error loading project details:", error);
    }
}

function previousImage() {
    const images = window.projectImages;
    if (!images || images.length <= 1) return;
    
    window.currentImageIndex = (window.currentImageIndex - 1 + images.length) % images.length;
    document.getElementById('current-image').src = images[window.currentImageIndex];
}

function nextImage() {
    const images = window.projectImages;
    if (!images || images.length <= 1) return;
    
    window.currentImageIndex = (window.currentImageIndex + 1) % images.length;
    document.getElementById('current-image').src = images[window.currentImageIndex];
}

// Make functions available globally
window.previousImage = previousImage;
window.nextImage = nextImage;

document.addEventListener('DOMContentLoaded', loadProjectDetails);
