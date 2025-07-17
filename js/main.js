// Cargar datos de proyectos
async function loadProjectsData() {
    try {
        const response = await fetch('data/projects-data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading projects data:', error);
        return null;
    }
}

// Crear tarjeta de proyecto
function createProjectCard(project) {
    const statusBadge = project.status === 'completed' ? 'completed' : 
                       project.status === 'ongoing' ? 'ongoing' : 'planned';
    
    return `
        <div class="project-card">
            <div class="project-header">
                <h4>${project.title}</h4>
                <span class="project-status ${statusBadge}">${project.status}</span>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-technologies">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-impact">
                <strong>Impact:</strong> ${project.impact}
            </div>
            <div class="project-period">
                <i class="fas fa-calendar"></i> ${project.period}
            </div>
        </div>
    `;
}

// Renderizar proyectos
async function renderProjects() {
    const data = await loadProjectsData();
    if (!data) return;

    // Proyectos académicos
    const academicContainer = document.getElementById('academic-projects');
    if (academicContainer) {
        academicContainer.innerHTML = data.academicProjects.map(project => createProjectCard(project)).join('');
    }

    // Proyectos profesionales
    const professionalContainer = document.getElementById('professional-projects');
    if (professionalContainer) {
        professionalContainer.innerHTML = data.professionalProjects.map(project => createProjectCard(project)).join('');
    }

    // Proyectos futuros
    const futureContainer = document.getElementById('future-projects');
    if (futureContainer) {
        futureContainer.innerHTML = data.futureProjects.map(project => createProjectCard(project)).join('');
    }
}

// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    renderProjects();
    
    // Agregar estilos adicionales para las tarjetas de proyecto
    const style = document.createElement('style');
    style.textContent = `
        .project-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            padding: 1.5rem;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .project-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .project-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
        }
        
        .project-header h4 {
            margin: 0;
            color: var(--text-color);
            font-size: 1.1rem;
        }
        
        .project-status {
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .project-status.completed {
            background: #d1fae5;
            color: #065f46;
        }
        
        .project-status.ongoing {
            background: #fef3c7;
            color: #92400e;
        }
        
        .project-status.planned {
            background: #dbeafe;
            color: #1e40af;
        }
        
        .project-description {
            color: #6b7280;
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .project-technologies {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .tech-tag {
            background: #f1f5f9;
            color: #475569;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
            font-weight: 500;
        }
        
        .project-impact {
            color: var(--primary-color);
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        
        .project-period {
            color: #6b7280;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    `;
    document.head.appendChild(style);
});