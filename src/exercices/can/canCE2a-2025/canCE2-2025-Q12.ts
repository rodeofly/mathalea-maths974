import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'
import { sp } from '../../../lib/outils/outilString'

export const titre = 'Mulitiplier des mutiples de dix'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'ccf1d'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025CE2Q12 extends ExerciceCan {
  enonce(a?: number, b?: number) {
    let puissance = 10
    if (a == null || b == null) {
      puissance = choice([10, 100])
      a = randint(2, 9) * puissance
      b = randint(3, 9)
    }
    this.reponse = a * b
    this.question = 'Calcule : '
    this.correction = `$${a}\\times ${b}=${Math.round(a / puissance)}\\times ${b}\\times${puissance}=${Math.round((a * b) / puissance)}\\times ${puissance}=${miseEnEvidence(texNombre(a * b, 0))}$.`
    this.canEnonce = this.question
    this.question += `$${a}\\times ${b}$`
    if (this.interactif) {
      this.question += `$${sp()} = $`
    }
    this.canReponseACompleter = `$${a}\\times ${b}=\\ldots$`
    this.canEnonce = 'Calcule.'
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(40, 4) : this.enonce()
  }
}
