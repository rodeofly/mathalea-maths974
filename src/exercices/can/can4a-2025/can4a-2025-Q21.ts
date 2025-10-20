import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'

export const titre = 'Somme de nombre relatifs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'f0cad'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N4Q21 extends ExerciceCan {
  enonce(a?: number, b?: number) {
    if (a == null || b == null) {
      a = -randint(11, 25)
      b = randint(3, -a - 3)
    }
    this.question = `$${a} + ${b}$`
    this.correction = `$${a} + ${b}=${miseEnEvidence(a + b)}$`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
    this.reponse = String(a + b)
    this.question += this.interactif ? ' $=$' : ''
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(-17, 3) : this.enonce()
  }
}
