import { keys } from '../lib/keycaps'
import type {
  BlockForKeyboard,
  CompleteKeysList,
  KeyboardBlock,
  KeysList,
} from '../types/keyboardContent'

// Keycaps lists
export const specialKeysCaps: CompleteKeysList = {
  inline: ['BACK', 'FWD', 'DEL', 'CLOSE'],
  block: ['BACK', 'FWD', 'DEL', 'CLOSE'],
}
const numbersCaps: CompleteKeysList = {
  inline: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'COMMA', 'PI'],
  block: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, 'COMMA', 'PI'],
}
const complexesCap: CompleteKeysList = {
  inline: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    'iComplex',
    'ADD',
    'SUB',
    'FRAC',
    'POW',
    'PI',
    'COMMA',
    'PARENTHESES',
    'SQRT',
    'e^',
    'COS',
    'SIN',
    'THETA',
    'NORM',
  ],
  block: [
    7,
    8,
    9,
    'iComplex',
    'FRAC',
    'COS',
    4,
    5,
    6,
    'ADD',
    'POW',
    'SIN',
    1,
    2,
    3,
    'SUB',
    'PI',
    'THETA',
    0,
    'COMMA',
    'PARENTHESES',
    'SQRT',
    'e^',
    'NORM',
  ],
}
const numbersCaps2: CompleteKeysList = {
  inline: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'COMMA', '='],
  block: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, 'COMMA', '='],
}
const numbersCapsX: CompleteKeysList = {
  inline: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'COMMA', 'xMath'],
  block: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, 'COMMA', 'xMath'],
}
const numbersOperationsCaps: CompleteKeysList = {
  inline: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    'COMMA',
    'PI',
    'DIV',
    'MULT',
    'SUB',
    'ADD',
  ],
  block: [
    7,
    8,
    9,
    'DIV',
    4,
    5,
    6,
    'MULT',
    1,
    2,
    3,
    'SUB',
    0,
    'COMMA',
    'PI',
    'ADD',
  ],
}
const numbersOperationsXCaps: CompleteKeysList = {
  inline: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    'COMMA',
    'xMath',
    'DIV',
    'MULT',
    'SUB',
    'ADD',
  ],
  block: [
    7,
    8,
    9,
    'DIV',
    4,
    5,
    6,
    'MULT',
    1,
    2,
    3,
    'SUB',
    0,
    'COMMA',
    'xMath',
    'ADD',
  ],
}
const numbersSpaceCaps: CompleteKeysList = {
  inline: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    'COMMA',
    'SPACE',
    'DIV',
    'MULT',
    'SUB',
    'ADD',
  ],
  block: [
    1,
    2,
    3,
    'DIV',
    4,
    5,
    6,
    'MULT',
    7,
    8,
    9,
    'SUB',
    0,
    'COMMA',
    'SPACE',
    'ADD',
  ],
}
const variableCaps: CompleteKeysList = {
  inline: [
    'aMath',
    'bMath',
    'cMath',
    'xMath',
    'yMath',
    'zMath',
    'kMath',
    'nMath',
    'iMath',
    'e',
    'V',
    'F',
  ],
  block: [
    'aMath',
    'xMath',
    'kMath',
    'bMath',
    'yMath',
    'nMath',
    'cMath',
    'zMath',
    'iMath',
    'e',
    'V',
    'F',
  ],
}
const basicOperationCaps: CompleteKeysList = {
  inline: ['ADD', 'SUB', 'MULT', 'DIV', 'SQ', 'FRAC', '(', ')'],
  block: ['ADD', 'SUB', 'MULT', 'DIV', 'SQ', 'FRAC', '(', ')'],
}
const basicOperationPlusCaps: CompleteKeysList = {
  inline: [
    'ADD',
    'SUB',
    'MULT',
    'DIV',
    'xMath',
    'SQ',
    'POW',
    'FRAC',
    '(',
    ')',
    'BRACKETS',
    'SEMICOLON',
  ],
  block: [
    'xMath',
    'ADD',
    'SUB',
    'SQ',
    'MULT',
    'DIV',
    'POW',
    'BRACKETS',
    'FRAC',
    'SEMICOLON',
    '(',
    ')',
  ],
}
const basicOperationCaps2: CompleteKeysList = {
  inline: ['ADD', 'SUB', 'MULT', 'DIV', '=', 'FRAC', '(', ')'],
  block: ['ADD', 'SUB', 'MULT', 'DIV', '=', 'FRAC', '(', ')'],
}
const fullOperationCaps: CompleteKeysList = {
  inline: [
    'ADD',
    'SUB',
    'MULT',
    'DIV',
    'FRAC',
    '=',
    '(',
    ')',
    'xMath',
    'SQRT',
    'SQ',
    'POW',
    'POW10',
    'DEG',
    'PERCENT',
    'SEMICOLON',
  ],
  block: [
    'ADD',
    'SUB',
    'xMath',
    'DEG',
    'MULT',
    'DIV',
    'SQ',
    'SQRT',
    '(',
    ')',
    'POW',
    'PERCENT',
    '=',
    'FRAC',
    'POW10',
    'SEMICOLON',
  ],
}
const terminaleCaps: CompleteKeysList = {
  inline: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    'LOG',
    'LN',
    'POW',
    'FRAC',
    'SEMICOLON',
    'COMMA',
    'DIV',
    'MULT',
    'SUB',
    'ADD',
    'SQRT',
    'SQRTN',
    'e^',
    'INFTY',
    'PARENTHESES',
    'POW10',
    'BRACES',
    'BRACKETS',
  ],
  block: [
    'SQRT',
    'SQRTN',
    'LN',
    'LOG',
    7,
    8,
    9,
    'POW',
    'e^',
    'FRAC',
    'INFTY',
    4,
    5,
    6,
    'POW10',
    'PARENTHESES',
    'BRACES',
    'xMath',
    1,
    2,
    3,
    'ADD',
    'SUB',
    'MULT',
    'DIV',
    0,
    'COMMA',
    'SEMICOLON',
  ],
}

const numerationCaps: CompleteKeysList = {
  inline: [
    'MILLIARD',
    'MILLION',
    'MILLE',
    'CENTAINE',
    'DIZAINE',
    'UNITE',
    'DE',
    'DIXIEME',
    'CENTIEME',
    'MILLIEME',
    'DIX_MILLIEME',
    'CENT_MILLIEME',
    'MILLIONIEME',
    'HYPHEN',
    'DIX',
    'VINGT',
    'TRENTE',
    'QUARANTE',
    'CINQUANTE',
    'SOIXANTE',
    'SOIXANTE_DIX',
    'QUATRE_VINGT',
    'QUATRE_VINGT_DIX',
    'CENT',
  ],
  block: [
    'MILLIARD',
    'MILLION',
    'MILLE',
    'CENTAINE',
    'DIZAINE',
    'UNITE',
    'DE',
    'DIXIEME',
    'CENTIEME',
    'MILLIEME',
    'DIX_MILLIEME',
    'CENT_MILLIEME',
    'MILLIONIEME',
    'HYPHEN',
    'DIX',
    'VINGT',
    'TRENTE',
    'QUARANTE',
    'CINQUANTE',
    'SOIXANTE',
    'SOIXANTE_DIX',
    'QUATRE_VINGT',
    'QUATRE_VINGT_DIX',
    'CENT',
  ],
}

const probabiliteCaps: CompleteKeysList = {
  inline: [
    'PROB',
    'BINOM',
    'OVERLINE',
    'UNION',
    'INTER',
    'EMPTY',
    'SEMICOLON',
    'PARENTHESES',
    'POW',
    'INDICE',
    'QUOTE',
    '=',
  ],
  block: [
    'PROB',
    'BINOM',
    'OVERLINE',
    'UNION',
    'INTER',
    'EMPTY',
    'SEMICOLON',
    'PARENTHESES',
    'POW',
    'INDICE',
    'QUOTE',
    '=',
  ],
}

const ensembleCaps: CompleteKeysList = {
  inline: [
    'ADD',
    'SUB',
    'INFTY',
    'BRACES',
    '[',
    ']',
    'IN',
    'SEMICOLON',
    'FRAC',
    'SQRT',
    'POW',
    'POW10',
  ],
  block: [
    'ADD',
    'SUB',
    'INFTY',
    'BRACES',
    '[',
    ']',
    'IN',
    'SEMICOLON',
    'FRAC',
    'SQRT',
    'POW',
    'POW10',
  ],
}

const ensembleDefiniCaps: CompleteKeysList = {
  inline: [
    'COMP',
    'REAL',
    'RATIO',
    'DECIMAL',
    'REL',
    'INTEG',
    'EMPTY',
    'UNION',
    'INTER',
  ],
  block: [
    'COMP',
    'REAL',
    'RATIO',
    'DECIMAL',
    'REL',
    'INTEG',
    'EMPTY',
    'UNION',
    'INTER',
  ],
}

const suiteCaps: CompleteKeysList = {
  inline: [
    'U_INDICE_N',
    'V_INDICE_N',
    'W_INDICE_N',
    'C_INDICE_N',
    'nMath',
    'kMath',
    'INDICE_N',
    'INDICE',
  ],
  block: [
    'U_INDICE_N',
    'V_INDICE_N',
    'W_INDICE_N',
    'C_INDICE_N',
    'nMath',
    'kMath',
    'INDICE_N',
    'INDICE',
  ],
}

const hmsCaps: CompleteKeysList = {
  inline: ['WEEK', 'DAY', 'HOUR', 'MIN', 'SEC'],
  block: ['WEEK', 'DAY', 'HOUR', 'MIN', 'SEC'],
}

const greekCaps: CompleteKeysList = {
  inline: [
    'ALPHA',
    'BETA',
    'GAMMA',
    'DELTA',
    'EPSILON',
    'THETA',
    'LAMBDA',
    'OMEGA',
  ],
  block: [
    'ALPHA',
    'BETA',
    'GAMMA',
    'DELTA',
    'EPSILON',
    'THETA',
    'LAMBDA',
    'OMEGA',
  ],
}

const compareCaps: CompleteKeysList = {
  inline: ['LESS', 'GREAT', '=', 'LESSEQ', 'GREATEQ'],
  block: ['LESS', 'GREAT', '=', 'LESSEQ', 'GREATEQ'],
}

const degreCaps: CompleteKeysList = {
  inline: ['DEG'],
  block: ['DEG'],
}

const degreCelsiusCaps: CompleteKeysList = {
  inline: ['DEGCELSIUS'],
  block: ['DEGCELSIUS'],
}

const trigoCaps: CompleteKeysList = {
  inline: ['COS', 'SIN', 'TAN', 'ANG'],
  block: ['COS', 'SIN', 'TAN', 'ANG'],
}

const advancedCaps: CompleteKeysList = {
  inline: [
    'FCT',
    'LIM',
    'INT',
    'SIGMA',
    'BINOM', //
    'UNION',
    'INTER',
    'INFTY',
    'EMPTY',
    'PROB', //
    'VECT',
    'BRACKETS',
    'BRACES',
    'LESSEQ',
    'GREATEQ', //
    'COMP',
    'REAL',
    'RATIO',
    'REL',
    'INTEG',
  ],
  block: [
    'FCT',
    'LIM',
    'INT',
    'SIGMA',
    'BINOM', //
    'UNION',
    'INTER',
    'INFTY',
    'EMPTY',
    'PROB', //
    'VECT',
    'BRACKETS',
    'BRACES',
    'LESSEQ',
    'GREATEQ', //
    'COMP',
    'REAL',
    'RATIO',
    'REL',
    'INTEG',
  ],
}

const anglesCaps: CompleteKeysList = {
  inline: ['ANG', 'DEG', 'QUOTE', '='],
  block: ['ANG', 'DEG', 'QUOTE', '='],
}

const aToHCaps: CompleteKeysList = {
  inline: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  block: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
}

const iToPCaps: CompleteKeysList = {
  inline: ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
  block: ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
}

const qToWCaps: CompleteKeysList = {
  inline: ['Q', 'R', 'S', 'T', 'U', 'V', 'W'],
  block: ['Q', 'R', 'S', 'T', 'U', 'V', 'W'],
}

const xToZCaps: CompleteKeysList = {
  inline: ['X', 'Y', 'Z'],
  block: ['X', 'Y', 'Z'],
}

const vFONCaps: CompleteKeysList = {
  inline: ['V', 'F', 'O', 'N'],
  block: ['V', 'F', 'O', 'N'],
}

const eosnCaps: CompleteKeysList = {
  inline: ['O', 'E', 'S', 'N', 'DEG', 'SEMICOLON'],
  block: ['O', 'E', 'S', 'N', 'DEG', 'SEMICOLON'],
}

// @ts-expect-error Problème de typage
const lengthUnitsKeys = Object.keys(keys)
  .filter((k) => k.includes('LENGTH'))
  .reduce((prev, k) => Object.assign(prev, { [k]: keys[k] }), {})
const lengthsCaps: CompleteKeysList = {
  inline: Object.keys(lengthUnitsKeys) as KeysList,
  block: Object.keys(lengthUnitsKeys) as KeysList,
}

// @ts-expect-error Problème de typage
const areasUnitsKeys = Object.keys(keys)
  .filter((k) => k.includes('AREA'))
  .reduce((prev, k) => Object.assign(prev, { [k]: keys[k] }), {})
const areasCaps: CompleteKeysList = {
  inline: Object.keys(areasUnitsKeys) as KeysList,
  block: Object.keys(areasUnitsKeys) as KeysList,
}

// @ts-expect-error Problème de typage
const volumesUnitsKeys = Object.keys(keys)
  .filter((k) => k.includes('VOLUME'))
  .reduce((prev, k) => Object.assign(prev, { [k]: keys[k] }), {})
const volumesCaps: CompleteKeysList = {
  inline: Object.keys(volumesUnitsKeys) as KeysList,
  block: Object.keys(volumesUnitsKeys) as KeysList,
}

// @ts-expect-error Problème de typage
const capacitiesUnitsKeys = Object.keys(keys)
  .filter((k) => k.includes('CAPACITY'))
  .reduce((prev, k) => Object.assign(prev, { [k]: keys[k] }), {})
const capacitiesCaps: CompleteKeysList = {
  inline: Object.keys(capacitiesUnitsKeys) as KeysList,
  block: Object.keys(capacitiesUnitsKeys) as KeysList,
}

// @ts-expect-error Problème de typage
const massesUnitsKeys = Object.keys(keys)
  .filter((k) => k.includes('MASS'))
  .reduce((prev, k) => Object.assign(prev, { [k]: keys[k] }), {})
const massesCaps: CompleteKeysList = {
  inline: Object.keys(massesUnitsKeys) as KeysList,
  block: Object.keys(massesUnitsKeys) as KeysList,
}

export const specialKeys: KeyboardBlock = {
  keycaps: specialKeysCaps,
  cols: 1,
  title: 'Touches spéciales',
  isUnits: false,
}

export const complexes: KeyboardBlock = {
  keycaps: complexesCap,
  cols: 6,
  title: 'Nombres complexes',
  isUnits: false,
}

export const numbers: KeyboardBlock = {
  keycaps: numbersCaps,
  cols: 3,
  title: 'Nombres',
  isUnits: false,
}
export const numbersX: KeyboardBlock = {
  keycaps: numbersCapsX,
  cols: 3,
  title: 'Nombres',
  isUnits: false,
}
export const numbers2: KeyboardBlock = {
  keycaps: numbersCaps2,
  cols: 3,
  title: 'Nombres',
  isUnits: false,
}
export const numbersOperations: KeyboardBlock = {
  keycaps: numbersOperationsCaps,
  cols: 4,
  title: 'Nombres+Opérations',
  isUnits: false,
}

export const numbersOperationsX: KeyboardBlock = {
  keycaps: numbersOperationsXCaps,
  cols: 4,
  title: 'Nombres+Opérations',
  isUnits: false,
}

export const numbersSpace: KeyboardBlock = {
  keycaps: numbersSpaceCaps,
  cols: 4,
  title: 'Nombres',
  isUnits: false,
}

export const variables: KeyboardBlock = {
  keycaps: variableCaps,
  cols: 3,
  title: 'Variables',
  isUnits: false,
}

export const vFON: KeyboardBlock = {
  keycaps: vFONCaps,
  cols: 1,
  title: 'Vrai/Faux/Impossible',
  isUnits: false,
}

export const basicOperations: KeyboardBlock = {
  keycaps: basicOperationCaps,
  cols: 2,
  title: 'Opérations de base',
  isUnits: false,
}

export const basicOperations2: KeyboardBlock = {
  keycaps: basicOperationCaps2,
  cols: 2,
  title: 'Opérations de base',
  isUnits: false,
}

export const basicOperationsPlus: KeyboardBlock = {
  keycaps: basicOperationPlusCaps,
  cols: 3,
  title: 'Opérations de base',
  isUnits: false,
}

export const fullOperations: KeyboardBlock = {
  keycaps: fullOperationCaps,
  cols: 4,
  title: 'Opérations complexes',
  isUnits: false,
}

export const clavierFonctionsTerminales: KeyboardBlock = {
  keycaps: terminaleCaps,
  cols: 7,
  title: 'Fonctions de Terminales',
  isUnits: false,
}

export const numeration: KeyboardBlock = {
  keycaps: numerationCaps,
  cols: 6,
  title: 'Logarithme et puissance',
  isUnits: false,
}

export const probabilite: KeyboardBlock = {
  keycaps: probabiliteCaps,
  cols: 3,
  title: 'Probabilités',
  isUnits: false,
}

export const hms: KeyboardBlock = {
  keycaps: hmsCaps,
  cols: 1,
  title: 'Temps',
  isUnits: true,
}

export const greek: KeyboardBlock = {
  keycaps: greekCaps,
  cols: 2,
  title: 'Lettres grecques',
  isUnits: false,
}

export const compare: KeyboardBlock = {
  keycaps: compareCaps,
  cols: 3,
  title: 'Comparaison',
  isUnits: false,
}

export const degre: KeyboardBlock = {
  keycaps: degreCaps,
  cols: 1,
  title: 'Degré',
  isUnits: true,
}

export const degreCelsius: KeyboardBlock = {
  keycaps: degreCelsiusCaps,
  cols: 1,
  title: 'Degré Celsius',
  isUnits: true,
}

export const trigo: KeyboardBlock = {
  keycaps: trigoCaps,
  cols: 1,
  title: 'Trigonométrie',
  isUnits: false,
}
export const advanced: KeyboardBlock = {
  keycaps: advancedCaps,
  cols: 5,
  title: 'Fonctions avancées',
  isUnits: false,
}

export const lengths: KeyboardBlock = {
  keycaps: lengthsCaps,
  cols: 2,
  title: 'Longueurs',
  isUnits: true,
}

export const areas: KeyboardBlock = {
  keycaps: areasCaps,
  cols: 3,
  title: 'Aires',
  isUnits: true,
}

export const ensemble: KeyboardBlock = {
  keycaps: ensembleCaps,
  cols: 3,
  title: 'Ensembles',
  isUnits: false,
}

export const ensembleDefini: KeyboardBlock = {
  keycaps: ensembleDefiniCaps,
  cols: 3,
  title: 'EnsemblesDefinis',
  isUnits: false,
}

export const suite: KeyboardBlock = {
  keycaps: suiteCaps,
  cols: 2,
  title: 'Suites',
  isUnits: false,
}

export const volumes: KeyboardBlock = {
  keycaps: volumesCaps,
  cols: 2,
  title: 'Volumes',
  isUnits: true,
}

export const capacities: KeyboardBlock = {
  keycaps: capacitiesCaps,
  cols: 2,
  title: 'Capacités',
  isUnits: true,
}

export const masses: KeyboardBlock = {
  keycaps: massesCaps,
  cols: 2,
  title: 'Masses',
  isUnits: true,
}

export const angles: KeyboardBlock = {
  keycaps: anglesCaps,
  cols: 1,
  title: 'Angles',
  isUnits: false,
}

export const uppercaseAToH: KeyboardBlock = {
  keycaps: aToHCaps,
  cols: 2,
  title: 'Majuscules: A à H',
  isUnits: false,
}

export const uppercaseIToP: KeyboardBlock = {
  keycaps: iToPCaps,
  cols: 2,
  title: 'Majuscules: I à P',
  isUnits: false,
}

export const uppercaseQToW: KeyboardBlock = {
  keycaps: qToWCaps,
  cols: 2,
  title: 'Majuscules: Q à W',
  isUnits: false,
}

export const uppercaseXToZ: KeyboardBlock = {
  keycaps: xToZCaps,
  cols: 1,
  title: 'Majuscules: X à Z',
  isUnits: false,
}

export const estOuestSudNord: KeyboardBlock = {
  keycaps: eosnCaps,
  cols: 2,
  title: 'Points cardinaux',
  isUnits: false,
}

export const keyboardBlocks: {
  [key in Exclude<BlockForKeyboard, 'alphanumeric'>]: KeyboardBlock
} = {
  advanced,
  angles,
  areas,
  basicOperations,
  basicOperations2,
  basicOperationsPlus,
  capacities,
  compare,
  complexes,
  degre,
  degreCelsius,
  ensemble,
  ensembleDefini,
  suite,
  greek,
  fullOperations,
  hms,
  lengths,
  clavierFonctionsTerminales,
  masses,
  numbers,
  numbersSpace,
  numbersX,
  numbers2,
  numbersOperations,
  numbersOperationsX,
  numeration,
  probabilite,
  trigo,
  variables,
  volumes,
  vFON,
  uppercaseAToH,
  uppercaseIToP,
  uppercaseQToW,
  uppercaseXToZ,
  estOuestSudNord,
}
