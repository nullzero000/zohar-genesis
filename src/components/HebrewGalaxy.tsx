'use client';

import { useEffect, useRef } from 'react';
import { getHebrewColor, type KabbalahSchool } from '../data/kabbalah';

interface HebrewGalaxyProps {
  text: string;
  school: KabbalahSchool;
}

interface Particle {
  x: number; y: number; z: number;
  char: string; size: number; color: string;
  vx: number; vy: number;
  rotation: number; rotationSpeed: number;
  alpha: number;
  textIndex: number; dying: boolean;
}

interface FireParticle {
  x: number; y: number;
  vy: number; 
  life: number; maxLife: number;
  size: number;
  char: string; color: string;
  rotation: number; rotationSpeed: number;
}

export const HebrewGalaxy = ({ text, school }: HebrewGalaxyProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const particlesRef = useRef<Particle[]>([]);
  const fireRef = useRef<FireParticle[]>([]);
  const textRef = useRef(text);
  const schoolRef = useRef(school);
  
  // CORRECCIÓN: Inicializar con text.length actual evita el spawn masivo en (0,0) al cambiar de tab
  const prevTextLength = useRef(text.length);

  // 1. SINCRONIZACIÓN DE REF (DATOS)
  useEffect(() => {
    textRef.current = text;
    schoolRef.current = school;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Solo spawnear si realmente estamos escribiendo NUEVAS letras
    if (text.length > prevTextLength.current) {
      // Diferencia real de letras (por si pegan texto)
      const newCharsCount = text.length - prevTextLength.current;
      
      // Solo procesamos las nuevas
      for (let j = 0; j < newCharsCount; j++) {
        const charIndex = prevTextLength.current + j;
        const char = text[charIndex];
        const color = getHebrewColor(char, school);
        
        for (let i = 0; i < 4; i++) {
          particlesRef.current.push({
            x: Math.random() * canvas.width, 
            y: Math.random() * canvas.height, 
            z: Math.random() * 2 + 0.5,
            char: char, 
            size: Math.random() * 12 + 10, 
            color: color, 
            textIndex: charIndex, 
            dying: false,
            vx: (Math.random() - 0.5) * 0.05, 
            vy: (Math.random() - 0.5) * 0.05,
            rotation: Math.random() * Math.PI * 2, 
            rotationSpeed: (Math.random() - 0.5) * 0.005,
            alpha: 0,
          });
        }
      }
    }

    // Borrar
    if (text.length < prevTextLength.current) {
      particlesRef.current.forEach(p => { 
        if (p.textIndex >= text.length) p.dying = true; 
      });
    }

    // Actualizar color en vivo
    particlesRef.current.forEach(p => { 
      if (!p.dying) p.color = getHebrewColor(p.char, school); 
    });

    prevTextLength.current = text.length;

  }, [text, school]);

  // 2. LOOP DE ANIMACIÓN
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth; 
      canvas.height = window.innerHeight;
    };
    handleResize(); // Asegurar tamaño inmediato
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const currentText = textRef.current;
      const currentSchool = schoolRef.current;
      
      const charToSpawn = currentText.length > 0 
        ? currentText[Math.floor(Math.random() * currentText.length)] 
        : 'א';
      const colorToSpawn = getHebrewColor(charToSpawn, currentSchool);

      for (let i = 0; i < 3; i++) { // Llama viva
        fireRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 4,
          y: e.clientY + (Math.random() - 0.5) * 4,
          vy: -2.5 - Math.random() * 2.5, 
          life: 0,
          maxLife: 40 + Math.random() * 30, 
          size: Math.random() * 10 + 5,
          char: charToSpawn,
          color: colorToSpawn,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.1
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // FUEGO
      ctx.globalCompositeOperation = 'lighter'; 
      for (let i = fireRef.current.length - 1; i >= 0; i--) {
        const p = fireRef.current[i];
        p.life++;
        if (p.life >= p.maxLife) { fireRef.current.splice(i, 1); continue; }
        
        const progress = p.life / p.maxLife;
        const opacity = 1 - Math.pow(progress, 1.5); 
        
        p.y += p.vy; 
        p.vy *= 0.96;
        p.x += Math.sin(p.life * 0.1) * (progress * 1.5);
        p.rotation += p.rotationSpeed;
        p.size *= 1.02;

        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
        ctx.font = `bold ${p.size}px "Times New Roman", serif`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity * 0.4; 
        ctx.shadowBlur = 20; ctx.shadowColor = p.color;
        ctx.fillText(p.char, -p.size/2, p.size/2);
        ctx.restore();
      }
      ctx.globalCompositeOperation = 'source-over';

      // GALAXIA
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        if (p.dying) { 
          p.alpha -= 0.02; 
          if (p.alpha <= 0) { particlesRef.current.splice(i, 1); continue; } 
        } else { 
          if (p.alpha < 1) p.alpha += 0.02; 
        }

        p.x += p.vx; p.y += p.vy; p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y); 
        const scale = p.z * 0.4 + 0.4; ctx.scale(scale, scale);
        ctx.rotate(p.rotation);
        
        ctx.font = `bold ${p.size}px "Times New Roman", serif`;
        ctx.fillStyle = p.color; 
        
        const twinkle = Math.sin(Date.now() * 0.002 + p.x) * 0.3 + 0.7;
        ctx.globalAlpha = p.alpha * twinkle;
        
        ctx.shadowBlur = 20; ctx.shadowColor = p.color; 
        ctx.fillText(p.char, -p.size/2, p.size/2);
        ctx.restore();
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="block pointer-events-none" 
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: 'transparent' }} 
    />
  );
};