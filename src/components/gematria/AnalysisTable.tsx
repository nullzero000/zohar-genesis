'use client';

import { useState } from 'react';
import { analyzeFrequencyAndColor } from '../../utils/spectralEngine';

// CORRECCIÓN CRÍTICA: Importamos desde la misma carpeta
import './AnalysisTable.css'; 

interface AnalysisTableProps {
  levels: any[];
}

const LEVEL_LABELS: Record<number, string> = {
    0: 'RAÍZ (NV0)', 
    1: 'YETZIRÁ (NV1)', 
    2: 'BERIÁ (NV2)',
    3: 'ATZILUT (NV3)', 
    4: 'A. KADMON (NV4)', 
    5: 'EIN SOF (NV5)'
};

export const AnalysisTable = ({ levels }: AnalysisTableProps) => {
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);

  const toggleRow = (lvl: number) => {
    setExpandedLevel(expandedLevel === lvl ? null : lvl);
  };

  if (!levels || levels.length === 0) return null;

  return (
    <div className="analysis-container">
      <h3 className="analysis-title">DIAGNÓSTICO FRACTAL (EXPANSIÓN)</h3>
      
      <div className="table-wrapper">
        <table className="miluy-table">
          <thead>
            <tr>
              <th style={{ width: '30%' }}>NIVEL</th>
              <th>MASA</th>
              <th>GEMATRÍA</th>
              <th>REDUCCIÓN</th>
            </tr>
          </thead>
          
          {/* Mapeamos cada nivel dentro de su propio tbody para agrupar filas legalmente */}
          {levels.map((lvl) => {
              const isExpanded = expandedLevel === lvl.level;
              // Cálculo seguro: solo si está expandido
              const analysis = isExpanded ? analyzeFrequencyAndColor(lvl.chars, 'ari') : null;

              return (
                <tbody key={lvl.level} className="level-group">
                    {/* FILA PRINCIPAL */}
                    <tr 
                        className={`clickable-row ${isExpanded ? 'expanded-row' : ''}`}
                        onClick={() => toggleRow(lvl.level)}
                    >
                        <td className="level-cell">
                            <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
                            {LEVEL_LABELS[lvl.level] || `NIVEL ${lvl.level}`}
                        </td>
                        <td>{lvl.chars.length}</td>
                        <td className="value-cell">{lvl.totalValue}</td>
                        <td className="reduced-cell">{lvl.reducedValue}</td>
                    </tr>

                    {/* FILA DE DETALLE (Renderizado Condicional Seguro) */}
                    {isExpanded && analysis && (
                        <tr className="detail-row">
                            <td colSpan={4}>
                                <div className="frequency-panel">
                                    <div className="freq-header">DISTRIBUCIÓN DE FRECUENCIA</div>
                                    <div className="freq-grid">
                                        {analysis.topList.slice(0, 10).map((char: string) => (
                                            <div key={char} className="freq-chip">
                                                <span className="freq-char">{char}</span>
                                                <span className="freq-count">x{analysis.frequencyMap[char]}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="vibration-footer">
                                        VIBRACIÓN: <span style={{ color: analysis.mixedColor }}>{analysis.mixedColorName}</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
              );
          })}
        </table>
      </div>
    </div>
  );
};