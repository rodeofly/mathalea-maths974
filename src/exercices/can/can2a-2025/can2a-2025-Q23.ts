import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { point, tracePoint } from '../../../lib/2d/points'
import { labelPoint } from '../../../lib/2d/textes'
import { grille } from '../../../lib/2d/reperes'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Déterminer un vecteur égal sur une grille'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '57688'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class VecteurEgal extends ExerciceSimple {
  constructor() {
    super()

    this.canOfficielle = true
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.alphanumeric
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
    this.reponse = { champ1: { value: 'G' } }
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
    this.question = '\\overrightarrow{AB}=\\overrightarrow{B{%{champ1}}}'
    this.correction = `Le vecteur d'origine $B$ égal au  vecteur $\\overrightarrow{AB}$ est le vecteur $\\overrightarrow{BG}$. <br>
    Ainsi, $\\overrightarrow{AB}=\\overrightarrow{B${miseEnEvidence('G')}}$.`

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
    this.canReponseACompleter =
      'Compléter : <br>$\\overrightarrow{AB}=\\overrightarrow{B\\ldots}$'
    this.canNumeroLie = 23
    this.canLiee = [24]
  }
}
