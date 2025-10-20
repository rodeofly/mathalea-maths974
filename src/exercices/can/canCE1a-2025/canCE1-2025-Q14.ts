import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { context } from '../../../modules/context'
export const titre = 'Trouver un nombre'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '1ace5'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}

/**
 * @author Gilles Mora

*/
export default class Can2025CE1Q14 extends ExerciceCan {
  enonce(a?: number) {
    if (a == null) {
      a = randint(70, 79)
    }

    this.question = `Écris un nombre dans lequel on entend ${context.isHtml ? '<i> vingt </i>' : '$\\textit{vingt}$'} et qui soit plus grand que $${a}$.`
    this.reponse = {
      reponse: {
        value: '[80;99]',
        options: { estDansIntervalle: true },
      },
    }
    this.canEnonce = this.question
    this.correction = `Par exemple, $${miseEnEvidence(80)}$ se lit quatre-${context.isHtml ? '<i> vingts </i>' : '$\\textit{vingts}$'}.`
    if (this.interactif) {
      this.question += '<br>Le nombre doit être plus petit que $100$.<br>'
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(79) : this.enonce()
  }
}
