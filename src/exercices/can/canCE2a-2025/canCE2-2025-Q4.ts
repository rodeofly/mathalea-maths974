import { texNombre } from '../../../lib/outils/texNombre'
import ExerciceCan from '../../ExerciceCan'
import { choice } from '../../../lib/outils/arrayOutils'
import { propositionsQcm } from '../../../lib/interactif/qcm'

export const titre = 'Ordre de grandeur'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'ae7c2'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

const perimetres: [number, 'cm' | 'm' | 'km', string][] = [
  [12, 'm', "d'une chambre"],
  [100, 'cm', "d'un cahier de collégien"],
  [0.4, 'km', "d'un terrain de foot"],
  [8, 'm', "d'une table de la cantine"],
  [35, 'cm', "d'une calculatrice"],
  [0.8, 'km', "du parkinig d'un hypermarché"],
  [120, 'cm', "d'une serviette de table"],
  [3, 'm', "d'une serviette de bain"],
  [4, 'km', "d'une forêt"],
]

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025CE2Q4 extends ExerciceCan {
  enonce(a?: number, b?: 'cm' | 'm' | 'km', c?: string) {
    if (a == null || b == null || c == null) {
      ;[a, b, c] = choice(perimetres)
    }
    this.autoCorrection[0] = {
      propositions: [
        {
          texte: `$${texNombre(a, 1)}$ cm`,
          statut: b === 'cm',
        },
        {
          texte: `$${texNombre(a, 1)}$ m`,
          statut: b === 'm',
        },
        {
          texte: `$${texNombre(a, 1)}$ km`,
          statut: b === 'km',
        },
      ],
      options: { vertical: true },
    }
    this.formatInteractif = 'qcm'
    this.consigne = `Le périmètre ${c} est proche de :`
    const monQcm = propositionsQcm(this, 0)
    this.canEnonce = 'Coche la bonne réponse.<br>' + this.consigne
    this.question = `${monQcm.texte}`
    this.correction =
      monQcm.texteCorr +
      `${c
        .replace('de la', 'La')
        .replace("d'une", 'Une')
        .replace("d'un", 'Un')
        .replace(
          'du',
          'Un',
        )} est un rectangle dont les côtés mesurent en moyenne environ $${texNombre(a / 4, 2)}$ ${b}.<br>
    Donc son périmètre est proche de $${texNombre(a, 1)}$ ${b}.`
    this.canReponseACompleter = monQcm.texte
  }

  nouvelleVersion() {
    this.canOfficielle
      ? this.enonce(40, 'm', 'de la salle de classe')
      : this.enonce()
  }
}
