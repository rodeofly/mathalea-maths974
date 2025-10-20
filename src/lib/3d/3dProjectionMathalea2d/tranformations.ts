import {
  ObjetMathalea2D,
  colorToLatexOrHTML,
  fixeBordures,
} from '../../../modules/2dGeneralites'
import { segment } from '../../2d/segmentsVecteurs'
import {
  Point3d,
  Vecteur3d,
  point3d,
  vecteur3d,
  Polygone3d,
  Droite3d,
  polygone3d,
  droite3d,
  arete3d,
} from './elements'
import { cross, dot, matrix, multiply, norm } from 'mathjs'

export const math = { matrix, multiply, norm, cross, dot }
/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% TRANSFORMATIONS%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/
/**
 * LA ROTATION VECTORIELLE
 *
 * @author Jean-Claude Lhote
 * Cette rotation se distingue de la rotation d'axe (d) par le fait qu'on tourne autour d'une droite vectorielle
 * Elle sert à faire tourner des vecteurs essentiellement.
 * Si on l'utilise sur un point, alors il tournera autour d'une droite passant par l'origine.
 *
 * @param {*} point3D pour l'instant, cette fonction ne fait tourner qu'un point3d ou un vecteur3d
 * @param {*} vecteur3D vecteur directeur de l'axe de rotation (l'axe passe par l'origine, pour tourner autour d'une droite particulière on utilise rotation3d())
 * @param {*} angle Angle de rotation
 */

export function rotationV3d<T extends Point3d | Vecteur3d>(
  point3D: T,
  vecteur3D: Vecteur3d,
  angle: number,
): T {
  let V, p2
  const norme = math.norm(vecteur3D.matrice)
  const unitaire = math.multiply(vecteur3D.matrice, 1 / norme)
  const u = unitaire._data[0]
  const v = unitaire._data[1]
  const w = unitaire._data[2]
  const c = Math.cos((angle * Math.PI) / 180)
  const s = Math.sin((angle * Math.PI) / 180)
  const k = 1 - c
  const matrice = math.matrix([
    [u * u * k + c, u * v * k - w * s, u * w * k + v * s],
    [u * v * k + w * s, v * v * k + c, v * w * k - u * s],
    [u * w * k - v * s, v * w * k + u * s, w * w * k + c],
  ])
  if (point3D instanceof Point3d) {
    V = math.matrix([point3D.x, point3D.y, point3D.z])
    p2 = math.multiply(matrice, V)
    return point3d(p2._data[0], p2._data[1], p2._data[2]) as T
  } else if (point3D instanceof Vecteur3d) {
    V = point3D
    p2 = math.multiply(matrice, V.matrice)
    return vecteur3d(p2._data[0], p2._data[1], p2._data[2]) as T
  }
}
/**
 * LA ROTATION D'AXE UNE DROITE
 *
 * @author Jean-Claude Lhote
 *
 * @param {Point3d} point3D Pour l'instant on ne fait tourner qu'un point3d
 * Remarque : ça n'a aucun sens de faire tourner un vecteur autour d'une droite particulière, on utilise la rotation vectorielle pour ça.
 * @param {Droite3d} droite3D Axe de rotation
 * @param {Number} angle Angle de rotation
 * @param {string} color couleur du polygone créé. si non précisé la couleur sera celle du polygone argument
 */

export function rotation3d<T extends Point3d | Vecteur3d | Polygone3d>(
  point3D: T,
  droite3D: Droite3d,
  angle: number,
  color?: string,
): T {
  const directeur = droite3D.directeur
  const origine = droite3D.origine
  if (point3D instanceof Point3d) {
    const V = vecteur3d(origine, point3d(0, 0, 0))
    const W = vecteur3d(point3d(0, 0, 0), origine)
    const M = translation3d(point3D, V)
    const N = rotationV3d(M, directeur, angle)
    return translation3d(N, W)
  }
  if (point3D instanceof Vecteur3d) {
    return rotationV3d(point3D, directeur, angle)
  }
  if (point3D instanceof Polygone3d) {
    const rotated = point3D.listePoints.map((p: Point3d) =>
      rotation3d(p, droite3D, angle),
    )
    return polygone3d(rotated, color ?? point3D.color) as T
  }
}
/**
 * @author Jean-Claude Lhote
 * Crée une flèche en arc de cercle pour montrer un sens de rotation autour d'un axe 3d
 * cette flèche est dessinée dans le plan orthogonal à l'axe qui passe par l'origine de l'axe
 * le rayon est ici un vecteur 3d qui permet de fixer le point de départ de la flèche par translation de l'origine de l'axe
 * l'angle définit l'arc formé par la flèche
 * son sens est définit par le vecteur directeur de l'axe (changer le signe de chaque composante de ce vecteur pour changer le sens de rotation)
 */

export class SensDeRotation3d extends ObjetMathalea2D {
  constructor(
    axe: Droite3d,
    rayon: Vecteur3d,
    angle: number,
    epaisseur: number,
    color: string,
  ) {
    super()
    this.epaisseur = epaisseur
    this.color = colorToLatexOrHTML(color)
    this.c2d = []
    let M
    let N
    let s
    M = translation3d(axe.origine, rayon)
    for (let i = 0; i < angle; i += 5) {
      N = rotation3d(M, axe, 5)
      s = segment(M.c2d, N.c2d, color)
      s.epaisseur = this.epaisseur
      this.c2d.push(s)
      M = N
    }
    N = rotation3d(M, axe, 5)
    s = segment(M.c2d, N.c2d, color)
    s.epaisseur = this.epaisseur
    this.c2d.push(s)
    const d = droite3d(N, axe.directeur)
    const A = rotation3d(M, d, 30)
    const B = rotation3d(M, d, -30)
    s = segment(N.c2d, A.c2d, color)
    s.epaisseur = this.epaisseur
    this.c2d.push(s)
    s = segment(N.c2d, B.c2d, color)
    s.epaisseur = this.epaisseur
    this.c2d.push(s)
  }
}

export function sensDeRotation3d(
  axe: Droite3d,
  rayon: Vecteur3d,
  angle: number,
  epaisseur: number,
  color: string,
) {
  return new SensDeRotation3d(axe, rayon, angle, epaisseur, color)
}
/**
 * LA TRANSLATION
 *
 * @author Jean-Claude Lhote
 * @param {Point3d | Polygone3d} point3D Pour l'instant on ne translate qu'un point3d ou un polygone3d
 * @param {Vecteur3d} vecteur3D
 */

export function translation3d<T extends Point3d | Polygone3d>(
  point3D: T,
  vecteur3D: Vecteur3d,
): T {
  if (point3D instanceof Point3d) {
    const x = point3D.x + vecteur3D.x
    const y = point3D.y + vecteur3D.y
    const z = point3D.z + vecteur3D.z
    return point3d(x, y, z) as T
  } else if (point3D instanceof Polygone3d) {
    const p = []
    for (let i = 0; i < point3D.listePoints.length; i++) {
      p.push(translation3d(point3D.listePoints[i], vecteur3D))
    }
    return polygone3d(p, point3D.color) as T
  }
  window.notify(
    "translation3d ne peut être appliqué qu'à un point3d ou un polygone3d",
    point3D,
  )
  return point3D
}
/**
 * L'homothetie
 * @author Jean-Claude Lhote
 * La même chose qu'ne 2d, mais en 3d...
 * Pour les points3d les polygones ou les vecteurs (multiplication scalaire par rapport)
 */

export function homothetie3d<T extends Point3d | Vecteur3d | Polygone3d>(
  point3D: T,
  centre: Point3d,
  rapport: number,
  color?: string,
): T {
  let V
  const p = []
  if (point3D instanceof Point3d) {
    V = vecteur3d(centre, point3D)
    V.x *= rapport
    V.y *= rapport
    V.z *= rapport
    return translation3d(centre, V) as T
  } else if (point3D instanceof Vecteur3d) {
    V = vecteur3d(point3D.x, point3D.y, point3D.z)
    V.x *= rapport
    V.y *= rapport
    V.z *= rapport
    return V as T
  } else if (point3D instanceof Polygone3d) {
    for (let i = 0; i < point3D.listePoints.length; i++) {
      p.push(homothetie3d(point3D.listePoints[i], centre, rapport, color))
    }
    return polygone3d(p, color ?? point3D.color) as T
  }
  window.notify(
    "homothetie3d ne peut être appliqué qu'à un point3d, un vecteur3d ou un polygone3d",
    point3D,
  )
  return point3D
}

export class CodageAngleDroit3D extends ObjetMathalea2D {
  constructor(A: Point3d, B: Point3d, C: Point3d, color = 'black', taille = 1) {
    super()
    const BA = vecteur3d(B, A)
    const BC = vecteur3d(B, C)
    const k1 = BA.norme
    const k2 = BC.norme
    const M1 = homothetie3d(A, B, (taille * 0.5) / k1)
    const M3 = homothetie3d(C, B, (taille * 0.5) / k2)
    const BM1 = vecteur3d(B, M1)
    const BM3 = vecteur3d(B, M3)
    const x = B.x + BM1.x + BM3.x
    const y = B.y + BM1.y + BM3.y
    const z = B.z + BM1.z + BM3.z
    const M2 = point3d(x, y, z)
    const M1M2 = arete3d(M1, M2, color)
    const M2M3 = arete3d(M2, M3, color)
    const bordures = fixeBordures([M1M2.c2d, M2M3.c2d])
    this.bordures = [bordures.xmin, bordures.ymin, bordures.xmax, bordures.ymax]
    this.svg = function (coeff) {
      return M1M2.c2d.svg(coeff) + M2M3.c2d.svg(coeff)
    }
    this.tikz = function () {
      return M1M2.c2d.tikz() + M2M3.c2d.tikz()
    }
  }
}
