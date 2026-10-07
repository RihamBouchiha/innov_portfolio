// ============================================================
// InnoVerse — Living Galaxy Starfield  (v2: dark + LIGHT mode, both stunning)
//
// Dark mode : glowing, additive light — like deep space.
// Light mode: a "daylight cosmos" — deep saturated ink-like colors that
//             MULTIPLY into a soft pastel sky, so nebulae, the galaxy,
//             stars and constellation lines are all clearly visible on white.
//
// Needs: <canvas id="starfield"></canvas>  (position: fixed; inset: 0; z-index: -1)
// Dark mode is detected with: document.body.classList.contains("dark-mode")
// ============================================================

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

// ---------- Palette ----------
// Original InnoVerse logo colors (used for dark mode glows)
const logoColors = [
  { r: 0, g: 212, b: 255 }, // Vibrant Cyan
  { r: 0, g: 85, b: 255 }, // Mid Blue
  { r: 74, g: 20, b: 140 }, // Deep Purple
  { r: 212, g: 63, b: 195 }, // Magenta/Pink
];
// Slightly deeper versions so stars stay crisp on a light background
const lightColors = [
  { r: 0, g: 150, b: 225 },
  { r: 0, g: 70, b: 235 },
  { r: 90, g: 25, b: 165 },
  { r: 200, g: 40, b: 180 },
];

// Light-mode sky: three soft tints blended diagonally (edit freely)
const LIGHT_BG = ["#eaf1ff", "#f4f0ff", "#fdf0f8"];
const DARK_BG = "#121212";

// ---------- State ----------
let width = 0;
let height = 0;
let dpr = 1;
let stars = [];
let linkStars = [];
let shootingStars = [];
let nebulae = [];
let distantGalaxies = [];
let dust = [];
let galaxy = null;
let isDarkMode = document.body.classList.contains("dark-mode");
let intro = 0; // 0 → 1 soft fade (on load and on theme switch)
let introStart = 0;
let introDur = 2.5;
let simTime = 0; // animation clock (slows with reduced motion)
let elapsed = 0;

const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let motion = reduceMotionQuery.matches ? 0.15 : 1;
reduceMotionQuery.addEventListener?.("change", (e) => {
  motion = e.matches ? 0.15 : 1;
});

// Smoothed input
const mouse = { tx: 0, ty: 0, x: 0, y: 0, px: -9999, py: -9999 };
let scrollTarget = window.scrollY;
let scrollSmooth = window.scrollY;
let lastScrollY = window.scrollY;

// ---------- Helpers ----------
const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const lerp = (a, b, t) => a + (b - a) * t;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const palette = () => (isDarkMode ? logoColors : lightColors);

function colorFromStops(stops, t) {
  t = Math.min(1, Math.max(0, t));
  const s = t * (stops.length - 1);
  const i = Math.floor(s);
  const f = s - i;
  const a = stops[i];
  const b = stops[Math.min(i + 1, stops.length - 1)];
  return {
    r: Math.round(lerp(a.r, b.r, f)),
    g: Math.round(lerp(a.g, b.g, f)),
    b: Math.round(lerp(a.b, b.b, f)),
  };
}

function checkDarkMode() {
  const dark = document.body.classList.contains("dark-mode");
  if (dark !== isDarkMode) {
    isDarkMode = dark;
    introStart = elapsed; // quick soft fade-in so switching themes never "pops"
    introDur = 0.9;
  }
}

// ---------- Pre-rendered glow sprites (fast + smooth) ----------
function makeGlowSprite(c, size = 256) {
  const s = document.createElement("canvas");
  s.width = s.height = size;
  const g = s.getContext("2d");
  const grad = g.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},1)`);
  grad.addColorStop(0.25, `rgba(${c.r},${c.g},${c.b},0.55)`);
  grad.addColorStop(0.6, `rgba(${c.r},${c.g},${c.b},0.15)`);
  grad.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return s;
}

function makeCoreSprite(dark) {
  const size = 256;
  const s = document.createElement("canvas");
  s.width = s.height = size;
  const g = s.getContext("2d");
  const grad = g.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  if (dark) {
    grad.addColorStop(0, "rgba(255,244,252,1)");
    grad.addColorStop(0.1, "rgba(255,190,240,0.75)");
    grad.addColorStop(0.35, "rgba(212,63,195,0.28)");
    grad.addColorStop(0.7, "rgba(74,20,140,0.1)");
    grad.addColorStop(1, "rgba(74,20,140,0)");
  } else {
    // deep violet → magenta ink, strong enough to read on white
    grad.addColorStop(0, "rgba(88,20,150,1)");
    grad.addColorStop(0.12, "rgba(190,45,175,0.8)");
    grad.addColorStop(0.4, "rgba(110,60,220,0.3)");
    grad.addColorStop(0.75, "rgba(0,85,255,0.1)");
    grad.addColorStop(1, "rgba(0,85,255,0)");
  }
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return s;
}

const glowSprites = logoColors.map((c) => makeGlowSprite(c));
const whiteSprite = makeGlowSprite({ r: 255, g: 255, b: 255 }, 64);
const coreSprites = {
  dark: makeCoreSprite(true),
  light: makeCoreSprite(false),
};

// ---------- Canvas size (retina aware) ----------
function resizeCanvas() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// ============================================================
// Star
// ============================================================
class Star {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.z = rand(0.25, 1); // depth: 1 = closest
    this.size = (Math.random() * 1.6 + 0.4) * (0.55 + 0.65 * this.z);
    if (Math.random() < 0.04) this.size *= 1.8;
    this.opacity = Math.random() * 0.6 + 0.4;
    this.twinkleSpeed = Math.random() * 1.2 + 0.6;
    this.twinklePhase = Math.random() * TAU;
    this.ci = Math.floor(Math.random() * logoColors.length);
    this.hot = this.z > 0.8 && Math.random() < 0.5;
    this.spike = this.size > 2.1;
    this.drift = rand(1, 4) * this.z;
    this.ox = 0;
    this.oy = 0;
    this.sx = this.x;
    this.sy = this.y;
  }

  update(dt) {
    this.x -= this.drift * dt * motion;
    if (this.x < 0) this.x += width;

    const dx = this.x + this.ox - mouse.px;
    const dy = this.y + this.oy - mouse.py;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150 && dist > 0.001) {
      const force = (150 - dist) / 150;
      this.ox += (dx / dist) * force * 90 * dt;
      this.oy += (dy / dist) * force * 90 * dt;
    }
    const k = Math.exp(-dt * 1.6);
    this.ox *= k;
    this.oy *= k;
  }

  draw() {
    this.twinklePhase += this.twinkleSpeed * (1 / 60) * motion;
    const twinkle = Math.sin(this.twinklePhase) * 0.5 + 0.5;
    const light = !isDarkMode;

    // Light mode: stars stay brighter (less twinkle dimming) and larger
    const op =
      this.opacity *
      (light ? 0.6 + 0.4 * twinkle : 0.25 + 0.75 * twinkle) *
      intro;
    const size = this.size * (light ? 1.35 : 1);

    const x = this.x + this.ox + mouse.x * 28 * this.z;
    const y = this.y + this.oy + mouse.y * 28 * this.z;
    this.sx = x;
    this.sy = y;
    const c = palette()[this.ci];
    const glowR = size * 4;

    // Glow
    const glowOp = light ? op * 0.55 : op;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowR);
    gradient.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${glowOp})`);
    gradient.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},${glowOp * 0.5})`);
    gradient.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, glowR, 0, TAU);
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.fillStyle =
      this.hot && !light
        ? `rgba(255,255,255,${Math.min(1, op * 1.3)})`
        : `rgba(${c.r},${c.g},${c.b},${Math.min(1, op * (light ? 1.5 : 1.2))})`;
    ctx.arc(x, y, size * 0.8, 0, TAU);
    ctx.fill();

    // Diffraction spikes on the biggest stars (both modes)
    if (this.spike) {
      const len = size * (light ? 6 : 7) * (0.7 + 0.3 * twinkle);
      ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${op * (light ? 0.7 : 0.55)})`;
      ctx.lineWidth = light ? 0.8 : 0.6;
      ctx.beginPath();
      ctx.moveTo(x - len, y);
      ctx.lineTo(x + len, y);
      ctx.moveTo(x, y - len);
      ctx.lineTo(x, y + len);
      ctx.stroke();
    }
  }
}

// ============================================================
// Constellation links (light mode only) — gives the white
// background a designed, "map of the universe" structure
// ============================================================
function drawLinks() {
  if (isDarkMode || intro <= 0) return;
  const maxD = 125;
  const maxD2 = maxD * maxD;
  ctx.lineWidth = 0.8;

  // 1. Create 10 buckets to group lines by their opacity
  const buckets = Array.from({ length: 10 }, () => []);

  for (let i = 0; i < linkStars.length; i++) {
    const a = linkStars[i];
    for (let j = i + 1; j < linkStars.length; j++) {
      const b = linkStars[j];
      const dx = a.sx - b.sx;
      const dy = a.sy - b.sy;
      const d2 = dx * dx + dy * dy;

      if (d2 < maxD2) {
        // Calculate a base opacity from 0.0 to 1.0
        const baseAlpha = 1 - Math.sqrt(d2) / maxD;

        // Assign the line to a bucket index from 0 to 9
        let bucketIdx = Math.floor(baseAlpha * 9);
        if (bucketIdx < 0) bucketIdx = 0;
        if (bucketIdx > 9) bucketIdx = 9;

        // Store the coordinates instead of drawing immediately
        buckets[bucketIdx].push(a.sx, a.sy, b.sx, b.sy);
      }
    }
  }

  // 2. Draw all lines in each bucket with a single stroke call
  for (let i = 0; i < buckets.length; i++) {
    const lines = buckets[i];
    if (lines.length === 0) continue;

    // Reconstruct the final alpha for this specific bucket
    const alpha = (i / 9) * 0.3 * intro;

    ctx.strokeStyle = `rgba(90,25,165,${alpha})`;
    ctx.beginPath();

    for (let k = 0; k < lines.length; k += 4) {
      ctx.moveTo(lines[k], lines[k + 1]);
      ctx.lineTo(lines[k + 2], lines[k + 3]);
    }

    // One stroke per bucket instead of one stroke per line
    ctx.stroke();
  }
}

// ============================================================
// Shooting star
// ============================================================
class ShootingStar {
  constructor() {
    this.active = false;
    this.timer = rand(1, 6);
  }

  spawn() {
    this.x = rand(0.05, 0.85) * width;
    this.y = rand(0, 0.45) * height;
    this.length = rand(110, 200);
    this.speed = rand(650, 1100);
    this.opacity = rand(0.7, 1);
    this.angle = Math.PI / 4 + rand(-0.15, 0.15);
    this.life = 0;
    this.maxLife = rand(0.7, 1.3);
    this.ci = Math.floor(Math.random() * logoColors.length);
    this.active = true;
  }

  update(dt) {
    if (!this.active) {
      this.timer -= dt;
      if (this.timer <= 0 && motion >= 0.5) this.spawn();
      return;
    }
    this.x += Math.cos(this.angle) * this.speed * dt;
    this.y += Math.sin(this.angle) * this.speed * dt;
    this.life += dt;
    if (
      this.life > this.maxLife ||
      this.x > width + this.length ||
      this.y > height + this.length
    ) {
      this.active = false;
      this.timer = rand(2.5, 9);
    }
  }

  draw() {
    if (!this.active) return;
    const light = !isDarkMode;
    const p = Math.min(1, this.life / this.maxLife);
    const fade = Math.sin(p * Math.PI) * this.opacity * intro;
    const c = palette()[this.ci];
    const tx = this.x - Math.cos(this.angle) * this.length;
    const ty = this.y - Math.sin(this.angle) * this.length;

    const gradient = ctx.createLinearGradient(this.x, this.y, tx, ty);
    gradient.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${fade})`);
    gradient.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = light ? 3 : 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(tx, ty);
    ctx.stroke();

    ctx.globalAlpha = fade;
    ctx.drawImage(glowSprites[this.ci], this.x - 16, this.y - 16, 32, 32);
    if (!light) ctx.drawImage(whiteSprite, this.x - 6, this.y - 6, 12, 12);
    ctx.globalAlpha = 1;
  }
}

// ============================================================
// Nebula — big soft color clouds
// ============================================================
class Nebula {
  constructor(i) {
    this.sprite = glowSprites[i % logoColors.length];
    this.nx = rand(0.05, 0.95);
    this.ny = rand(0.05, 0.95);
    this.radius = rand(0.28, 0.55) * Math.max(width, height);
    this.squash = rand(0.45, 0.8);
    this.rot = rand(0, Math.PI);
    this.rotSpeed = rand(-0.02, 0.02);
    this.driftAmp = rand(30, 90);
    this.driftSpeed = rand(0.03, 0.08);
    this.phase = rand(0, TAU);
    this.breathSpeed = rand(0.1, 0.25);
    this.alpha = rand(0.1, 0.2);
    this.depth = rand(0.2, 0.5);
  }

  draw() {
    const t = simTime;
    const x =
      this.nx * width +
      Math.sin(t * this.driftSpeed + this.phase) * this.driftAmp +
      mouse.x * 16 * this.depth;
    const y =
      this.ny * height +
      Math.cos(t * this.driftSpeed * 0.8 + this.phase) * this.driftAmp * 0.7 +
      mouse.y * 16 * this.depth -
      Math.min(scrollSmooth, 800) * 0.04 * this.depth;
    const breathe = 0.75 + 0.25 * Math.sin(t * this.breathSpeed + this.phase);
    const r = this.radius * (0.95 + 0.05 * breathe);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.rot + t * this.rotSpeed);
    ctx.scale(1, this.squash);
    // Light mode needs roughly double strength: multiply blending tints the sky
    ctx.globalAlpha =
      Math.min(1, this.alpha * (isDarkMode ? 1 : 2.1)) * breathe * intro;
    ctx.drawImage(this.sprite, -r, -r, r * 2, r * 2);
    ctx.restore();
  }
}

// ============================================================
// Distant galaxies
// ============================================================
class DistantGalaxy {
  constructor(i) {
    this.sprite = glowSprites[i % logoColors.length];
    this.x = rand(0.03, 0.97) * width;
    this.y = rand(0.05, 0.95) * height;
    this.size = rand(18, 42);
    this.squash = rand(0.22, 0.45);
    this.rot = rand(0, Math.PI);
    this.phase = rand(0, TAU);
    this.depth = rand(0.4, 0.7);
  }

  draw() {
    const light = !isDarkMode;
    const pulse = 0.65 + 0.35 * Math.sin(simTime * 0.4 + this.phase);
    const x = this.x + mouse.x * 20 * this.depth;
    const y = this.y + mouse.y * 20 * this.depth;
    const s = this.size * (light ? 1.4 : 1);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.rot);
    ctx.scale(1, this.squash);
    ctx.globalAlpha = Math.min(1, (light ? 1 : 0.55) * pulse * intro);
    ctx.drawImage(this.sprite, -s, -s, s * 2, s * 2);
    ctx.globalAlpha = (light ? 0.8 : 0.5) * pulse * intro;
    ctx.drawImage(
      light ? coreSprites.light : whiteSprite,
      -s * 0.28,
      -s * 0.28,
      s * 0.56,
      s * 0.56,
    );
    ctx.restore();
  }
}

// ============================================================
// Dust
// ============================================================
class Dust {
  constructor() {
    this.sprite = pick(glowSprites);
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.z = rand(0.3, 1);
    this.size = rand(14, 46) * this.z;
    this.vx = rand(-6, 6);
    this.vy = rand(-4, 4);
    this.alpha = rand(0.05, 0.16);
    this.phase = rand(0, TAU);
  }

  update(dt) {
    this.x += this.vx * dt * motion;
    this.y += this.vy * dt * motion;
    const m = this.size;
    if (this.x < -m) this.x = width + m;
    if (this.x > width + m) this.x = -m;
    if (this.y < -m) this.y = height + m;
    if (this.y > height + m) this.y = -m;
  }

  draw() {
    const tw = 0.6 + 0.4 * Math.sin(simTime * 0.5 + this.phase);
    const x = this.x + mouse.x * 55 * this.z;
    const y = this.y + mouse.y * 55 * this.z;
    ctx.globalAlpha =
      Math.min(1, this.alpha * (isDarkMode ? 1 : 2.4)) * tw * intro;
    ctx.drawImage(
      this.sprite,
      x - this.size,
      y - this.size,
      this.size * 2,
      this.size * 2,
    );
  }
}

// ============================================================
// Spiral galaxy
// ============================================================
function buildGalaxy() {
  const small = width < 700;
  const count = small ? 1500 : 2800;
  const arms = 3;
  const twist = 5.2;

  const darkStops = [
    { r: 255, g: 238, b: 250 },
    { r: 255, g: 150, b: 225 },
    { r: 212, g: 63, b: 195 },
    { r: 0, g: 212, b: 255 },
    { r: 0, g: 85, b: 255 },
  ];
  // Light stops: deep, saturated inks so every particle reads on white
  const lightStops = [
    { r: 70, g: 15, b: 130 },
    { r: 190, g: 40, b: 170 },
    { r: 40, g: 60, b: 230 },
    { r: 0, g: 150, b: 225 },
  ];

  const particles = [];
  for (let i = 0; i < count; i++) {
    const bulge = Math.random() < 0.18;
    let r;
    let a;
    if (bulge) {
      r = Math.abs(gauss()) * 0.2;
      a = rand(0, TAU);
    } else {
      r = Math.pow(Math.random(), 0.7) * 0.95 + 0.05;
      a = (i % arms) * (TAU / arms) + r * twist + gauss() * (0.22 + 0.28 * r);
    }
    const t = Math.min(1, Math.max(0, r + gauss() * 0.12));
    const cd = colorFromStops(darkStops, t);
    const cl = colorFromStops(lightStops, t);
    const alphaD = rand(0.35, 0.95);
    const alphaL = rand(0.55, 1);
    particles.push({
      r,
      a,
      w: 0.05 * (1 + 0.25 * (1 - r)),
      size: Math.random() < 0.06 ? rand(1.6, 2.6) : rand(0.5, 1.5),
      cd: `rgba(${cd.r},${cd.g},${cd.b},${alphaD.toFixed(2)})`,
      cl: `rgba(${cl.r},${cl.g},${cl.b},${alphaL.toFixed(2)})`,
    });
  }

  return {
    particles,
    cx: width * 0.74,
    cy: height * 0.32,
    R: Math.min(width * 0.55, height * 0.75, 560),
    tilt: -0.5,
    squash: 0.45,
  };
}

function drawGalaxy() {
  const g = galaxy;
  const light = !isDarkMode;
  const x = g.cx + mouse.x * 22;
  const y = g.cy + mouse.y * 16 - Math.min(scrollSmooth, 800) * 0.05;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(g.tilt);
  ctx.scale(1, g.squash);

  // Soft outer halo + glowing core
  ctx.globalAlpha = intro * (light ? 0.7 : 0.5);
  ctx.drawImage(
    glowSprites[light ? 1 : 2],
    -g.R * 1.1,
    -g.R * 1.1,
    g.R * 2.2,
    g.R * 2.2,
  );
  ctx.globalAlpha = intro * (0.85 + 0.15 * Math.sin(simTime * 0.6));
  const core = light ? coreSprites.light : coreSprites.dark;
  ctx.drawImage(core, -g.R * 0.5, -g.R * 0.5, g.R, g.R);

  // Galaxy stars (bigger in light mode so they stay visible)
  ctx.globalAlpha = intro * (light ? 1 : 0.95);
  const sizeMul = light ? 1.4 : 1;
  const ps = g.particles;
  for (let i = 0; i < ps.length; i++) {
    const p = ps[i];
    const ang = p.a + simTime * p.w;
    ctx.fillStyle = light ? p.cl : p.cd;
    const s = p.size * sizeMul;
    ctx.fillRect(Math.cos(ang) * p.r * g.R, Math.sin(ang) * p.r * g.R, s, s);
  }

  ctx.restore();
}

// ============================================================
// Scene setup
// ============================================================
function initStars() {
  const numberOfStars = Math.floor((width * height) / 8000);
  stars = [];
  for (let i = 0; i < numberOfStars; i++) stars.push(new Star());
  linkStars = stars.filter((s) => s.z > 0.65);

  shootingStars = [];
  for (let i = 0; i < 3; i++) shootingStars.push(new ShootingStar());

  nebulae = [];
  for (let i = 0; i < 7; i++) nebulae.push(new Nebula(i));

  distantGalaxies = [];
  for (let i = 0; i < 6; i++) distantGalaxies.push(new DistantGalaxy(i));

  dust = [];
  const dustCount = width < 700 ? 16 : 32;
  for (let i = 0; i < dustCount; i++) dust.push(new Dust());

  galaxy = buildGalaxy();
}

// ============================================================
// Background
// ============================================================
function paintBackground() {
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  if (isDarkMode) {
    ctx.fillStyle = DARK_BG;
  } else {
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, LIGHT_BG[0]);
    bg.addColorStop(0.5, LIGHT_BG[1]);
    bg.addColorStop(1, LIGHT_BG[2]);
    ctx.fillStyle = bg;
  }
  ctx.fillRect(0, 0, width, height);
}

// ============================================================
// Animation loop
// ============================================================
let lastTime = 0;

function animate(now) {
  if (!lastTime) lastTime = now;
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  elapsed += dt;
  simTime += dt * motion;
  checkDarkMode();
  intro = easeOut(Math.min(1, (elapsed - introStart) / introDur));

  // Ease mouse + scroll for buttery motion
  const ease = 1 - Math.exp(-dt * 2.2);
  mouse.x += (mouse.tx - mouse.x) * ease;
  mouse.y += (mouse.ty - mouse.y) * ease;
  scrollSmooth += (scrollTarget - scrollSmooth) * (1 - Math.exp(-dt * 3));

  paintBackground();

  // Dark: glows ADD like light. Light: colors MULTIPLY like ink on paper.
  // Use fast standard blending for light mode instead of heavy CPU multiplication
  ctx.globalCompositeOperation = isDarkMode ? "lighter" : "source-over";
  nebulae.forEach((n) => n.draw());
  distantGalaxies.forEach((d) => d.draw());
  drawGalaxy();
  ctx.globalAlpha = 1;

  drawLinks();

  stars.forEach((s) => {
    s.update(dt);
    s.draw();
  });

  shootingStars.forEach((s) => {
    s.update(dt);
    s.draw();
  });

  dust.forEach((d) => {
    d.update(dt);
    d.draw();
  });
  ctx.globalAlpha = 1;

  // Gentle vignette to focus the eye
  ctx.globalCompositeOperation = "source-over";
  const vignette = ctx.createRadialGradient(
    width / 2,
    height / 2,
    Math.min(width, height) * 0.35,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.8,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(
    1,
    isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(90,25,165,0.08)",
  );
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  requestAnimationFrame(animate);
}

// ============================================================
// Events
// ============================================================
let resizeTimer = null;
window.addEventListener("resize", () => {
  resizeCanvas();
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initStars, 150);
});

window.addEventListener(
  "scroll",
  () => {
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollY;
    scrollTarget = scrollY;

    stars.forEach((star, index) => {
      const parallaxSpeed = (index % 5) * 0.2;
      star.y += scrollDelta * parallaxSpeed * 0.1;
      if (star.y > height) star.y = 0;
      if (star.y < 0) star.y = height;
    });

    lastScrollY = scrollY;
  },
  { passive: true },
);

document.addEventListener("mousemove", (e) => {
  mouse.px = e.clientX;
  mouse.py = e.clientY;
  mouse.tx = (e.clientX / width - 0.5) * 2;
  mouse.ty = (e.clientY / height - 0.5) * 2;
});

document.addEventListener("mouseleave", () => {
  mouse.px = -9999;
  mouse.py = -9999;
  mouse.tx = 0;
  mouse.ty = 0;
});

window.addEventListener(
  "touchmove",
  (e) => {
    const t = e.touches[0];
    if (!t) return;
    mouse.tx = (t.clientX / width - 0.5) * 2;
    mouse.ty = (t.clientY / height - 0.5) * 2;
  },
  { passive: true },
);

document.addEventListener("visibilitychange", () => {
  lastTime = 0;
});

// Initialize and start
resizeCanvas();
initStars();
requestAnimationFrame(animate);
