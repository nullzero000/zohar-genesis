'use client';

import { useEffect, useRef } from 'react';
import { getHebrewColor, type KabbalahSchool } from '../data/kabbalah';
import '../styles/HebrewInput.css';

// AXIOMA: Definimos el tipo localmente para romper dependencias rotas
export type ManifestationBg = 'COSMOS' | 'BLACK_HOLE' | 'NEBULA' | 'VOID';

interface HebrewInputProps {
  value: string;
  school: KabbalahSchool;
  onDelete: () => void;
  mode: 'ORIGIN' | 'MANIFESTATION';
  // Ahora usamos el tipo local o string para evitar crashes
  manifestBg?: ManifestationBg | string; 
}

export const HebrewInput = ({ value, school, onDelete, mode, manifestBg }: HebrewInputProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isManifesting = mode === 'MANIFESTATION';

  useEffect(() => {
    if (containerRef.current && !isManifesting) {
      containerRef.current.scrollLeft = -containerRef.current.scrollWidth;
    }
  }, [value, isManifesting]);

  return (
    <div className={`input-wrapper ${isManifesting ? 'manifest-mode' : 'origin-mode'}`}>
      
      {/* CAPA DE LUZ DIVINA (Solo visible si NO hay entorno activo) */}
      {!manifestBg && (
        <>
            <div className="ein-sof-layer" />
            <div className="rays-layer" />
        </>
      )}

      <div className="hebrew-display-container" ref={containerRef}>
        {value.length === 0 ? (
            <div className="empty-state-breathing">ESPERANDO SECUENCIA...</div>
        ) : (
            <div className="letters-flex-container">
                {value.split('').map((char, index) => {
                  const rawColor = getHebrewColor(char, school);
                  const isBlack = rawColor.includes('0, 0, 0') || rawColor.includes('10, 10, 10') || rawColor === '#000000';
                  const displayColor = rawColor; 
                  
                  let textShadowStyle = '';
                  let filterStyle = isBlack ? 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' : 'none';
                  let transformStyle = '';

                  if (isManifesting && manifestBg) {
                      switch (manifestBg) {
                          case 'COSMOS':
                              const cosmosGlow = isBlack ? 'white' : displayColor;
                              textShadowStyle = `0 0 40px ${cosmosGlow}, 0 0 80px ${cosmosGlow}, 0 0 120px white`;
                              break;
                          case 'BLACK_HOLE':
                              const bhGlow = isBlack ? 'rgba(255, 100, 50, 0.9)' : displayColor;
                              textShadowStyle = `0 0 20px ${bhGlow}, 0 0 50px rgba(255, 69, 0, 0.6)`;
                              const curve = (index - value.length / 2) * 6;
                              transformStyle = `translateY(${Math.abs(curve)}px) rotate(${curve}deg)`;
                              break;
                          // Fallback a Cosmos si hay otro
                          default:
                              const defGlow = isBlack ? 'white' : displayColor;
                              textShadowStyle = `0 0 40px ${defGlow}, 0 0 80px white`;
                              break;
                      }
                  } else {
                      // MODO ORIGEN (Edición)
                      const glowColor = isBlack ? 'rgba(255, 255, 255, 0.9)' : rawColor;
                      if (isBlack) {
                          textShadowStyle = `0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)`;
                      } else {
                          textShadowStyle = `0 0 20px ${glowColor}`;
                      }
                  }

                  return (
                    <span 
                        key={`${char}-${index}`} 
                        className={`hebrew-char ${isManifesting ? 'manifesting' : ''}`}
                        style={{ 
                            color: displayColor,
                            textShadow: textShadowStyle,
                            filter: filterStyle,
                            transform: transformStyle,
                            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    >
                        {char}
                    </span>
                  );
                })}
            </div>
        )}
      </div>

      {value.length > 0 && !isManifesting && (
        <button className="delete-btn-premium" onClick={onDelete}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
        </button>
      )}
    </div>
  );
};