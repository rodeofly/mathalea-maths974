import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'

export const titre = 'Suite de nombres'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'a343t'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N5Q14 extends ExerciceCan {
  enonce(a?: number, b?: number, c?: number) {
    if (a == null || b == null || c == null) {
      const facteur = (randint(1, 7) * 2 + 1) * 5
      const liste1: [number, number, number] = choice([
        [2, 3, 4],
        [1, 2, 3],
        [3, 4, 5],
      ]) as [number, number, number]
      ;[a, b, c] = liste1.map((x: number) => x * facteur)
    }
    const liste = [a, b, c, '$\\ldots$'].map((el) => `$${el}$`).join(' ; ')
    this.reponse = c + b - a
    this.question = 'Complète cette suite logique de nombres : '
    this.canEnonce = this.question
    this.question += liste
    this.correction = `On passe d'un nombre au suivant en ajoutant $${b - a}$.<br>
    Ainsi, ? $=${c} + ${b - a}=${miseEnEvidence(c + b - a)}$.`
    this.canReponseACompleter = `$${a}$ ; $${b}$ ; <br> $${c}$ ; $\\ldots$`
    if (this.interactif) {
      this.question = this.question.replace('$\\ldots$', '')
      this.optionsChampTexte = { texteApres: '.' }
    } else {
      this.question += '.'
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(75, 150, 225) : this.enonce()
  }
}
