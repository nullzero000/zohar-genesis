'use client';

import { useEffect, useRef } from 'react';
import { getHebrewColor, type KabbalahSchool } from '../data/kabbalah';

interface MysticParticlesProps {
  text: string;
  school: KabbalahSchool;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  char: string;
  color: string;
  baseAlpha: number; 
  pulseSpeed: number;
  pulseOffset: number;
  // NUEVAS PROPIEDADES PARA EL CICLO DE VIDA
  textIndex: number; // A qué letra pertenece
  dying: boolean;    // Si está en proceso de desaparecer
}

export const MysticParticles = ({ text, school }: MysticParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const particlesRef = useRef<Particle[]>([]);
  const prevTextLength = useRef(text.length); 
  
  const chars = 'אבגדהוזחטיכלמנסעפצקרשת'; 

  // Función para crear partícula vinculada a un índice
  const createParticle = (width: number, height: number, textIndex: number, specificChar?: string, specificColor?: string): Particle => {
    const char = specificChar || chars[Math.floor(Math.random() * chars.length)];
    const color = specificColor || getHebrewColor(char, school);

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 8, // 8px a 12px
      char: char,
      color: color,
      vx: (Math.random() - 0.5) * 0.1, 
      vy: (Math.random() - 0.5) * 0.1,
      baseAlpha: Math.random() * 0.3 + 0.1, 
      pulseSpeed: Math.random() * 0.02 + 0.005, 
      pulseOffset: Math.random() * Math.PI * 2,
      
      // VINCULACIÓN
      textIndex: textIndex,
      dying: false
    };
  };

  // --- LÓGICA DE NACIMIENTO Y MUERTE ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // A. NACIMIENTO: Si escribimos algo nuevo
    if (text.length > prevTextLength.current) {
      const newChar = text[text.length - 1];
      const newColor = getHebrewColor(newChar, school);
      const newIndex = text.length - 1;

      // Añadimos partículas vinculadas a este índice
      for (let i = 0; i < 5; i++) {
        particlesRef.current.push(createParticle(canvas.width, canvas.height, newIndex, newChar, newColor));
      }
    }
    
    // B. MUERTE: Si borramos (backspace o clear)
    if (text.length < prevTextLength.current) {
      // Marcamos como 'dying' a todas las partículas cuyo índice ya no existe
      particlesRef.current.forEach(p => {
        if (p.textIndex >= text.length) {
          p.dying = true;
        }
      });
    }

    prevTextLength.current = text.length;
  }, [text, school]);

  // --- LOOP VISUAL ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // No reiniciamos al resize para no perder el estado actual
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Iteramos hacia atrás para poder eliminar elementos del array sin romper el índice
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        // 1. GESTIÓN DE MUERTE
        if (p.dying) {
          p.baseAlpha -= 0.05; // Se desvanece rápido
          if (p.baseAlpha <= 0) {
            particlesRef.current.splice(i, 1); // Eliminar de la memoria
            continue; // Saltar al siguiente ciclo
          }
        }

        // 2. MOVIMIENTO
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // 3. RENDERIZADO
        ctx.font = `${p.size}px "Times New Roman", serif`;
        ctx.fillStyle = p.color;

        // Parpadeo
        const pulse = Math.sin(Date.now() * 0.001 * p.pulseSpeed + p.pulseOffset);
        // Si está muriendo, usamos el baseAlpha que está decreciendo, si no, el pulso normal
        const currentAlpha = p.dying ? p.baseAlpha : (p.baseAlpha + (pulse * 0.05)); 
        
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));

        ctx.fillText(p.char, p.x, p.y);
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [school]); 

  return (
    <canvas 
      ref={canvasRef} 
      className="block pointer-events-none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: 'transparent' }} 
    />
  );
};