import { texFractionFromString } from '../../../lib/outils/deprecatedFractions'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Résoudre une équation du type $ax=b$'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Jean-Claude Lhote
  * Créé pendant l'été 2021

*/
export const uuid = 'ac10f'

export const refs = {
  'fr-fr': ['can3L01'],
  'fr-ch': [],
}
export default class EquationAXEgalB extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const a = randint(-9, 9, [0, -1, 1]) // b peut être négatif, ça sera une équation du type x-b=c
    this.reponse = randint(-9, 9, [-1, 0, 1])
    const b = a * this.reponse
    this.question = `Donner la solution de l'équation :<br> $${a}x=${b}$`
    this.correction = `On cherche le nombre qui multiplié par $${a}$ donne $${b}$.<br>
    Il s'agit de  $x=${texFractionFromString(b, a)}=${this.reponse}$`
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
