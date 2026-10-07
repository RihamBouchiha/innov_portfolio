"use client";

import { useEffect, useRef } from "react";
import styles from "./home.module.css";

const LOGO_COLORS = [
  { r: 0, g: 212, b: 255 }, // Vibrant Cyan
  { r: 0, g: 85, b: 255 }, // Mid Blue
  { r: 74, g: 20, b: 140 }, // Deep Purple
  { r: 212, g: 63, b: 195 }, // Magenta / Pink
];

const LIGHT_COLORS = [
  { r: 0, g: 150, b: 225 },
  { r: 0, g: 70, b: 235 },
  { r: 90, g: 25, b: 165 },
  { r: 200, g: 40, b: 180 },
];

const LIGHT_BG = ["#eaf1ff", "#f4f0ff", "#fdf0f8"];
const TAU = Math.PI * 2;

const rand = (a, b) => a + Math.random() * (b - a);
const lerp = (a, b, t) => a + (b - a) * t;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

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

function makeGlowSprite(c, size = 256) {
  if (typeof document === "undefined") return null;
  const s = document.createElement("canvas");
  s.width = s.height = size;
  const g = s.getContext("2d");
  if (!g) return null;
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

function makeCoreSprite() {
  if (typeof document === "undefined") return null;
  const size = 256;
  const s = document.createElement("canvas");
  s.width = s.height = size;
  const g = s.getContext("2d");
  if (!g) return null;
  const grad = g.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  grad.addColorStop(0, "rgba(88,20,150,1)");
  grad.addColorStop(0.12, "rgba(190,45,175,0.8)");
  grad.addColorStop(0.4, "rgba(110,60,220,0.3)");
  grad.addColorStop(0.75, "rgba(0,85,255,0.1)");
  grad.addColorStop(1, "rgba(0,85,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return s;
}

export default function StarfieldCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

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

    let intro = 0;
    let introStart = 0;
    const introDur = 2.0;
    let simTime = 0;
    let elapsed = 0;
    let lastTime = 0;
    let animId = null;
    let isVisible = true;

    const reduceMotionQuery = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    );
    let motion = reduceMotionQuery?.matches ? 0.15 : 1;
    const handleMotionChange = (e) => {
      motion = e.matches ? 0.15 : 1;
    };
    reduceMotionQuery?.addEventListener?.("change", handleMotionChange);

    const mouse = { tx: 0, ty: 0, x: 0, y: 0, px: -9999, py: -9999 };
    let scrollTarget = window.scrollY || 0;
    let scrollSmooth = window.scrollY || 0;
    let lastScrollY = window.scrollY || 0;

    const glowSprites = LOGO_COLORS.map((c) => makeGlowSprite(c)).filter(
      Boolean,
    );
    const coreSprite = makeCoreSprite();

    function resizeCanvas() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    class Star {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = rand(0.25, 1);
        this.size = (Math.random() * 1.5 + 0.4) * (0.55 + 0.65 * this.z);
        if (Math.random() < 0.04) this.size *= 1.8;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.twinkleSpeed = Math.random() * 1.2 + 0.6;
        this.twinklePhase = Math.random() * TAU;
        this.ci = Math.floor(Math.random() * LIGHT_COLORS.length);
        this.spike = this.size > 2.0;
        this.drift = rand(1, 3.5) * this.z;
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
        if (dist < 140 && dist > 0.001) {
          const force = (140 - dist) / 140;
          this.ox += (dx / dist) * force * 80 * dt;
          this.oy += (dy / dist) * force * 80 * dt;
        }
        const k = Math.exp(-dt * 1.6);
        this.ox *= k;
        this.oy *= k;
      }

      draw() {
        this.twinklePhase += this.twinkleSpeed * (1 / 60) * motion;
        const twinkle = Math.sin(this.twinklePhase) * 0.5 + 0.5;
        const op = this.opacity * (0.55 + 0.45 * twinkle) * intro;
        const size = this.size * 1.25;
        const x = this.x + this.ox + mouse.x * 24 * this.z;
        const y = this.y + this.oy + mouse.y * 24 * this.z;
        this.sx = x;
        this.sy = y;
        const c = LIGHT_COLORS[this.ci];
        const glowR = size * 3.8;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${op * 0.5})`);
        grad.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},${op * 0.2})`);
        grad.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, TAU);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${Math.min(1, op * 1.35)})`;
        ctx.arc(x, y, size * 0.8, 0, TAU);
        ctx.fill();

        if (this.spike) {
          const len = size * 5.5 * (0.7 + 0.3 * twinkle);
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${op * 0.6})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(x - len, y);
          ctx.lineTo(x + len, y);
          ctx.moveTo(x, y - len);
          ctx.lineTo(x, y + len);
          ctx.stroke();
        }
      }
    }

    function drawLinks() {
      if (intro <= 0) return;
      const maxD = 120;
      const maxD2 = maxD * maxD;
      ctx.lineWidth = 0.75;
      const buckets = Array.from({ length: 10 }, () => []);

      for (let i = 0; i < linkStars.length; i++) {
        const a = linkStars[i];
        for (let j = i + 1; j < linkStars.length; j++) {
          const b = linkStars[j];
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            const baseAlpha = 1 - Math.sqrt(d2) / maxD;
            let bucketIdx = Math.floor(baseAlpha * 9);
            if (bucketIdx < 0) bucketIdx = 0;
            if (bucketIdx > 9) bucketIdx = 9;
            buckets[bucketIdx].push(a.sx, a.sy, b.sx, b.sy);
          }
        }
      }

      for (let i = 0; i < buckets.length; i++) {
        const lines = buckets[i];
        if (lines.length === 0) continue;
        const alpha = (i / 9) * 0.28 * intro;
        ctx.strokeStyle = `rgba(90,25,165,${alpha})`;
        ctx.beginPath();
        for (let k = 0; k < lines.length; k += 4) {
          ctx.moveTo(lines[k], lines[k + 1]);
          ctx.lineTo(lines[k + 2], lines[k + 3]);
        }
        ctx.stroke();
      }
    }

    class ShootingStar {
      constructor() {
        this.active = false;
        this.timer = rand(1, 5);
      }
      spawn() {
        this.x = rand(0.05, 0.85) * width;
        this.y = rand(0, 0.45) * height;
        this.length = rand(110, 190);
        this.speed = rand(650, 1050);
        this.opacity = rand(0.7, 1);
        this.angle = Math.PI / 4 + rand(-0.15, 0.15);
        this.life = 0;
        this.maxLife = rand(0.7, 1.2);
        this.ci = Math.floor(Math.random() * LIGHT_COLORS.length);
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
          this.timer = rand(3, 8);
        }
      }
      draw() {
        if (!this.active) return;
        const p = Math.min(1, this.life / this.maxLife);
        const fade = Math.sin(p * Math.PI) * this.opacity * intro;
        const c = LIGHT_COLORS[this.ci];
        const tx = this.x - Math.cos(this.angle) * this.length;
        const ty = this.y - Math.sin(this.angle) * this.length;
        const grad = ctx.createLinearGradient(this.x, this.y, tx, ty);
        grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${fade})`);
        grad.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        if (glowSprites[this.ci]) {
          ctx.globalAlpha = fade;
          ctx.drawImage(glowSprites[this.ci], this.x - 14, this.y - 14, 28, 28);
          ctx.globalAlpha = 1;
        }
      }
    }

    class Nebula {
      constructor(i) {
        this.sprite = glowSprites[i % glowSprites.length];
        this.nx = rand(0.05, 0.95);
        this.ny = rand(0.05, 0.95);
        this.radius = rand(0.28, 0.52) * Math.max(width, height);
        this.squash = rand(0.45, 0.8);
        this.rot = rand(0, Math.PI);
        this.rotSpeed = rand(-0.02, 0.02);
        this.driftAmp = rand(30, 80);
        this.driftSpeed = rand(0.03, 0.07);
        this.phase = rand(0, TAU);
        this.breathSpeed = rand(0.1, 0.22);
        this.alpha = rand(0.1, 0.18);
        this.depth = rand(0.2, 0.5);
      }
      draw() {
        if (!this.sprite) return;
        const t = simTime;
        const x =
          this.nx * width +
          Math.sin(t * this.driftSpeed + this.phase) * this.driftAmp +
          mouse.x * 14 * this.depth;
        const y =
          this.ny * height +
          Math.cos(t * this.driftSpeed * 0.8 + this.phase) *
            this.driftAmp *
            0.7 +
          mouse.y * 14 * this.depth -
          Math.min(scrollSmooth, 800) * 0.03 * this.depth;
        const breathe =
          0.75 + 0.25 * Math.sin(t * this.breathSpeed + this.phase);
        const r = this.radius * (0.95 + 0.05 * breathe);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rot + t * this.rotSpeed);
        ctx.scale(1, this.squash);
        ctx.globalAlpha = Math.min(1, this.alpha * 1.9) * breathe * intro;
        ctx.drawImage(this.sprite, -r, -r, r * 2, r * 2);
        ctx.restore();
      }
    }

    class DistantGalaxy {
      constructor(i) {
        this.sprite = glowSprites[i % glowSprites.length];
        this.x = rand(0.05, 0.95) * width;
        this.y = rand(0.05, 0.95) * height;
        this.size = rand(18, 38);
        this.squash = rand(0.22, 0.45);
        this.rot = rand(0, Math.PI);
        this.phase = rand(0, TAU);
        this.depth = rand(0.4, 0.7);
      }
      draw() {
        if (!this.sprite) return;
        const pulse = 0.65 + 0.35 * Math.sin(simTime * 0.4 + this.phase);
        const x = this.x + mouse.x * 18 * this.depth;
        const y = this.y + mouse.y * 18 * this.depth;
        const s = this.size * 1.35;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rot);
        ctx.scale(1, this.squash);
        ctx.globalAlpha = Math.min(1, pulse * intro);
        ctx.drawImage(this.sprite, -s, -s, s * 2, s * 2);
        if (coreSprite) {
          ctx.globalAlpha = 0.75 * pulse * intro;
          ctx.drawImage(coreSprite, -s * 0.28, -s * 0.28, s * 0.56, s * 0.56);
        }
        ctx.restore();
      }
    }

    class Dust {
      constructor() {
        this.sprite = pick(glowSprites);
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = rand(0.3, 1);
        this.size = rand(14, 40) * this.z;
        this.vx = rand(-5, 5);
        this.vy = rand(-3, 3);
        this.alpha = rand(0.05, 0.14);
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
        if (!this.sprite) return;
        const tw = 0.6 + 0.4 * Math.sin(simTime * 0.5 + this.phase);
        const x = this.x + mouse.x * 45 * this.z;
        const y = this.y + mouse.y * 45 * this.z;
        ctx.globalAlpha = Math.min(1, this.alpha * 2.2) * tw * intro;
        ctx.drawImage(
          this.sprite,
          x - this.size,
          y - this.size,
          this.size * 2,
          this.size * 2,
        );
      }
    }

    function buildGalaxy() {
      const small = width < 768;
      const count = small ? 1000 : 2600;
      const arms = 3;
      const twist = 5.2;
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
          a =
            (i % arms) * (TAU / arms) + r * twist + gauss() * (0.22 + 0.28 * r);
        }
        const t = Math.min(1, Math.max(0, r + gauss() * 0.12));
        const cl = colorFromStops(lightStops, t);
        const alphaL = rand(0.55, 1);
        particles.push({
          r,
          a,
          w: 0.05 * (1 + 0.25 * (1 - r)),
          size: Math.random() < 0.06 ? rand(1.5, 2.5) : rand(0.5, 1.4),
          cl: `rgba(${cl.r},${cl.g},${cl.b},${alphaL.toFixed(2)})`,
        });
      }
      return {
        particles,
        cx: small ? width * 0.5 : width * 0.74,
        cy: small ? height * 0.25 : height * 0.35,
        R: small
          ? Math.min(width * 0.44, 280)
          : Math.min(width * 0.55, height * 0.75, 540),
        tilt: -0.5,
        squash: 0.45,
      };
    }

    function drawGalaxy() {
      if (!galaxy) return;
      const g = galaxy;
      const x = g.cx + mouse.x * 20;
      const y = g.cy + mouse.y * 14 - Math.min(scrollSmooth, 800) * 0.04;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(g.tilt);
      ctx.scale(1, g.squash);

      if (glowSprites[1]) {
        ctx.globalAlpha = intro * 0.65;
        ctx.drawImage(
          glowSprites[1],
          -g.R * 1.1,
          -g.R * 1.1,
          g.R * 2.2,
          g.R * 2.2,
        );
      }

      if (coreSprite) {
        ctx.globalAlpha = intro * (0.85 + 0.15 * Math.sin(simTime * 0.6));
        ctx.drawImage(coreSprite, -g.R * 0.5, -g.R * 0.5, g.R, g.R);
      }

      ctx.globalAlpha = intro;
      const ps = g.particles;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        const ang = p.a + simTime * p.w;
        ctx.fillStyle = p.cl;
        const s = p.size * 1.35;
        ctx.fillRect(
          Math.cos(ang) * p.r * g.R,
          Math.sin(ang) * p.r * g.R,
          s,
          s,
        );
      }
      ctx.restore();
    }

    function paintBackground() {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, LIGHT_BG[0]);
      bg.addColorStop(0.5, LIGHT_BG[1]);
      bg.addColorStop(1, LIGHT_BG[2]);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
    }

    function initScene() {
      const numberOfStars = Math.floor((width * height) / 8500);
      stars = [];
      for (let i = 0; i < numberOfStars; i++) stars.push(new Star());
      linkStars = stars.filter((s) => s.z > 0.65);
      shootingStars = [];
      for (let i = 0; i < 3; i++) shootingStars.push(new ShootingStar());
      nebulae = [];
      for (let i = 0; i < 6; i++) nebulae.push(new Nebula(i));
      distantGalaxies = [];
      for (let i = 0; i < 5; i++) distantGalaxies.push(new DistantGalaxy(i));
      dust = [];
      const dustCount = width < 700 ? 14 : 28;
      for (let i = 0; i < dustCount; i++) dust.push(new Dust());
      galaxy = buildGalaxy();
    }

    function animate(now) {
      if (!isVisible) {
        animId = requestAnimationFrame(animate);
        return;
      }
      if (!lastTime) lastTime = now;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += dt;
      simTime += dt * motion;
      intro = easeOut(Math.min(1, (elapsed - introStart) / introDur));

      const ease = 1 - Math.exp(-dt * 2.2);
      mouse.x += (mouse.tx - mouse.x) * ease;
      mouse.y += (mouse.ty - mouse.y) * ease;
      scrollSmooth += (scrollTarget - scrollSmooth) * (1 - Math.exp(-dt * 3));

      paintBackground();

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

      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.35,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8,
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(90,25,165,0.06)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(animate);
    }

    let resizeTimer = null;
    const handleResize = () => {
      resizeCanvas();
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initScene, 150);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      const scrollDelta = scrollY - lastScrollY;
      scrollTarget = scrollY;
      stars.forEach((star, index) => {
        const parallaxSpeed = (index % 5) * 0.2;
        star.y += scrollDelta * parallaxSpeed * 0.08;
        if (star.y > height) star.y = 0;
        if (star.y < 0) star.y = height;
      });
      lastScrollY = scrollY;
    };

    const handleMouseMove = (e) => {
      if (!width || !height) return;
      mouse.px = e.clientX;
      mouse.py = e.clientY;
      mouse.tx = (e.clientX / width - 0.5) * 2;
      mouse.ty = (e.clientY / height - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      mouse.px = -9999;
      mouse.py = -9999;
      mouse.tx = 0;
      mouse.ty = 0;
    };

    const handleTouchMove = (e) => {
      const t = e.touches[0];
      if (!t || !width || !height) return;
      mouse.tx = (t.clientX / width - 0.5) * 2;
      mouse.ty = (t.clientY / height - 0.5) * 2;
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
      lastTime = 0;
    };

    let observer = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting && !document.hidden;
        lastTime = 0;
      });
      observer.observe(canvas);
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    resizeCanvas();
    initScene();
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      reduceMotionQuery?.removeEventListener?.("change", handleMotionChange);
    };
  }, []);

  return (
    <div
      className={`${styles.starfieldCanvasWrap} ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.starfieldCanvas} />
    </div>
  );
}
