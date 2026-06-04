const STORAGE_KEYS = {
    clicks: "nothingButtonClicks",
    achievements: "nothingButtonAchievements"
};

const DEFAULT_BUTTON_TEXT = "The Button That Does Nothing";
const PI = Math.PI;
const PHI = (1 + Math.sqrt(5)) / 2;
const TAU = PI * 2;
const effects = new Map();

const state = {
    clicks: Number(localStorage.getItem(STORAGE_KEYS.clicks)) || 0,
    chaosLevel: "harmless"
};

const unlockedAchievements = new Set(
    JSON.parse(localStorage.getItem(STORAGE_KEYS.achievements) || "[]")
);

const crypticSymbols = [
    "π", "φ", "ϕ", "τ", "∞", "∅", "∴", "∵", "∷", "∶", "∿", "≜", "≔", "⌁",
    "⌬", "⌖", "⌘", "⌑", "⟁", "⟐", "⟡", "⟢", "⟣", "⟠", "⟴", "⟲", "⟳",
    "⦿", "⧉", "⧊", "⧫", "⧬", "⧭", "⧮", "⧯", "⧰", "⧱", "⧲", "⧳",
    "⨀", "⩇", "⩚", "⩜", "⩟", "⫷", "⫸", "⫶", "⟦", "⟧", "⟬", "⟭"
];

function piPhiIndex(seed, length) {
    const wave = Math.sin((seed + PI) * PHI) + Math.cos((seed + PHI) * TAU);
    return Math.abs(Math.floor(wave * 10000)) % length;
}

function pickCrypticSymbol(seed) {
    return crypticSymbols[piPhiIndex(seed, crypticSymbols.length)];
}

function buildSigilFragment(seed = state.clicks, width = 7) {
    const glyphs = [];

    for (let index = 0; index < width; index += 1) {
        glyphs.push(pickCrypticSymbol(seed + index * PHI));
    }

    return glyphs.join("");
}

function buildEtceteraSigil(seed = state.clicks) {
    const leftWing = buildSigilFragment(seed + PI, 5);
    const rightWing = [...buildSigilFragment(seed + PHI, 5)].reverse().join("");
    const core = pickCrypticSymbol(seed * PHI + PI);

    return `${leftWing}⫷π${core}φ⫸${rightWing}`;
}

function playSound(type) {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) return;

    const audioContext = new AudioContextConstructor();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    const soundMap = {
        boop: { frequency: 520, duration: 0.12, type: "sine" },
        error: { frequency: 110, duration: 0.25, type: "square" },
        scary: { frequency: 55, duration: 0.45, type: "sawtooth" }
    };

    const sound = soundMap[type];
    if (!sound) return;

    oscillator.type = sound.type;
    oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(sound.frequency * 0.55, audioContext.currentTime + sound.duration);

    gain.gain.setValueAtTime(0.12, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + sound.duration);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + sound.duration);
}

function startConfetti(duration = 2000) {
    stopConfetti();

    const canvas = document.createElement("canvas");
    canvas.id = "confetti-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "100";
    document.body.appendChild(canvas);

    const context = canvas.getContext("2d");
    const particles = [];
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

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

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            context.save();
            context.translate(particle.x, particle.y);
            context.rotate((particle.rotation * PI) / 180);
            context.fillStyle = particle.color;
            context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
            context.restore();

            particle.y += particle.speed;
            particle.rotation += particle.rotationSpeed;

            if (particle.y > canvas.height + particle.size) {
                particles[index] = createParticle();
            }
        });

        if (window.confettiAnimation) {
            requestAnimationFrame(animate);
        }
    }

    resizeCanvas();
    for (let index = 0; index < 100; index += 1) {
        particles.push(createParticle());
    }

    window.confettiAnimation = true;
    window.addEventListener("resize", resizeCanvas, { once: true });
    animate();

    window.effectTimeout = setTimeout(stopConfetti, duration);
}

function stopConfetti() {
    window.confettiAnimation = false;
    const canvas = document.getElementById("confetti-canvas");
    if (canvas) canvas.remove();
}

function showFakeError() {
    const overlay = document.createElement("div");
    overlay.className = "error-overlay";
    overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;justify-content:center;align-items:center;z-index:1000;font-family:'Orbitron',sans-serif;";

    const modal = document.createElement("div");
    modal.style.cssText = "background:#ff0033;color:white;padding:30px;border-radius:10px;max-width:500px;text-align:center;box-shadow:0 0 20px rgba(255,0,0,0.5);";

    const title = document.createElement("h2");
    title.textContent = "SYSTEM ERROR";

    const message = document.createElement("p");
    message.textContent = "Button click overflow detected";

    const hint = document.createElement("p");
    hint.textContent = "π/φ recursion refuses to collapse";

    const dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.textContent = "DISMISS";
    dismiss.style.cssText = "margin-top:20px;padding:10px 20px;background:black;color:white;border:none;border-radius:5px;cursor:pointer;";
    dismiss.addEventListener("click", () => overlay.remove());

    modal.append(title, message, hint, dismiss);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    playSound("error");
}

function symbolRain() {
    const container = document.createElement("div");
    container.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:100;";
    document.body.appendChild(container);

    for (let index = 0; index < 50; index += 1) {
        setTimeout(() => {
            const glyph = document.createElement("div");
            glyph.className = "falling-sigil";
            glyph.textContent = buildSigilFragment(state.clicks + index * PHI, Math.random() > 0.7 ? 5 : 1);
            glyph.style.left = `${Math.random() * 100}%`;
            glyph.style.top = "-50px";
            glyph.style.fontSize = `${Math.random() * 26 + 18}px`;
            glyph.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            container.appendChild(glyph);
            setTimeout(() => glyph.remove(), 5000);
        }, index * 100);
    }

    setTimeout(() => container.remove(), 6000);
}

function showEtceteraSeal() {
    const overlay = document.createElement("div");
    overlay.className = "sigil-overlay";

    const seal = document.createElement("div");
    seal.className = "sigil-overlay-seal";
    seal.textContent = buildEtceteraSigil(state.clicks + 42);

    const equation = document.createElement("div");
    equation.className = "sigil-overlay-equation";
    equation.textContent = "π × φ × ETCETERAS = ∞";

    overlay.append(seal, equation);
    document.body.appendChild(overlay);

    setTimeout(() => overlay.classList.add("visible"), 30);
    setTimeout(() => {
        overlay.classList.remove("visible");
        setTimeout(() => overlay.remove(), 500);
    }, 3600);
}

function getRandomColor() {
    const colors = ["#00ffea", "#ff00aa", "#aa00ff", "#00ffaa", "#ffaa00"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getChaosLevel(count) {
    if (count < 10) return "harmless";
    if (count < 25) return "annoyed";
    if (count < 50) return "unstable";
    if (count < 75) return "dangerous";
    if (count < 100) return "critical";
    return "ascended";
}

function updateHud() {
    const clickCounter = document.getElementById("clickCounter");
    const chaosLevel = document.getElementById("chaosLevel");

    if (!clickCounter || !chaosLevel) return;

    clickCounter.textContent = `Clicks: ${state.clicks}`;
    chaosLevel.textContent = `Chaos: ${state.chaosLevel}`;
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("visible"), 50);
    setTimeout(() => {
        toast.classList.remove("visible");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function unlockAchievement(id, title) {
    if (unlockedAchievements.has(id)) return;

    unlockedAchievements.add(id);
    localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify([...unlockedAchievements]));
    showToast(`Achievement unlocked: ${title}`);
}

function checkAchievements(count) {
    const achievementMap = new Map([
        [1, ["first_click", "You touched the void"]],
        [10, ["warning_ignored", "You ignored the warning"]],
        [42, ["pi_phi_alignment", "π/φ alignment achieved"]],
        [50, ["unstable_user", "Reality is unstable"]],
        [66, ["fake_root", "Fake visual console discovered"]],
        [88, ["etcetera_seal", "ETCETERA seal invoked"]],
        [100, ["nothing_master", "Master of Nothing"]]
    ]);

    const achievement = achievementMap.get(count);
    if (achievement) unlockAchievement(achievement[0], achievement[1]);
}

function registerEffect(clickCount, effectFunction) {
    effects.set(clickCount, effectFunction);
}

function getButtonElements() {
    const button = document.getElementById("theButton");
    const buttonText = button?.querySelector(".button-text");
    return { button, buttonText, body: document.body };
}

function resetTemporaryEffects() {
    const { button, body } = getButtonElements();
    if (!button) return;

    button.style.animation = "";
    button.style.transform = "";
    body.style.animation = "";
    body.style.transform = "";
    body.style.backgroundColor = "";

    if (window.effectTimeout) {
        clearTimeout(window.effectTimeout);
    }
}

function changeButtonText(text, duration = 1000) {
    const { buttonText } = getButtonElements();
    if (!buttonText) return;

    buttonText.textContent = text;
    if (duration > 0) {
        window.effectTimeout = setTimeout(() => {
            buttonText.textContent = DEFAULT_BUTTON_TEXT;
        }, duration);
    }
}

function jiggleButton() {
    const { button } = getButtonElements();
    if (!button) return;
    button.classList.add("jiggle");
    setTimeout(() => button.classList.remove("jiggle"), 500);
}

function floatDropButton() {
    const { button } = getButtonElements();
    if (!button) return;
    button.classList.add("float-drop");
    setTimeout(() => button.classList.remove("float-drop"), 1500);
}

function flickerBody() {
    document.body.classList.add("flicker");
    setTimeout(() => document.body.classList.remove("flicker"), 1000);
}

function redFlash() {
    playSound("scary");
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "";
    }, 200);
}

function rotateBody() {
    document.body.style.transform = "rotate(180deg)";
    setTimeout(() => {
        document.body.style.transform = "rotate(0deg)";
    }, 1000);
}

function glitchBody() {
    document.body.classList.add("glitch");
    setTimeout(() => document.body.classList.remove("glitch"), 500);
}

function moveButtonRandomly() {
    const { button } = getButtonElements();
    if (!button) return;

    button.style.position = "absolute";
    button.style.left = `${Math.random() * 80 + 10}%`;
    button.style.top = `${Math.random() * 80 + 10}%`;
}

function resetButtonPosition() {
    const { button, buttonText } = getButtonElements();
    if (!button || !buttonText) return;

    button.style.animation = "";
    button.style.transform = "";
    button.style.position = "";
    button.style.left = "";
    button.style.top = "";
    buttonText.textContent = DEFAULT_BUTTON_TEXT;
}

function showFakeTerminal() {
    const terminal = document.createElement("div");
    terminal.className = "fake-terminal";

    const lines = [
        "booting /dev/nothing...",
        "loading π/φ drift table...",
        "checking ETCETERA resonance...",
        `sigil seed: ${buildEtceteraSigil(state.clicks)}`,
        "visual gate closed",
        "symbolic overflow contained",
        "nothing.exe has become self-aware"
    ];

    document.body.appendChild(terminal);

    let index = 0;
    const interval = setInterval(() => {
        if (index >= lines.length) {
            clearInterval(interval);
            setTimeout(() => terminal.remove(), 2500);
            return;
        }

        const line = document.createElement("div");
        line.textContent = `> ${lines[index]}`;
        terminal.appendChild(line);
        index += 1;
    }, 500);
}

function goToNothingPage() {
    changeButtonText("Redirecting to nothing...", 0);
    setTimeout(() => {
        window.location.href = "nothing.html";
    }, 1000);
}

function triggerPassiveEffect(count) {
    const { button } = getButtonElements();
    if (!button) return;

    if (count % 3 === 0) {
        button.style.color = getRandomColor();
    }

    if (count % 7 === 0) {
        button.style.transform = `scale(${1 + count / 200})`;
    }
}

function triggerEffect(count) {
    resetTemporaryEffects();

    const effect = effects.get(count);
    if (effect) {
        effect();
        return;
    }

    triggerPassiveEffect(count);
}

function registerEffects() {
    registerEffect(1, jiggleButton);
    registerEffect(2, () => changeButtonText("Seriously?", 1000));
    registerEffect(3, () => playSound("boop"));
    registerEffect(5, () => startConfetti(2000));
    registerEffect(7, floatDropButton);
    registerEffect(10, showFakeError);
    registerEffect(15, symbolRain);
    registerEffect(20, flickerBody);
    registerEffect(25, redFlash);
    registerEffect(30, () => alert("Click responsibly."));
    registerEffect(40, rotateBody);
    registerEffect(42, showEtceteraSeal);
    registerEffect(50, glitchBody);
    registerEffect(66, showFakeTerminal);
    registerEffect(70, moveButtonRandomly);
    registerEffect(88, showEtceteraSeal);
    registerEffect(90, resetButtonPosition);
    registerEffect(99, () => changeButtonText(`πφ ${buildEtceteraSigil(state.clicks)} πφ`, 0));
    registerEffect(100, goToNothingPage);
}

function resetProgress() {
    localStorage.removeItem(STORAGE_KEYS.clicks);
    localStorage.removeItem(STORAGE_KEYS.achievements);

    state.clicks = 0;
    state.chaosLevel = getChaosLevel(state.clicks);
    unlockedAchievements.clear();

    resetButtonPosition();
    updateHud();
    showToast("Nothing has been reset.");
}

function handleButtonClick() {
    state.clicks += 1;
    state.chaosLevel = getChaosLevel(state.clicks);
    localStorage.setItem(STORAGE_KEYS.clicks, String(state.clicks));

    updateHud();
    checkAchievements(state.clicks);
    triggerEffect(state.clicks);
}

function handleButtonHover(event) {
    const { button } = getButtonElements();
    const particle = button?.querySelector(".button-particle");
    if (!button || !particle) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    particle.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 255, 0.3) 0%, transparent 70%)`;
}

function clearButtonHover() {
    const { button } = getButtonElements();
    const particle = button?.querySelector(".button-particle");
    if (particle) particle.style.background = "transparent";
}

function initSecretCode() {
    const secretCode = [
        "ArrowUp", "ArrowUp",
        "ArrowDown", "ArrowDown",
        "ArrowLeft", "ArrowRight",
        "ArrowLeft", "ArrowRight",
        "b", "a"
    ];
    const buffer = [];

    document.addEventListener("keydown", (event) => {
        buffer.push(event.key);
        if (buffer.length > secretCode.length) buffer.shift();

        if (buffer.join(",") === secretCode.join(",")) {
            document.body.classList.add("secret-mode");
            changeButtonText(`πφ ${buildEtceteraSigil(state.clicks)} φπ`, 3000);
            unlockAchievement("secret_sequence", "Secret sequence discovered");
            showEtceteraSeal();
        }
    });
}

function init() {
    const button = document.getElementById("theButton");
    const resetButton = document.getElementById("resetButton");

    if (!button) return;

    registerEffects();
    state.chaosLevel = getChaosLevel(state.clicks);
    updateHud();
    initSecretCode();

    button.addEventListener("click", handleButtonClick);
    button.addEventListener("mousemove", handleButtonHover);
    button.addEventListener("mouseleave", clearButtonHover);

    if (resetButton) {
        resetButton.addEventListener("click", resetProgress);
    }
}

document.addEventListener("DOMContentLoaded", init);
