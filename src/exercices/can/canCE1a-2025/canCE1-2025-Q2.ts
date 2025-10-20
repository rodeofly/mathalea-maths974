import ExerciceCan from '../../ExerciceCan'
import { choice } from '../../../lib/outils/arrayOutils'
import { texNombre } from '../../../lib/outils/texNombre'
import { propositionsQcm } from '../../../lib/interactif/qcm'

export const titre = 'Convertir'
export const interactifReady = true
export const interactifType = 'qcm'
export const uuid = '87e45'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Gilles Mora

*/

const choix: [
  number,
  'mm' | 'dm' | 'cm' | 'm' | 'km',
  'dm' | 'mm' | 'cm' | 'm' | 'km',
  'dm' | 'mm' | 'cm' | 'm' | 'km',
][] = [
  [100, 'cm', 'm', 'mm'],
  [10, 'mm', 'cm', 'dm'],
  [1000, 'm', 'km', 'dm'],
  [1000, 'mm', 'm', 'km'],
  [10, 'mm', 'cm', 'dm'],
  [100, 'mm', 'dm', 'cm'],
  [1000, 'mm', 'm', 'cm'],
]
export default class Can2025CE2Q4 extends ExerciceCan {
  enonce(
    a?: number,
    b?: 'dm' | 'mm' | 'cm' | 'm' | 'km',
    c?: 'dm' | 'mm' | 'cm' | 'm' | 'km',
    d?: 'dm' | 'mm' | 'cm' | 'm' | 'km',
  ) {
    if (a == null || b == null || c == null || d == null) {
      ;[a, b, c, d] = choice(choix)
    }
    this.question = 'Coche la bonne réponse.'
    this.autoCorrection[0] = {
      enonce: this.question,
      propositions: [
        {
          texte: `$1$ ${c} $= ${texNombre(a)}$ ${b}`,
          statut: true,
        },
        {
          texte: `$1$ ${c} $= ${texNombre(a)}$ ${d}`,
          statut: false,
        },
      ],
      options: { vertical: true },
    }
    const monQcm = propositionsQcm(this, 0)
    this.formatInteractif = 'qcm'
    this.question += monQcm.texte

    this.reponse = `$${texNombre(a, 1)}$ ${b}` // C'est juste pour pas faire planter mathaleaHandleExerciceSimple, cette réponse ne sera pas utilisée.

    this.canEnonce = 'Coche la bonne réponse.'

    this.correction =
      monQcm.texteCorr +
      ` Pour passer des ${b} au ${c}, on multiplie par $${texNombre(a, 0)}$.`
    this.canReponseACompleter = monQcm.texte
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(100, 'cm', 'm', 'mm') : this.enonce()
  }
}
