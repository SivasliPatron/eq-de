// ============================================
// EQ DETAILING - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ==========================================
    // ACTIVE NAV LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    function setActiveNavLink() {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.benefit-card, .package-card, .testimonial-card, .gallery-item, .about-feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Add animate-in class style
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================
    // PRICE CALCULATION
    // ==========================================
    const prices = {
        komfort: { kleinwagen: 100, limousine: 120, kombi: 125, coupe: 120, suv: 140, van: 160 },
        premium: { kleinwagen: 140, limousine: 155, kombi: 160, coupe: 150, suv: 170, van: 200 },
        luxus: { kleinwagen: 160, limousine: 180, kombi: 185, coupe: 175, suv: 200, van: 250 }
    };
    
    const packageSelect = document.getElementById('packageSelect');
    const vehicleSelect = document.getElementById('vehicleSelect');
    const priceDisplay = document.getElementById('priceDisplay');
    const priceValue = document.getElementById('priceValue');
    
    function updatePrice() {
        const selectedPackage = packageSelect ? packageSelect.value : '';
        const selectedVehicle = vehicleSelect ? vehicleSelect.value : '';
        
        if (selectedPackage && selectedVehicle && prices[selectedPackage]) {
            const price = prices[selectedPackage][selectedVehicle];
            if (price) {
                priceValue.textContent = price + ' €';
                priceDisplay.classList.add('visible');
            }
        } else {
            priceDisplay.classList.remove('visible');
            priceValue.textContent = '-- €';
        }
    }
    
    if (packageSelect) packageSelect.addEventListener('change', updatePrice);
    if (vehicleSelect) vehicleSelect.addEventListener('change', updatePrice);
    
    // ==========================================
    // CONTACT FORM HANDLING
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.package) {
                alert('Bitte füllen Sie alle Pflichtfelder aus.');
                return;
            }
            
            if (!data.privacy) {
                alert('Bitte akzeptieren Sie die Datenschutzerklärung.');
                return;
            }
            
            // Simulate form submission (replace with actual form handling)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Wird gesendet...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Vielen Dank für Ihre Anfrage! Wir melden uns schnellstmöglich bei Ihnen.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ==========================================
    // GALLERY LIGHTBOX (Simple)
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Add lightbox styles
            const lightboxStyle = document.createElement('style');
            lightboxStyle.id = 'lightbox-style';
            lightboxStyle.textContent = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                .lightbox-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.95);
                }
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                .lightbox-content img {
                    max-width: 100%;
                    max-height: 90vh;
                    object-fit: contain;
                    border-radius: 10px;
                }
                .lightbox-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2.5rem;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                .lightbox-close:hover {
                    transform: scale(1.2);
                    color: #9333ea;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(lightboxStyle);
            
            // Close lightbox
            const closeBtn = lightbox.querySelector('.lightbox-close');
            const overlay = lightbox.querySelector('.lightbox-overlay');
            
            const closeLightbox = () => {
                lightbox.remove();
                document.body.style.overflow = '';
                const styleEl = document.getElementById('lightbox-style');
                if (styleEl) styleEl.remove();
            };
            
            closeBtn.addEventListener('click', closeLightbox);
            overlay.addEventListener('click', closeLightbox);
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') closeLightbox();
            }, { once: true });
        });
    });
    
    // ==========================================
    // PARALLAX EFFECT (Simple)
    // ==========================================
    window.addEventListener('scroll', function() {
        const parallaxSections = document.querySelectorAll('.parallax-section');
        parallaxSections.forEach(section => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            section.style.backgroundPositionY = `${rate}px`;
        });
    });
    
    // ==========================================
    // HIDE SCROLL INDICATOR ON SCROLL
    // ==========================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
});
