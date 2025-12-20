'use client';

import { useEffect, useState } from 'react';
import { getSemanticsFromRGB } from '../../utils/spectralEngine';
import './GematriaTotal.css';

interface TotalProps {
  total: number;
  reduction: number;
  mixedColor: string;
}

export const GematriaTotal = ({ total, reduction, mixedColor }: TotalProps) => {
  const [semanticColor, setSemanticColor] = useState('Desconocido');

  useEffect(() => {
    const rgb = mixedColor.match(/\d+/g);
    if (rgb && rgb.length === 3) {
        const name = getSemanticsFromRGB(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
        setSemanticColor(name);
    }
  }, [mixedColor]);

  return (
    <div className="core-wrapper">
      
      {/* AXIOMA: AURA SATURADA Y PULSANTE */}
      <style>{`
        @keyframes breathe {
            0% { 
                box-shadow: 
                    0 0 30px ${mixedColor}30, /* Brillo interno suave */
                    0 0 60px ${mixedColor}20,  /* Halo medio */
                    0 0 100px ${mixedColor}10; /* Halo externo */
                transform: scale(1);
                border-color: rgba(255,255,255,0.1);
            }
            50% { 
                box-shadow: 
                    0 0 50px ${mixedColor}60,  /* Intensidad ALTA en el centro */
                    0 0 100px ${mixedColor}40, /* Expansión media */
                    0 0 180px ${mixedColor}20; /* Expansión lejana */
                transform: scale(1.02);
                border-color: ${mixedColor}60;
            }
            100% { 
                box-shadow: 
                    0 0 30px ${mixedColor}30,
                    0 0 60px ${mixedColor}20,
                    0 0 100px ${mixedColor}10;
                transform: scale(1);
                border-color: rgba(255,255,255,0.1);
            }
        }
        
        .living-orb {
            animation: breathe 5s infinite ease-in-out;
        }

        /* El número también respira sutilmente el color */
        .orb-value {
            text-shadow: 0 0 30px ${mixedColor}80;
        }
      `}</style>

      {/* 1. TOTAL (KETER) */}
      <div className="living-orb">
          <span className="orb-value">{total}</span>
          <span className="orb-label">GEMATRÍA</span>
      </div>

      {/* 2. CONEXIÓN (HILO) */}
      <div className="energy-thread" style={{ color: mixedColor }} />

      {/* 3. REDUCCIÓN (MALCHUT/ESENCIA) */}
      <div className="essence-value" style={{ color: mixedColor }}>
          {reduction}
      </div>

      {/* 4. IDENTIDAD CROMÁTICA */}
      <div className="semantic-block">
          <span className="semantic-label">VIBRACIÓN CROMÁTICA</span>
          <span className="semantic-value" style={{ color: mixedColor }}>
            {semanticColor}
          </span>
      </div>

    </div>
  );
};