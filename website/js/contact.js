/**
 * Kontaktseite JavaScript - Alex
 * Dieses Skript steuert die Funktionalität der Kontaktseite, 
 * einschließlich Formularvalidierung, FAQ-Funktionalität und Animationen.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Alle Komponenten initialisieren
    initAnimations();
    setupContactForm();
    initFaqAccordion();
    setupMapInteraction();
    enhanceUserExperience();
});

/**
 * Initialisiert Animationen für Elemente, die ins Sichtfeld scrollen
 */
function initAnimations() {
    // Alle fade-in Elemente auswählen
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Observer-Konfiguration
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    // Observer erstellen, der Elemente beobachtet
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Beobachten aller fade-in Elemente starten
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Richtet das Kontaktformular mit Validierung und Submit-Handling ein
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const closeBtn = document.querySelector('.close-btn');
    
    if (!contactForm) return;
    
    // Formular-Submit-Event
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(contactForm)) {
            // Formular simuliert abschicken (hier würde normalerweise AJAX verwendet)
            simulateFormSubmission(contactForm);
        }
    });
    
    // Erfolgs-Nachricht schließen
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            successMessage.classList.remove('show');
        });
    }
    
    // Echtzeit-Validierung für Eingabefelder
    const formInputs = contactForm.querySelectorAll('input:not([type="checkbox"]), textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(input);
        });
        
        input.addEventListener('input', function() {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
    });
}

/**
 * Validiert das gesamte Formular
 * @param {HTMLFormElement} form - Das zu validierende Formular
 * @returns {boolean} - Validierungsergebnis
 */
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input:not([type="checkbox"]), textarea');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validiert ein einzelnes Eingabefeld
 * @param {HTMLInputElement|HTMLTextAreaElement} field - Das zu validierende Feld
 * @returns {boolean} - Validierungsergebnis
 */
function validateField(field) {
    let isValid = true;
    const value = field.value.trim();
    
    // Feld entfernen vorhandener Klassen
    field.classList.remove('invalid', 'valid');
    
    // Entfernen von vorhandenen Fehlermeldungen
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validierungsprüfungen basierend auf Feldtyp
    if (field.required && value === '') {
        addError(field, 'Dieses Feld ist erforderlich');
        isValid = false;
    } else if (field.type === 'email' && value !== '') {
        // E-Mail-Format prüfen
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            addError(field, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
            isValid = false;
        }
    } else if (field.id === 'message' && value.length < 10) {
        addError(field, 'Ihre Nachricht sollte mindestens 10 Zeichen lang sein');
        isValid = false;
    }
    
    // Visuelles Feedback hinzufügen
    if (isValid) {
        field.classList.add('valid');
    } else {
        field.classList.add('invalid');
    }
    
    return isValid;
}

/**
 * Fügt eine Fehlermeldung zu einem Feld hinzu
 * @param {HTMLElement} field - Das Eingabefeld
 * @param {string} message - Die Fehlermeldung
 */
function addError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

/**
 * Simuliert das Absenden des Formulars
 * @param {HTMLFormElement} form - Das abzusendende Formular
 */
function simulateFormSubmission(form) {
    // Lade-Indikator anzeigen (falls vorhanden)
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet...';
        
        // Verzögerung simulieren
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // Formular zurücksetzen
            form.reset();
            
            // Erfolgsmeldung anzeigen
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.add('show');
            }
        }, 1500);
    }
}

/**
 * Initialisiert das FAQ-Akkordeon
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle für das aktuelle Item
            item.classList.toggle('active');
            
            // Optional: Andere Items schließen
            /*
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            */
        });
    });
}

/**
 * Richtet interaktive Funktionen für die Karte ein
 */
function setupMapInteraction() {
    const mapContainer = document.querySelector('.map-container');
    const locationCard = document.querySelector('.location-card');
    
    if (!mapContainer || !locationCard) return;
    
    // Bei Hover über die Karte wird die Karte leicht vergrößert
    mapContainer.addEventListener('mouseenter', () => {
        mapContainer.style.transform = 'scale(1.01)';
        locationCard.style.transform = 'translateY(-5px)';
    });
    
    mapContainer.addEventListener('mouseleave', () => {
        mapContainer.style.transform = 'scale(1)';
        locationCard.style.transform = 'translateY(0)';
    });
}

/**
 * Verbessert die Benutzerfreundlichkeit mit zusätzlichen Funktionen
 */
function enhanceUserExperience() {
    // Smooth Scroll für Links
    document.querySelectorAll('.smooth-scroll').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hover-Effekte für Kontakt-Icons
    document.querySelectorAll('.contact-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Tastaturnavigation für Formularelemente verbessern
    improveKeyboardNavigation();
}

/**
 * Verbessert die Tastaturnavigation für eine bessere Barrierefreiheit
 */
function improveKeyboardNavigation() {
    // Verbessertes Tastatur-Fokus-Styling
    const focusableElements = document.querySelectorAll('a, button, input, textarea, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.dataset.focused = 'true';
        });
        
        element.addEventListener('blur', () => {
            element.dataset.focused = 'false';
        });
    });
} 