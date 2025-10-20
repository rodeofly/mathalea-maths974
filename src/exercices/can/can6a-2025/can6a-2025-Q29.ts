import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { context } from '../../../modules/context'
import FractionEtendue from '../../../modules/FractionEtendue'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Convertir en cm'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '69795'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class Can2025N6Q29 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const a = this.canOfficielle ? 185 : randint(3, 19) * 10 + 5
    this.reponse = new FractionEtendue(a, 10).texFraction
    this.question = `Complète : <br> $${a}$ mm $=$ `
    this.correction = ` Comme $1$ cm $=10$ mm, alors $1$ mm $=0,1$ cm.<br>
      Ainsi, pour passer des "mm" au "cm", on divise par $10$.<br>
        Comme $${a}\\div 10 =${texNombre(a / 10, 1)}$, alors $${a}$ mm$=${miseEnEvidence(texNombre(a / 10, 1))}$ cm. `
    this.canReponseACompleter = ` $${a}$ mm $=\\ldots$ cm`
    if (this.interactif) {
      this.optionsChampTexte = { texteApres: 'cm' }
    } else {
      this.question += `${context.isHtml ? '$\\ldots$ cm' : ''}`
    }

    this.canEnonce = 'Complète.'
  }
}
