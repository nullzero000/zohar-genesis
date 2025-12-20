'use client';

import { HEBREW_ALPHABET, type KabbalahSchool, getHebrewColor } from '../data/kabbalah';
import '../styles/HebrewKeyboard.css';

interface KeyboardProps {
  currentSchool: KabbalahSchool;
  onCharClick: (char: string) => void;
}

export const HebrewKeyboard = ({ currentSchool, onCharClick }: KeyboardProps) => {
  return (
    <div className="keyboard-container" dir="rtl">
      {HEBREW_ALPHABET.map((item: any) => {
        const char = typeof item === 'string' ? item : item.char;
        
        // 1. Obtener color base de la escuela (desde constants.ts)
        const rawColor = getHebrewColor(char, currentSchool);
        
        // 2. Detección de "Tinta Negra" (Ortodoxa: Yod, Ayin, Tav)
        // Detectamos tanto el negro absoluto como el gris muy oscuro definido en constants.ts
        const isBlack = rawColor.includes('0, 0, 0') || rawColor.includes('10, 10, 10') || rawColor === '#000000';
        
        // 3. Definición de Variables Visuales
        
        // AXIOMA: No cambiar el color de la letra. Si es negra, se queda negra.
        const textColor = rawColor; 

        // EL HALO (GLOW):
        // Si es negra -> El halo debe ser BLANCO para contrastar (Luz rodeando al vacío).
        // Si es color -> El halo es del mismo color de la letra.
        const glowColor = isBlack ? 'rgba(255, 255, 255, 0.9)' : rawColor;
        
        // TEXT SHADOW (La clave de la visibilidad):
        // Si es negra: Sombra blanca dura para siluetear la letra oscura.
        // Si es color: Glow normal difuso.
        const textShadow = isBlack 
            ? `0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4)` // Halo Blanco Sutil
            : `0 0 10px ${glowColor}`;

        const borderColor = isBlack ? 'rgba(255, 255, 255, 0.4)' : rawColor;

        return (
          <button
            key={`key-${char}`}
            className="key-bubble"
            onClick={() => onCharClick(char)}
            style={{ 
                color: textColor,
                borderColor: borderColor,
                
                // INYECCIÓN DE LUZ (Box Shadow - El contenedor):
                boxShadow: `
                    inset 3px 3px 6px rgba(255, 255, 255, 0.1),
                    inset -5px -5px 15px rgba(0, 0, 0, 0.8),
                    0 0 10px ${isBlack ? 'rgba(255,255,255,0.3)' : glowColor}, 
                    0 0 4px ${isBlack ? 'rgba(255,255,255,0.2)' : glowColor}
                `,
                
                // APLICACIÓN DEL HALO AL TEXTO
                textShadow: textShadow
            }}
          >
            {char}
          </button>
        );
      })}
    </div>
  );
};