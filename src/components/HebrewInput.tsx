'use client';

import { getHebrewColor, type KabbalahSchool } from '../data/kabbalah';

interface HebrewInputProps {
  value: string;
  school: KabbalahSchool;
  onDelete: () => void;
  mode: 'ORIGIN' | 'MANIFESTATION';
}

export const HebrewInput = ({ value, school, onDelete, mode }: HebrewInputProps) => {
  const isManifesting = mode === 'MANIFESTATION';

  return (
    <>
      <style>
        {`
          @keyframes ein-soph-pulse {
            0% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          }
          @keyframes letter-levitate {
            0%, 100% { transform: translateY(0) scale(1); filter: brightness(1); }
            50% { transform: translateY(-15px) scale(1.05); filter: brightness(1.1); }
          }
          @keyframes rays-rotate {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}
      </style>

      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: isManifesting ? '100%' : 'auto', 
        transition: 'all 1.5s cubic-bezier(0.25, 1, 0.5, 1)', 
        zIndex: 50 
      }}>
        
        {/* --- CAPA 1: EIN SOF OR (LUZ INFINITA) --- */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '250vmax', 
          height: '250vmax',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: isManifesting ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
          zIndex: -2, 
          background: isManifesting 
            ? `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,245,220,0.9) 10%, rgba(255,215,0,0.5) 25%, rgba(0,0,0,0) 50%)`
            : 'none',
          mixBlendMode: 'screen',
          animation: isManifesting ? 'ein-soph-pulse 5s infinite ease-in-out' : 'none',
        }} />

        {/* --- CAPA 2: RAYOS DE LUZ --- */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '200vmax',
          height: '200vmax',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: isManifesting ? 0.4 : 0,
          zIndex: -1,
          background: isManifesting 
            ? 'conic-gradient(from 0deg, transparent 0deg, rgba(255,220,150,0.3) 15deg, transparent 30deg, rgba(255,255,255,0.3) 45deg, transparent 60deg, rgba(255,215,0,0.2) 75deg, transparent 90deg)' 
            : 'none',
          mixBlendMode: 'overlay',
          animation: isManifesting ? 'rays-rotate 80s linear infinite' : 'none',
        }} />

        {/* --- CAPA 3: CONTENEDOR VISUAL --- */}
        <div style={{
          position: 'relative',
          padding: isManifesting ? '0' : '15px 30px',
          borderRadius: '30px',
          
          // MODO ORIGEN: Placa de Obsidiana
          // MODO MANIFESTACIÓN: Totalmente transparente
          background: isManifesting ? 'transparent' : 'rgba(8, 8, 10, 0.85)',
          backdropFilter: isManifesting ? 'none' : 'blur(40px)',
          WebkitBackdropFilter: isManifesting ? 'none' : 'blur(40px)',
          border: isManifesting ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: isManifesting 
            ? 'none' 
            : '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(0,0,0,0.5)',
            
          transition: 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '95vw',
          minWidth: '120px',
          minHeight: '70px'
        }}>

          {/* BOTÓN BORRAR (X) */}
          <button 
            onClick={onDelete} 
            style={{
              position: 'absolute', 
              top: '-12px', right: '-12px',
              opacity: !isManifesting && value.length > 0 ? 1 : 0,
              transform: !isManifesting && value.length > 0 ? 'scale(1)' : 'scale(0)',
              pointerEvents: !isManifesting ? 'auto' : 'none',
              background: '#000', 
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff', 
              borderRadius: '50%',
              width: '26px', height: '26px', 
              cursor: 'pointer',
              fontSize: '10px',
              zIndex: 60,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
            }}
          >✕</button>

          {/* --- CAPA 4: LETRAS HEBREAS --- */}
          <div dir="rtl" style={{
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: isManifesting ? '4vmin' : '0.6rem', 
            width: '100%'
          }}>
            {value.length === 0 && !isManifesting ? (
              <span style={{ 
                color: 'rgba(255,255,255,0.3)', 
                fontSize: '0.85rem', 
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontWeight: '300'
              }}>
                Vacío
              </span>
            ) : (
              value.split('').map((char, index) => {
                const baseColor = getHebrewColor(char, school);
                return (
                  <span key={index} style={{
                    fontSize: isManifesting ? 'clamp(5rem, 22vmin, 16rem)' : 'clamp(2.2rem, 7vw, 3.2rem)',
                    fontFamily: '"Times New Roman", serif', 
                    // En manifestación usamos un peso más fino para elegancia, no bold tosco
                    fontWeight: isManifesting ? '400' : 'normal',
                    color: baseColor, 
                    
                    // --- AXIOMA DE ELEGANCIA (iOS STYLE) ---
                    // En lugar de borde negro, usamos sombras difusas de profundidad y color.
                    textShadow: isManifesting 
                      ? `
                          0 2px 4px rgba(0,0,0,0.4),   /* 1. Definición sutil del borde (sin linea negra) */
                          0 15px 30px rgba(0,0,0,0.25), /* 2. Sombra de levitación (profundidad) */
                          0 0 40px ${baseColor},        /* 3. Aura de color suave */
                          0 0 80px ${baseColor}         /* 4. Resplandor atmosférico lejano */
                        ` 
                      : `0 0 3px rgba(255,255,255,0.6), 0 0 15px ${baseColor}`, 
                    
                    transition: `all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`,
                    animation: isManifesting ? `letter-levitate 5s ease-in-out infinite` : 'none',
                    animationDelay: `${index * 0.2}s`,
                    transform: isManifesting ? 'scale(1)' : 'scale(1)',
                    position: 'relative',
                    zIndex: 10,
                    // Mezcla para que el color interactúe mejor con la luz (opcional, da un look más "tinta")
                    mixBlendMode: isManifesting ? 'normal' : 'normal'
                  }}>
                    {char}
                  </span>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};