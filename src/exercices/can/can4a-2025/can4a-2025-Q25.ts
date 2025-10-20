import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'

export const titre = 'Somme astucieuse'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '3422j'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N4Q25 extends ExerciceCan {
  enonce(a?: number, b?: number) {
    if (a == null || b == null) {
      const aa = randint(1, 3) * 100 + randint(2, 5) * 10 + randint(3, 7)
      const bb = 99
      ;[a, b] = choice([true, false]) ? [aa, bb] : [bb, aa]
    }
    this.question = `$${a} + ${b}$`
    this.correction = `$${a} + ${b}=${Math.max(a, b)}+100-1=${miseEnEvidence(a + b)}$`
    this.canEnonce = this.question
    this.reponse = a + b
    this.question += this.interactif ? ' $=$' : ''
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(123, 99) : this.enonce()
  }
}
