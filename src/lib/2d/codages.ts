import {
  colorToLatexOrHTML,
  fixeBordures,
  ObjetMathalea2D,
  Vide2d,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { arrondi } from '../outils/nombres'
import { stringNombre } from '../outils/texNombre'
import { angleOriente, codageAngle, codageAngleDroit } from './angles'
import { arc } from './cercle'
import { Droite, droite, mediatrice } from './droites'
import {
  milieu,
  Point,
  point,
  pointSurSegment,
  tracePointSurDroite,
} from './points'
import { PointAbstrait } from './points-abstraits'
import type { Polygone } from './polygones'
import { longueur, Segment, segment, vecteur } from './segmentsVecteurs'
import {
  Latex2d,
  latex2d,
  latexParCoordonnees,
  tailleDeNbVersLatex,
  TexteParPoint,
  texteParPoint,
  type LetterSizeType,
} from './textes'
import { rotation, similitude, translation } from './transformations'

/**
 * Code le milieu d'un segment
 * @param {Point} A Première extrémité du segment
 * @param {Point} B Seconde extrémité du segment
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [mark='x'] Symbole posé sur les deux parties du segment
 * @param {boolean} [mil=true] Trace ou nom le point du milieu.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
 * @author Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class CodageMilieu extends ObjetMathalea2D {
  constructor(A: Point, B: Point, color = 'black', mark = '×', mil = true) {
    super()
    if (longueur(A, B) < 0.1)
      window.notify(
        'CodageMilieu : Points trop rapprochés pour créer ce codage',
        { A, B },
      )
    this.color = colorToLatexOrHTML(color)
    const O = milieu(A, B)
    const d = droite(A, B)
    const M = tracePointSurDroite(O, d, color) // On utilise color, car tracePointSurDroite aura son propore colorToLatexOrHTML
    const v = codageSegments(mark, color, A, O, O, B) // idem pour codaSegments
    let code = ''
    // Pour les bordures, on prends celles de [AB], vu qu'on code le milieu de [AB]
    this.bordures = [
      Math.min(A.bordures[0], B.bordures[0]),
      Math.min(A.bordures[1], B.bordures[1]),
      Math.max(A.bordures[2], B.bordures[2]),
      Math.max(A.bordures[3], B.bordures[3]),
    ]
    this.svg = function (coeff) {
      if (mil) code = M.svg(coeff) + '\n' + v.svg(coeff)
      else code = v.svg(coeff)
      code = `<g id="${this.id}">${code}</g>`
      return code
    }
    this.tikz = function () {
      if (mil) return M.tikz() + '\n' + v.tikz()
      else return v.tikz()
    }
  }
}
/**
 * Code le milieu d'un segment
 * @param {Point} A Première extrémité du segment
 * @param {Point} B Seconde extrémité du segment
 * @param {string} [color = 'black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [mark = 'x'] Symbole posé de part et d'autre du milieu du segment
 * @param {boolean} [mil = true] Trace ou nom le point du milieu.
 * @example codageMilieu(M,N) // Code, en noir, le milieu du segment[MN] avec les marques 'x', en plaçant le milieu
 * @example codageMilieu(M,N,'red','oo',false) // Code, en rouge, le milieu du segment[MN] avec les marques 'oo', sans placer le milieu.
 * @author Jean-Claude Lhote
 * @return {CodageMilieu}
 */
// JSDOC Validee par EE Juin 2022
export function codageMilieu(
  A: Point,
  B: Point,
  color = 'black',
  mark = '×',
  mil = true,
) {
  return new CodageMilieu(A, B, color, mark, mil)
}

/**
 * Code la médiatrice d'un segment
 * @param {PointAbstrait} A Première extrémité du segment
 * @param {PointAbstrait} B Seconde extrémité du segment
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [mark='x'] Symbole posé sur les deux parties du segment
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
 * @author  Rémi Angot
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class CodageMediatrice extends ObjetMathalea2D {
  constructor(A: PointAbstrait, B: PointAbstrait, color = 'black', mark = '×') {
    super()
    if (longueur(A, B) < 0.1)
      window.notify(
        'CodageMediatrice : Points trop rapprochés pour créer ce codage',
        { A, B },
      )
    this.color = colorToLatexOrHTML(color)
    const O = milieu(A, B)
    const M = rotation(A, O, 90)
    const c = codageAngleDroit(M, O, B, color)
    const v = codageSegments(mark, color, A, O, O, B)
    const bordures = fixeBordures([A, B, O, c])
    this.bordures = [bordures.xmin, bordures.ymin, bordures.xmax, bordures.ymax]
    this.svg = function (coeff) {
      const code = `<g id="${this.id}">${c.svg(coeff) + '\n' + v.svg(coeff)}</g>`
      return code
    }
    this.tikz = function () {
      return c.tikz() + '\n' + v.tikz()
    }
    this.svgml = function (coeff: number, amp: number) {
      return c.svgml(coeff, amp) + '\n' + v.svg(coeff)
    }
    this.tikzml = function (amp: number) {
      return c.tikzml(amp) + '\n' + v.tikz()
    }
  }
}

/**
 * Code la médiatrice d'un segment
 * @param {PointAbstrait} A Première extrémité du segment
 * @param {PointAbstrait} B Seconde extrémité du segment
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [mark='x'] Symbole posé sur les deux parties du segment
 * @example codageMediatrice(M,N) // Code, en noir, la médiatrice du segment[MN] avec les marques 'x'
 * @example codageMediatrice(M,N,'red','oo') // Code, en rouge, la médiatrice du segment[MN] avec les marques 'oo'
 * @author  Rémi Angot
 * @return {CodageMediatrice}
 */
// JSDOC Validee par EE Juin 2022
export function codageMediatrice(
  A: PointAbstrait,
  B: PointAbstrait,
  color = 'black',
  mark = '×',
) {
  return new CodageMediatrice(A, B, color, mark)
}

/**
 * Code la bissectrice d'un angle
 * @param {PointAbstrait} A Point sur un côté de l'angle
 * @param {PointAbstrait} O Sommet de l'angle
 * @param {PointAbstrait} B Point sur l'autre côté de l'angle
 * @param {string} [color = 'black'] Couleur de la bissectrice : du type 'blue' ou du type '#f15929'
 * @param {string} [mark = 'x'] Symbole posé sur les arcs
 * @property {string} color Couleur de la bissectrice. À associer obligatoirement à colorToLatexOrHTML().
 * @property {string} mark Symbole posé sur les arcs
 * @property {PointAbstrait} centre Sommet de l'angle
 * @property {PointAbstrait} depart Point sur un côté de l'angle (équivalent au point A)
 * @author Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class CodageBissectrice extends ObjetMathalea2D {
  mark: string
  centre: PointAbstrait
  depart: PointAbstrait
  constructor(
    A: PointAbstrait,
    O: PointAbstrait,
    B: PointAbstrait,
    color = 'black',
    mark = 'X',
  ) {
    super()
    this.color = colorToLatexOrHTML(color)
    this.mark = mark
    this.centre = O
    this.depart = pointSurSegment(O, A, 1.5)
    const demiangle = angleOriente(A, O, B) / 2
    const lieu = rotation(this.depart, O, demiangle)
    const a1 = codageAngle(
      pointSurSegment(this.centre, this.depart),
      O,
      demiangle,
      1,
      this.mark,
      color,
      1,
      1,
    )
    const a2 = codageAngle(
      pointSurSegment(this.centre, lieu),
      O,
      demiangle,
      1,
      this.mark,
      color,
      1,
      1,
    )
    this.objets = [a1, a2]
    const bordures = fixeBordures([a1, a2])
    this.bordures = [bordures.xmin, bordures.ymin, bordures.xmax, bordures.ymax]
  }
}

/**
 * Code la bissectrice d'un angle
 * @param {PointAbstrait} A Point sur un côté de l'angle
 * @param {PointAbstrait} O Sommet de l'angle
 * @param {PointAbstrait} B Point sur l'autre côté de l'angle
 * @param {string} [color = 'black'] Couleur de la bissectrice : du type 'blue' ou du type '#f15929'
 * @param {string} [mark='x'] Symbole posé sur les arcs
 * @example codagebissectrice(M,N,P) // Code, en noir, la bissectrice de l'angle MNP avec les marques 'x'
 * @example codagebissectrice(M,N,P,'red','oo') // Code, en rouge, la bissectrice de l'angle MNP avec les marques 'oo'
 * @author Jean-Claude Lhote
 * @return {CodageBissectrice}
 */
// JSDOC Validee par EE Juin 2022
export function codageBissectrice(
  A: PointAbstrait,
  O: PointAbstrait,
  B: PointAbstrait,
  color = 'black',
  mark = 'X',
) {
  return new CodageBissectrice(A, O, B, color, mark)
}

/**
 * Code un carré
 * @param {Polygone} c Carré à coder
 * @param {string} [color = 'black'] Couleur des codages : du type 'blue' ou du type '#f15929'
 * @param {string} [mark='x'] Symbole posé sur les côtés
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class CodageCarre extends ObjetMathalea2D {
  constructor(c: Polygone, color = 'black', mark = '×') {
    super()
    this.objets = []
    this.objets.push(codageSegments(mark, color, ...c.listePoints))
    this.objets.push(
      codageAngleDroit(
        c.listePoints[0],
        c.listePoints[1],
        c.listePoints[2],
        color,
      ),
    )
    this.objets.push(
      codageAngleDroit(
        c.listePoints[1],
        c.listePoints[2],
        c.listePoints[3],
        color,
      ),
    )
    this.objets.push(
      codageAngleDroit(
        c.listePoints[2],
        c.listePoints[3],
        c.listePoints[0],
        color,
      ),
    )
    this.objets.push(
      codageAngleDroit(
        c.listePoints[3],
        c.listePoints[0],
        c.listePoints[1],
        color,
      ),
    )
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}

/**
 * Met un codage complet sur un carré
 * @param {Polygone} c Carré à coder
 * @param {string} [color = 'black'] Couleur des codages : du type 'blue' ou du type '#f15929'
 * @param {string} [mark='x'] Symbole posé sur les côtés
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @example codageCarre(carre) // Code, en noir, le carré carre.
 * @example codageCarre(carre,'red','||') // Code, en rouge, le carré carre avec la marque || sur les côtés
 * @return {CodageCarre}
 */
// JSDOC Validee par EE Juin 2022
export function codageCarre(c: Polygone, color = 'black', mark = '×') {
  return new CodageCarre(c, color, mark)
}

/**
 * Affiche la longueur de [AB] au dessus si A est le point le plus à gauche sinon au dessous.
 * @param  {PointAbstrait} A Première extrémité du segment
 * @param  {PointAbstrait} B Seconde extrémité du segment
 * @param  {string} [color='black'] Couleur de la longueur affichée : du type 'blue' ou du type '#f15929'.
 * @param  {number} [d=0.5] Distance entre l'affichage de la longueur et le segment.
 * @param  {string} [unite='cm'] Affiche cette unité après la valeur numérique de la longueur.
 * @param  {boolean} [horizontal=false] Si true, alors le texte est horizontal, sinon le texte est parallèle au segment.
 * @param  {number} [precision=1]
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur de la longueur affichée. À associer obligatoirement à colorToLatexOrHTML().
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class AfficheLongueurSegment extends ObjetMathalea2D {
  stringColor: string
  angle: number
  O: PointAbstrait
  M: PointAbstrait
  distance: number
  text: string

  constructor(
    A: PointAbstrait,
    B: PointAbstrait,
    color = 'black',
    d = 0.5,
    unite = 'cm',
    horizontal = false,
    precision = 1,
  ) {
    super()
    this.stringColor = color
    this.O = milieu(A, B)
    this.M = rotation(A, this.O, -90)
    const s = segment(A, B)
    const l = stringNombre(s.longueur, precision)
    this.text = `${l}${unite !== '' ? ' ' + unite : ''}`
    this.distance = horizontal ? d - 0.1 + this.text.length / 10 : d
    if (horizontal) {
      this.angle = 0
    } else if (B.x > A.x) {
      this.angle = -s.angleAvecHorizontale
    } else {
      this.angle = 180 - s.angleAvecHorizontale
    }
    this.bordures = [
      this.O.x - 0.5,
      this.O.y - 0.5,
      this.O.x + 0.5,
      this.O.y + 0.5,
    ] // C'est n'importe quoi, mais de toute façon, le segment a ses bordures, lui !
  }

  svg(coeff: number) {
    const N = pointSurSegment(this.O, this.M, (this.distance * 20) / coeff)
    return texteParPoint(
      this.text,
      N,
      this.angle,
      this.stringColor,
      1,
      'milieu',
      false,
    ).svg(coeff)
  }

  tikz() {
    const N = pointSurSegment(this.O, this.M, this.distance / context.scale)
    return texteParPoint(
      this.text,
      N,
      this.angle,
      this.stringColor,
      1,
      'milieu',
      false,
    ).tikz()
  }
}

/**
 * Affiche la longueur de [AB] au dessus si A est le point le plus à gauche sinon au dessous.
 * @param  {PointAbstrait} A Première extrémité du segment
 * @param  {PointAbstrait} B Seconde extrémité du segment
 * @param  {string} [color='black'] Couleur affichée de la longueur affichée : du type 'blue' ou du type '#f15929'.
 * @param  {number} [d=0.5] Distance entre l'affichage de la longueur et le segment.
 * @param  {string} [unite='cm'] Affiche cette unité après la valeur numérique de la longueur.
 * @param  {boolean} [horizontal=false] Si true, alors le texte est horizontal, sinon le texte est parallèle au segment.
 * @param  {number} [precision=1]
 * @example  afficheLongueurSegment(A,B)
 * // Affiche la longueur du segment [AB] (en noir, à 0,5 "cm" du segment, complétée par l'unité cm et parallèlement au segment).
 * @example  afficheLongueurSegment(A,B,'blue',1,'mm',true)
 * // Affiche la longueur du segment [AB], en bleu, à 1 "cm" du segment, complétée par l'unité mm et horizontalement.
 * @return {AfficheLongueurSegment}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function afficheLongueurSegment(
  A: PointAbstrait,
  B: PointAbstrait,
  color = 'black',
  d = 0.5,
  unite = 'cm',
  horizontal = false,
  precision = 1,
) {
  return new AfficheLongueurSegment(
    A,
    B,
    color,
    d,
    unite,
    horizontal,
    precision,
  )
}

/**
 * texteSurSegment('mon texte',A,B) // Écrit un texte au milieu de [AB] au dessus si A est le point le plus à gauche sinon en dessous, ou alors horizontalement
 *
 * @author Rémi Angot
 */
export class TexteSurSegment extends ObjetMathalea2D {
  stringColor: string
  extremite1: PointAbstrait
  extremite2: PointAbstrait
  distance: number
  texte: string
  scale: number
  mathOn: boolean
  angle: number
  O: PointAbstrait
  M: PointAbstrait

  constructor(
    texte: string,
    A: PointAbstrait,
    B: PointAbstrait,
    color = 'black',
    d = 0.5,
    horizontal = false,
  ) {
    super()
    if (typeof texte === 'number') texte = String(texte)
    if (longueur(A, B) < 0.1)
      window.notify(
        'TexteSurSegment : Points trop proches pour cette fonction',
        { A, B },
      )
    this.color = colorToLatexOrHTML(color)
    this.stringColor = color
    this.extremite1 = A
    this.extremite2 = B
    this.texte = String(texte)
    this.scale = 1
    this.mathOn = true
    this.distance = horizontal ? d - 0.1 + this.texte.length / 10 : d
    this.O = milieu(this.extremite1, this.extremite2)
    this.M = rotation(this.extremite1, this.O, -90)
    const s = segment(this.extremite1, this.extremite2)
    const pos = pointSurSegment(this.O, this.M, this.distance)
    const space = 0.2 * (this.texte.length ?? 2)
    this.bordures = [pos.x - space, pos.y - space, pos.x + space, pos.y + space]
    if (horizontal) {
      this.angle = 0
    } else if (this.extremite2.x > this.extremite1.x) {
      this.angle = -s.angleAvecHorizontale
      this.angle = -s.angleAvecHorizontale
    } else {
      this.angle = 180 - s.angleAvecHorizontale
      this.angle = 180 - s.angleAvecHorizontale
    }
  }

  svg(coeff: number) {
    const N = pointSurSegment(this.O, this.M, (this.distance * 20) / coeff)
    return texteParPoint(
      this.texte,
      N,
      this.angle,
      this.stringColor,
      this.scale,
      'milieu',
      this.mathOn,
    ).svg(coeff)
  }

  tikz() {
    const N = pointSurSegment(this.O, this.M, this.distance / context.scale)
    return texteParPoint(
      this.texte,
      N,
      this.angle,
      this.stringColor,
      this.scale,
      'milieu',
      this.mathOn,
    ).tikz()
  }
}

/**
 * Écrit un texte au milieu de [AB] au dessus si A est le point le plus à gauche sinon au dessous ou bien horizontal
 * @param {string} texte
 * @param {PointAbstrait} A
 * @param {PointAbstrait} B
 * @param {string} [color='black'] Code couleur HTML accepté
 * @param {number} [distance=0.5] Distance à la droite.
 * @param {boolean} [horizontal=false] Si true, alors le texte est horizontal, sinon le texte est parallèle au segment
 * @return {object} LatexParCoordonnees si le premier caractère est '$', TexteParPoint sinon
 * @author Rémi Angot
 */
export function texteSurSegment(
  texte = '',
  A: PointAbstrait,
  B: PointAbstrait,
  color = 'black',
  distance = 0.5,
  horizontal = false,
) {
  if (texte[0] === '$') {
    return placeLatexSurSegment(texte.replaceAll('$', ''), A, B, {
      color,
      distance,
      horizontal,
    })
  }
  return new TexteSurSegment(texte, A, B, color, distance, horizontal)
}

/**
 * texteSurArc(texte, A, B, angle) // Écrit un texte au milieu de l'arc AB, au dessus si A est le point le plus à gauche sinon au dessous
 *
 * @author Rémi Angot et Frédéric Piou
 */
export class TexteSurArc extends ObjetMathalea2D {
  extremite1: Point
  extremite2: Point
  distance: number
  texte: string
  angle: number
  centre: Point
  milieu: Point
  normale: number
  stringColor: string
  horizontal: boolean
  constructor(
    texte: string,
    A: Point,
    B: Point,
    angle: number,
    color = 'black',
    d = 0.5,
    horizontal = false,
  ) {
    super()
    this.color = colorToLatexOrHTML(color)
    this.horizontal = horizontal
    this.stringColor = color
    this.extremite1 = A
    this.extremite2 = B
    this.distance = texte[0] === '$' ? -3 * d : -d
    this.texte = texte
    this.angle = angle
    let anglerot
    if (angle < 0) anglerot = (angle + 180) / 2
    else anglerot = (angle - 180) / 2
    const d1 = mediatrice(A, B) as Droite
    const e = droite(A, B)
    const f = rotation(e, B, anglerot)
    const determinant = d1.a * f.b - f.a * d1.b
    const Omegax = (d1.b * f.c - f.b * d1.c) / determinant
    const Omegay = (f.a * d1.c - d1.a * f.c) / determinant
    this.centre = point(Omegax, Omegay)
    const s = segment(this.extremite1, this.extremite2)
    this.normale = -s.angleAvecHorizontale
    this.milieu = rotation(A, this.centre, angle / 2)
    const pos = pointSurSegment(this.milieu, this.centre, this.distance)
    const space = 0.2 * texte.length
    this.bordures = [pos.x - space, pos.y - space, pos.x + space, pos.y + space]
  }

  svg(coeff: number) {
    const N = pointSurSegment(
      this.milieu,
      this.centre,
      (this.distance * 20) / coeff,
    )
    let angle
    if (this.extremite2.x > this.extremite1.x) {
      angle = this.normale
    } else {
      angle = 180 + this.normale
    }
    return texteParPoint(
      this.texte,
      N,
      this.horizontal ? 0 : angle,
      this.stringColor,
    ).svg(coeff)
  }

  tikz() {
    const N = pointSurSegment(
      this.milieu,
      this.centre,
      this.distance / context.scale,
    )
    let angle
    if (this.extremite2.x > this.extremite1.x) {
      angle = this.normale
    } else {
      angle = 180 + this.normale
    }
    return texteParPoint(this.texte, N, angle, this.stringColor).tikz()
  }
}

/**
 * Écrit un texte au "milieu" de l'arc AB au dessus si A est le point le plus à gauche sinon en dessous
 * @param {string} texte Texte à afficher (éviter les $$ pour les affichages diaporama)
 * @param {Point} A Extrémité de l'arc
 * @param {Point} B Extrémité de l'arc
 * @param {number} angle Angle au centre
 * @param {string} [color='black'] Code couleur HTML accepté
 * @param {number} [d=0.5] Distance à la droite.
 * @param {boolean} [horizontal = false] Décide si le texte est horizontal ou pas, quelle que soit la valeur de angle.
 * @return {object} LatexParCoordonnees si le premier caractère est '$', TexteParPoint sinon
 * @author Rémi Angot et Frédéric Piou
 */
export function texteSurArc(
  texte: string,
  A: Point,
  B: Point,
  angle: number,
  color = 'black',
  d = 0.5,
  horizontal = false,
) {
  return new TexteSurArc(texte, A, B, angle, color, d, horizontal)
}

/**
 * Affiche la mesure de l'angle ABC arrondie au degré près
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} B Sommet de l'angle
 * @param {Point} C Point sur l'autre côté de l'angle
 * @param {string} [color='black'] Couleur de la mesure de l'angle : du type 'blue' ou du type '#f15929'.
 * @param {number} [distance=1.5] Taille de l'angle
 * @param {string} [label=''] Si vide, alors affiche la mesure de l'angle sinon affiche ce label.
 * @param {Object} parametres À saisir entre accolades
 * @param {number} [parametres.ecart=0.5] Distance entre l'arc et sa mesure
 * @param {boolean} [parametres.saillant=true] True si on veut l'angle saillant, false si on veut l'angle rentrant.
 * @param {string} [parametres.colorArc='black']  Couleur de l'arc  : du type 'blue' ou du type '#f15929'.
 * @param {boolean} [parametres.rayon=false] True pour fermer l'angle, par deux rayons (en vue de colorier l'intérieur).
 * @param {string} [parametres.couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'.
 * @param {number} [parametres.opaciteDeRemplissage=0.5] Taux d'opacité du remplissage entre 0 et 1
 * @param {number} [parametres.arcEpaisseur=1] Epaisseur de l'arc
 * @param {boolean} [parametres.mesureEnGras=false] True pour mettre en gras la mesure affichée
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {Point} depart Point sur un côté de l'angle
 * @property {Point} sommet Sommet de l'angle
 * @property {Point} arrivee Point sur l'autre côté de l'angle
 * @property {number} distance Taille de l'angle
 * @property {number} ecart Distance entre l'arc et sa mesure
 * @property {boolean} saillant True si on veut l'angle saillant, false si on veut l'angle rentrant.
 * @property {number} epaisseur Epaisseur de l'arc
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class AfficheMesureAngle extends ObjetMathalea2D {
  depart: PointAbstrait
  sommet: PointAbstrait
  arrivee: PointAbstrait
  distance: number
  ecart: number
  saillant: boolean

  constructor(
    A: PointAbstrait,
    B: PointAbstrait,
    C: PointAbstrait,
    color = 'black',
    distance = 1.5,
    label = '',
    {
      ecart = 0.5,
      mesureEnGras = false,
      saillant = true,
      colorArc = 'black',
      rayon = false,
      couleurDeRemplissage = 'none',
      opaciteDeRemplissage = 0.5,
      arcEpaisseur = 1,
    } = {},
  ) {
    super()
    this.depart = A
    this.arrivee = C
    this.sommet = B
    this.distance = distance
    const mesureAngle = saillant
      ? angleOriente(this.depart, this.sommet, this.arrivee)
      : angleOriente(this.depart, this.sommet, this.arrivee) > 0
        ? angleOriente(this.depart, this.sommet, this.arrivee) - 360
        : 360 + angleOriente(this.depart, this.sommet, this.arrivee)
    this.ecart = ecart
    this.saillant = saillant
    this.epaisseur = arcEpaisseur
    const M = pointSurSegment(this.sommet, this.depart, this.distance)
    const N = rotation(
      pointSurSegment(
        this.sommet,
        M,
        this.distance + (this.ecart * 20) / context.pixelsParCm,
      ),
      this.sommet,
      mesureAngle / 2,
    )
    let mesureAngleString
    if (label !== '') {
      mesureAngleString = label
    } else {
      mesureAngleString =
        Math.round(Math.abs(mesureAngle)).toString() + '^\\circ'
    }
    const mesure = latexParCoordonnees(
      mesureAngleString,
      N.x,
      N.y,
      color,
      0,
      0,
      '',
      8,
    )
    const marque = arc(
      M,
      B,
      mesureAngle,
      rayon,
      couleurDeRemplissage,
      colorArc,
      opaciteDeRemplissage,
    )
    marque.epaisseur = this.epaisseur
    this.bordures = [
      Math.min(N.x, M.x) - 0.5,
      Math.min(N.y, M.y) - 0.5,
      Math.max(N.x, M.x) + 0.5,
      Math.max(N.y, M.y) + 0.5,
    ]
    this.objets = [mesure, marque]
  }
}

/**
 * Affiche la mesure de l'angle ABC arrondie au degré près
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} B Sommet de l'angle
 * @param {Point} C Point sur l'autre côté de l'angle
 * @param {string} [color='black'] Couleur de la mesure de l'angle : du type 'blue' ou du type '#f15929'.
 * @param {number} [distance=1.5] Rayon de l'arc de cercle.
 * @param {string} [label=''] Si vide, alors affiche la mesure de l'angle sinon affiche ce label.
 * @param {Object} parametres À saisir entre accolades
 * @param {number} [parametres.ecart=0.5] Distance entre l'arc et sa mesure
 * @param {boolean} [parametres.saillant=true] True si on veut l'angle saillant, false si on veut l'angle rentrant.
 * @param {string} [parametres.colorArc='black']  Couleur de l'arc  : du type 'blue' ou du type '#f15929'.
 * @param {boolean} [parametres.rayon=false] True pour fermer l'angle, par deux rayons (en vue de colorier l'intérieur).
 * @param {string} [parametres.couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'.
 * @param {number} [parametres.opaciteDeRemplissage=0.5] Taux d'opacité du remplissage entre 0 et 1
 * @param {number} [parametres.arcEpaisseur=1] Epaisseur de l'arc
 * @param {boolean} [parametres.mesureEnGras=false] True pour mettre en gras la mesure affichée
 * @example afficheMesureAngle(M,N,O)
 * // Affiche la mesure de l'angle MNO (en noir, avec un arc de rayon 1,5 "cm").
 * @example afficheMesureAngle(M,N,O,'red',2,'pop',{ecart:1,saillant:false,colorArc:'blue',rayon:true,couleurDeRemplissage:'#f15929',opaciteDeRemplissage:0.8,arcEpaisseur:2,mesureEnGras:true})
 * // Affiche le label pop en gras et rouge, sur l'angle rentrant MNO, avec un arc bleu, epais de 2 et de rayon 2 "cm", à 1 "cm" de l'arc rempli en orange avec une opacité de 80%, cerné par ses rayons.
 * @return {AfficheMesureAngle}
 */
// JSDOC Validee par EE Juin 2022
export function afficheMesureAngle(
  A: PointAbstrait,
  B: PointAbstrait,
  C: PointAbstrait,
  color = 'black',
  distance = 1.5,
  label = '',
  {
    ecart = 0.5,
    mesureEnGras = false,
    saillant = true,
    colorArc = 'black',
    rayon = false,
    couleurDeRemplissage = 'none',
    opaciteDeRemplissage = 0.5,
    arcEpaisseur = 1,
  } = {},
) {
  return new AfficheMesureAngle(A, B, C, color, distance, label, {
    ecart,
    mesureEnGras,
    saillant,
    colorArc,
    rayon,
    couleurDeRemplissage,
    opaciteDeRemplissage,
    arcEpaisseur,
  })
}

/**
 * Affiche la côte d'un segment sous la forme d'une flèche à double sens et d'une valeur associée.
 * @param {Segment} s Segment pour lequel on affiche la côte
 * @param {string} [Cote=''] Si '', alors la longueur en cm est affichée, sinon c'est cette valeur qui s'affiche (et cela peut être une variable).
 * @param {number} [positionCote = 0.5] Position de la flèche par rapport au segment. Valeur négative ou positive selon la position voulue.
 * @param {string} [couleurCote='black'] Couleur de la flèche  : du type 'blue' ou du type '#f15929'.
 * @param {number} [epaisseurCote=1] Epaisseur de la flèche.
 * @param {number} [positionValeur=0.5] Position de la valeur par rapport à la flèche. Valeur négative ou positive selon la position voulue.
 * @param {string} [couleurValeur='black']  Couleur de la valeur indiquée : du type 'blue' ou du type '#f15929'.
 * @param {boolean} [horizontal=false]  Si true, alors le texte est horizontal, sinon le texte est parallèle au segment.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @author Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class AfficheCoteSegment extends ObjetMathalea2D {
  constructor(
    s: Segment,
    Cote = '',
    positionCote = 0.5,
    couleurCote = 'black',
    epaisseurCote = 1,
    positionValeur = 0.5,
    couleurValeur = 'black',
    horizontal = false,
  ) {
    super()
    let valeur
    const A = s.extremite1
    const B = s.extremite2

    const v = similitude(vecteur(A, B), A, 90, positionCote / s.longueur)
    const cote = segment(translation(A, v), translation(B, v), couleurCote)
    if (longueur(A, B) > 1) cote.styleExtremites = '<->'
    else cote.styleExtremites = '>-<'
    cote.epaisseur = epaisseurCote
    if (Cote === '') {
      valeur = afficheLongueurSegment(
        cote.extremite1,
        cote.extremite2,
        couleurValeur,
        positionValeur,
        'cm',
        horizontal,
      )
    } else {
      if (Cote.includes('\\')) {
        valeur = placeLatexSurSegment(Cote, cote.extremite1, cote.extremite2, {
          distance: positionValeur,
          horizontal,
          letterSize: 'normalsize',
          color: couleurValeur,
        })
      } else {
        valeur = texteSurSegment(
          Cote,
          cote.extremite1,
          cote.extremite2,
          couleurValeur,
          positionValeur,
          horizontal,
        )
      }
    }
    const { xmin, xmax, ymin, ymax } = fixeBordures([cote, valeur])
    this.bordures = [xmin, ymin, xmax, ymax]
    this.objets = [cote, valeur]
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    this.objets.forEach((objet) => {
      objet.opacite = this.opacite
    })
    for (const objet of this.objets) code += '\n\t' + objet.svg(coeff)
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    this.objets.forEach((objet) => {
      objet.opacite = this.opacite
    })
    for (const objet of this.objets) code += '\n\t' + objet.tikz()
    return code
  }
}

/**
 * Affiche la côte d'un segment sous la forme d'une flèche à double sens et d'une valeur associée.
 * @param {Segment} s Segment pour lequel on affiche la côte
 * @param {string} [Cote=''] Si '', alors la longueur en cm est affichée, sinon c'est cette valeur qui s'affiche (et cela peut être une variable).
 * @param {number} [positionCote = 0.5] Position de la flèche par rapport au segment. Valeur négative ou positive selon la position voulue.
 * @param {string} [couleurCote='black'] Couleur de la flèche  : du type 'blue' ou du type '#f15929'.
 * @param {number} [epaisseurCote=1] Epaisseur de la flèche.
 * @param {number} [positionValeur=0.5] Position de la valeur par rapport à la flèche. Valeur négative ou positive selon la position voulue.
 * @param {string} [couleurValeur='black']  Couleur de la valeur indiquée : du type 'blue' ou du type '#f15929'.
 * @param {boolean} [horizontal=false]  Si true, alors le texte est horizontal, sinon le texte est parallèle au segment.
 * @example afficheCoteSegment(s)
 * // Affiche la côte du segment s (avec une flèche noire d\'épaisseur 1 "cm", placée 0.5 "cm" sous le segment, avec la longueur du segment, en cm, écrite en noir, 0,5 "cm" au-dessus, et parallèle au segment.
 * @example afficheCoteSegment(s,'x',-1,'red',2,1,'blue',true)
 * // Affiche la côte du segment s, avec une flèche rouge d\'épaisseur 2 "cm", placée 1 "cm" sous le segment, avec le texte 'x' écrit en bleu, 1 "cm" au-dessus, et horizontalement.
 * @return {AfficheCoteSegment|Vide2d}
 * @author Jean-Claude Lhote
 */
// JSDOC Validee par EE Juin 2022

export function afficheCoteSegment(
  s: Segment,
  Cote = '',
  positionCote = 0.5,
  couleurCote = 'black',
  epaisseurCote = 1,
  positionValeur = 0.5,
  couleurValeur = 'black',
  horizontal = false,
) {
  if (s.longueur < 1) {
    window.notify(
      'afficheCoteSegment : Segment trop petit pour cette fonction',
      { s },
    )
    return new Vide2d(s.extremite1.x, s.extremite1.y)
  }
  return new AfficheCoteSegment(
    s,
    Cote,
    positionCote,
    couleurCote,
    epaisseurCote,
    positionValeur,
    couleurValeur,
    horizontal,
  )
}

/**
 * Code un segment
 * @param {PointAbstrait} A Première extrémité du segment
 * @param {PointAbstrait} B Seconde extrémité du segment
 * @param {string} [mark='||'] Symbole posé sur le segment
 * @param {string} [color='black'] Couleur du symbole : du type 'blue' ou du type '#f15929'
 * @param {number} [echelle=1] Taille relative du symbole
 * @example codageSegment(H,K) // Code le segment [HK] avec la marque noire '||'
 * @example codageAngle(H,K,'x','green') // Code le segment [HK] avec la marque verte 'x'
 * @example codageAngle(H,K,'x','green',{echelle : 3}) // Code le segment [HK] avec la marque verte 'x' et de taille 3.
 * @author Rémi Angot
 * @return {TexteParPoint}
 */
// JSDOC Validee par EE Juin 2022
export function codageSegment(
  A: PointAbstrait,
  B: PointAbstrait,
  mark = '||',
  color = 'black',
  echelle = 0.5,
) {
  const O = milieu(A, B)
  const s = segment(A, B)
  let angle
  if (B.x > A.x) {
    angle = -parseInt(s.angleAvecHorizontale.toFixed(0))
  } else {
    angle = -parseInt(s.angleAvecHorizontale.toFixed(0)) + 180
  }
  return new TexteParPoint(mark, O, angle, color, echelle)
}

/**
 * Code plusieurs segments de la même façon
 * @param {string} [mark = '||'] Symbole posé sur le segment
 * @param {string} [color = 'black'] Couleur du symbole : : du type 'blue' ou du type '#f15929'
 * @param  {Point[]|Segment|number} args Les segments différement codés + Taille relative du codage
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class CodageSegments extends ObjetMathalea2D {
  echelle: number
  stringColor: string // Pour pouvoir passer une simple couleur aux autres constructeurs.
  mark: string
  isEchelle: boolean
  args: (PointAbstrait | Point | Segment | number)[]
  constructor(mark = '||', color = 'black', ...args: any[]) {
    super()
    this.args = args
    this.mark = mark
    this.stringColor = color
    this.isEchelle = typeof args[args.length - 1] === 'number'
    this.echelle = this.isEchelle ? (args[args.length - 1] as number) : 1
    const trouveExtrem = function (
      xmin: number,
      ymin: number,
      xmax: number,
      ymax: number,
      ...pointsOuSegment: (Point | Segment)[]
    ): [number, number, number, number] {
      if (pointsOuSegment.length === 0) return [xmin, ymin, xmax, ymax]
      else {
        const premierElement = pointsOuSegment.shift() as unknown
        if (premierElement instanceof Segment) {
          xmin = Math.min(xmin, premierElement.x1, premierElement.x2)
          xmax = Math.max(xmax, premierElement.x1, premierElement.x2)
          ymin = Math.min(ymin, premierElement.y1, premierElement.y2)
          ymax = Math.max(ymax, premierElement.y1, premierElement.y2)
          return trouveExtrem(xmin, ymin, xmax, ymax, ...pointsOuSegment)
        } else if (premierElement instanceof Point) {
          xmin = Math.min(xmin, premierElement.x)
          xmax = Math.max(xmax, premierElement.x)
          ymin = Math.min(ymin, premierElement.y)
          ymax = Math.max(ymax, premierElement.y)
          return trouveExtrem(xmin, ymin, xmax, ymax, ...pointsOuSegment)
        } else {
          return trouveExtrem(xmin, ymin, xmax, ymax, ...pointsOuSegment)
        }
      }
    }
    this.bordures = trouveExtrem(
      1000,
      1000,
      -1000,
      -1000,
      ...(args as (Point | Segment)[]),
    ) as unknown as [number, number, number, number]
  }

  svg(coeff: number) {
    let code = ''
    if (Array.isArray(this.args[0])) {
      // Si on donne un tableau de points
      for (let i = 0; i < this.args[0].length - 1; i++) {
        const codage = codageSegment(
          this.args[0][i],
          this.args[0][i + 1],
          this.mark,
          this.stringColor,
          this.echelle,
        )
        code += codage.svg(coeff)
        code += '\n'
      }
      const codage = codageSegment(
        this.args[0][this.args[0].length - 1],
        this.args[0][0],
        this.mark,
        this.stringColor,
        this.echelle,
      )
      code += codage.svg(coeff)
      code += '\n'
    } else if (this.args[0].constructor === Segment) {
      for (
        let i = 0;
        i < (this.isEchelle ? this.args.length - 1 : this.args.length);
        i++
      ) {
        const codage = codageSegment(
          (this.args[i] as Segment).extremite1,
          (this.args[i] as Segment).extremite2,
          this.mark,
          this.stringColor,
          this.echelle,
        )
        code += codage.svg(coeff)
        code += '\n'
      }
    } else {
      for (
        let i = 0;
        i < (this.isEchelle ? this.args.length - 1 : this.args.length);
        i += 2
      ) {
        if (
          [this.args[i], this.args[i + 1]].every(
            (p) => p instanceof Point || p instanceof PointAbstrait,
          )
        ) {
          const codage = codageSegment(
            this.args[i] as PointAbstrait,
            this.args[i + 1] as Point,
            this.mark,
            this.stringColor,
            this.echelle,
          )
          code += codage.svg(coeff)
          code += '\n'
        }
      }
    }
    code = `<g id="${this.id}">${code}</g>`
    return code
  }

  tikz() {
    let code = ''
    if (Array.isArray(this.args[0])) {
      // Si on donne une liste de points
      for (let i = 0; i < this.args[0].length - 1; i++) {
        code += codageSegment(
          this.args[0][i],
          this.args[0][i + 1],
          this.mark,
          this.stringColor,
          this.echelle,
        ).tikz()
        code += '\n'
      }
      code += codageSegment(
        this.args[0][this.args[0].length - 1],
        this.args[0][0],
        this.mark,
        this.stringColor,
      ).tikz()
      code += '\n'
    } else if (this.args[0].constructor === Segment) {
      const condition = this.isEchelle ? this.args.length - 1 : this.args.length
      for (let i = 0; i < condition; i++) {
        code += codageSegment(
          (this.args[i] as Segment).extremite1,
          (this.args[i] as Segment).extremite2,
          this.mark,
          this.stringColor,
        ).tikz()
        code += '\n'
      }
    } else {
      const condition = this.isEchelle ? this.args.length - 1 : this.args.length
      for (let i = 0; i < condition; i += 2) {
        if (
          [this.args[i], this.args[i + 1]].every(
            (p) => p instanceof Point || p instanceof PointAbstrait,
          )
        ) {
          code += codageSegment(
            this.args[i] as PointAbstrait,
            this.args[i + 1] as PointAbstrait,
            this.mark,
            this.stringColor,
            this.echelle,
          ).tikz()
          code += '\n'
        }
      }
    }
    return code
  }
}

/**
 * Code plusieurs segments de la même façon
 * @param {string} [mark = '||'] Symbole posé sur le segment
 * @param {string} [color = 'black'] Couleur du symbole : : du type 'blue' ou du type '#f15929'
 * @param {Points|Point[]|Segments|number} args Les segments différement codés + Taille relative du codage. Voir exemples.
 * @example codageSegments('×','blue',A,B, B,C, C,D) // Code les segments [AB], [BC] et [CD] avec une croix bleue
 * @example codageSegments('×','blue',A,B, B,C, C,D, 1.2) // Code les segments [AB], [BC] et [CD] avec une croix bleue et une taille de 1.2
 * @example codageSegments('×','blue',[A,B,C,D]) // Code les segments [AB], [BC], [CD] et [DA] (attention, chemin fermé, pratique pour des polygones pas pour des lignes brisées)
 * @example codageSegments('×','blue',[A,B,C,D],1.5) // Code les segments [AB], [BC], [CD] et [DA] (attention, chemin fermé, pratique pour des polygones pas pour des lignes brisées) et une taille de la marque de 1.5
 * @example codageSegments('×','blue',s1,s2,s3) // Code les segments s1, s2 et s3 avec une croix bleue
 * @example codageSegments('×','blue',p.listePoints) // Code tous les segments du polygone avec une croix bleue
 * @author Rémi Angot
 * @return {CodageSegments}
 */
// JSDOC Validee par EE Juin 2022
export function codageSegments(mark = '||', color = 'black', ...args: any[]) {
  return new CodageSegments(mark, color, ...args)
}

/**
 * Code un angle
 * @param {Point} debut Point sur un côté de l'angle
 * @param {Point} centre Sommet de l'angle
 * @param {number|Point} angle Mesure de l'angle ou nom d'un point sur l'autre côté de l'angle
 * @param {number} [taille=0.8] Taille de l'angle
 * @param {string} [mark=''] Marque sur l'angle
 * @param {string} [color='black'] Couleur de l'angle : du type 'blue' ou du type '#f15929'
 * @param {number} [epaisseur=1] Epaisseur du tracé de l'angle
 * @param {number} [opacite=1] Opacité de la couleur du tracé de l'angle
 * @param {string} [couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage=0.2] Opacité de la couleur de remplissage de l'angle
 * @param {boolean} [mesureOn=false] Affichage de la mesure de l'angle
 * @param {boolean} [noAngleDroit=false] Pour choisir si on veut que l'angle droit soit marqué par un carré ou pas
 * @param {string} [texteACote=''] Pour mettre un texte à côté de l'angle à la place de la mesure de l'angle
 * @param {number} [tailleTexte=1] Pour choisir la taille du texte à côté de l'angle
 * @param {number} [echelleMark=1] Pour choisir la taille relative de la marque
 * @property {Point} debut Point sur un côté de l'angle
 * @property {Point} centre Sommet de l'angle
 * @property {number|Point} angle Mesure de l'angle ou nom d'un point sur l'autre côté de l'angle
 * @property {number} taille Taille de l'angle
 * @property {string} mark Marque sur l'angle
 * @property {string} color Couleur de l'angle. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} epaisseur Epaisseur du tracé de l'angle
 * @property {number} opacite Opacité de la couleur du tracé de l'angle
 * @property {string} couleurDeRemplissage À associer obligatoirement à colorToLatexOrHTML(). 'none' si on ne veut pas de remplissage.
 * @property {number} opaciteDeRemplissage Opacité de la couleur de remplissage de l'angle
 * @property {number} tailleTexte Pour choisir la taille du texte à côté de l'angle
 * @property {number} echelleMark Pour choisir la taille relative de la marque
 * @author Jean-Claude Lhote
 * @return {array} Liste d'objets MathAlea2D
 */
// JSDOC Validee par EE Juin 2022
export class CodageAngle extends ObjetMathalea2D {
  debut: PointAbstrait
  centre: PointAbstrait
  angle: number
  taille: number
  mark: string
  echelleMark: number
  tailleTexte: number
  angleArrondi: number
  couleurDeRemplissage: string[]
  opaciteDeRemplissage: number

  constructor(
    debut: PointAbstrait,
    centre: PointAbstrait,
    angle: PointAbstrait | number,
    taille = 0.8,
    mark = '',
    color = 'black',
    epaisseur = 1,
    opacite = 1,
    couleurDeRemplissage = 'none',
    opaciteDeRemplissage = 0.2,
    mesureOn = false,
    texteACote = '',
    tailleTexte = 1,
    { echelleMark = 1, angleArrondi = 0 } = {},
  ) {
    super()
    this.color = colorToLatexOrHTML(color)
    this.debut = debut
    this.centre = centre
    this.taille = taille
    this.mark = mark
    this.echelleMark = echelleMark
    this.epaisseur = epaisseur
    this.opacite = opacite
    this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
    this.opaciteDeRemplissage = opaciteDeRemplissage
    this.angle =
      angle instanceof PointAbstrait
        ? angleOriente(debut, centre, angle)
        : angle
    this.tailleTexte = tailleTexte
    this.angleArrondi = angleArrondi
    this.objets = []
    const depart = pointSurSegment(
      this.centre,
      this.debut,
      (this.taille * 20) / context.pixelsParCm,
    )
    const P = rotation(depart, this.centre, this.angle / 2)
    const M = pointSurSegment(
      this.centre,
      P,
      this.taille + (0.6 * 20) / context.pixelsParCm,
    )
    const d = droite(this.centre, P)
    const mesure = arrondi(Math.abs(this.angle), this.angleArrondi) + '^\\circ'
    const arcangle = arc(
      depart,
      this.centre,
      this.angle,
      couleurDeRemplissage !== 'none',
      couleurDeRemplissage,
      color,
    )
    arcangle.opacite = this.opacite
    arcangle.epaisseur = this.epaisseur
    arcangle.opaciteDeRemplissage = this.opaciteDeRemplissage
    this.objets.push(arcangle)
    if (this.mark !== '') {
      const t = texteParPoint(
        mark,
        P,
        90 - d.angleAvecHorizontale,
        color,
        this.echelleMark,
      )
      this.objets.push(t)
    }
    if (mesureOn && texteACote === '') {
      const t = latex2d(mesure, M.x + 0.2, M.y, {
        color,
        letterSize: tailleDeNbVersLatex(this.taille),
      })
      this.objets.push(t)
    } else if (texteACote !== '') {
      if (texteACote.includes('$')) {
        M.positionLabel = 'center'
        const label = latex2d(
          texteACote.substring(1, texteACote.length - 1),
          M.x,
          M.y,
          { color, backgroundColor: 'none' },
        )
        this.objets.push(label)
      } else
        this.objets.push(
          texteParPoint(texteACote, M, 0, color, this.tailleTexte),
        )
    }
    const bordures = fixeBordures(this.objets, {
      rxmin: 0,
      rxmax: 0,
      rymin: 0,
      rymax: 0,
    })
    this.bordures = [bordures.xmin, bordures.ymin, bordures.xmax, bordures.ymax]
  }
}

/**
 * affiche du Latex 'sur' un segment orienté
 * @param {Point} A Première extrémité du segment
 * @param {Point} B Seconde extrémité du segment
 * @param {number} [distance = 0.5] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @author Olivier Mimeau
 * @return {Latex2d}
 */

function directionLatex2d(A: PointAbstrait, B: PointAbstrait): number {
  // pour du texte dans le bon sens de lecture
  const sAB = segment(A, B)
  let directionAB = sAB.angleAvecHorizontale
  directionAB =
    directionAB > 90
      ? directionAB - 180
      : directionAB < -90
        ? directionAB + 180
        : directionAB
  return directionAB
}
function placeLatex2d(
  A: PointAbstrait,
  B: PointAbstrait,
  distance: number = 0.5,
): Point {
  // le point d'affichage du texte à 0.5 sous le milieu du segment orienté
  const M = milieu(A, B)
  const N = rotation(A, M, -90)
  const P = pointSurSegment(M, N, distance)
  return P
}
/**
 *
 * @param t Place du latex sur un segment orienté une belle alternative à texteSurSegment
 * @param A
 * @param B
 * @param options
 * @returns {Latex2d}
 */
export function placeLatexSurSegment(
  t: string,
  A: PointAbstrait,
  B: PointAbstrait,
  {
    distance = 0.5,
    color = 'black',
    backgroundColor = 'none',
    letterSize = 'normalsize',
    horizontal = false,
  }: {
    distance?: number
    color?: string
    backgroundColor?: string
    letterSize?: LetterSizeType
    horizontal?: boolean
  } = {},
): Latex2d {
  const Q = latex2d(
    t,
    placeLatex2d(A, B, distance).x,
    placeLatex2d(A, B, distance).y,
    {
      orientation: horizontal ? 0 : directionLatex2d(A, B),
      color,
      backgroundColor,
      letterSize,
    },
  )
  return Q
}
