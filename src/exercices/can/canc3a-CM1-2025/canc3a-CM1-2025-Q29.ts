import ExerciceSimple from '../../ExerciceSimple'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { context } from '../../../modules/context'
export const titre = 'Convertir des m en cm'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'ab0ff'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class Can2025CM1Q29 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const a = this.canOfficielle ? 3 : randint(2, 29)
    this.reponse = texNombre(a * 100, 0)
    this.question = `Complète : <br> $${a}$ m $=$ `
    this.correction = ` $1$ m $=100$ cm<br>
      Ainsi, pour passer des "m" au "cm", on multiplie par $100$.<br>
        Comme $${a}\\times 100 =${texNombre(a * 100, 1)}$, alors $${a}$ m$=${miseEnEvidence(texNombre(a * 100, 1))}$ cm. `
    this.canReponseACompleter = ` $${a}$ m $=\\ldots$ cm`
    if (this.interactif) {
      this.optionsChampTexte = { texteApres: 'cm' }
    } else {
      this.question += `${context.isHtml ? '$\\ldots$ cm' : ''}`
    }

    this.canEnonce = 'Complète.'
  }
}
