import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import { choice } from '../../../lib/outils/arrayOutils'
import { rienSi1 } from '../../../lib/outils/ecritures'
import { texNombre } from '../../../lib/outils/texNombre'
import Decimal from 'decimal.js'
export const titre = 'Réduire une expression littérale avec des décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '17/04/2024'
export const uuid = 'c80b3'
export const refs = {
  'fr-fr': ['can4L09'],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class ReduireDecimaux extends ExerciceSimple {
  constructor() {
    super()

    this.canOfficielle = false
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecVariable
  }

  nouvelleVersion() {
    switch (choice([1, 2])) {
      case 1: // x-ax ou 2x-ax
        {
          const variable = choice(['x', 'y', 'a', 'b', 'n'])
          const b = new Decimal(randint(1, 99)).div(100)
          const a = randint(1, 2)
          const reduction = b.mul(-1).plus(a)
          this.reponse = texNombre(b.mul(-1).plus(a), 2) + `${variable}`
          this.reponse = { reponse: { value: this.reponse } }
          this.question = `Écrire le plus simplement possible  $${rienSi1(a)}${variable}-${texNombre(b, 2)}${variable}$.`
          if (this.interactif) {
            this.question += `<br>$${rienSi1(a)}${variable}-${texNombre(b, 2)}${variable}=$`
          }
          this.correction = "À l'aide d'une factorisation, on obtient :<br>"
          if (a === 1) {
            this.correction += `$\\begin{aligned}
          ${variable}-${texNombre(b, 2)}${variable}&=1${variable}-${texNombre(b, 2)}${variable}\\\\
          &=(${a}-${texNombre(b, 2)})${variable}\\\\
          &=${miseEnEvidence(`${texNombre(reduction, 2)}${variable}`)}
          \\end{aligned}$`
          } else {
            this.correction += `$\\begin{aligned}
          ${a}${variable}-${texNombre(b, 2)}${variable}  &=(${a}-${texNombre(b, 2)})${variable}\\\\        
          &=${miseEnEvidence(`${texNombre(reduction, 2)}${variable}`)}
          \\end{aligned}$`
          }
        }
        break
      case 2: // ax-x ou ax-2x
        {
          const variable = choice(['x', 'y', 'a', 'b', 'n'])
          const b = new Decimal(randint(1, 99)).div(100)
          const a = randint(1, 2)
          const reduction = b.sub(a)
          this.reponse = texNombre(b.sub(a), 2) + `${variable}`
          this.reponse = { reponse: { value: this.reponse } }
          this.question = `Écrire le plus simplement possible  $${texNombre(b, 2)}${variable}-${rienSi1(a)}${variable}$.`
          if (this.interactif) {
            this.question += `<br>$${texNombre(b, 2)}${variable}-${rienSi1(a)}${variable}=$`
          }
          this.correction = "À l'aide d'une factorisation, on obtient :<br>"
          if (a === 1) {
            this.correction += `$\\begin{aligned}
          ${texNombre(b, 2)}${variable}-${variable}&=${texNombre(b, 2)}${variable}-1${variable}\\\\
      &=(${texNombre(b, 2)}-1)${variable}\\\\
      &=${miseEnEvidence(`${texNombre(reduction, 2)}${variable}`)}
      \\end{aligned}$`
          } else {
            this.correction += `$\\begin{aligned}
          ${texNombre(b, 2)}${variable}-${rienSi1(a)}${variable}  &=(${texNombre(b, 2)}-${a})${variable}\\\\        
      &=${miseEnEvidence(`${texNombre(reduction, 2)}${variable}`)}
      \\end{aligned}$`
          }
        }
        break
    }
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
