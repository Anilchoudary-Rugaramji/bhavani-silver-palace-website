// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initHeaderScroll();
    initAnimations();
    initScrollProgress();
    initBackToTop();
    initContactForm();
    initButtonEffects();
    initGalleryAnimations();
    initTypingEffect();
    initParallaxEffect(); // Add parallax effect here
    initLazyLoading(); // Add lazy loading here
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Background Change on Scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Animate on Scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.product-card, .feature-item, .gallery-item, .section-title, .section-subtitle');
    elementsToAnimate.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        scrollProgress.style.width = scrollPercent + '%';
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form Handling with WhatsApp Integration
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !phone || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            // Create WhatsApp message
            const whatsappMessage = `*New Contact Form Submission from Bhavani Silver Palace Website*

*Customer Details:*
👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone}

*Message:*
${message}

---
*Sent from:* Bhavani Silver Palace Website
*Store:* Bhavani Silver Palace, Opposite to Med Plus, SS Puram Main Road, Tumkur
*Contact:* +91 8217791266`;

            // Encode message for WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappNumber = '918217791266'; // Your testing phone number
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp with pre-filled message
            window.open(whatsappUrl, '_blank');
            
            // Show success message with instructions
            showNotification('WhatsApp opened! Please click send to deliver your message. 📱', 'success');
            
            // Alternative: Show a modal with the message for easy copying
            showMessageModal(whatsappMessage);
            
            // Reset form
            this.reset();
        });
    }
}

// Button Effects
function initButtonEffects() {
    // Ripple effect for primary buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function (e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
            `;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Gallery Animations
function initGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add notification styles
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
        }
        
        .notification-success {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
        }
        
        .notification-error {
            background: linear-gradient(135deg, #dc3545 0%, #e74c3c 100%);
            color: white;
        }
        
        .notification-info {
            background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
            color: #2c2c2c;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(notificationStyles);

    // Add to page
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image img');

    if (hero && heroImage) {
        // Use throttled scroll event for better performance
        let ticking = false;

        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(function () {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.3; // Reduced intensity for smoother effect
                    heroImage.style.transform = `translateY(${rate}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// Enhanced hover effects for cards
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.product-card, .feature-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Counter animation for statistics (if needed)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}



// Enhanced form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        const value = input.value.trim();

        // Remove previous validation classes
        input.parentElement.classList.remove('error', 'success');

        // Validate required fields
        if (input.hasAttribute('required') && !value) {
            input.parentElement.classList.add('error');
            isValid = false;
        } else if (value) {
            input.parentElement.classList.add('success');
        }

        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.parentElement.classList.add('error');
                isValid = false;
            }
        }

        // Phone validation
        if (input.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                input.parentElement.classList.add('error');
                isValid = false;
            }
        }
    });

    return isValid;
}

// Add form validation to contact form
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateForm(contactForm);
            });

            input.addEventListener('input', function () {
                if (this.value.trim()) {
                    this.parentElement.classList.remove('error');
                    this.parentElement.classList.add('success');
                }
            });
        });
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
});

// Touch gesture support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function (e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function (e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

// Message Modal for WhatsApp Integration
function showMessageModal(message) {
    // Remove existing modal
    const existingModal = document.querySelector('.message-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'message-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>📱 WhatsApp Message Ready</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Your message has been prepared for WhatsApp. You can:</p>
                <div class="message-options">
                    <button class="btn-copy-message">📋 Copy Message</button>
                    <button class="btn-open-whatsapp">📱 Open WhatsApp</button>
                </div>
                <div class="message-preview">
                    <h4>Message Preview:</h4>
                    <div class="message-text">${message.replace(/\n/g, '<br>')}</div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .message-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border: 2px solid #FFD700;
            border-radius: 15px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #FFD700;
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #1a1a1a;
            border-radius: 13px 13px 0 0;
        }
        
        .modal-header h3 {
            margin: 0;
            font-size: 1.3rem;
            font-weight: 600;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            color: #1a1a1a;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: rgba(0, 0, 0, 0.1);
            transform: scale(1.1);
        }
        
        .modal-body {
            padding: 1.5rem;
            color: #ffffff;
        }
        
        .message-options {
            display: flex;
            gap: 1rem;
            margin: 1rem 0;
            flex-wrap: wrap;
        }
        
        .btn-copy-message, .btn-open-whatsapp {
            flex: 1;
            padding: 0.8rem 1.5rem;
            border: 2px solid #FFD700;
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #1a1a1a;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            min-width: 150px;
        }
        
        .btn-copy-message:hover, .btn-open-whatsapp:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
        }
        
        .message-preview {
            margin-top: 1.5rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            border: 1px solid rgba(255, 215, 0, 0.3);
        }
        
        .message-preview h4 {
            margin: 0 0 0.5rem 0;
            color: #FFD700;
            font-size: 1rem;
        }
        
        .message-text {
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.4;
            color: #ffffff;
            white-space: pre-wrap;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                margin: 1rem;
            }
            
            .message-options {
                flex-direction: column;
            }
            
            .btn-copy-message, .btn-open-whatsapp {
                min-width: auto;
            }
        }
    `;
    document.head.appendChild(modalStyles);

    // Add to page
    document.body.appendChild(modal);

    // Event listeners
    const closeBtn = modal.querySelector('.modal-close');
    const copyBtn = modal.querySelector('.btn-copy-message');
    const whatsappBtn = modal.querySelector('.btn-open-whatsapp');

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Close on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', () => {
        modal.remove();
    });

    // Copy message
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(message).then(() => {
            showNotification('Message copied to clipboard! 📋', 'success');
            copyBtn.textContent = '✅ Copied!';
            setTimeout(() => {
                copyBtn.textContent = '📋 Copy Message';
            }, 2000);
        }).catch(() => {
            showNotification('Failed to copy message', 'error');
        });
    });

    // Open WhatsApp
    whatsappBtn.addEventListener('click', () => {
        const whatsappNumber = '918217791266';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        modal.remove();
    });

    // Close on Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Performance optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function () {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-image img');

    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 16)); // 60fps throttling
