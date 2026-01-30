// Dynamic Visual Effects & Animations
// Creates confetti, shuffling effects, and moving elements

class VisualEffects {
    constructor() {
        this.init();
    }

    init() {
        this.createConfetti();
        this.createFloatingShapes();
        this.shuffleCardColors();
        this.addParallaxEffect();
        this.createMouseTrail();
    }

    // Create confetti effect on page load
    createConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fee140', '#fa709a'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.random() * colors.length | 0];
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = (Math.random() * 10 + 5) + 'px';
                confetti.style.animationDelay = Math.random() * 2 + 's';
                confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 6000);
            }, i * 50);
        }
    }

    // Create floating geometric shapes in background
    createFloatingShapes() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const shapes = ['🌟', '⭐', '✨', '💫', '🔷', '🔶', '🔵', '🟣', '🟢'];
        
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            shape.textContent = shapes[Math.random() * shapes.length | 0];
            shape.style.position = 'absolute';
            shape.style.fontSize = (Math.random() * 30 + 20) + 'px';
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            shape.style.opacity = '0.3';
            shape.style.animation = `floatStar${(i % 3) + 1} ${Math.random() * 10 + 8}s ease-in-out infinite`;
            shape.style.animationDelay = Math.random() * 5 + 's';
            shape.style.pointerEvents = 'none';
            
            hero.appendChild(shape);
        }
    }

    // Shuffle course card colors periodically - DISABLED for dark theme consistency
    shuffleCardColors() {
        // Disabled to maintain dark theme consistency
        // Cards keep their original dark theme colors
        return;
        
        /* Original shuffling code disabled
        const cards = document.querySelectorAll('.course-card');
        const gradients = [
            'linear-gradient(145deg, #e0e7ff 0%, #c7d2fe 100%)',
            'linear-gradient(145deg, #fce7f3 0%, #fbcfe8 100%)',
            'linear-gradient(145deg, #dbeafe 0%, #bfdbfe 100%)',
            'linear-gradient(145deg, #d1fae5 0%, #a7f3d0 100%)',
            'linear-gradient(145deg, #fef3c7 0%, #fde68a 100%)',
            'linear-gradient(145deg, #fee2e2 0%, #fecaca 100%)'
        ];

        setInterval(() => {
            cards.forEach(card => {
                const currentGradient = gradients[Math.random() * gradients.length | 0];
                card.style.transition = 'background 2s ease';
                card.style.background = currentGradient;
            });
        }, 10000); // Shuffle every 10 seconds
        */
    }

    // Add parallax scrolling effect
    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.course-card, .feature-card');
            
            parallaxElements.forEach((el, index) => {
                const speed = (index % 2 === 0) ? 0.5 : -0.5;
                const yPos = scrolled * speed * 0.1;
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Create mouse trail effect
    createMouseTrail() {
        const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b'];
        let colorIndex = 0;

        document.addEventListener('mousemove', (e) => {
            // Only create trail on course cards
            if (e.target.closest('.course-card')) {
                const trail = document.createElement('div');
                trail.style.position = 'fixed';
                trail.style.width = '10px';
                trail.style.height = '10px';
                trail.style.borderRadius = '50%';
                trail.style.background = colors[colorIndex % colors.length];
                trail.style.left = e.clientX + 'px';
                trail.style.top = e.clientY + 'px';
                trail.style.pointerEvents = 'none';
                trail.style.zIndex = '9999';
                trail.style.opacity = '0.6';
                trail.style.transition = 'all 0.5s ease';
                
                document.body.appendChild(trail);
                
                colorIndex++;
                
                setTimeout(() => {
                    trail.style.opacity = '0';
                    trail.style.transform = 'scale(3)';
                }, 50);
                
                setTimeout(() => trail.remove(), 600);
            }
        });
    }
}

// Animated Number Counter for Stats
class NumberCounter {
    static animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    static init() {
        const statValues = document.querySelectorAll('.stat-value');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const value = parseInt(entry.target.textContent);
                    entry.target.textContent = '0';
                    this.animateValue(entry.target, 0, value, 2000);
                    observer.unobserve(entry.target);
                }
            });
        });

        statValues.forEach(stat => observer.observe(stat));
    }
}

// Rotating Course Icons
class IconRotator {
    constructor() {
        this.icons = {
            'software': ['💻', '🖥️', '⌨️', '🖱️', '💾'],
            'programming': ['⌨️', '🔧', '🔨', '⚡', '🚀'],
            'electrical': ['⚡', '🔌', '💡', '🔋', '⚙️'],
            'mechanical': ['⚙️', '🔩', '🔧', '🛠️', '⚡']
        };
        this.currentIndex = {};
        this.init();
    }

    init() {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (!category) return;
            
            this.currentIndex[category] = 0;
            const iconElement = card.querySelector('.course-icon');
            
            if (iconElement && this.icons[category]) {
                setInterval(() => {
                    this.currentIndex[category] = (this.currentIndex[category] + 1) % this.icons[category].length;
                    iconElement.style.animation = 'none';
                    setTimeout(() => {
                        iconElement.textContent = this.icons[category][this.currentIndex[category]];
                        iconElement.style.animation = 'spinGrow 0.6s ease';
                    }, 10);
                }, 5000); // Rotate every 5 seconds
            }
        });
    }
}

// Rainbow Border Effect on Scroll
class RainbowBorder {
    constructor() {
        this.hue = 0;
        this.init();
    }

    init() {
        setInterval(() => {
            this.hue = (this.hue + 1) % 360;
            const cards = document.querySelectorAll('.course-card:hover');
            cards.forEach(card => {
                card.style.borderColor = `hsl(${this.hue}, 70%, 60%)`;
            });
        }, 50);
    }
}

// Image Shuffle Effect for Course Cards - DISABLED for consistency
class ImageShuffler {
    constructor() {
        // Disabled to maintain consistent dark theme
        // Stat cards keep their gradient colors
    }

    init() {
        // Shuffling disabled for dark theme consistency
        return;
        
        /* Original code disabled
        const statCards = document.querySelectorAll('.stat-card');
        
        setInterval(() => {
            statCards.forEach((card, index) => {
                const randomBg = this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)];
                card.style.background = randomBg;
                card.style.transition = 'background 1.5s ease';
            });
        }, 7000); // Change every 7 seconds
        */
    }
}

// Particle System for Hero Section
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        hero.style.position = 'relative';
        hero.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createParticles() {
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: `hsla(${Math.random() * 360}, 70%, 70%, 0.6)`
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VisualEffects();
    new IconRotator();
    new RainbowBorder();
    new ImageShuffler();
    NumberCounter.init();
    new ParticleSystem();
    
    console.log('🎨 Colorful theme activated with moving animations!');
});
