// ========================================
// ENGINEERING LEARNING PLATFORM - MAIN JAVASCRIPT
// ========================================

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Smooth scrolling for anchor links
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

    // Active navigation highlight on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe course cards and feature cards
    document.querySelectorAll('.course-card, .feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log('✅ Contact form found and ready');
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('📝 Form submitted');
            
            const formMessage = document.getElementById('formMessage');
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            console.log('📤 Sending data:', formData);
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>⏳</span> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Send to backend API
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                console.log('📥 Response received:', response.status);
                const result = await response.json();
                console.log('📊 Result:', result);
                
                if (result.success) {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    formMessage.style.display = 'block';
                    formMessage.className = 'form-message success';
                    formMessage.textContent = '✅ ' + result.message;
                    console.log('✅ Success!');
                    
                    // Show alert for visibility
                    alert('✅ Success! Your message has been received and saved to Excel!');
                } else {
                    // Show error message
                    formMessage.style.display = 'block';
                    formMessage.className = 'form-message error';
                    formMessage.textContent = '❌ ' + result.message;
                    console.log('❌ Error:', result.message);
                }
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Hide message after 8 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 8000);
                
            } catch (error) {
                console.error('❌ Form submission error:', error);
                
                // Show error message
                formMessage.style.display = 'block';
                formMessage.className = 'form-message error';
                formMessage.textContent = '❌ Error: ' + error.message + '. Check console (F12) for details.';
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 8000);
            }
        });
    } else {
        console.log('❌ Contact form not found!');
    }

// Progress tracking (placeholder for future implementation)
function trackProgress(courseId, lessonId) {
    console.log('Tracking progress:', courseId, lessonId);
    // To be implemented with localStorage or backend
}
