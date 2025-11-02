// Modern Mobile Navigation
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Menu toggle functionality
if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        const isActive = nav.classList.contains('active');
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Update aria-expanded
        menuToggle.setAttribute('aria-expanded', !isActive);
        menuToggle.setAttribute('aria-label', !isActive ? 'Menü schließen' : 'Menü öffnen');
        
        // Lock body scroll when menu is open on mobile
        if (!isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
}

// Close menu when clicking on links
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav) nav.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Menü öffnen');
            }
            // Unlock body scroll
            document.body.style.overflow = 'auto';
        });
    });
}

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scroll-to-top');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class to all children simultaneously
            const section = entry.target;
            const animatedElements = section.querySelectorAll('.fade-in-scroll, .fade-in-scroll-delay, .fade-in-scroll-delay-2, .zoom-in, .zoom-in-delay, .zoom-in-delay-2, .slide-up, .slide-up-delay, .slide-up-delay-2');
            
            animatedElements.forEach(el => {
                el.classList.add('visible');
            });
            
            // Mark section as observed
            observer.unobserve(section);
        }
    });
}, observerOptions);

// Observe all sections instead of individual elements
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Contact Form with Validation
// Kontaktformular mit Validierung (FormSubmit)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const formMessage = document.getElementById('formMessage');
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    function validateField(field) {
        let isValid = true;
        
        // Check if field is empty
        if (field.value.trim() === '') {
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(field.value);
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value.trim() !== '') {
            const phoneRegex = /^[0-9+\s()-]{6,}$/;
            isValid = phoneRegex.test(field.value);
        }
        
        // Checkbox validation
        if (field.type === 'checkbox') {
            isValid = field.checked;
        }
        
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
        } else {
            field.classList.remove('success');
            field.classList.add('error');
        }
        
        return isValid;
    }
    
    // Formular vor dem Absenden validieren
    contactForm.addEventListener('submit', function(e) {
        let formIsValid = true;
        
        // Validate all fields
        inputs.forEach(input => {
            if (!validateField(input)) {
                formIsValid = false;
            }
        });
        
        if (!formIsValid) {
            e.preventDefault();
            
            if (formMessage) {
                formMessage.textContent = 'Bitte füllen Sie alle Felder korrekt aus.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
            
            // Scroll to first error
            const firstError = contactForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return false;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.textContent = 'Wird gesendet...';
            submitBtn.disabled = true;
        }
        
        // Form wird jetzt via FormSubmit gesendet
        return true;
    });
}

// Erfolgs-Nachricht nach FormSubmit-Redirect anzeigen
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const formMessage = document.getElementById('formMessage');
        const contactSection = document.getElementById('kontakt');
        
        if (formMessage && contactSection) {
            formMessage.innerHTML = '<strong>✅ Vielen Dank!</strong> Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.<br><small>🎁 Vergessen Sie nicht: 20% Rabatt auf Ihren ersten Service!</small>';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            
            // Scroll zur Nachricht
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // URL bereinigen (ohne Reload)
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Formular zurücksetzen
            const form = document.getElementById('contactForm');
            if (form) {
                form.reset();
                const inputs = form.querySelectorAll('input, select, textarea');
                inputs.forEach(input => {
                    input.classList.remove('success', 'error');
                });
            }
        }
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 15, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        }
    }
    
    // Progress Bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    
    // Active Navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (sections.length > 0 && navLinks.length > 0) {
        let current = '';
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const scrollPosition = scrollTop + windowHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Check if section has custom nav target
                const navTarget = section.getAttribute('data-nav');
                current = navTarget || section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkTarget = link.getAttribute('href').substring(1);
            if (linkTarget === current) {
                link.classList.add('active');
            }
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Image Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const sliderWrapper = document.querySelector('.slider-wrapper');
const sliderDots = document.querySelector('.slider-dots');

if (slides.length > 0 && sliderWrapper && sliderDots) {
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        sliderDots.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Auto-play
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchStartX - touchEndX > 50) {
                nextSlide();
            }
            if (touchEndX - touchStartX > 50) {
                prevSlide();
            }
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

// Testimonials Slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonialCards.length;
const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
const testimonialDotsContainer = document.querySelector('.testimonial-dots');

if (testimonialCards.length > 0 && testimonialsWrapper && testimonialDotsContainer) {
    // Create dots for testimonials
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(i));
        testimonialDotsContainer.appendChild(dot);
    }

    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');

    function updateTestimonialSlider() {
        testimonialsWrapper.style.transform = `translateX(-${currentTestimonial * 100}%)`;
        
        testimonialDots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentTestimonial) {
                dot.classList.add('active');
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        updateTestimonialSlider();
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        updateTestimonialSlider();
    }

    function goToTestimonial(index) {
        currentTestimonial = index;
        updateTestimonialSlider();
    }

    const nextTestimonialBtn = document.querySelector('.testimonial-btn.next');
    const prevTestimonialBtn = document.querySelector('.testimonial-btn.prev');
    
    if (nextTestimonialBtn) nextTestimonialBtn.addEventListener('click', nextTestimonial);
    if (prevTestimonialBtn) prevTestimonialBtn.addEventListener('click', prevTestimonial);

    // Auto-play testimonials
    let testimonialAutoplay = setInterval(nextTestimonial, 6000);

    // Pause on hover
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
        testimonialsSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialAutoplay);
        });

        testimonialsSlider.addEventListener('mouseleave', () => {
            testimonialAutoplay = setInterval(nextTestimonial, 6000);
        });

        // Touch swipe support for testimonials
        let testimonialTouchStartX = 0;
        let testimonialTouchEndX = 0;

        testimonialsSlider.addEventListener('touchstart', (e) => {
            testimonialTouchStartX = e.changedTouches[0].screenX;
        });

        testimonialsSlider.addEventListener('touchend', (e) => {
            testimonialTouchEndX = e.changedTouches[0].screenX;
            handleTestimonialSwipe();
        });

        function handleTestimonialSwipe() {
            if (testimonialTouchStartX - testimonialTouchEndX > 50) {
                nextTestimonial();
            }
            if (testimonialTouchEndX - testimonialTouchStartX > 50) {
                prevTestimonial();
            }
        }
    }
}