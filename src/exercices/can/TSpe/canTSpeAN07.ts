import {
  ecritureAlgebriqueSauf1,
  ecritureParentheseSiNegatif,
  reduireAxPlusB,
  rienSi1,
} from '../../../lib/outils/ecritures'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import FractionEtendue from '../../../modules/FractionEtendue'
export const titre = "Calculer l'intégrale d'une fonction affine"
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '05/04/2025'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Stéphane Guyon

 *
*/
export const uuid = 'e8f84'

export const refs = {
  'fr-fr': ['canTSpeAN07'],
  'fr-ch': [],
}
export default class IntegraleAffine extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const a = randint(-5, 5)
    const b = randint(a, a + 5)
    const c = randint(-5, 5, 0)
    const d = randint(-5, 5, 0)
    const fraction = new FractionEtendue(c, 2)
    this.formatChampTexte = KeyboardType.clavierFullOperations
    this.question = `Calculer $I=\\displaystyle\\int_{${a}}^{${b}} \\left(${reduireAxPlusB(c, d)} \\right)\\mathrm{d}x$<br>`

    if (this.interactif) {
      this.question += '<br>$I=$ '
    }
    this.correction = `$\\begin{aligned}\\displaystyle\\int_{${a}}^{${b}} \\left(${reduireAxPlusB(c, d)} \\right)\\ \\mathrm{d}x&=\\Bigl[${rienSi1(fraction.simplifie())}x^2 ${ecritureAlgebriqueSauf1(d)}x\\Bigr]_{${a}}^{${b}}\\\\
    &=${fraction.texFractionSimplifiee}\\times${ecritureParentheseSiNegatif(b)}^2 ${ecritureAlgebriqueSauf1(d)}\\times ${ecritureParentheseSiNegatif(b)} - ${fraction.texFractionSimplifiee}\\times${ecritureParentheseSiNegatif(a)}^2 ${ecritureAlgebriqueSauf1(d)}\\times ${ecritureParentheseSiNegatif(a)}\\\\
    =&${(b ** 2 * c) / 2 + b * d - (a ** 2 * c) / 2 - a * d}\\end{aligned}$`
    this.reponse = (b ** 2 * c) / 2 + b * d - (a ** 2 * c) / 2 - a * d
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
