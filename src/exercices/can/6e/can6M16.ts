import { point } from '../../../lib/2d/points'
import { carre, Polygone, polygone } from '../../../lib/2d/polygones'
import { grille } from '../../../lib/2d/reperes'
import { texteParPosition } from '../../../lib/2d/textes'
import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import {
  colorToLatexOrHTML,
  fixeBordures,
  mathalea2d,
  type NestedObjetMathalea2dArray,
} from '../../../modules/2dGeneralites'
import { contraindreValeur, randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Mesurer une aire de carré, rectangle, triangle rectangle'
export const dateDePublication = '25/04/2024'
export const dateDeModifImportante = '31/07/2025' // Rajout de différentes unités par Eric Elter
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true

/**
 * @author Jean-Claude Lhote
 */
export const uuid = 'b486a'

export const refs = {
  'fr-fr': ['can6M16', 'auto6M2C-flash2'],
  'fr-ch': ['9GM1-12'],
}
export default class AireUsuelleParComptageCan extends ExerciceSimple {
  constructor() {
    super()
    this.nbQuestions = 1
    this.typeExercice = 'simple'
    this.besoinFormulaireNumerique = [
      'Type de surface',
      3,
      '1 : Carré\n2 : Rectangle\n3 : Triangle rectangle',
    ]
    this.besoinFormulaire2CaseACocher = [
      'Avec des fractions de carreaux',
      false,
    ]
    this.besoinFormulaire3Numerique = [
      "Choixe de l'unité d'aire",
      4,
      '1 : Le carreau entier\n2 : Le demi carreau rectangulaire\n3 : Le demi carreau triangulaire\n4 : Le quart de carreau',
    ]
    this.besoinFormulaire4Numerique = ['Unités', 3, '1 : u.a\n2 : cm²\n3 : m²']
    this.sup = 1
    this.sup2 = false
    this.sup3 = 1
    this.sup4 = 2
    this.spacing = 3
  }

  nouvelleVersion() {
    const unite = ['u.a', 'cm²', 'm²'][
      contraindreValeur(1, 3, this.sup4, 2) - 1
    ]
    const objets: NestedObjetMathalea2dArray = []
    const coeff =
      this.sup3 === 1 ? 1 : this.sup3 === 2 ? 2 : this.sup3 === 3 ? 2 : 4
    let a: number
    let b: number
    let objet: Polygone
    let value: string[]
    let aire: string
    const choix = choice([true, false])
    do {
      if (choix) {
        a = randint(4, 8)
        b = this.sup2 ? randint(3, 7, [4, 6, 8]) / 2 : randint(2, 4, a)
      } else {
        a = this.sup2 ? (randint(2, 4) * 2 + 1) / 2 : randint(4, 8)
        b = randint(2, 4, Math.floor(a))
      }
    } while (a * b > 20 || a * b < 5)

    switch (this.sup) {
      case 1:
        b = a
        objet = this.questionCarre(a)
        value =
          coeff === 1
            ? [
                `${texNombre(a, 1)}\\times${texNombre(a, 1)}`,
                `${texNombre(a, 1)}^2`,
              ]
            : [
                `${texNombre(a, 1)}\\times${texNombre(a, 1)}\\times${coeff}`,
                `${texNombre(a, 1)}^2\\times${coeff}`,
              ]
        aire = texNombre(a * a * coeff, 2)
        break
      case 2:
        objet = this.questionRectangle(a, b)
        value =
          coeff === 1
            ? [
                `${texNombre(a, 1)}\\times${texNombre(b, 1)}`,
                `${texNombre(b, 1)}\\times${texNombre(a, 1)}`,
              ]
            : [
                `${texNombre(a, 1)}\\times${texNombre(b, 1)}\\times${coeff}`,
                `${texNombre(b, 1)}\\times${texNombre(a, 1)}\\times${coeff}`,
              ]
        aire = texNombre(a * b * coeff, 2)
        break
      case 3:
      default:
        objet = this.questionTriangle(a, b)
        value =
          coeff === 1
            ? [
                `${texNombre(a, 1)}\\times${texNombre(b, 1)}\\div2`,
                `${texNombre(b, 1)}\\times${texNombre(a, 1)}\\div2`,
              ]
            : [
                `${texNombre(a, 1)}\\times${texNombre(b, 1)}\\div2\\times${coeff}`,
                `${texNombre(b, 1)}\\times${texNombre(a, 1)}\\div2\\times${coeff}`,
              ]
        aire = texNombre(((a * b) / 2) * coeff, 2)
        break
    }
    const xmin = 0
    const ymin = 0
    const xmax = Math.ceil(a + 4)
    const ymax = Math.ceil(b + 1)
    const uniteAire =
      this.sup3 === 1
        ? carre(point(xmax - 2, ymax - 2), point(xmax - 1, ymax - 2))
        : this.sup3 === 2
          ? polygone(
              point(xmax - 2, ymax - 2),
              point(xmax - 1, ymax - 2),
              point(xmax - 1, ymax - 1.5),
              point(xmax - 2, ymax - 1.5),
            )
          : this.sup3 === 3
            ? polygone(
                point(xmax - 2, ymax - 2),
                point(xmax - 1, ymax - 2),
                point(xmax - 2, ymax - 1),
              )
            : polygone(
                point(xmax - 2, ymax - 2),
                point(xmax - 1.5, ymax - 2),
                point(xmax - 1.5, ymax - 1.5),
                point(xmax - 2, ymax - 1.5),
              )
    uniteAire.couleurDeRemplissage = colorToLatexOrHTML('gray')
    const texteUniteAire = texteParPosition(
      '1 ' + unite,
      xmax - 1.5,
      ymax - 2.5,
    )
    objets.push(uniteAire, texteUniteAire, objet)
    if (this.sup2) {
      objets.push(grille(xmin, ymin, xmax, ymax, 'gray', 0.3, 0.5))
    }
    const figure = mathalea2d(
      Object.assign(
        { pixelsParCm: 20, scale: 0.5, style: 'display: block' },
        fixeBordures(objets, {
          rxmin: -0.1,
          rxmax: 0.1,
          rymin: -0.1,
          rymax: 0.1,
        }),
      ),
      [grille(xmin, ymin, xmax, ymax, 'gray', 0.6, 1), ...objets],
    )
    this.question = `<br>${figure}<br>Quelle est l'aire de la figure ci-dessus ?`
    this.optionsChampTexte = { texteApres: unite }
    this.reponse = value
    this.correction = `L'aire de cette figure est : $${miseEnEvidence(value[0])}\\text{ soit }${miseEnEvidence(String(aire))}$ ${unite}.`
  }

  questionCarre(a: number): Polygone {
    const A = point(0, 0)
    const B = point(a, 0)
    const quad = carre(A, B)
    quad.couleurDeRemplissage = colorToLatexOrHTML('orange')
    return quad
  }

  questionRectangle(a: number, b: number): Polygone {
    const A = point(0, 0)
    const B = point(a, 0)
    const C = point(a, b)
    const D = point(0, b)
    const rect = polygone(A, B, C, D)
    rect.couleurDeRemplissage = colorToLatexOrHTML('orange')
    return rect
  }

  questionTriangle(a: number, b: number): Polygone {
    const A = point(0, 0)
    const B = point(a, 0)
    const C = point(0, b)
    const tri = polygone(A, B, C)
    tri.couleurDeRemplissage = colorToLatexOrHTML('orange')
    return tri
  }
}
