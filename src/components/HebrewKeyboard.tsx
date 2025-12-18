'use client';

import { HEBREW_ALPHABET, getHebrewColor, type KabbalahSchool } from '../data/kabbalah';

interface HebrewKeyboardProps {
  currentSchool: KabbalahSchool;
  onCharClick?: (char: string) => void; 
}

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const HebrewKeyboard = ({ currentSchool, onCharClick }: HebrewKeyboardProps) => {

  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(5);
    }
  };

  const handleInteraction = (char: string) => {
    triggerHaptic();
    if (onCharClick) onCharClick(char);
  };

  return (
    <>
      <style>
        {`
          @keyframes bubble-breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes bubble-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-2px) rotate(1deg); }
            66% { transform: translateY(2px) rotate(-1deg); }
          }
        `}
      </style>

      <div 
        dir="rtl"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 'clamp(8px, 2vw, 24px)',
          padding: '10px',
          width: '100%',
          maxWidth: '850px',
          margin: '0 auto',
          perspective: '1000px',
          background: 'transparent' 
        }}
      >
        {HEBREW_ALPHABET.map((item, index) => {
          const baseColor = getHebrewColor(item.char, currentSchool);
          const delay = index * 0.12; 
          const duration = 4 + (index % 3);

          return (
            <button
              key={item.char}
              onClick={() => handleInteraction(item.char)}
              style={{
                position: 'relative',
                width: 'clamp(55px, 14vw, 75px)',
                height: 'clamp(55px, 14vw, 75px)',
                borderRadius: '50%',
                
                // --- TRANSPARENCIA Y REFLEJOS ---
                backgroundColor: 'transparent', // Fondo base transparente
                background: `
                  /* 1. Reflejo de luz (Gloss) - Blanco puro pero concentrado arriba a la izquierda */
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 25%),
                  /* 2. Cuerpo sutil - Tinte muy suave del color de la letra */
                  radial-gradient(circle at 50% 50%, ${hexToRgba(baseColor, 0.05)} 40%, ${hexToRgba(baseColor, 0.2)} 100%)
                `,
                
                // --- AXIOMA DE COLOR ---
                // Borde sólido (hex directo) para eliminar el efecto blanco
                border: `1.5px solid ${baseColor}`,
                
                // Sombras para volumen y refuerzo de color en el perímetro
                boxShadow: `
                  inset 0 0 15px ${hexToRgba(baseColor, 0.4)}, /* Glow interno que colorea el vidrio */
                  0 0 10px ${hexToRgba(baseColor, 0.4)} /* Glow externo para que el borde brille */
                `,

                backdropFilter: 'blur(2px)', 
                WebkitBackdropFilter: 'blur(2px)',

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                
                animation: `bubble-breathe ${duration}s ease-in-out infinite alternate, bubble-float ${duration * 1.4}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                
                outline: 'none',
                WebkitTapHighlightColor: 'transparent',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
              }}
              
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15)';
                // Al interactuar, saturamos más el color
                e.currentTarget.style.boxShadow = `
                  inset 0 0 25px ${hexToRgba(baseColor, 0.6)}, 
                  0 0 20px ${baseColor}
                `;
                e.currentTarget.style.background = `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 30%),
                  radial-gradient(circle at 50% 50%, ${hexToRgba(baseColor, 0.1)} 30%, ${hexToRgba(baseColor, 0.4)} 100%)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = ''; 
                e.currentTarget.style.boxShadow = `inset 0 0 15px ${hexToRgba(baseColor, 0.4)}, 0 0 10px ${hexToRgba(baseColor, 0.4)}`;
                e.currentTarget.style.background = `
                  radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 25%),
                  radial-gradient(circle at 50% 50%, ${hexToRgba(baseColor, 0.05)} 40%, ${hexToRgba(baseColor, 0.2)} 100%)
                `;
              }}
            >
              
              {/* LETRA FLOTANTE */}
              <span style={{ 
                fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', 
                fontFamily: '"Times New Roman", serif',
                fontWeight: 'bold',
                color: '#FFF', 
                textShadow: `
                  0 0 10px ${baseColor}, 
                  0 0 20px ${baseColor},
                  1px 1px 2px rgba(0,0,0,0.8)
                `,
                zIndex: 2,
                pointerEvents: 'none',
              }}>
                {item.char}
              </span>
              
              {/* VALOR GEMÁTRICO */}
              <span style={{ 
                position: 'absolute',
                bottom: '8%',
                fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)', 
                fontFamily: 'monospace',
                color: baseColor,
                fontWeight: 'bold',
                textShadow: '0 0 4px rgba(0,0,0,1)',
                opacity: 1,
                pointerEvents: 'none'
              }}>
                {item.val}
              </span>

            </button>
          );
        })}
      </div>
    </>
  );
};