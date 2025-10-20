import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { grille } from '../../../lib/2d/reperes'
import { point, tracePoint } from '../../../lib/2d/points'
import { labelPoint, latex2d } from '../../../lib/2d/textes'
import { mathalea2d } from '../../../modules/2dGeneralites'
import {
  segment,
  segmentAvecExtremites,
} from '../../../lib/2d/segmentsVecteurs'
import { randint } from '../../../modules/outils'
export const titre = 'Calculer une longueur sur une grille'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '9f2e3'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class CalculLongueurGrille extends ExerciceSimple {
  constructor() {
    super()

    this.canOfficielle = true
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierFullOperations
    this.optionsChampTexte = { texteApres: 'u.l.' }
  }

  nouvelleVersion() {
    const a = grille(0, 0, 8, 5, 'gray', 1, 1)
    const A = point(1, 4, 'A', 'above')
    const B = this.canOfficielle
      ? point(5, 1, 'B', 'below')
      : point(randint(2, 5), 1, 'B', 'below')
    const C = this.canOfficielle
      ? point(5, 4, 'C', 'above')
      : point(B.x, A.y, 'C', 'above')
    const s2 = segment(A, B, 'blue')
    s2.epaisseur = 3
    const s3 = segment(A, C, 'blue')
    s3.epaisseur = 2
    s3.pointilles = 5
    const s4 = segment(C, B, 'blue')
    s4.epaisseur = 2
    s4.pointilles = 5
    const PositionPt = tracePoint(A, B, C)
    const LabelsPt = labelPoint(A, B, C)
    const U = point(6, 4) // unite
    const V = point(7, 4) // unite
    const s1 = segmentAvecExtremites(U, V)
    s1.epaisseur = 2
    const Texte1 = latex2d('1 \\text{u.l.}', 6.5, 4.5, {
      letterSize: 'scriptsize',
    })

    const xmin = -1
    const ymin = 0
    const xmax = 8
    const ymax = 5.3
    const objets = []
    const objetsC = []
    objets.push(a, s2, s1, Texte1)
    objetsC.push(a, s2, s1, s3, s4, Texte1, PositionPt, LabelsPt)
    this.reponse = `\\sqrt{${(C.x - A.x) ** 2 + (A.y - B.y) ** 2}}`
    this.question =
      'Longueur du segment<br>' +
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
      )
    const hypo2 = (C.x - A.x) ** 2 + (A.y - B.y) ** 2
    const isCarre = Math.round(Math.sqrt(hypo2)) ** 2 === hypo2
    this.correction =
      `On utilise le triangle rectangle représenté ci-dessous et on applique le théorème de Pythagore : <br>
    $\\begin{aligned}
         AB^2&=AC^2+BC^2\\\\
         AB^2&= ${C.x - A.x}^2+${A.y - B.y}^2\\\\
         AB&=\\sqrt{${hypo2}}${isCarre ? `\\\\\nAB&=${Math.round(Math.sqrt(hypo2))}` : ''}\\\\
         \\end{aligned}$\n
             La valeur exacte de $AB$ est ${this.canOfficielle ? `$${miseEnEvidence('5')}$` : `$${miseEnEvidence(`\\sqrt{${(C.x - A.x) ** 2 + (A.y - B.y) ** 2}}`)}$`} u.l.` +
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
        objetsC,
      )

    this.canEnonce =
      'Longueur du segment<br>' +
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
      )
    this.canReponseACompleter = '$\\ldots$ u.l.'
  }
}
