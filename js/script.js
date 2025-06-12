
// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                const categories = item.getAttribute('data-category').split(' ');
                if (categories.includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Modal functionality
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
let isModalOpen = false;

function openModal(element) {
    const img = element.querySelector('img');
    modal.style.display = 'block';
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    document.body.style.overflow = 'hidden';
    isModalOpen = true;
    
    // Animate modal opening
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeModal() {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        isModalOpen = false;
    }, 300);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalOpen) {
        closeModal();
    }
});

// Parallax effect on scroll
const heroSection = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (heroBg) {
        heroBg.style.transform = `translate(-50%, ${-50 + rate * 0.8}px)`;
    }
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 800;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to elements
document.addEventListener('DOMContentLoaded', () => {
    // Gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // About content
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateY(30px)';
        aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(aboutContent);
    }
});

// Form validation and submission feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // The form will be handled by Formspree
        // This is just for additional client-side validation if needed
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--accent)';
            } else {
                input.style.borderColor = 'transparent';
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
}

// Lazy loading for images
const imageTargets = document.querySelectorAll('img[data-src]');

const imageLoader = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('fade-in');
            observer.unobserve(img);
        }
    });
});

imageTargets.forEach(img => imageLoader.observe(img));

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll event
const optimizedScroll = debounce(() => {
    // Scroll-based animations go here
}, 16);

window.addEventListener('scroll', optimizedScroll);

// Mobile menu toggle (if you add a hamburger menu later)
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// Theme switching functionality
function initThemeSwitch() {
    // Get current hour
    const currentHour = new Date().getHours();
    
    // Determine theme based on time of day
    // Light theme: 6 AM to 6 PM (6-18)
    // Dark theme: 6 PM to 6 AM (18-6)
    const isLightTime = currentHour >= 6 && currentHour < 18;
    const theme = isLightTime ? 'light' : 'dark';
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Store theme in localStorage for consistency
    localStorage.setItem('preferred-theme', theme);
    localStorage.setItem('theme-set-time', Date.now().toString());
    
    console.log(`Theme set to ${theme} based on time: ${currentHour}:00`);
}

// Check and update theme periodically
function checkThemeUpdate() {
    const lastSetTime = localStorage.getItem('theme-set-time');
    const currentTime = Date.now();
    
    // Update theme every hour (3600000 ms)
    if (!lastSetTime || currentTime - parseInt(lastSetTime) > 3600000) {
        initThemeSwitch();
    }
}

// Subtle typing effect for main tagline
function initTaglineEffect() {
    const taglineMain = document.querySelector('.tagline-main');
    if (taglineMain && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const originalText = taglineMain.textContent;
        taglineMain.textContent = '';
        taglineMain.style.opacity = '1';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            taglineMain.textContent = originalText.slice(0, i + 1);
            i++;
            if (i >= originalText.length) {
                clearInterval(typeInterval);
            }
        }, 100);
    }
}

// Subtle Cursor Animation
function initSubtleCursor() {
    const cursor = document.querySelector('.cursor-glow');
    const hoverElements = document.querySelectorAll('a, button, .gallery-item, input, textarea, .filter-btn, .payment-option');
    
    // Check if device supports hover (desktop vs mobile)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    
    if (hasHover && cursor) {
        // Move cursor to mouse position
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add hover effects
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0.6';
        });
    }
}

// Image Protection Functions
function initImageProtection() {
    // Disable right-click on images
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // Disable drag and drop on images
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // Disable common keyboard shortcuts for saving images
    document.addEventListener('keydown', function(e) {
        // Disable Ctrl+S, Ctrl+A, Ctrl+Shift+I, F12
        if ((e.ctrlKey && (e.key === 's' || e.key === 'a')) || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') || 
            e.key === 'F12') {
            e.preventDefault();
            return false;
        }
    });

    // Add selection prevention to all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('draggable', 'false');
        img.style.pointerEvents = 'none';
    });
}

// Payment option interaction
function initPaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            const paymentMethod = this.querySelector('span').textContent;
            
            // Create a simple notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--glass);
                backdrop-filter: blur(15px);
                color: var(--text);
                padding: 2rem;
                border-radius: 15px;
                border: 1px solid var(--accent);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                text-align: center;
                max-width: 400px;
                animation: fadeIn 0.3s ease;
            `;
            
            notification.innerHTML = `
                <h3 style="margin-bottom: 1rem; color: var(--accent);">Contact for ${paymentMethod}</h3>
                <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">Please use the contact form below or email me directly with your print selection and I'll send you ${paymentMethod} details.</p>
                <button onclick="this.parentElement.remove()" style="
                    background: var(--accent);
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                ">Got it!</button>
            `;
            
            document.body.appendChild(notification);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 5000);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initThemeSwitch();
    initSubtleCursor();
    initImageProtection();
    initPaymentOptions();
    
    // Add typing effect with slight delay after page load
    setTimeout(initTaglineEffect, 1000);
    
    // Check for theme updates every 30 minutes
    setInterval(checkThemeUpdate, 1800000);
    
    // Log performance metrics
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        });
    }
});