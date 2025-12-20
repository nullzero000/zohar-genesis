import { HEBREW_DATA, MILUY_MAP, NORMALIZE_MAP } from '../data/constants';

export const digitalSum = (num: number): number => {
  if (!num || isNaN(num)) return 0;
  return String(num).split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
};

export const reduceToSingleDigit = (num: number): number => {
  let c = num;
  while (c >= 10) {
    c = digitalSum(c);
  }
  return c;
};

export interface MiluyLevel {
  level: number;
  chars: string[];
  totalValue: number;
  reducedValue: number;
}

export const calculateMiluyLevels = (inputString: string, maxLevel = 5): MiluyLevel[] => {
  if (!inputString) return [];

  const levels: MiluyLevel[] = [];
  let currentChars = inputString.split('').filter(c => c !== ' ');

  for (let i = 0; i <= maxLevel; i++) {
    let levelSum = 0;
    
    currentChars.forEach(char => {
      const n = NORMALIZE_MAP[char] || char;
      const data = HEBREW_DATA[n];
      if (data) {
        levelSum += data.val;
      }
    });

    // Guardar si hay contenido
    if (currentChars.length > 0) {
        levels.push({
        level: i,
        chars: currentChars,
        totalValue: levelSum,
        reducedValue: reduceToSingleDigit(levelSum)
        });
    }

    if (i < maxLevel) {
      const nextChars: string[] = [];
      currentChars.forEach(char => {
        // Normalizamos antes de expandir para asegurar mapeo correcto
        const n = NORMALIZE_MAP[char] || char;
        const expansion = MILUY_MAP[n] || [char];
        nextChars.push(...expansion);
      });
      currentChars = nextChars;
    }
  }

  return levels;
};