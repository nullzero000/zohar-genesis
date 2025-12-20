// src/data/constants.ts

// --- INTERFACES DE DATOS HEBREOS ---
export interface TorahData {
  word: string;
  phonetic: string;
  cite: string;
  bio: string;
}

export interface SyData {
  type: string;
  logic: string;
  diag: string;
  fix: string;
}

export interface TikkunData {
  light: string;
  shadow: string;
}

export interface Palettes {
  gd: string;
  ari: string;
  ort: string;
  akashic: string;
}

export interface HebrewCharData {
  val: number;
  name: string;
  meaning: string;
  element: string;
  planet: string;
  tarot: string;
  palettes: Palettes; // AXIOMA: Reemplaza al antiguo 'color' string
  energy: string;
  torah: TorahData;
  sy_data: SyData;
  tikkun: TikkunData;
}

// --- DATA MAESTRA HEBREA ---
export const HEBREW_DATA: Record<string, HebrewCharData> = {
  'א': { 
    val: 1, name: 'Aleph', meaning: 'Buey', element: 'Aire', planet: 'Urano', tarot: 'El Loco',
    palettes: { gd: 'rgb(240, 248, 255)', ari: 'rgb(255, 255, 255)', ort: 'rgb(200, 200, 200)', akashic: 'rgb(173, 255, 47)' }, 
    energy: 'Paradoja. Silencio.', 
    torah: { word: 'אֱלֹהִים', phonetic: 'Elohim', cite: 'Gen 1:1', bio: 'Pecho / Pulmones' },
    sy_data: { type: 'MADRE (AIRE)', logic: 'Bloqueo Primario', diag: 'Bloqueo Respiratorio.', fix: 'Restaurar Flujo Vital.' },
    tikkun: { light: 'Unidad con el Creador (Paz).', shadow: 'Arrogancia (Yo Primero).' }
  },
  'ב': { 
    val: 2, name: 'Bet', meaning: 'Casa', element: 'Tierra', planet: 'Luna', tarot: 'El Mago',
    palettes: { gd: 'rgb(255, 255, 240)', ari: 'rgb(255, 255, 255)', ort: 'rgb(200, 200, 200)', akashic: 'rgb(0, 0, 205)' }, 
    energy: 'La Casa.', 
    torah: { word: 'בְּרֵאשִׁית', phonetic: 'Bereshit', cite: 'Gen 1:1', bio: 'Ojo Derecho' },
    sy_data: { type: 'DOBLE', logic: 'Polaridad', diag: 'Sabiduría vs. Locura.', fix: 'Traer Sabiduría.' },
    tikkun: { light: 'Bendición, Canalización de Luz.', shadow: 'Separación, Casa Sellada (Aislamiento).' }
  },
  'ג': { 
    val: 3, name: 'Gimel', meaning: 'Camello', element: 'Fuego', planet: 'Marte', tarot: 'La Sacerdotisa',
    palettes: { gd: 'rgb(255, 140, 0)', ari: 'rgb(220, 20, 60)', ort: 'rgb(255, 0, 0)', akashic: 'rgb(228, 0, 124)' },
    energy: 'Canal.', 
    torah: { word: 'גַּן', phonetic: 'Gan', cite: 'Gen 2:8', bio: 'Oído Derecho' },
    sy_data: { type: 'DOBLE', logic: 'Polaridad', diag: 'Riqueza vs. Pobreza.', fix: 'Dar (Caridad).' },
    tikkun: { light: 'Generosidad, Nutrición.', shadow: 'Orgullo, Exceso de Juicio.' }
  },
  'ד': { 
    val: 4, name: 'Dalet', meaning: 'Puerta', element: 'Fuego', planet: 'Sol', tarot: 'La Emperatriz',
    palettes: { gd: 'rgb(255, 215, 0)', ari: 'rgb(0, 128, 0)', ort: 'rgb(255, 165, 0)', akashic: 'rgb(149, 53, 83)' },
    energy: 'Contención.', 
    torah: { word: 'דֶּשֶׁא', phonetic: 'Deshé', cite: 'Gen 1:11', bio: 'Fosa Nasal Derecha' },
    sy_data: { type: 'DOBLE', logic: 'Polaridad', diag: 'Semilla vs. Desolación.', fix: 'Cultivar.' },
    tikkun: { light: 'Humildad, Autoconciencia.', shadow: 'Mendicidad, Carencia Crónica.' }
  },
  'ה': { 
    val: 5, name: 'He', meaning: 'Ventana', element: 'Aire', planet: 'Aries', tarot: 'El Emperador',
    palettes: { gd: 'rgb(255, 69, 0)', ari: 'rgb(0, 0, 139)', ort: 'rgb(139, 0, 0)', akashic: 'rgb(135, 206, 235)' },
    energy: 'Aliento.', 
    torah: { word: 'הַשָּׁמַיִם', phonetic: "Ha'Shamayim", cite: 'Gen 1:1', bio: 'Pie Derecho' },
    sy_data: { type: 'SIMPLE', logic: 'Diag. Fino', diag: 'Falta de Visión.', fix: 'Arquetipo: El Constituyente.' },
    tikkun: { light: 'Revelación de la Presencia.', shadow: 'Ceguera, Escape, Superficialidad.' }
  },
  'ו': { 
    val: 6, name: 'Vav', meaning: 'Clavo', element: 'Tierra', planet: 'Tauro', tarot: 'El Hierofante',
    palettes: { gd: 'rgb(139, 69, 19)', ari: 'rgb(255, 255, 255)', ort: 'rgb(100, 50, 0)', akashic: 'rgb(220, 20, 60)' }, 
    energy: 'Conector.', 
    torah: { word: 'וְאֵת', phonetic: "Ve'et", cite: 'Gen 1:1', bio: 'Riñón Derecho' },
    sy_data: { type: 'SIMPLE', logic: 'Diag. Fino', diag: 'Falta de Conexión.', fix: 'Arquetipo: El Conector.' },
    tikkun: { light: 'Conexión, Flujo, Puentes.', shadow: 'Distorsión, Vicio.' }
  },
  'ז': { 
    val: 7, name: 'Zayin', meaning: 'Espada', element: 'Aire', planet: 'Géminis', tarot: 'Los Enamorados',
    palettes: { gd: 'rgb(255, 255, 0)', ari: 'rgb(255, 140, 0)', ort: 'rgb(192, 192, 192)', akashic: 'rgb(65, 105, 225)' }, 
    energy: 'Espada.', 
    torah: { word: 'זֶרַע', phonetic: 'Zera', cite: 'Gen 1:11', bio: 'Pie Izquierdo' },
    sy_data: { type: 'SIMPLE', logic: 'Diag. Fino', diag: 'Falta de Discriminación.', fix: 'Arquetipo: La Espada.' },
    tikkun: { light: 'Sustento (Paranassah), Orden.', shadow: 'Lucha Crónica, Conflicto.' }
  },
  'ח': { 
    val: 8, name: 'Chet', meaning: 'Valla', element: 'Agua', planet: 'Cáncer', tarot: 'El Carro',
    palettes: { gd: 'rgb(0, 191, 255)', ari: 'rgb(128, 0, 0)', ort: 'rgb(0, 0, 128)', akashic: 'rgb(255, 215, 0)' }, 
    energy: 'Vida.', 
    torah: { word: 'חֹשֶׁךְ', phonetic: 'Choshech', cite: 'Gen 1:2', bio: 'Mano Derecha' },
    sy_data: { type: 'SIMPLE', logic: 'Diag. Fino', diag: 'Límites débiles.', fix: 'Arquetipo: La Valla.' },
    tikkun: { light: 'Vida Plena, Elección de Luz.', shadow: 'Bloqueo, Muerte Espiritual.' }
  },
  'ט': { 
    val: 9, name: 'Tet', meaning: 'Serpiente', element: 'Fuego', planet: 'Leo', tarot: 'La Fuerza',
    palettes: { gd: 'rgb(255, 165, 0)', ari: 'rgb(255, 255, 255)', ort: 'rgb(255, 215, 0)', akashic: 'rgb(200, 162, 200)' }, 
    energy: 'Bondad.', 
    torah: { word: 'טוֹב', phonetic: 'Tov', cite: 'Gen 1:4', bio: 'Riñón Izquierdo' },
    sy_data: { type: 'SIMPLE', logic: 'Diag. Fino', diag: 'Digestión emocional pobre.', fix: 'Arquetipo: La Serpiente.' },
    tikkun: { light: 'Bondad Oculta, Protección.', shadow: 'Trampa, Miedo a Revelar.' }
  },
  'י': { 
    val: 10, name: 'Yod', meaning: 'Mano', element: 'Tierra', planet: 'Virgo', tarot: 'El Ermitaño',
    // AXIOMA ORTODOXO: Tinta Negra. Requiere halo CSS en UI para visibilidad en fondo oscuro.
    palettes: { gd: 'rgb(85, 107, 47)', ari: 'rgb(0, 0, 0)', ort: 'rgb(10, 10, 10)', akashic: 'rgb(255, 248, 220)' }, 
    energy: 'Punto.', 
    torah: { word: 'יְהִי', phonetic: 'Yehí', cite: 'Gen 1:3', bio: 'Mano Izquierda' },
    sy_data: { type: 'SIMPLE', logic: 'Diag. Fino', diag: 'Falta de detalle.', fix: 'Arquetipo: La Mano.' },
    tikkun: { light: 'Plan Divino, Punto Inicial.', shadow: 'Autoengaño, Confusión.' }
  },
  'כ': { 
    val: 20, name: 'Kaf', meaning: 'Palma', element: 'Tierra', planet: 'Venus', tarot: 'La Rueda',
    palettes: { gd: 'rgb(0, 128, 0)', ari: 'rgb(0, 255, 0)', ort: 'rgb(139, 69, 19)', akashic: 'rgb(138, 43, 226)' }, 
    energy: 'Palma.', 
    torah: { word: 'כִּי', phonetic: 'Ki', cite: 'Gen 1:4', bio: 'Ojo Izquierdo' },
    sy_data: { type: 'DOBLE', logic: 'Polaridad', diag: 'Vida vs. Muerte.', fix: 'Moldear la realidad.' },
    tikkun: { light: 'Corona de Luz, Disciplina.', shadow: 'Juicio Excesivo, Desorden.' }
  },
  'ל': { 
    val: 30, name: 'Lamed', meaning: 'Aguijón', element: 'Aire', planet: 'Libra', tarot: 'La Justicia',
    palettes: { gd: 'rgb(173, 216, 230)', ari: 'rgb(255, 255, 0)', ort: 'rgb(200, 200, 255)', akashic: 'rgb(204, 119, 34)' }, 
    energy: 'Enseñanza.', 
    torah: { word: 'לָיְלָה', phonetic: 'Layla', cite: 'Gen 1:5', bio: 'Vesícula Biliar' },
    sy_data: { type: 'SIMPLE', logic: 'Diag. Fino', diag: 'Glitch Lógica->Sistema.', fix: 'Arquetipo: El Aguijón.' },
    tikkun: { light: 'Aprendizaje, Ascenso.', shadow: 'Confusión, Pérdida de Dirección.' }
  },
  'מ': { 
    val: 40, name: 'Mem', meaning: 'Agua', element: 'Agua', planet: 'Neptuno', tarot: 'El Colgado',
    palettes: { gd: 'rgb(0, 0, 205)', ari: 'rgb(0, 0, 255)', ort: 'rgb(0, 100, 255)', akashic: 'rgb(0, 206, 209)' }, 
    energy: 'Matriz.', 
    torah: { word: 'מְרַחֶפֶת', phonetic: 'Merajefet', cite: 'Gen 1:2', bio: 'Vientre (Agua)' },
    sy_data: { type: 'MADRE (AGUA)', logic: 'Bloqueo Primario', diag: 'Bloqueo Emocional.', fix: 'Fluidez Emocional.' },
    tikkun: { light: 'Purificación, Origen de Forma.', shadow: 'Estancamiento, Caos Emocional.' }
  },
  'נ': { 
    val: 50, name: 'Nun', meaning: 'Pez', element: 'Agua', planet: 'Escorpio', tarot: 'La Muerte',
    palettes: { gd: 'rgb(0, 128, 128)', ari: 'rgb(0, 100, 0)', ort: 'rgb(47, 79, 79)', akashic: 'rgb(255, 182, 193)' }, 
    energy: 'Caída.', 
    torah: { word: 'נֶפֶשׁ', phonetic: 'Nefesh', cite: 'Gen 1:20', bio: 'Intestinos' },
    sy_data: { type: 'SIMPLE', logic: 'Diag. Fino', diag: 'Miedo a cambiar.', fix: 'Arquetipo: El Pez.' },
    tikkun: { light: 'Caída Necesaria, Reorganización.', shadow: 'Inercia, Desesperación.' }
  },
  'ס': { 
    val: 60, name: 'Samekh', meaning: 'Puntal', element: 'Fuego', planet: 'Sagitario', tarot: 'La Templanza',
    palettes: { gd: 'rgb(250, 128, 114)', ari: 'rgb(255, 0, 255)', ort: 'rgb(255, 69, 0)', akashic: 'rgb(218, 112, 214)' }, 
    energy: 'Apoyo.', 
    torah: { word: 'סֹבֵב', phonetic: 'Saviv', cite: 'Gen 2:11', bio: 'Estómago' },
    sy_data: { type: 'SIMPLE', logic: 'Diag. Fino', diag: 'Falta de soporte.', fix: 'Arquetipo: El Puntal.' },
    tikkun: { light: 'Soporte, Confianza Absoluta.', shadow: 'Esclavitud, Ciclo Cerrado.' }
  },
  'ע': { 
    val: 70, name: 'Ayin', meaning: 'Ojo', element: 'Tierra', planet: 'Capricornio', tarot: 'El Diablo',
    // AXIOMA ORTODOXO: Tinta Negra.
    palettes: { gd: 'rgb(47, 79, 79)', ari: 'rgb(75, 0, 130)', ort: 'rgb(0, 0, 0)', akashic: 'rgb(80, 200, 120)' }, 
    energy: 'Ojo.', 
    torah: { word: 'עַל', phonetic: 'Al', cite: 'Gen 1:2', bio: 'Hígado' },
    sy_data: { type: 'SIMPLE', logic: 'Diag. Fino', diag: 'Visión materialista.', fix: 'Arquetipo: El Ojo.' },
    tikkun: { light: 'Visión Espiritual, Perspectiva.', shadow: 'Ceguera, Envidia (Mal de Ojo).' }
  },
  'פ': { 
    val: 80, name: 'Pei', meaning: 'Boca', element: 'Aire', planet: 'Mercurio', tarot: 'La Torre',
    palettes: { gd: 'rgb(148, 0, 211)', ari: 'rgb(255, 255, 255)', ort: 'rgb(255, 0, 0)', akashic: 'rgb(255, 105, 180)' }, 
    energy: 'Boca.', 
    torah: { word: 'פְּנֵי', phonetic: 'Pnei', cite: 'Gen 1:2', bio: 'Oído Izquierdo' },
    sy_data: { type: 'DOBLE', logic: 'Polaridad', diag: 'Dominio vs. Esclavitud.', fix: 'Hablar con Poder.' },
    tikkun: { light: 'Boca, Poder de la Palabra.', shadow: 'Silencio, Murmuración (Chisme).' }
  },
  'צ': { 
    val: 90, name: 'Tzadik', meaning: 'Anzuelo', element: 'Aire', planet: 'Acuario', tarot: 'La Estrella',
    palettes: { gd: 'rgb(224, 255, 255)', ari: 'rgb(128, 0, 128)', ort: 'rgb(0, 255, 255)', akashic: 'rgb(144, 238, 144)' }, 
    energy: 'Justo.', 
    torah: { word: 'צֶלֶם', phonetic: 'Tzelem', cite: 'Gen 1:27', bio: 'Esófago / Garganta' },
    sy_data: { type: 'SIMPLE', logic: 'Diag. Fino', diag: 'Falta de rectitud.', fix: 'Arquetipo: El Anzuelo.' },
    tikkun: { light: 'Imagen Divina, Rectitud.', shadow: 'Doble Estándar, Hipocresía.' }
  },
  'ק': { 
    val: 100, name: 'Kof', meaning: 'Ojo aguja', element: 'Agua', planet: 'Piscis', tarot: 'La Luna',
    palettes: { gd: 'rgb(70, 130, 180)', ari: 'rgb(220, 20, 60)', ort: 'rgb(100, 100, 100)', akashic: 'rgb(175, 238, 238)' }, 
    energy: 'Santidad.', 
    torah: { word: 'קָרָא', phonetic: 'Kara', cite: 'Gen 1:5', bio: 'Bazo' },
    sy_data: { type: 'SIMPLE', logic: 'Diag. Fino', diag: 'Imitación/Falsedad.', fix: 'Arquetipo: El Mono.' },
    tikkun: { light: 'Santidad (Kadosh), Verdad.', shadow: 'Profano, Mente Inestable.' }
  },
  'ר': { 
    val: 200, name: 'Resh', meaning: 'Cabeza', element: 'Tierra', planet: 'Saturno', tarot: 'El Sol',
    palettes: { gd: 'rgb(105, 105, 105)', ari: 'rgb(255, 165, 0)', ort: 'rgb(139, 69, 19)', akashic: 'rgb(230, 230, 250)' }, 
    energy: 'Cabeza.', 
    torah: { word: 'רוּחַ', phonetic: 'Ruach', cite: 'Gen 1:2', bio: 'Fosa Nasal Izquierda' },
    sy_data: { type: 'DOBLE', logic: 'Polaridad', diag: 'Paz vs. Guerra.', fix: 'Integración del Ego.' },
    tikkun: { light: 'Liderazgo, Prioridad Voluntad.', shadow: 'Ego, Pobreza Espiritual.' }
  },
  'ש': { 
    val: 300, name: 'Shin', meaning: 'Fuego', element: 'Fuego', planet: 'Plutón', tarot: 'El Juicio',
    palettes: { gd: 'rgb(220, 20, 60)', ari: 'rgb(255, 0, 0)', ort: 'rgb(255, 69, 0)', akashic: 'rgb(224, 255, 255)' }, 
    energy: 'Fuego.', 
    torah: { word: 'שָׁמָיִם', phonetic: 'Shamayim', cite: 'Gen 1:8', bio: 'Cabeza (Fuego)' },
    sy_data: { type: 'MADRE (FUEGO)', logic: 'Bloqueo Primario', diag: 'Bloqueo Mental.', fix: 'Enfriamiento Lógico.' },
    tikkun: { light: 'Retorno (Teshuvá), Fuego.', shadow: 'Confusión, Dolor Innecesario.' }
  },
  'ת': { 
    val: 400, name: 'Tav', meaning: 'Cruz', element: 'Tierra', planet: 'Júpiter', tarot: 'El Mundo',
    // AXIOMA ORTODOXO: Tinta Negra.
    palettes: { gd: 'rgb(75, 0, 130)', ari: 'rgb(0, 0, 139)', ort: 'rgb(0, 0, 0)', akashic: 'rgb(255, 255, 224)' }, 
    energy: 'Sello.', 
    torah: { word: 'תֹהוּ', phonetic: 'Tohu', cite: 'Gen 1:2', bio: 'Boca' },
    sy_data: { type: 'DOBLE', logic: 'Polaridad', diag: 'Gracia vs. Fealdad.', fix: 'Sello Final (Acción).' },
    tikkun: { light: 'El Sello, Verdad Absoluta.', shadow: 'Desesperanza, Final sin Apertura.' }
  },
  // SOFITS
  'ך': { val: 500, name: 'Kaf Sofit', meaning: 'Palma Final', element: 'Tierra', planet: 'Venus', tarot: 'La Rueda', palettes: { gd: 'rgb(0, 128, 0)', ari: 'rgb(0, 255, 0)', ort: 'rgb(139, 69, 19)', akashic: 'rgb(138, 43, 226)' }, energy: 'Finalización.', torah: { word: '', phonetic: '', cite: '', bio: '' }, sy_data: { type: 'FINAL', logic: '', diag: '', fix: '' }, tikkun: { light: 'Finalización Potencial.', shadow: '' } },
  'ם': { val: 600, name: 'Mem Sofit', meaning: 'Agua Final', element: 'Agua', planet: 'Neptuno', tarot: 'El Colgado', palettes: { gd: 'rgb(0, 0, 205)', ari: 'rgb(0, 0, 255)', ort: 'rgb(0, 100, 255)', akashic: 'rgb(0, 206, 209)' }, energy: 'Oculto.', torah: { word: '', phonetic: '', cite: '', bio: '' }, sy_data: { type: 'FINAL', logic: '', diag: '', fix: '' }, tikkun: { light: 'Misterio Revelado.', shadow: '' } },
  'ן': { val: 700, name: 'Nun Sofit', meaning: 'Pez Final', element: 'Agua', planet: 'Escorpio', tarot: 'La Muerte', palettes: { gd: 'rgb(0, 128, 128)', ari: 'rgb(0, 100, 0)', ort: 'rgb(47, 79, 79)', akashic: 'rgb(255, 182, 193)' }, energy: 'Mesías.', torah: { word: '', phonetic: '', cite: '', bio: '' }, sy_data: { type: 'FINAL', logic: '', diag: '', fix: '' }, tikkun: { light: 'Redención.', shadow: '' } },
  'ף': { val: 800, name: 'Pei Sofit', meaning: 'Boca Final', element: 'Aire', planet: 'Mercurio', tarot: 'La Torre', palettes: { gd: 'rgb(148, 0, 211)', ari: 'rgb(255, 255, 255)', ort: 'rgb(255, 0, 0)', akashic: 'rgb(255, 105, 180)' }, energy: 'Palabra.', torah: { word: '', phonetic: '', cite: '', bio: '' }, sy_data: { type: 'FINAL', logic: '', diag: '', fix: '' }, tikkun: { light: 'Discurso Final.', shadow: '' } },
  'ץ': { val: 900, name: 'Tzadik Sofit', meaning: 'Justo Final', element: 'Aire', planet: 'Acuario', tarot: 'La Estrella', palettes: { gd: 'rgb(224, 255, 255)', ari: 'rgb(128, 0, 128)', ort: 'rgb(0, 255, 255)', akashic: 'rgb(144, 238, 144)' }, energy: 'Justicia.', torah: { word: '', phonetic: '', cite: '', bio: '' }, sy_data: { type: 'FINAL', logic: '', diag: '', fix: '' }, tikkun: { light: 'Justicia Absoluta.', shadow: '' } }
};

// --- MAPAS DE NORMALIZACIÓN ---
export const MILUY_MAP: Record<string, string[]> = {
  'א': ['א', 'ל', 'ף'], 'ב': ['ב', 'י', 'ת'], 'ג': ['ג', 'מ', 'ל'], 'ד': ['ד', 'ל', 'ת'], 'ה': ['ה', 'ה'], 'ו': ['ו', 'א', 'ו'],
  'ז': ['ז', 'י', 'ן'], 'ח': ['ח', 'י', 'ת'], 'ט': ['ט', 'י', 'ת'], 'י': ['י', 'ו', 'ד'], 'כ': ['כ', 'ף'], 'ך': ['כ', 'ף'],
  'ל': ['ל', 'מ', 'ד'], 'מ': ['מ', 'ם'], 'ם': ['מ', 'ם'], 'נ': ['נ', 'ו', 'ן'], 'ן': ['נ', 'ו', 'ן'], 'ס': ['ס', 'מ', 'כ'],
  'ע': ['ע', 'י', 'ן'], 'פ': ['פ', 'א', 'י'], 'ף': ['פ', 'א', 'י'], 'צ': ['צ', 'ד', 'י'], 'ץ': ['צ', 'ד', 'י'], 'ק': ['ק', 'ו', 'ף'],
  'ר': ['ר', 'י', 'ש'], 'ש': ['ש', 'י', 'ן'], 'ת': ['ת', 'ו', 'י']
};

export const NORMALIZE_MAP: Record<string, string> = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };
export const KEYBOARD_LAYOUT = [ "אבגדהוזחטי", "כלמנסעפצקר", "שת" ];

// --- PALETA EXTENDIDA (Para Motor Perceptivo) ---
export const PALETTE = [
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

// --- CARTOGRAFÍA DE SABIDURÍA (Grafo) ---

// 1. Interfaces específicas para Graph Nodes/Edges
export interface WisdomNode {
  id: number;
  type: 'node';
  name_he: string;
  name_app: string;
  body_part: string;
  backend_function: string;
  color: string;
  ui_role: string;
}

export interface WisdomEdge {
  id: number;
  type: 'edge';
  letter: string;
  hebrew_char: string;
  class: string;
  source_node_id: number;
  target_node_id: number;
  app_function: string;
}

// 2. Unión de Tipos para el Array
export type WisdomItem = WisdomNode | WisdomEdge;

// AXIOMA: Cartografía Corregida (Sistema Kircher - Geometría Completa)
export const PATHS_OF_WISDOM: { paths_of_wisdom: WisdomItem[] } = {
  paths_of_wisdom: [
    // --- NODOS (SEFIROT) - CATEGORIZACIÓN ORTODOXA ---

    // --- NODO 1: CORONA (Keter) ---
    { "id": 1, "type": "node", "name_he": "Keter", "name_app": "Corona", "body_part": "Cráneo", "backend_function": "Input.", "color": "#F0F0F0", "ui_role": "root" },
    
    // --- TRÍADA SUPREMA (Emanación: Intelecto) ---
    { "id": 2, "type": "node", "name_he": "Jojmá", "name_app": "Sabiduría", "body_part": "Hemisferio Der.", "backend_function": "Flash.", "color": "#4C4C4C", "ui_role": "node" },
    { "id": 3, "type": "node", "name_he": "Biná", "name_app": "Entendimiento", "body_part": "Hemisferio Izq.", "backend_function": "Proceso.", "color": "#111111", "ui_role": "node" },
    
    // --- TRÍADA ÉTICA (Creación: Emoción Superior) ---
    { "id": 4, "type": "node", "name_he": "Jésed", "name_app": "Misericordia", "body_part": "Brazo Der.", "backend_function": "Expansión.", "color": "#2A52BE", "ui_role": "node" },
    { "id": 5, "type": "node", "name_he": "Gevurá", "name_app": "Severidad", "body_part": "Brazo Izq.", "backend_function": "Límite.", "color": "#A30000", "ui_role": "node" },
    { "id": 6, "type": "node", "name_he": "Tiféret", "name_app": "Belleza", "body_part": "Torso", "backend_function": "Balance.", "color": "#F1C40F", "ui_role": "center" },
    
    // --- TRÍADA ASTRAL (Formación: Emoción Inferior/Instinto) ---
    { "id": 7, "type": "node", "name_he": "Nétzaj", "name_app": "Victoria", "body_part": "Pierna Der.", "backend_function": "Ciclos.", "color": "#008080", "ui_role": "node" },
    { "id": 8, "type": "node", "name_he": "Hod", "name_app": "Esplendor", "body_part": "Pierna Izq.", "backend_function": "Eco.", "color": "#CC5500", "ui_role": "node" },
    { "id": 9, "type": "node", "name_he": "Yesod", "name_app": "Fundamento", "body_part": "Sexual", "backend_function": "Interfaz.", "color": "#8A2BE2", "ui_role": "node" },
    
    // --- NODO 10: REINO (Acción: Manifestación Física) ---
    { "id": 10, "type": "node", "name_he": "Maljut", "name_app": "Reino", "body_part": "Pies/Tierra", "backend_function": "Output.", "color": "#000000", "ui_role": "root" },

    // --- SENDEROS (22 LETRAS) ---
    // Triángulo Superior
    { "id": 11, "type": "edge", "letter": "Aleph", "hebrew_char": "א", "class": "Madre", "source_node_id": 1, "target_node_id": 2, "app_function": "Intención Pura." },
    { "id": 12, "type": "edge", "letter": "Bet", "hebrew_char": "ב", "class": "Doble", "source_node_id": 1, "target_node_id": 3, "app_function": "Contenedor." },
    { "id": 13, "type": "edge", "letter": "Gimel", "hebrew_char": "ג", "class": "Doble", "source_node_id": 1, "target_node_id": 6, "app_function": "Unificación." },
    { "id": 14, "type": "edge", "letter": "Dalet", "hebrew_char": "ד", "class": "Doble", "source_node_id": 2, "target_node_id": 3, "app_function": "Puerta del Conocimiento." },
    { "id": 15, "type": "edge", "letter": "He", "hebrew_char": "ה", "class": "Simple", "source_node_id": 2, "target_node_id": 6, "app_function": "Visión Clara." },
    { "id": 16, "type": "edge", "letter": "Vav", "hebrew_char": "ו", "class": "Simple", "source_node_id": 2, "target_node_id": 4, "app_function": "Conexión Divina." },
    
    // Triángulo Ético
    { "id": 17, "type": "edge", "letter": "Zayin", "hebrew_char": "ז", "class": "Simple", "source_node_id": 3, "target_node_id": 6, "app_function": "Discernimiento." },
    { "id": 18, "type": "edge", "letter": "Chet", "hebrew_char": "ח", "class": "Simple", "source_node_id": 3, "target_node_id": 5, "app_function": "Lenguaje." },
    { "id": 19, "type": "edge", "letter": "Tet", "hebrew_char": "ט", "class": "Simple", "source_node_id": 4, "target_node_id": 5, "app_function": "Fuerza Vital." },
    { "id": 20, "type": "edge", "letter": "Yod", "hebrew_char": "י", "class": "Simple", "source_node_id": 4, "target_node_id": 6, "app_function": "Concentración." },
    { "id": 21, "type": "edge", "letter": "Kaf", "hebrew_char": "כ", "class": "Doble", "source_node_id": 4, "target_node_id": 7, "app_function": "Potencial." },
    
    // Velo del Paroketh
    { "id": 22, "type": "edge", "letter": "Lamed", "hebrew_char": "ל", "class": "Simple", "source_node_id": 5, "target_node_id": 6, "app_function": "Justicia." },
    { "id": 23, "type": "edge", "letter": "Mem", "hebrew_char": "מ", "class": "Madre", "source_node_id": 5, "target_node_id": 8, "app_function": "Transformación." },
    { "id": 24, "type": "edge", "letter": "Nun", "hebrew_char": "נ", "class": "Simple", "source_node_id": 6, "target_node_id": 7, "app_function": "Renovación." },
    { "id": 25, "type": "edge", "letter": "Samekh", "hebrew_char": "ס", "class": "Simple", "source_node_id": 6, "target_node_id": 9, "app_function": "Sustento Cíclico." },
    { "id": 26, "type": "edge", "letter": "Ayin", "hebrew_char": "ע", "class": "Simple", "source_node_id": 6, "target_node_id": 8, "app_function": "Percepción." },
    
    // Triángulo Astral (Inferior)
    { "id": 27, "type": "edge", "letter": "Pe", "hebrew_char": "פ", "class": "Doble", "source_node_id": 7, "target_node_id": 8, "app_function": "Comunicación." },
    { "id": 28, "type": "edge", "letter": "Tzade", "hebrew_char": "צ", "class": "Simple", "source_node_id": 7, "target_node_id": 9, "app_function": "Meditación." },
    
    // --- CORRECCIÓN GEOMÉTRICA INFERIOR ---
    // Qof: Conecta Netzaj (7) con Maljut (10)
    { "id": 29, "type": "edge", "letter": "Qof", "hebrew_char": "ק", "class": "Simple", "source_node_id": 7, "target_node_id": 10, "app_function": "Evolución Corporal." },
    
    // Resh: Conecta Hod (8) con Yesod (9)
    { "id": 30, "type": "edge", "letter": "Resh", "hebrew_char": "ר", "class": "Doble", "source_node_id": 8, "target_node_id": 9, "app_function": "Intelecto Lógico." },
    
    // Shin: Conecta Hod (8) con Maljut (10)
    { "id": 31, "type": "edge", "letter": "Shin", "hebrew_char": "ש", "class": "Madre", "source_node_id": 8, "target_node_id": 10, "app_function": "Juicio Material." },
    
    // Tav: Conecta Yesod (9) con Maljut (10)
    { "id": 32, "type": "edge", "letter": "Tav", "hebrew_char": "ת", "class": "Doble", "source_node_id": 9, "target_node_id": 10, "app_function": "Sello Final." }
  ]
};