import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
export const titre = 'Calculer une somme'
export const uuid = 'cdd97'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Gilles Mora

*/
export default class Can2025CM1Q12 extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
    this.optionsChampTexte = { texteAvant: ' $=$' }
  }

  nouvelleVersion() {
    const a = this.canOfficielle ? 7 : randint(6, 9)
    const b = this.canOfficielle ? 5 : randint(5, 8)

    this.reponse = a * b
    this.question = `$${a}`
    for (let i = 0; i <= b - 2; i++) {
      this.question += `+${a}`
    }
    this.question += '$'
    this.correction = `$${a}`
    for (let i = 0; i <= b - 2; i++) {
      this.correction += `+${a}`
    }
    this.correction += `=${a}\\times ${b}=${miseEnEvidence(a * b)}$`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
