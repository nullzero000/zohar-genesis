'use client';

import { useState, useMemo } from 'react';
import { 
  HEBREW_DATA, NORMALIZE_MAP, PATHS_OF_WISDOM, 
  type WisdomEdge, type WisdomNode 
} from '../../data/constants';
import { analyzeFrequencyAndColor } from '../../utils/spectralEngine';
import { AnalysisTable } from './AnalysisTable';
import { getHebrewColor, type KabbalahSchool } from '../../data/kabbalah';
import '../../styles/TechnicalDossier.css';

interface DossierProps {
  levels: any[];
  school: KabbalahSchool;
}

const LEVEL_META: Record<number, { label: string; world: string; focus: string; desc: string }> = {
    0: { label: 'RAÍZ (NV0)', world: "OLAM HA'ZEH", focus: 'Malchut / Tierra', desc: 'Realidad Física.' },
    1: { label: 'ALMA (NV1)', world: 'YETZIRÁ', focus: 'Ruach / Formación', desc: 'Emoción y Forma.' },
    2: { label: 'MENTE (NV2)', world: 'BERIÁ', focus: 'Neshamá / Creación', desc: 'Intelecto Puro.' },
    3: { label: 'LUZ (NV3)', world: 'ATZILUT', focus: 'Chayá / Emanación', desc: 'Unidad Divina.' },
    4: { label: 'VOLUNTAD (NV4)', world: 'ADAM KADMON', focus: 'Yechidá / Keter', desc: 'Voluntad Primordial.' },
    5: { label: 'NADA (NV5)', world: 'EIN SOF', focus: 'Atzmut / Esencia', desc: 'Silencio Absoluto.' }
};

export const TechnicalDossier = ({ levels, school }: DossierProps) => {
  const [selectedLevel, setSelectedLevel] = useState(0);

  // 1. Análisis en Tiempo Real
  const analysis = useMemo(() => {
    if (!levels || !levels[selectedLevel]) return null;
    return analyzeFrequencyAndColor(levels[selectedLevel].chars);
  }, [levels, selectedLevel]);

  if (!levels || !analysis) return null;

  // Extracción de Datos
  const meta = LEVEL_META[selectedLevel];
  const domChar = analysis.dominant;
  const normDom = NORMALIZE_MAP[domChar] || domChar;
  const domData = HEBREW_DATA[normDom];

  // Cálculo de Cartografía
  const pathInfo = PATHS_OF_WISDOM.paths_of_wisdom.find(
    (p): p is WisdomEdge => p.type === 'edge' && p.hebrew_char === normDom
  );
  
  let sourceNode: WisdomNode | undefined;
  let targetNode: WisdomNode | undefined;
  
  if (pathInfo) {
    sourceNode = PATHS_OF_WISDOM.paths_of_wisdom.find(
        (n): n is WisdomNode => n.type === 'node' && n.id === pathInfo.source_node_id
    );
    targetNode = PATHS_OF_WISDOM.paths_of_wisdom.find(
        (n): n is WisdomNode => n.type === 'node' && n.id === pathInfo.target_node_id
    );
  }

  return (
    <div className="tactical-container" style={{ '--base-color': analysis.mixedColor } as React.CSSProperties}>
      
      {/* 1. NAVEGACIÓN */}
      <div className="tactical-nav">
        {levels.map((_, idx) => (
            <button key={idx} className={`tactical-tab ${selectedLevel === idx ? 'active' : ''}`} onClick={() => setSelectedLevel(idx)}>
                {LEVEL_META[idx]?.label || `NV ${idx}`}
            </button>
        ))}
      </div>
      
      {/* 2. CONTEXTO */}
      <div className="level-context-box">
          <div className="context-world">{meta?.world || "DESCONOCIDO"}</div>
          <div className="context-focus">// {meta?.focus}</div>
      </div>

      {/* 3. DATOS TORÁICOS */}
      {domData && (
          <div className="torah-block">
              <div className="torah-header">ORIGEN Y ARQUETIPO</div>
              <div className="torah-grid">
                  <div className="torah-word-box">
                      <div className="hebrew-origin">
                          {(domData.torah?.word || domChar).split('').map((char, i) => (
                              <span key={i} style={{ color: getHebrewColor(char, school), transition: 'color 0.3s' }}>
                                {char}
                              </span>
                          ))}
                      </div>
                      <span className="phonetic-origin">{domData.torah?.phonetic}</span>
                  </div>
                  <div className="torah-meta-box">
                      <div className="meta-row"><span className="meta-label">CITA</span><span className="meta-val">{domData.torah?.cite || '-'}</span></div>
                      <div className="meta-row"><span className="meta-label">BIO</span><span className="meta-val highlight">{domData.torah?.bio || '-'}</span></div>
                      <div className="meta-row"><span className="meta-label">SENDERO</span><span className="meta-val">{pathInfo ? `#${pathInfo.id}` : '-'}</span></div>
                      
                      {sourceNode && targetNode && (
                          <div className="meta-row">
                             <span className="meta-label">CONEXIÓN</span>
                             <span className="meta-val" style={{ fontSize: '0.65rem' }}>
                                {sourceNode.name_he} ↔ {targetNode.name_he}
                             </span>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* 4. MATRIZ CLÍNICA (iOS Style) */}
      {domData && domData.sy_data && (
        <>
            <div className="section-title">MATRIZ CLÍNICA</div>
            <div className="clinical-panel">
                <div className="clinical-header">
                    <span>DIAGNÓSTICO YETZIRAH</span>
                    <span style={{ fontSize: '9px', opacity: 0.5 }}>● ACTIVE</span>
                </div>
                <div className="clinical-body">
                    <div className="clinical-row">
                        <span className="clinical-label">Lógica Estructural</span>
                        <span className="clinical-value val-logic">{domData.sy_data.logic}</span>
                    </div>
                    <div className="clinical-row">
                        <span className="clinical-label">Diagnóstico (Bloqueo)</span>
                        <span className="clinical-value val-diag">{domData.sy_data.diag}</span>
                    </div>
                    <div className="clinical-row">
                        <span className="clinical-label">Protocolo de Corrección</span>
                        <span className="clinical-value val-fix">{domData.sy_data.fix}</span>
                    </div>
                </div>
            </div>
        </>
      )}

      {/* 5. TABLA FRACTAL */}
      <div style={{ marginTop: '40px' }}>
         <AnalysisTable levels={levels} />
      </div>

    </div>
  );
};