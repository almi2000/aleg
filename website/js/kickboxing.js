// JavaScript für die Kickboxing Seite

document.addEventListener('DOMContentLoaded', function() {
    // Initialisiere den Zitat-Karussell
    initQuotesCarousel();
    
    // Füge Kampf-Animationen hinzu
    addCombatEffects();
    
    // Füge Galerieeffekte hinzu
    enhanceGallery();
    
    // Füge eine Animation für die Statistiken hinzu
    animateStatistics();
    
    // Füge dynamische Header-Effekte hinzu
    enhanceHeader();
});

// Zitat-Karussell Funktionalität
function initQuotesCarousel() {
    const slides = document.querySelectorAll('.quote-slide');
    const prevBtn = document.querySelector('.control.prev');
    const nextBtn = document.querySelector('.control.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Entferne aktive Klasse von allen Slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Füge aktive Klasse zum aktuellen Slide hinzu
        slides[index].classList.add('active');
    }
    
    // Event-Listener für Navigationstasten
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
        
        // Automatischer Wechsel alle 5 Sekunden
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
}

// Füge Kampf-Animationen zur Seite hinzu
function addCombatEffects() {
    // Schlag-Effekt für Karten und Elemente
    addPunchEffect();
    
    // Füge ein simples Kampfspiel hinzu
    addMiniGame();
}

// Füge einen Schlag-Effekt zu bestimmten Elementen hinzu
function addPunchEffect() {
    const trainingCards = document.querySelectorAll('.training-card');
    const medalIcons = document.querySelectorAll('.achievement-medal');
    
    // Funktionen für den Schlag-Effekt
    function punchEffect(event) {
        const element = event.currentTarget;
        
        // Erstelle den Kreis-Effekt
        const circle = document.createElement('div');
        circle.className = 'punch-circle';
        circle.style.position = 'absolute';
        circle.style.width = '50px';
        circle.style.height = '50px';
        circle.style.borderRadius = '50%';
        circle.style.backgroundColor = 'rgba(192, 57, 43, 0.3)';
        circle.style.transform = 'scale(0)';
        circle.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
        circle.style.pointerEvents = 'none';
        circle.style.zIndex = '5';
        
        // Positioniere den Kreis an der Klick-Position
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - 25; // Zentriere den Kreis
        const y = event.clientY - rect.top - 25;
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';
        
        // Füge den Kreis zum Element hinzu
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(circle);
        
        // Starte die Animation
        setTimeout(() => {
            circle.style.transform = 'scale(4)';
            circle.style.opacity = '0';
        }, 10);
        
        // Entferne den Kreis nach der Animation
        setTimeout(() => {
            element.removeChild(circle);
        }, 500);
        
        // Füge einen kurzen "Schlag"-Effekt hinzu
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }
    
    // Füge Event-Listener hinzu
    trainingCards.forEach(card => {
        card.addEventListener('click', punchEffect);
    });
    
    medalIcons.forEach(icon => {
        icon.addEventListener('click', punchEffect);
    });
}

// Füge ein kleines "Schlag-den-Boxsack" Minispiel hinzu
function addMiniGame() {
    const header = document.querySelector('.kickboxing-header');
    
    if (header) {
        // Erstelle einen versteckten Game-Button
        const gameBtn = document.createElement('div');
        gameBtn.className = 'game-btn';
        gameBtn.innerHTML = '<i class="fas fa-gamepad"></i>';
        gameBtn.style.position = 'absolute';
        gameBtn.style.bottom = '20px';
        gameBtn.style.right = '20px';
        gameBtn.style.width = '50px';
        gameBtn.style.height = '50px';
        gameBtn.style.borderRadius = '50%';
        gameBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        gameBtn.style.display = 'flex';
        gameBtn.style.alignItems = 'center';
        gameBtn.style.justifyContent = 'center';
        gameBtn.style.color = 'white';
        gameBtn.style.fontSize = '1.5rem';
        gameBtn.style.cursor = 'pointer';
        gameBtn.style.zIndex = '10';
        gameBtn.style.opacity = '0.5';
        gameBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        gameBtn.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1.1)';
        });
        
        gameBtn.addEventListener('mouseleave', function() {
            this.style.opacity = '0.5';
            this.style.transform = 'scale(1)';
        });
        
        header.appendChild(gameBtn);
        
        // Starte das Minispiel beim Klick
        gameBtn.addEventListener('click', startMiniGame);
    }
}

// Starte das Mini-Boxsack-Spiel
function startMiniGame() {
    // Erstelle das Spielfeld
    const gameOverlay = document.createElement('div');
    gameOverlay.className = 'game-overlay';
    gameOverlay.style.position = 'fixed';
    gameOverlay.style.top = '0';
    gameOverlay.style.left = '0';
    gameOverlay.style.width = '100%';
    gameOverlay.style.height = '100%';
    gameOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    gameOverlay.style.zIndex = '9999';
    gameOverlay.style.display = 'flex';
    gameOverlay.style.flexDirection = 'column';
    gameOverlay.style.alignItems = 'center';
    gameOverlay.style.justifyContent = 'center';
    
    // Spielanleitung
    const gameTitle = document.createElement('h2');
    gameTitle.textContent = 'Boxsack-Challenge';
    gameTitle.style.color = 'white';
    gameTitle.style.marginBottom = '20px';
    
    const gameInstruction = document.createElement('p');
    gameInstruction.textContent = 'Klicke so schnell wie möglich auf den Boxsack! Du hast 10 Sekunden Zeit.';
    gameInstruction.style.color = 'white';
    gameInstruction.style.marginBottom = '30px';
    
    // Punktzähler
    const scoreDisplay = document.createElement('div');
    scoreDisplay.textContent = 'Punkte: 0';
    scoreDisplay.style.color = 'white';
    scoreDisplay.style.fontSize = '1.5rem';
    scoreDisplay.style.marginBottom = '20px';
    
    // Timer
    const timerDisplay = document.createElement('div');
    timerDisplay.textContent = 'Zeit: 10s';
    timerDisplay.style.color = 'white';
    timerDisplay.style.fontSize = '1.5rem';
    timerDisplay.style.marginBottom = '30px';
    
    // Boxsack
    const punchingBag = document.createElement('div');
    punchingBag.className = 'punching-bag';
    punchingBag.style.width = '100px';
    punchingBag.style.height = '150px';
    punchingBag.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/2548/2548374.png')";
    punchingBag.style.backgroundSize = 'contain';
    punchingBag.style.backgroundRepeat = 'no-repeat';
    punchingBag.style.backgroundPosition = 'center';
    punchingBag.style.cursor = 'pointer';
    punchingBag.style.transition = 'transform 0.1s ease';
    
    // Schließen-Button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Schließen';
    closeBtn.style.marginTop = '30px';
    closeBtn.style.padding = '10px 20px';
    closeBtn.style.backgroundColor = '#c0392b';
    closeBtn.style.color = 'white';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '5px';
    closeBtn.style.cursor = 'pointer';
    
    // Füge alles zum Overlay hinzu
    gameOverlay.appendChild(gameTitle);
    gameOverlay.appendChild(gameInstruction);
    gameOverlay.appendChild(scoreDisplay);
    gameOverlay.appendChild(timerDisplay);
    gameOverlay.appendChild(punchingBag);
    gameOverlay.appendChild(closeBtn);
    
    // Füge das Overlay zum Body hinzu
    document.body.appendChild(gameOverlay);
    
    // Spiellogik
    let score = 0;
    let timeLeft = 10;
    let gameActive = true;
    
    punchingBag.addEventListener('click', function() {
        if (gameActive) {
            score++;
            scoreDisplay.textContent = `Punkte: ${score}`;
            
            // Animiere den Boxsack
            this.style.transform = 'translateX(15px) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'translateX(-10px) rotate(-3deg)';
                setTimeout(() => {
                    this.style.transform = 'translateX(5px) rotate(2deg)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 100);
                }, 100);
            }, 100);
        }
    });
    
    // Timer
    const gameTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Zeit: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            gameActive = false;
            
            // Zeige Ergebnis
            gameTitle.textContent = 'Spiel beendet!';
            gameInstruction.textContent = `Du hast ${score} Mal auf den Boxsack geschlagen!`;
            punchingBag.style.display = 'none';
            
            // Bewerte das Ergebnis
            let resultText = '';
            if (score < 20) {
                resultText = 'Du kannst noch schneller werden!';
            } else if (score < 30) {
                resultText = 'Nicht schlecht, aber da geht noch mehr!';
            } else if (score < 40) {
                resultText = 'Wow, schnelle Hände!';
            } else {
                resultText = 'Unglaublich! Du bist ein Profi!';
            }
            
            const resultDisplay = document.createElement('p');
            resultDisplay.textContent = resultText;
            resultDisplay.style.color = 'white';
            resultDisplay.style.fontSize = '1.2rem';
            resultDisplay.style.marginTop = '20px';
            
            gameOverlay.insertBefore(resultDisplay, closeBtn);
        }
    }, 1000);
    
    // Schließen-Button-Funktion
    closeBtn.addEventListener('click', function() {
        clearInterval(gameTimer);
        document.body.removeChild(gameOverlay);
    });
}

// Verbessere die Galerie mit Lightbox-Funktion
function enhanceGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        // Erstelle die Lightbox-Elemente
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        lightbox.style.zIndex = '9999';
        lightbox.style.display = 'none';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.className = 'lightbox-img';
        lightboxImg.style.maxWidth = '90%';
        lightboxImg.style.maxHeight = '90%';
        lightboxImg.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.5)';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '20px';
        closeBtn.style.fontSize = '2.5rem';
        closeBtn.style.color = 'white';
        closeBtn.style.cursor = 'pointer';
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Öffne die Lightbox beim Klicken auf ein Galerieelement
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.style.display = 'flex';
                
                // Füge eine Einblendeanimation hinzu
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                    lightbox.style.transition = 'opacity 0.3s ease';
                }, 10);
            });
        });
        
        // Schließe die Lightbox
        closeBtn.addEventListener('click', function() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        });
        
        // Schließe die Lightbox auch durch Klicken außerhalb des Bildes
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    lightbox.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Animiere die Statistiken mit Counter-Effekt
function animateStatistics() {
    const statValues = document.querySelectorAll('.stat-value');
    
    if (statValues.length > 0) {
        // Erstelle einen Beobachter für die Statistik-Sektion
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Wenn die Statistik-Sektion sichtbar ist, starte die Animation für alle Werte
                    statValues.forEach(statValue => {
                        const targetValue = parseInt(statValue.textContent);
                        animateCounter(statValue, targetValue);
                    });
                    
                    // Beobachtung beenden, damit die Animation nur einmal ausgeführt wird
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Beobachte die Statistik-Sektion
        const statsSection = document.querySelector('.statistics');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    
    // Funktion für die Counter-Animation
    function animateCounter(element, target) {
        // Setze Startwert auf 0
        element.textContent = '0';
        
        // Berechne Schrittgröße (je größer der Zielwert, desto größer der Schritt)
        const step = Math.max(1, Math.floor(target / 30));
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = current;
            }
        }, 50);
    }
}

// Verbessere den Header mit dynamischen Elementen
function enhanceHeader() {
    const header = document.querySelector('.kickboxing-header');
    
    if (header) {
        // Füge ein subtiles Partikel-Hintergrundmuster hinzu
        addParticlePattern();
        
        // Füge einen Pulseffekt zum Titel hinzu
        const title = document.querySelector('.kickboxing-title');
        if (title) {
            setInterval(() => {
                title.style.textShadow = '0 0 15px rgba(192, 57, 43, 0.7), 0 0 30px rgba(192, 57, 43, 0.5)';
                setTimeout(() => {
                    title.style.textShadow = '0 5px 15px rgba(0, 0, 0, 0.5)';
                }, 500);
            }, 3000);
        }
    }
    
    // Funktion für das Partikel-Hintergrundmuster
    function addParticlePattern() {
        // Erstelle ein Canvas-Element für die Partikel
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = header.offsetHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '1';
        canvas.style.pointerEvents = 'none';
        
        header.style.position = 'relative';
        header.insertBefore(canvas, header.firstChild);
        
        const ctx = canvas.getContext('2d');
        
        // Array für die Partikel
        const particles = [];
        const particleCount = 30;
        
        // Erstelle die Partikel
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`
            });
        }
        
        // Animiere die Partikel
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Bewege das Partikel
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Lass das Partikel auf der anderen Seite wieder erscheinen
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;
                
                // Zeichne das Partikel
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        // Starte die Animation
        animateParticles();
        
        // Passe die Canvas-Größe an, wenn das Fenster seine Größe ändert
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = header.offsetHeight;
        });
    }
} 