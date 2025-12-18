import { KABBALAH_SCHOOLS, type KabbalahSchool } from '../data/kabbalah';

interface SchoolSelectorProps {
  current: KabbalahSchool;
  onChange: (school: KabbalahSchool) => void;
}

export const SchoolSelector = ({ current, onChange }: SchoolSelectorProps) => {
  return (
    // Contenedor flexible y centrado
    <div style={{ 
      display: 'flex', 
      gap: '12px', 
      padding: '8px',
      background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(10px)',
      borderRadius: '99px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      {KABBALAH_SCHOOLS.map((school) => {
        const isActive = current === school.id;
        return (
          <button
            key={school.id}
            onClick={() => onChange(school.id)}
            title={school.desc}
            // ESTILOS ROBUSTOS PARA ASEGURAR INTERACTIVIDAD
            style={{
              position: 'relative',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '99px',
              cursor: 'pointer',
              pointerEvents: 'auto', // FORZAR QUE RECIBA CLICKS
              // Estilo condicional Activo/Inactivo
              background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
              color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
              fontWeight: isActive ? 'bold' : 'normal',
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {/* Nombre de la escuela */}
            <span>{school.name}</span>
            
            {/* Indicador visual (punto de luz) */}
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: isActive ? '#fff' : 'rgba(255,255,255,0.2)',
              boxShadow: isActive ? '0 0 10px #fff' : 'none',
              transition: 'all 0.3s ease'
            }} />
          </button>
        );
      })}
    </div>
  );
};