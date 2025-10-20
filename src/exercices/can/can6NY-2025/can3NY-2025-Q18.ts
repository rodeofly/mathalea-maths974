import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import {
  ecritureAlgebrique,
  reduireAxPlusB,
  reduirePolynomeDegre3,
} from '../../../lib/outils/ecritures'
import { randint } from '../../../modules/outils'
import { abs, signe } from '../../../lib/outils/nombres'
export const titre = 'Développer une expression'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'cfe2d'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora
 */
export default class developper extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecVariable
  }

  nouvelleVersion() {
    const choix = choice([1, 2, 3])
    const a = randint(-2, 2, 0)
    const b = randint(-5, 5, 0)
    let reponse1 = ''
    this.question = 'Développer '
    if (choix === 1) {
      reponse1 = `${reduireAxPlusB(2025, a * 2025)}`
      this.reponse = reponse1
      this.question += `$A=${texNombre(2025, 0)}(x${ecritureAlgebrique(a)})$.`
      this.correction = `On développe $A$ :<br>
      $\\begin{aligned}
      A&=${texNombre(2025, 0)}\\times x ${signe(a)}${texNombre(2025, 0)}\\times ${abs(a)}\\\\
      &=${miseEnEvidence(this.reponse)}
      \\end{aligned}$`
    } else if (choix === 2) {
      reponse1 = `${reduirePolynomeDegre3(0, 2025, a * 2025, 0)}`
      this.reponse = [reponse1, reponse1.replace('x^2', 'x \\times x ')]
      this.question += `$A=${texNombre(2025, 0)}x(x${ecritureAlgebrique(a)})$.`
      this.correction = `On développe $A$ :<br>
      $\\begin{aligned}
      A&=${texNombre(2025, 0)}x\\times x ${signe(a)}${texNombre(2025, 0)}x\\times ${abs(a)}\\\\
      &=${miseEnEvidence(reponse1)}
      \\end{aligned}$`
    } else {
      reponse1 = `${reduirePolynomeDegre3(0, 2025, b, 0)}`
      this.reponse = [reponse1, reponse1.replace('x^2', 'x \\times x ')]
      this.question += `$A=x(${texNombre(2025, 0)}x${ecritureAlgebrique(b)})$.`
      this.correction = `On développe $A$ :<br>
      $\\begin{aligned}
      A&=x\\times${texNombre(2025, 0)}x ${signe(b)}x\\times ${abs(b)}\\\\
       &=${miseEnEvidence(reponse1)}
      \\end{aligned}$`
    }
    if (this.interactif) {
      this.question += '<br>$A=$'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
