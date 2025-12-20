'use client';

import { useEffect, useRef } from 'react';
import { getHebrewColor, HEBREW_ALPHABET, type KabbalahSchool } from '../data/kabbalah';

// CORRECCIÓN: Ampliamos el tipo para incluir los nuevos modos de Home.tsx
// Esto evita el error de asignación de tipos sin cambiar la lógica interna.
type VisualMode = 'GALAXY' | 'PARTICLES' | 'GLITCH' | 'COSMOS' | 'BLACK_HOLE';

interface CursorTrailProps {
  currentSchool: KabbalahSchool;
  text: string;
  visualMode: VisualMode;
}

interface RGB { r: number; g: number; b: number; }

interface MagicParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  sizeBase: number;
  char: string;
  rgb: RGB;
}

const colorCache = new Map<string, RGB>();

const parseColorToRgb = (inputColor: string | undefined, charForFallback: string): RGB => {
  const cacheKey = inputColor || `fallback-${charForFallback}`;
  if (colorCache.has(cacheKey)) return colorCache.get(cacheKey)!;

  let result: RGB;
  if (!inputColor) {
    const code = charForFallback.charCodeAt(0) * 12345;
    result = { r: (code % 200) + 55, g: ((code >> 8) % 200) + 55, b: ((code >> 16) % 200) + 55 };
  } else {
    let c = inputColor.trim();
    if (c.startsWith('#')) c = c.slice(1);
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    
    if (c.length === 6) {
      const bigint = parseInt(c, 16);
      result = !isNaN(bigint) 
        ? { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
        : { r: 212, g: 175, b: 55 };
    } else if (c.startsWith('rgb')) {
      const parts = c.match(/\d+/g);
      result = (parts && parts.length >= 3)
        ? { r: parseInt(parts[0]), g: parseInt(parts[1]), b: parseInt(parts[2]) }
        : { r: 212, g: 175, b: 55 };
    } else {
      const code = charForFallback.charCodeAt(0) * 999;
      result = { r: (code % 255), g: ((code * 2) % 255), b: ((code * 3) % 255) };
    }
  }
  if (colorCache.size < 500) colorCache.set(cacheKey, result);
  return result;
};

export const CursorTrail = ({ currentSchool, text, visualMode }: CursorTrailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const latestText = useRef(text);
  const latestSchool = useRef(currentSchool);
  const latestVisualMode = useRef(visualMode);

  const particlesRef = useRef<MagicParticle[]>([]);
  const particleIdCounter = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastMouseVelocity = useRef({ vx: 0, vy: 0 }); 
  const fullAlphabet = useRef<string[]>(HEBREW_ALPHABET.map(h => h.char));
  
  const MAX_PARTICLES = 300;
  const MIN_DIST = 2;

  useEffect(() => {
    latestText.current = text;
    latestSchool.current = currentSchool;
    latestVisualMode.current = visualMode;
  }, [text, currentSchool, visualMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };
    resize();
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 200);
    };
    window.addEventListener('resize', handleResize);

    const spawnParticles = (x: number, y: number) => {
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      lastMouseVelocity.current = { vx: dx * 0.1, vy: dy * 0.1 };

      if (dist < MIN_DIST) return;
      lastPos.current = { x, y };

      const currentTextStr = latestText.current;
      const currentSchoolVal = latestSchool.current;
      const currentVisualModeVal = latestVisualMode.current;

      const isMidasMode = currentVisualModeVal === 'PARTICLES';
      const cleanText = currentTextStr.replace(/\s/g, '');
      const sourcePool = cleanText.length > 0 ? cleanText.split('') : fullAlphabet.current;

      if (particlesRef.current.length >= MAX_PARTICLES) {
        particlesRef.current.splice(0, 10);
      }

      const count = 4;

      for (let i = 0; i < count; i++) {
        const char = sourcePool[Math.floor(Math.random() * sourcePool.length)];
        let rgb: RGB;
        if (isMidasMode) {
            rgb = { r: 212, g: 175, b: 55 }; 
        } else {
            const rawColor = getHebrewColor(char, currentSchoolVal);
            rgb = parseColorToRgb(rawColor, char);
        }

        particleIdCounter.current++;
        const initialVx = lastMouseVelocity.current.vx * 0.5 + (Math.random() - 0.5) * 2;
        const initialVy = lastMouseVelocity.current.vy * 0.5 + (Math.random() - 0.5) * 2;

        particlesRef.current.push({
          id: particleIdCounter.current,
          x: x,
          y: y,
          vx: initialVx,
          vy: initialVy,
          life: 1.0,
          decay: Math.random() * 0.0015 + 0.0005, 
          sizeBase: Math.random() * 14 + 10, 
          char: char,
          rgb: rgb,
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => spawnParticles(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      spawnParticles(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (particlesRef.current.length > 0) {
        ctx.globalCompositeOperation = 'lighter'; 
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        
        // Física de Estrella Fugaz
        p.vy += 0.03; 
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        p.life -= p.decay;

        if (p.life <= 0) {
          particlesRef.current[i] = particlesRef.current[particlesRef.current.length - 1];
          particlesRef.current.pop();
          continue;
        }

        const drawX = (p.x + 0.5) | 0;
        const drawY = (p.y + 0.5) | 0;
        
        // Tapering
        const sizeLifeFactor = Math.pow(p.life, 1.8); 
        const currentSize = p.sizeBase * sizeLifeFactor;
        
        if (currentSize < 2) continue; 

        ctx.font = `bold ${currentSize | 0}px "Times New Roman"`;
        const { r, g, b } = p.rgb;

        // --- AJUSTE DE INCANDESCENCIA (DIMMING) ---
        
        // 1. Shadow Blur reducido (Menos halo)
        const blurAmount = 8 * p.life;
        ctx.shadowBlur = blurAmount;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${p.life * 0.5})`;
        
        // 2. Color Base mucho más suave
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.life * 0.4})`;
        ctx.fillText(p.char, drawX, drawY);

        // 3. Núcleo Blanco atenuado
        if (p.life > 0.9) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(255, 255, 255, 0.5)`;
            ctx.fillStyle = `rgba(255, 255, 255, ${(p.life - 0.9) * 4})`;
            ctx.fillText(p.char, drawX, drawY);
        }
        ctx.shadowBlur = 0;
      }

      ctx.globalCompositeOperation = 'source-over';
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchMove);
      cancelAnimationFrame(animId);
      colorCache.clear();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} 
    />
  );
};