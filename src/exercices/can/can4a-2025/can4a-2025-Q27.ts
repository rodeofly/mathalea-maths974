import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { texNombre } from '../../../lib/outils/texNombre'

export const titre = "Moitié d'un nombre décimal"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '3422l'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N4Q27 extends ExerciceCan {
  enonce(a?: number) {
    if (a == null) {
      a = (randint(1, 4) * 2 + 1 + randint(1, 4) / 5) / 10
    }
    this.question = `$${texNombre(0.5, 1)}\\times${texNombre(a, 3)}$`
    this.correction = `Multiplier par $0,5$ revient à diviser par 2.<br>
    Ainsi, $${texNombre(0.5, 1)}\\times${texNombre(a, 3)}=\\dfrac{${texNombre(a, 3)}}{2}=${miseEnEvidence(texNombre(a / 2, 4))}$.`
    this.canEnonce = this.question
    this.reponse = (a / 2).toFixed(3)
    this.question += this.interactif ? ' $=$' : ''
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(0.34) : this.enonce()
  }
}
