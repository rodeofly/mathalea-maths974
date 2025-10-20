import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'
import { texNombre } from '../../../lib/outils/texNombre'

export const titre = 'Produit de 3 facteurs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'a343s'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N5Q13 extends ExerciceCan {
  enonce(a?: number, b?: number, c?: number) {
    if (a == null || b == null || c == null) {
      ;[a, c] = choice([
        [2, 5],
        [2, 50],
        [4, 25],
        [5, 20],
        [4, 250],
        [5, 200],
        [8, 125],
        [2, 500],
      ])
      b = randint(2, 9) * 10 + randint(1, 9)
    }
    this.reponse = a * b * c
    this.question = `$${a}\\times ${b}\\times ${c}$`
    this.correction = `$\\begin{aligned}${a}\\times ${b}\\times ${c} &= (${a}\\times ${c})\\times ${b}\\\\
    &= ${texNombre(a * c, 0)}\\times ${b}\\\\
    &= ${miseEnEvidence(texNombre(a * b * c, 0))}
    \\end{aligned}$`
    this.canEnonce = this.question
    if (this.interactif) {
      this.question += ' $=$'
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(2, 97, 5) : this.enonce()
  }
}
