'use client';

import '../styles/Nebula.css';

export const Nebula = () => {
  return (
    <div className="nebula-container">
      <div className="nebula-gas layer-1" />
      <div className="nebula-gas layer-2" />
      <div className="nebula-stars" />
    </div>
  );
};