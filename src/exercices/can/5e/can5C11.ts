import { texteEnCouleur } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Calculer une différence'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021

 */
export const uuid = '606fd'

export const refs = {
  'fr-fr': ['can5C11'],
  'fr-ch': [],
}
export default class DifferenceNegative extends ExerciceSimple {
  constructor() {
    super()
    this.nbQuestions = 1

    this.typeExercice = 'simple'
  }

  nouvelleVersion() {
    const a = randint(8, 15)
    const b = randint(18, 30)
    this.question = `Calculer $${a}-${b}$.`
    this.correction = `$${a}-${b}=${a - b}$`
    this.reponse = a - b
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    On décompose $${b}$ en $${a}+${b - a}$, ce qui donne :<br>
     $${a}-${b}=${a}-${a}-${b - a}=${a - b}$.
       `)
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
