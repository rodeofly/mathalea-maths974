import { floor } from 'mathjs'
import {
  colorToLatexOrHTML,
  ObjetMathalea2D,
} from '../../modules/2dGeneralites'
import { randint } from '../../modules/outils'
import { CodageAngleDroit, codageAngleDroit } from './angles'
import { cercle } from './cercle'
import { CodageMilieu } from './codages'
import { Droite, droite, mediatrice } from './droites'
import {
  milieu,
  Point,
  point,
  pointIntersectionCC,
  pointIntersectionDD,
  pointIntersectionLC,
  pointSurSegment,
} from './points'
import { Polygone, polygone } from './polygones'
import { longueur } from './segmentsVecteurs'
import { projectionOrtho, rotation, similitude } from './transformations'
import type { PointAbstrait } from './points-abstraits'

/**
 * retourne un objet contenant le triangle ABC et le pied de la hauteur H
 * @param {point} A première extrémité de la base
 * @param {point} B deuxième extrémité de la base
 * @param {number} h hauteur du triangle en cm
 * @param {number} d valeur algébrique de AH où H est le pied de la hauteur
 * @param {*} n = 1 ou 2 permet de choisir le côté pour C.
 * @author Jean-Claude Lhote
 * @return {objet} {triangle, pied}
 */
export function triangle2points1hauteur(
  A: Point,
  B: Point,
  h: number,
  d: number,
  n = 1,
  color = 'black',
) {
  if (d === undefined) {
    d = randint(0, floor(longueur(A, B)))
  }
  const H = pointSurSegment(A, B, d)
  const C = similitude(A, H, 90 * (3 - n * 2), h / longueur(A, H))
  return { triangle: polygone([A, B, C], color), pied: H }
}

/**
 * @param {Point} A
 * @param {Point} B
 * @param {number} l1
 * @param {number} l2
 * @param {number} [n=1] Si n = 1 (défaut), C a la plus grande ordonnée possible, si n = 2, C a la plus petite ordonnée possible
 * @return {Polygone} objet Polygone ABC
 * @example t = triangle2points2longueurs(A,B,4,7,2) // Récupère t le triangle ABC tel que AC = 4 cm et BC = 7 cm avec C qui a l'ordonnée la plus petite possible
 * @example C = t.listePoints[2] // Récupère le 3e sommet dans la variable C
 * @author Rémi Angot
 */
export function triangle2points2longueurs(
  A: Point,
  B: Point,
  l1: number,
  l2: number,
  n = 1,
  color = 'black',
) {
  const c1 = cercle(A, l1)
  const c2 = cercle(B, l2)
  let C: Point
  if (n === 1) {
    C = pointIntersectionCC(c1, c2)
  } else {
    C = pointIntersectionCC(c1, c2, '', 2)
  }
  return polygone([A, B, C], color)
}

/**
 * t = triangle2points2angles(A,B,40,60) // Trace le triangle ABC tel que CAB = +40° et CBA = -60°
 * C = t.listePoints[2] // Récupère le 3e sommet dans la variable C
 * t = triangle2points2angles(A,B,40,60,2) // Trace le triangle ABC tel que CAB = -40° et CBA = 60°
 * @author Rémi Angot
 */
export function triangle2points2angles(
  A: Point,
  B: Point,
  a1: number,
  a2: number,
  n = 1,
  color = 'black',
) {
  if (n === 1) {
    a2 *= -1
  } else {
    a1 *= -1
  }
  const a = pointSurSegment(A, B, 1)
  const c1 = rotation(a, A, a1)
  const b = pointSurSegment(B, A, 1)
  const c2 = rotation(b, B, a2)
  const dAc1 = droite(A, c1)
  const dBc2 = droite(B, c2)
  const C = pointIntersectionDD(dAc1, dBc2, 'C')
  return polygone([A, B, C], color)
}

/**
 *
 * @param {Point} A Le sommet pour l'angle donné = première extrémité du segment de base du triangle
 * @param {Point} B L'autre extrémité du segment de base
 * @param {number} a l'angle au sommet A (angle compris entre 0 et 180 sinon il y est contraint)
 * @param {number} l la longueur du deuxième côté de l'angle
 * @param {number} n n=1 l'angle a est pris dans le sens direct, n différent de 1, l'angle a est pris dans le sens indirect.
 * t = triangle2points1angle1longueur(A,B,40,6) // Trace le triangle ABC tel que CAB = 40° et AC=6
 * @author Jean-Claude Lhote
 */
export function triangle2points1angle1longueur(
  A: Point,
  B: Point,
  a: number,
  l: number,
  n = 1,
  color = 'black',
) {
  if (n === 1) {
    a = Math.abs(a) % 180
  } else {
    a = -(Math.abs(a) % 180)
  }
  const P = pointSurSegment(A, B, l)
  const Q = rotation(P, A, a)
  return polygone([A, B, Q], color)
}

/**
 * @param {Point} A Le sommet pour l'angle donné = première extrémité du segment de base du triangle
 * @param {Point} B L'autre extrémité du segment de base
 * @param {number} a l'angle au sommet A (angle compris entre 0 et 180 sinon il y est contraint)
 * @param {number} l la longueur du côté opposé à l'angle
 * @param {number} n n=1 l'angle a est pris dans le sens direct et le point est le plus près de A
 * n=2 l'angle est pris dans le sens indirect et le point est le plus près de A
 * n=3 l'angle a est pris dans le sens direct et le point est le plus loin de A
 * n=4 l'angle est pris dans le sens indirect et le point est le plus loin de A
 * t = triangle2points1angle1longueurOppose(A,B,40,6) // Trace le triangle ABC tel que CAB = 40° et BC=6 Le point C est celui des deux points possible le plus près de A
 * @author Jean-Claude Lhote
 */
export function triangle2points1angle1longueurOppose(
  A: Point,
  B: Point,
  a: number,
  l: number,
  n = 1,
  color = 'black',
) {
  let M: Point
  if (n % 2 === 1) {
    a = Math.abs(a) % 180
  } else {
    a = -(Math.abs(a) % 180)
  }
  const d = droite(A, B)
  const e = rotation(d, A, a)
  const c = cercle(B, l)
  if ((n + 1) >> 1 === 1) M = pointIntersectionLC(e, c, '', 1)
  else M = pointIntersectionLC(e, c, '', 2)
  return polygone([A, B, M], color)
}

/**
 * Retourne l'aire du triangle si p est un triangle, false sinon.
 * @param {Polygone} p Triangle
 * @example aireTriangle(poygone(A,B,C)) // Retourne l'aire du triangle ABC
 * @example aireTriangle(poygone(A,B,C,D)) // Retourne false car le polygone n'est pas un triangle
 * @author Jean-Claude Lhote
 * @return {boolean|number}
 */
// JSDOC Validee par EE Juin 2022
export function aireTriangle(p: Polygone) {
  if (p.listePoints.length !== 3) return false
  const A = p.listePoints[0]
  const B = p.listePoints[1]
  const C = p.listePoints[2]
  return (
    (1 / 2) * Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y))
  )
}

/**
 * Médiane issue de A relative à [BC]
 * @author Jean-Claude Lhote
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} color
 */
export function medianeTriangle(A: Point, B: Point, C: Point, color = 'black') {
  const I = milieu(B, C)
  return droite(A, I, '', color)
}

/**
 * Crée le centre de gravité du triangle ABC
 * @param {Point} A Premier sommet du triangle
 * @param {Point} B Deuxième sommet du triangle
 * @param {Point} C Troisième sommet du triangle
 * @param {string} [nom=''] Nom du centre
 * @param {string} [positionLabel = 'above'] Position du nom par rapport au point
 * @example G = centreGraviteTriangle(F,C,N)
 * // Crée G, le centre de gravité du triangle FCN,sans être nommé.
 * @example G = centreGraviteTriangle(F,C,N,'G','below')
 * // Crée G, le centre de gravité du triangle FCN, en notant G sous le point, s'il est tracé et labellisé.
 * @return {Point}
 * @author Jean-Claude Lhote
 */
// JSDOC Validee par EE Juin 2022
export function centreGraviteTriangle(
  A: Point,
  B: Point,
  C: Point,
  nom = '',
  positionLabel = 'above',
) {
  const d = medianeTriangle(B, A, C)
  const e = medianeTriangle(A, B, C)
  const p = pointIntersectionDD(d, e)
  const x = p.x
  const y = p.y
  return new Point(x, y, nom, positionLabel)
}

/**  Trace la hauteur issue de A relative à [BC]
 * @param {Point} A Point dont est issue la hauteur
 * @param {Point} B Première extrémité du segment dont est relative la hauteur
 * @param {Point} C Seconde extrémité du segment dont est relative la hauteur
 * @param {string} [color = 'black'] Couleur de cette hauteur : du type 'blue' ou du type '#f15929'
 * @example hauteurTriangle (M, N, P) // Trace, en noir, la hauteur issue de M relative à [NP]
 * @example hauteurTriangle (M, N, P, 'red') // Trace, en rouge, la hauteur issue de M relative à [NP]
 * @author Jean-Claude Lhote
 * @return {Droite}
 */
// JSDOC Validee par EE Aout 2022
export function hauteurTriangle(A: Point, B: Point, C: Point, color = 'black') {
  const d = droite(B, C)
  const p = projectionOrtho(A, d)
  return new Droite(p, A, '', color)
}

/**
 * Code la hauteur d'un triangle
 * @param {Point} A Premier sommet d'un triangle
 * @param {Point} B Deuxième sommet d'un triangle
 * @param {Point} C Troisième sommet d'un triangle
 * @param {string} [color = 'black'] Couleur des codages : du type 'blue' ou du type '#f15929'
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur des codages. À associer obligatoirement à colorToLatexOrHTML().
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class CodageHauteurTriangle extends ObjetMathalea2D {
  traceD: boolean
  c: CodageAngleDroit
  d: Droite
  constructor(A: Point, B: Point, C: Point, color = 'black') {
    super()
    this.color = colorToLatexOrHTML(color)
    this.d = droite(B, C)
    const p = projectionOrtho(A, this.d)
    const q = rotation(A, p, -90)
    this.traceD = false
    if (B.x < C.x) {
      if (p.x > C.x || p.x < B.x) {
        this.d.pointilles = 5
        this.traceD = true
      }
    } else if (C.x < B.x) {
      if (p.x < C.x || p.x > B.x) {
        this.traceD = true
        this.d.pointilles = 5
      }
    } else if (B.y < C.y) {
      if (p.y > C.y || p.y < B.y) {
        this.traceD = true
        this.d.pointilles = 5
      }
    } else if (C.y < B.y) {
      if (p.y < C.y || p.y > B.y) {
        this.traceD = true
        this.d.pointilles = 5
      }
    }
    this.c = codageAngleDroit(A, p, q, color)
  }

  svg(coeff: number) {
    if (this.traceD) {
      return this.c.svg(coeff) + '\n\t' + this.d.svg(coeff)
    } else {
      return this.c.svg(coeff)
    }
  }

  tikz() {
    if (this.traceD) {
      return this.c.tikz() + '\n\t' + this.d.tikz()
    } else {
      return this.c.tikz()
    }
  }
}

/**
 * Code la hauteur d'un triangle
 * @param {Point} A Premier sommet d'un triangle
 * @param {Point} B Deuxième sommet d'un triangle
 * @param {Point} C Troisième sommet d'un triangle
 * @param {string} [color = 'black'] Couleur des codages : du type 'blue' ou du type '#f15929'
 * @example codageHauteurTriangle(M,N,P) // Code, en noir, la hauteur du triangle MNP.
 * @example codageHauteurTriangle(M,N,P,'red') // Code, en rouge, la hauteur du triangle MNP.
 * @return {CodageHauteurTriangle}
 */
// JSDOC Validee par EE Juin 2022
export function codageHauteurTriangle(
  A: Point,
  B: Point,
  C: Point,
  color = 'black',
) {
  return new CodageHauteurTriangle(A, B, C, color)
}

/**
 * Code la médiane d'un triangle
 * @param {Point} B Première extrémité du segment dont la médiane est relative
 * @param {Point} C Seconde extrémité du segment dont la médiane est relative
 * @param {string} [color = 'black'] Couleur des codages : du type 'blue' ou du type '#f15929'
 * @param {string} [mark = '//'] Symbole posé de part et d'autre du milieu du segment
 * @param {boolean} [mil = false] Trace ou nom le point du milieu.
 * @example codageMedianeTriangle(M,N) // Code, en noir, la médiane d'un triangle relative au côté [MN], avec les symboles //
 * @example codageMedianeTriangle(M,N,P,'red','oo') // Code, en rouge, la médiane d'un triangle relative au côté [MN], avec les symboles oo
 * @return {CodageSegments}
 */
// JSDOC Validee par EE Juin 2022
export function codageMedianeTriangle(
  A: Point,
  B: Point,
  color = 'black',
  mark = '×',
  mil = false,
) {
  return new CodageMilieu(A, B, color, mark, mil)
}

/**
 * Orthocentre du triangle ABC
 * @author Jean-Claude Lhote
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @param {string} nom
 */
export function orthoCentre(
  A: Point,
  B: Point,
  C: Point,
  nom = '',
  positionLabel = 'above',
) {
  const d = hauteurTriangle(B, A, C)
  const e = hauteurTriangle(A, B, C)
  const p = pointIntersectionDD(d, e)
  const x = p.x
  const y = p.y
  return point(x, y, nom, positionLabel)
}

/**
 * Crée le centre du cercle circonscrit au triangle ABC
 * @param {Point} A Premier sommet du triangle
 * @param {Point} B Deuxième sommet du triangle
 * @param {Point} C Troisième sommet du triangle
 * @param {string} [nom=''] Nom du centre
 * @param {string} [positionLabel = 'above'] Position du nom par rapport au point
 * @example G = centreCercleCirconscrit(F,C,N)
 * // Crée G, le centre du cercle circonscrit au triangle FCN,sans être nommé.
 * @example G = centreCercleCirconscrit(F,C,N,'G','below')
 * // Crée G, le centre du cercle circonscrit au triangle FCN, en notant G sous le point, s'il est tracé et labellisé.
 * @return {Point}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function centreCercleCirconscrit(
  A: PointAbstrait,
  B: PointAbstrait,
  C: PointAbstrait,
  nom = '',
  positionLabel = 'above',
) {
  const d = mediatrice(A, B)
  const e = mediatrice(B, C)
  const p = pointIntersectionDD(d, e)
  const x = p.x
  const y = p.y
  return new Point(x, y, nom, positionLabel)
}
