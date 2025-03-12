// JavaScript für die Data Scientist Seite

document.addEventListener('DOMContentLoaded', function() {
    // Animiere die Skill-Bars beim Scrollen
    animateSkillBars();
    
    // Füge interaktive Timeline-Animation hinzu
    enhanceTimeline();
    
    // Füge Daten-Visualisierungseffekte hinzu
    addDataVisualizations();
    
    // Füge Hover-Effekte zu den Projektkarten hinzu
    enhanceProjectCards();
});

// Animiere die Skill-Bars beim Scrollen
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Setze die tatsächliche Breite als benutzerdefinierte CSS-Variable
    skillLevels.forEach(level => {
        const width = level.style.width;
        level.style.setProperty('--width', width);
        level.style.width = '0';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });
    
    skillLevels.forEach(level => {
        observer.observe(level);
    });
}

// Verbessere die Timeline mit interaktiven Effekten
function enhanceTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        // Füge Hover-Effekt hinzu
        item.addEventListener('mouseenter', function() {
            this.querySelector('.timeline-content').style.transform = 'scale(1.05)';
            this.querySelector('.timeline-content').style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            this.querySelector('.timeline-dot').style.transform = 'translateX(-50%) scale(1.5)';
            this.querySelector('.timeline-dot').style.backgroundColor = '#3498db';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.timeline-content').style.transform = '';
            this.querySelector('.timeline-content').style.boxShadow = '';
            this.querySelector('.timeline-dot').style.transform = 'translateX(-50%)';
            this.querySelector('.timeline-dot').style.backgroundColor = '';
        });
    });
    
    // Animiere Einträge beim Scrollen
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const content = entry.target.querySelector('.timeline-content');
                const dot = entry.target.querySelector('.timeline-dot');
                
                content.style.opacity = '0';
                content.style.transform = entry.target.classList.contains('right') ? 
                    'translateX(50px)' : 'translateX(-50px)';
                content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                dot.style.opacity = '0';
                dot.style.transition = 'opacity 0.5s ease';
                
                // Verzögerte Animation
                setTimeout(() => {
                    content.style.opacity = '1';
                    content.style.transform = 'translateX(0)';
                    dot.style.opacity = '1';
                }, 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Füge Daten-Visualisierungseffekte zur Seite hinzu
function addDataVisualizations() {
    // Erstelle ein schwebendes Partikelhintergrund im Header
    createParticleHeader();
    
    // Data-Punkte Bewegungseffekt für Fun-Facts
    animateFunFacts();
}

// Erstelle einen schwebenden Partikelhintergrund im Header
function createParticleHeader() {
    const header = document.querySelector('.data-header');
    if (!header) return;
    
    // Erstelle Canvas Element
    const canvas = document.createElement('canvas');
    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    
    // Füge Canvas zum Header hinzu
    header.style.position = 'relative';
    header.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Partikel-Einstellungen
    const particlesArray = [];
    const numberOfParticles = 50;
    
    // Definiere die Partikelklasse
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = 'rgba(255, 255, 255, 0.5)';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Lasse Partikel auf der anderen Seite wieder erscheinen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Erstelle Partikel
    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    // Animiere Partikel
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            // Verbinde nahe Partikel mit Linien
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance/1000})`;
                    ctx.lineWidth = 0.2;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Passe Canvas-Größe an, wenn sich die Fenstergröße ändert
    window.addEventListener('resize', () => {
        canvas.width = header.offsetWidth;
        canvas.height = header.offsetHeight;
    });
    
    // Initialisiere und starte die Animation
    init();
    animate();
}

// Füge Animationen zu den Fun Facts hinzu
function animateFunFacts() {
    const funFacts = document.querySelectorAll('.fun-fact');
    
    funFacts.forEach(fact => {
        fact.addEventListener('mouseenter', function() {
            // Füge einen "Daten-Punkte"-Effekt hinzu
            const dataPoints = document.createElement('div');
            dataPoints.className = 'data-points-effect';
            dataPoints.style.position = 'absolute';
            dataPoints.style.top = '0';
            dataPoints.style.left = '0';
            dataPoints.style.width = '100%';
            dataPoints.style.height = '100%';
            dataPoints.style.pointerEvents = 'none';
            dataPoints.style.zIndex = '1';
            
            // Stelle sicher, dass der Container relative Position hat
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            this.appendChild(dataPoints);
            
            // Erstelle animierte Datenpunkte
            for (let i = 0; i < 30; i++) {
                const point = document.createElement('div');
                point.style.position = 'absolute';
                point.style.width = (Math.random() * 3 + 2) + 'px';
                point.style.height = point.style.width;
                point.style.backgroundColor = '#3498db';
                point.style.borderRadius = '50%';
                point.style.opacity = Math.random() * 0.7 + 0.3;
                point.style.left = Math.random() * 100 + '%';
                point.style.top = Math.random() * 100 + '%';
                point.style.transform = 'scale(0)';
                point.style.transition = 'transform 0.5s ease';
                
                dataPoints.appendChild(point);
                
                // Start Animation mit Verzögerung
                setTimeout(() => {
                    point.style.transform = 'scale(1)';
                }, Math.random() * 500);
            }
        });
        
        fact.addEventListener('mouseleave', function() {
            // Entferne den Effekt
            const effect = this.querySelector('.data-points-effect');
            if (effect) {
                effect.remove();
            }
        });
    });
}

// Füge erweiterte Hover-Effekte zu den Projektkarten hinzu
function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Erstelle einen Info-Button
        const infoBtn = document.createElement('div');
        infoBtn.className = 'project-info-btn';
        infoBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
        infoBtn.style.position = 'absolute';
        infoBtn.style.top = '15px';
        infoBtn.style.right = '15px';
        infoBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        infoBtn.style.color = '#2980b9';
        infoBtn.style.width = '40px';
        infoBtn.style.height = '40px';
        infoBtn.style.borderRadius = '50%';
        infoBtn.style.display = 'flex';
        infoBtn.style.alignItems = 'center';
        infoBtn.style.justifyContent = 'center';
        infoBtn.style.cursor = 'pointer';
        infoBtn.style.zIndex = '3';
        infoBtn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        infoBtn.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
        
        const projectImage = card.querySelector('.project-image');
        projectImage.style.position = 'relative';
        projectImage.appendChild(infoBtn);
        
        infoBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.backgroundColor = '#3498db';
            this.style.color = 'white';
        });
        
        infoBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            this.style.color = '#2980b9';
        });
        
        // Info-Button Klick zeigt weitere Details
        infoBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('Detaillierte Projektinformationen werden bald verfügbar sein!');
        });
    });
} 