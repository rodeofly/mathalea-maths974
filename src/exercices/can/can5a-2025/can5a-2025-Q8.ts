import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'

export const titre = 'Multiplication par 100 de nombres décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'a343n'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N5Q8 extends ExerciceCan {
  enonce(a?: number, b?: number) {
    if (a == null || b == null) {
      a =
        randint(2, 9) +
        randint(1, 9) / 10 +
        choice([0, 0, randint(1, 9)]) / 1000
      b = choice([100, 1000])
    }
    this.reponse = (a * b).toFixed(1)
    this.question = `$${texNombre(a, 3)}\\times ${texNombre(b, 0)}$`
    this.correction = `Le nombre d'unités est rendu ${b === 100 ? 'cent fois' : 'mille fois'} plus grand, donc :<br>
    $${texNombre(a, 4)}\\times ${texNombre(b, 0)} = ${miseEnEvidence(texNombre(a * b, 2))}$`
    this.canEnonce = this.question
    if (this.interactif) {
      this.question += ' $=$'
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(3.4, 100) : this.enonce()
  }
}
