// Hauptfunktionen für alle Seiten

document.addEventListener('DOMContentLoaded', function() {
    // Animiere Elemente beim Scrollen
    animateOnScroll();
    
    // Zurück-nach-oben Button
    initBackToTopButton();
    
    // Initialisiere das mobile Menü
    initMobileMenu();
});

// Animiere Elemente, wenn sie ins Sichtfeld scrollen
function animateOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Zurück-nach-oben Button Funktionalität
function initBackToTopButton() {
    // Erstelle den Button, wenn er nicht existiert
    if (!document.querySelector('.back-to-top')) {
        const backToTopButton = document.createElement('div');
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopButton);
    }
    
    const backToTopButton = document.querySelector('.back-to-top');
    
    // Zeige oder verstecke den Button basierend auf der Scroll-Position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scrolle zum Anfang der Seite, wenn geklickt
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile Menü für responsive Design
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        // Erstelle den Hamburger-Button, wenn er nicht existiert
        if (!document.querySelector('.menu-toggle')) {
            const menuToggle = document.createElement('div');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            navbar.prepend(menuToggle);
            
            // Styles für das mobile Menü
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    .navbar ul {
                        display: none;
                        flex-direction: column;
                        width: 100%;
                    }
                    .navbar ul.active {
                        display: flex;
                    }
                    .menu-toggle {
                        display: block;
                        cursor: pointer;
                        font-size: 1.5rem;
                        padding: 10px;
                    }
                }
                @media (min-width: 769px) {
                    .menu-toggle {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Toggle-Funktion für das Menü
            menuToggle.addEventListener('click', () => {
                const navList = navbar.querySelector('ul');
                navList.classList.toggle('active');
            });
        }
    }
}

// Easter Egg
document.addEventListener('DOMContentLoaded', function() {
    const easterEgg = document.getElementById('easter-egg');
    if (easterEgg) {
        easterEgg.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Erstelle ein springendes Emoji, das über den Bildschirm fliegt
            const emoji = document.createElement('div');
            emoji.textContent = '🥊';
            emoji.style.position = 'fixed';
            emoji.style.fontSize = '3rem';
            emoji.style.left = Math.random() * window.innerWidth + 'px';
            emoji.style.top = '-50px';
            emoji.style.zIndex = '9999';
            document.body.appendChild(emoji);
            
            let posY = -50;
            let posX = parseInt(emoji.style.left);
            let speedY = 0;
            let speedX = (Math.random() - 0.5) * 10;
            const gravity = 0.5;
            
            function animateEmoji() {
                speedY += gravity;
                posY += speedY;
                posX += speedX;
                
                emoji.style.top = posY + 'px';
                emoji.style.left = posX + 'px';
                
                if (posY < window.innerHeight) {
                    requestAnimationFrame(animateEmoji);
                } else {
                    document.body.removeChild(emoji);
                }
            }
            
            requestAnimationFrame(animateEmoji);
        });
    }
}); 