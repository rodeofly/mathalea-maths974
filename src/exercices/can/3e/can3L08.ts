import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { choice } from '../../../lib/outils/arrayOutils'
import { milieu, point } from '../../../lib/2d/points'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { labelPoint, texteParPosition } from '../../../lib/2d/textes'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { functionCompare } from '../../../lib/interactif/comparisonFunctions'
import { texNombre } from '../../../lib/outils/texNombre'
import { polygone } from '../../../lib/2d/polygones'
import { randint } from '../../../modules/outils'
import { reduireAxPlusB, rienSi1 } from '../../../lib/outils/ecritures'
export const titre = 'Exprimer une aire en fonction de $x$'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '18/04/2024'
export const uuid = 'd544a'
export const refs = {
  'fr-fr': ['can3L08'],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class EnFonctionDeAire extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecVariable

    this.compare = functionCompare
  }

  nouvelleVersion() {
    switch (choice([1, 2])) {
      case 1: //
        {
          const a = randint(1, 3)
          const b1 = randint(1, 5)
          const b = 2 * b1
          const c = a + b
          const A = point(0, 0, 'A', 'below')
          const B = point(5, 0, 'B', 'below')
          const C = point(5, 3, 'C', 'above')
          const D = point(0, 3, 'D', 'above')
          const M = point(2, 3, 'M', 'above')
          const poly = polygone([A, B, C, M], 'black')
          const segmentMD = segment(M, D)
          const segmentDA = segment(D, A)
          poly.hachures = true
          // poly.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
          const d = texteParPosition(
            `${c} cm`,
            milieu(A, B).x,
            milieu(A, B).y - 0.5,
            0,
            'black',
            1,
            'milieu',
            false,
          )
          const e = texteParPosition(
            `${texNombre(b, 0)} cm`,
            milieu(B, C).x + 1,
            milieu(B, C).y,
            0,
            'black',
            1,
            'milieu',
            false,
          )
          const t = texteParPosition(
            '$x$',
            milieu(D, M).x,
            milieu(D, M).y + 0.5,
            0,
            'black',
            1,
            'milieu',
            false,
          )
          this.question = '$ABCD$ est un rectangle et $DM=x$.<br>'
          this.question += mathalea2d(
            {
              xmin: -1.5,
              ymin: -1,
              xmax: 7.1,
              ymax: 4,
              pixelsParCm: 30,
              scale: 0.7,
            },
            poly,
            labelPoint(A, B, C, D, M),
            d,
            e,
            t,
            segmentMD,
            segmentDA,
          )
          if (choice([true, false])) {
            this.reponse = {
              reponse: {
                value: reduireAxPlusB(b1, 0),
                options: { variable: 'x' },
                compare: functionCompare,
              },
            }
            this.question +=
              "L'aire de la partie non hachurée en fonction de $x$ est : "
            this.correction = `L'aire du triangle $ADM$ est $\\dfrac{DM\\times AD}{2}=\\dfrac{x\\times ${b}}{2}=${miseEnEvidence(reduireAxPlusB(b1, 0))}$ cm$^2$.`
          } else {
            this.reponse = {
              reponse: {
                value: reduireAxPlusB(-b1, c * b),
                options: { variable: 'x' },
                compare: functionCompare,
              },
            }
            this.question +=
              "L'aire de la partie  hachurée en fonction de $x$ est : "
            this.correction = `$\\bullet$ L'aire du triangle $ADM$ est $\\dfrac{DM\\times AD}{2}=\\dfrac{x\\times ${b}}{2}=${reduireAxPlusB(b1, 0)}$ cm$^2$.<br>
          $\\bullet$ L'aire du rectangle $ABCD$ est $AB\\times BC=${c}\\times ${b} =${c * b}$ cm$^2$.<br>
          $\\bullet$ L'aire de la partie hachurée est donc la différence entre ces deux aires, soit  $${miseEnEvidence(`${c * b}-${rienSi1(b1)}x`)}$ cm$^2$.`
          }

          this.canEnonce = this.question
          this.canReponseACompleter = '$\\ldots$ cm$^2$'
          if (this.interactif) {
            this.optionsChampTexte = { texteApres: 'cm$^2$.' }
          } else {
            this.question += ' $\\ldots $ cm$^2$.'
          }
        }
        break

      case 2:
        {
          const a = randint(2, 3)
          const b1 = randint(3, 5)
          const b = 2 * b1
          const A = point(-1, 0, 'A', 'below')
          const B = point(5.5, 0, 'B', 'below')
          const C = point(5.5, 5, 'C', 'above')
          const D = point(0.5, 5, 'D', 'above')
          const E = point(0.5, 0, 'E', 'below')
          const F = point(0.5, 1.5, 'F', 'above left')
          const G = point(-1, 1.5, 'G', 'above')
          const M = point(2, 0, 'M', 'below')
          const N = point(2, 5, 'N', 'above')
          const poly = polygone([E, M, N, D], 'black')
          const poly1 = polygone([A, E, F, G], 'black')
          const poly2 = polygone([E, B, C, D], 'black')
          poly.hachures = true
          poly1.hachures = true
          const f = texteParPosition(
            `${texNombre(a, 0)} cm`,
            -1.8,
            milieu(A, G).y,
            0,
            'black',
            1,
            'milieu',
            false,
          )
          const e = texteParPosition(
            `${texNombre(b, 0)} cm`,
            milieu(B, C).x + 1,
            milieu(B, C).y,
            0,
            'black',
            1,
            'milieu',
            false,
          )
          const t = texteParPosition(
            '$x$',
            milieu(E, M).x,
            milieu(E, M).y - 0.6,
            0,
            'black',
            1,
            'milieu',
            false,
          )
          this.question = '$AEFG$ et $EBCD$ sont des carrés et $EM=x$.<br>'
          this.question += mathalea2d(
            {
              xmin: -2.5,
              ymin: -1,
              xmax: 7.1,
              ymax: 6,
              pixelsParCm: 30,
              scale: 0.7,
            },
            poly,
            poly1,
            poly2,
            labelPoint(A, B, C, D, M, N, E, F, G),
            e,
            t,
            f,
          )
          if (choice([true, false])) {
            this.reponse = {
              reponse: {
                value: reduireAxPlusB(-b, b ** 2),
                options: { variable: 'x' },
                compare: functionCompare,
              },
            }
            this.question +=
              "L'aire de la partie non hachurée en fonction de $x$ est : "
            this.correction = `$\\bullet$ L'aire du rectangle $EMND$ est $EM\\times MN=x \\times ${b} =${b}x$ cm$^2$.<br>
            $\\bullet$ L'aire du carré $EBCD$ est $${b}^2 =${b ** 2}$ cm$^2$.<br>
            $\\bullet$ L'aire de la partie non hachurée est donc la différence entre ces deux aires, soit  $${miseEnEvidence(`${b ** 2}-${rienSi1(b)}x`)}$ cm$^2$.`
          } else {
            this.reponse = {
              reponse: {
                value: reduireAxPlusB(b, a ** 2),
                options: { variable: 'x' },
                compare: functionCompare,
              },
            }
            this.question +=
              "L'aire de la partie  hachurée en fonction de $x$ est : "
            this.correction = `$\\bullet$ L'aire du carré $AEFG$ est $${a}^2=${a ** 2}$ cm$^2$.<br>
          $\\bullet$ L'aire du rectangle $EMND$ est $EM\\times MN=x \\times ${b} =${b}x$ cm$^2$.<br>
          $\\bullet$ L'aire de la partie hachurée est donc la somme de ces deux aires, soit $${miseEnEvidence(reduireAxPlusB(b, a ** 2))}$ cm$^2$.`
          }
          this.canEnonce = this.question
          this.canReponseACompleter = '$\\ldots$ cm$^2$'
          if (this.interactif) {
            this.optionsChampTexte = { texteApres: 'cm$^2$.' }
          } else {
            this.question += ' $\\ldots $ cm$^2$.'
          }
        }
        break
    }
  }
}
