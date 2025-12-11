/**
 * StyleDNA Landing Page JavaScript
 * Handles navigation, animations, form submissions, and interactions
 */

(function() {
    'use strict';

    // ===== NAVIGATION SCROLL EFFECT =====
    const nav = document.getElementById('nav');
    let lastScroll = 0;
    let ticking = false;

    function updateNav() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);

            if (target) {
                var navHeight = nav.offsetHeight;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== FORM SUBMISSION =====
    var forms = document.querySelectorAll('.waitlist-form');

    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var emailInput = form.querySelector('input[type="email"]');
            var email = emailInput.value;
            var submitBtn = form.querySelector('button[type="submit"]');
            var originalText = submitBtn.textContent;

            // Validate email
            if (!isValidEmail(email)) {
                showError(form, 'Please enter a valid email address');
                return;
            }

            // Show loading state
            submitBtn.textContent = 'Joining...';
            submitBtn.disabled = true;

            // Simulate API call (replace with actual Formspree or backend endpoint)
            // For production, replace this with actual form submission
            setTimeout(function() {
                // Simulating successful submission
                // In production, use:
                // fetch('https://formspree.io/f/YOUR_FORM_ID', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ email: email })
                // }).then(response => { ... })

                showSuccess(form);
                updateWaitlistCount();

                // Track conversion (if analytics is set up)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'sign_up', {
                        method: 'waitlist',
                        location: form.id === 'hero-waitlist-form' ? 'hero' : 'footer'
                    });
                }
            }, 1500);
        });
    });

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showSuccess(form) {
        var formGroup = form.querySelector('.form-group');
        formGroup.innerHTML = '\n            <div class="success-message">\n                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>\n                    <polyline points="22 4 12 14.01 9 11.01"/>\n                </svg>\n                <span>You\'re on the list! We\'ll be in touch soon.</span>\n            </div>\n        ';
    }

    function showError(form, message) {
        // Remove existing error
        var existingError = form.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        var errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.textContent = message;
        form.appendChild(errorEl);

        // Shake animation on input
        var formGroup = form.querySelector('.form-group');
        formGroup.style.animation = 'shake 0.5s ease';
        setTimeout(function() {
            formGroup.style.animation = '';
        }, 500);

        // Remove error after delay
        setTimeout(function() {
            if (errorEl.parentNode) {
                errorEl.remove();
            }
        }, 3000);
    }

    function updateWaitlistCount() {
        // Increment the displayed count
        var counters = document.querySelectorAll('.counter');
        counters.forEach(function(counter) {
            var currentTarget = parseInt(counter.dataset.target, 10);
            counter.dataset.target = currentTarget + 1;
            counter.textContent = (currentTarget + 1).toLocaleString();
        });
    }

    // ===== ANIMATED COUNTER =====
    function animateCounter(element, target, duration) {
        duration = duration || 2000;
        var start = 0;
        var startTime = null;

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var easedProgress = easeOutQuart(progress);
            var current = Math.floor(easedProgress * target);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        window.requestAnimationFrame(step);
    }

    // ===== SCROLL ANIMATIONS (Intersection Observer) =====
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Trigger counter animation if it's a counter element
                if (entry.target.classList.contains('counter') ||
                    entry.target.querySelector('.counter')) {
                    var counter = entry.target.classList.contains('counter')
                        ? entry.target
                        : entry.target.querySelector('.counter');

                    if (counter && counter.dataset.target) {
                        var target = parseInt(counter.dataset.target, 10);
                        animateCounter(counter, target);
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
        observer.observe(el);
    });

    // Observe counter elements
    document.querySelectorAll('.counter').forEach(function(el) {
        observer.observe(el);
    });

    // ===== COOKIE CONSENT (GDPR) =====
    function initCookieConsent() {
        var consent = localStorage.getItem('cookieConsent');

        if (!consent) {
            setTimeout(showCookieBanner, 2000); // Show after 2 seconds
        }
    }

    function showCookieBanner() {
        var banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = '\n            <div class="cookie-content">\n                <p>We use cookies to improve your experience. By continuing, you agree to our <a href="/cookies.html">Cookie Policy</a>.</p>\n                <div class="cookie-actions">\n                    <button class="btn btn-secondary" onclick="window.declineCookies()">Decline</button>\n                    <button class="btn btn-primary" onclick="window.acceptCookies()">Accept</button>\n                </div>\n            </div>\n        ';
        document.body.appendChild(banner);

        // Trigger animation
        setTimeout(function() {
            banner.classList.add('show');
        }, 100);
    }

    window.acceptCookies = function() {
        localStorage.setItem('cookieConsent', 'accepted');
        var banner = document.querySelector('.cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(function() {
                banner.remove();
            }, 300);
        }
        // Initialize analytics here if needed
    };

    window.declineCookies = function() {
        localStorage.setItem('cookieConsent', 'declined');
        var banner = document.querySelector('.cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(function() {
                banner.remove();
            }, 300);
        }
    };

    // ===== DNA VISUALIZATION INTERACTION =====
    function initDNAVisualization() {
        var dnaContainer = document.querySelector('.dna-visualization');
        if (!dnaContainer) return;

        var tags = dnaContainer.querySelectorAll('.dna-tag');

        // Add hover effect to tags
        tags.forEach(function(tag) {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.zIndex = '10';
            });

            tag.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.zIndex = '';
            });
        });
    }

    // ===== PARALLAX EFFECT FOR HERO ORBS =====
    function initParallax() {
        var orbs = document.querySelectorAll('.hero-orb');

        if (orbs.length === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        window.addEventListener('mousemove', function(e) {
            var x = e.clientX / window.innerWidth;
            var y = e.clientY / window.innerHeight;

            orbs.forEach(function(orb, index) {
                var speed = (index + 1) * 20;
                var xOffset = (x - 0.5) * speed;
                var yOffset = (y - 0.5) * speed;

                orb.style.transform = 'translate(' + xOffset + 'px, ' + yOffset + 'px)';
            });
        });
    }

    // ===== SCROLL PROGRESS INDICATOR (Optional) =====
    function initScrollProgress() {
        var progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = '\n            position: fixed;\n            top: 0;\n            left: 0;\n            height: 3px;\n            background: var(--gradient-main);\n            z-index: 1001;\n            transition: width 0.1s;\n            width: 0%;\n        ';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', function() {
            var scrollTop = window.pageYOffset;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    }

    // ===== FORM INPUT ANIMATION =====
    function initFormAnimations() {
        var inputs = document.querySelectorAll('.form-input');

        inputs.forEach(function(input) {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // ===== KEYBOARD NAVIGATION =====
    function initKeyboardNav() {
        document.addEventListener('keydown', function(e) {
            // ESC to close cookie banner
            if (e.key === 'Escape') {
                var banner = document.querySelector('.cookie-banner.show');
                if (banner) {
                    window.declineCookies();
                }
            }
        });
    }

    // ===== LAZY LOAD IMAGES (if any are added later) =====
    function initLazyLoad() {
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback for older browsers
            var lazyImages = document.querySelectorAll('img[loading="lazy"]');
            var imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        img.src = img.dataset.src;
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    // ===== PREVENT FLASH OF UNSTYLED CONTENT =====
    function removeFOUC() {
        document.documentElement.classList.remove('no-js');
        document.documentElement.classList.add('js');
    }

    // ===== INITIALIZE =====
    function init() {
        removeFOUC();
        initCookieConsent();
        initDNAVisualization();
        initParallax();
        initFormAnimations();
        initKeyboardNav();
        initLazyLoad();
        // Uncomment if you want scroll progress bar:
        // initScrollProgress();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Add shake animation keyframes dynamically
    var style = document.createElement('style');
    style.textContent = '\n        @keyframes shake {\n            0%, 100% { transform: translateX(0); }\n            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }\n            20%, 40%, 60%, 80% { transform: translateX(5px); }\n        }\n    ';
    document.head.appendChild(style);

})();
