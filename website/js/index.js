// JavaScript für die Startseite im Nexus-Stil

document.addEventListener('DOMContentLoaded', function() {
    // Lade die Kacheln mit einer verzögerten Animation
    animateTiles();
    
    // Füge Partikel-Hintergrund hinzu
    createParticleBackground();
    
    // Füge Hover-Effekte zu den Kacheln hinzu
    enhanceTileHoverEffects();
});

// Verzögerte Animation für die Kacheln
function animateTiles() {
    const tiles = document.querySelectorAll('.nexus-tile');
    
    tiles.forEach((tile, index) => {
        // Setze anfängliche Styles
        tile.style.opacity = '0';
        tile.style.transform = 'translateY(30px)';
        tile.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Verzögere die Animation jeder Kachel
        setTimeout(() => {
            tile.style.opacity = '1';
            tile.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
    });
}

// Erstelle einen coolen Partikel-Hintergrund für die Nexus-Seite
function createParticleBackground() {
    const container = document.querySelector('.nexus-container');
    
    // Erstelle Canvas Element
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    
    // Füge Canvas zum Container hinzu
    container.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Partikel-Einstellungen
    const particlesArray = [];
    const numberOfParticles = 100;
    
    // Definiere die Partikelklasse
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = `rgba(52, 152, 219, ${Math.random() * 0.5 + 0.2})`;
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
            connectParticles(particlesArray[i], particlesArray);
        }
        
        requestAnimationFrame(animate);
    }
    
    // Verbinde nahe Partikel mit Linien
    function connectParticles(p1, particles) {
        for (let i = 0; i < particles.length; i++) {
            const p2 = particles[i];
            const distance = Math.sqrt(
                Math.pow(p1.x - p2.x, 2) + 
                Math.pow(p1.y - p2.y, 2)
            );
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(52, 152, 219, ${1 - distance/100})`;
                ctx.lineWidth = 0.2;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    
    // Passe Canvas-Größe an, wenn sich die Fenstergröße ändert
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Initialisiere und starte die Animation
    init();
    animate();
}

// Verbessere die Hover-Effekte der Kacheln
function enhanceTileHoverEffects() {
    const tiles = document.querySelectorAll('.nexus-tile');
    
    tiles.forEach(tile => {
        tile.addEventListener('mouseenter', function() {
            // Füge einen 3D-Effekt hinzu
            this.style.transform = 'translateY(-10px) scale(1.03)';
            
            // Füge einen Glowing-Effekt hinzu
            const tileType = this.classList[1]; // z.B. 'data-tile', 'kickboxing-tile', etc.
            
            switch(tileType) {
                case 'data-tile':
                    this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(41, 128, 185, 0.5)';
                    break;
                case 'kickboxing-tile':
                    this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(192, 57, 43, 0.5)';
                    break;
                case 'about-tile':
                    this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(39, 174, 96, 0.5)';
                    break;
                case 'contact-tile':
                    this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(142, 68, 173, 0.5)';
                    break;
                default:
                    this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(52, 152, 219, 0.5)';
            }
        });
        
        tile.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
} 