import { useEffect, useRef } from "react";
import "./HoneycombBeeBg.css";

export default function HoneycombBeeBg() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const beeRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const beeSvg = beeRef.current;

    if (!root || !canvas || !beeSvg) return;

    const ctx = canvas.getContext("2d");

    const TW = 90;
    const TH = 51.9615;
    const REVEAL_R = 115;
    const BEE_SIZE = 38;

    let viewW = 0;
    let viewH = 0;

    let bx = 0;
    let by = 0;
    let tx = 0;
    let ty = 0;
    let vx = 0;
    let vy = 0;
    let flipX = false;
    let lastChange = 0;
    let started = false;
    let rafId;

    function pickTarget() {
      const margin = 55;

      const minX = margin;
      const maxX = Math.max(margin, viewW - margin - BEE_SIZE);

      const minY = 90;
      const maxY = Math.max(120, viewH - margin - BEE_SIZE);

      tx = minX + Math.random() * Math.max(1, maxX - minX);
      ty = minY + Math.random() * Math.max(1, maxY - minY);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = root.parentElement;

      if (!parent) return;

      viewW = root.clientWidth || parent.clientWidth;

      viewH = Math.max(
        parent.scrollHeight,
        parent.offsetHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
      );

      root.style.height = `${viewH}px`;

      canvas.width = Math.floor(viewW * dpr);
      canvas.height = Math.floor(viewH * dpr);

      canvas.style.width = `${viewW}px`;
      canvas.style.height = `${viewH}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!started) {
        bx = viewW / 2 - BEE_SIZE / 2;
        by = 160;
        pickTarget();
        started = true;
      }
    }

    function hexTilePath(px, py) {
      ctx.moveTo(px + 30, py + 0);
      ctx.lineTo(px + 60, py + 0);
      ctx.lineTo(px + 75, py + 25.9808);
      ctx.lineTo(px + 60, py + 51.9615);
      ctx.lineTo(px + 30, py + 51.9615);
      ctx.lineTo(px + 15, py + 25.9808);
      ctx.closePath();

      ctx.moveTo(px + 15, py + 25.9808);
      ctx.lineTo(px + 0, py + 25.9808);

      ctx.moveTo(px + 75, py + 25.9808);
      ctx.lineTo(px + 90, py + 25.9808);
    }

    function drawFrame(ts) {
      ctx.clearRect(0, 0, viewW, viewH);

      const ox = ((ts * TW) / 15000) % TW;
      const oy = ((ts * TH) / 15000) % TH;

      const cx = bx + BEE_SIZE / 2;
      const cy = by + BEE_SIZE / 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, REVEAL_R, 0, Math.PI * 2);
      ctx.clip();

      const extra = 2;
      const c0 = Math.floor((cx - REVEAL_R - ox) / TW) - extra;
      const c1 = Math.ceil((cx + REVEAL_R - ox) / TW) + extra;
      const r0 = Math.floor((cy - REVEAL_R - oy) / TH) - extra;
      const r1 = Math.ceil((cy + REVEAL_R - oy) / TH) + extra;

      ctx.beginPath();

      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          hexTilePath(c * TW + ox, r * TH + oy);
        }
      }

      const grad = ctx.createRadialGradient(
        cx,
        cy,
        REVEAL_R * 0.25,
        cx,
        cy,
        REVEAL_R
      );

      grad.addColorStop(0, "rgba(255,245,210,0.95)");
      grad.addColorStop(0.55, "rgba(255,220,135,0.75)");
      grad.addColorStop(1, "rgba(255,190,70,0)");

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.4;
      ctx.stroke();

      ctx.restore();

      ctx.save();

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, REVEAL_R * 1.2);
      glow.addColorStop(0, "rgba(255,230,95,0.22)");
      glow.addColorStop(0.6, "rgba(255,150,10,0.08)");
      glow.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, REVEAL_R * 1.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function animate(ts) {
      if (!started) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      if (ts - lastChange > 2500 + Math.random() * 2500) {
        pickTarget();
        lastChange = ts;
      }

      const dx = tx - bx;
      const dy = ty - by;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 4) {
        const spd = Math.min(dist * 0.012, 1.4);
        vx += (dx / dist) * spd * 0.12;
        vy += (dy / dist) * spd * 0.12;
      }

      vx *= 0.94;
      vy *= 0.94;

      bx += vx;
      by += vy;

      bx = Math.max(12, Math.min(viewW - BEE_SIZE - 12, bx));
      by = Math.max(78, Math.min(viewH - BEE_SIZE - 20, by));

      if (Math.abs(vx) > 0.15) {
        flipX = vx < 0;
      }

      const bob = Math.sin(ts * 0.0022) * 3;
      const tilt = vx * 2.2;
      const sX = flipX ? -1 : 1;

      beeSvg.style.left = `${bx}px`;
      beeSvg.style.top = `${by + bob}px`;
      beeSvg.style.transform = `scaleX(${sX}) rotate(${tilt}deg)`;

      drawFrame(ts);
      rafId = requestAnimationFrame(animate);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(root);

    if (root.parentElement) {
      observer.observe(root.parentElement);
    }

    const timerOne = setTimeout(resize, 500);
    const timerTwo = setTimeout(resize, 1200);

    window.addEventListener("load", resize);
    window.addEventListener("resize", resize);

    resize();
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      clearTimeout(timerOne);
      clearTimeout(timerTwo);
      window.removeEventListener("load", resize);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="hc-react-bg" ref={rootRef} aria-hidden="true">
      <canvas ref={canvasRef} className="hc-react-canvas" />

      <svg
        ref={beeRef}
        className="hc-react-bee"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="38" cy="38" rx="22" ry="11" fill="rgba(200,235,255,0.82)" transform="rotate(-30 38 38)" />
        <ellipse cx="82" cy="38" rx="22" ry="11" fill="rgba(200,235,255,0.72)" transform="rotate(30 82 38)" />
        <ellipse cx="42" cy="48" rx="14" ry="7" fill="rgba(200,235,255,0.55)" transform="rotate(-20 42 48)" />
        <ellipse cx="78" cy="48" rx="14" ry="7" fill="rgba(200,235,255,0.45)" transform="rotate(20 78 48)" />

        <ellipse cx="60" cy="78" rx="22" ry="28" fill="#f7c200" />

        <rect x="39" y="68" width="42" height="9" rx="4" fill="#1a1008" opacity="0.88" />
        <rect x="39" y="80" width="42" height="9" rx="4" fill="#1a1008" opacity="0.88" />
        <rect x="41" y="91" width="38" height="7" rx="3.5" fill="#1a1008" opacity="0.7" />

        <ellipse cx="53" cy="62" rx="7" ry="4" fill="rgba(255,255,200,0.3)" transform="rotate(-10 53 62)" />

        <ellipse cx="60" cy="52" rx="16" ry="13" fill="#2a1a00" />
        <ellipse cx="60" cy="49" rx="9" ry="5" fill="#3d2800" opacity="0.7" />

        <circle cx="60" cy="35" r="14" fill="#1a1008" />

        <path d="M54 23 Q48 12 42 8" fill="none" stroke="#1a1008" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M66 23 Q72 12 78 8" fill="none" stroke="#1a1008" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="41" cy="7" r="3.2" fill="#1a1008" />
        <circle cx="79" cy="7" r="3.2" fill="#1a1008" />

        <path d="M58 105 Q60 114 62 105" fill="#f7a800" stroke="#c47000" strokeWidth="0.8" />

        <path d="M45 68 Q36 72 30 78" fill="none" stroke="#1a1008" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M45 76 Q34 80 28 88" fill="none" stroke="#1a1008" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M75 68 Q84 72 90 78" fill="none" stroke="#1a1008" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M75 76 Q86 80 92 88" fill="none" stroke="#1a1008" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}