import ExerciceSimple from '../../ExerciceSimple'
import { texNombre } from '../../../lib/outils/texNombre'
import { propositionsQcm } from '../../../lib/interactif/qcm'
import { sp } from '../../../lib/outils/outilString'
import { choice } from '../../../lib/outils/arrayOutils'
export const titre = 'Déterminer un multiple'
export const interactifType = 'qcm'
export const uuid = 'b926b'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class multiple extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatInteractif = 'qcm'
  }

  nouvelleVersion() {
    const a = choice([2, 5, 3, 9, 10])
    this.autoCorrection[0] = {
      options: { ordered: true },
      enonce: `$${texNombre(2025)}$ est-il un multiple de $${a}$ ? `,
      propositions: [
        {
          texte: 'OUI',
          statut: a === 3 || a === 5 || a === 3 || a === 5 || a === 9,
        },
        {
          texte: 'NON',
          statut: a === 2 || a === 10,
        },
      ],
    }
    const qcm = propositionsQcm(this, 0)
    this.question =
      `$${texNombre(2025)}$ est-il un multiple de $${a}$ ? ` + qcm.texte
    this.canEnonce = `$${texNombre(2025)}$ est-il un multiple de $${a}$ ? `
    this.canReponseACompleter = `OUI ${sp(7)} NON`
    if (a === 2 || a === 10) {
      this.correction = `$${texNombre(2025)}$  a pour chiffre des unités $5$ qui ${a === 2 ? "n'est pas pair" : "n'est pas $0$"}. <br>
    Donc  $${texNombre(2025)}$  n'est pas un multiple de ${a === 2 ? '$2$' : '$10$'}.`
    }
    if (a === 3 || a === 9) {
      this.correction = `La somme des chiffres de $${texNombre(2025)}$ est $2+0+2+5=9$ qui est divisible par ${a === 3 ? '$3$' : '$9$'}. <br>
        Donc  $${texNombre(2025)}$  est un multiple de ${a === 3 ? '$3$' : '$9$'}.`
    }
    if (a === 5) {
      this.correction = `$${texNombre(2025)}$  a pour chiffre des unités $5$. <br>
    Donc  $${texNombre(2025)}$  est un multiple de $5$.`
    }
  }
}
