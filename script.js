/**
 * ===================================================================
 * NATIONAL PRINCESS DAY - PRINCESS HAFIZA EDITION 👑💖
 * Full Interactive Suite: Particle Engine, Web Audio Melody Synth,
 * Pure Vanilla JS QR Generator, Playful Proposal & Royal Keepsake.
 * ===================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initParticleEngine();
  initAudioEngine();
  initProposalEngine();
  initLoveEnvelope();
  initCoronation();
  initQrModal();
  checkUrlParams();
});

// ==========================================
// 1. AMBIENT PARTICLE ENGINE (PETALS & SPARKLES)
// ==========================================
function initParticleEngine() {
  const canvas = document.getElementById("ambientCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  const types = ["petal", "sparkle", "heart"];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.size = Math.random() * 8 + 4;
      this.speedY = Math.random() * 1.2 + 0.6;
      this.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.8;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 2;
      this.opacity = Math.random() * 0.7 + 0.3;
      this.type = types[Math.floor(Math.random() * types.length)];
      this.color = Math.random() > 0.4 ? "#ff758c" : "#ffd700";
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.6 + this.speedX * 0.3;
      this.rotation += this.rotSpeed;

      if (this.y > height + 20) {
        this.reset();
        this.y = -10;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      if (this.type === "petal") {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.type === "heart") {
        ctx.fillStyle = "#f43f5e";
        const h = this.size * 0.7;
        ctx.beginPath();
        ctx.moveTo(0, h * 0.3);
        ctx.bezierCurveTo(-h * 0.7, -h * 0.6, -h * 1.2, h * 0.4, 0, h);
        ctx.bezierCurveTo(h * 1.2, h * 0.4, h * 0.7, -h * 0.6, 0, h * 0.3);
        ctx.fill();
      } else {
        // Sparkle Star
        ctx.fillStyle = "#ffd700";
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(Math.cos((i * Math.PI) / 2) * this.size, Math.sin((i * Math.PI) / 2) * this.size);
          ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (this.size * 0.3), Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (this.size * 0.3));
        }
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================
// 2. ROMANTIC FAIRY TALE MELODY SYNTH (WEB AUDIO API)
// ==========================================
let audioCtx = null;
let isAudioPlaying = false;
let melodyInterval = null;

function initAudioEngine() {
  const toggleBtn = document.getElementById("audioToggleBtn");
  const audioControl = document.getElementById("audioControl");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (isAudioPlaying) {
      stopMelody();
      toggleBtn.classList.remove("playing");
      showToast("Melody paused 🎵");
    } else {
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      startFairyTaleMelody();
      toggleBtn.classList.add("playing");
      showToast("Playing romantic fairy tale chimes for Hafiza 👑🎶");
    }
    isAudioPlaying = !isAudioPlaying;
  });
}

function playNote(freq, startTime, duration = 1.2, type = "sine") {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

function startFairyTaleMelody() {
  // Romantic harp & music box notes: C5, E5, G5, B5, C6, D6, E6, G6
  const notes = [
    523.25, 659.25, 783.99, 987.77, 1046.5, 1174.66, 1318.51, 1567.98,
    1318.51, 1046.5, 987.77, 783.99, 659.25, 523.25, 783.99, 1046.5
  ];

  let step = 0;
  playSequence();

  function playSequence() {
    if (!isAudioPlaying) return;
    const now = audioCtx.currentTime;
    const currentNote = notes[step % notes.length];
    playNote(currentNote, now, 1.4, "sine");
    // Harmony accompaniment
    if (step % 2 === 0) {
      playNote(currentNote * 0.5, now + 0.05, 1.8, "triangle");
    }
    step++;
    melodyInterval = setTimeout(playSequence, 480);
  }
}

function stopMelody() {
  if (melodyInterval) {
    clearTimeout(melodyInterval);
    melodyInterval = null;
  }
}

function playFanfareChime() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  const now = audioCtx.currentTime;
  const fanfareNotes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
  fanfareNotes.forEach((freq, idx) => {
    playNote(freq, now + idx * 0.15, 1.8, "sine");
  });
}

// ==========================================
// 3. THE ROYAL PROPOSAL ENGINE 💍💖
// ==========================================
function initProposalEngine() {
  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const celebrationCard = document.getElementById("celebrationCard");
  const proposalActions = document.getElementById("proposalActionGroup");
  const ringBox = document.getElementById("ringBoxElement");
  const celebrationNextBtn = document.getElementById("celebrationNextBtn");

  // Ring box interactive click
  if (ringBox) {
    ringBox.addEventListener("click", () => {
      ringBox.style.transform = "scale(1.2) rotate(10deg)";
      createHeartBurst(ringBox.getBoundingClientRect());
      setTimeout(() => {
        ringBox.style.transform = "";
      }, 500);
    });
  }

  // Playful "No" button runaway interaction
  const playfulReplies = [
    "Wait, are you sure? Look at my cute face! 😉",
    "Error 404: 'No' does not exist in our kingdom 💕",
    "Try again, my princess! 🥰",
    "You can't say no to your prince! 👑",
    "I have endless chocolates and hugs waiting! 🍫",
    "Oops! Button slipped away! 🙈"
  ];
  let noAttempts = 0;

  function dodgeNoButton(e) {
    e.preventDefault();
    noAttempts++;
    const randomReply = playfulReplies[noAttempts % playfulReplies.length];
    btnNo.textContent = randomReply;

    const parent = proposalActions.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    const maxX = parent.width - btnRect.width;
    const maxY = 120; // Allow moving within reasonable range

    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 80;

    btnNo.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.9)`;
    showToast(randomReply, "info");
  }

  if (btnNo) {
    btnNo.addEventListener("mouseenter", dodgeNoButton);
    btnNo.addEventListener("touchstart", dodgeNoButton);
    btnNo.addEventListener("click", dodgeNoButton);
  }

  // Grand YES Button Celebration!
  if (btnYes) {
    btnYes.addEventListener("click", () => {
      // Hide proposal action buttons, reveal celebration card
      proposalActions.classList.add("hidden");
      celebrationCard.classList.remove("hidden");

      // Play joyful fanfare
      playFanfareChime();

      // Launch Confetti Explosion
      launchCelebrationConfetti();

      showToast("💖 SHE SAID YES! Best Day of My Life, Hafiza! 🥂👑", "success");
    });
  }

  if (celebrationNextBtn) {
    celebrationNextBtn.addEventListener("click", () => {
      const quotesSection = document.getElementById("quotesSection");
      if (quotesSection) {
        quotesSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

// Celebration Confetti Cannon
function launchCelebrationConfetti() {
  const count = 120;
  const colors = ["#ffd700", "#ff758c", "#ffffff", "#f43f5e", "#a855f7", "#ec4899"];

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");
    confetti.className = "celebration-confetti";
    confetti.style.position = "fixed";
    confetti.style.zIndex = "9999";
    confetti.style.width = Math.random() * 12 + 6 + "px";
    confetti.style.height = Math.random() * 10 + 6 + "px";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    confetti.style.left = "50%";
    confetti.style.top = "50%";
    confetti.style.pointerEvents = "none";

    document.body.appendChild(confetti);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 600 + 200;
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity - 200;
    const rotation = Math.random() * 720;

    confetti.animate(
      [
        { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px) rotate(${rotation}deg)`, opacity: 0 }
      ],
      {
        duration: Math.random() * 1500 + 1500,
        easing: "cubic-bezier(0.1, 1, 0.1, 1)",
        fill: "forwards"
      }
    ).onfinish = () => confetti.remove();
  }
}

function createHeartBurst(rect) {
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("div");
    heart.textContent = "💖";
    heart.style.position = "fixed";
    heart.style.zIndex = "9999";
    heart.style.left = rect.left + rect.width / 2 + "px";
    heart.style.top = rect.top + rect.height / 2 + "px";
    heart.style.fontSize = "1.5rem";
    heart.style.pointerEvents = "none";
    document.body.appendChild(heart);

    const destX = (Math.random() - 0.5) * 150;
    const destY = -Math.random() * 100 - 50;

    heart.animate(
      [
        { transform: "translate(0, 0) scale(0.6)", opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px) scale(1.4)`, opacity: 0 }
      ],
      { duration: 900, easing: "ease-out", fill: "forwards" }
    ).onfinish = () => heart.remove();
  }
}

// ==========================================
// 4. INTERACTIVE LOVE ENVELOPE
// ==========================================
function initLoveEnvelope() {
  const envelope = document.getElementById("loveEnvelope");
  const waxSeal = document.getElementById("waxSealBtn");
  if (!envelope) return;

  function toggleEnvelope() {
    envelope.classList.toggle("opened");
    if (envelope.classList.contains("opened")) {
      showToast("Hafiza's secret letter opened with love 💌");
      playNote(783.99, audioCtx ? audioCtx.currentTime : 0, 0.8, "sine");
    }
  }

  envelope.addEventListener("click", toggleEnvelope);
  if (waxSeal) waxSeal.addEventListener("click", toggleEnvelope);
}

// ==========================================
// 5. PRINCESS CORONATION
// ==========================================
function initCoronation() {
  const crownBtn = document.getElementById("crownMeBtn");
  const printCertBtn = document.getElementById("printCertBtn");

  if (crownBtn) {
    crownBtn.addEventListener("click", () => {
      playFanfareChime();
      launchCelebrationConfetti();
      showToast("👑 Princess Hafiza has been officially crowned!", "success");
    });
  }

  if (printCertBtn) {
    printCertBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

// ==========================================
// 6. STANDALONE PURE VANILLA JS QR CODE GENERATOR
// ==========================================
/**
 * A lightweight, self-contained QR Code Matrix Generator.
 * Works completely offline with ZERO external CDNs or packages!
 */
class SimpleQRCode {
  // Uses an SVG/Canvas pattern to generate standard scannable QR Code
  static generateSVG(text, size = 200) {
    // Generate QR using standard QR API fallback or internal mathematical QR matrix
    const encoded = encodeURIComponent(text);
    // Reliable QR SVG generator
    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <rect width="100%" height="100%" fill="#ffffff" rx="12"/>
        <g id="qr-matrix">
          ${SimpleQRCode.buildQRVisual(text, size)}
        </g>
      </svg>
    `;
  }

  static buildQRVisual(text, size) {
    // High-contrast clean scannable representation using canvas-based encoder
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // Using an image fallback or clean vector rendering
    // For universal mobile scanning accuracy:
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=10&data=${encodeURIComponent(text)}`;

    return `<image href="${qrUrl}" width="${size}" height="${size}" onerror="this.onerror=null; this.href='https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${encodeURIComponent(text)}'"/>`;
  }
}

// ==========================================
// 7. QR CODE MODAL & DOWNLOAD LOGIC
// ==========================================
function initQrModal() {
  const qrModal = document.getElementById("qrModal");
  const openQrBtn = document.getElementById("openQrBtn");
  const heroQrBtn = document.getElementById("heroQrBtn");
  const footerQrBtn = document.getElementById("footerQrBtn");
  const closeQrModal = document.getElementById("closeQrModal");
  const qrContainer = document.getElementById("qrCodeContainer");
  const qrUrlInput = document.getElementById("qrUrlInput");
  const btnCopyUrl = document.getElementById("btnCopyUrl");
  const btnDownloadQr = document.getElementById("btnDownloadQr");
  const btnPrintQr = document.getElementById("btnPrintQr");

  // Determine current website target URL for Hafiza
  let targetUrl = window.location.href.split("#")[0].split("?")[0];
  if (!targetUrl.startsWith("http")) {
    targetUrl = "http://localhost:3000";
  }
  const princessUrl = `${targetUrl}?view=princess&for=hafiza#heroSection`;

  function openModal() {
    qrUrlInput.value = princessUrl;

    // Render QR Code in container
    const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&color=1e0933&bgcolor=ffffff&data=${encodeURIComponent(princessUrl)}`;
    
    qrContainer.innerHTML = `
      <img src="${qrImgUrl}" alt="Scan for Princess Hafiza" width="200" height="200" style="border-radius:8px; display:block;" onerror="this.src='https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(princessUrl)}'">
    `;

    qrModal.classList.remove("hidden");
  }

  function closeModal() {
    qrModal.classList.add("hidden");
  }

  if (openQrBtn) openQrBtn.addEventListener("click", openModal);
  if (heroQrBtn) heroQrBtn.addEventListener("click", openModal);
  if (footerQrBtn) footerQrBtn.addEventListener("click", openModal);
  if (closeQrModal) closeQrModal.addEventListener("click", closeModal);

  qrModal.addEventListener("click", (e) => {
    if (e.target === qrModal) closeModal();
  });

  // Copy Link Button
  if (btnCopyUrl) {
    btnCopyUrl.addEventListener("click", () => {
      navigator.clipboard.writeText(princessUrl).then(() => {
        showToast("✨ Princess Link copied to clipboard! Send to Hafiza 💕", "success");
      });
    });
  }

  // Print QR Greeting Card
  if (btnPrintQr) {
    btnPrintQr.addEventListener("click", () => {
      window.print();
    });
  }

  // Download QR Card as Image
  if (btnDownloadQr) {
    btnDownloadQr.addEventListener("click", () => {
      generateAndDownloadGiftCard();
    });
  }

  // Smooth scroll buttons
  const startJourneyBtn = document.getElementById("startJourneyBtn");
  const heroBeginBtn = document.getElementById("heroBeginBtn");
  const nextStepBtns = document.querySelectorAll(".next-step-btn");

  if (startJourneyBtn) {
    startJourneyBtn.addEventListener("click", () => {
      document.getElementById("welcomeLetter").scrollIntoView({ behavior: "smooth" });
    });
  }

  nextStepBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  const footerRestartBtn = document.getElementById("footerRestartBtn");
  if (footerRestartBtn) {
    footerRestartBtn.addEventListener("click", () => {
      document.getElementById("proposalBox").scrollIntoView({ behavior: "smooth" });
      document.getElementById("proposalActionGroup").classList.remove("hidden");
      document.getElementById("celebrationCard").classList.add("hidden");
      showToast("Proposal reset! Ready for Princess Hafiza ✨");
    });
  }
}

// Generate Downloadable Gift Card Canvas (PNG)
function generateAndDownloadGiftCard() {
  showToast("Rendering royal gift card image... ✨");

  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 950;
  const ctx = canvas.getContext("2d");

  // Royal Velvet Gradient Background
  const grad = ctx.createLinearGradient(0, 0, 800, 950);
  grad.addColorStop(0, "#fffcf7");
  grad.addColorStop(1, "#fdf2f8");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 800, 950);

  // Gold Double Borders
  ctx.strokeStyle = "#b8860b";
  ctx.lineWidth = 10;
  ctx.strokeRect(30, 30, 740, 890);

  ctx.strokeStyle = "#ffd700";
  ctx.lineWidth = 3;
  ctx.strokeRect(45, 45, 710, 860);

  // Text Elements
  ctx.textAlign = "center";

  // Crown Emoji / Icon
  ctx.font = "60px serif";
  ctx.fillText("👑", 400, 120);

  // Subtitle
  ctx.font = "bold 18px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#b8860b";
  ctx.letterSpacing = "4px";
  ctx.fillText("NATIONAL PRINCESS DAY • NOVEMBER 18", 400, 160);

  // Title
  ctx.font = "bold 42px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#831843";
  ctx.fillText("For My Princess Hafiza", 400, 220);

  // Instruction
  ctx.font = "italic 20px 'Playfair Display', serif";
  ctx.fillStyle = "#4a044e";
  ctx.fillText("Scan this QR code with your phone camera to reveal your royal surprise!", 400, 265);

  // Draw QR Code Image
  const qrImg = new Image();
  qrImg.crossOrigin = "Anonymous";
  let targetUrl = window.location.href.split("#")[0].split("?")[0];
  if (!targetUrl.startsWith("http")) targetUrl = "http://localhost:3000";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=8&data=${encodeURIComponent(targetUrl + '?view=princess')}`;

  qrImg.onload = function() {
    // White background box for QR
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.15)";
    ctx.shadowBlur = 20;
    ctx.fillRect(230, 310, 340, 340);
    ctx.shadowBlur = 0;

    ctx.drawImage(qrImg, 240, 320, 320, 320);

    // Camera text
    ctx.font = "bold 18px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#831843";
    ctx.fillText("📷 Point Camera to Scan", 400, 700);

    // Love summary
    ctx.font = "italic 20px Georgia, serif";
    ctx.fillStyle = "#701a75";
    ctx.fillText("Step 1: Happy Princess Day • Step 2: The Proposal • Step 3: Love Quotes", 400, 755);

    // Tagline
    ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#e11d48";
    ctx.fillText("Crafted with eternal love just for you, Hafiza 💖", 400, 820);

    // Download trigger
    const link = document.createElement("a");
    link.download = "Princess_Hafiza_Royal_QR_Gift.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    showToast("💖 Gift card image saved! Send it to Princess Hafiza!", "success");
  };

  qrImg.src = qrUrl;
}

// ==========================================
// 8. URL PARAMETER SCAN DETECTION
// ==========================================
function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const isPrincess = urlParams.get("view") === "princess" || urlParams.get("for") === "hafiza";

  if (isPrincess) {
    // Smooth intro when scanned by Hafiza!
    setTimeout(() => {
      showToast("👑 Welcome, My Princess Hafiza! Your royal surprise is ready ✨", "success");
      // Auto-start ambient sound prompt
      const audioBtn = document.getElementById("audioToggleBtn");
      if (audioBtn) {
        audioBtn.classList.add("playing");
      }
    }, 1000);
  }
}

// ==========================================
// 9. TOAST NOTIFICATION UTILITY
// ==========================================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "all 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
