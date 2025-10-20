import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'
import { propositionsQcm } from '../../../lib/interactif/qcm'

export const titre = 'Ordre de grandeur'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'c9c44'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025CE2Q19 extends ExerciceCan {
  enonce(a?: number, b?: number) {
    if (a == null || b == null) {
      a = choice([-1, 1]) + randint(1, 4) * 10
      b = randint(3, 6) * 10
    }
    this.autoCorrection[0] = {
      propositions: [
        {
          texte: `$${texNombre(Math.round(a / 10) * 10 * b)}$`,
          statut: true,
        },
        {
          texte: `$${texNombre(b * 100 + a)}$`,
          statut: false,
        },
        {
          texte: `$${a + b}$`,
          statut: false,
        },
      ],
      options: { vertical: true },
    }
    const monQcm = propositionsQcm(this, 0)
    this.formatInteractif = 'qcm'
    this.consigne = `Quel est le nombre le plus proche de $${a}\\times ${b}$ ?`
    this.correction = `$${a}$ est proche de $${Math.round(a / 10) * 10}$, donc $${a}\\times ${b}$ est proche de $${Math.round(a / 10) * 10}\\times ${b}$, soit $${miseEnEvidence(texNombre(Math.round(a / 10) * 10 * b, 0))}$.`
    this.canEnonce = this.consigne
    this.question = `<br>\n${monQcm.texte}`
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(11, 50) : this.enonce()
  }
}
