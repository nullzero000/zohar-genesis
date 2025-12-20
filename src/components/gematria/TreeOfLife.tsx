'use client';

import { useState, useMemo } from 'react';
import { SEFIROT, PATHS, type TreePath, type Sefirah } from '../../data/treeData';
import { getHebrewColor, type KabbalahSchool } from '../../data/kabbalah'; 

// CORRECCIÓN CRÍTICA: Importamos desde la misma carpeta
import './TreeOfLife.css';

interface TreeOfLifeProps {
  inputText: string;
  school?: KabbalahSchool;
}

interface VisualTreePath extends TreePath {
  color: string;
  opacity: number;
  width: number;
  intensity: number; // 0 a 1 (Para filtros)
  count: number;
}

export const TreeOfLife = ({ inputText = '', school = 'orthodox' }: TreeOfLifeProps) => {
  const [hoveredPath, setHoveredPath] = useState<VisualTreePath | null>(null);

  const getCoords = (id: string) => SEFIROT.find((s: Sefirah) => s.id === id);

  // AXIOMA: Cálculo Espectral de Frecuencia
  const pathStats = useMemo(() => {
    const cleanText = inputText.replace(/\s/g, '');
    const counts: Record<string, number> = {};
    let maxCount = 1;

    // 1. Mapa de Frecuencia
    for (const char of cleanText) {
        counts[char] = (counts[char] || 0) + 1;
        if (counts[char] > maxCount) maxCount = counts[char];
    }

    // 2. Mapeo Visual
    return PATHS.map((path): VisualTreePath => {
        const count = counts[path.letter] || 0;
        const intensity = count / maxCount; // Normalizado 0-1
        
        // Lógica de Visualización Dinámica
        const isActive = count > 0;
        
        // Si está activo: Opacidad mínima 0.4 + intensidad. Si no: 0.1
        const opacity = isActive ? 0.4 + (intensity * 0.6) : 0.1;
        
        // Grosor: Base 3px + intensidad hasta 9px. Inactivo: 1px
        const width = isActive ? 3 + (intensity * 6) : 1; 
        
        const baseColor = getHebrewColor(path.letter, school);
        // Si inactivo: blanco espectral muy tenue
        const color = isActive ? baseColor : 'rgba(255, 255, 255, 0.1)';

        return { ...path, color, opacity, width, intensity, count };
    });
  }, [inputText, school]);

  return (
    <div className="tree-wrapper">
      
      {/* CAPA DE VIDRIO (Fondo Físico) */}
      <div className="tree-glass-panel">
        
        <div className="svg-responsive-container">
            <svg className="kabbalah-svg" viewBox="0 -50 600 1200" preserveAspectRatio="xMidYMid meet">
                
                <defs>
                    <filter id="glow-intense" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* SENDEROS */}
                {pathStats.map((path) => {
                    const start = getCoords(path.source);
                    const end = getCoords(path.target);
                    if (!start || !end) return null;

                    return (
                        <g key={path.id} 
                            onMouseEnter={() => setHoveredPath(path)}
                            onMouseLeave={() => setHoveredPath(null)}
                            style={{ cursor: 'pointer', pointerEvents: 'all' }}
                        >
                            {/* Hitbox invisible (40px) */}
                            <line
                                x1={start.x} y1={start.y}
                                x2={end.x} y2={end.y}
                                stroke="transparent"
                                strokeWidth="40"
                            />
                            
                            {/* Línea Visible */}
                            <line
                                x1={start.x} y1={start.y}
                                x2={end.x} y2={end.y}
                                stroke={path.color}
                                strokeWidth={path.width}
                                strokeOpacity={path.opacity}
                                strokeLinecap="round"
                                filter={path.intensity > 0 ? "url(#glow-intense)" : undefined}
                                className="path-line-anim"
                            />
                        </g>
                    );
                })}

                {/* SEFIROT */}
                {SEFIROT.map((sefirah: Sefirah) => (
                    <g key={sefirah.id}>
                        {/* Fondo negro para tapar líneas */}
                        <circle cx={sefirah.x} cy={sefirah.y} r={38} fill="#050505" />
                        
                        {/* Halo de color */}
                        <circle cx={sefirah.x} cy={sefirah.y} r={38} 
                                fill={sefirah.color} fillOpacity={0.05} 
                                stroke={sefirah.color} strokeWidth={1} strokeOpacity={0.4} 
                        />
                        
                        {/* Nombre Principal */}
                        <text 
                            x={sefirah.x} y={sefirah.y} 
                            className="sefirah-label-name"
                            fill="#fff"
                        >
                            {sefirah.label}
                        </text>
                        
                        {/* Subtítulo */}
                        <text 
                            x={sefirah.x} y={sefirah.y + 14} 
                            className="sefirah-label-sub"
                            fill={sefirah.color}
                        >
                            {sefirah.sub}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
      </div>

      {/* TOOLTIP SLICER */}
      <div className={`slicer-tooltip-container ${hoveredPath ? 'active' : ''}`}>
         {hoveredPath && (
             <div className="slicer-tooltip-content">
                 <div className="tooltip-section left">
                     <span className="tooltip-label">SENDERO</span>
                     <span className="tooltip-value highlight">{hoveredPath.id.replace('p', '')}</span>
                 </div>
                 
                 <div className="tooltip-section center">
                     <div className="tooltip-route">
                        {getCoords(hoveredPath.source)?.label} <span>➔</span> {getCoords(hoveredPath.target)?.label}
                     </div>
                     <div className="tooltip-meaning">{hoveredPath.meaning}</div>
                 </div>

                 <div className="tooltip-section right">
                     <span className="tooltip-char" style={{ color: hoveredPath.color }}>
                        {hoveredPath.letter}
                     </span>
                     <span className="tooltip-intensity">
                        FRECUENCIA: {hoveredPath.count}
                     </span>
                 </div>
             </div>
         )}
      </div>

    </div>
  );
};