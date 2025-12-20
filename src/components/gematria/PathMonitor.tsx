'use client';

import { useMemo, useState } from 'react';
import { PATHS_OF_WISDOM, HEBREW_DATA, type WisdomEdge } from '../../data/constants'; 
import { getHebrewColor, type KabbalahSchool } from '../../data/kabbalah';
import { analyzeFrequencyAndColor } from '../../utils/spectralEngine';
import '../../styles/TreeOfLife.css';

interface PathMonitorProps {
  inputString: string;
  school: KabbalahSchool;
}

// 1. COORDENADAS MAESTRAS (Layout Árbol de la Vida)
const SEFIROT_COORDS: Record<number | string, { x: number; y: number; name: string; label: string }> = {
    1: { x: 500, y: 100, name: 'KETER', label: 'Corona' },
    2: { x: 850, y: 250, name: 'CHOCHMAH', label: 'Sabiduría' },
    3: { x: 150, y: 250, name: 'BINAH', label: 'Entendimiento' },
    'DAAT': { x: 500, y: 350, name: 'DAAT', label: 'Conocimiento' },
    4: { x: 850, y: 500, name: 'CHESED', label: 'Misericordia' },
    5: { x: 150, y: 500, name: 'GEVURAH', label: 'Juicio' },
    6: { x: 500, y: 700, name: 'TIFERET', label: 'Belleza' },
    7: { x: 850, y: 900, name: 'NETZACH', label: 'Victoria' },
    8: { x: 150, y: 900, name: 'HOD', label: 'Esplendor' },
    9: { x: 500, y: 1050, name: 'YESOD', label: 'Fundamento' },
    10: { x: 500, y: 1250, name: 'MALCHUT', label: 'Reino' }
};

export const PathMonitor = ({ inputString, school }: PathMonitorProps) => {
  const [hoveredPath, setHoveredPath] = useState<any | null>(null);

  // 2. Análisis de Frecuencia
  const { frequencyMap, maxFreq } = useMemo(() => {
     if (!inputString) return { frequencyMap: {}, maxFreq: 1 };
     const analysis = analyzeFrequencyAndColor(inputString.replace(/\s/g, '').split(''), 'ari');
     
     if (!analysis) return { frequencyMap: {}, maxFreq: 1 };

     const max = Math.max(...Object.values(analysis.frequencyMap).map(Number));
     return { frequencyMap: analysis.frequencyMap, maxFreq: max };
  }, [inputString]);

  // 3. Construcción de Senderos
  const treePaths = useMemo(() => {
    const allEdges = PATHS_OF_WISDOM.paths_of_wisdom.filter(p => p.type === 'edge') as WisdomEdge[];
    
    return allEdges.map(edge => {
        const char = edge.hebrew_char;
        const count = (frequencyMap as Record<string, number>)[char] || 0;
        
        let opacity = 0.1; // Inactivo (Sutil estructura)
        let isActive = false;

        if (count > 0) {
            isActive = true;
            const ratio = count / maxFreq;
            if (ratio >= 1) opacity = 1;
            else if (ratio >= 0.75) opacity = 0.8;
            else if (ratio >= 0.5) opacity = 0.6;
            else if (ratio >= 0.25) opacity = 0.4;
            else opacity = 0.3;
        }

        const rawColor = getHebrewColor(char, school);
        const displayColor = rawColor.includes('0, 0, 0') ? '#666' : rawColor;

        return {
            ...edge,
            isActive,
            opacity,
            color: displayColor,
            coords: {
                start: SEFIROT_COORDS[edge.source_node_id],
                end: SEFIROT_COORDS[edge.target_node_id]
            },
            data: HEBREW_DATA[char]
        };
    });
  }, [frequencyMap, maxFreq, school]);

  return (
    <div className="tree-container">
        
      <svg className="kabbalah-svg" viewBox="0 0 1000 1350">
        
        {/* A. SENDEROS (LÍNEAS) - Se dibujan primero para quedar debajo de las esferas */}
        {treePaths.map((path) => {
            if (!path.coords.start || !path.coords.end) return null;
            
            return (
                <g key={path.id} 
                   onMouseEnter={() => path.isActive && setHoveredPath(path)}
                   onMouseLeave={() => setHoveredPath(null)}
                >
                    {/* Línea Base */}
                    <line 
                        x1={path.coords.start.x} y1={path.coords.start.y}
                        x2={path.coords.end.x} y2={path.coords.end.y}
                        stroke="#1a1a1a" strokeWidth="4"
                    />
                    
                    {/* Línea de Luz */}
                    <line 
                        x1={path.coords.start.x} y1={path.coords.start.y}
                        x2={path.coords.end.x} y2={path.coords.end.y}
                        stroke={path.color} 
                        strokeWidth={path.isActive ? 6 : 0} 
                        strokeOpacity={path.opacity}
                        className="tree-path"
                        style={{ filter: path.isActive ? `drop-shadow(0 0 10px ${path.color})` : 'none' }}
                    />

                    {/* Hit Area Expandida */}
                    {path.isActive && (
                        <line 
                            x1={path.coords.start.x} y1={path.coords.start.y}
                            x2={path.coords.end.x} y2={path.coords.end.y}
                            stroke="transparent" strokeWidth="30"
                            style={{ cursor: 'pointer' }}
                        />
                    )}
                </g>
            );
        })}

        {/* B. SEFIROT (CÍRCULOS Y TEXTO) */}
        {Object.entries(SEFIROT_COORDS).map(([key, coords]) => (
            <g key={key} className="sefirah-group">
                {/* Esfera Negra */}
                <circle 
                    cx={coords.x} cy={coords.y} r="38" 
                    className="sefirah-circle"
                />
                
                {/* Nombre Principal (KETER) */}
                <text x={coords.x} y={coords.y - 5} className="sefirah-label-name">
                    {coords.name}
                </text>
                
                {/* Subtítulo (Corona) - Opcional */}
                {/* <text x={coords.x} y={coords.y + 12} className="sefirah-label-sub" fill="#444">
                    {coords.label}
                </text> 
                */}
            </g>
        ))}

      </svg>

      {/* C. TOOLTIP FLOTANTE (iOS High-End) */}
      {hoveredPath && hoveredPath.data && (
          <div className="path-tooltip">
              
              <div className="tooltip-header">
                  <div>
                      <div className="tooltip-path-title">SENDERO DE {hoveredPath.data.name.toUpperCase()}</div>
                      <div className="tooltip-path-route">
                          {hoveredPath.coords.start.name} ➔ {hoveredPath.coords.end.name}
                      </div>
                  </div>
                  <div className="tooltip-char" style={{ color: hoveredPath.color }}>
                      {hoveredPath.hebrew_char}
                  </div>
              </div>
              
              <div className="tooltip-grid">
                  <div className="info-box">
                      <span className="info-label">TIKKUN (LUZ)</span>
                      <span className="info-val">{hoveredPath.data.tikkun?.light}</span>
                  </div>
                  <div className="info-box">
                      <span className="info-label">EGO (SOMBRA)</span>
                      <span className="info-val" style={{ color: '#FF453A' }}>{hoveredPath.data.tikkun?.shadow}</span>
                  </div>
                  
                  <div className="tool-badge">
                      <span className="info-label">HERRAMIENTA</span>
                      <span className="info-val" style={{ color: '#d4af37' }}>
                          {hoveredPath.app_function}
                      </span>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};