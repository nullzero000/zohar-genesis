export interface Sefirah {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  color: string;
}

export interface TreePath {
  id: string;
  letter: string;
  source: string;
  target: string;
  meaning: string;
  tarot: string;
}

// Coordenadas ajustadas para centrado perfecto (600x1100)
export const SEFIROT: Sefirah[] = [
  { id: 'keter', label: 'KETER', sub: 'Corona', x: 300, y: 100, color: '#fff' },
  { id: 'chokhmah', label: 'CHOCHMAH', sub: 'Sabiduría', x: 500, y: 250, color: '#8899a6' },
  { id: 'binah', label: 'BINAH', sub: 'Entendimiento', x: 100, y: 250, color: '#1a1a1a' },
  { id: 'daat', label: 'DAAT', sub: 'Conocimiento', x: 300, y: 350, color: '#444' }, 
  { id: 'chesed', label: 'CHESED', sub: 'Misericordia', x: 500, y: 450, color: '#0066cc' },
  { id: 'gevurah', label: 'GEVURAH', sub: 'Juicio', x: 100, y: 450, color: '#cc0000' },
  { id: 'tiferet', label: 'TIFERET', sub: 'Belleza', x: 300, y: 600, color: '#ffd700' },
  { id: 'netzach', label: 'NETZACH', sub: 'Victoria', x: 500, y: 780, color: '#00cc00' },
  { id: 'hod', label: 'HOD', sub: 'Esplendor', x: 100, y: 780, color: '#ff6600' },
  { id: 'yesod', label: 'YESOD', sub: 'Fundamento', x: 300, y: 900, color: '#663399' },
  { id: 'malkhut', label: 'MALCHUT', sub: 'Reino', x: 300, y: 1050, color: '#654321' },
];

export const PATHS: TreePath[] = [
  { id: 'p11', letter: 'א', source: 'keter', target: 'chokhmah', meaning: 'Buey', tarot: 'El Loco' },
  { id: 'p12', letter: 'ב', source: 'keter', target: 'binah', meaning: 'Casa', tarot: 'El Mago' },
  { id: 'p13', letter: 'ג', source: 'keter', target: 'tiferet', meaning: 'Camello', tarot: 'Sacerdotisa' },
  { id: 'p14', letter: 'ד', source: 'chokhmah', target: 'binah', meaning: 'Puerta', tarot: 'Emperatriz' },
  { id: 'p15', letter: 'ה', source: 'chokhmah', target: 'tiferet', meaning: 'Ventana', tarot: 'Emperador' },
  { id: 'p16', letter: 'ו', source: 'chokhmah', target: 'chesed', meaning: 'Clavo', tarot: 'Hierofante' },
  { id: 'p17', letter: 'ז', source: 'binah', target: 'tiferet', meaning: 'Espada', tarot: 'Amantes' },
  { id: 'p18', letter: 'ח', source: 'binah', target: 'gevurah', meaning: 'Valla', tarot: 'Carro' },
  { id: 'p19', letter: 'ט', source: 'chesed', target: 'gevurah', meaning: 'Serpiente', tarot: 'Fuerza' },
  { id: 'p20', letter: 'י', source: 'chesed', target: 'tiferet', meaning: 'Mano', tarot: 'Ermitaño' },
  { id: 'p21', letter: 'כ', source: 'chesed', target: 'netzach', meaning: 'Palma', tarot: 'Rueda' },
  { id: 'p22', letter: 'ל', source: 'gevurah', target: 'tiferet', meaning: 'Aguijón', tarot: 'Justicia' },
  { id: 'p23', letter: 'מ', source: 'gevurah', target: 'hod', meaning: 'Agua', tarot: 'Colgado' },
  { id: 'p24', letter: 'נ', source: 'tiferet', target: 'netzach', meaning: 'Pez', tarot: 'Muerte' },
  { id: 'p25', letter: 'ס', source: 'tiferet', target: 'yesod', meaning: 'Sostén', tarot: 'Templanza' },
  { id: 'p26', letter: 'ע', source: 'tiferet', target: 'hod', meaning: 'Ojo', tarot: 'Diablo' },
  { id: 'p27', letter: 'פ', source: 'netzach', target: 'hod', meaning: 'Boca', tarot: 'Torre' },
  { id: 'p28', letter: 'צ', source: 'netzach', target: 'yesod', meaning: 'Anzuelo', tarot: 'Estrella' },
  { id: 'p29', letter: 'ק', source: 'netzach', target: 'malkhut', meaning: 'Nuca', tarot: 'Luna' },
  { id: 'p30', letter: 'ר', source: 'hod', target: 'yesod', meaning: 'Cabeza', tarot: 'Sol' },
  { id: 'p31', letter: 'ש', source: 'hod', target: 'malkhut', meaning: 'Fuego', tarot: 'Juicio' },
  { id: 'p32', letter: 'ת', source: 'yesod', target: 'malkhut', meaning: 'Marca', tarot: 'Mundo' },
];