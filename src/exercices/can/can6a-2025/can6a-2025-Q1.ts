import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { choice, shuffle } from '../../../lib/outils/arrayOutils'
import ExerciceCan from '../../ExerciceCan'

export const titre = 'Sommes de nombres entiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'f343g'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N6Q1 extends ExerciceCan {
  enonce(a?: number, b?: number) {
    if (a == null || b == null) {
      const paire = shuffle(
        choice([
          [6, 7],
          [8, 9],
          [6, 8],
          [7, 9],
          [6, 9],
          [7, 8],
        ]),
      )
      const dizaine = choice([1, 2, 3, 4, 5]) * 10
      a = dizaine + paire[0]
      b = paire[1]
    }
    this.reponse = String(a + b)
    this.question = `$${a}+${b}$ `
    this.correction = `$${a}+${b}=${miseEnEvidence(this.reponse)}$`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
    if (this.interactif) {
      this.question += '$=$'
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(17, 8) : this.enonce()
  }
}
