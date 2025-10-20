import ExerciceSimple from '../../ExerciceSimple'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
export const titre = 'Calculer une dérivée'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '6d56a'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Can2025TQ22 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.lycee
    this.optionsChampTexte = { texteAvant: ' <br>' }
  }

  nouvelleVersion() {
    const a = this.canOfficielle ? 2 : randint(1, 9)
    this.reponse = `e^{2x}-${a ** 2}`
    this.question = `Simplifier au maximum $(\\text{e}^x+${a})(\\text{e}^x-${a})$.`
    this.correction = `On développe en utilisant l'égalité remarquable $(a-b)(a+b)=a^2-b^2$ avec $a=\\text{e}^x$ et $b=${a}$.<br>
    $(\\text{e}^x+${a})(\\text{e}^x-${a})=\\text{e}^{2x}-${a ** 2}$`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
