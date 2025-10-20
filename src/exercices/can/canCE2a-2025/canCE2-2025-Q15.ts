import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'
import { propositionsQcm } from '../../../lib/interactif/qcm'
import { texteEnCouleurEtGras } from '../../../lib/outils/embellissements'

export const titre = 'Division euclidienne'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '4ed52'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025CE2Q15 extends ExerciceCan {
  enonce(a?: number, b?: number) {
    if (a == null || b == null) {
      b = choice([10, 5, 10, 5, 10, 5, 4, 6])
      const r = randint(1, b - 1)
      a = b * randint(2, 9, r) + r
    }
    const quotient = Math.floor(a / b)
    const reste = a % b
    this.autoCorrection[0] = {
      propositions: [
        {
          texte: `Il y a $${quotient}$ fois $${b}$ et il reste $${reste}$.`,
          statut: true,
        },
        {
          texte: `Il y a $${quotient}$ fois $${b}$ et il reste $${quotient}$.`,
          statut: false,
        },
        {
          texte: `Il y a $${reste}$ fois $${b}$ et il reste $${quotient}$.`,
          statut: false,
        },
      ],
      options: { vertical: true },
    }
    const monQcm = propositionsQcm(this, 0)
    this.formatInteractif = 'qcm'
    this.consigne = `Coche la bonne réponse pour $${a}\\div ${b}$.`
    this.canEnonce = this.consigne
    this.question += `<br>\n${monQcm.texte}`
    this.correction = `On peut faire $${a} = ${quotient} \\times ${b} + ${reste}$.<br>
    La bonne réponse était : ${texteEnCouleurEtGras(`Il y a ${quotient} fois ${b} et il reste ${reste}`)}.`
    this.canReponseACompleter = monQcm.texte
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(75, 10) : this.enonce()
  }
}
