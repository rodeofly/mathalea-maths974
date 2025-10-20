import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'

export const titre = 'Complément à 100'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'a343j'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N5Q4 extends ExerciceCan {
  enonce(a?: number) {
    if (a == null) {
      a = randint(2, 8) * 10 + randint(1, 9)
    }
    this.reponse = 100 - a
    this.question = `$${a} + \\text{?} = 100$`
    this.correction = `Pour trouver le nombre manquant, on peut calculer $100-${a}=${miseEnEvidence(texNombre(100 - a, 0))}$.`
    this.canEnonce = 'Compléter.'
    this.canReponseACompleter = `$${a} + \\ldots\\ldots = 100$`
    if (this.interactif) {
      this.question += '<br> ? $=$'
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(67) : this.enonce()
  }
}
