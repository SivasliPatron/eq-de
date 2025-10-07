const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

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

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    const subject = `Neue Buchungsanfrage - ${data.package}`;
    const body = `
Name: ${data.name}
E-Mail: ${data.email}
Telefon: ${data.phone}
Paket: ${data.package}

Nachricht:
${data.message}
    `;
    
    window.location.href = `mailto:info@eq-detailing.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    alert('Vielen Dank für Ihre Anfrage! Ihr E-Mail-Programm wird geöffnet.');
});

const modal = document.getElementById('datenschutz');
const privacyLinks = document.querySelectorAll('a[href="#datenschutz"]');
const closeBtn = document.querySelector('.close');

privacyLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 15, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
    }
    
    // Progress Bar
    const progressBar = document.querySelector('.progress-bar');
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
    
    // Active Navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
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
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
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

document.querySelector('.slider-btn.next').addEventListener('click', nextSlide);
document.querySelector('.slider-btn.prev').addEventListener('click', prevSlide);

// Auto-play
let autoplayInterval = setInterval(nextSlide, 5000);

// Pause on hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
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