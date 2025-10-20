import { droite } from '../../../lib/2d/droites'
import { milieu, point, tracePoint } from '../../../lib/2d/points'
import { repere } from '../../../lib/2d/reperes'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { latex2d } from '../../../lib/2d/textes'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { ecritureParentheseSiNegatif } from '../../../lib/outils/ecritures'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { mathalea2d } from '../../../modules/2dGeneralites'
import FractionEtendue from '../../../modules/FractionEtendue'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'

export const titre = "Déterminer le coefficient directeur d'une droite"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'b18a9'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class CoeffDirecteurGraphique extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    this.canOfficielle = true
  }

  nouvelleVersion() {
    let lABx
    const xA = this.canOfficielle ? 0 : randint(-4, 0)
    const yA = this.canOfficielle ? -1 : randint(-4, 4)
    const xB = this.canOfficielle ? 3 : xA + randint(3, 4)
    const yB = this.canOfficielle ? 1 : randint(-4, 4, [0, yA])
    const o = latex2d('\\text{O}', -0.2, -0.3, {
      color: 'black',
      letterSize: 'scriptsize',
      backgroundColor: '',
    })
    const A = point(xA, yA)
    const B = point(xB, yB)
    const Bx = point(B.x, A.y)
    const sABx = segment(A, Bx)
    const sBBx = segment(B, Bx)
    const m = new FractionEtendue(yB - yA, xB - xA)
    sBBx.epaisseur = 2
    sBBx.pointilles = 5
    sABx.epaisseur = 2
    sABx.pointilles = 5
    const lA = latex2d('A', xA + 0.1, yA - 0.2, {
      color: 'black',
      backgroundColor: '',
    })
    const traceA = tracePoint(A, 'black') // Variable qui trace les points avec une croix
    const lB = latex2d('B', xB, yB + 0.5, {
      color: 'black',
      backgroundColor: '',
    })
    if (yA > yB) {
      lABx = latex2d(`${xB - xA}`, milieu(A, Bx).x, A.y + 0.3, {
        color: 'red',
        backgroundColor: '',
      })
    } else {
      lABx = latex2d(`${xB - xA}`, milieu(A, Bx).x, A.y - 0.3, {
        color: 'red',
        backgroundColor: '',
      })
    }
    const lBBx = latex2d(`${yB - yA}`, B.x + 0.5, milieu(B, Bx).y, {
      color: 'blue',
      backgroundColor: '',
    })
    const traceB = tracePoint(B, 'black') // Variable qui trace les points avec une croix
    const d = droite(A, B, '', 'blue')
    d.epaisseur = 2
    traceA.taille = 2
    traceA.epaisseur = 2
    traceB.taille = 2
    traceB.epaisseur = 2
    const xmin = -5
    const ymin = -5
    const xmax = 5
    const ymax = 5
    const r1 = repere({
      xMin: xmin,
      xMax: xmax,
      xUnite: 1,
      yMin: ymin,
      yMax: ymax,
      yUnite: 1,
      thickHauteur: 0.1,
      xLabelMin: xmin + 1,
      xLabelMax: xmax - 1,
      yLabelMax: ymax - 1,
      yLabelMin: ymin + 1,
      axeXStyle: '->',
      axeYStyle: '->',
      yLabelDistance: 1,
      yLabelEcart: 0.6,
      grilleXDistance: 1,
      grilleYDistance: 1,
    })
    const objet = mathalea2d(
      {
        xmin,
        xmax,
        ymin: ymin - 0.25,
        ymax: ymax + 0.25,
        pixelsParCm: 25,
        scale: 0.6,
        style: 'margin: auto',
      },
      d,
      r1,
      traceA,
      lA,
      lB,
      traceB,
      o,
    )
    const objetC = mathalea2d(
      {
        xmin,
        xmax,
        ymin: ymin - 0.25,
        ymax: ymax + 0.25,
        pixelsParCm: 25,
        scale: 0.6,
        style: 'margin: auto',
      },
      d,
      r1,
      traceA,
      lA,
      lB,
      traceB,
      o,
      sABx,
      sBBx,
      lABx,
      lBBx,
    )

    this.question = 'Coefficient directeur de la droite $(AB)$.<br>'
    this.question += `${objet}`
    this.optionsChampTexte = { texteAvant: '$m =$' }
    if (yB === yA) {
      this.correction = `La droite est horizontale. <br>On en déduit que $m=${miseEnEvidence('0')}$.`
    } else {
      this.correction = `Le coefficient directeur $m$ de la droite $(AB)$ est donné par :<br><br>
            $m=\\dfrac{y_B-y_A}{x_B-x_A}=\\dfrac{${yB}-${ecritureParentheseSiNegatif(yA)}}{${xB}-${ecritureParentheseSiNegatif(xA)}}=\\dfrac{${miseEnEvidence(yB - yA, 'blue')}}{${miseEnEvidence(xB - xA, 'red')}}${miseEnEvidence(m.texSimplificationAvecEtapes())}$.<br><br>`
      this.correction += `${objetC}`
    }

    this.canEnonce = `${objet}`
    this.canReponseACompleter = `Coefficient directeur de la droite $(AB)$ : <br>
    $\\ldots$`
    this.reponse = m
  }
}
