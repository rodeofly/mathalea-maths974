import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { premierMultipleSuperieur } from '../../../lib/outils/primalite'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { choice } from '../../../lib/outils/arrayOutils'

export const titre = 'Numeration et intervalle'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '88a60'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025CE2Q14 extends ExerciceCan {
  enonce(a?: number, b?: number) {
    if (a == null || b == null) {
      a =
        choice([
          randint(11, 17),
          randint(21, 27),
          randint(31, 37),
          randint(41, 47),
          randint(51, 57),
        ]) *
          10 +
        8
      b = premierMultipleSuperieur(100, a)
    }
    const c = Math.floor((a % 100) / 10)
    this.question = `Quel nombre suis-je ?<br>
    Je suis un nombre compris entre ${a} et ${b} et mon chiffre des dizaines est ${c}.`
    this.reponse = a + 1
    this.canEnonce = this.question
    this.correction = `Le nombre compris entre $${a}$ et $${b}$ dont le chiffre des dizaines est $${c}$ est $${miseEnEvidence(a + 1)}$.`
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(158, 200) : this.enonce()
  }
}
