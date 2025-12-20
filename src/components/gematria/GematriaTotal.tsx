'use client';

import { useEffect, useState } from 'react';
import { getSemanticsFromRGB } from '../../utils/spectralEngine';
import '../../styles/GematriaTotal.css';

interface TotalProps {
  total: number;
  reduction: number;
  mixedColor: string;
}

export const GematriaTotal = ({ total, reduction, mixedColor }: TotalProps) => {
  const [semanticColor, setSemanticColor] = useState('Analizando...');
  
  // AXIOMA: Parseo de Color para crear transparencia manual
  // Esto asegura que el aura se vea "gaseosa" y no sólida
  const colorBase = mixedColor.replace('rgb(', '').replace(')', ''); // ej: "255, 0, 0"

  useEffect(() => {
    const rgb = mixedColor.match(/\d+/g);
    if (rgb && rgb.length === 3) {
        const name = getSemanticsFromRGB(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
        setSemanticColor(name);
    }
  }, [mixedColor]);

  return (
    <div className="core-wrapper">
      
      {/* AXIOMA: MOTOR DE RESPIRACIÓN (Inyección CSS Dinámica) 
          Usamos rgba manual para controlar la intensidad de luz
      */}
      <style>{`
        @keyframes deepBreathe {
            0% { 
                box-shadow: 
                    inset 0 0 20px rgba(${colorBase}, 0.2),
                    0 0 40px rgba(${colorBase}, 0.3),
                    0 0 80px rgba(${colorBase}, 0.1);
                transform: scale(1);
                border-color: rgba(255,255,255,0.1);
            }
            50% { 
                box-shadow: 
                    inset 0 0 50px rgba(${colorBase}, 0.4),
                    0 0 80px rgba(${colorBase}, 0.5),      /* Halo medio visible */
                    0 0 150px rgba(${colorBase}, 0.3),     /* Halo lejano */
                    0 0 250px rgba(${colorBase}, 0.1);     /* Atmósfera */
                transform: scale(1.03);
                border-color: rgba(${colorBase}, 0.5);
            }
            100% { 
                box-shadow: 
                    inset 0 0 20px rgba(${colorBase}, 0.2),
                    0 0 40px rgba(${colorBase}, 0.3),
                    0 0 80px rgba(${colorBase}, 0.1);
                transform: scale(1);
                border-color: rgba(255,255,255,0.1);
            }
        }
        
        .living-orb {
            animation: deepBreathe 6s infinite ease-in-out;
        }

        .orb-value, .essence-value {
            text-shadow: 0 0 30px rgba(${colorBase}, 0.8);
        }

        .connection-line {
            background: linear-gradient(to bottom, rgba(${colorBase}, 0), rgba(${colorBase}, 1), rgba(${colorBase}, 0));
        }
      `}</style>

      {/* 1. NÚCLEO (KETER) */}
      <div className="living-orb">
          <span className="orb-value">{total}</span>
          {/* Eliminada la etiqueta de texto para limpieza visual */}
      </div>

      {/* 2. CONEXIÓN (DAAT) */}
      {/* Línea recta geométrica que brilla con el color del aura */}
      <div className="connection-line" />

      {/* 3. REDUCCIÓN (MALCHUT) */}
      <div className="essence-value" style={{ color: mixedColor }}>
          {reduction}
      </div>

      {/* 4. IDENTIDAD */}
      <div className="semantic-block">
          <span className="semantic-label">FRECUENCIA DOMINANTE</span>
          <span className="semantic-value" style={{ color: mixedColor }}>
            {semanticColor}
          </span>
      </div>

    </div>
  );
};