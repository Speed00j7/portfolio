// DOM Elements
const navbar = document.querySelector('.navbar');
const typingText = document.querySelector('.typing-text');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.background = 'rgba(10, 25, 47, 0.95)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.background = 'rgba(10, 25, 47, 0.85)';
    }
});

// Enhanced Typing Effect
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2; // Faster deletion
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const words = [
        'Tech Enthusiast',
        'prompt Engineer',
        'Innovator'
    ];
    const wait = 3000;

    // Init TypeWriter
    new TypeWriter(typingText, words, wait);

    // Init Animations
    initAnimations();
}

// Smooth Scroll for Navigation Links
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

// Initialize Animations
function initAnimations() {
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up, .slide-in').forEach(el => {
        observer.observe(el);
    });
}

// Particle Effect for Background (Optional)
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Create particles periodically (Optional)
setInterval(createParticle, 3000);

// Handle Mobile Menu
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    document.addEventListener('click', (e) => {
        const isClickInside = navbarToggler.contains(e.target) || navbarCollapse.contains(e.target);
        
        if (!isClickInside && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
}
// About Section Animations and Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Animations
    initAboutSectionAnimations();
    
    // Initialize Skill Cards
    initSkillCards();
    
    // Initialize Intersection Observer
    initIntersectionObserver();
});

// About Section Animations
function initAboutSectionAnimations() {
    // Animate text content on scroll
    const textElements = document.querySelectorAll('.text-content p');
    let delay = 0;
    
    textElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all 0.6s ease ${delay}s`;
        delay += 0.2;
    });

    // Animate skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.4s ease ${index * 0.1}s`;
    });

    // Animate interest items
    const interestItems = document.querySelectorAll('.interest-item');
    interestItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.4s ease ${index * 0.1}s`;
    });
}

// Skill Cards Interaction
function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', (e) => {
            const icon = card.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            createParticles(e, card);
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('i');
            icon.style.transform = 'scale(1)';
        });

        // Add click effect
        card.addEventListener('click', () => {
            card.classList.add('clicked');
            setTimeout(() => card.classList.remove('clicked'), 500);
        });
    });
}

// Particle Effect
function createParticles(e, parent) {
    const particles = 5;
    
    for(let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position around the cursor
        const x = e.clientX - parent.getBoundingClientRect().left;
        const y = e.clientY - parent.getBoundingClientRect().top;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random color
        const hue = Math.random() * 360;
        particle.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;
        
        parent.appendChild(particle);
        
        // Animate and remove particle
        setTimeout(() => particle.remove(), 1000);
    }
}

// Intersection Observer for Scroll Animations
function initIntersectionObserver() {
    const options = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate text content
                if (entry.target.classList.contains('text-content')) {
                    const paragraphs = entry.target.querySelectorAll('p');
                    paragraphs.forEach(p => {
                        p.style.opacity = '1';
                        p.style.transform = 'translateY(0)';
                    });
                }
                
                // Animate skill cards
                if (entry.target.classList.contains('skills-grid')) {
                    const cards = entry.target.querySelectorAll('.skill-card');
                    cards.forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }
                
                // Animate interest items
                if (entry.target.classList.contains('interests-grid')) {
                    const items = entry.target.querySelectorAll('.interest-item');
                    items.forEach(item => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe elements
    const elementsToObserve = [
        document.querySelector('.text-content'),
        document.querySelector('.skills-grid'),
        document.querySelector('.interests-grid')
    ];

    elementsToObserve.forEach(element => {
        if (element) observer.observe(element);
    });
}

// Highlight Animation
function initHighlightAnimation() {
    const highlights = document.querySelectorAll('.highlight');
    
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseover', () => {
            highlight.style.color = 'var(--accent-color)';
            highlight.style.transform = 'translateY(-2px)';
        });

        highlight.addEventListener('mouseout', () => {
            highlight.style.color = '';
            highlight.style.transform = 'translateY(0)';
        });
    });
}

// Add floating animation to decorative elements
function initFloatingAnimation() {
    const elements = document.querySelectorAll('.circle, .square');
    
    elements.forEach(element => {
        element.style.animation = `float ${5 + Math.random() * 5}s infinite ease-in-out`;
    });
}

// Initialize everything when the page loads
window.addEventListener('load', () => {
    initHighlightAnimation();
    initFloatingAnimation();
    
    // Add smooth reveal animation to the entire section
    const aboutSection = document.querySelector('.about-me');
    aboutSection.style.opacity = '1';
    aboutSection.style.transform = 'translateY(0)';
});

// Add some CSS for the particles
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        pointer-events: none;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        animation: particle 1s ease-out forwards;
    }

    @keyframes particle {
        0% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: scale(0) translate(
                ${Math.random() * 100 - 50}px,
                ${Math.random() * 100 - 50}px
            );
            opacity: 0;
        }
    }

    .skill-card.clicked {
        animation: click-effect 0.5s ease;
    }

    @keyframes click-effect {
        0% { transform: scale(1); }
        50% { transform: scale(0.95); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
// ... existing code ...

// Skills Section Animation and Interaction
function initSkillsSection() {
    const skillsSection = document.querySelector('.skills-section');
    const skillCards = document.querySelectorAll('.skill-card');

    // Initialize progress bars
    function initProgressBars() {
        skillCards.forEach((card, index) => {
            const progressBar = card.querySelector('.progress-bar');
            if (progressBar) {
                // Add animation delay based on card index
                progressBar.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }

    // Intersection Observer for skills section
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill cards
                skillCards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                    card.classList.add('animate');
                });
                
                // Initialize progress bars when section is visible
                initProgressBars();
                
                // Unobserve after animation
                skillsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Hover effects for skill cards
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Scale up icon
            const icon = card.querySelector('.skill-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
            
            // Create particle effect
            createSkillParticles(e, card);
        });

        card.addEventListener('mouseleave', () => {
            // Reset icon scale
            const icon = card.querySelector('.skill-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Create particle effect for skill cards
function createSkillParticles(e, parent) {
    const particles = 5;
    const colors = ['#4e54c8', '#8f94fb', '#00ff88'];
    
    for(let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'skill-particle';
        
        // Random position around cursor
        const x = e.clientX - parent.getBoundingClientRect().left;
        const y = e.clientY - parent.getBoundingClientRect().top;
        
        // Set particle position and color
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Add particle to card
        parent.appendChild(particle);
        
        // Animate particle
        requestAnimationFrame(() => {
            particle.style.transform = `
                translate(
                    ${(Math.random() - 0.5) * 100}px,
                    ${(Math.random() - 0.5) * 100}px
                )
                scale(0)
            `;
            particle.style.opacity = '0';
        });
        
        // Remove particle after animation
        setTimeout(() => particle.remove(), 1000);
    }
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // ... your existing init code ...
    initSkillsSection();
});

// Add these styles to your existing style element or create a new one
const skillStyles = document.createElement('style');
skillStyles.textContent = `
    .skill-particle {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        pointer-events: none;
        opacity: 1;
        transition: transform 1s ease-out, opacity 1s ease-out;
    }

    .skill-card {
        transform-style: preserve-3d;
        perspective: 1000px;
    }

    .skill-card.animate {
        animation: skillCardAppear 0.6s ease-out forwards;
    }

    @keyframes skillCardAppear {
        from {
            opacity: 0;
            transform: translateY(30px) rotateX(10deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
        }
    }
`;
document.head.appendChild(skillStyles);

// ... existing code ...
// Projects Section Initialization and Animations
function initProjectsSection() {
    const projectsSection = document.querySelector('.projects-section');
    const projectCards = document.querySelectorAll('.project-card');
    const projectImages = document.querySelectorAll('.project-image img');

    // Lazy Load Images with Intersection Observer
    const lazyLoadImages = () => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    // Create a temporary image to preload
                    const tempImage = new Image();
                    tempImage.src = src;
                    
                    tempImage.onload = () => {
                        img.src = src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    };
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        projectImages.forEach(img => {
            // Store original src in data-src
            img.setAttribute('data-src', img.src);
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Blank placeholder
            imageObserver.observe(img);
        });
    };

    // Animate Cards on Scroll
    const animateCards = () => {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add animation with delay based on card position
                    entry.target.style.setProperty('--card-index', index);
                    entry.target.classList.add('animate');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        projectCards.forEach(card => cardObserver.observe(card));
    };

    // Project Card Hover Effects
    const initHoverEffects = () => {
        projectCards.forEach(card => {
            const techTags = card.querySelectorAll('.project-tech span');
            
            // Add animation delay to tech tags
            techTags.forEach((tag, index) => {
                tag.style.setProperty('--i', index);
            });

            // Add hover particles effect
            card.addEventListener('mouseenter', (e) => {
                createParticles(e, card);
            });

            // Smooth image scale on hover
            const image = card.querySelector('.project-image img');
            if (image) {
                card.addEventListener('mousemove', (e) => {
                    handleImageTilt(e, card, image);
                });

                card.addEventListener('mouseleave', () => {
                    resetImageTilt(image);
                });
            }
        });
    };

    // Create particle effects
    const createParticles = (e, parent) => {
        const particles = 5;
        const colors = ['#4e54c8', '#8f94fb', '#00ff88'];

        for(let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'project-particle';
            
            const x = e.clientX - parent.getBoundingClientRect().left;
            const y = e.clientY - parent.getBoundingClientRect().top;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            parent.appendChild(particle);
            
            requestAnimationFrame(() => {
                particle.style.transform = `
                    translate(
                        ${(Math.random() - 0.5) * 100}px,
                        ${(Math.random() - 0.5) * 100}px
                    )
                    scale(0)
                `;
                particle.style.opacity = '0';
            });
            
            setTimeout(() => particle.remove(), 1000);
        }
    };

    // Handle image tilt effect
    const handleImageTilt = (e, card, image) => {
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        
        const maxRotate = 5;
        
        image.style.transform = `
            scale(1.1)
            rotateX(${-percentY * maxRotate}deg)
            rotateY(${percentX * maxRotate}deg)
        `;
    };

    // Reset image tilt
    const resetImageTilt = (image) => {
        image.style.transform = 'scale(1) rotateX(0) rotateY(0)';
    };

    // Add styles for particles
    const addParticleStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .project-particle {
                position: absolute;
                pointer-events: none;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                opacity: 1;
                z-index: 10;
                transition: transform 1s ease-out, opacity 1s ease-out;
            }

            .project-image img {
                transition: transform 0.3s ease-out;
                transform-style: preserve-3d;
                will-change: transform;
            }

            .project-image img.loaded {
                animation: fadeIn 0.5s ease-out;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    };

    // Initialize everything
    const init = () => {
        lazyLoadImages();
        animateCards();
        initHoverEffects();
        addParticleStyles();
    };

    // Run initialization
    init();
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    initProjectsSection();
});
// Certifications Section Initialization and Animations
function initCertificationsSection() {
    const certSection = document.querySelector('.certifications-section');
    const certCards = document.querySelectorAll('.cert-card');
    const certImages = document.querySelectorAll('.cert-image img');

    // Initialize Modal
    const initModal = () => {
        const modal = document.createElement('div');
        modal.className = 'cert-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="" alt="Certificate">
                <div class="close-modal">×</div>
            </div>
        `;
        document.body.appendChild(modal);

        // Open Modal
        certImages.forEach(img => {
            img.addEventListener('click', (e) => {
                const modalImg = modal.querySelector('img');
                modalImg.src = e.target.src;
                modal.style.display = 'flex';
                
                // Add opening animation
                modal.animate([
                    { opacity: 0, transform: 'scale(0.9)' },
                    { opacity: 1, transform: 'scale(1)' }
                ], {
                    duration: 300,
                    easing: 'ease-out'
                });
            });
        });

        // Close Modal
        const closeModal = () => {
            modal.animate([
                { opacity: 1, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0.9)' }
            ], {
                duration: 300,
                easing: 'ease-in'
            }).onfinish = () => modal.style.display = 'none';
        };

        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });
    };

    // Animate Cards on Scroll
    const animateCards = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        certCards.forEach(card => observer.observe(card));
    };

    // Hover Effects
    const initHoverEffects = () => {
        certCards.forEach(card => {
            // Particle effect on hover
            card.addEventListener('mouseenter', (e) => {
                createParticles(e, card);
            });

            // 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                handleTiltEffect(e, card);
            });

            card.addEventListener('mouseleave', () => {
                resetTiltEffect(card);
            });
        });
    };

    // Create particle effects
    const createParticles = (e, parent) => {
        const particles = 5;
        const colors = ['#4e54c8', '#8f94fb', '#00ff88'];

        for(let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'cert-particle';
            
            const x = e.clientX - parent.getBoundingClientRect().left;
            const y = e.clientY - parent.getBoundingClientRect().top;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            parent.appendChild(particle);
            
            requestAnimationFrame(() => {
                particle.style.transform = `
                    translate(
                        ${(Math.random() - 0.5) * 100}px,
                        ${(Math.random() - 0.5) * 100}px
                    )
                    scale(0)
                `;
                particle.style.opacity = '0';
            });
            
            setTimeout(() => particle.remove(), 1000);
        }
    };

    // Handle tilt effect
    const handleTiltEffect = (e, card) => {
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        
        const maxRotate = 10;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${-percentY * maxRotate}deg)
            rotateY(${percentX * maxRotate}deg)
            translateZ(20px)
        `;
    };

    // Reset tilt effect
    const resetTiltEffect = (card) => {
        card.style.transform = '';
    };

    // Add particle styles
    const addStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .cert-particle {
                position: absolute;
                pointer-events: none;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                z-index: 10;
                transition: transform 1s ease-out, opacity 1s ease-out;
            }

            .cert-card {
                transform-style: preserve-3d;
                perspective: 1000px;
            }

            @keyframes certGlow {
                0%, 100% {
                    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
                }
                50% {
                    box-shadow: 0 0 40px rgba(0, 255, 136, 0.5);
                }
            }

            .cert-card:hover {
                animation: certGlow 2s infinite;
            }
        `;
        document.head.appendChild(style);
    };

    // Initialize everything
    const init = () => {
        initModal();
        animateCards();
        initHoverEffects();
        addStyles();
    };

    // Run initialization
    init();
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    initCertificationsSection();
});
// Experience Section Initialization and Animations
function initExperienceSection() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    const quoteCard = document.querySelector('.quote-card');
    const resumeButton = document.querySelector('.resume-button');

    // Initialize Timeline Animations
    const initTimelineAnimation = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add animation with delay based on index
                    entry.target.style.animation = `fadeInUp 0.6s ease ${index * 0.2}s forwards`;
                    
                    // Add glow effect to timeline marker
                    const marker = entry.target.querySelector('.timeline-marker');
                    if (marker) {
                        marker.style.animation = `markerGlow 2s ease-in-out infinite`;
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });

        timelineItems.forEach(item => observer.observe(item));
    };

    // Particle Effect for Timeline Markers
    const createParticles = (e, parent) => {
        const particles = 5;
        const colors = ['#4e54c8', '#8f94fb', '#00ff88'];
        
        for(let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'timeline-particle';
            
            const size = Math.random() * 6 + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const destinationX = (Math.random() - 0.5) * 100;
            const destinationY = (Math.random() - 0.5) * 100;
            
            parent.appendChild(particle);
            
            requestAnimationFrame(() => {
                particle.style.transform = `translate(${destinationX}px, ${destinationY}px)`;
                particle.style.opacity = '0';
            });
            
            setTimeout(() => particle.remove(), 1000);
        }
    };

    // Hover Effects for Timeline Cards
    const initCardHoverEffects = () => {
        timelineItems.forEach(item => {
            const card = item.querySelector('.timeline-card');
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                const marker = item.querySelector('.timeline-marker');
                if (marker) {
                    createParticles({ 
                        clientX: marker.getBoundingClientRect().left,
                        clientY: marker.getBoundingClientRect().top
                    }, marker);
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });

            // 3D Tilt Effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(10px)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'none';
            });
        });
    };

    // Animate Quote Card
    const initQuoteAnimation = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    quoteCard.classList.add('quote-animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        if (quoteCard) observer.observe(quoteCard);
    };

    // Resume Button Effects
    const initResumeButton = () => {
        if (resumeButton) {
            resumeButton.addEventListener('mouseenter', (e) => {
                createButtonParticles(e);
            });

            resumeButton.addEventListener('click', () => {
                resumeButton.classList.add('downloading');
                setTimeout(() => {
                    resumeButton.classList.remove('downloading');
                }, 2000);
            });
        }
    };

    // Create particles for resume button
    const createButtonParticles = (e) => {
        const particles = 10;
        for(let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'button-particle';
            
            const x = e.clientX - resumeButton.getBoundingClientRect().left;
            const y = e.clientY - resumeButton.getBoundingClientRect().top;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            resumeButton.appendChild(particle);
            
            const angle = (i * (360 / particles)) * (Math.PI / 180);
            const velocity = 50 + Math.random() * 30;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            requestAnimationFrame(() => {
                particle.style.transform = `translate(${tx}px, ${ty}px)`;
                particle.style.opacity = '0';
            });
            
            setTimeout(() => particle.remove(), 1000);
        }
    };

    // Add styles
    const addStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes markerGlow {
                0%, 100% { box-shadow: 0 0 10px var(--accent-color); }
                50% { box-shadow: 0 0 20px var(--accent-color); }
            }

            .timeline-particle {
                position: absolute;
                pointer-events: none;
                border-radius: 50%;
                transition: transform 1s ease-out, opacity 1s ease-out;
            }

            .button-particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                transition: transform 1s ease-out, opacity 1s ease-out;
            }

            .quote-animate {
                animation: quoteFloat 3s ease-in-out infinite;
            }

            @keyframes quoteFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            .downloading {
                animation: downloadPulse 0.5s ease infinite;
            }

            @keyframes downloadPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(0.95); }
            }
        `;
        document.head.appendChild(style);
    };

    // Initialize everything
    const init = () => {
        addStyles();
        initTimelineAnimation();
        initCardHoverEffects();
        initQuoteAnimation();
        initResumeButton();
    };

    // Run initialization
    init();
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    initExperienceSection();
});
// Contact Section Initialization and Animations
function initContactSection() {
    const contactForm = document.getElementById('contact-form');
    const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
    const submitBtn = document.querySelector('.submit-btn');
    const contactCards = document.querySelectorAll('.contact-card');

    // Particle Effects System
    class ParticleEffect {
        constructor(element) {
            this.element = element;
            this.particles = [];
            this.maxParticles = 20;
        }

        createParticle(x, y, color) {
            const particle = document.createElement('div');
            particle.className = 'contact-particle';
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: ${color};
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                opacity: 1;
                transition: transform 1s ease-out, opacity 1s ease-out;
            `;
            return particle;
        }

        emit(e) {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            for (let i = 0; i < this.maxParticles; i++) {
                const particle = this.createParticle(
                    x,
                    y,
                    `hsl(${Math.random() * 60 + 160}, 100%, 60%)`
                );
                this.element.appendChild(particle);

                const angle = (Math.random() * 360 * Math.PI) / 180;
                const velocity = Math.random() * 100 + 50;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;

                requestAnimationFrame(() => {
                    particle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                    particle.style.opacity = '0';
                });

                setTimeout(() => particle.remove(), 1000);
            }
        }
    }

    // Initialize Particle Effects
    contactCards.forEach(card => {
        const particleSystem = new ParticleEffect(card);
        card.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.85) { // Throttle particle creation
                particleSystem.emit(e);
            }
        });
    });

    // Form Input Animations
    inputs.forEach(input => {
        // Ripple effect on focus
        input.addEventListener('focus', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'input-ripple';
            this.parentElement.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            ripple.style.cssText = `
                position: absolute;
                width: 5px;
                height: 5px;
                background: var(--accent-color);
                border-radius: 50%;
                transform: scale(1);
                opacity: 0;
                pointer-events: none;
            `;

            requestAnimationFrame(() => {
                ripple.style.transition = 'all 0.6s ease-out';
                ripple.style.transform = 'scale(100)';
                ripple.style.opacity = '0.2';
            });

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Enhanced Form Submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            // Prepare email content
            const subject = encodeURIComponent(`New Contact Message from ${data.name}`);
            const body = encodeURIComponent(
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n\n` +
                `Message:\n${data.message}`
            );

            // Create success notification
            const notification = document.createElement('div');
            notification.className = 'notification success';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Message sent successfully!</p>
            `;
            document.body.appendChild(notification);

            // Animate notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);

            // Remove notification after delay
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);

            // Open mail client
            window.location.href = `mailto:madhavansiva27@gmail.com?subject=${subject}&body=${body}`;

            // Reset form
            contactForm.reset();

            // Add success animation to form
            contactForm.classList.add('success');
            setTimeout(() => contactForm.classList.remove('success'), 2000);

        } catch (error) {
            console.error('Error:', error);
            
            // Show error notification
            const notification = document.createElement('div');
            notification.className = 'notification error';
            notification.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <p>Error sending message. Please try again.</p>
            `;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.classList.add('show');
            }, 100);

            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    });

    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification.success {
            border-left: 4px solid #00ff88;
        }

        .notification.error {
            border-left: 4px solid #ff4444;
        }

        .notification i {
            font-size: 1.2rem;
        }

        .notification.success i {
            color: #00ff88;
        }

        .notification.error i {
            color: #ff4444;
        }

        .input-ripple {
            position: absolute;
            border-radius: 50%;
            transform-origin: center;
        }

        .contact-particle {
            position: absolute;
            pointer-events: none;
            z-index: 10;
        }

        @keyframes success-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }

        .success {
            animation: success-pulse 0.5s ease;
        }
    `;
    document.head.appendChild(style);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initContactSection);
// Future Ambitions Section Enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations and effects
    initVisionCardEffects();
    initGoalCards();
    initTimelineAnimation();
    initParticleEffects();
    initScrollAnimations();
});

// Vision Card Effects
function initVisionCardEffects() {
    const visionCard = document.querySelector('.vision-card');
    if (!visionCard) return;

    visionCard.addEventListener('mousemove', (e) => {
        const rect = visionCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        visionCard.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
        `;
    });

    visionCard.addEventListener('mouseleave', () => {
        visionCard.style.transform = 'translateY(0)';
    });
}

// Goal Cards Animation
function initGoalCards() {
    const goalCards = document.querySelectorAll('.goal-card');
    
    goalCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            createParticles(e, card);
            animateIcon(card);
        });
    });
}

// Particle Effects
function createParticles(e, element) {
    const particles = 10;
    const colors = ['#00ff88', '#00ffcc', '#00ccff'];

    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;

        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        element.appendChild(particle);

        // Animate particle
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            fill: 'forwards'
        }).onfinish = () => particle.remove();
    }
}

// Timeline Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-animate');
                animateTimelineMarker(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        observer.observe(item);
        // Add base styles for animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });
}

// Timeline Marker Animation
function animateTimelineMarker(item) {
    const marker = item.querySelector('.timeline-marker');
    if (!marker) return;

    item.style.opacity = '1';
    item.style.transform = 'translateY(0)';
    item.style.transition = 'all 0.6s ease-out';

    marker.animate([
        { transform: 'scale(0) translateX(-50%)', opacity: 0 },
        { transform: 'scale(1.2) translateX(-50%)', opacity: 0.5 },
        { transform: 'scale(1) translateX(-50%)', opacity: 1 }
    ], {
        duration: 600,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        fill: 'forwards'
    });
}

// Icon Animation
function animateIcon(card) {
    const icon = card.querySelector('.goal-icon i');
    if (!icon) return;

    icon.animate([
        { transform: 'scale(1) rotate(0deg)' },
        { transform: 'scale(1.2) rotate(10deg)' },
        { transform: 'scale(1) rotate(0deg)' }
    ], {
        duration: 500,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    });
}

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.vision-card, .goal-card, .timeline-content, .cta-card');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        scrollObserver.observe(el);
    });
}

// Add required CSS for animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    .timeline-animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .particle {
        position: absolute;
        pointer-events: none;
    }
`;
document.head.appendChild(styleSheet);