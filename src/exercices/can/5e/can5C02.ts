import { texteEnCouleur } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Calculer une somme d’entiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021

 */
export const uuid = '5ecdc'

export const refs = {
  'fr-fr': ['can5C02'],
  'fr-ch': [],
}
export default class SommeEntiers5e extends ExerciceSimple {
  constructor() {
    super()
    this.nbQuestions = 1

    this.typeExercice = 'simple'
  }

  nouvelleVersion() {
    const b = randint(51, 89, [60, 70, 80])
    const a = randint(2, 39, [10, 20, 30]) + 100
    this.reponse = a + b
    this.question = `Calculer $${a} + ${b}$.`
    this.correction = `$${a} + ${b}=${a + b}$`
    this.correction += texteEnCouleur(`<br> Mentalement : <br>
    On décompose le calcul $${a} + ${b}$ en  $(100+${a - 100})+ ${b}=100+ (\\underbrace{${a - 100} +${b}}_{${a - 100 + b}})$ .<br>
       Cela donne :  $100+${a - 100 + b}=${this.reponse}$.
      `)
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
