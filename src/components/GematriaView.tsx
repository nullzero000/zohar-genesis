'use client';

import { useMemo } from 'react';
import { calculateMiluyLevels } from '../utils/gematriaEngine';
import { analyzeFrequencyAndColor } from '../utils/spectralEngine';
import { type KabbalahSchool } from '../data/kabbalah';
import { type GematriaMode } from '../pages/Home';

// COMPONENTES HIJOS
import { GematriaTotal } from './gematria/GematriaTotal';
import { AnalysisTable } from './gematria/AnalysisTable'; 
import { TreeOfLife } from './gematria/TreeOfLife';

import '../styles/GematriaTotal.css'; 

interface GematriaViewProps {
  text: string;
  school: KabbalahSchool;
  viewMode: GematriaMode;
}

export const GematriaView = ({ text, school, viewMode }: GematriaViewProps) => {
  
  // CÁLCULOS CENTRALIZADOS
  const gematriaData = useMemo(() => {
    if (!text) return null;

    // 1. Expansión Fractal (Miluy)
    const levels = calculateMiluyLevels(text, 5); 
    
    // 2. Totales
    const rootLevel = levels[0];
    const total = rootLevel ? rootLevel.totalValue : 0;
    
    // Función reductora local
    const reduce = (n: number): number => {
        if (n === 0) return 0;
        if (n < 10) return n;
        const sum = n.toString().split('').reduce((a, b) => a + parseInt(b), 0);
        return reduce(sum);
    };
    
    const reduced = reduce(total);
    
    // 3. Análisis Espectral
    const chars = text.replace(/\s/g, '').split('');
    const analysis = analyzeFrequencyAndColor(chars, 'ari');

    return { 
        total,
        reduced,
        levels,
        analysis
    };
  }, [text, school]);

  if (!text || !gematriaData) return null;

  const { total, reduced, levels, analysis } = gematriaData;
  const auraColor = analysis ? analysis.mixedColor : 'rgb(212, 175, 55)';

  return (
    <div className="gematria-dashboard">
      
      {/* --- VISTA: NÚCLEO (Resumen) --- */}
      {viewMode === 'CORE' && (
         <div className="view-content fade-in">
             <GematriaTotal 
                total={total} 
                reduction={reduced}
                mixedColor={auraColor} 
            />
            {/* Pie de página sutil con el nombre del color */}
            {analysis && (
                <div className="color-identity">
                    RESONANCIA: <span style={{ color: auraColor }}>{analysis.mixedColorName.toUpperCase()}</span>
                </div>
            )}
         </div>
      )}
      
      {/* --- VISTA: DOSSIER (Tabla Fractal) --- */}
      {viewMode === 'DOSSIER' && (
         <div className="view-content slide-up">
             <AnalysisTable levels={levels} />
         </div>
      )}

      {/* --- VISTA: SENDEROS (Árbol de la Vida Espectral) --- */}
      {viewMode === 'PATHS' && (
         <div className="view-content fade-in full-width">
             <TreeOfLife 
                inputText={text} 
                school={school} 
             />
         </div>
      )}

      {/* --- VISTA: VECTOR (Análisis Puro) --- */}
      {viewMode === 'VECTOR' && analysis && (
         <div className="view-content slide-up">
             <div className="vector-card">
                 <h3 style={{ color: auraColor }}>VECTOR ESPECTRAL</h3>
                 <p className="diagnosis-text">{analysis.diagnosis}</p>
                 <div className="stats-row">
                    <div>DOMINANTE: {analysis.dominant}</div>
                    <div>MASA: {analysis.total}</div>
                 </div>
             </div>
         </div>
      )}

      {/* ESTILOS LOCALES PARA LAYOUT */}
      <style>{`
        .gematria-dashboard {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            padding-top: 20px;
            padding-bottom: 100px;
            scrollbar-width: thin;
            scrollbar-color: #444 #000;
        }

        .view-content {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .view-content.full-width {
            max-width: 100%; /* Para el árbol */
        }

        .color-identity {
            margin-top: 30px;
            font-size: 10px;
            font-family: monospace;
            color: #666;
            letter-spacing: 1px;
        }

        .vector-card {
            background: rgba(20, 20, 20, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 12px;
            width: 90%;
            font-family: monospace;
        }
        
        .diagnosis-text {
            color: #ccc;
            line-height: 1.6;
            margin: 20px 0;
            white-space: pre-line;
        }

        .stats-row {
            display: flex;
            justify-content: space-between;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 15px;
            color: #888;
            font-size: 11px;
        }

        .fade-in { animation: fadeIn 0.8s ease forwards; }
        .slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};