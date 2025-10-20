import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'

export const titre = 'Numération'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'a343z'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N5Q19 extends ExerciceCan {
  enonce(a?: number, b?: string) {
    if (a == null || b == null) {
      a =
        randint(1, 9) * 100 +
        randint(1, 9) * 10 +
        randint(1, 9) +
        randint(1, 9) / 10 +
        randint(1, 9) / 100 +
        randint(1, 9) / 1000
      b = choice(['centièmes', 'dixièmes', 'centaines', 'dizaines'])
    }
    const nbStr = Array.from(a.toFixed(3))
    const index =
      b === 'centièmes' ? 5 : b === 'dixièmes' ? 4 : b === 'centaines' ? 0 : 1
    this.reponse = nbStr[index]
    this.question = `Le chiffre des ${b} dans le nombre $${texNombre(a, 3)}$ est `
    this.correction = `Le chiffre des ${b} dans le nombre $${texNombre(a, 3)}$ est $${miseEnEvidence(`${nbStr[index]}`)}$.`
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\ldots$'
    if (!this.interactif) {
      this.question += '$\\ldots$'
    }
    this.optionsChampTexte = { texteApres: '.' }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(379.628, 'centièmes') : this.enonce()
  }
}
