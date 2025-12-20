'use client';

import { type KabbalahSchool } from '../data/kabbalah';
import '../styles/SchoolSelector.css'; // Importamos el CSS externo

interface SelectorProps {
  current: KabbalahSchool;
  onChange: (school: KabbalahSchool) => void;
}

export const SchoolSelector = ({ current, onChange }: SelectorProps) => {
  
  const schools = [
    { 
      id: 'orthodox' as KabbalahSchool, 
      label: 'ORTHODOX', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L15 9H9L12 2Z" /><path d="M12 22L9 15H15L12 22Z" /><path d="M2 12L9 9L12 2L15 9L22 12L15 15L12 22L9 15L2 12Z" opacity="0.5"/></svg>
    },
    { 
      id: 'ari-lurianic' as KabbalahSchool, 
      label: 'ARI Z"L', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C12 2 16 8 16 13C16 17.4183 12.4183 21 8 21C6.5 21 5 20 4 19" /><path d="M12 2C12 2 8 8 8 13C8 17.4183 11.5817 21 16 21C17.5 21 19 20 20 19" /><path d="M12 8C12 8 14 11 14 14C14 15.5 13 17 12 17C11 17 10 15.5 10 14C10 11 12 8 12 8Z" /></svg>
    },
    { 
      id: 'golden-dawn' as KabbalahSchool, 
      label: 'GOLDEN DAWN', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3L2 20H22L12 3Z" /><circle cx="12" cy="13" r="3" /></svg>
    },
    { 
      id: 'akashic-universal' as KabbalahSchool, 
      label: 'AKASHIC', 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18.1781 8C19.8354 8 21.1781 9.34315 21.1781 11C21.1781 12.6569 19.8354 14 18.1781 14C16.5208 14 15.1781 12.6569 15.1781 11C15.1781 9.34315 16.5208 8 18.1781 8Z" /><path d="M5.82192 8C7.47923 8 8.82192 9.34315 8.82192 11C8.82192 12.6569 7.47923 14 5.82192 14C4.16461 14 2.82192 12.6569 2.82192 11C2.82192 9.34315 4.16461 8 5.82192 8Z" /><path d="M8.82 11C10.5 13 13.5 13 15.18 11" /><path d="M8.82 11C10.5 9 13.5 9 15.18 11" /></svg>
    }
  ];

  return (
    <div className="school-navbar">
      {schools.map((school) => {
        const isActive = current === school.id;
        return (
          <button
            key={school.id}
            onClick={() => onChange(school.id)}
            className={`school-nav-btn ${isActive ? 'active' : ''}`}
          >
            <div className="icon-wrapper">
                {school.icon}
            </div>
            <span className="school-label">{school.label}</span>
            {isActive && <div className="active-glow" />}
          </button>
        );
      })}
    </div>
  );
};