// Sound effects
        function playSound(type) {
            const sounds = {
                boop: 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV',
                error: 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV',
                scary: 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV'
            };
            
            const audio = new Audio(sounds[type]);
            audio.volume = 0.5;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }

        // Confetti effect
        function startConfetti() {
            const canvas = document.createElement('canvas');
            canvas.id = 'confetti-canvas';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '100';
            document.body.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const particles = [];
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
            
            function createParticle() {
                return {
                    x: Math.random() * canvas.width,
                    y: -20,
                    size: Math.random() * 10 + 5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speed: Math.random() * 3 + 2,
                    rotation: Math.random() * 360,
                    rotationSpeed: Math.random() * 10 - 5
                };
            }
            
            for (let i = 0; i < 100; i++) {
                particles.push(createParticle());
            }
            
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation * Math.PI / 180);
                    
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    
                    ctx.restore();
                    
                    p.y += p.speed;
                    p.rotation += p.rotationSpeed;
                    
                    if (p.y > canvas.height + p.size) {
                        particles[i] = createParticle();
                        particles[i].y = -20;
                    }
                }
                
                if (window.confettiAnimation) {
                    requestAnimationFrame(animate);
                }
            }
            
            window.confettiAnimation = true;
            animate();
            
            window.addEventListener('resize', function() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        }

        function stopConfetti() {
            window.confettiAnimation = false;
            const canvas = document.getElementById('confetti-canvas');
            if (canvas) {
                canvas.remove();
            }
        }

        // Effect functions
        function showFakeError() {
            const errorDiv = document.createElement('div');
            errorDiv.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    font-family: 'Orbitron', sans-serif;
                ">
                    <div style="
                        background: #ff0033;
                        color: white;
                        padding: 30px;
                        border-radius: 10px;
                        max-width: 500px;
                        text-align: center;
                        box-shadow: 0 0 20px rgba(255,0,0,0.5);
                    ">
                        <h2>SYSTEM ERROR</h2>
                        <p>Button click overflow detected</p>
                        <p>Please stop clicking immediately</p>
                        <button onclick="this.parentElement.parentElement.remove()" style="
                            margin-top: 20px;
                            padding: 10px 20px;
                            background: black;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                        ">DISMISS</button>
                    </div>
                </div>
            `;
            document.body.appendChild(errorDiv);
            playSound('error');
        }

        function emojiRain() {
            const emojis = ['😂', '🤣', '😅', '🤪', '😜', '🤯', '👾', '💩', '🎉', '✨'];
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.pointerEvents = 'none';
            container.style.zIndex = '100';
            document.body.appendChild(container);
            
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const emoji = document.createElement('div');
                    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                    emoji.style.position = 'absolute';
                    emoji.style.left = `${Math.random() * 100}%`;
                    emoji.style.top = '-50px';
                    emoji.style.fontSize = `${Math.random() * 30 + 20}px`;
                    emoji.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
                    container.appendChild(emoji);
                    
                    setTimeout(() => {
                        emoji.remove();
                    }, 5000);
                }, i * 100);
            }
            
            setTimeout(() => {
                container.remove();
            }, 6000);
        }

        function getRandomColor() {
            const colors = ['#00ffea', '#ff00aa', '#aa00ff', '#00ffaa', '#ffaa00'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        // Main effect trigger
        function triggerEffect(count) {
            const button = document.getElementById('theButton');
            const buttonText = button.querySelector('.button-text');
            const body = document.body;
            
            // Reset any previous effects
            button.style.animation = '';
            button.style.transform = '';
            body.style.animation = '';
            body.style.transform = '';
            body.style.backgroundColor = '';
            
            // Clear any existing timeouts to prevent overlapping effects
            if (window.effectTimeout) {
                clearTimeout(window.effectTimeout);
            }
            
            // Effects based on click count
            switch(count) {
                case 1:
                    button.classList.add('jiggle');
                    setTimeout(() => button.classList.remove('jiggle'), 500);
                    break;
                case 2:
                    buttonText.textContent = 'Seriously?';
                    setTimeout(() => {
                        buttonText.textContent = 'The Button That Does Nothing';
                    }, 1000);
                    break;
                case 3:
                    playSound('boop');
                    break;
                case 5:
                    startConfetti();
                    setTimeout(stopConfetti, 2000);
                    break;
                case 7:
                    button.classList.add('float-drop');
                    setTimeout(() => button.classList.remove('float-drop'), 1500);
                    break;
                case 10:
                    showFakeError();
                    break;
                case 15:
                    emojiRain();
                    break;
                case 20:
                    body.classList.add('flicker');
                    setTimeout(() => body.classList.remove('flicker'), 1000);
                    break;
                case 25:
                    playSound('scary');
                    body.style.backgroundColor = 'red';
                    setTimeout(() => {
                        body.style.backgroundColor = '';
                    }, 200);
                    break;
                case 30:
                    alert('Click responsibly.');
                    break;
                case 40:
                    body.style.transform = 'rotate(180deg)';
                    setTimeout(() => {
                        body.style.transform = 'rotate(0deg)';
                    }, 1000);
                    break;
                case 50:
                    body.classList.add('glitch');
                    setTimeout(() => body.classList.remove('glitch'), 500);
                    break;
                case 70:
                    button.style.position = 'absolute';
                    button.style.left = `${Math.random() * 80 + 10}%`;
                    button.style.top = `${Math.random() * 80 + 10}%`;
                    break;
                case 90:
                    button.style.animation = '';
                    button.style.transform = '';
                    button.style.position = '';
                    button.style.left = '';
                    button.style.top = '';
                    buttonText.textContent = 'The Button That Does Nothing';
                    break;
                case 99:
                    buttonText.textContent = 'One more click...';
                    break;
                default:
                    // Random small effects for other clicks
                    if (count % 3 === 0) {
                        button.style.color = getRandomColor();
                    }
                    if (count % 7 === 0) {
                        button.style.transform = `scale(${1 + count/200})`;
                    }
            }
        }

        // Main initialization
        document.addEventListener('DOMContentLoaded', function() {
            const button = document.getElementById('theButton');
            let clickCount = 0;
            
            button.addEventListener('click', function() {
                clickCount++;
                
                // Trigger effect based on click count
                triggerEffect(clickCount);
                
                // Redirect on 100th click
                if (clickCount === 100) {
                    setTimeout(() => {
                        window.location.href = "nothing.html";
                    }, 1000);
                }
            });
            
            // Add hover particle effect
            button.addEventListener('mousemove', function(e) {
                const particle = button.querySelector('.button-particle');
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                particle.style.background = `radial-gradient(circle at ${x}px ${y}px, 
                    rgba(0, 255, 255, 0.3) 0%, 
                    transparent 70%)`;
            });
            
            button.addEventListener('mouseleave', function() {
                const particle = button.querySelector('.button-particle');
                particle.style.background = 'transparent';
            });
        });
