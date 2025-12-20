'use client';

import { useEffect, useRef, useState } from 'react';
import { getHebrewColor, type KabbalahSchool } from '../data/kabbalah';

interface HebrewGalaxyProps {
  text: string;
  school: KabbalahSchool;
}

interface Star {
  id: number;
  angle: number;
  radius: number;
  depth: number;
  sizeBase: number;
  speed: number;
  char: string;
  color: string;
  currentOpacity: number;
  targetOpacity: number;
}

export const HebrewGalaxy = ({ text, school }: HebrewGalaxyProps) => {
  const [stars, setStars] = useState<Star[]>([]);
  const requestRef = useRef<number>(0);
  
  // AXIOMA: Cobertura Total Uniforme
  const STARS_PER_CHAR = 40; 
  const POOL_SIZE = 1200; 

  useEffect(() => {
    const initialStars: Star[] = Array.from({ length: POOL_SIZE }).map((_, i) => {
      
      // LÓGICA DE DISTRIBUCIÓN UNIFORME
      // El radio se distribuye linealmente desde el centro hasta los bordes (95vw)
      const calculatedRadius = Math.random() * 95;

      return {
        id: i,
        angle: Math.random() * Math.PI * 2,
        radius: calculatedRadius, 
        // Profundidad variada para efecto 3D
        depth: Math.random() * 3 + 0.1,
        // Tamaño variado
        sizeBase: Math.random() * 0.5 + 0.2, 
        // Velocidad: Más lento en el exterior
        speed: (0.0001 + Math.random() * 0.0002) * (30 / (calculatedRadius + 5)) * (Math.random() > 0.5 ? 1 : -1),
        char: '',
        color: '#fff',
        currentOpacity: 0,
        targetOpacity: 0
      };
    });
    setStars(initialStars);
  }, []);

  // Sincronización con el Input
  useEffect(() => {
    setStars(prevStars => prevStars.map((star, index) => {
      const charIndex = Math.floor(index / STARS_PER_CHAR);
      
      if (charIndex < text.length) {
        return {
          ...star,
          char: text[charIndex],
          color: getHebrewColor(text[charIndex], school),
          targetOpacity: 1
        };
      } else {
        return {
          ...star,
          targetOpacity: 0
        };
      }
    }));
  }, [text, school]);

  // Loop de Animación
  const animate = () => {
    setStars(prevStars => prevStars.map(star => {
      if (star.currentOpacity < 0.01 && star.targetOpacity === 0) return star;

      const newAngle = star.angle + star.speed;
      const newOpacity = star.currentOpacity + (star.targetOpacity - star.currentOpacity) * 0.05;

      return {
        ...star,
        angle: newAngle,
        currentOpacity: newOpacity
      };
    }));
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div style={{ 
      position: 'absolute', inset: 0, 
      overflow: 'hidden', pointerEvents: 'none',
      perspective: '1000px',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {/* Fondo Nebula sutil */}
      <div style={{
        position: 'absolute', width: '100%', height: '100%',
        background: 'radial-gradient(circle at center, rgba(10,5,20,0.3) 0%, rgba(0,0,0,0) 70%)',
        opacity: Math.min(text.length / 5, 1),
        transition: 'opacity 3s ease',
        zIndex: -1
      }} />

      {stars.map((star) => {
        if (star.currentOpacity < 0.01) return null;

        const x = Math.cos(star.angle) * star.radius;
        const y = Math.sin(star.angle) * star.radius;
        const scale = star.depth * (0.6 + star.currentOpacity * 0.4);

        return (
          <div
            key={star.id}
            style={{
              position: 'absolute',
              transform: `translate3d(${x}vw, ${y}vh, ${star.depth * 50}px) scale(${scale})`,
              color: star.color,
              fontSize: `${star.sizeBase}rem`,
              opacity: star.currentOpacity,
              textShadow: `0 0 ${5 * star.currentOpacity}px ${star.color}`,
              fontFamily: '"Times New Roman", serif',
              willChange: 'transform, opacity',
              transition: 'color 1s ease',
            }}
          >
            {star.char}
          </div>
        )
      })}
    </div>
  );
};