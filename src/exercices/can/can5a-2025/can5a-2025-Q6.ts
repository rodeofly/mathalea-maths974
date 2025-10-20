import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'

export const titre = 'Priorité des opérations'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'a343l'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N5Q6 extends ExerciceCan {
  enonce(a?: number, b?: number, c?: number) {
    if (a == null || b == null || c == null) {
      a = randint(2, 4)
      b = randint(2, 9 - a)
      c = randint(2, 5)
    }
    this.reponse = a + b * c
    this.question = `$${a} + ${b}\\times ${c}$`
    this.correction = `La multiplication est prioritaire sur l'addition, donc :<br> $${a} + ${b}\\times ${c}=${a} + ${b * c} = ${miseEnEvidence(texNombre(a + b * c, 0))}$.`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
    if (this.interactif) {
      this.question += ' $=$'
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(2, 7, 3) : this.enonce()
  }
}
