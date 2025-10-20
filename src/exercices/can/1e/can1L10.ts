import { ecritureAlgebrique } from '../../../lib/outils/ecritures'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
export const titre = 'Simplifier un taux de variation'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '17/11/2022'

/**
 *
 * @author Gilles Mora

*/

export const uuid = 'cc9ee'

export const refs = {
  'fr-fr': ['can1L10'],
  'fr-ch': [],
}
export default class SimplifierTauxVariations extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const a = randint(-12, 12, [0])

    this.question = `Simplifier le plus possible : $\\dfrac{(${a}+h)^2-${a ** 2}}{h}$.`
    this.correction = `$\\dfrac{(${a}+h)^2-${a ** 2}}{h}=\\dfrac{\\cancel{${a ** 2}}${ecritureAlgebrique(2 * a)}h+h^2-\\cancel{${a ** 2}}}{h}=
    \\dfrac{${2 * a}h+h^2}{h}=\\dfrac{h(${2 * a}+h)}{h}=${2 * a}+h$`

    this.reponse = [`h+2\\times ${a}`]
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
