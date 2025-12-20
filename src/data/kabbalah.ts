// src/data/kabbalah.ts

import { HEBREW_DATA, NORMALIZE_MAP, type Palettes } from './constants';

export type KabbalahSchool = 'orthodox' | 'ari-lurianic' | 'golden-dawn' | 'akashic-universal';

export const KABBALAH_SCHOOLS: { id: KabbalahSchool; name: string; desc: string }[] = [
  { id: 'orthodox', name: 'Orthodox', desc: 'Tradición Rabínica Clásica' },
  { id: 'ari-lurianic', name: 'Ari Z"L', desc: 'Sistema Luriánico (Tzimtzum)' },
  { id: 'golden-dawn', name: 'Golden Dawn', desc: 'Qabalah Hermética Occidental' },
  { id: 'akashic-universal', name: 'Akashic', desc: 'Resonancia Universal Supramente' }
];

export const HEBREW_ALPHABET = Object.keys(HEBREW_DATA).map(char => ({
  char,
  gematria: HEBREW_DATA[char].val,
  name: HEBREW_DATA[char].name
}));

// AXIOMA: Mapeo entre IDs de escuela y claves de paleta en HEBREW_DATA
const SCHOOL_TO_PALETTE_KEY: Record<KabbalahSchool, keyof Palettes> = {
  'orthodox': 'ort',
  'ari-lurianic': 'ari',
  'golden-dawn': 'gd',
  'akashic-universal': 'akashic'
};

export const getHebrewColor = (char: string, school: KabbalahSchool): string => {
  if (!char) return '#444';
  
  // 1. Normalización (Sofit -> Normal) para buscar datos
  const normalizedChar = NORMALIZE_MAP[char] || char;
  
  // 2. Búsqueda de Datos
  const data = HEBREW_DATA[normalizedChar];
  if (!data || !data.palettes) return '#444'; // Fallback gris

  // 3. Selección de Paleta
  const paletteKey = SCHOOL_TO_PALETTE_KEY[school] || 'ort';
  
  return data.palettes[paletteKey] || '#444';
};