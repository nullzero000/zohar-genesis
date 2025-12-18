'use client';

import { useState } from 'react';
import { KABBALAH_SCHOOLS, type KabbalahSchool } from '../data/kabbalah';
import { SchoolSelector } from '../components/SchoolSelector';
import { HebrewInput } from '../components/HebrewInput';
import { HebrewKeyboard } from '../components/HebrewKeyboard';
import { LetterGlitch } from '../components/LetterGlitch';
import { HebrewGalaxy } from '../components/HebrewGalaxy';
import { MysticParticles } from '../components/MysticParticles';

// AXIOMA: Expandimos el estado para incluir la dimensión de cálculo
type VisualMode = 'GALAXY' | 'PARTICLES' | 'GLITCH';
type ManifestState = 'ORIGIN' | 'MANIFESTATION' | 'GEMATRIA';

// Iconos SVG Minimalistas (Inline para evitar dependencias)
const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
);
const ArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

export function Home() {
  const [visualMode, setVisualMode] = useState<VisualMode>('PARTICLES');
  const [manifestMode, setManifestMode] = useState<ManifestState>('ORIGIN');
  const [currentSchool, setCurrentSchool] = useState<KabbalahSchool>(KABBALAH_SCHOOLS[0].id);
  const [inputText, setInputText] = useState<string>('');

  const handleDelete = () => setInputText((prev) => prev.slice(0, -1));
  const handleSchoolChange = (school: KabbalahSchool) => setCurrentSchool(school);
  const handleKeyPress = (char: string) => setInputText((prev) => prev + char);
  
  // Lógica de transición
  const goManifest = () => setManifestMode('MANIFESTATION');
  const goOrigin = () => setManifestMode('ORIGIN');
  const goGematria = () => setManifestMode('GEMATRIA');

  return (
    <main style={{ 
      position: 'relative', 
      width: '100dvw', 
      height: '100dvh', 
      overflow: 'hidden', 
      backgroundColor: '#000', 
      fontFamily: '"Times New Roman", serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* --- CAPA 0: FONDO VISUAL --- */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {visualMode === 'GALAXY' && <HebrewGalaxy text={inputText} school={currentSchool} />}
        {visualMode === 'PARTICLES' && <MysticParticles text={inputText} school={currentSchool} />}
        {visualMode === 'GLITCH' && (
          <LetterGlitch glitchSpeed={50} characters="אבגדהוזחטיכלמנסעפצקרשת" />
        )}
      </div>

      {/* Luz Ambiental */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(circle at center, rgba(255,215,0,0.08) 0%, rgba(0,0,0,0) 70%)',
        opacity: manifestMode === 'MANIFESTATION' ? 1 : 0, 
        transition: 'opacity 2s ease-in-out', 
        pointerEvents: 'none'
      }} />

      {/* --- CONTENEDOR FLEXIBLE PRINCIPAL --- */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto', 
        overflowX: 'hidden',
      }}>

        {/* 1. HEADER (Escuelas y Título) */}
        <div style={{
          flexShrink: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: 'max(20px, env(safe-area-inset-top))',
          paddingBottom: '10px',
          opacity: manifestMode === 'ORIGIN' ? 1 : 0,
          transform: manifestMode === 'ORIGIN' ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.8s ease',
          pointerEvents: manifestMode === 'ORIGIN' ? 'auto' : 'none',
        }}>
          <h1 style={{
            fontSize: '16px', letterSpacing: '0.5em', textTransform: 'uppercase',
            marginBottom: '10px', color: '#d4af37',
            textShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
          }}>Supramente</h1>
          <SchoolSelector current={currentSchool} onChange={handleSchoolChange} />
        </div>

        {/* 2. AREA CENTRAL (Input) */}
        <div style={{
          flexGrow: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '120px',
          padding: '10px 0'
        }}>
          {/* El input se comporta distinto según el modo. En Gematria quizás quieras ocultarlo o minimizarlo */}
          {manifestMode !== 'GEMATRIA' && (
            <HebrewInput 
                value={inputText} 
                school={currentSchool} 
                onDelete={handleDelete} 
                // Pasamos 'MANIFESTATION' solo si es estrictamente manifestación para activar la luz
                mode={manifestMode === 'MANIFESTATION' ? 'MANIFESTATION' : 'ORIGIN'} 
            />
          )}
          
          {/* PLACEHOLDER DE GEMATRÍA (Para futura implementación) */}
          {manifestMode === 'GEMATRIA' && (
            <div style={{ color: '#fff', fontSize: '20px', letterSpacing: '0.2em' }}>
              [ MÓDULO DE GEMATRÍA EN CONSTRUCCIÓN ]
            </div>
          )}
        </div>

        {/* 3. AREA INFERIOR (Teclado + Botones) */}
        <div style={{
          flexShrink: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '15px',
          paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
          opacity: manifestMode === 'ORIGIN' ? 1 : 0,
          transform: manifestMode === 'ORIGIN' ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease',
          pointerEvents: manifestMode === 'ORIGIN' ? 'auto' : 'none',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)' 
        }}>
          
          <HebrewKeyboard currentSchool={currentSchool} onCharClick={handleKeyPress} />

          {/* BOTÓN MANIFESTAR (Solo visible en ORIGIN) */}
          <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {inputText.length > 0 ? (
              <button
                onClick={goManifest}
                style={{
                  padding: '12px 40px',
                  borderRadius: '99px',
                  border: '1px solid rgba(255, 215, 0, 0.4)',
                  cursor: 'pointer',
                  fontFamily: '"Times New Roman", serif',
                  fontSize: '12px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  background: 'rgba(20, 20, 20, 0.9)',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.15)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                Manifestar
              </button>
            ) : (
              <div style={{ height: '42px' }} />
            )}
          </div>

          <div style={{
            display: 'flex', gap: '4px', padding: '4px',
            background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(12px)',
            borderRadius: '99px', border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {(['GALAXY', 'PARTICLES', 'GLITCH'] as VisualMode[]).map((mode) => (
              <button 
                key={mode} 
                onClick={() => setVisualMode(mode)}
                style={{
                  padding: '6px 16px', borderRadius: '99px', border: 'none',
                  fontSize: '9px', fontWeight: visualMode === mode ? '600' : '400',
                  background: visualMode === mode ? '#fff' : 'transparent',
                  color: visualMode === mode ? '#000' : '#888',
                  transition: 'all 0.3s ease'
                }}
              >
                {mode === 'GLITCH' ? 'CODE' : mode}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* --- NAVEGACIÓN DE MANIFESTACIÓN (FLECHAS INFERIORES) --- */}
      {/* Solo aparecen si estamos en MANIFESTACIÓN (o GEMATRÍA si quisieras navegar atrás) */}
      {(manifestMode === 'MANIFESTATION') && (
        <>
          {/* FLECHA IZQUIERDA: RETORNAR A ORIGEN */}
          <div style={{
            position: 'absolute', 
            bottom: 'max(30px, env(safe-area-inset-bottom))', 
            left: '30px',
            zIndex: 100
          }}>
            <button
              onClick={goOrigin}
              style={{
                width: '50px', height: '50px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <ArrowLeft />
            </button>
          </div>

          {/* FLECHA DERECHA: AVANZAR A GEMATRÍA */}
          <div style={{
            position: 'absolute', 
            bottom: 'max(30px, env(safe-area-inset-bottom))', 
            right: '30px',
            zIndex: 100
          }}>
            <button
              onClick={goGematria}
              style={{
                width: '50px', height: '50px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 215, 0, 0.4)', // Borde dorado sutil
                background: 'rgba(20,20,20,0.6)',
                backdropFilter: 'blur(10px)',
                color: '#d4af37', // Icono dorado
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = 'rgba(255, 215, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(20,20,20,0.6)';
              }}
            >
              <ArrowRight />
            </button>
          </div>
        </>
      )}

      {/* BOTÓN DE RETORNO PARA GEMATRÍA (Opcional, para no quedarse atrapado) */}
      {manifestMode === 'GEMATRIA' && (
        <div style={{
          position: 'absolute', bottom: '30px', left: '30px', zIndex: 100
        }}>
          <button onClick={goManifest} style={{
             color: '#fff', background: 'transparent', border: 'none', 
             fontSize: '14px', letterSpacing: '0.2em', cursor: 'pointer'
          }}>
            ← VOLVER A LUZ
          </button>
        </div>
      )}

    </main>
  );
}