import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { choice } from '../../../lib/outils/arrayOutils'
import FractionEtendue from '../../../modules/FractionEtendue'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Calculer la probabilité d’un évènement contraire'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 * Date de publication
*/
export const uuid = 'b2a59'

export const refs = {
  'fr-fr': ['can3S02', 'BP2FLUC16'],
  'fr-ch': [],
}
export default class ProbaEvenementContraire extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.versionQcmDisponible = true
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
  }

  nouvelleVersion() {
    const listeFractions = [
      [1, 3],
      [2, 3],
      [1, 4],
      [3, 4],
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
      [1, 6],
      [5, 6],
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7],
      [1, 8],
      [3, 8],
      [5, 8],
      [7, 8],
      [1, 9],
      [2, 9],
      [4, 9],
      [5, 9],
      [7, 9],
      [8, 9],
      [1, 10],
      [3, 10],
      [7, 10],
      [9, 10],
    ] // Couples de nombres premiers entre eux
    const fraction = choice(listeFractions)
    const n = fraction[0]
    const d = fraction[1]
    const nSurD = new FractionEtendue(n, d)
    const dMoinsNSurD = new FractionEtendue(d - n, d)
    this.question = `La probabilité d'un événement $A$ est $${nSurD.texFraction}$. <br>

Quelle est la probabilité de son événement contraire ?
`
    this.correction = `La relation entre la probabilité d'un événement $A$ et celle de son contraire $\\overline{A}$ est :  $P(\\overline{A})=1-P(A)$.<br>
        Ainsi : $P(\\overline{A})=1-\\dfrac{${n}}{${d}}=${dMoinsNSurD.texFraction}$.`
    this.reponse = new FractionEtendue(d - n, d)
    this.distracteurs = [
      `$${new FractionEtendue(d, n).texFraction}$`,
      `$-${new FractionEtendue(n, d).texFraction}$`,
      `$${new FractionEtendue(n, d).texFraction}$`,
    ]
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
