import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'

export const titre = 'Calculer une différence'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '30c08'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}

/**
 * @author Gilles Mora

*/
export default class Can2025CE1Q3 extends ExerciceCan {
  enonce(a?: number, b?: number) {
    if (a == null || b == null) {
      a = choice([99, 199, 299, 399])
      b = randint(1, 6) * 10
    }
    this.reponse = a - b
    this.question = `$${a} -${b}$`
    this.correction = `$${a} -${b}=${miseEnEvidence(a - b)}$`
    if (this.interactif) {
      this.question = `$${a} -${b} =$`
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(199, 30) : this.enonce()
  }
}
