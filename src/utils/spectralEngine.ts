import { HEBREW_DATA, NORMALIZE_MAP, type Palettes } from '../data/constants';

// --- UTILIDAD: CONVERSIÓN RGB a HSL/HSV (Para análisis perceptivo) ---
const rgbToHsv = (r: number, g: number, b: number) => {
    let rAbs = r / 255;
    let gAbs = g / 255;
    let bAbs = b / 255;

    let max = Math.max(rAbs, gAbs, bAbs), min = Math.min(rAbs, gAbs, bAbs);
    let h = 0, s = 0, v = max;

    let d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case rAbs: h = (gAbs - bAbs) / d + (gAbs < bAbs ? 6 : 0); break;
            case gAbs: h = (bAbs - rAbs) / d + 2; break;
            case bAbs: h = (rAbs - gAbs) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: h * 360, 
        s: s * 100,
        v: v * 100 
    };
};

// --- PALETA EXTENDIDA ---
const PALETTE = [
    { name: 'Negro', rgb: [0, 0, 0] },
    { name: 'Blanco', rgb: [255, 255, 255] },
    { name: 'Gris Oscuro', rgb: [105, 105, 105] },
    { name: 'Gris Neutro', rgb: [160, 160, 160] },
    { name: 'Plata', rgb: [192, 192, 192] },
    { name: 'Verde Olivo Oscuro', rgb: [85, 107, 47] },
    { name: 'Verde', rgb: [0, 128, 0] },
    { name: 'Oliva Suave', rgb: [150, 130, 90] },
    { name: 'Caqui', rgb: [189, 183, 107] },
    { name: 'Lima', rgb: [0, 255, 0] },
    { name: 'Verde Azulado', rgb: [0, 128, 128] },
    { name: 'Marrón Oscuro', rgb: [139, 69, 19] },
    { name: 'Ocre', rgb: [204, 119, 34] },
    { name: 'Beige', rgb: [245, 245, 220] },
    { name: 'Melocotón Pálido', rgb: [255, 229, 180] },
    { name: 'Siena', rgb: [174, 94, 75] },
    { name: 'Rojo', rgb: [255, 0, 0] },
    { name: 'Granate', rgb: [128, 0, 0] },
    { name: 'Salmón', rgb: [250, 128, 114] },
    { name: 'Rosa Suave', rgb: [255, 105, 180] },
    { name: 'Malva Pálido', rgb: [200, 162, 200] },
    { name: 'Naranja', rgb: [255, 165, 0] },
    { name: 'Oro', rgb: [255, 215, 0] },
    { name: 'Amarillo', rgb: [255, 255, 0] },
    { name: 'Cian', rgb: [0, 255, 255] },
    { name: 'Azul', rgb: [0, 0, 255] },
    { name: 'Azul Marino', rgb: [0, 0, 128] },
    { name: 'Acero', rgb: [70, 130, 180] },
    { name: 'Magenta', rgb: [255, 0, 255] },
    { name: 'Violeta', rgb: [128, 0, 128] },
    { name: 'Índigo', rgb: [75, 0, 130] }
];

// --- FUNCIÓN PRINCIPAL DE CLASIFICACIÓN PERCEPTIVA ---
export const getSemanticsFromRGB = (r: number, g: number, b: number) => {
    // 1. Convertir a HSV
    const hsv = rgbToHsv(r, g, b);
    const H = hsv.h;
    const S = hsv.s;
    const V = hsv.v;

    // 2. FILTROS PERCEPTIVOS
    if (V < 10) return 'Negro Puro';
    if (V > 95 && S < 5) return 'Blanco Puro';
    
    // Gris por baja saturación
    if (S < 20) {
        if (V < 40) return 'Gris Muy Oscuro';
        if (V < 70) return 'Gris Neutro';
        return 'Gris Claro';
    }

    // 3. CLASIFICACIÓN POR HUE (Ponderada)
    let minDistance = Infinity;
    let colorName = 'Desconocido';

    PALETTE.forEach(color => {
        const [r2, g2, b2] = color.rgb;
        const hsv2 = rgbToHsv(r2, g2, b2);
        
        // dH: Distancia circular en el círculo de matices
        const dH = Math.min(Math.abs(H - hsv2.h), 360 - Math.abs(H - hsv2.h)) / 180;
        const dS = Math.abs(S - hsv2.s) / 100;
        const dV = Math.abs(V - hsv2.v) / 100;
        
        // Peso: 50% Tono, 30% Saturación, 20% Brillo
        const distance = (dH * 0.5) + (dS * 0.3) + (dV * 0.2);

        if (distance < minDistance) {
            minDistance = distance;
            colorName = color.name;
        }
    });

    return colorName;
};

// Helper parseo RGB string
const parseRGBString = (rgbStr: string): { r: number, g: number, b: number } | null => {
  if (!rgbStr) return null;
  const matches = rgbStr.match(/\d+/g);
  if (!matches || matches.length < 3) return null;
  return {
    r: parseInt(matches[0], 10),
    g: parseInt(matches[1], 10),
    b: parseInt(matches[2], 10)
  };
};

export interface SpectralAnalysis {
  frequencyMap: Record<string, number>;
  total: number;
  mixedColor: string;
  mixedColorName: string; // Nuevo campo
  dominant: string;
  dominantData: any;
  topList: string[];
  diagnosis: string;
}

export const analyzeFrequencyAndColor = (chars: string[], system: keyof Palettes = 'ari'): SpectralAnalysis | null => {
  if (!chars || chars.length === 0) return null;

  const frequencyMap: Record<string, number> = {};
  let total = 0;
  let rAcc = 0, gAcc = 0, bAcc = 0;
  let validChars = 0;

  chars.forEach(char => {
    const normChar = NORMALIZE_MAP[char] || char;
    // @ts-ignore
    const data = HEBREW_DATA[normChar];

    if (data && data.palettes) {
      frequencyMap[char] = (frequencyMap[char] || 0) + 1;
      total++;

      const colorString = data.palettes[system] || data.palettes['ari'];
      const rgbValues = parseRGBString(colorString);

      if (rgbValues) {
        validChars++;
        rAcc += rgbValues.r;
        gAcc += rgbValues.g;
        bAcc += rgbValues.b;
      }
    }
  });

  if (validChars === 0) return null;

  const rFinal = Math.round(rAcc / validChars);
  const gFinal = Math.round(gAcc / validChars);
  const bFinal = Math.round(bAcc / validChars);

  const mixedColor = `rgb(${rFinal}, ${gFinal}, ${bFinal})`;
  // AXIOMA: Usamos tu nuevo motor para nombrar el color
  const mixedColorName = getSemanticsFromRGB(rFinal, gFinal, bFinal);

  let dominantChar = '';
  let maxFreq = 0;

  Object.keys(frequencyMap).forEach(char => {
    if (frequencyMap[char] > maxFreq) {
      maxFreq = frequencyMap[char];
      dominantChar = char;
    }
  });

  const topList = Object.keys(frequencyMap).sort((a, b) => frequencyMap[b] - frequencyMap[a]);
  const dominantNorm = NORMALIZE_MAP[dominantChar] || dominantChar;
  // @ts-ignore
  const domData = HEBREW_DATA[dominantNorm];

  let diagnosisText = "Datos insuficientes.";
  if (domData) {
    const porcentaje = ((maxFreq / total) * 100).toFixed(1);
    diagnosisText = `ANALISIS DE RESONANCIA:\nLa estructura fractal muestra una tendencia hacia la energía de ${domData.energy || '...'}, ocupando un ${porcentaje}% del espectro.\n\nDOMINANCIA CROMÁTICA: ${mixedColorName.toUpperCase()}`;
  }

  return {
    frequencyMap,
    total,
    mixedColor,
    mixedColorName, // Exportamos el nombre
    dominant: dominantChar,
    dominantData: domData,
    topList,
    diagnosis: diagnosisText
  };
};