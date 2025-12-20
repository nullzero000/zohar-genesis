'use client';

import { analyzeFrequencyAndColor } from '../../utils/spectralEngine';
import '../../styles/VectorialData.css';

interface VectorialProps {
  levels: any[];
}

export const VectorialData = ({ levels }: VectorialProps) => {
  
  if (!levels || levels.length === 0) return null;

  return (
    <div className="vectorial-container">
      
      {/* Header Tipo Terminal */}
      <div className="vectorial-header">
        <span style={{ color: '#d4af37' }}>◈</span>
        <span className="vectorial-title">EXPEDIENTE TÉCNICO & DATA VECTORIAL (FULL STACK)</span>
      </div>

      <table className="terminal-table">
        <thead>
          <tr>
            <th>LVL</th>
            <th style={{ textAlign: 'right', paddingRight: '20px' }}>SECUENCIA DE EXPANSIÓN</th>
            <th>VECTOR RGB</th>
            <th style={{ textAlign: 'right' }}>GEM</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((lvl) => {
            // Analizamos cada nivel
            const analysis = analyzeFrequencyAndColor(lvl.chars);
            if (!analysis) return null;

            return (
              <tr key={lvl.level} className="terminal-row">
                
                {/* 1. NIVEL */}
                <td className="cell-lvl">{lvl.level}</td>
                
                {/* 2. SECUENCIA HEBREA */}
                <td className="cell-seq">
                  {lvl.chars.join(' ')}
                </td>
                
                {/* 3. VECTOR RGB (Color + Nombre) */}
                <td className="cell-vector">
                  <div className="vector-info">
                    <div 
                        className="color-swatch" 
                        style={{ background: analysis.mixedColor, boxShadow: `0 0 10px ${analysis.mixedColor}40` }} 
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ color: '#eee', fontWeight: 'bold' }}>{analysis.mixedColorName}</span>
                        <span style={{ color: '#555', fontSize: '9px', fontFamily: 'monospace' }}>
                            {analysis.mixedColor}
                        </span>
                    </div>
                  </div>
                </td>

                {/* 4. GEMATRÍA (Reducida y Total) */}
                <td className="cell-gem">
                  <span className="gem-primary">{lvl.reducedValue}</span>
                  <span className="gem-total">({lvl.totalValue})</span>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};