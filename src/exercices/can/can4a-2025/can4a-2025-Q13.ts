import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'
import { context } from '../../../modules/context'

export const titre = 'Conversion de longueurs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '38d97'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N4Q13 extends ExerciceCan {
  enonce(a?: number) {
    if (a == null) {
      a = randint(1, 9) / 10 + (choice([0, 1]) * randint(1, 9)) / 1000
    }
    this.reponse = (a * 100).toFixed(1)
    this.question = 'Compléter : '
    this.correction = `$1\\text{ m} = 100\\text{ cm}$, donc $${texNombre(a, 3)}\\text{ m} =${miseEnEvidence(`${texNombre(a * 100, 1)}`)} \\text{ cm}$.`
    this.canEnonce = 'Compléter.'
    this.canReponseACompleter = `$${texNombre(a, 3)}\\text{ m}=\\ldots\\ldots$ cm`
    this.optionsChampTexte = {
      texteApres: ' $\\text{cm}$',
      texteAvant: ` $${texNombre(a, 3)}\\text{ m}=$`,
    }
    if (context.isHtml && !this.interactif) {
      this.question += ` $${texNombre(a, 3)}\\text{ m}=\\ldots\\text{ cm}$`
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(0.6) : this.enonce()
  }
}
