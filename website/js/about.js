// JavaScript für die About-Seite

document.addEventListener('DOMContentLoaded', function() {
    // Initialisiere den Testimonial-Slider
    initTestimonialSlider();
    
    // Verbessere die Timeline mit interaktiven Effekten
    enhanceTimeline();
    
    // Animiere Fakten-Zahlen
    animateFactNumbers();
    
    // Füge interaktive Effekte zu den Interessen-Karten hinzu
    enhanceInterestCards();
    
    // Füge zusätzliche Effekte zum Profil-Bereich hinzu
    enhanceProfileSection();
});

// Testimonial-Slider-Funktionalität
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-controls .prev');
    const nextBtn = document.querySelector('.testimonial-controls .next');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Funktion zum Anzeigen eines bestimmten Slides
    function showSlide(index) {
        // Verberge alle Slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Deaktiviere alle Dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Zeige den ausgewählten Slide und aktiviere den entsprechenden Dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Aktualisiere den Current Slide Index
        currentSlide = index;
    }
    
    // Event-Listener für die Pfeile
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) prevIndex = totalSlides - 1;
            showSlide(prevIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= totalSlides) nextIndex = 0;
            showSlide(nextIndex);
        });
    }
    
    // Event-Listener für die Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Automatischer Wechsel alle 7 Sekunden
    setInterval(() => {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= totalSlides) nextIndex = 0;
        showSlide(nextIndex);
    }, 7000);
}

// Verbessere die Timeline mit interaktiven Effekten
function enhanceTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Füge den Hover-Effekt hinzu
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Finde den Marker und den Content innerhalb des Items
            const marker = this.querySelector('.timeline-marker');
            const content = this.querySelector('.timeline-content');
            
            // Füge visuelle Effekte hinzu
            if (marker) {
                marker.style.transform = 'scale(1.2)';
                marker.style.boxShadow = '0 0 15px rgba(39, 174, 96, 0.5)';
                marker.style.transition = 'all 0.3s ease';
            }
            
            if (content) {
                content.style.transform = 'translateX(10px)';
                content.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                content.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Finde den Marker und den Content innerhalb des Items
            const marker = this.querySelector('.timeline-marker');
            const content = this.querySelector('.timeline-content');
            
            // Entferne die visuellen Effekte
            if (marker) {
                marker.style.transform = '';
                marker.style.boxShadow = '';
            }
            
            if (content) {
                content.style.transform = '';
                content.style.boxShadow = '';
            }
        });
    });
    
    // Animiere die Timeline-Items beim Scrollen
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                
                // Beobachtung beenden, damit die Animation nur einmal ausgeführt wird
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Initialisiere alle Timeline-Items mit verstecktem Status
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
        
        // Beobachte jedes Item
        observer.observe(item);
    });
}

// Animiere die Faktenzahlen mit einem Counter-Effekt
function animateFactNumbers() {
    const factCards = document.querySelectorAll('.fact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Finde den Wert innerhalb der Karte
                const valueElement = entry.target.querySelector('.fact-value');
                
                if (valueElement) {
                    // Extrahiere den Zielwert (entferne alle nicht-numerischen Zeichen außer +)
                    const originalText = valueElement.textContent;
                    let targetValue = originalText.replace(/[^\d+]/g, '');
                    const hasPlus = originalText.includes('+');
                    
                    // Spezialfall für Unendlichkeit-Symbol
                    if (originalText.includes('∞')) {
                        // Füge eine spezielle Animation für das Unendlichkeit-Symbol hinzu
                        valueElement.style.transform = 'scale(0)';
                        valueElement.style.transition = 'transform 0.5s ease';
                        
                        setTimeout(() => {
                            valueElement.style.transform = 'scale(1.2)';
                            setTimeout(() => {
                                valueElement.style.transform = 'scale(1)';
                            }, 200);
                        }, 500);
                        
                        // Beobachtung für dieses Element beenden
                        observer.unobserve(entry.target);
                        return;
                    }
                    
                    // Starte bei 0
                    valueElement.textContent = '0';
                    
                    // Zähle bis zum Zielwert
                    let currentValue = 0;
                    const targetNumber = parseInt(targetValue);
                    const duration = 1500; // 1.5 Sekunden
                    const steps = 50;
                    const increment = targetNumber / steps;
                    const stepTime = duration / steps;
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= targetNumber) {
                            valueElement.textContent = hasPlus ? targetNumber + '+' : targetNumber;
                            clearInterval(timer);
                        } else {
                            valueElement.textContent = Math.floor(currentValue);
                        }
                    }, stepTime);
                }
                
                // Beobachtung für dieses Element beenden
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Beobachte jede Faktenkarte
    factCards.forEach(card => {
        observer.observe(card);
    });
}

// Füge interaktive Effekte zu den Interessen-Karten hinzu
function enhanceInterestCards() {
    const cards = document.querySelectorAll('.interest-card');
    
    cards.forEach(card => {
        // Füge einen netten 3D-Hover-Effekt hinzu
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            // Berechne die Position des Mauszeigers relativ zur Mitte der Karte
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Berechne den Neigungswinkel (je kleiner der Faktor, desto stärker die Neigung)
            const rotateY = mouseX / 20;
            const rotateX = -mouseY / 20;
            
            // Wende die Transformation an
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            
            // Füge einen subtilen Schatten-Effekt hinzu
            const shadowX = mouseX / 25;
            const shadowY = mouseY / 25;
            this.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.2)`;
        });
        
        // Setze die Transformationen zurück, wenn die Maus die Karte verlässt
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            // Füge eine kleine Animation hinzu
            this.style.transition = 'all 0.5s ease';
            
            // Entferne die Transition nach der Animation
            setTimeout(() => {
                this.style.transition = '';
            }, 500);
        });
        
        // Deaktiviere die Transition während der Mausbewegung
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'none';
        });
    });
}

// Verbessere den Profil-Bereich mit zusätzlichen Effekten
function enhanceProfileSection() {
    const profileImage = document.querySelector('.profile-image');
    const profileContent = document.querySelector('.profile-content');
    
    if (profileImage && profileContent) {
        // Füge einen subtilen Pulseffekt zum Profilbild hinzu
        let pulseAnimation = true;
        
        function togglePulse() {
            if (pulseAnimation) {
                profileImage.style.transform = 'scale(1.05)';
                profileImage.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
                profileImage.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            } else {
                profileImage.style.transform = 'scale(1)';
                profileImage.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                profileImage.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
            
            pulseAnimation = !pulseAnimation;
            setTimeout(togglePulse, 2000);
        }
        
        // Starte den Pulseffekt
        profileImage.style.transition = 'all 2s ease';
        togglePulse();
        
        // Füge einen Hover-Effekt zum Profilbild hinzu
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            this.style.transition = 'all 0.3s ease';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = pulseAnimation ? 'scale(1.05)' : 'scale(1)';
            this.style.boxShadow = pulseAnimation ? '0 15px 35px rgba(0, 0, 0, 0.3)' : '0 10px 30px rgba(0, 0, 0, 0.2)';
            this.style.borderColor = pulseAnimation ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)';
            this.style.transition = 'all 0.5s ease';
        });
    }
    
    // Verbessere die Social-Media-Icons mit einem Schwebeffekt
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        // Füge eine verzögerte Animation beim Laden hinzu
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
            link.style.transition = 'all 0.5s ease';
        }, 500 + (index * 100));
    });
} 