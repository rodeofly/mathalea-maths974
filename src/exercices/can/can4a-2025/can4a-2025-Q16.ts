import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { choice } from '../../../lib/outils/arrayOutils'
import FractionEtendue from '../../../modules/FractionEtendue'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Différence de fracion'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '97290'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N4Q16 extends ExerciceCan {
  enonce(a?: number, b?: number, c?: number, d?: number) {
    if (a == null || b == null || c == null || d == null) {
      b = choice([2, 3, 4, 5])
      d = 2 * b
      c = 1
      a = 2 * b + 1
    }
    const f1 = new FractionEtendue(a, b)
    const f2 = new FractionEtendue(c, d)
    const reponse = f1.differenceFraction(f2)
    this.question = `$${f1.texFraction}-${f2.texFraction}$`
    this.correction = `$\\begin{aligned}${f1.texFraction}-${f2.texFraction}&=${f1.reduire(2).texFraction}-${f2.texFraction}\\\\
    &=\\dfrac{${2 * a}-${c}}{${d}}\\\\
    &=${miseEnEvidence(`\\dfrac{${2 * a - c}}{${d}}`)}${!reponse.estIrreductible ? `\\\\&=${miseEnEvidence(reponse.texFractionSimplifiee)}` : ''}\\end{aligned}$`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
    this.reponse = reponse.texFraction
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    if (this.interactif) {
      this.question += '$=$'
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(7, 3, 1, 6) : this.enonce()
  }
}
