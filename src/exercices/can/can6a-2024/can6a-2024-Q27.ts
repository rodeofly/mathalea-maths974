import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
import {
  colorToLatexOrHTML,
  fixeBordures,
  mathalea2d,
} from '../../../modules/2dGeneralites'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { point } from '../../../lib/2d/points'
import { polygone, Polygone } from '../../../lib/2d/polygones'
import { segment, Segment } from '../../../lib/2d/segmentsVecteurs'
import { rotation, similitude } from '../../../lib/2d/transformations'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = "Déterminer une fraction d'aire"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '32d25'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Jean-Claude Lhote

*/

export default class FractionDeRectangle extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1

    this.canOfficielle = false
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
  }

  nouvelleVersion() {
    const hauteur = 3
    let cas: number
    let factor: number
    let nbCase: number
    if (this.canOfficielle) {
      nbCase = 3
      cas = 1
      factor = 2
    } else {
      nbCase = randint(2, 5)
      cas = randint(1, 8)
      factor = cas > 4 ? 4 : 2
    }

    const A = point(0, 0)
    const B = point(nbCase * hauteur, 0)
    const C = point(nbCase * hauteur, hauteur)
    const D = point(0, hauteur)
    const O = point(hauteur / 2, hauteur / 2)
    let triangle: Polygone
    const diag1 = segment(point(0, 0), point(hauteur, hauteur))
    const diag2 = segment(point(hauteur, 0), point(0, hauteur))
    const rectangle = polygone([A, B, C, D], 'black')
    rectangle.epaisseur = 2
    const segments: Segment[] = []
    for (let i = 0; i < nbCase; i++) {
      const s = segment(
        point((i + 1) * hauteur, 0),
        point((i + 1) * hauteur, hauteur),
      )
      s.pointilles = 2
      segments.push(s)
    }
    const triangle0 = polygone([point(0, 0), O, point(hauteur, 0)])
    switch (cas) {
      case 1:
        triangle = similitude(triangle0, A, 45, Math.sqrt(2))
        break
      case 2:
        triangle = similitude(triangle0, point(hauteur, 0), -45, Math.sqrt(2))
        break
      case 3:
        triangle = rotation(similitude(triangle0, A, 45, Math.sqrt(2)), O, -90)
        break
      case 4:
        triangle = rotation(similitude(triangle0, A, 45, Math.sqrt(2)), O, 90)
        break
      case 5:
        triangle = triangle0
        break
      case 6:
        triangle = rotation(triangle0, O, 90)
        break
      case 7:
        triangle = rotation(triangle0, O, -90)
        break
      default:
        triangle = rotation(triangle0, O, 180)
        break
    }
    triangle.couleurDeRemplissage = colorToLatexOrHTML('gray')
    const objets = this.canOfficielle
      ? [rectangle, ...segments, triangle, diag1]
      : [rectangle, ...segments, triangle, diag1, diag2]
    this.question = "Quelle fraction de l'aire du rectangle est grisée ?<br>"
    this.question += mathalea2d(
      Object.assign({ scale: 0.5 }, fixeBordures(objets)),
      objets,
    )
    this.canEnonce = this.question
    this.canReponseACompleter = ''
    this.reponse = `\\dfrac{1}{${nbCase * factor}}`
    this.correction = `La fraction de l'aire du rectangle qui est grisée est $${miseEnEvidence(`\\dfrac{1}{${nbCase * factor}}`)}$.<br>`
    this.correction += `En effet, il y a ${nbCase} carrés dans le rectangle et la zone grisée couvre ${factor === 2 ? "la moitié d'un carré" : "le quart d'un carré"}.<br>Il y a donc  $${nbCase}\\times ${factor === 2 ? 2 : 4} = ${nbCase * factor}$ fois l'aire grisée dans le rectangle.<br> On en déduit que l'aire grisée est égale à $\\dfrac{1}{${nbCase * factor}}$ de l'aire du rectangle.`
  }
}
