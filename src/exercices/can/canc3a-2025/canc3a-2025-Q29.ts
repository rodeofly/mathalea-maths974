import ExerciceSimple from '../../ExerciceSimple'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { context } from '../../../modules/context'
export const titre = 'Convertir en mm'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '1217e'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class Can2025CM2Q29 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const a = this.canOfficielle ? 54 : randint(51, 69, 60)
    this.reponse = texNombre(a * 10, 0)
    this.question = `Complète : <br> $${a}$ cm $=$ `
    this.correction = ` $1$ cm $=10$ mm<br>
      Ainsi, pour passer des "cm" au "mm", on multiplie par $10$.<br>
        Comme $${a}\\times 10 =${texNombre(a * 10, 1)}$, alors $${a}$ cm$=${miseEnEvidence(texNombre(a * 10, 1))}$ mm. `
    this.canReponseACompleter = ` $${a}$ cm $=\\ldots$ mm`
    if (this.interactif) {
      this.optionsChampTexte = { texteApres: 'mm' }
    } else {
      this.question += `${context.isHtml ? '$\\ldots$ mm' : ''}`
    }

    this.canEnonce = 'Complète.'
  }
}
