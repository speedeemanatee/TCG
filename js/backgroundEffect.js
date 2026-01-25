class BackgroundEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isActive = false;

        // Configuration
        this.particleCount = 35; // Reduced from 60
        this.connectionDistance = 150;
        this.mouseRadius = 300; // Increased radius for interaction
        this.ballsCollected = 0; // Track gathered balls

        this.init();
    }

    init() {
        this.canvas.id = 'bg-effect-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '1'; // Behind content (z-index 10) but above background
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.opacity = '0.8'; // Slightly more translucent

        const startScreen = document.getElementById('start-screen');
        if (startScreen) {
            startScreen.appendChild(this.canvas);
        } else {
            document.body.appendChild(this.canvas);
        }

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1.5, // Velocity
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 6 + 4, // Smaller: 4-10px
                angle: Math.random() * Math.PI * 2,
                spin: (Math.random() - 0.5) * 0.1
            });
        }
    }

    start() {
        // Only run on desktop/large screens
        if (window.innerWidth <= 1024) return;

        this.isActive = true;
        this.animate();
        this.canvas.style.display = 'block';
    }

    stop() {
        this.isActive = false;
        this.canvas.style.display = 'none';
    }

    drawPokeball(p) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Main circle (White bottom)
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#f0f0f0';
        ctx.fill();

        // Top half (Red)
        ctx.beginPath();
        ctx.arc(0, 0, p.size, Math.PI, Math.PI * 2);
        ctx.fillStyle = '#ef4444'; // Tailwind Red-500 equivalent
        ctx.fill();

        // Center line (Black)
        ctx.beginPath();
        ctx.rect(-p.size, -p.size * 0.1, p.size * 2, p.size * 0.2);
        ctx.fillStyle = '#1e1e1e';
        ctx.fill();

        // Center button (Outer Black)
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = '#1e1e1e';
        ctx.fill();

        // Center button (Inner White)
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        // Shine/Glare on top
        ctx.beginPath();
        ctx.ellipse(-p.size * 0.4, -p.size * 0.4, p.size * 0.2, p.size * 0.1, Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();

        ctx.restore();
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Filter out collected particles
        this.particles = this.particles.filter(p => !p.collected);

        this.particles.forEach(p => {
            // Move
            p.x += p.vx;
            p.y += p.vy;
            p.angle += p.spin;

            // Bounce off edges
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Mouse Attraction / Swarm
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Collection Check (Mouse hits ball)
            if (distance < p.size + 20) { // Tolerance
                p.collected = true;
                this.ballsCollected++;

                // Visual pop? just disappear for now

                // Check win condition
                if (this.ballsCollected >= 10) {
                    if (window.unlockTroutDeck) {
                        // Check unlocked status via DOM check to correspond with main.js logic
                        if (!document.querySelector('.deck-choice[data-deck="trout"]')) {
                            window.unlockTroutDeck();
                            this.ballsCollected = 0; // Reset
                        }
                    }
                }
            }

            if (distance < this.mouseRadius) {
                // Stronger pull towards mouse
                const force = (this.mouseRadius - distance) / this.mouseRadius;
                // Increased multiplier from 0.05 to 0.15 for stronger "magnetism"
                p.vx += (dx / distance) * force * 0.15;
                p.vy += (dy / distance) * force * 0.15;

                // Limit velocity (drag) slightly stronger to control the swarm
                p.vx *= 0.95;
                p.vy *= 0.95;
            }

            this.drawPokeball(p);
        });

        // Respawn if too few? (Optional, but let's keep it simple: consume them)
        // If we run out, maybe spawn more? 
        if (this.particles.length < 10) { // Keep some on screen
            // Spawn one new one occasionally?
            if (Math.random() < 0.05) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    size: Math.random() * 6 + 4,
                    angle: Math.random() * Math.PI * 2,
                    spin: (Math.random() - 0.5) * 0.1,
                    collected: false
                });
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Global instance to be initialized in main.js
window.BackgroundEffect = BackgroundEffect;
