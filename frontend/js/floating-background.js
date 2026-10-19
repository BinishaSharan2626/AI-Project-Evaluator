// Calm, Monochrome, Pure Vector Line Icons (Floating strictly behind forms and text)
(function() {
    const ICONS = [
        {
            name: 'Code',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>'
        },
        {
            name: 'Terminal',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>'
        },
        {
            name: 'Neural / CPU',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>'
        },
        {
            name: 'Git Branch',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>'
        },
        {
            name: 'Database',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>'
        },
        {
            name: 'Security Audit',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>'
        },
        {
            name: 'Instant Speed',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>'
        },
        {
            name: 'Architecture',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>'
        },
        {
            name: 'Code File',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><polyline points="10 13 8 15 10 17"></polyline><polyline points="14 13 16 15 14 17"></polyline></svg>'
        },
        {
            name: 'Score Metrics',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>'
        },
        {
            name: 'AI Analytics',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>'
        },
        {
            name: 'Cloud Server',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>'
        },
        {
            name: 'Settings',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>'
        },
        {
            name: 'Network',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>'
        },
        {
            name: 'Rubric Evaluator',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
        },
        {
            name: 'AST Inspector',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'
        },
        {
            name: 'Package Module',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>'
        },
        {
            name: 'Git Commit',
            svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><line x1="1.05" y1="12" x2="8" y2="12"></line><line x1="16" y1="12" x2="22.95" y2="12"></line></svg>'
        }
    ];

    function getRandomAmbientX() {
        const w = window.innerWidth;
        if (w < 768) {
            // Mobile: keep along left and right ambient borders
            return Math.random() < 0.5 
                ? Math.random() * (w * 0.16) + 12 
                : w - (Math.random() * (w * 0.16) + 38);
        }
        // Desktop: 3 open background lanes (Left margin, Center canal between text & form, Right margin)
        const lane = Math.random();
        if (lane < 0.38) {
            // Left margin
            return Math.random() * (w * 0.18) + 18;
        } else if (lane < 0.65) {
            // Center open canal between hero text and form
            return (w * 0.46) + Math.random() * (w * 0.08);
        } else {
            // Right margin
            return (w * 0.82) + Math.random() * (w * 0.13);
        }
    }

    function initInteractiveFloating() {
        const old = document.querySelector('.floating-bg-container');
        if (old) old.remove();

        const container = document.createElement('div');
        container.className = 'floating-bg-container';
        container.setAttribute('aria-hidden', 'true');
        document.body.prepend(container);

        const isMobile = window.innerWidth < 768;
        const bubbleCount = isMobile ? 5 : 8; // Calm, peaceful ambient count
        const bubbles = [];

        function getUniqueIcon() {
            const usedNames = new Set(bubbles.map(b => b && b.icon ? b.icon.name : null).filter(Boolean));
            const available = ICONS.filter(item => !usedNames.has(item.name));
            const pool = available.length > 0 ? available : ICONS;
            return pool[Math.floor(Math.random() * pool.length)];
        }

        function createBubble(initialY) {
            const iconData = getUniqueIcon();
            const size = 28; // Cute, compact 28px bubble
            const el = document.createElement('div');
            el.className = 'floating-bubble';
            el.style.width = size + 'px';
            el.style.height = size + 'px';
            el.style.opacity = '0';

            el.innerHTML = `
                ${iconData.svg}
                <span class="bubble-tooltip">${iconData.name}</span>
            `;

            container.appendChild(el);

            const b = {
                el,
                icon: iconData,
                size,
                x: getRandomAmbientX(),
                y: initialY !== undefined ? initialY : window.innerHeight + Math.random() * 80,
                baseX: 0,
                // Slow, calm drift speed: 0.16 to 0.30 px/frame (~10-18 px/sec)
                speed: Math.random() * 0.14 + 0.16,
                swaySpeed: Math.random() * 0.004 + 0.003,
                swayAmp: Math.random() * 10 + 6,
                swayAngle: Math.random() * Math.PI * 2,
                isHovered: false,
                isPopping: false
            };
            b.baseX = b.x;

            // Hover / Touch interaction
            function onEnter() {
                if (b.isPopping) return;
                b.isHovered = true;
                el.classList.add('is-hovered');
            }

            function onLeave() {
                b.isHovered = false;
                el.classList.remove('is-hovered');
            }

            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
            el.addEventListener('pointerenter', onEnter);
            el.addEventListener('pointerleave', onLeave);

            // Pop on click or tap
            function handlePop(e) {
                if (b.isPopping) return;
                e.stopPropagation();
                e.preventDefault();
                popBubble(b);
            }

            el.addEventListener('click', handlePop);
            el.addEventListener('pointerdown', handlePop);

            return b;
        }

        function popBubble(b) {
            b.isPopping = true;
            b.isHovered = false;
            b.el.classList.remove('is-hovered');
            b.el.classList.add('bubble-popping');

            // Spawn 8 clean glowing micro-particles flying outward (no emojis!)
            const rect = b.el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 8; i++) {
                spawnSparkle(centerX, centerY);
            }

            // Respawns smoothly from the bottom with a fresh unique SVG icon
            setTimeout(() => {
                b.el.classList.remove('bubble-popping');
                b.isPopping = false;
                resetBubble(b);
            }, 500);
        }

        function spawnSparkle(x, y) {
            const sparkle = document.createElement('div');
            sparkle.className = 'pop-sparkle';
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 45 + 18;

            sparkle.style.left = (x - 2) + 'px';
            sparkle.style.top = (y - 2) + 'px';
            sparkle.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
            sparkle.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);

            container.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 550);
        }

        function resetBubble(b) {
            const newIcon = getUniqueIcon();
            b.icon = newIcon;
            b.el.innerHTML = `
                ${newIcon.svg}
                <span class="bubble-tooltip">${newIcon.name}</span>
            `;

            b.y = window.innerHeight + Math.random() * 40 + 20;
            b.baseX = getRandomAmbientX();
            b.x = b.baseX;
            b.speed = Math.random() * 0.14 + 0.16;
            b.swayAngle = Math.random() * Math.PI * 2;
        }

        // Initialize bubbles staggered vertically across the screen
        for (let i = 0; i < bubbleCount; i++) {
            const initialY = (window.innerHeight / bubbleCount) * i + Math.random() * 25;
            bubbles.push(createBubble(initialY));
        }

        // Animation Loop (Slow, peaceful floating with soft fading)
        function animate() {
            const screenH = window.innerHeight;

            for (let i = 0; i < bubbles.length; i++) {
                const b = bubbles[i];
                if (!b.isHovered && !b.isPopping) {
                    b.y -= b.speed;
                    b.swayAngle += b.swaySpeed;
                    b.x = b.baseX + Math.sin(b.swayAngle) * b.swayAmp;

                    if (b.y < -b.size - 30) {
                        resetBubble(b);
                    }

                    // Soft organic fade-in at bottom and fade-out at top
                    let opacity = 0.45;
                    if (b.y > screenH - 100) {
                        opacity = Math.max(0, (screenH - b.y) / 100 * 0.45);
                    } else if (b.y < 100) {
                        opacity = Math.max(0, (b.y / 100) * 0.45);
                    }
                    b.el.style.opacity = opacity;

                    b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
                } else if (b.isHovered && !b.isPopping) {
                    b.el.style.opacity = '1';
                    // Scale up to 1.4x smoothly on hover
                    b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0) scale(1.4)`;
                }
            }
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);

        // Window resize handler
        window.addEventListener('resize', () => {
            bubbles.forEach(b => {
                if (b.baseX > window.innerWidth - b.size - 20) {
                    b.baseX = getRandomAmbientX();
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initInteractiveFloating);
    } else {
        initInteractiveFloating();
    }
})();
