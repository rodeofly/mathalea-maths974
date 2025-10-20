import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import FractionEtendue from '../../../modules/FractionEtendue'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Rendre une fraction irréductible'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '2c801'
/**
 * @author Gilles Mora
 */
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()

    this.canOfficielle = false
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
  }

  nouvelleVersion() {
    if (this.canOfficielle) {
      this.question = 'Rendre irréductible la fraction $\\dfrac{15}{20}$.<br>'
      this.reponse = new FractionEtendue(3, 4).texFraction
      this.correction = `$\\begin{aligned}
      \\dfrac{15}{20}&=\\dfrac{5\\times 3}{5\\times 4}\\\\
      &=${miseEnEvidence('\\dfrac{3}{4}')}
      \\end{aligned}$`
    } else {
      const listeFractions24 = [
        [5, 3],
        [7, 9],
        [3, 7],
        [5, 7],
        [9, 7],
        [2, 9],
        [4, 7],
        [11, 5],
        [11, 3],
      ]
      const a = choice(listeFractions24)
      const b = new FractionEtendue(a[0], a[1])
      const k1 = choice([3, 5, 7, 9])
      this.question = `Rendre irréductible la fraction $\\dfrac{${b.n * k1}}{${b.d * k1}}$.`
      this.correction = `$\\begin{aligned}
      \\dfrac{${b.n * k1}}{${b.d * k1}}&=\\dfrac{${b.n}\\times ${k1}}{${b.d}\\times ${k1}}\\\\
      &=${miseEnEvidence(b.texFraction)}
      \\end{aligned}$`
      this.reponse = {
        reponse: {
          value: b.simplifie().texFraction,
          options: { fractionIrreductible: true },
        },
      }
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
