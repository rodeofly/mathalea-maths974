import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'

export const titre = 'Multiples simples'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '90ba8'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025CE2Q16 extends ExerciceCan {
  enonce(a?: number, b?: number) {
    if (a == null || b == null) {
      a = choice([2, 3])
      b = randint(1, 3) * 10 + 5
    }
    this.reponse = a * b
    this.question = `Le ${a === 2 ? 'double' : 'triple'} de $${b}$ est : `
    this.correction = `$${a}\\times ${b}=(${a}\\times ${b - 5}) + (${a}\\times ${5}) = ${a * (b - 5)} + ${a * 5}=${miseEnEvidence(texNombre(a * b, 0))}$`
    this.canReponseACompleter = '$\\ldots$'
    this.optionsChampTexte = { texteApres: '.' }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(2, 15) : this.enonce()
  }
}
