import {
  colorToLatexOrHTML,
  fixeBordures,
  mathalea2d,
  ObjetMathalea2D,
  vide2d,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { egal } from '../../modules/outils'
import type { Angle } from '../mathFonctions/trigo'
import { arrondi, unSiPositifMoinsUnSinon } from '../outils/nombres'
import { arc, cercle, cercleCentrePoint } from './cercle'
import { CodageAngle } from './codages'
import { point, pointSurCercle, pointSurSegment } from './points'
import { polygone, polyline } from './polygones'
import { longueur, segment, vecteur } from './segmentsVecteurs'
import { latexParPoint, texteParPoint, texteParPosition } from './textes'
import { homothetie, rotation } from './transformations'
import type { PointAbstrait } from './points-abstraits'

export type MarkType =
  | 'simple'
  | 'double'
  | 'triple'
  | 'gras'
  | 'double-gras'
  | 'gras-simple-gras'
  | 'simple-gras-simple'
  | 'pointilles'
  | 'double-pointilles'
  | 'mixte-simple-pointilles'
  | 'mixte-gras-pointilles'
export const markTypeArray: MarkType[] = [
  'simple',
  'double',
  'triple',
  'gras',
  'double-gras',
  'gras-simple-gras',
  'simple-gras-simple',
  'pointilles',
  'double-pointilles',
  'mixte-simple-pointilles',
  'mixte-gras-pointilles',
]
export class MarqueAngle extends ObjetMathalea2D {
  constructor(
    start: PointAbstrait,
    sommet: PointAbstrait,
    end: PointAbstrait,
    {
      mark = 'simple',
      color = 'black',
      rayon = 1,
    }: {
      mark: MarkType
      color?: string
      rayon?: number
    },
  ) {
    super()
    this.objets = []
    const a = pointSurSegment(sommet, start, rayon)
    const angle = angleOriente(start, sommet, end)
    switch (mark) {
      case 'double':
        {
          const aPrime = homothetie(a, sommet, 0.9)
          const aSeconde = homothetie(a, sommet, 1.1)
          this.objets.push(
            arc(aPrime, sommet, angle, false, 'none', color),
            arc(aSeconde, sommet, angle, false, 'none', color),
          )
        }
        break
      case 'triple':
        {
          const aPrime = homothetie(a, sommet, 0.9)
          const aSeconde = homothetie(a, sommet, 1.1)
          this.objets.push(
            arc(aPrime, sommet, angle, false, 'none', color),
            arc(a, sommet, angle, false, 'none', color),
            arc(aSeconde, sommet, angle, false, 'none', color),
          )
        }
        break
      case 'gras':
        {
          const marqueGrasse = arc(a, sommet, angle, false, 'none', color)
          marqueGrasse.epaisseur = 4
          this.objets.push(marqueGrasse)
        }
        break
      case 'double-gras':
        {
          const aPrime = homothetie(a, sommet, 0.9)
          const aSeconde = homothetie(a, sommet, 1.1)
          const marqueGrasse1 = arc(aPrime, sommet, angle, false, 'none', color)
          const marqueGrasse2 = arc(
            aSeconde,
            sommet,
            angle,
            false,
            'none',
            color,
          )
          marqueGrasse1.epaisseur = 2
          marqueGrasse2.epaisseur = 2
          this.objets.push(marqueGrasse1, marqueGrasse2)
        }
        break
      case 'gras-simple-gras':
        {
          const aPrime = homothetie(a, sommet, 0.85)
          const aSeconde = homothetie(a, sommet, 1.15)
          const marqueGrasse1 = arc(aPrime, sommet, angle, false, 'none', color)
          const marqueGrasse2 = arc(
            aSeconde,
            sommet,
            angle,
            false,
            'none',
            color,
          )
          marqueGrasse1.epaisseur = 2
          marqueGrasse2.epaisseur = 2
          this.objets.push(
            marqueGrasse1,
            arc(a, sommet, angle, false, 'none', color),
            marqueGrasse2,
          )
        }
        break
      case 'simple-gras-simple':
        {
          const aPrime = homothetie(a, sommet, 0.85)
          const aSeconde = homothetie(a, sommet, 1.15)
          const marqueGrasse = arc(a, sommet, angle, false, 'none', color)
          const marqueSimple1 = arc(aPrime, sommet, angle, false, 'none', color)
          const marqueSimple2 = arc(
            aSeconde,
            sommet,
            angle,
            false,
            'none',
            color,
          )
          marqueGrasse.epaisseur = 2
          this.objets.push(marqueSimple1, marqueGrasse, marqueSimple2)
        }
        break
      case 'pointilles':
        {
          const marque = arc(a, sommet, angle, false, 'none', color)
          marque.pointilles = 3
          marque.epaisseur = 2
          this.objets.push(marque)
        }
        break
      case 'double-pointilles':
        {
          const aPrime = homothetie(a, sommet, 1)
          const aSeconde = homothetie(a, sommet, 1.1)
          const marque1 = arc(aPrime, sommet, angle, false, 'none', color)
          const marque2 = arc(aSeconde, sommet, angle, false, 'none', color)
          marque1.pointilles = 5
          marque2.pointilles = 5
          this.objets.push(marque1, marque2)
        }
        break
      case 'mixte-simple-pointilles':
        {
          const aPrime = homothetie(a, sommet, 0.9)
          const aSeconde = homothetie(a, sommet, 1.1)
          const marque = arc(aSeconde, sommet, angle, false, 'none', color)
          const marque1 = arc(aPrime, sommet, angle, false, 'none', color)
          marque1.pointilles = 3
          marque1.epaisseur = 2
          marque.epaisseur = 2
          this.objets.push(marque, marque1)
        }
        break
      case 'mixte-gras-pointilles':
        {
          const aPrime = homothetie(a, sommet, 0.9)
          const aSeconde = homothetie(a, sommet, 1.1)
          const marque1 = arc(aSeconde, sommet, angle, false, 'none', color)
          const marque = arc(aPrime, sommet, angle, false, 'none', color)
          marque1.pointilles = 3
          marque.epaisseur = 2
          this.objets.push(marque, marque1)
        }
        break
      case 'simple':
      default:
        {
          const marque = arc(a, sommet, angle, false, 'none', color)
          marque.epaisseur = 2
          this.objets.push(marque)
        }
        break
    }
    const bordures = fixeBordures(this.objets, {
      rxmin: 0,
      rxmax: 0,
      rymin: 0,
      rymax: 0,
    })
    this.bordures = [bordures.xmin, bordures.ymin, bordures.xmax, bordures.ymax]
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

export function marqueAngle(
  start: PointAbstrait,
  sommet: PointAbstrait,
  end: PointAbstrait,
  {
    mark = 'simple',
    color = 'black',
    rayon = 1,
  }: {
    mark: MarkType
    color?: string
    rayon?: number
  },
) {
  return new MarqueAngle(start, sommet, end, { mark, color, rayon })
}

export class Rapporteur extends ObjetMathalea2D {
  x: number
  y: number
  taille: number

  constructor({
    x = 0,
    y = 0,
    taille = 7,
    depart = 0,
    semi = false,
    avecNombre = 'deuxSens',
    precisionAuDegre = 1,
    stepGraduation = 10,
    rayonsVisibles = true,
    color = 'gray',
  }) {
    super()
    this.x = x
    this.y = y
    this.taille = taille
    this.opacite = 0.7
    this.color = colorToLatexOrHTML(color)
    this.objets = []
    let numero
    let azimut
    let rayon
    let nbDivisions
    let arcPlein
    if (semi) {
      arcPlein = 180
      nbDivisions = 18
    } else {
      arcPlein = 360
      nbDivisions = 36
    }

    const centre = point(this.x, this.y)
    azimut = rotation(point(this.x + 1, this.y), centre, depart)
    let azimut2 = pointSurSegment(centre, azimut, this.taille)
    const arc1 = arc(azimut, centre, arcPlein - 0.1, false, 'none', color)
    const arc2 = arc(azimut2, centre, arcPlein - 0.1, false, 'none', color)
    this.objets.push(segment(azimut2, rotation(azimut2, centre, 180), color))
    rayon = segment(azimut, azimut2, color)
    if (rayonsVisibles) this.objets.push(arc1)
    // this.objets.push(arc2, rayon)
    this.objets.push(arc2)
    for (let i = 0; i < nbDivisions; i++) {
      if (avecNombre !== '') {
        if (avecNombre === 'deuxSens') {
          if (i === 0) {
            numero = texteParPoint(
              String(arcPlein),
              rotation(homothetie(azimut2, centre, 0.8), centre, 2),
              -depart,
              color,
              0.65,
            )
            numero.contour = true
            this.objets.push(numero)
          }
          if (i === nbDivisions - 1) {
            numero = texteParPoint(
              String(arcPlein - (1 + i) * 10),
              rotation(
                homothetie(azimut2, centre, 0.8),
                centre,
                arcPlein / nbDivisions - 2,
              ),
              -depart,
              color,
              0.65,
            )
            numero.contour = true
            this.objets.push(numero)
          } else if ((arcPlein - (1 + i) * 10) % stepGraduation === 0) {
            numero = texteParPoint(
              String(arcPlein - (1 + i) * 10),
              rotation(
                homothetie(azimut2, centre, 0.8),
                centre,
                arcPlein / nbDivisions,
              ),
              90 - (1 + i) * 10 - depart,
              color,
              0.78,
            )
            numero.contour = true
            this.objets.push(numero)
          }
        }
        if (i === 0) {
          numero = texteParPoint(
            '0',
            rotation(homothetie(azimut2, centre, 0.9), centre, 2),
            -depart,
            color,
            0.65,
          )
          numero.contour = true
          this.objets.push(numero)
        }
        if (i === nbDivisions - 1) {
          numero = texteParPoint(
            String((1 + i) * 10),
            rotation(
              homothetie(azimut2, centre, 0.9),
              centre,
              arcPlein / nbDivisions - 2,
            ),
            -depart,
            color,
            0.65,
          )
          numero.contour = true
          this.objets.push(numero)
        } else if (((i + 1) * 10) % stepGraduation === 0) {
          numero = texteParPoint(
            String((1 + i) * 10),
            rotation(
              homothetie(azimut2, centre, 0.9),
              centre,
              arcPlein / nbDivisions,
            ),
            90 - (1 + i) * 10 - depart,
            color,
            0.65,
          )
          numero.contour = true
          this.objets.push(numero)
        }
      }
      for (let s = 1, r; s < 10; s++) {
        if (s === 5 && precisionAuDegre < 10) {
          r = segment(
            homothetie(rotation(azimut2, centre, s), centre, 0.92),
            homothetie(rotation(azimut2, centre, s), centre, 0.99),
            color,
          )
          r.opacite = 0.6
          r.tailleExtremites = 0.65
          this.objets.push(r)
        } else if (precisionAuDegre === 1) {
          r = segment(
            homothetie(rotation(azimut2, centre, s), centre, 0.96),
            homothetie(rotation(azimut2, centre, s), centre, 0.99),
            color,
          )
          r.opacite = 0.6
          r.tailleExtremites = 0.65
          this.objets.push(r)
        }
      }
      if (i !== 0 && i !== 36 && i !== 18) this.objets.push(rayon)
      azimut = rotation(azimut, centre, arcPlein / nbDivisions)
      azimut2 = rotation(azimut2, centre, arcPlein / nbDivisions)
      if (rayonsVisibles) rayon = segment(azimut, azimut2, color)
      else rayon = segment(homothetie(azimut2, centre, 0.9), azimut2, color)
      rayon.opacite = this.opacite
    }
    if (!semi) {
      rayon = segment(
        homothetie(rotation(azimut, centre, -90), centre, -0.2),
        homothetie(rotation(azimut, centre, -90), centre, 0.2),
        color,
      )
      this.objets.push(rayon)
      rayon = segment(
        homothetie(azimut, centre, -0.2),
        homothetie(azimut, centre, 0.2),
        color,
      )
    } else {
      rayon = segment(
        centre,
        homothetie(rotation(azimut, centre, -90), centre, 0.2),
        color,
      )
    }
    this.objets.push(rayon)
    const bordures = fixeBordures(this.objets, {
      rxmin: 0,
      rxmax: 0,
      rymin: 0,
      rymax: 0,
    })
    this.bordures = [bordures.xmin, bordures.ymin, bordures.xmax, bordures.ymax]
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
 * place un rapporteur centré en (x,y) avec le zéro orienté à depart degrés.
 * @param {object} parametres
 * @param {number} [parametres.x] abscisse du centre du rapporteur
 * @param {number} [parametres.y] ordonnée du centre du rapporteur
 * @param {number} [parametres.taille] taille du rapporteur
 * @param {number} [parametres.depart] orientation du zéro du rapporteur en degrés
 * @param {boolean} [parametres.semi] si semi === false alors les graduations vont de 0 à 180° sinon de 0 à 360°
 * @param {string} [parametres.avecNombre] === "", il n'y a pas de graduations, si avecNombre === "deuxSens" il est gradué dans les deux directions
 * si avecNombre === "unSens" il est gradué dans le sens trigo.
 * @param {number}[parametres. precisionAuDegre] === 10 alors il n'y aura pas de graduations entre les multiples de 10°, les autres valeurs sont 5 et 1.
 * @param {number} [parametres.stepGraduation] est un multiple de 10 qui divise 180 (c'est mieux) donc 10 (par défaut), ou 20, ou 30, ou 60 ou 90.
 * @param {boolean} [parametres.rayonsVisibles] = false permet de supprimer les rayons et le cercle central
 * @param {object} param0 = {x: 'number', y: 'number', taille: 'number', semi: boolean, avecNombre: string}
 * @return {Rapporteur} // crée un instance de l'objet 2d Rapporteur
 */
export function rapporteur({
  x = 0,
  y = 0,
  taille = 7,
  depart = 0,
  semi = false,
  avecNombre = 'deuxSens',
  precisionAuDegre = 1,
  stepGraduation = 10,
  rayonsVisibles = true,
  color = 'gray',
}) {
  return new Rapporteur({
    x,
    y,
    taille,
    depart,
    semi,
    avecNombre,
    precisionAuDegre,
    stepGraduation,
    rayonsVisibles,
    color,
  })
}

/**
 * Renvoie la mesure d'angle en degré
 * @param {PointAbstrait} A Point sur un côté de l'angle
 * @param {PointAbstrait} O Sommet de l'angle
 * @param {PointAbstrait} B Point sur l'autre côté de l'angle
 * @param {number} [precision = 2] Nombre maximal de décimales de la valeur arrondie de la mesure de l'angle
 * @example x = angle(H,E,T)
 * // x contient la mesure en degré de l'angle HET, arrondi au centième
 * @example x = angle(H,E,T,0)
 * // x contient la mesure en degré de l'angle HET, arrondi à l'unité
 * @return {number}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function angle(
  A: PointAbstrait,
  O: PointAbstrait,
  B: PointAbstrait,
  precision = 2,
) {
  const OA = longueur(O, A, precision)
  const OB = longueur(O, B, precision)
  const AB = longueur(A, B, precision)
  if (OA > 0 && OB > 0) {
    const v = vecteur(O, A)
    const w = vecteur(O, B)
    if (egal(v.x * w.y - v.y * w.x, 0)) {
      // vecteurs colinéaires à epsilon près pour éviter les effets de bords dus aux flottants.
      if (v.x * w.x > 0) return 0
      else if (v.x * w.x < 0) return 180
      else if (v.y * w.y > 0) return 0
      else return 180
    } else {
      let cos = (AB ** 2 - OA ** 2 - OB ** 2) / (-2 * OA * OB)
      if (cos < -1) cos = -1
      if (cos > 1) cos = 1
      const alpha = Math.acos(cos)
      return arrondi((alpha * 180) / Math.PI, precision)
    }
  } else {
    // Ce n'est pas normal de demander la mesure d'un angle dont un côté a une longueur nulle.
    return 0
  }
}

/**
 * Convertit un nombre de degrés quelconque en une mesure comprise entre -180 et 180
 * @param {number} a Valeur en degrés dont on cherche la valeur entre -180 et 180
 * @example x = angleModulo(170)
 * // x contient 170
 * @example x = angleModulo(190)
 * // x contient -170
 * @example x = angleModulo(3690)
 * // x contient 90
 * @example x = angleModulo(180)
 * // x contient 180
 * @example x = angleModulo(-180)
 * // x contient 180
 * @return {number}
 */
// JSDOC Validee par EE Juin 2022
export function angleModulo(a: number) {
  while (a <= -180) a = a + 360
  while (a > 180) a = a - 360
  return a
}

/**
 * Retourne la valeur signée de la mesure d'un angle en degré
 * @param {PointAbstrait} A Point sur un côté de l'angle
 * @param {PointAbstrait} O Sommet de l'angle
 * @param {PointAbstrait} B Point sur l'autre côté de l'angle
 * @param {number} [precision = 2] Nombre maximal de décimales de la valeur arrondie de la mesure de l'angle orienté
 * @example x = angleOriente(H,E,T)
 * // x contient la valeur de la mesure de l'angle orienté HET, arrondie au centième
 * @example x = angleOriente(H,E,T,0)
 * // x contient la valeur de la mesure de l'angle orienté HET, arrondie à l'unité
 * @return {number}
 * @author Jean-Claude Lhote
 */
// JSDOC Validee par EE Juin 2022
export function angleOriente(
  A: PointAbstrait,
  O: PointAbstrait,
  B: PointAbstrait,
  precision = 2,
) {
  const OA = longueur(O, A, precision)
  const OB = longueur(O, B, precision)
  if (OA < 1e-12 || OB < 1e-12) {
    // On considère qu'un côté de l'angle a une longueur nulle, et ce n'est pas normal !
    // window.notify('angleOriente() a reçu des points confondus pour déterminer l\'angle !', { OA, OB })
    return 0
  }
  const A2 = rotation(A, O, 90)
  const v = vecteur(O, B)
  const u = vecteur(O, A2)

  return arrondi(
    unSiPositifMoinsUnSinon(arrondi(v.x * u.x + v.y * u.y, 10)) *
      angle(A, O, B, 10),
    precision,
  )
}

/**
 * Retourne la valeur la mesure d'un angle en radian
 * @param {PointAbstrait} A Point sur un côté de l'angle
 * @param {PointAbstrait} O Sommet de l'angle
 * @param {PointAbstrait} B Point sur l'autre côté de l'angle
 * @param {number} [precision = 2] Nombre maximal de décimales de la valeur arrondie de la mesure de l'angle orienté
 * @example x = angleradian(H,E,T)
 * // x contient la valeur de la mesure de l'angle HET en radians, arrondie au centième
 * @example x = angleradian(H,E,T,0)
 * // x contient la valeur de la mesure de l'angle HET en radians, arrondie à l'unité
 * @return {number}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function angleradian(
  A: PointAbstrait,
  O: PointAbstrait,
  B: PointAbstrait,
  precision = 2,
) {
  const OA = longueur(O, A, precision)
  const OB = longueur(O, B, precision)
  const AB = longueur(A, B, precision)
  return arrondi(
    Math.acos((AB ** 2 - OA ** 2 - OB ** 2) / (-2 * OA * OB)),
    precision,
  )
}

/**
 * Code un angle droit
 * @param {PointAbstrait} A Point sur un côté de l'angle droit
 * @param {PointAbstrait} O Sommet de l'angle droit
 * @param {PointAbstrait} B Point sur l'autre côté de l'angle droit
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'
 * @param {number} [d=0.4] Taille du codage de l'angle droit
 * @param {number} [epaisseur=0.5] Epaisseur du trait
 * @param {number} [opacite=1] Opacité du trait
 * @param {string} [couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage=1] Taux d'opacité du remplissage entre 0 et 1
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {PointAbstrait} depart Point sur un côté de l'angle droit
 * @property {PointAbstrait} sommet Sommet de l'angle droit
 * @property {PointAbstrait} arrivee Point sur l'autre côté de l'angle droit
 * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} taille Taille du codage de l'angle droit
 * @property {string} couleurDeRemplissage 'none' si on ne veut pas de remplissage. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opaciteDeRemplissage Taux d'opacité du remplissage entre 0 et 1
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class CodageAngleDroit extends ObjetMathalea2D {
  sommet: PointAbstrait
  depart: PointAbstrait
  arrivee: PointAbstrait
  taille: number
  color: [string, string]
  couleurDeRemplissage: [string, string]
  opaciteDeRemplissage: number

  constructor(
    A: PointAbstrait,
    O: PointAbstrait,
    B: PointAbstrait,
    color = 'black',
    d = 0.4,
    epaisseur = 0.5,
    opacite = 1,
    couleurDeRemplissage = 'none',
    opaciteDeRemplissage = 1,
  ) {
    super()
    this.sommet = O
    this.depart = A
    this.arrivee = B
    this.taille = d
    this.color = colorToLatexOrHTML(color)
    this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
    this.opaciteDeRemplissage = opaciteDeRemplissage
    const a = pointSurSegment(
      this.sommet,
      this.depart,
      (this.taille * 20) / context.pixelsParCm,
    )
    const b = pointSurSegment(
      this.sommet,
      this.arrivee,
      (this.taille * 20) / context.pixelsParCm,
    )
    let o
    if (angleOriente(this.depart, this.sommet, this.arrivee) > 0) {
      o = rotation(this.sommet, a, -90)
    } else {
      o = rotation(this.sommet, a, 90)
    }
    const bordures = fixeBordures([a, b, o], {
      rxmin: 0,
      rxmax: 0,
      rymin: 0,
      rymax: 0,
    })
    this.bordures = [bordures.xmin, bordures.ymin, bordures.xmax, bordures.ymax]
    this.epaisseur = epaisseur
    this.opacite = opacite
  }

  svg(coeff: number) {
    const a = pointSurSegment(
      this.sommet,
      this.depart,
      (this.taille * 20) / coeff,
    )
    const b = pointSurSegment(
      this.sommet,
      this.arrivee,
      (this.taille * 20) / coeff,
    )
    let o: PointAbstrait
    if (angleOriente(this.depart, this.sommet, this.arrivee) > 0) {
      o = rotation(this.sommet, a, -90)
    } else {
      o = rotation(this.sommet, a, 90)
    }
    const result = polygone([this.sommet, a, o, b], this.color[0])
    if (this.couleurDeRemplissage[0] !== 'none') {
      result.couleurDeRemplissage = [
        this.couleurDeRemplissage[0],
        this.couleurDeRemplissage[1],
      ]
      result.opaciteDeRemplissage = this.opaciteDeRemplissage
    }
    result.epaisseur = this.epaisseur
    result.opacite = this.opacite
    this.id = result.id
    return result.svg(coeff)
  }

  tikz() {
    const a = pointSurSegment(
      this.sommet,
      this.depart,
      this.taille / context.scale,
    )
    const b = pointSurSegment(
      this.sommet,
      this.arrivee,
      this.taille / context.scale,
    )
    let o: PointAbstrait
    if (angleOriente(this.depart, this.sommet, this.arrivee) > 0) {
      o = rotation(this.sommet, a, -90)
    } else {
      o = rotation(this.sommet, a, 90)
    }
    const result = polygone([this.sommet, a, o, b], this.color[1])
    if (this.couleurDeRemplissage[1] === '') {
      result.couleurDeRemplissage = [
        this.couleurDeRemplissage[0],
        this.couleurDeRemplissage[1],
      ]
      result.opaciteDeRemplissage = this.opaciteDeRemplissage
      result.epaisseur = this.epaisseur
      result.opacite = this.opacite
    }
    return result.tikz()
  }

  svgml(coeff: number, amp: number) {
    const a = pointSurSegment(
      this.sommet,
      this.depart,
      (this.taille * 20) / coeff,
    )
    const b = pointSurSegment(
      this.sommet,
      this.arrivee,
      (this.taille * 20) / coeff,
    )
    let o: PointAbstrait
    if (angleOriente(this.depart, this.sommet, this.arrivee) > 0) {
      o = rotation(this.sommet, a, -90)
    } else {
      o = rotation(this.sommet, a, 90)
    }
    return polyline([a, o, b], this.color[0]).svgml(coeff, amp)
  }

  tikzml(amp: number) {
    const a = pointSurSegment(
      this.sommet,
      this.depart,
      this.taille / context.scale,
    )
    const b = pointSurSegment(
      this.sommet,
      this.arrivee,
      this.taille / context.scale,
    )
    let o: PointAbstrait
    if (angleOriente(this.depart, this.sommet, this.arrivee) > 0) {
      o = rotation(this.sommet, a, -90)
    } else {
      o = rotation(this.sommet, a, 90)
    }
    return polyline([a, o, b], this.color[1]).tikzml(amp)
  }
}

/**
 * Code un angle droit
 * @param {PointAbstrait} A Point sur un côté de l'angle droit
 * @param {PointAbstrait} O Sommet de l'angle droit
 * @param {PointAbstrait} B Point sur l'autre côté de l'angle droit
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'
 * @param {number} [d=0.4] Taille du codage de l'angle droit
 * @param {number} [epaisseur=0.5] Epaisseur du trait
 * @param {number} [opacite=1] Opacité du trait
 * @param {string} [couleurDeRemplissage='none'] 'none' si on ne veut pas de remplissage, sinon une couleur du type 'blue' ou du type '#f15929'
 * @param {number} [opaciteDeRemplissage=1] Taux d'opacité du remplissage
 * @example codageAngleDroit(A,J,T)
 * // Trace un codage d'angle droit pour l'angle direct AJT, de couleur noire, de taille 0,4, d'épaisseur 0,5 avec une opacité de 100 %, sans remplissage
 * @example codageAngleDroit(A,J,T,'pink',1,0.2,0.6,'blue',0.2)
 * // Trace un codage d'angle droit pour l'angle direct AJT, de couleur rose, de taille 1, d'épaisseur 0,2 avec une opacité de 60 %, rempli en bleu avec une opacité de 20%.
 * @return {CodageAngleDroit}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function codageAngleDroit(
  A: PointAbstrait,
  O: PointAbstrait,
  B: PointAbstrait,
  color = 'black',
  d = 0.4,
  epaisseur = 0.5,
  opacite = 1,
  couleurDeRemplissage = 'none',
  opaciteDeRemplissage = 1,
) {
  return new CodageAngleDroit(
    A,
    O,
    B,
    color,
    d,
    epaisseur,
    opacite,
    couleurDeRemplissage,
    opaciteDeRemplissage,
  )
}

/**
 * Code un angle
 * @param {PointAbstrait} A Point sur un côté de l'angle
 * @param {PointAbstrait} O Sommet de l'angle
 * @param {number|PointAbstrait} angle Mesure de l'angle ou nom d'un point sur l'autre côté de l'angle
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
 * @param {object} [options={}]
 * @param {number} [options.echelleMark=1] Taille relative de la marque de l'angle
 * @param {number} [options.angleArrondi=0] Arrondi de l'angle
 * @example codageAngle(H,K,30)
 * // Code l'angle de centre K, avec H sur un côté de l'angle et avec 30° comme mesure d'angle orienté,
 * // en noir, avec une épaisseur de 1, une opacité de 100 %, un rayon d'arc de 0,8, sans autre option.
 * @example codageAngle(H,K,G)
 * // Code l'angle HKG, en noir, avec une épaisseur de 1, une opacité de 100 %, un rayon d'arc de 0,8, sans autre option.
 * @example codageAngle(H,K,G,2,'x','red',0.5,0.2,'blue',0.8,true,true)
 * // Code l'angle HKG, en rouge, avec une épaisseur de 0.5 et une opacité de 20 %, rempli en bleu avec une opacité de 80 %
 * // avec un arc de cercle de rayon 2, avec une marque 'x' sur l'angle, en affichant la mesure de l'angle et sans faire apparaître d'angle droit le cas échéant.
 * @example codageAngle(H,K,G,2,'x','red',0.5,0.2,'blue',0.8,true,true,'?',2)
 * // Code l'angle HKG, en rouge, avec une épaisseur de 0.5 et une opacité de 20 %, rempli en bleu avec une opacité de 80 %
 * // avec un arc de cercle de rayon 2, avec une marque 'x' sur l'angle, en affichant le texte '?' d'une taille de 2 et sans faire apparaître d'angle droit le cas échéant.
 * @author Jean-Claude Lhote
 * @return {CodageAngle|CodageAngleDroit}
 */
// JSDOC Validee par EE Juin 2022
export function codageAngle(
  A: PointAbstrait,
  O: PointAbstrait,
  angle: PointAbstrait | number,
  taille = 0.8,
  mark = '',
  color = 'black',
  epaisseur = 1,
  opacite = 1,
  couleurDeRemplissage = 'none',
  opaciteDeRemplissage = 0.2,
  mesureOn = false,
  noAngleDroit = false,
  texteACote = '',
  tailleTexte = 1,
  { echelleMark = 1, angleArrondi = 0 } = {},
) {
  let angleNumerique: number
  if (typeof angle !== 'number') {
    angleNumerique = angleOriente(A, O, angle)
  } else {
    angleNumerique = angle
  }
  if ((angleNumerique === 90 || angleNumerique === -90) && !noAngleDroit) {
    return new CodageAngleDroit(
      A,
      O,
      rotation(A, O, angleNumerique),
      color,
      taille,
      epaisseur,
      opacite,
      couleurDeRemplissage,
      opaciteDeRemplissage,
    )
  } else
    return new CodageAngle(
      A,
      O,
      angleNumerique,
      taille,
      mark,
      color,
      epaisseur,
      opacite,
      couleurDeRemplissage,
      opaciteDeRemplissage,
      mesureOn,
      texteACote,
      tailleTexte,
      { echelleMark, angleArrondi },
    )
}

export class NomAngleParPosition extends ObjetMathalea2D {
  constructor(nom: string, x: number, y: number, color: string, s: number) {
    super()
    this.objets = []
    this.objets.push(texteParPosition(nom, x, y, 0, color, 1, 'milieu', true))
    const s1 = segment(
      x - 0.6,
      y + 0.4 - s / 10,
      x + 0.1,
      y + 0.4 + s / 10,
      color,
    )
    const s2 = segment(
      x + 0.1,
      y + 0.4 + s / 10,
      x + 0.8,
      y + 0.4 - s / 10,
      color,
    )
    this.objets.push(s1, s2)
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets != null) {
      for (const objet of this.objets) {
        code += '\n\t' + (objet as ObjetMathalea2D).svg(coeff)
      }
      return code
    } else return ''
  }

  tikz() {
    let code = ''
    if (this.objets != null) {
      for (const objet of this.objets) {
        code += '\n\t' + objet.tikz()
      }
      return code
    } else return ''
  }
}

export function nomAngleSaillantParPosition(
  nom: string,
  x: number,
  y: number,
  color: string,
) {
  return new NomAngleParPosition(nom, x, y, color, 1)
}

export function nomAngleRentrantParPosition(
  nom: string,
  x: number,
  y: number,
  color: string,
) {
  return new NomAngleParPosition(nom, x, y, color, -1)
}

/**
 *
 * @param {Angle} angle
 * @param {string} cosOrSin
 * @returns string
 */
export function cercleTrigo(angle: Angle, cosOrSin = 'cos') {
  const monAngle = parseInt(angle.degres ?? '0')
  const r = 5
  const tAngle = angle.radians
  const tCos = Array.isArray(angle.cos) ? angle.cos[0] : angle.cos
  const tSin = Array.isArray(angle.sin) ? angle.sin[0] : angle.sin
  const O = point(0, 0)
  const I = point(r, 0)
  const J = point(0, r)
  const I2 = point(-r, 0)
  const J2 = point(0, -r)
  const s1 = segment(I, I2)
  const s2 = segment(J, J2)
  const c = cercleCentrePoint(O, I)
  const c2 = cercle(O, 5.7)
  const M = pointSurCercle(c, monAngle, '')
  const M2 = pointSurCercle(c2, monAngle, '')
  const sOM = segment(O, M, 'blue')
  const sOI = segment(O, I, 'blue')
  sOM.epaisseur = 3
  sOI.epaisseur = 3
  const x = point(M.x, 0)
  const y = point(0, M.y)
  const sMx = !egal(M.y, 0) ? segment(M, x) : vide2d()
  sMx.pointilles = 5
  const sMy = !egal(M.x, 0) ? segment(M, y) : vide2d()
  sMy.pointilles = 5
  const texteAngle = latexParPoint(tAngle ?? '0', M2)
  const Rx = point(M.x, M.y < 0 ? 1.5 : -1.5)
  const Ry = point(M.x < 0 ? 0.65 : -1.5, M.y)
  const texteCosinus = latexParPoint(tCos ?? '0', Rx)
  const texteSinus = latexParPoint(tSin ?? '0', Ry)
  const sCos = segment(O, point(M.x, 0))
  const sSin = segment(O, point(0, M.y))
  sCos.epaisseur = 3
  sSin.epaisseur = 3
  const marqueAngle = codageAngle(I, O, M)
  marqueAngle.color = colorToLatexOrHTML('blue')
  marqueAngle.epaisseur = 3
  const objetsTrigo = []
  if (cosOrSin === 'cos') {
    objetsTrigo.push(texteCosinus, sCos, sMx)
  } else {
    objetsTrigo.push(texteSinus, sSin, sMy)
  }
  return mathalea2d(
    {
      xmin: -r - 3,
      xmax: r + 3,
      ymin: -r - 1.8,
      ymax: r + 1.8,
      scale: 0.5,
    },
    c,
    texteAngle,
    marqueAngle,
    s1,
    s2,
    ...objetsTrigo,
    sOM,
    sOI,
  )
}
