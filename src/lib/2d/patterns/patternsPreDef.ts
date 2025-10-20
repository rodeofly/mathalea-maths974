import FractionEtendue from '../../../modules/FractionEtendue'
import { Ratio } from '../../mathFonctions/Ratio'
import { listeShapes2DInfos } from '../figures2d/shapes2d'
import { VisualPattern } from './VisualPattern'
import { VisualPattern3D } from './VisualPattern3D'
type Shape = keyof typeof listeShapes2DInfos
type ShapeInfo = (typeof listeShapes2DInfos)[Shape]
export type PatternRiche = {
  visualImg?: string
  visualId?: number
  numero: number
  shapes: Shape[]
  fonctionNb: (x: number) => number
  fonctionFraction?: (x: number) => FractionEtendue
  fonctionRatio?: (x: number) => Ratio
  texRatio?: string
  formule: string
  type: 'linéaire' | 'affine' | 'degré2' | 'degré3' | 'autre' | 'fractal'
  pattern?: VisualPattern
  iterate: (this: VisualPattern, n?: number) => Set<string>
}
export type PatternRiche3D = {
  visualImg?: string
  visualId?: number
  numero: number
  shapes: string[]
  fonctionNb: (x: number) => number
  fonctionFraction?: (x: number) => FractionEtendue
  fonctionRatio?: (x: number) => Ratio
  formule: string
  type: 'linéaire' | 'affine' | 'degré2' | 'degré3' | 'autre' | 'fractal'
  pattern?: VisualPattern3D
  iterate3d: (this: VisualPattern3D, angle: number) => Set<string>
}
export type PatternRicheRepetition = {
  visualImg?: string
  visualId?: number
  nbMotifMin: number
  shapes: Shape[]
  numero?: number
  formule?: string
  fonctionShape: (x: number) => ShapeInfo
  pattern?: VisualPattern
  iterate: (this: VisualPattern, n?: number) => Set<string>
}

/**
 * Trie les coordonnées de cubes dans l'espace pour que les cubes du dessus ou de droite
 * recouvrent ceux du dessous ou de gauche.
 * On trie d'abord par z croissant (du bas vers le haut), puis par y croissant (de gauche à droite),
 * puis par x croissant (de l'arrière vers l'avant).
 */
const rangeCubes = function (
  coords: [number, number, number, string][],
): [number, number, number, string][] {
  // Regrouper par z croissant
  const byZ = new Map<number, [number, number, number, string][]>()
  for (const coord of coords) {
    const z = coord[2]
    if (!byZ.has(z)) byZ.set(z, [])
    const [x, y, zCoord, w] = coord
    byZ
      .get(z)!
      .push([
        x,
        y,
        zCoord,
        w !== undefined ? w : 'cube-trois-couleurs-tube-edges',
      ]) // On ne garde que les 3 premières coordonnées, w est forcé à number
  }
  const result: [number, number, number, string][] = []
  const zs = Array.from(byZ.keys()).sort((a, b) => a - b)
  for (const z of zs) {
    const groupZ = byZ.get(z)!
    // Regrouper par y décroissant dans chaque z
    const byY = new Map<number, [number, number, number, string][]>()
    for (const coord of groupZ) {
      const y = coord[1]
      if (!byY.has(y)) {
        byY.set(y, [])
      }
      const w =
        coord[3] !== undefined ? coord[3] : 'cube-trois-couleurs-tube-edges' // On force w à number
      byY.get(y)!.push([coord[0], y, z, w]) // On garde les 3 premières coordonnées, w est forcé à number
    }
    const ys = Array.from(byY.keys()).sort((a, b) => b - a)
    for (const y of ys) {
      const groupY = byY.get(y)!
      // Trier par x croissant dans chaque (z, y)
      groupY.sort((a, b) => a[0] - b[0])
      result.push(...groupY)
    }
  }
  return result
}

// Il faudra peut-être trouver un moyen de classer les patterns.

const pattern1: PatternRiche = {
  numero: 1,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/5da32a25-8bdd-4072-bd76-5e94635ba57d/vp11_2.png?format=2500w',
  visualId: 11,
  shapes: ['soleil'],
  fonctionNb: (x: number) => 2 * x + 1,
  formule: '2\\times n + 1',
  type: 'affine',
  iterate: function (this: VisualPattern, n?: number): Set<string> {
    const newCells = new Set<string>()
    if (n === undefined) n = 1
    for (let i = 1; i <= n; i++) {
      newCells.add(VisualPattern.coordToKey([i, 0, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([0, i, this.shapes[0]]))
    }
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]]))

    return newCells
  },
}

const pattern2: PatternRiche = {
  numero: 2,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/54e5912a-d7ae-4d39-82ba-c0a3822ba19c/2020-09-26-09-37-38_orig+%281%29.jpg?format=2500w',
  visualId: 1,
  shapes: ['carré'],
  fonctionNb: (x: number) => x * x,
  formule: 'n^2',
  type: 'degré2',
  iterate: function (this: VisualPattern, n: number = 1): Set<string> {
    const newCells = new Set<string>()
    if (n === undefined) n = 1
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    return newCells
  },
}

const pattern3: PatternRiche = {
  numero: 3,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/bae949b2-d658-41ad-a0ab-ff08226865f3/vp10_2_orig.png?format=2500w',
  visualId: 10,
  shapes: ['carré'],
  fonctionNb: (x: number) => 2 * x - 1,
  formule: '2\\times n -1',
  type: 'affine',
  iterate: function (this: VisualPattern, n) {
    const newCells = new Set<string>()
    if (n === undefined) n = 1
    newCells.add(VisualPattern.coordToKey([0, 1, this.shapes[0]]))
    for (let i = 1; i < n; i++) {
      newCells.add(VisualPattern.coordToKey([i - 1, 0, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([i, 1, this.shapes[0]]))
    }
    return newCells
  },
}

const pattern4: PatternRiche = {
  numero: 4,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/65bbb191-819f-42aa-b269-3c393e88a68b/8497466_orig+%281%29.png?format=2500w',
  visualId: 32,

  shapes: ['carré'],
  fonctionNb: (x: number) => x * x + x,
  formule: 'n^2 + n',
  type: 'degré2',
  iterate: function (this: VisualPattern, n: number = 1): Set<string> {
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= n; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    return newCells
  },
}

const pattern5: PatternRiche = {
  numero: 5,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/79dbcbbf-d2b5-4578-857e-fcdccb4fb8af/2023-03-22-10-30-31.png?format=2500w',
  visualId: 3,
  shapes: ['carré'],
  fonctionNb: (n: number) => (n * (n + 1)) / 2,
  formule: '\\dfrac{n\\times (n+1)}{2}',
  type: 'degré2',
  iterate: function (this: VisualPattern, n: number = 1): Set<string> {
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      for (let j = n - 1; j >= 0; j--) {
        if (i + j < n) {
          newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
        }
      }
    }
    return newCells
  },
}

const pattern6: PatternRiche = {
  numero: 6,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/272cb8f2-585b-4b90-aca5-a115fe8b555d/vp5_3.png?format=2500w',
  visualId: 4,
  shapes: ['carré'],
  fonctionNb: (n: number) => 4 * n + 1,
  formule: '4\\times n + 1',
  type: 'affine',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let x = 0; x <= 2 * n; x++) {
      for (let y = 0; y <= 2 * n; y++) {
        if (x === y || x + y === 2 * n) {
          newCells.add(VisualPattern.coordToKey([x, y, this.shapes[0]]))
        }
      }
    }
    return newCells
  },
}

const pattern7: PatternRiche = {
  numero: 7,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/a3f4ea08-cdcb-46c2-bcc8-bd6aa2722f96/720875_orig.png?format=2500w',
  visualId: 15,
  shapes: ['carré'],
  fonctionNb: (n: number) => 4 * n + 1,
  formule: '4\\times n + 1',
  type: 'affine',
  iterate: function (this: VisualPattern, n: number = 1): Set<string> {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      if (i === 0) {
        newCells.add(VisualPattern.coordToKey([0, 1, this.shapes[0]]))
      }
      newCells.add(VisualPattern.coordToKey([i * 2 + 1, 2, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([i * 2 + 1, 0, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([i * 2 + 1, 1, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([i * 2 + 1 + 1, 1, this.shapes[0]]))
    }
    return newCells
  },
}

const pattern8: PatternRiche = {
  numero: 8,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/bda4693c-4923-4c87-a3a1-06ef7762c45f/4203089_orig.png?format=2500w',
  visualId: 16,
  shapes: ['carré'],
  fonctionNb: (x: number) => x * x,
  formule: 'n^2',
  type: 'degré2',
  iterate: function (this: VisualPattern, n) {
    const newCells = new Set<string>()
    if (n === undefined) n = 1
    for (let i = 0; i < n; i++) {
      // de ligne 0 à n
      let x = i
      for (let j = i; j < 2 * n - i - 1; j++) {
        // la ligne commence à i et finit à
        newCells.add(VisualPattern.coordToKey([x++, i, this.shapes[0]]))
      }
    }
    return newCells
  },
}

const pattern9: PatternRiche = {
  numero: 9,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/09099fb7-f01e-49d4-a328-25507dde66e5/4982399.png?format=2500w',
  visualId: 101,
  shapes: ['carré'],
  fonctionNb: (x: number) => x ** 2 + 4,
  formule: 'n^2 + 4',
  type: 'degré2',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([1 + n, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([0, 1 + n, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([1 + n, 1 + n, this.shapes[0]]))
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    return newCells
  },
}

const pattern10: PatternRiche = {
  numero: 10,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/9f3f398b-13e6-45a1-8929-446af89cb1d6/2020-09-08-09-47-44_orig.png?format=2500w',
  visualId: 391,
  shapes: ['carré'],
  fonctionNb: (x: number) => x * x + 2 * x,
  formule: '(n+1)^2-1',
  type: 'degré2',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n; j++) {
        if (!(i === n && j === n)) {
          newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
        }
      }
    }
    return newCells
  },
}

const pattern11: PatternRiche = {
  numero: 11,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/9ef9630a-170f-41ec-9b43-a698a57cfa0e/vp22_orig.png?format=2500w',
  visualId: 296,
  shapes: ['carré'],
  fonctionNb: (x: number) => 4 * x + 4,
  formule: '4\\times n + 4',
  type: 'affine',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i <= n + 1; i++) {
      for (let j = 0; j <= n + 1; j++) {
        if (i === 0 || i === n + 1 || j === 0 || j === n + 1) {
          newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
        }
      }
    }
    return newCells
  },
}

// J'ai decidé de décaler le rang du pattern sur l'image le rang 1 correspond à mon rang 2.
const pattern12: PatternRiche = {
  numero: 12,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/d2fc2e2a-14e2-4446-85c0-3ba743bb5adf/8815256_orig.png?format=2500w',
  visualId: 108,
  shapes: ['carré'],
  fonctionNb: (x: number) => x * x + 1,
  formule: 'n^2 + 1',
  type: 'degré2',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([n, n, this.shapes[0]]))
    for (let i = 1; i < n; i++) {
      for (let j = 0; j <= n; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    return newCells
  },
}

// J'ai decidé de décaler le rang du pattern sur l'image le rang 1 correspond à mon rang 2.
const pattern13: PatternRiche = {
  numero: 13,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/7fc51d33-c4af-4d94-9786-b7d75aab62a8/2163990_orig.png?format=2500w',
  visualId: 114,
  shapes: ['carré'],
  fonctionNb: (x: number) => 3 * x,
  formule: '3\\times n',
  type: 'linéaire',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i <= n; i++) {
      if (i === 0) {
        newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]]))
      } else {
        newCells.add(VisualPattern.coordToKey([i, 0, this.shapes[0]]))
        newCells.add(VisualPattern.coordToKey([0, i, this.shapes[0]]))
        if (i > 1)
          newCells.add(VisualPattern.coordToKey([i - 1, i - 1, this.shapes[0]]))
      }
    }
    return newCells
  },
}

const pattern14: PatternRiche = {
  numero: 14,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/1098eb03-4083-40d7-9d63-c4cbc87f1093/682934_orig.png?format=2500w',
  visualId: 115,
  shapes: ['carré'],
  fonctionNb: (x: number) => 7 * x,
  formule: '7\\times n',
  type: 'linéaire',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let j = 0; j <= 3; j++) {
      for (let i = 0; i <= 2 * n; i++) {
        if (j < 2) {
          if (i > 0 && i < 2 * n) {
            newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
          }
        }
        if (j === 2) {
          newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
        }
        if (j === 3) {
          if (i % 2 === 0) {
            newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
          }
        }
      }
    }
    return newCells
  },
}

const pattern15: PatternRiche = {
  numero: 15,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/c3792615-d769-4c6b-a0f5-5c4397fe5d1b/7970874_orig.png?format=2500w',
  visualId: 116,
  shapes: ['carré'],
  fonctionNb: (x: number) => 8 * x - 1,
  formule: '8\\times n - 1',
  type: 'affine',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let j = 0; j <= 4; j++) {
      for (let i = 0; i <= 2 * n; i++) {
        if (j < 2) {
          if (i > 0 && i < 2 * n) {
            newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
          }
        }
        if (j === 2) {
          newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
        }
        if (j === 3) {
          if (i % 2 === 0) {
            newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
          }
        }
        if (j === 4) {
          if (i % 2 === 0 && i > 1 && i < 2 * n) {
            newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
          }
        }
      }
    }
    return newCells
  },
}

const pattern16: PatternRiche = {
  numero: 16,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/b9f7df36-66e8-452a-8619-06c1161736a3/2023-07-03_05-43-43.png?format=2500w',
  visualId: 128,
  shapes: ['carré'],
  fonctionNb: (x: number) => 4 * x - 3,
  formule: '4\\times n - 3',
  type: 'affine',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    if (n === 1) {
      newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]]))
    } else {
      for (let i = 1; i < n; i++) {
        newCells.add(VisualPattern.coordToKey([i, 1, this.shapes[0]]))
        newCells.add(VisualPattern.coordToKey([i + 1, 1, this.shapes[0]]))
        newCells.add(
          VisualPattern.coordToKey([0.5 + (i - 1) * 3, 0, this.shapes[0]]),
        )
        newCells.add(
          VisualPattern.coordToKey([1.5 + (i - 1) * 3, 0, this.shapes[0]]),
        )
        newCells.add(
          VisualPattern.coordToKey([2.5 + (i - 1) * 3, 0, this.shapes[0]]),
        )
      }
    }
    return newCells
  },
}

const pattern17: PatternRiche = {
  numero: 17,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/a9b947a5-1a65-49cd-ab8d-ff824ffbf718/2023-07-03_04-23-55.png?format=2500w',
  visualId: 85,
  shapes: ['carré'],
  fonctionNb: (x: number) => 2 * (x * x + x),
  formule: '2\\times (n^2 +  n)',
  type: 'degré2',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        newCells.add(VisualPattern.coordToKey([n + i, n + j, this.shapes[0]]))
      }
    }
    return newCells
  },
}

const pattern18: PatternRiche = {
  numero: 18,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/fbb334a6-f77e-402d-b438-c78f294ff6b3/2023-07-17_06-56-59.png?format=2500w',
  visualId: 93,
  shapes: ['carré'],
  fonctionNb: (x: number) => 2 + 2 * x * (1 + x),
  formule: '2\\times (n^2+2\\times n + 1)',
  type: 'degré2',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 1, this.shapes[0]]))
    for (let j = 0; j < 2 * n + 2; j++) {
      for (let i = 1; i <= n; i++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    newCells.add(VisualPattern.coordToKey([n + 1, 1, this.shapes[0]]))
    return newCells
  },
}

const pattern19: PatternRiche = {
  numero: 19,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/9e7e0715-850c-4ce4-9b3c-7b9d5b93bd75/2023-07-06_00-51-38.png?format=2500w',
  visualId: 91,
  shapes: ['carré'],
  fonctionNb: (x: number) => x ** 2 + 4 * x + 2,
  formule: 'n^2+4\\times n + 2',
  type: 'degré2',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < 2 * n + 1; i++) {
      newCells.add(VisualPattern.coordToKey([i, 0, this.shapes[0]]))
    }
    for (let i = n; i < 2 * n + 1; i++) {
      for (let j = 1; j < n + 1; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    for (let i = n; i < 3 * n + 2; i++) {
      newCells.add(VisualPattern.coordToKey([i, n, this.shapes[0]]))
    }
    return newCells
  },
}

const pattern20: PatternRiche = {
  numero: 20,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/b78ea1f9-f4ff-4121-964a-cb0ff2be2afc/2023-07-06_01-18-35.png?format=2500w',
  visualId: 94,
  shapes: ['carré'],
  fonctionNb: (x: number) => (x * (x + 1)) / 2 + 2,
  formule: '\\dfrac{n\\times (n+1)}{2}+2',
  type: 'degré2',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([n + 1, 0, this.shapes[0]]))
    for (let i = 1; i <= n; i++) {
      for (let j = n - i; j >= 0; j--) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    return newCells
  },
}

// J'ai transposé horizontalement pour prendre moins de place
const pattern21: PatternRiche = {
  numero: 21,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/62fb6a8b-01d1-4d0c-8cac-7eeb30fbba41/4528553_orig.png?format=2500w',
  visualId: 165,
  shapes: ['carré'],
  fonctionNb: (x: number) => 2 * x + 3,
  formule: '2\\times n + 3',
  type: 'affine',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i <= 2 * n; i++) {
      if (i === n) {
        newCells.add(VisualPattern.coordToKey([i, 0, this.shapes[0]]))
        newCells.add(VisualPattern.coordToKey([i, 2, this.shapes[0]]))
      }
      newCells.add(VisualPattern.coordToKey([i, 1, this.shapes[0]]))
    }
    return newCells
  },
}

const pattern22: PatternRiche3D = {
  numero: 22,
  shapes: ['cube-trois-couleurs-tube-edges'],
  fonctionNb: (x: number) => ((x + 1) * (x + 2)) / 2,
  formule: '\\dfrac{(n+1)\\times (n+2)}{2}',
  type: 'degré2',
  iterate3d: function (this: VisualPattern3D, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    const cubes: [number, number, number, string][] = []

    for (let i = -Math.round(n / 2); i < n + Math.round(n / 2); i++) {
      for (let j = 0; j <= n - i - Math.round(n / 2); j++) {
        cubes.push([i, 0, j, 'cube-trois-couleurs-tube-edges'])
      }
    }
    const cubesSorted = rangeCubes(cubes)
    for (const [x, y, z, s] of cubesSorted) {
      const key = VisualPattern3D.coordToKey([x, y, z, s])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3D.coordToKey([x, y, z, s]))
    }
    return newCells
  },
}

const pattern23: PatternRiche3D = {
  numero: 23,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/34b73461-9c26-4e8c-a979-82a32a319f1e/1188365_orig.png?format=2500w',
  visualId: 155,
  fonctionNb: (x: number) => 6 * x - 5,
  formule: '6\\times n-5',
  type: 'affine',
  shapes: ['cube-trois-couleurs-tube-edges'],
  iterate3d: function (this: VisualPattern3D, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    const cubes: [number, number, number, string][] = []
    for (let i = -n + 0.5; i <= n - 1.5; i += 1) {
      cubes.push([i, -0.5, n - 1, 'cube-trois-couleurs-tube-edges'])
    }

    for (let i = -n + 0.5; i <= n - 1.5; i += 1) {
      cubes.push([-0.5, i, n - 1, 'cube-trois-couleurs-tube-edges'])
    }

    for (let i = 0; i <= 2 * n - 2; i++) {
      cubes.push([-0.5, -0.5, i, 'cube-trois-couleurs-tube-edges'])
    }

    const cubesSorted = rangeCubes(cubes)
    for (const [x, y, z, s] of cubesSorted) {
      const key = VisualPattern3D.coordToKey([x, y, z, s])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3D.coordToKey([x, y, z, s]))
    }
    return newCells
  },
}

const pattern24: PatternRiche3D = {
  numero: 24,
  fonctionNb: (x: number) => (2 * x ** 3 + 3 * x ** 2 + x) / 6,
  formule: '\\dfrac{2\\times n^3 + 3\\times n^2 + n}{6}',
  type: 'degré3',
  shapes: ['cube-trois-couleurs-tube-edges'],
  iterate3d: function (this: VisualPattern3D, n: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    const cubes: [number, number, number, string][] = []
    for (let z = 0; z < n; z++) {
      for (let y = 0; y < n - z; y++) {
        for (let x = 0; x < n - z; x++) {
          cubes.push([x - 1, n - y - 2, z, 'cube-trois-couleurs-tube-edges'])
        }
      }
    }
    const cubesSorted = rangeCubes(cubes)
    for (const [x, y, z, s] of cubesSorted) {
      const key = VisualPattern3D.coordToKey([x, y, z, s])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3D.coordToKey([x, y, z, s]))
    }
    return newCells
  },
}

const pattern25: PatternRiche3D = {
  numero: 25,
  fonctionNb: (x: number) => x ** 3,
  formule: 'n^3',
  type: 'degré3',
  shapes: ['cube-trois-couleurs-tube-edges'],
  iterate3d: function (this: VisualPattern3D, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    const cubes: [number, number, number, string][] = []
    const demiPas = n / 2
    for (let z = 0; z < n; z++) {
      for (let y = 0 - demiPas; y < n - demiPas; y++) {
        for (let x = 0 - demiPas; x < n - demiPas; x++) {
          cubes.push([x, y, z, 'cube-trois-couleurs-tube-edges'])
        }
      }
    }
    const cubesSorted = rangeCubes(cubes)
    for (const [x, y, z, s] of cubesSorted) {
      const key = VisualPattern3D.coordToKey([x, y, z, s])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3D.coordToKey([x, y, z, s]))
    }
    return newCells
  },
}

const pattern26: PatternRiche3D = {
  numero: 26,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/4150fdf6-f9ee-47f8-bc47-d96b8455c073/4158599_orig.png?format=2500w',
  visualId: 28,
  fonctionNb: (x: number) => x ** 3 - (x - 1) ** 3,
  formule: '3\\times n^2 - 3\\times n + 1',
  type: 'degré2',
  shapes: ['cube-trois-couleurs-tube-edges'],
  iterate3d: function (this: VisualPattern3D, n) {
    if (n === undefined) n = 1
    const demiPas = n / 2
    const newCells = new Set<string>()
    const cubes: [number, number, number, string][] = []
    for (let z = 0; z < n; z++) {
      if (z === 0) {
        for (let y = 0; y < n; y++) {
          for (let x = 0; x < n; x++) {
            cubes.push([
              x - demiPas,
              y - demiPas,
              z,
              'cube-trois-couleurs-tube-edges',
            ])
          }
        }
      } else {
        for (let y = 0; y < n; y++) {
          cubes.push([
            0 - demiPas,
            y - demiPas,
            z,
            'cube-trois-couleurs-tube-edges',
          ]) // Ajouter la première colonne de chaque ligne
        }
        for (let x = 0; x < n; x++) {
          cubes.push([
            x - demiPas,
            n - 1 - demiPas,
            z,
            'cube-trois-couleurs-tube-edges',
          ])
        }
      }
    }
    const cubesSorted = rangeCubes(cubes)
    for (const [x, y, z, s] of cubesSorted) {
      const key = VisualPattern3D.coordToKey([x, y, z, s])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3D.coordToKey([x, y, z, s]))
    }
    return newCells
  },
}

const pattern27: PatternRiche3D = {
  numero: 27,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/17ccbdb3-2047-47f4-94cb-1ed0723982cd/8681279_orig.png?format=2500w',
  visualId: 46,
  fonctionNb: (x: number) => 5 * x - 4,
  formule: '5\\times n - 4',
  type: 'affine',
  shapes: ['cube-trois-couleurs-tube-edges'],
  iterate3d: function (this: VisualPattern3D, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    const cubes: [number, number, number, string][] = []
    for (let z = 0; z < n; z++) {
      if (z === 0) {
        for (let y = -n + 1; y <= n - 1; y++) {
          cubes.push([0, y, 0, 'cube-trois-couleurs-tube-edges'])
        }
        for (let x = -n + 1; x <= n - 1; x++) {
          cubes.push([x, 0, 0, 'cube-trois-couleurs-tube-edges'])
        }
      } else {
        cubes.push([0, 0, z, 'cube-trois-couleurs-tube-edges'])
      }
    }
    const cubesSorted = rangeCubes(cubes)
    for (const [x, y, z, s] of cubesSorted) {
      const key = VisualPattern3D.coordToKey([x, y, z, s])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3D.coordToKey([x, y, z, s]))
    }
    return newCells
  },
}

const pattern28: PatternRiche3D = {
  numero: 28,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/af167f89-9c72-4ba5-b406-697f59d73412/9861425_orig.png?format=2500w',
  visualId: 52,

  fonctionNb: (x: number) => 2 * x ** 2 - x,
  formule: 'n\\times (2\\times n - 1)',
  type: 'degré2',
  shapes: ['cube-trois-couleurs-tube-edges'],
  iterate3d: function (this: VisualPattern3D, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    const cubes: [number, number, number, string][] = []
    for (let z = 0; z < n; z++) {
      if (z < n - 1) {
        for (let y = n - z - 1; y >= z - n + 1; y--) {
          cubes.push([-0.5, y - 0.5, z, 'cube-trois-couleurs-tube-edges'])
        }
        for (let x = z - n + 1; x <= n - z - 1; x++) {
          cubes.push([x - 0.5, -0.5, z, 'cube-trois-couleurs-tube-edges'])
        }
      } else {
        cubes.push([-0.5, -0.5, z, 'cube-trois-couleurs-tube-edges'])
      }
    }
    const cubesSorted = rangeCubes(cubes)
    for (const [x, y, z, s] of cubesSorted) {
      const key = VisualPattern3D.coordToKey([x, y, z, s])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3D.coordToKey([x, y, z, s]))
    }
    return newCells
  },
}

const pattern29: PatternRiche = {
  numero: 29,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/5c72d74d-af6b-437e-a1a2-69495c67202d/2018-10-14-13-34-36_orig.png?format=2500w',
  visualId: 263,
  shapes: ['carré'],
  fonctionNb: (x: number) => 2 * x + 1,
  formule: '2\\times n + 1',
  type: 'affine',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i <= n; i++) {
      newCells.add(VisualPattern.coordToKey([n - i, i, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([n - i, 2 * n - i, this.shapes[0]]))
    }
    newCells.add(VisualPattern.coordToKey([0, n, this.shapes[0]]))
    return newCells
  },
}

const pattern30: PatternRiche = {
  numero: 30,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/c3833797-d82a-4c4b-bff7-d22d877c000b/2018-11-18-11-34-08_orig.png?format=2500w',
  visualId: 266,
  shapes: ['carré'],
  fonctionNb: (x: number) => 3 * x + 2,
  formule: '3\\times n + 2',
  type: 'affine',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([4, 0, this.shapes[0]]))
    for (let i = 1; i < 4; i++) {
      for (let j = 0; j < n; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    return newCells
  },
}

const pattern31: PatternRiche = {
  numero: 31,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/3b345e8a-ccab-4fb2-bec6-f21b650d79bc/2023-07-05_15-04-34.png?format=2500w',
  visualId: 256,
  shapes: ['carré'],
  fonctionNb: (x: number) => 3 * x + 1,
  formule: '3\\times n + 1',
  type: 'affine',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 1; i < n + 2; i++) {
      newCells.add(VisualPattern.coordToKey([i, n - 1, this.shapes[0]]))
      if (i < n + 1) {
        newCells.add(VisualPattern.coordToKey([i, n, this.shapes[0]]))
      }
    }
    for (let j = 0; j > -n; j--) {
      newCells.add(VisualPattern.coordToKey([0, j + n - 1, this.shapes[0]]))
    }
    return newCells
  },
}

const pattern32: PatternRiche = {
  numero: 32,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/382218dd-df17-4747-8215-cbe3f950f453/p4_orig.png?format=2500w',
  visualId: 257,
  shapes: ['carré'],
  fonctionNb: (x: number) => x ** 2 + 4 * x - 2,
  formule: 'n^2 + 4\\times n - 2',
  type: 'degré2',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (x === y) {
          for (let k = 0; k < n; k++) {
            for (let l = 0; l < n; l++) {
              newCells.add(
                VisualPattern.coordToKey([x + l, y + k, this.shapes[0]]),
              )
            }
          }
        }
      }
    }
    return newCells
  },
}

const pattern33: PatternRiche = {
  numero: 33,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/d9c26deb-510e-43fc-85c5-4573f5d60735/vp54_2_orig.png?format=2500w',
  visualId: 54,
  shapes: ['carré'],
  fonctionNb: (x: number) => x + 1,
  formule: 'n+1',
  type: 'affine',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let x = 0; x <= n; x++) {
      newCells.add(VisualPattern.coordToKey([x, 0, this.shapes[0]]))
    }
    return newCells
  },
}

const pattern34: PatternRiche = {
  numero: 34,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/1fc58a54-b378-407b-9bea-b9a136fca28f/4700362_orig.png?format=2500w',
  visualId: 72,
  shapes: ['carré'],
  fonctionNb: (x: number) => 8 * x ** 2 + 4 * x + 1,
  formule: '8\\times n^2 + 4\\times n + 1',
  type: 'degré2',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
        newCells.add(VisualPattern.coordToKey([x, y, this.shapes[0]]))
        newCells.add(
          VisualPattern.coordToKey([x + 3 * n + 1, y, this.shapes[0]]),
        )
        newCells.add(
          VisualPattern.coordToKey([
            x + 3 * n + 1,
            y + 3 * n + 1,
            this.shapes[0],
          ]),
        )
        newCells.add(
          VisualPattern.coordToKey([x, y + 3 * n + 1, this.shapes[0]]),
        )
        const m = 3 * n + 1
        for (let i = n; i < m; i++) {
          for (let j = n; j < m; j++) {
            newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
          }
        }
      }
    }
    return newCells
  },
}

const pattern35: PatternRiche = {
  numero: 35,
  shapes: ['losange'],
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/fe162543-f853-4705-9964-6ceceb0959a3/9292613_orig.png?format=2500w',
  visualId: 75,
  fonctionNb: (x: number) => 4 * x,
  formule: '4\\times n',
  type: 'linéaire',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let y = 0; y <= n; y++) {
      const end = 2 * n - y
      if (y < n) {
        newCells.add(
          VisualPattern.coordToKey([2 * n - end - 1, y, this.shapes[0]]),
        )
        newCells.add(VisualPattern.coordToKey([2 * n - end, y, this.shapes[0]]))
        newCells.add(VisualPattern.coordToKey([end - 1, y, this.shapes[0]]))
        newCells.add(VisualPattern.coordToKey([end - 2, y, this.shapes[0]]))
      } else {
        newCells.add(VisualPattern.coordToKey([n - 1, y, this.shapes[0]]))
      }
    }
    return newCells
  },
}

const pattern36: PatternRiche3D = {
  numero: 36,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/7181e027-b3bc-4960-af21-07f38e5ebf03/9571721_orig.png?format=2500w',
  visualId: 79,
  fonctionNb: (x: number) => ((x * (x + 1)) / 2) ** 2,
  formule: '\\left(\\dfrac{n\\times (n+1)}{2}\\right)^2',
  type: 'autre',
  shapes: ['cube-trois-couleurs-tube-edges'],
  iterate3d: function (this: VisualPattern3D, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    const altitude = function (base: number, etage: number) {
      let h = 0
      for (let i = 0; i < etage; i++) {
        h += base--
      }
      return h
    }
    const cubes: [number, number, number, string][] = []
    for (let arete = n; arete > 0; arete--) {
      const etage = n - arete
      for (let x = 0; x < arete; x++) {
        for (let y = 0; y < arete; y++) {
          for (let z = 0; z < arete; z++) {
            cubes.push([
              x,
              n - y,
              z + altitude(n, etage),
              'cube-trois-couleurs-tube-edges',
            ])
          }
        }
      }
    }
    const cubesSorted = rangeCubes(cubes)
    for (const [x, y, z, s] of cubesSorted) {
      const key = VisualPattern3D.coordToKey([x, y, z, s])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3D.coordToKey([x, y, z, s]))
    }
    return newCells
  },
}

const pattern37: PatternRiche = {
  numero: 37,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/e0ee90d8-a577-4ce3-877f-e4b52fcead83/2023-10-11_11-20-15.png?format=2500w',
  visualId: 254,
  fonctionNb: (x: number) => x ** 2 + 2 * x + 4,
  formule: 'n^2+2\\times n+4',
  type: 'degré2',
  shapes: ['soleil'],
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 1, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([1, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([1, n + 2, this.shapes[0]]))
    for (let i = 1; i <= n + 1; i++) {
      for (let j = 1; j <= n + 1; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    return newCells
  },
}

const pattern38: PatternRiche = {
  numero: 38,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/24421acb-3211-41ba-8974-7b33abb8bb70/vp8_orig.png?format=2500w',
  visualId: 281,
  fonctionNb: (x: number) => x ** 2 + x + 2,
  formule: 'n^2+n+2',
  type: 'degré2',
  shapes: ['carréRond'],
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([n, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([n, n + 1, this.shapes[0]]))
    for (let i = 0; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    return newCells
  },
}

const pattern39: PatternRiche = {
  numero: 39,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/f817210e-0b89-42bb-8a37-dc3afa804f3a/vp10_orig.png?format=2500w',
  visualId: 283,
  fonctionNb: (x: number) => x * x,
  formule: 'n^2',
  type: 'degré2',
  shapes: ['losange'],
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        newCells.add(
          VisualPattern.coordToKey([
            i * 0.5 - j * 0.5,
            j * 0.5 + i * 0.5,
            this.shapes[0],
          ]),
        )
      }
    }
    return newCells
  },
}

const pattern40: PatternRiche3D = {
  numero: 40,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/c3f1ff49-ca30-47ab-8ee9-acb7e253aa87/vp11_orig.png?format=2500w',
  visualId: 284,
  fonctionNb: (x: number) => 2 * x + 2,
  formule: '2\\times n + 2',
  type: 'affine',
  shapes: ['cube-trois-couleurs-tube-edges'],
  iterate3d: function (this: VisualPattern3D, n) {
    if (n === undefined) n = 1
    const cubes: [number, number, number, string][] = []
    for (let z = 0; z <= n; z++) {
      cubes.push([-1, 0, z, 'cube-trois-couleurs-tube-edges'])
      if (z > 0 && z < n)
        cubes.push([1, 0, z, 'cube-trois-couleurs-tube-edges'])
    }
    cubes.push([0, 0, 0, 'cube-trois-couleurs-tube-edges'])
    cubes.push([1, 0, 0, 'cube-trois-couleurs-tube-edges'])
    const newCells = new Set<string>()

    const cubesSorted = rangeCubes(cubes)
    for (const [x, y, z, s] of cubesSorted) {
      const key = VisualPattern3D.coordToKey([x, y, z, s])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3D.coordToKey([x, y, z, s]))
    }
    return newCells
  },
}

const pattern41: PatternRiche = {
  numero: 41,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/58e493c4-91ae-408a-9eec-e5ac101bc5e0/vp24_orig.png?format=2500w',
  visualId: 298,
  fonctionNb: (x: number) => ((x + 2) * (x + 1)) / 2 + 1,
  formule: '\\dfrac{(n+1)(n+2)}{2} + 1',
  type: 'degré2',
  shapes: ['étoile'],
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]]))
    for (let j = 1; j < n + 2; j++) {
      for (let i = 0; i < j; i++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    return newCells
  },
}

const pattern42: PatternRiche = {
  numero: 42,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/048b9214-fee6-400a-a28c-aa420054c3c9/vp30_orig.png?format=2500w',
  visualId: 300,
  shapes: ['chat'],
  fonctionNb: (x: number) => 2 * x * (x + 1) + 1,
  formule: '2\\times n\\times (n+1) + 1',
  type: 'degré3',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = n + 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        for (let k = 0; k < i; k++) {
          newCells.add(
            VisualPattern.coordToKey([
              n + 1 - i + j * 2,
              n - i + 1 + k * 2,
              this.shapes[0],
            ]),
          )
        }
      }
    }
    return newCells
  },
}

const pattern43: PatternRiche = {
  numero: 43,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/7a81a3ec-f14f-4d8e-b440-bd24f8f3a58f/vp46_orig.png?format=2500w',
  visualId: 307,
  shapes: ['carréRond'],
  fonctionNb: (x: number) => 3 * x + 1,
  formule: '3\\times n + 1',
  type: 'affine',
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      for (let x = 0; x < 2; x++) {
        for (let y = 0; y < 2; y++) {
          newCells.add(VisualPattern.coordToKey([i + x, i + y, this.shapes[0]]))
        }
      }
    }
    return newCells
  },
}

const pattern44: PatternRiche = {
  numero: 44,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/a4735ae7-f530-45ae-aef0-4b46fb6cefa1/vp47_orig.png?format=2500w',
  visualId: 308,
  shapes: ['soleil'],
  fonctionNb: (x: number) => 4 * x + 2,
  formule: '4\\times n + 2',
  type: 'affine',
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 1; i <= 2 * n; i++) {
      newCells.add(VisualPattern.coordToKey([0, i, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([1, i, this.shapes[0]]))
    }
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([2, 2, this.shapes[0]]))

    return newCells
  },
}

const pattern45: PatternRiche = {
  numero: 45,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/78b879d4-b760-4bd2-8ad3-316bb5607126/vp50_orig.png?format=2500w',
  visualId: 311,
  fonctionNb: (x: number) => x ** 2 + x + 3,
  formule: 'n^2+n+3',
  type: 'degré2',
  shapes: ['carréRond'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, n, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([n + 1, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([n + 1, n, this.shapes[0]]))
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n + 1; j++) {
        newCells.add(VisualPattern.coordToKey([1 + i, j, this.shapes[0]]))
      }
    }
    return newCells
  },
}

const pattern46: PatternRiche = {
  numero: 46,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/c894cc7a-f78b-401d-a6fb-0c8eabceb28c/vp55_orig.png?format=2500w',
  visualId: 316,
  fonctionNb: (x: number) => x ** 2 + x,
  formule: 'n^2+n',
  type: 'degré2',
  shapes: ['hexagone'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    for (let i = 1; i < n; i++) {
      newCells.add(VisualPattern.coordToKey([i, n, this.shapes[0]]))
    }
    newCells.add(VisualPattern.coordToKey([n, 0, this.shapes[0]]))
    return newCells
  },
}

const pattern47: PatternRiche = {
  numero: 47,
  fonctionNb: (x: number) => 4 * x,
  formule: '4\\times n',
  type: 'linéaire',
  shapes: ['balle'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      newCells.add(VisualPattern.coordToKey([i, n, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([n, i, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([2 * n - i, n, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([n, 2 * n - i, this.shapes[0]]))
    }
    return newCells
  },
}

const pattern48: PatternRiche = {
  numero: 48,
  fonctionNb: (x: number) => 2 * x - 1,
  formule: '2\\times n - 1',
  type: 'affine',
  shapes: ['balle'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n - 1; i++) {
      newCells.add(VisualPattern.coordToKey([i, n, this.shapes[0]]))
    }
    for (let i = 0; i < n; i++) {
      newCells.add(VisualPattern.coordToKey([n + i - 1, n - i, this.shapes[0]]))
    }
    return newCells
  },
}

const pattern49: PatternRiche = {
  numero: 49,
  fonctionNb: (x: number) => 2 * x + 2,
  formule: '2\\times n + 2',
  type: 'affine',
  shapes: ['hexagone'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i <= n; i++) {
      newCells.add(VisualPattern.coordToKey([i, 0, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([i, 1, this.shapes[0]]))
    }
    return newCells
  },
}

const pattern50: PatternRiche = {
  numero: 50,
  fonctionNb: (x: number) => 3 * x + 2,
  formule: '3\\times n + 2',
  type: 'affine',
  shapes: ['losange'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n + 2; i++) {
      newCells.add(VisualPattern.coordToKey([i, n, this.shapes[0]]))
    }
    for (let i = 0; i < n; i++) {
      newCells.add(
        VisualPattern.coordToKey([1 + (n - 1) / 2, i, this.shapes[0]]),
      )
      newCells.add(
        VisualPattern.coordToKey([1 + (n - 1) / 2, 2 * n - i, this.shapes[0]]),
      )
    }
    return newCells
  },
}

const pattern51: PatternRiche = {
  numero: 51,
  fonctionNb: (x: number) => 3 + x,
  formule: '3+n',
  type: 'affine',
  shapes: ['chat'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([1, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([0, 1, this.shapes[0]]))
    for (let i = 0; i < n; i++) {
      newCells.add(VisualPattern.coordToKey([1, i + 1, this.shapes[0]]))
    }
    return newCells
  },
}

const pattern52: PatternRiche = {
  numero: 52,
  fonctionNb: (x: number) => 4 * x + 4,
  formule: '4\\times n + 4',
  type: 'affine',
  shapes: ['étoile'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 1, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([0, 2, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([n + 1, 1, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([n + 1, 2, this.shapes[0]]))
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < 4; j++) {
        newCells.add(VisualPattern.coordToKey([i + 1, j, this.shapes[0]]))
      }
    }
    return newCells
  },
}

const pattern53: PatternRiche = {
  numero: 53,
  fonctionNb: (x: number) => 2 * x,
  formule: '2\\times n',
  type: 'linéaire',
  shapes: ['cerise'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      newCells.add(VisualPattern.coordToKey([0, i, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([i, n, this.shapes[0]]))
    }
    return newCells
  },
}

const pattern54: PatternRiche = {
  numero: 54,
  fonctionNb: (x: number) => 5 * x,
  formule: '5\\times n',
  type: 'linéaire',
  shapes: ['peche'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < 5; j++) {
        if (i === 0) {
          newCells.add(VisualPattern.coordToKey([j, 5, this.shapes[0]]))
        } else {
          newCells.add(VisualPattern.coordToKey([i - 1, j, this.shapes[0]]))
        }
      }
    }
    return newCells
  },
}

const pattern55: PatternRiche = {
  numero: 55,
  fonctionNb: (x: number) => 4 * x,
  formule: '4\\times n',
  type: 'linéaire',
  shapes: ['banane'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([1, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([2, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([2, 1, this.shapes[0]]))
    for (let i = 1; i < n; i++) {
      newCells.add(VisualPattern.coordToKey([3 * i, 0, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([1 + 3 * i, 0, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([2 + 3 * i, 0, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([3 * i, 1, this.shapes[0]]))
    }
    return newCells
  },
}

const pattern56: PatternRiche = {
  numero: 56,
  fonctionNb: (x: number) => 2 * x - 1,
  formule: '2\\times n - 1',
  type: 'affine',
  shapes: ['rond'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]]))
    for (let i = 1; i < n; i++) {
      newCells.add(VisualPattern.coordToKey([2 * i, 0, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([2 * i - 1, 1, this.shapes[0]]))
    }
    return newCells
  },
}

const pattern57: PatternRiche = {
  numero: 57,
  fonctionNb: (x: number) => x ** 2 + 1,
  fonctionFraction: (x: number) => new FractionEtendue(x, x ** 2 + 1),
  formule: '\\dfrac{n}{n^2+1}',
  type: 'degré2',
  shapes: ['carré', 'carréBleu'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      newCells.add(VisualPattern.coordToKey([i, n, this.shapes[1]]))
      for (let j = 1; j < n; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]]))
    return newCells
  },
}

const pattern58: PatternRiche = {
  numero: 58,
  fonctionNb: (x: number) => x ** 2 + 2 * x + 1,
  fonctionFraction: (x: number) =>
    new FractionEtendue(x ** 2, x ** 2 + 2 * x + 1),
  fonctionRatio: (x: number) => new Ratio([x ** 2, 2 * x, 1]),
  formule: 'n^2 : 2n : 1',
  type: 'degré2',
  shapes: ['carréBleu', 'carréRond', 'rond'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]])) // carréBleu
      }
      newCells.add(VisualPattern.coordToKey([i, n, this.shapes[1]])) // carréRond
      newCells.add(VisualPattern.coordToKey([n, i, this.shapes[1]])) // carréRond
    }
    newCells.add(VisualPattern.coordToKey([n, n, this.shapes[2]])) // rond
    return newCells
  },
}

const pattern59: PatternRiche = {
  numero: 59,
  fonctionNb: (x: number) => 4 * x + 2,
  fonctionFraction: (x: number) => new FractionEtendue(x, 4 * x + 2),
  // ratio: new Ratio([2 * x,
  fonctionRatio: (x: number) => new Ratio([x, x + 1, 2 * x + 1]),
  texRatio: 'soleils : étoiles : hexagones',
  formule: 'n : n+1 : 2n+1',
  type: 'affine',
  shapes: ['soleil', 'étoile', 'hexagone'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      newCells.add(VisualPattern.coordToKey([i, 0, this.shapes[0]])) // soleil
    }
    for (let j = 0; j < n + 1; j++) {
      newCells.add(VisualPattern.coordToKey([n + j, 0, this.shapes[1]])) // étoile
    }
    for (let k = 0; k < 2 * n + 1; k++) {
      newCells.add(VisualPattern.coordToKey([k, 1, this.shapes[2]])) // hexagone
    }
    return newCells
  },
}

const pattern60: PatternRiche = {
  numero: 60,
  fonctionNb: (x: number) => 2 * x + 2,
  fonctionRatio: (x: number) => new Ratio([x, x + 2]),
  fonctionFraction: (x: number) => new FractionEtendue(x, 2 * x + 2),
  texRatio: 'tortues : chats',
  formule: '\\dfrac{n}{2n+2}',
  type: 'affine',
  shapes: ['tortue', 'chat'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      newCells.add(
        VisualPattern.coordToKey([i * 2, 0, this.shapes[0], { scale: 2 }]),
      ) // tortue
      newCells.add(
        VisualPattern.coordToKey([i * 2, 2, this.shapes[1], { scale: 2 }]),
      ) // chat
    }
    newCells.add(
      VisualPattern.coordToKey([n * 2, 0, this.shapes[1], { scale: 2 }]),
    ) // chat
    newCells.add(
      VisualPattern.coordToKey([n * 2, 2, this.shapes[1], { scale: 2 }]),
    ) // chat
    return newCells
  },
}

const pattern61: PatternRiche = {
  numero: 61,
  fonctionNb: (x: number) => x ** 2 + 4 * x + 2,
  fonctionFraction: (x: number) =>
    new FractionEtendue(x ** 2 + 2 * x + 1, x ** 2 + 4 * x + 2),
  fonctionRatio: (x: number) => new Ratio([x ** 2 + 2 * x + 1, 2 * x + 1]),
  texRatio: 'carrés : hexagones',
  formule: 'n^2+4n+2',
  type: 'degré2',
  shapes: ['carréBleu', 'hexagone'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]])) // carréBleu
      }
    }
    for (let i = 1; i < n + 2; i++) {
      for (let j = 1; j < n + 2; j++) {
        if (i > n || j > n)
          newCells.add(VisualPattern.coordToKey([i, j, this.shapes[1]])) // hexagone
      }
    }
    return newCells
  },
}

const pattern62: PatternRiche = {
  numero: 62,
  fonctionNb: (x: number) => 3 * x,
  fonctionRatio: (x: number) => new Ratio([x, 2 * x]),
  texRatio: 'ronds : croix rouges',
  fonctionFraction: (x: number) => new FractionEtendue(x, 3 * x),
  formule: '3\\times n',
  type: 'linéaire',
  shapes: ['redCross', 'rond'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      newCells.add(VisualPattern.coordToKey([i * 3, 0, this.shapes[1]])) // rond
      newCells.add(VisualPattern.coordToKey([i * 3 + 1, 0, this.shapes[0]])) // redCross
      newCells.add(VisualPattern.coordToKey([i * 3 + 2, 0, this.shapes[1]])) // rond
    }
    return newCells
  },
}
const pattern63: PatternRiche = {
  numero: 63,
  fonctionNb: (x: number) => 2 * x + 1,
  fonctionRatio: (x: number) => new Ratio([x + 1, x]),
  texRatio: 'hexagones : étoiles',
  fonctionFraction: (x: number) => new FractionEtendue(x + 1, 2 * x + 1),
  formule: '2\\times n + 1',
  type: 'affine',
  shapes: ['hexagone', 'étoile'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[0]])) // hexagone
    for (let i = 0; i < n; i++) {
      newCells.add(VisualPattern.coordToKey([1 + i * 2, 0, this.shapes[1]])) // hexagone
      newCells.add(VisualPattern.coordToKey([i * 2 + 2, 0, this.shapes[0]])) // étoile
    }
    return newCells
  },
}

const pattern64: PatternRiche = {
  numero: 64,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/a3f4ea08-cdcb-46c2-bcc8-bd6aa2722f96/720875_orig.png?format=2500w',
  visualId: 15,
  shapes: ['carréRond', 'rond'],
  fonctionNb: (n: number) => 4 * n + 1,
  fonctionRatio: (x: number) => new Ratio([x, 3 * x + 1]),
  texRatio: 'carrés : ronds',
  fonctionFraction: (x: number) => new FractionEtendue(x, 4 * x + 1),
  formule: '4\\times n + 1',
  type: 'affine',
  iterate: function (this: VisualPattern, n: number = 1): Set<string> {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      if (i === 0) {
        newCells.add(VisualPattern.coordToKey([0, 1, this.shapes[1]]))
      }
      newCells.add(VisualPattern.coordToKey([i * 2 + 1, 2, this.shapes[1]]))
      newCells.add(VisualPattern.coordToKey([i * 2 + 1, 0, this.shapes[1]]))
      newCells.add(VisualPattern.coordToKey([i * 2 + 1, 1, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([i * 2 + 2, 1, this.shapes[1]]))
    }
    return newCells
  },
}
const pattern65: PatternRiche = {
  numero: 65,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/762956a8-dadf-4c59-bcfe-5212a27e0ca9/vp44_2_orig+%281%29.png?format=2500w',
  visualId: 44,
  shapes: ['hexagone', 'hexagoneJaune'],
  type: 'affine',
  formule: '5\\times n + 2',
  fonctionNb: (x: number) => 5 * x + 2,
  fonctionRatio: (x: number) => new Ratio([4 * x + 2, x]),
  texRatio: 'hexagones bleus : hexagones jaunes',
  fonctionFraction: (x: number) => new FractionEtendue(4 * x + 2, 5 * x + 2),
  iterate: function (this: VisualPattern, n: number = 1): Set<string> {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 0.433, 'hexagone']))
    newCells.add(VisualPattern.coordToKey([0, 1.299, 'hexagone']))
    for (let i = 0; i < n; i++) {
      newCells.add(VisualPattern.coordToKey([i * 1.5 + 0.75, 0, 'hexagone']))
      newCells.add(VisualPattern.coordToKey([i * 1.5 + 1.5, 0.433, 'hexagone']))
      newCells.add(VisualPattern.coordToKey([i * 1.5 + 1.5, 1.299, 'hexagone']))
      newCells.add(
        VisualPattern.coordToKey([i * 1.5 + 0.75, 1.732, 'hexagone']),
      )
      newCells.add(
        VisualPattern.coordToKey([i * 1.5 + 0.75, 0.866, 'hexagoneJaune']),
      )
    }
    return newCells
  },
}

const pattern66: PatternRiche = {
  numero: 66,
  fonctionNb: (x: number) => 1 + 3 * (x + 1) * x,
  formule: '1+3\\times n(n+1)',
  fonctionRatio: (x: number) => new Ratio([1 + 3 * (x - 1) * x, 6 * x]),
  texRatio: 'hexagones bleux : hexagones jaunes',
  fonctionFraction: (x: number) =>
    new FractionEtendue(1 + 3 * (x - 1) * x, 1 + 3 * (x + 1) * x),
  type: 'degré2',
  shapes: ['hexagone', 'hexagoneJaune'],
  iterate: function (this: VisualPattern, n: number = 1): Set<string> {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < 2 * n + 1; i++) {
      const nbCells = 2 * n + 1 - Math.abs(i - n)
      for (let j = 0; j < nbCells; j++) {
        const hexa =
          i === 0 || i === 2 * n
            ? n % 2 === 0
              ? 'hexagoneJaune'
              : 'hexagone'
            : j === 0 || j === nbCells - 1
              ? n % 2 !== 0
                ? 'hexagone'
                : 'hexagoneJaune'
              : (n + 1) % 2 !== 0
                ? 'hexagone'
                : 'hexagoneJaune'
        if (i < n + 1)
          newCells.add(
            VisualPattern.coordToKey([j * 0.75, (n + 2 * i - j) * 0.433, hexa]),
          )
        else if (i === n + 1)
          newCells.add(
            VisualPattern.coordToKey([
              (j + i - n) * 0.75,
              (n + 2 * i - 1 - j) * 0.433,
              hexa,
            ]),
          )
        else
          newCells.add(
            VisualPattern.coordToKey([
              (j + i - n) * 0.75,
              (2 * n + i - j) * 0.433,
              hexa,
            ]),
          )
      }
    }
    return newCells
  },
}

const pattern67: PatternRiche = {
  numero: 67,
  fonctionNb: (x: number) => (x * (x + 1)) / 2,
  fonctionRatio: (x: number) =>
    new Ratio([
      Math.floor(x / 2) ** 2,
      Math.floor(x / 2) * (Math.floor(x / 2) + 1),
    ]),
  fonctionFraction: (x: number) =>
    new FractionEtendue(
      Math.floor(x / 2) ** 2,
      Math.floor(x / 2) * (Math.floor(x / 2) + 1) + Math.floor(x / 2) ** 2,
    ),
  formule: '\\dfrac{n\\times(n+1)}{2}',
  type: 'degré2',
  shapes: ['cloche', 'fleur'],
  texRatio: 'cloches : fleurs',
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i; j++) {
        newCells.add(
          VisualPattern.coordToKey([
            j + 0.5 * i,
            i,
            this.shapes[(i + n + 1) % 2],
          ]),
        )
      }
    }
    return newCells
  },
}

const pattern68: PatternRiche = {
  numero: 68,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/90c1a0e4-f515-4f30-9c1c-6f3f9707669b/vp59_2_orig.png?format=2500w',
  visualId: 59,
  fonctionNb: (x: number) => (x + 2) ** 2,
  fonctionRatio: (x: number) => new Ratio([x ** 2, 4 * x + 4]),
  fonctionFraction: (x: number) => new FractionEtendue(x ** 2, (x + 2) ** 2),
  formule: '(n+2)^2',
  type: 'degré2',
  shapes: ['carré', 'carréBleu'],
  texRatio: 'carrés gris : carrés bleus',
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n + 2; i++) {
      for (let j = 0; j < n + 2; j++) {
        if (i === 0 || i === n + 1 || j === 0 || j === n + 1)
          newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]])) // carré
        else newCells.add(VisualPattern.coordToKey([i, j, this.shapes[1]])) // carréBleu
      }
    }
    return newCells
  },
}

const pattern69: PatternRiche = {
  numero: 69,
  fonctionNb: (x: number) => x ** 2,
  fonctionRatio: (x: number) => new Ratio([2 * x - 1, (x - 1) ** 2]),
  fonctionFraction: (x: number) => new FractionEtendue(2 * x - 1, x ** 2),
  formule: 'n^2',
  type: 'degré2',
  shapes: ['carréBleu', 'carré'],
  texRatio: 'carrés bleus : carrés',
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === 0 || j === 0)
          newCells.add(VisualPattern.coordToKey([i, n - j - 1, this.shapes[0]])) // carré
        else newCells.add(VisualPattern.coordToKey([i, j - 1, this.shapes[1]])) // carréBleu
      }
    }
    return newCells
  },
}
const pattern70: PatternRiche3D = {
  numero: 70,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/ee8ed904-6443-4fb5-ad24-897fcc391710/2023-03-22-10-14-45_orig+%281%29.png?format=2500w',
  visualId: 39,
  fonctionNb: (x: number) => (x ** 2 * (x + 1)) / 2,
  formule: '\\dfrac{n^2(n+1)}{2}',
  type: 'degré3',
  shapes: ['cube-trois-couleurs-tube-edges'],
  iterate3d: function (this: VisualPattern3D, n?: number) {
    if (n === undefined) n = 1
    const cubes: [number, number, number, string][] = []
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      for (let k = n - 1; k >= 0; k--) {
        for (let j = 0; j < n - i; j++) {
          cubes.push([
            i - n / 2,
            k - n / 2,
            j,
            'cube-trois-couleurs-tube-edges',
          ])
        }
      }
    }
    const cubesSorted = rangeCubes(cubes)
    for (const [x, y, z, s] of cubesSorted) {
      const key = VisualPattern3D.coordToKey([x, y, z, s])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3D.coordToKey([x, y, z, s]))
    }
    return newCells
  },
}

const pattern71: PatternRiche3D = {
  numero: 71,
  fonctionNb: (x: number) => (x * (x + 1) * (x + 2)) / 2,
  formule: '\\dfrac{n(n+1)(n+2)}{2}',
  type: 'degré3',
  shapes: ['cube-trois-couleurs-tube-edges'],
  iterate3d: function (this: VisualPattern3D, n?: number) {
    const cubes: [number, number, number, string][] = []
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n + 1; i++) {
      for (let k = n - 1; k >= 0; k--) {
        for (let j = 0; j < n + 1 - i; j++) {
          cubes.push([
            i - n / 2,
            k - n / 2,
            j,
            'cube-trois-couleurs-tube-edges',
          ])
        }
      }
    }
    const cubesSorted = rangeCubes(cubes)
    for (const [x, y, z, s] of cubesSorted) {
      const key = VisualPattern3D.coordToKey([x, y, z, s])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3D.coordToKey([x, y, z, s]))
    }
    return newCells
  },
}

const pattern72: PatternRiche = {
  numero: 72,
  fonctionNb: (x: number) => x ** 2,
  fonctionRatio: (x: number) =>
    new Ratio([((x + 1) * x) / 2, (x * (x - 1)) / 2]),
  fonctionFraction: (x: number) =>
    new FractionEtendue(((x + 1) * x) / 2, x ** 2),
  formule: 'n^2',
  type: 'degré2',
  shapes: ['triangle'],
  texRatio: 'triangles blancs : triangles verts ',
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= i; j++) {
        newCells.add(
          VisualPattern.coordToKey([
            i * 0.866 - j * 0.433,
            j * 0.75,
            this.shapes[0],
          ]),
        ) // triangle
      }
    }
    return newCells
  },
}

const pattern73: PatternRiche = {
  numero: 73,
  fonctionNb: (x: number) => 3 * x + 5,
  fonctionRatio: (x: number) => new Ratio([3 * x + 3, 1, 1]),
  fonctionFraction: (x: number) => new FractionEtendue(3 * x + 3, 3 * x + 5),
  formule: '3\\times n + 5',
  type: 'affine',
  shapes: ['rond', 'carré', 'étoile'],
  texRatio: 'ronds : carrés : étoiles',
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0.5 * (1 + n), 0, this.shapes[1]])) // carré
    newCells.add(
      VisualPattern.coordToKey([0.5 * (1 + n), n + 3, this.shapes[2]]),
    ) // étoile
    for (let i = 0; i <= n + 1; i++) {
      newCells.add(
        VisualPattern.coordToKey([
          (2 * (n + 1) - i) * 0.5,
          i + 1,
          this.shapes[0],
        ]),
      ) // rond
      newCells.add(VisualPattern.coordToKey([i * 0.5, i + 1, this.shapes[0]])) // rond
    }
    for (let i = 1; i <= n; i++) {
      newCells.add(VisualPattern.coordToKey([i, 1, this.shapes[0]])) // carré
    }
    return newCells
  },
}

const pattern74: PatternRiche3D = {
  numero: 74,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/05dbfae2-82ce-4106-a070-1ee0128ee99d/8840270_orig.png?format=2500w',
  visualId: 156,
  fonctionNb: (x: number) => 3 * x + 1,
  formule: '3\\times n+1',
  type: 'affine',
  shapes: ['cube-trois-couleurs-tube-edges'],
  iterate3d: function (this: VisualPattern3D, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    const cubes: [number, number, number, string][] = []
    for (let k = 0; k <= n; k++) {
      if (k !== n && k !== 0) {
        cubes.push([0, -0.5, k + n / 2, 'cube-trois-couleurs-tube-edges'])
        continue
      }
      for (let i = 0; i < n + 1; i++) {
        if (k === 0)
          cubes.push([i, -0.5, n / 2, 'cube-trois-couleurs-tube-edges'])
        else
          cubes.push([i - n, -0.5, n + n / 2, 'cube-trois-couleurs-tube-edges'])
      }
    }
    const cubesSorted = rangeCubes(cubes)
    for (const [x, y, z, s] of cubesSorted) {
      const key = VisualPattern3D.coordToKey([x, y, z, s])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3D.coordToKey([x, y, z, s]))
    }
    return newCells
  },
}
const pattern75: PatternRiche3D = {
  numero: 75,
  fonctionNb: (x: number) => 2 * x ** 3 + x,
  formule: '2n^3+n',
  type: 'degré3',
  shapes: ['cube-trois-couleurs-tube-edges'],
  iterate3d: function (this: VisualPattern3D, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    const cubes: [number, number, number, string][] = []
    if (n === 1) {
      cubes.push([0, 0, 0, 'cube-trois-couleurs-tube-edges'])
      cubes.push([1, 0, 0, 'cube-trois-couleurs-tube-edges'])
      cubes.push([2, 0, 0, 'cube-trois-couleurs-tube-edges'])
    } else {
      for (let k = 0; k < n; k++) {
        for (let j = n - 1; j >= 0; j--) {
          for (let i = -n; i < n + 1; i++) {
            if (k === 0) {
              cubes.push([
                i,
                j - n / 2,
                k + n / 2,
                'cube-trois-couleurs-tube-edges',
              ])
            }
          }
          for (let i = 0; i < n + 1; i++) {
            if (i !== n && k !== 0) {
              cubes.push([
                i - n,
                j - n / 2,
                k + n / 2,
                'cube-trois-couleurs-tube-edges',
              ])
              cubes.push([
                i + 1,
                j - n / 2,
                k + n / 2,
                'cube-trois-couleurs-tube-edges',
              ])
            }
          }
        }
      }
    }

    const cubesSorted = rangeCubes(cubes)
    for (const [x, y, z, s] of cubesSorted) {
      const key = VisualPattern3D.coordToKey([x, y, z, s])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3D.coordToKey([x, y, z, s]))
    }
    return newCells
  },
}

const pattern76: PatternRiche = {
  numero: 76,
  fonctionNb: (x: number) => 5 * x + 4,
  fonctionRatio: (x: number) => new Ratio([x, 4 * x + 4]),
  fonctionFraction: (x: number) => new FractionEtendue(x, 5 * x + 4),
  formule: '5\\times n + 4',
  type: 'affine',
  shapes: ['licorne', 'dragon'],
  texRatio: 'licornes : dragons',
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i <= n; i++) {
      newCells.add(VisualPattern.coordToKey([i, 0.5 * i, this.shapes[1]]))
      newCells.add(
        VisualPattern.coordToKey([i, n + 1 - 0.5 * i, this.shapes[1]]),
      )
      newCells.add(
        VisualPattern.coordToKey([2 * n + 2 - i, 0.5 * i, this.shapes[1]]),
      )
      newCells.add(
        VisualPattern.coordToKey([
          2 * n + 2 - i,
          n + 1 - 0.5 * i,
          this.shapes[1],
        ]),
      )
    }
    newCells.add(VisualPattern.coordToKey([n + 1, n / 2 + 0.5, this.shapes[0]])) // rond
    return newCells
  },
}

const pattern77: PatternRiche = {
  numero: 77,
  fonctionNb: (x: number) => (x + 1) * (x + 3),
  fonctionRatio: (x: number) => new Ratio([x + 2, x ** 2 + 3 * x + 2]),
  fonctionFraction: (x: number) =>
    new FractionEtendue(x + 2, (x + 1) * (x + 3)),
  formule: '(n+1)(n+3)',
  type: 'degré2',
  shapes: ['rectangleVert', 'rectangleBlanc'],
  texRatio: 'rectangles verts : rectangles blancs',
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n + 1; i++) {
      for (let j = 0; j < n + 3; j++) {
        if (i === 0 && j > 0)
          newCells.add(VisualPattern.coordToKey([i, j * 0.5, this.shapes[0]])) // rectangleVert
        else
          newCells.add(VisualPattern.coordToKey([i, j * 0.5, this.shapes[1]])) // rectangleBlanc
      }
    }
    return newCells
  },
}

const pattern78: PatternRiche = {
  numero: 78,
  fonctionNb: (x: number) => 1 + x * (x - 1) * 3,
  formule: '3\\times n^2-3\\times n-2',
  fonctionRatio: (x: number) => new Ratio([3 * x ** 2 - 3 * x - 2, x]),
  fonctionFraction: (x: number) =>
    new FractionEtendue(3 * x ** 2 - 3 * x - 2, 1 + x * (x - 1) * 3),
  type: 'degré2',
  shapes: ['hexagone', 'hexagoneJaune'],
  texRatio: 'hexagones bleus : hexagones jaunes',
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      for (let a = Math.PI / 6; a < 2 * Math.PI; a += Math.PI / 3) {
        const x = i * Math.cos(a) * 0.866
        const y = i * Math.sin(a) * 0.866 + n / 2
        if (i > 1) {
          const x2 = i * Math.cos(a + Math.PI / 3) * 0.866
          const y2 = i * Math.sin(a + Math.PI / 3) * 0.866 + n / 2
          for (let j = 1; j < n - 1; j++) {
            newCells.add(
              VisualPattern.coordToKey([
                x + (j * (x2 - x)) / i,
                y + (j * (y2 - y)) / i,
                i % 2 === 0 ? this.shapes[0] : this.shapes[1],
              ]),
            ) // hexagone
          }
        }
        newCells.add(
          VisualPattern.coordToKey([
            x,
            y,
            i % 2 === 0 ? this.shapes[0] : this.shapes[1],
          ]),
        ) // hexagone
      }
    }
    return newCells
  },
}

const pattern79: PatternRiche = {
  numero: 79,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/b5a4fa70-e93a-4cda-a58a-46eab96e699d/vp8_2_orig.png?format=2500w',
  visualId: 8,
  fonctionNb: (x: number) => (x * (x + 1)) / 2 + 1,
  formule: '1+\\dfrac{n\\times(n+1)}{2}',
  type: 'degré2',
  shapes: ['pingouin'],
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j < n - i; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]])) // hexagone
      }
    }
    newCells.add(VisualPattern.coordToKey([n, 0, this.shapes[0]]))
    return newCells
  },
}

const pattern80: PatternRiche = {
  numero: 80,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/c7d48a0a-841b-4eb1-a4ee-b40bbfc6d880/vp7_2_orig.png?format=2500w',
  visualId: 7,
  shapes: ['carré', 'carré'],
  fonctionNb: (x: number) => 1 + 2 * x,
  formule: '1+2\\times n',
  type: 'affine',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j < n; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
      }
    }
    newCells.add(VisualPattern.coordToKey([2, 0, this.shapes[0]]))
    return newCells
  },
}

const pattern81: PatternRiche = {
  numero: 81,
  shapes: ['rond'],
  visualId: 5,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/f96d2e80-0bd6-444b-9dc8-8abb96f5731c/vp5_2_orig.png?format=2500w',
  fonctionNb: (x: number) => 3 + 2 * x * (x + 1),
  formule: '3+2\\times n(n+1)',
  type: 'degré2',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, n, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([n, 2 * n, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([n + 1, n - 1, this.shapes[0]]))
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j < n; j++) {
        newCells.add(VisualPattern.coordToKey([i, j, this.shapes[0]]))
        newCells.add(
          VisualPattern.coordToKey([n + 1 + j, n + i, this.shapes[0]]),
        )
      }
    }
    newCells.add(VisualPattern.coordToKey([2, 0, this.shapes[0]]))
    return newCells
  },
}

const pattern82: PatternRiche = {
  numero: 82,
  shapes: ['carréRond'],
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/57dfb354-2e9f-4a19-92ea-34d33ae4caf7/2018-04-05-09-56-48_orig.png?format=2500w',
  visualId: 252,
  fonctionNb: (x: number) => 5 + 6 * x,
  type: 'affine',
  formule: '5+6\\times n',
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([n, 0, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([n, 2 * n, this.shapes[0]]))
    newCells.add(VisualPattern.coordToKey([n + 2, 0, this.shapes[0]]))
    for (let i = 0; i < n + 5; i++) {
      newCells.add(VisualPattern.coordToKey([i + n, n, this.shapes[0]]))
    }
    for (let j = 0; j <= 2 * n; j++) {
      newCells.add(VisualPattern.coordToKey([n, j, this.shapes[0]]))
    }
    for (let j = 0; j <= n; j++) {
      newCells.add(VisualPattern.coordToKey([n + 2, j, this.shapes[0]]))
    }
    for (let z = 0; z < n; z++) {
      newCells.add(
        VisualPattern.coordToKey([n - 1 - z, 2 * n + z + 1, this.shapes[0]]),
      )
      newCells.add(
        VisualPattern.coordToKey([n + 1 + z, 2 * n + z + 1, this.shapes[0]]),
      )
    }

    return newCells
  },
}

// chien, chat, tortue
const pattern83: PatternRicheRepetition = {
  numero: 83,
  shapes: ['chien', 'chat', 'tortue'],
  nbMotifMin: 6,
  fonctionShape: (n: number) => {
    if ((n - 1) % 3 === 0) return listeShapes2DInfos['chien']
    if ((n - 1) % 3 === 1) return listeShapes2DInfos['chat']
    return listeShapes2DInfos['tortue']
  },
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[(n - 1) % 3]]))
    return newCells
  },
}

// losange, hexagone
const pattern84: PatternRicheRepetition = {
  numero: 84,
  shapes: ['losange', 'hexagone'],
  nbMotifMin: 4,
  fonctionShape: (n: number) => {
    if ((n - 1) % 2 === 0) return listeShapes2DInfos['losange']
    return listeShapes2DInfos['hexagone']
  },
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[(n - 1) % 2]]))
    return newCells
  },
}

// fraise, banane, kiwi, citron
const pattern85: PatternRicheRepetition = {
  numero: 85,
  shapes: ['fraise', 'banane', 'kiwi', 'citron'],
  nbMotifMin: 8,
  fonctionShape: (n: number) => {
    if ((n - 1) % 4 === 0) return listeShapes2DInfos['fraise']
    if ((n - 1) % 4 === 1) return listeShapes2DInfos['banane']
    if ((n - 1) % 4 === 2) return listeShapes2DInfos['kiwi']
    return listeShapes2DInfos['citron']
  },
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([0, 0, this.shapes[(n - 1) % 4]]))
    return newCells
  },
}

// rond, carré, carré, triangle, losange, hexagone
const pattern86: PatternRicheRepetition = {
  numero: 86,
  shapes: ['rond', 'carré', 'carré', 'triangle', 'losange', 'hexagone'],
  nbMotifMin: 12,
  fonctionShape: (n: number) => {
    if ((n - 1) % 6 === 0) return listeShapes2DInfos['rond']
    if ((n - 1) % 6 === 1 || n % 6 === 2) return listeShapes2DInfos['carré']
    if ((n - 1) % 6 === 3) return listeShapes2DInfos['triangle']
    if ((n - 1) % 6 === 4) return listeShapes2DInfos['losange']
    return listeShapes2DInfos['hexagone']
  },
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(
      VisualPattern.coordToKey([
        0,
        0,
        ['rond', 'carré', 'carré', 'triangle', 'losange', 'hexagone'][
          (n - 1) % 6
        ],
      ]),
    )
    return newCells
  },
}

// carré, triangle, hexagone, triangle, carré
const pattern87: PatternRicheRepetition = {
  numero: 87,
  shapes: ['carré', 'triangle', 'hexagone'],
  nbMotifMin: 10,
  fonctionShape: (n: number) => {
    if ((n - 1) % 5 === 0) return listeShapes2DInfos['carré']
    if ((n - 1) % 5 === 1) return listeShapes2DInfos['triangle']
    if ((n - 1) % 5 === 2) return listeShapes2DInfos['hexagone']
    if ((n - 1) % 5 === 3) return listeShapes2DInfos['triangle']
    return listeShapes2DInfos['carré']
  },
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    const modulo = (n - 1) % 5
    newCells.add(
      VisualPattern.coordToKey([
        0,
        0,
        modulo % 4 === 0
          ? this.shapes[0]
          : modulo % 2 === 1
            ? this.shapes[1]
            : this.shapes[2],
      ]),
    )
    return newCells
  },
}

// rond, triangle, hexagone, rond
const pattern88: PatternRicheRepetition = {
  numero: 88,
  shapes: ['rond', 'triangle', 'hexagone'],
  nbMotifMin: 8,
  fonctionShape: (n: number) => {
    if ((n - 1) % 4 === 0) return listeShapes2DInfos['rond']
    if ((n - 1) % 4 === 1) return listeShapes2DInfos['triangle']
    if ((n - 1) % 4 === 2) return listeShapes2DInfos['hexagone']
    return listeShapes2DInfos['rond']
  },
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    const modulo = (n - 1) % 4
    newCells.add(
      VisualPattern.coordToKey([
        0,
        0,
        (modulo % 4) % 3 === 0
          ? this.shapes[0]
          : modulo % 4 === 1
            ? this.shapes[1]
            : this.shapes[2],
      ]),
    )
    return newCells
  },
}

// raisin, pomme, pomme, orange
const pattern89: PatternRicheRepetition = {
  numero: 89,
  shapes: ['raisin', 'pomme', 'orange'],
  nbMotifMin: 8,
  fonctionShape: (n: number) => {
    if ((n - 1) % 4 === 0) return listeShapes2DInfos['raisin']
    if ((n - 1) % 4 === 1) return listeShapes2DInfos['pomme']
    if ((n - 1) % 4 === 2) return listeShapes2DInfos['pomme']
    return listeShapes2DInfos['orange']
  },
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    const modulo = (n - 1) % 4
    newCells.add(
      VisualPattern.coordToKey([
        0,
        0,
        modulo % 4 === 0
          ? this.shapes[0]
          : modulo % 4 === 3
            ? this.shapes[2]
            : this.shapes[1],
      ]),
    )
    return newCells
  },
}

const pattern90: PatternRiche = {
  numero: 90,
  shapes: ['triangle'],
  visualId: 100,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/c407a52a-19ae-4f37-b0fa-fbbbe2a3b7fd/4403080_orig.png?format=2500w',
  fonctionNb: (x: number) => (3 ** x - 1) / 2,
  formule: '\\dfrac{3^n-1}{2}',
  fonctionRatio: (x: number) =>
    new Ratio([(3 ** (x - 1) - 1) / 2, 3 ** (x - 1)]),
  texRatio: 'triangles blancs : triangles verts',
  fonctionFraction: (x: number) =>
    new FractionEtendue((3 ** (x - 1) - 1) / 2, (3 ** x - 1) / 2),
  type: 'autre',
  pattern: new VisualPattern([[0, 0, 'triangle', { scale: 3 }]]),
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    function partageTriangle(n: number, x: number, y: number, scale: number) {
      if (n > 1) {
        partageTriangle(n - 1, x, y, scale / 2)
        partageTriangle(n - 1, x + 0.433 * scale, y, scale / 2)
        partageTriangle(n - 1, x + 0.2165 * scale, y + 0.375 * scale, scale / 2)
      } else {
        newCells.add(VisualPattern.coordToKey([x, y, 'triangle', { scale }]))
      }
    }
    partageTriangle(n, n, 1, 5)
    return newCells
  },
}

// allumettes en carrés
const pattern91: PatternRiche = {
  numero: 91,
  shapes: ['allumetteV', 'allumetteH'],
  type: 'autre',
  formule: '3\\times n+1',
  fonctionNb: (x: number) => 3 * x + 1,
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(
      VisualPattern.coordToKey([
        0,
        0,
        this.shapes[0],
        { scale: 1.6, translate: [0, 0] },
      ]),
    ) // allumette
    for (let i = 0; i < n; i++) {
      newCells.add(
        VisualPattern.coordToKey([
          i * 2,
          0,
          this.shapes[1],
          { scale: 1.6, translate: [1, 0.9] },
        ]),
      ) // allumette horizontale haute
      newCells.add(
        VisualPattern.coordToKey([
          i * 2,
          0,
          this.shapes[1],
          { scale: 1.6, translate: [1, -0.9] },
        ]),
      ) // allumette horizontale basse
      newCells.add(
        VisualPattern.coordToKey([
          i * 2,
          0,
          this.shapes[0],
          { scale: 1.6, translate: [2, 0] },
        ]),
      ) // allumette verticale à droite
    }
    return newCells
  },
}

// allumettes en triangles
const pattern92: PatternRiche = {
  numero: 92,
  shapes: ['allumette60', 'allumette120', 'allumetteH'],
  type: 'autre',
  formule: '2\\times n+1',
  fonctionNb: (x: number) => 2 * x + 1,
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(
      VisualPattern.coordToKey([
        0,
        0,
        this.shapes[0],
        { scale: 1.6, translate: [-0.9, 0] },
      ]),
    ) // allumette
    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) {
        newCells.add(
          VisualPattern.coordToKey([
            i,
            0,
            this.shapes[1],
            { scale: 1.6, translate: [0.2, 0] },
          ]),
        ) // allumette120
        newCells.add(
          VisualPattern.coordToKey([
            i,
            0,
            this.shapes[2],
            { scale: 1.6, translate: [-0.3, -0.9] },
          ]),
        ) // allumette horizontale basse
      } else {
        newCells.add(
          VisualPattern.coordToKey([
            i,
            0,
            this.shapes[2],
            { scale: 1.6, translate: [-0.3, 0.9] },
          ]),
        ) // allumette horizontale haute
        newCells.add(
          VisualPattern.coordToKey([
            i,
            0,
            this.shapes[0],
            { scale: 1.6, translate: [0.2, 0] },
          ]),
        ) // allumettt60
      }
    }
    return newCells
  },
}

// allumettes en triangles
const pattern93: PatternRiche = {
  numero: 93,
  shapes: ['allumetteV', 'allumette120'],
  type: 'autre',
  formule: '2\\times n+1',
  fonctionNb: (x: number) => 2 * x + 1,
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(
      VisualPattern.coordToKey([
        0,
        0,
        this.shapes[0],
        { scale: 1.6, translate: [0, 0] },
      ]),
    ) // allumette
    for (let i = 0; i < n; i++) {
      newCells.add(
        VisualPattern.coordToKey([
          1.2 * i,
          0,
          this.shapes[1],
          { scale: 1.6, translate: [0.6, 0], rotate: 180 },
        ]),
      ) // allumette120
      newCells.add(
        VisualPattern.coordToKey([
          1.2 * i,
          0,
          this.shapes[0],
          { scale: 1.6, translate: [1.2, 0] },
        ]),
      ) // allumette horizontale basse
    }
    return newCells
  },
}

const pattern94: PatternRiche = {
  numero: 94,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/385a9845-9d3f-49cf-90c8-ecfc3e10668c/2020-09-26-09-44-00_orig.png?format=2500w',
  visualId: 6,
  shapes: ['allumetteH', 'allumette60', 'allumette120'],
  type: 'autre',
  fonctionNb: (x: number) => 3 ** x,
  formule: '3^n',
  pattern: new VisualPattern([]),
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    function partageTriangle(n: number, x: number, y: number, scale: number) {
      if (n > 1) {
        partageTriangle(n - 1, x + 0.1, y, scale * 0.5)
        partageTriangle(n - 1, x + 0.866 * scale, y, scale * 0.5)
        partageTriangle(n - 1, x + 0.433 * scale, y + 0.75 * scale, scale * 0.5)
      } else {
        newCells.add(
          VisualPattern.coordToKey([
            x,
            y,
            'allumetteH',
            { scale: scale * 1.6 },
          ]),
        )
        newCells.add(
          VisualPattern.coordToKey([
            x - 0.5 * scale,
            y + 0.8 * scale,
            'allumette60',
            { scale: scale * 1.6 },
          ]),
        )
        newCells.add(
          VisualPattern.coordToKey([
            x + 0.5 * scale,
            y + 0.8 * scale,
            'allumette120',
            { scale: scale * 1.6 },
          ]),
        )
      }
    }
    partageTriangle(n, n, 0, 3)
    return newCells
  },
}

const pattern95: PatternRiche = {
  numero: 95,
  shapes: ['chien'],
  type: 'linéaire',
  formule: '2\\times n',
  fonctionNb: (x: number) => 2 * x,
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n; i++) {
      newCells.add(
        VisualPattern.coordToKey([i * 4, 0, this.shapes[0], { scale: 2 }]),
      ) // chien
      newCells.add(
        VisualPattern.coordToKey([i * 4 + 2, 0, this.shapes[0], { scale: 2 }]),
      ) // chien
    }
    return newCells
  },
}

const pattern96: PatternRiche = {
  numero: 96,
  shapes: ['fraise', 'soleil'],
  type: 'affine',
  formule: '1+8\\times n',
  fonctionNb: (x: number) => 1 + 8 * x,
  fonctionRatio: (x: number) => new Ratio([1 + 4 * x, 4 * x]),
  texRatio: 'fraises : soleils',
  fonctionFraction: (x: number) => new FractionEtendue(1 + 4 * x, 4 * x),

  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(VisualPattern.coordToKey([n + 2, 2 * n, this.shapes[0]])) // fraise
    for (let i = 1; i <= n; i++) {
      newCells.add(VisualPattern.coordToKey([n + 2 + i, 2 * n, this.shapes[0]])) // fraise
      newCells.add(VisualPattern.coordToKey([n + 2 - i, 2 * n, this.shapes[0]])) // fraise
      newCells.add(VisualPattern.coordToKey([n + 2, 2 * n + i, this.shapes[0]])) // fraise
      newCells.add(VisualPattern.coordToKey([n + 2, 2 * n - i, this.shapes[0]])) // fraise
    }
    for (let i = n + 1; i <= 2 * n; i++) {
      newCells.add(VisualPattern.coordToKey([n + 2 + i, 2 * n, this.shapes[1]])) // soleil
      newCells.add(VisualPattern.coordToKey([n + 2 - i, 2 * n, this.shapes[1]])) // soleil
      newCells.add(VisualPattern.coordToKey([n + 2, 2 * n + i, this.shapes[1]])) // soleil
      newCells.add(VisualPattern.coordToKey([n + 2, 2 * n - i, this.shapes[1]])) // soleil
    }
    return newCells
  },
}

const pattern97: PatternRiche = {
  numero: 97,
  shapes: ['chat', 'chien', 'fraise', 'cerise'],
  type: 'affine',
  formule: '4\\times n+4',
  fonctionNb: (x: number) => 4 * x + 4,
  fonctionFraction: (x: number) => new FractionEtendue(x + 1, 4 * x + 4),
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    for (let i = 0; i < n + 1; i++) {
      newCells.add(VisualPattern.coordToKey([n + 1, i, this.shapes[0]]))
      newCells.add(VisualPattern.coordToKey([n + 1, n + 2 + i, this.shapes[2]]))

      newCells.add(VisualPattern.coordToKey([n - i + 1, n + 1, this.shapes[3]]))
      newCells.add(VisualPattern.coordToKey([n + 2 + i, n + 1, this.shapes[1]]))
    }
    return newCells
  },
}
// flèche en allumettes
const pattern98: PatternRiche = {
  numero: 98,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/863acf91-20a3-4821-9e33-0dd6ceb3e3f0/vp52_2_orig.png?format=2500w',
  visualId: 53,
  shapes: ['allumetteV'],
  type: 'affine',
  fonctionNb: (x: number) => 3 * x + 3,
  formule: '3\\times n+ 3',
  pattern: new VisualPattern([]),
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(
      VisualPattern.coordToKey([
        n * 2,
        1,
        this.shapes[0],
        { scale: 2, rotate: 60 },
      ]),
    )
    newCells.add(
      VisualPattern.coordToKey([
        n * 2,
        0,
        this.shapes[0],
        { scale: 2, rotate: -60 },
      ]),
    )
    newCells.add(
      VisualPattern.coordToKey([n * 2 - 1, 0.5, this.shapes[0], { scale: 2 }]),
    )
    for (let i = 0; i < n; i++) {
      newCells.add(
        VisualPattern.coordToKey([
          i * 2 - 1,
          0.5,
          this.shapes[0],
          { scale: 2 },
        ]),
      )
      newCells.add(
        VisualPattern.coordToKey([
          i * 2,
          1.5,
          this.shapes[0],
          { scale: 2, rotate: 90 },
        ]),
      )
      newCells.add(
        VisualPattern.coordToKey([
          i * 2,
          -0.5,
          this.shapes[0],
          { scale: 2, rotate: 90 },
        ]),
      )
    }
    return newCells
  },
}

// flèche en allumettes
const pattern99: PatternRiche = {
  numero: 99,
  visualImg:
    'https://images.squarespace-cdn.com/content/v1/647f8c4916cb6662848ba604/38a70e2e-75f6-4395-b2d5-15b83aa73771/vp55_2.png?format=2500w',
  visualId: 55,
  shapes: ['allumetteV'],
  type: 'affine',
  fonctionNb: (x: number) => 3 * x + 5,
  formule: '3\\times n+ 5',
  pattern: new VisualPattern([]),
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    newCells.add(
      VisualPattern.coordToKey([
        n * 2,
        -0.8,
        this.shapes[0],
        { scale: 2, rotate: -108 },
      ]),
    )
    newCells.add(
      VisualPattern.coordToKey([
        n * 2,
        1.8,
        this.shapes[0],
        { scale: 2, rotate: -72 },
      ]),
    )
    newCells.add(
      VisualPattern.coordToKey([
        n * 2 + 1.6,
        -0.3,
        this.shapes[0],
        { scale: 2, rotate: -36 },
      ]),
    )
    newCells.add(
      VisualPattern.coordToKey([
        n * 2 + 1.6,
        1.2,
        this.shapes[0],
        { scale: 2, rotate: 36 },
      ]),
    )
    newCells.add(
      VisualPattern.coordToKey([n * 2 - 1, 0.5, this.shapes[0], { scale: 2 }]),
    )
    for (let i = 0; i < n; i++) {
      newCells.add(
        VisualPattern.coordToKey([
          i * 2 - 1,
          0.5,
          this.shapes[0],
          { scale: 2, rotate: 180 },
        ]),
      )
      newCells.add(
        VisualPattern.coordToKey([
          i * 2,
          1.5,
          this.shapes[0],
          { scale: 2, rotate: 90 },
        ]),
      )
      newCells.add(
        VisualPattern.coordToKey([
          i * 2,
          -0.5,
          this.shapes[0],
          { scale: 2, rotate: -90 },
        ]),
      )
    }
    return newCells
  },
}

const pattern100: PatternRicheRepetition = {
  shapes: ['cadeau', 'explosion'],
  nbMotifMin: 10,
  numero: 100,
  fonctionShape: (n: number) => {
    return [listeShapes2DInfos['cadeau'], listeShapes2DInfos['explosion']][
      Number.isInteger(Math.sqrt(9 + 8 * n)) ? 0 : 1
    ]
  },
  iterate: function (this: VisualPattern, n?: number) {
    if (n === undefined) n = 0

    const newCells = new Set<string>()
    newCells.add(
      VisualPattern.coordToKey([
        0,
        0,
        ['cadeau', 'explosion'][Number.isInteger(Math.sqrt(9 + 8 * n)) ? 0 : 1],
      ]),
    ) // explosion ou cadeau
    return newCells
  },
}

// triangle de Sierpinski avec des carrés
const pattern101: PatternRiche = {
  shapes: ['carré'],
  numero: 101,
  fonctionNb: (x: number) => (3 ** x - 2) * 2,
  formule: '\\dfrac{3^n-1}{2}',
  fonctionRatio: (x: number) => new Ratio([3 ** (x - 2), 3 ** (x - 1)]),
  texRatio: 'carrés blancs : carrés gris',
  fonctionFraction: (x: number) =>
    new FractionEtendue(3 ** (x - 1), 2 * 3 ** (x - 2)),
  type: 'fractal',
  pattern: new VisualPattern([]),
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    function partageCarré(n: number, x: number, y: number, scale: number) {
      if (n > 1) {
        partageCarré(n - 1, x, y - scale / 4, scale / 2)
        partageCarré(n - 1, x + scale * 0.5, y - scale / 4, scale / 2)
        partageCarré(n - 1, x + scale * 0.25, y + scale / 4, scale / 2)
      } else {
        newCells.add(VisualPattern.coordToKey([x, y, 'carré', { scale }]))
      }
    }
    partageCarré(n, 0, 2, 5)
    return newCells
  },
}

// Tapis de Serpinski
const pattern102: PatternRiche = {
  shapes: ['carré', 'carréBleu'],
  numero: 101,
  fonctionNb: (x: number) => (3 ** x - 1) / 2,
  formule: '\\dfrac{3^n-1}{2}',
  fonctionRatio: (x: number) =>
    new Ratio([(3 ** (x - 1) - 1) / 2, 8 ** (x - 1)]),
  texRatio: 'carrés blancs : carrés bleus',
  fonctionFraction: (x: number) =>
    new FractionEtendue((3 ** (x - 1) - 1) / 2, (3 ** x - 1) / 2),
  type: 'fractal',
  pattern: new VisualPattern([]),
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    function evideCarré(n: number, x: number, y: number, scale: number) {
      if (n > 1) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (!(i === 1 && j === 1)) {
              evideCarré(
                n - 1,
                x + (i * scale) / 3,
                y + (j * scale) / 3,
                scale / 3,
              )
            }
          }
        }
      } else {
        newCells.add(
          VisualPattern.coordToKey([
            x + scale / 3,
            y + scale / 3,
            'carréBleu',
            { scale },
          ]),
        )
      }
    }
    evideCarré(n, 0, 2, 5)
    return newCells
  },
}

const pattern103: PatternRiche = {
  shapes: ['pentagone'],
  numero: 101,
  fonctionNb: (x: number) => (3 ** x - 1) / 2,
  formule: '\\dfrac{3^n-1}{2}',
  type: 'fractal',
  pattern: new VisualPattern([]),
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    function DecoupePenta(n: number, x: number, y: number, scale: number) {
      // Facteur d'échelle pour coller parfaitement les pentagones
      const phi = (1 + Math.sqrt(5)) / 2 // Nombre d'or
      const apo = 0.809

      const k = (1 / phi) ** 2
      if (n > 1) {
        for (let i = 0; i < 5; i++) {
          const teta = ((i * 2 + 0.5) * Math.PI) / 5
          DecoupePenta(
            n - 1,
            x + scale * k * apo * Math.cos(teta),
            y + scale * k * apo * Math.sin(teta),
            scale * k,
          )
        }
      } else {
        newCells.add(VisualPattern.coordToKey([x, y, 'pentagone', { scale }]))
        // newCells.add(VisualPattern.coordToKey([x + scale / 3, y + scale / 3, 'carréBleu', { scale }]))
      }
    }
    DecoupePenta(n, 0, 2, 6)
    return newCells
  },
}

const pattern104: PatternRiche = {
  shapes: ['allumetteH'],
  numero: 104,
  type: 'fractal',
  formule: '2\\times n+1',
  fonctionNb: (x: number) => 2 * x + 1,
  iterate: function (this: VisualPattern, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    function casseSegment(
      n: number,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      depth: number,
    ) {
      if (depth === 0) {
        // Calcul de l'angle du segment pour l'orientation du dessin
        const angle = Math.atan2(y2 - y1, x2 - x1)
        const scale = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
        // Le segmentHorizontal est centré en (0,0) et de longueur 1, donc on centre à [(x1+x2)/2, (y1+y2)/2]
        newCells.add(
          VisualPattern.coordToKey([
            (x1 + x2) / 2,
            (y1 + y2) / 2,
            'allumetteH',
            { scale, rotate: (angle * 180) / Math.PI },
          ]),
        )
      } else {
        // Découpe le segment en 4 parties selon la géométrie du flocon de Koch
        const dx = (x2 - x1) / 3
        const dy = (y2 - y1) / 3
        const xA = x1 + dx
        const yA = y1 + dy
        const xB = x1 + 2 * dx
        const yB = y1 + 2 * dy
        // Calcul du sommet du "pic"
        const angle = Math.atan2(y2 - y1, x2 - x1) + Math.PI / 3
        const xC = xA + Math.cos(angle) * Math.sqrt(dx * dx + dy * dy)
        const yC = yA + Math.sin(angle) * Math.sqrt(dx * dx + dy * dy)
        casseSegment(n, x1, y1, xA, yA, depth - 1)
        casseSegment(n, xA, yA, xC, yC, depth - 1)
        casseSegment(n, xC, yC, xB, yB, depth - 1)
        casseSegment(n, xB, yB, x2, y2, depth - 1)
      }
    }
    // Exemple : segment horizontal de longueur 3, profondeur n
    casseSegment(n, 0, 0, 5, 0, n)
    return newCells
  },
}

// problème avec mes cubes iso qui n'étaient pas prévus pour être rétrécis.
// Il faut sans doute que je crée un nouveau type de cube pour les fractals non dynamique, sans rotation.
// sans intéraction, mais scalable.
/*
const pattern105: PatternRiche3D = {
  numero: 105,
  fonctionNb: (x:number) => 2 ** x,
  formule: '2^n',
  type: 'fractal',

  iterate3d: function (this: VisualPattern3DIso, n) {
    if (n === undefined) n = 1
    const newCells = new Set<string>()
    const cubes: [number, number, number, number][] = [] // Commence avec un cube à l'origine
    function casseCube (n: number, x: number, y: number, z: number, scale: number) {
      if (n === 1) {
        cubes.push([x, y, z, scale])
      } else {
        const newScale = scale / 3
        // Les 8 sommets du cube, chaque sommet est à une distance newScale de x, y, z
        for (const dx of [-1, 1]) {
          for (const dy of [-1, 1]) {
            for (const dz of [-1, 1]) {
              casseCube(n - 1, x + dx * newScale, y + dy * newScale, z + dz * newScale, newScale)
            }
          }
        }
      }
    }
    casseCube(n, 0, 1, 0, 3)

    const sortedCubes = rangeCubes(cubes)
    for (const [x, y, z, scale] of sortedCubes) {
      const key = VisualPattern3DIso.coordToKey([x, y, z, { scale: scale ?? 1 }])
      if (newCells.has(key)) {
        newCells.delete(key) // Supprimer la cellule si elle existe déjà car en 3d il peut y avoir des superpositions et c'est la dernière qui doit être dessinée.
      }
      newCells.add(VisualPattern3DIso.coordToKey([x, y, z, { scale: scale ?? 1 }]))
    }
    return newCells
  }

}
*/
const listePatternsRepetition: PatternRicheRepetition[] = [
  pattern83,
  pattern84,
  pattern85,
  pattern86,
  pattern87,
  pattern88,
  pattern89,
  pattern100,
].sort((a, b) => Number(a.numero) - Number(b.numero))

const listePatternsPreDef: (PatternRiche | PatternRiche3D)[] = [
  pattern1,
  pattern2,
  pattern3,
  pattern4,
  pattern5,
  pattern6,
  pattern7,
  pattern8,
  pattern9,
  pattern10,
  pattern11,
  pattern12,
  pattern13,
  pattern14,
  pattern15,
  pattern16,
  pattern17,
  pattern18,
  pattern19,
  pattern20,
  pattern21,
  pattern22,
  pattern23,
  pattern24,
  pattern25,
  pattern26,
  pattern27,
  pattern28,
  pattern29,
  pattern30,
  pattern31,
  pattern32,
  pattern33,
  pattern34,
  pattern35,
  pattern36,
  pattern37,
  pattern38,
  pattern39,
  pattern40,
  pattern41,
  pattern42,
  pattern43,
  pattern44,
  pattern45,
  pattern46,
  pattern47,
  pattern48,
  pattern49,
  pattern50,
  pattern51,
  pattern52,
  pattern53,
  pattern54,
  pattern55,
  pattern56,
  pattern57,
  pattern58,
  pattern59,
  pattern60,
  pattern61,
  pattern62,
  pattern63,
  pattern64,
  pattern65,
  pattern66,
  pattern67,
  pattern68,
  pattern69,
  pattern70,
  pattern71,
  pattern72,
  pattern73,
  pattern74,
  pattern75,
  pattern76,
  pattern77,
  pattern78,
  pattern79,
  pattern80,
  pattern81,
  pattern82,
  pattern90,
  pattern91,
  pattern92,
  pattern93,
  pattern94,
  pattern95,
  pattern96,
  pattern97,
  pattern98,
  pattern99,
  pattern101,
  pattern102,
  pattern103,
  pattern104,
].sort((a, b) => Number(a.numero) - Number(b.numero))
/**
 * Liste des patterns prédéfinis, triés par type.
 * - listePattern2d : tous les patterns 2D
 * - listePattern3d : tous les patterns 3D
 * - listePatternAffine : tous les patterns affines
 * - listePatternLineaire : tous les patterns linéaires
 * - listePatternDegre2 : tous les patterns de degré 2
 * - listePatternDegre3 : tous les patterns de degré 3
 */
const listePattern2d: PatternRiche[] = listePatternsPreDef
  .filter((p) => p instanceof VisualPattern)
  .sort((a, b) => Number(a.numero) - Number(b.numero)) as PatternRiche[]
const listePattern3d: PatternRiche3D[] = listePatternsPreDef
  .filter((p) => 'iterate3d' in p && typeof p.iterate3d === 'function')
  .sort((a, b) => Number(a.numero) - Number(b.numero)) as PatternRiche3D[]
const listePatternAffine: (PatternRiche | PatternRiche3D)[] =
  listePatternsPreDef
    .filter((p) => p.type === 'affine')
    .sort((a, b) => Number(a.numero) - Number(b.numero))
const listePatternLineaire: (PatternRiche | PatternRiche3D)[] =
  listePatternsPreDef
    .filter((p) => p.type === 'linéaire')
    .sort((a, b) => Number(a.numero) - Number(b.numero))
const listePatternDegre2: (PatternRiche | PatternRiche3D)[] =
  listePatternsPreDef
    .filter((p) => p.type === 'degré2')
    .sort((a, b) => Number(a.numero) - Number(b.numero))
const listePatternDegre3: (PatternRiche | PatternRiche3D)[] =
  listePatternsPreDef
    .filter((p) => p.type === 'degré3')
    .sort((a, b) => Number(a.numero) - Number(b.numero))
const listePattern2dAffine: PatternRiche[] = listePattern2d
  .filter((p) => p instanceof VisualPattern && p.type === 'affine')
  .sort((a, b) => Number(a.numero) - Number(b.numero))
const listePattern2dLineaire: PatternRiche[] = listePattern2d
  .filter((p) => p instanceof VisualPattern && p.type === 'linéaire')
  .sort((a, b) => Number(a.numero) - Number(b.numero))
const listePatternAutres: (PatternRiche | PatternRiche3D)[] = listePattern2d
  .filter((p) => p.type === 'autre')
  .sort((a, b) => Number(a.numero) - Number(b.numero))
const listePatternRatio: (PatternRiche | PatternRiche3D)[] = listePatternsPreDef
  .filter((p) => p.fonctionRatio != null)
  .sort((a, b) => Number(a.numero) - Number(b.numero))
const listePatternFraction: PatternRiche[] = listePattern2d
  .filter((p) => p.fonctionFraction != null)
  .sort((a, b) => Number(a.numero) - Number(b.numero))
const listePatternAffineOuLineaire: (PatternRiche | PatternRiche3D)[] =
  listePatternsPreDef
    .filter((p) => p.type === 'affine' || p.type === 'linéaire')
    .sort((a, b) => Number(a.numero) - Number(b.numero))

const listePatternsFor6I13 = listePatternsPreDef
  .filter(
    (p) =>
      p.fonctionRatio == null &&
      p.fonctionFraction == null &&
      p.type !== 'autre' &&
      p.type !== 'degré3' &&
      p.type !== 'degré2' &&
      p.type !== 'fractal',
  )
  .sort((a, b) => Number(a.numero) - Number(b.numero))
const listePatternsFor6I131 = listePatternAffineOuLineaire
  .filter(
    (p) =>
      p.fonctionRatio == null &&
      p.fonctionFraction == null &&
      (!('shapes' in p) || p.shapes.length === 1),
  )
  .sort((a, b) => Number(a.numero) - Number(b.numero))
const listePatternsFor4A13 = listePatternAffineOuLineaire
  .filter((p) => p.fonctionRatio == null && p.fonctionFraction == null)
  .sort((a, b) => Number(a.numero) - Number(b.numero))
const lisdtePatternsFor5L105 = listePatternAffineOuLineaire
  .filter(
    (p) =>
      !('iterate3d' in p) &&
      p.fonctionRatio == null &&
      p.fonctionFraction == null,
  )
  .sort((a, b) => Number(a.numero) - Number(b.numero))
const listePatternsFor5I13 = listePatternAffineOuLineaire
  .filter((p) => p.fonctionRatio == null && p.fonctionFraction == null)
  .sort((a, b) => Number(a.numero) - Number(b.numero))
const listePatternsFor6N4B = listePatternsFor5I13
export {
  lisdtePatternsFor5L105,
  listePattern2d,
  listePattern2dAffine,
  listePattern2dLineaire,
  listePattern3d,
  listePatternAffine,
  listePatternAffineOuLineaire,
  listePatternAutres,
  listePatternDegre2,
  listePatternDegre3,
  listePatternFraction,
  listePatternLineaire,
  listePatternRatio,
  listePatternsFor4A13,
  listePatternsFor5I13,
  listePatternsFor6I13,
  listePatternsFor6I131,
  listePatternsFor6N4B,
  listePatternsPreDef,
  listePatternsRepetition,
}
