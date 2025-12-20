'use client';

import { useEffect, useRef } from 'react';
import { type KabbalahSchool } from '../data/kabbalah';

interface MysticParticlesProps {
  text: string;
  school: KabbalahSchool;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;       // Opacidad actual
  targetAlpha: number; // Opacidad objetivo (0 o visible)
  pulse: number;
  char: string;
  color: string;
}

export const MysticParticles = ({ text, school }: MysticParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const initializedRef = useRef(false);

  // AXIOMA: Densidad 2X. 30 partículas doradas por cada letra escrita.
  const PARTICLES_PER_CHAR = 30;
  // Capacidad máxima suficiente para textos largos con la nueva densidad
  const MAX_POOL = 60 * PARTICLES_PER_CHAR; 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!initializedRef.current) {
      const resize = () => {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        canvas.style.width = '100%';
        canvas.style.height = '100%';
      };
      resize();
      window.addEventListener('resize', resize);

      // INICIALIZACIÓN: Todo empieza INVISIBLE (Vacío)
      for (let i = 0; i < MAX_POOL; i++) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.2, // Movimiento flotante suave
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 12 + 8, // Tamaño que te gustó
          alpha: 0, // Empiezan ocultas
          targetAlpha: 0,
          pulse: Math.random() * 0.01 + 0.002,
          char: '', // Sin letra asignada aún
          color: 'rgba(255, 235, 180' // Base dorada
        });
      }
      initializedRef.current = true;
    }

    let animationId: number;

    const animate = () => {
      // Limpieza total
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 1. Lógica de Fading (Interpolación)
      particlesRef.current.forEach(p => {
        // Suavizado hacia el objetivo
        p.alpha += (p.targetAlpha - p.alpha) * 0.08;
      });

      // 2. Renderizado
      particlesRef.current.forEach((p) => {
        // Optimización: Si es invisible, no procesar física ni dibujo
        if (p.alpha < 0.01) return;

        // Física
        p.x += p.vx;
        p.y += p.vy;
        
        // Loop infinito en pantalla
        if (p.x < -20) p.x = window.innerWidth + 20;
        if (p.x > window.innerWidth + 20) p.x = -20;
        if (p.y < -20) p.y = window.innerHeight + 20;
        if (p.y > window.innerHeight + 20) p.y = -20;

        // Pulsación sutil sobre la opacidad base
        const currentAlpha = p.alpha + Math.sin(Date.now() * p.pulse) * 0.1;
        // Clamp entre 0 y 1
        const finalAlpha = Math.max(0, Math.min(1, currentAlpha));

        // RENDERIZADO DE LETRA (Estilo Dorado que te gustó)
        ctx.font = `${p.size}px "Times New Roman"`;
        ctx.fillStyle = `${p.color}, ${finalAlpha})`;
        
        // Sombra suave dorada
        ctx.shadowBlur = 5;
        ctx.shadowColor = `rgba(255, 215, 0, ${finalAlpha * 0.5})`;
        
        ctx.fillText(p.char, p.x, p.y);
        
        ctx.shadowBlur = 0; // Reset
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // LÓGICA REACTIVA: Conecta el Input con el Pool de Partículas
  useEffect(() => {
    particlesRef.current.forEach((p, index) => {
      // Dividimos el pool en grupos de 30 (Nueva densidad).
      const charIndex = Math.floor(index / PARTICLES_PER_CHAR);
      
      if (charIndex < text.length) {
        // ESTADO ACTIVO: Asignamos la letra que escribiste
        p.char = text[charIndex];
        
        // Si estaba "dormida" (targetAlpha 0), la despertamos
        if (p.targetAlpha === 0) {
           // Opcional: Reubicarla aleatoriamente para que parezca nacer
           p.x = Math.random() * window.innerWidth;
           p.y = Math.random() * window.innerHeight;
           // Le damos una opacidad visible aleatoria
           p.targetAlpha = Math.random() * 0.5 + 0.2; 
        }
      } else {
        // ESTADO INACTIVO: Apagar suavemente
        p.targetAlpha = 0;
      }
    });
  }, [text, school]); 

  return (
    <canvas 
      ref={canvasRef}
      style={{ 
        position: 'absolute', inset: 0, 
        pointerEvents: 'none',
        mixBlendMode: 'screen'
      }} 
    />
  );
};