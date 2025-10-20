import { choice } from '../../../lib/outils/arrayOutils'
import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
} from '../../../lib/outils/ecritures'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Utiliser les priorités opératoires avec des relatifs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021

 */
export const uuid = '1da2d'

export const refs = {
  'fr-fr': ['can4C01'],
  'fr-ch': ['NR'],
}
export default class PrioriteOperatoireEtRelatifs extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let a = randint(-12, 12, 0)
    const b = randint(-4, 4, [-1, 0, 1])
    const c = randint(2, 6)
    if (a > 0 && b > 0) {
      a = -a
    }
    if (choice([true, false])) {
      this.question = `Calculer $${a}${ecritureAlgebrique(b)}\\times ${c}$.`
      this.correction = `La multiplication étant prioritaire sur l'addition, on commence par effectuer  le produit $${b}\\times ${ecritureParentheseSiNegatif(c)}=${b * c}$.<br>
      Ainsi, $${a}${ecritureAlgebrique(b)}\\times ${c}=${a}${ecritureAlgebrique(b * c)}=${a + b * c}$`
    } else {
      this.question = `Calculer $${a}${ecritureAlgebrique(c)}\\times ${ecritureParentheseSiNegatif(b)}$.`
      this.correction = `La multiplication étant prioritaire sur l'addition, on commence par effectuer  le produit $${c}\\times ${ecritureParentheseSiNegatif(b)}=${b * c}$.<br>
      Ainsi, $${a}${ecritureAlgebrique(c)}\\times ${ecritureParentheseSiNegatif(b)}=${a}${ecritureAlgebrique(b * c)}=${a + b * c}$`
    }
    this.reponse = a + b * c
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
