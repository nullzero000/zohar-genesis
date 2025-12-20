'use client';

export const Void = () => {
  return (
    <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#000',
        zIndex: -1,
        overflow: 'hidden'
    }}>
        {/* Estrellas distantes y apenas visibles */}
        <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
                radial-gradient(1px 1px at 50px 100px, rgba(255,255,255,0.15), transparent),
                radial-gradient(1px 1px at 150px 250px, rgba(255,255,255,0.1), transparent),
                radial-gradient(1.5px 1.5px at 300px 50px, rgba(255,255,255,0.05), transparent)
            `,
            backgroundSize: '400px 400px',
            opacity: 0.4
        }} />
    </div>
  );
};