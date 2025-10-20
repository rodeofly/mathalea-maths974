import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
export const titre = 'Calculer une différence'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '8ac2d'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Gilles Mora

*/
export default class Can2025N6Q5 extends ExerciceCan {
  enonce(a?: number, b?: number) {
    if (a == null || b == null) {
      a = randint(1, 9) * 100 + randint(3, 7) * 10 + randint(2, 6)
      b = randint(1, 3) * 10 + 1
    }
    this.reponse = a - b
    this.question = `$${a} -${b}$`
    this.correction = `$${a} -${b}=${miseEnEvidence(a - b)}$`
    this.canEnonce = this.question
    if (this.interactif) {
      this.question = `$${a} -${b} =$`
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(542, 11) : this.enonce()
  }
}
