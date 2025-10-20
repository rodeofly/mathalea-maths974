import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { point, tracePoint } from '../../../lib/2d/points'
import { labelPoint } from '../../../lib/2d/textes'
import { grille } from '../../../lib/2d/reperes'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { sp } from '../../../lib/outils/outilString'

export const titre = 'Déterminer un coefficient de colinéarité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '02332'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['3mAlgLin-1'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class CoefficientDeColinearite extends ExerciceSimple {
  constructor() {
    super()

    this.canOfficielle = true
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    this.formatInteractif = 'fillInTheBlank'
  }

  nouvelleVersion() {
    const a = grille(0, 0, 7, 5, 'gray', 1, 1)
    const A = point(1, 1, 'A', 'below')
    const B = point(3, 2, 'B', 'above')
    const C = point(3, 1, 'C', 'below')
    const D = point(6, 4, 'D', 'above')
    const E = point(2, 2, 'E', 'above')
    const F = point(5, 2, 'F', 'above')
    const G = point(5, 3, 'G', 'above') // unite
    const H = point(4, 3, 'H', 'above') // unite
    const PositionPt = tracePoint(A, B, C, D, E, F, G, H)
    const LabelsPt = labelPoint(A, B, C, D, E, F, G, H)
    const xmin = -1
    const ymin = 0
    const xmax = 7
    const ymax = 5.3
    const objets = []
    objets.push(a, PositionPt, LabelsPt)
    this.reponse = { champ1: { value: '-2' } }
    this.consigne =
      mathalea2d(
        {
          xmin,
          ymin,
          xmax,
          ymax,
          pixelsParCm: 20,
          mainlevee: false,
          amplitude: 0.5,
          scale: 0.5,
          style: 'margin: auto',
        },
        objets,
      ) + '<br>Compléter :'
    this.question = '\\overrightarrow{DE}={%{champ1}}\\overrightarrow{AB}'
    this.correction = `Les vecteurs $\\overrightarrow{DE}$ et $\\overrightarrow{AB}$ sont colinéaires de sens contraire.<br>
   La norme du vecteur  $\\overrightarrow{DE}$ est deux fois plus grande que celle du vecteur  $\\overrightarrow{AB}$. <br>
    Ainsi, $\\overrightarrow{DE}=${miseEnEvidence('-2')}\\overrightarrow{AB}$.`

    this.canEnonce = mathalea2d(
      {
        xmin,
        ymin,
        xmax,
        ymax,
        pixelsParCm: 20,
        mainlevee: false,
        amplitude: 0.5,
        scale: 0.5,
        style: 'margin: auto',
      },
      objets,
    )
    this.canReponseACompleter = `Compléter : <br>$\\overrightarrow{DE}=\\ldots${sp()}\\overrightarrow{AB}$`
    this.canNumeroLie = 24
    this.canLiee = [23]
  }
}
