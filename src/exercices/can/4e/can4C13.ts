import { choice } from '../../../lib/outils/arrayOutils'
import { arrondi } from '../../../lib/outils/nombres'
import { texNombre } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import FractionEtendue from '../../../modules/FractionEtendue'
import ExerciceSimple from '../../ExerciceSimple'
import Decimal from 'decimal.js'
export const titre = 'Calculer une fraction de dénominateur un décimal'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '10/01/2023'

/**
 * @author Gilles Mora
 *
 */

export const uuid = '7a0b1'

export const refs = {
  'fr-fr': ['can4C13'],
  'fr-ch': [],
}
export default class CalculFractionDecimal extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const n = randint(1, 9)
    const a = choice([2, 4, 8])
    const d = new Decimal(a).div(10)

    const f = new FractionEtendue(n * 10, d * 10).simplifie()
    const reponse = arrondi(n / d, 2)
    this.reponse = reponse
    this.question = `Écrire  $\\dfrac{${n}}{${texNombre(d, 1)}}$ sous la forme d'un décimal ou d'un entier.`
    if (arrondi((a * 10) / (10 * d), 0) === arrondi((a * 10) / (10 * d), 1)) {
      this.correction = ` $\\dfrac{${n}}{${texNombre(d, 1)}}=\\dfrac{${n}\\times 10}{${texNombre(d, 1)}\\times 10}=\\dfrac{${n * 10}}{${texNombre(d * 10, 0)}}=${texNombre(reponse, 2)}$
          `
    } else {
      this.correction = ` $\\dfrac{${n}}{${texNombre(d, 1)}}=\\dfrac{${n}\\times 10}{${texNombre(d, 1)}\\times 10}=\\dfrac{${n * 10}}{${texNombre(d * 10, 0)}}=${f.texFraction}=${texNombre(reponse, 2)}$
          `
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
