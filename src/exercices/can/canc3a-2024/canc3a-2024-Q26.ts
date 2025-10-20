import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'

import Decimal from 'decimal.js'
import { texNombre } from '../../../lib/outils/texNombre'

export const titre = 'Additionner des décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'c700e'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora (reprise du fichier de Jean-Claude Lhote 6ième)

*/
export default class AjouteDecimauxPieges extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1

    this.canOfficielle = false
  }

  nouvelleVersion() {
    let a: Decimal
    let b: Decimal
    if (this.canOfficielle) {
      a = new Decimal('0.16')
      b = new Decimal('0.2')
    } else {
      const chiffre = randint(2, 7)
      b = new Decimal(chiffre).div(10)
      a = new Decimal(randint(1, 3) * 10 + (10 - chiffre)).div(100)
    }
    this.question = `$${texNombre(a, 2)}+${texNombre(b, 1)}`
    if (this.interactif) this.question += '=$'
    else this.question += '$'
    this.canEnonce = this.question
    this.canReponseACompleter = ''
    this.reponse = texNombre(a.add(b), 2)
    this.correction = `On peut calculer ainsi : <br>
    $\\begin{aligned}
    ${texNombre(a, 2)}+${texNombre(b, 1)}&=${texNombre(a, 2)}+${texNombre(b, 2, true)}\\\\
    &=${miseEnEvidence(this.reponse)}
    \\end{aligned}$`
  }
}
