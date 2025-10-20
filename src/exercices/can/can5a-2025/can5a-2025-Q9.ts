import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'

export const titre = 'Dix pour cent'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'a343o'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N5Q9 extends ExerciceCan {
  enonce(b?: number) {
    const a = 10
    if (b == null) {
      b =
        randint(2, 9) * 10 + randint(1, 9) + choice([0, 0, randint(1, 9)]) * 100
    }
    this.reponse = (a * b) / 100
    this.question = `$${a}\\,\\%$ de $${b}$`
    this.correction = `$${a}\\,\\%$ de $${b}$, c'est $\\dfrac{${a}}{100} \\times ${texNombre(b, 0)} = \\dfrac{${a}\\times ${texNombre(b, 0)}}{100}=  \\dfrac{${texNombre(a * b, 0)}}{100}=${miseEnEvidence(texNombre((a * b) / 100, 2))}$.`
    this.canEnonce = this.question
    if (this.interactif) {
      this.question += ' est égal à '
    }
    this.optionsChampTexte = { texteApres: '.' }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(28) : this.enonce()
  }
}
