import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
export const titre = 'Ajouter un nombre se finissant par 9'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'c3d56'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    this.optionsChampTexte = { texteAvant: ' $=$' }

    this.canOfficielle = false
  }

  nouvelleVersion() {
    let a, b
    if (this.canOfficielle) {
      a = 35
      b = 19
    } else {
      a = randint(3, 6) * 10 + randint(3, 8)
      b = randint(1, 3) * 10 + 9
    }
    this.reponse = String(a + b)
    this.question = `$${a}+${b}$`
    this.correction = `$${a}+${b}=${a}+(${b + 1}-1)=(${a}+${b + 1})-1=${a + b + 1}-1=${miseEnEvidence(this.reponse)}$`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
