import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
import {
  ecritureAlgebrique,
  ecritureAlgebriqueSauf1,
  reduireAxPlusB,
  rienSi1,
  simpleDeveloppement,
} from '../../../lib/outils/ecritures'
export const titre = 'Développer et réduire'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '0aeb9'
export const refs = {
  'fr-fr': [''],
  'fr-ch': ['NR'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class DevelopperEtReduire extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecX
    this.canOfficielle = true
    this.optionsDeComparaison = { expressionsForcementReduites: true }
  }

  nouvelleVersion() {
    const fac1 = this.canOfficielle ? 5 : randint(2, 7)
    const fac2 = this.canOfficielle ? 1 : randint(-5, 5, [0, fac1, -fac1])
    const a = randint(1, 2)
    const b = randint(-3, 3, 0)
    this.question = `Développer et réduire  $${fac1}(${reduireAxPlusB(a, b)})${ecritureAlgebriqueSauf1(fac2)}x$.<br>`
    this.correction = `$\\begin{aligned}
               ${fac1}(${reduireAxPlusB(a, b)})${ecritureAlgebriqueSauf1(fac2)}x&=${simpleDeveloppement({ a, b, c: fac1, sommeAGauche: false })[0]}${ecritureAlgebriqueSauf1(fac2)}x\\\\
               &=${rienSi1(fac1 * a)}x${ecritureAlgebrique(fac1 * b)}${ecritureAlgebriqueSauf1(fac2)}x\\\\
               &=${miseEnEvidence(reduireAxPlusB(fac1 * a + fac2, fac1 * b))}
               \\end{aligned}$`

    this.reponse = {
      reponse: { value: reduireAxPlusB(fac1 * a + fac2, fac1 * b) },
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
