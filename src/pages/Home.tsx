'use client';

import { useState } from 'react';
import { type KabbalahSchool, KABBALAH_SCHOOLS } from '../data/kabbalah';
import { SchoolSelector } from '../components/SchoolSelector';
import { HebrewInput, type ManifestationBg } from '../components/HebrewInput';
import { HebrewKeyboard } from '../components/HebrewKeyboard';
import { LetterGlitch } from '../components/LetterGlitch';
import { HebrewGalaxy } from '../components/HebrewGalaxy';
import { MysticParticles } from '../components/MysticParticles';
import { CursorTrail } from '../components/CursorTrail';
import { GematriaView } from '../components/GematriaView';

// --- IMPORTACIÓN DE MOTORES VISUALES ---
// WebGL (3D Real)
import { BlackHole3D } from '../components/BlackHole3D';
import { Cosmos3D } from '../components/Cosmos3D';
// CSS (2D Avanzado)
import { Nebula } from '../components/Nebula';
import { Void } from '../components/Void';

import '../styles/Home.css';

// TIPOS DE ESTADO
type OriginVisual = 'GALAXY' | 'PARTICLES' | 'GLITCH';
type ManifestEnv = 'SACRED_LIGHT' | 'BLACK_HOLE' | 'COSMOS' | 'VOID';

type ManifestState = 'ORIGIN' | 'MANIFESTATION' | 'GEMATRIA';
export type GematriaMode = 'CORE' | 'DOSSIER' | 'VECTOR' | 'PATHS';

// ICONOS
const IconArrowLeft = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>;
const IconArrowRight = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;

export function Home() {
  // ESTADOS
  const [visualMode, setVisualMode] = useState<OriginVisual>('GALAXY');
  const [manifestEnv, setManifestEnv] = useState<ManifestEnv>('SACRED_LIGHT');
  
  const [manifestMode, setManifestMode] = useState<ManifestState>('ORIGIN');
  const [gematriaSubMode, setGematriaSubMode] = useState<GematriaMode>('CORE');
  const [currentSchool, setCurrentSchool] = useState<KabbalahSchool>(KABBALAH_SCHOOLS[0].id);
  const [inputText, setInputText] = useState<string>('');
  
  // HANDLERS
  const handleDelete = () => setInputText((prev) => prev.slice(0, -1));
  const handleSchoolChange = (school: KabbalahSchool) => setCurrentSchool(school);
  const handleKeyPress = (char: string) => setInputText((prev) => prev + char);
  
  const goManifest = () => setManifestMode('MANIFESTATION');
  const goOrigin = () => setManifestMode('ORIGIN');
  const goGematria = () => setManifestMode('GEMATRIA');

  // MAPEO DE ENTORNO A ESTILO DE TEXTO
  // Esto le dice al Input qué efectos de luz usar en las letras
  const getManifestBg = (): ManifestationBg | undefined => {
    if (manifestEnv === 'SACRED_LIGHT') return 'COSMOS'; // Luz Sagrada usa el preset de brillo Cosmos
    if (manifestEnv === 'BLACK_HOLE') return 'BLACK_HOLE';
    if (manifestEnv === 'VOID') return 'VOID';
    return 'NEBULA'; // Cosmos genérico usa Nebula
  };

  return (
    <main className="main-container">
      
      {/* --- CAPA 0: VISUALES DE FONDO --- */}
      <div className="visual-layer">
        
        {/* A. MODO ORIGEN (Escribiendo) */}
        {manifestMode !== 'MANIFESTATION' && (
            <>
                {visualMode === 'GALAXY' && <HebrewGalaxy text={inputText} school={currentSchool} />}
                {visualMode === 'PARTICLES' && <MysticParticles text={inputText} school={currentSchool} />}
                {visualMode === 'GLITCH' && <LetterGlitch glitchSpeed={50} characters="אבגדהוזחטיכלמנסעפצקרשת" />}
            </>
        )}

        {/* B. MODO MANIFESTACIÓN (Pantalla Completa) */}
        {manifestMode === 'MANIFESTATION' && (
            <>
                {/* Motores 3D (WebGL) */}
                {manifestEnv === 'BLACK_HOLE' && <BlackHole3D />}
                {manifestEnv === 'SACRED_LIGHT' && <Cosmos3D />} 
                
                {/* Motores 2D (CSS) */}
                {manifestEnv === 'COSMOS' && <Nebula />} 
                {manifestEnv === 'VOID' && <Void />}     
            </>
        )}
      </div>
      
      {/* CAPA 1: VIGNETTE (Profundidad) */}
      <div className="vignette-layer" />

      {/* --- UI PRINCIPAL --- */}
      <div className="content-wrapper">

        {/* HEADER */}
        <div className={`header-section ${manifestMode === 'GEMATRIA' ? 'collapsed' : ''}`}>
          <h1 className="axis-title">A X I S <span className="axis-number">13</span></h1>
          <div className="quantum-divider" />
          <SchoolSelector current={currentSchool} onChange={handleSchoolChange} />
          <div className="quantum-divider" />
        </div>

        {/* AREA CENTRAL (Input o Gematria) */}
        <div className="center-stage">
          {manifestMode !== 'GEMATRIA' ? (
            <HebrewInput 
                value={inputText} 
                school={currentSchool} 
                onDelete={handleDelete} 
                mode={manifestMode === 'MANIFESTATION' ? 'MANIFESTATION' : 'ORIGIN'} 
                manifestBg={getManifestBg()}
            />
          ) : (
            <GematriaView text={inputText} school={currentSchool} viewMode={gematriaSubMode} />
          )}
        </div>

        {/* FOOTER & CONTROLES */}
        <div className="footer-section">
          
          {/* Teclado (Solo en Origen) */}
          {manifestMode === 'ORIGIN' && (
             <HebrewKeyboard currentSchool={currentSchool} onCharClick={handleKeyPress} />
          )}

          {/* Botón Manifestar */}
          {manifestMode === 'ORIGIN' && inputText.length > 0 && (
             <button onClick={goManifest} className="manifest-trigger-text">
                MANIFESTAR
             </button>
          )}

          {/* Selector Visual (Modo Origen) */}
          {manifestMode === 'ORIGIN' && (
            <div className="visual-toggles-row">
                {(['GALAXY', 'PARTICLES', 'GLITCH'] as OriginVisual[]).map((mode) => (
                <button 
                    key={mode} 
                    onClick={() => setVisualMode(mode)} 
                    className={`visual-toggle-btn ${visualMode === mode ? 'active' : ''}`}
                >
                    {mode}
                </button>
                ))}
            </div>
          )}

          {/* Selector de Entorno (Modo Manifestación) */}
          {manifestMode === 'MANIFESTATION' && (
             <div className="mode-selector-row fade-in">
                {(['SACRED_LIGHT', 'BLACK_HOLE', 'COSMOS', 'VOID'] as ManifestEnv[]).map((env) => (
                  <button 
                    key={env} 
                    onClick={() => setManifestEnv(env)} 
                    className={`glass-text-btn ${manifestEnv === env ? 'active' : ''}`}
                  >
                    {env.replace('_', ' ')}
                  </button>
                ))}
             </div>
          )}

          {/* Selector Gematria */}
          {manifestMode === 'GEMATRIA' && (
             <div className="mode-selector-row">
                {(['CORE', 'DOSSIER', 'VECTOR', 'PATHS'] as GematriaMode[]).map((mode) => (
                  <button key={mode} onClick={() => setGematriaSubMode(mode)} className={`glass-text-btn ${gematriaSubMode === mode ? 'active' : ''}`}>
                    {mode === 'CORE' ? 'NÚCLEO' : mode === 'DOSSIER' ? 'EXPEDIENTE' : mode === 'VECTOR' ? 'VECTOR' : 'SENDEROS'}
                  </button>
                ))}
             </div>
          )}

        </div>
      </div>

      {/* NAV FLOTANTE (FLECHAS) */}
      {(manifestMode === 'MANIFESTATION' || manifestMode === 'GEMATRIA') && (
        <div className="nav-arrow left">
          <button onClick={manifestMode === 'GEMATRIA' ? goManifest : goOrigin} className="nav-icon-btn">
            <IconArrowLeft />
          </button>
        </div>
      )}

      {manifestMode === 'MANIFESTATION' && (
        <div className="nav-arrow right">
          <button onClick={goGematria} className="nav-icon-btn gold">
            <IconArrowRight />
          </button>
        </div>
      )}

      {/* Rastro del Cursor (Adaptado a visualMode de origen para estabilidad) */}
      <CursorTrail 
        currentSchool={currentSchool} 
        text={inputText} 
        visualMode={visualMode} 
      />
    </main>
  );
}