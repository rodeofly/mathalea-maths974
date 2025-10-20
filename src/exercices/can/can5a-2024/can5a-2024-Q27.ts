import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { milieu, point, tracePoint } from '../../../lib/2d/points'
import { mathalea2d } from '../../../modules/2dGeneralites'
import {
  segment,
  segmentAvecExtremites,
} from '../../../lib/2d/segmentsVecteurs'
import { labelPoint, texteParPosition } from '../../../lib/2d/textes'
import { afficheLongueurSegment } from '../../../lib/2d/codages'
import { texNombre } from '../../../lib/outils/texNombre'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = "Déterminer la longueur d'un segment"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '1020d'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase

    this.canOfficielle = false
  }

  nouvelleVersion() {
    let reponse: number
    const a = this.canOfficielle ? 8 : randint(7, 11) // longueur AC
    const b = this.canOfficielle ? 5.1 : randint(19, 31, [20, 30]) / 10 // longueur AB
    const A = point(0, 0, 'A', 'above')
    const B = point(2.5, 0, 'B', 'above')
    const C = point(a, 0, 'C', 'above')
    const D = point(0, -1, 'D', 'above')
    const E = point(a, -1, 'B', 'below')
    const segAC = segment(A, C, 'blue')
    const segDE = segmentAvecExtremites(D, E, 'black')
    segAC.epaisseur = 2
    segDE.epaisseur = 2
    segDE.styleExtremites = '<->'
    segDE.tailleExtremites = 4

    const xmin = -1
    const ymin = -2
    const xmax = a + 1
    const ymax = 1
    const objets = []

    objets.push(
      segAC,
      segDE,
      tracePoint(A, B, C),
      labelPoint(A, B, C),
      texteParPosition(
        `$${texNombre(b, 1)}$`,
        milieu(A, B).x,
        0.8,
        0,
        'black',
        1,
      ),
      afficheLongueurSegment(D, E, 'black', -0.5, ''),
    )
    if (this.canOfficielle) {
      reponse = 2.9
      this.question = mathalea2d(
        {
          xmin,
          ymin,
          xmax,
          ymax,
          pixelsParCm: 30,
          mainlevee: false,
          amplitude: 0.5,
          scale: 0.6,
          style: 'margin: auto',
        },
        objets,
      )
      this.correction = `$BC=8-5,1=${miseEnEvidence(texNombre(2.9))}$`
    } else {
      reponse = a - b
      this.question = mathalea2d(
        {
          xmin,
          ymin,
          xmax,
          ymax,
          pixelsParCm: 30,
          mainlevee: false,
          amplitude: 0.5,
          scale: 0.6,
          style: 'margin: auto',
        },
        objets,
      )
      this.correction = `$BC=${texNombre(a, 0)}-${texNombre(b, 1)}=${miseEnEvidence(texNombre(a - b, 1))}$`
    }
    this.canEnonce = this.question
    this.reponse = reponse.toFixed(1)
    this.canReponseACompleter = 'BC $=\\ldots$'
    if (!this.interactif) {
      this.question += '<br> $BC =\\ldots$'
    } else {
      this.optionsChampTexte = { texteAvant: '$BC=$' }
    }
  }
}
