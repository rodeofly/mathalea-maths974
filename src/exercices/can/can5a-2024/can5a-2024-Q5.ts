import ExerciceSimple from '../../ExerciceSimple'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Calculer une somme de deux décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '967e9'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase

    this.canOfficielle = false
  }

  nouvelleVersion() {
    let reponse: number
    if (this.canOfficielle) {
      reponse = 0.56
      this.question = '$0,4+0,16$ '
      this.correction = `$0,4+0,16=${miseEnEvidence('0,56')}$`
    } else {
      const a = randint(12, 49, [20, 30, 40]) / 100
      const b = randint(31, 69, [40, 50, 60]) / 10
      reponse = a + b
      this.question = `$${texNombre(a, 2)}+${texNombre(b, 2)}$`
      this.correction = ` $${texNombre(a, 2)}+${texNombre(b, 2)}=${miseEnEvidence(texNombre(reponse, 2))}$`
      this.canEnonce = this.question
      this.canReponseACompleter = '$\\ldots$'
    }
    this.reponse = reponse.toFixed(2)
    this.canEnonce = this.question
    this.canReponseACompleter = ''
    if (this.interactif) {
      this.question += ' $=$'
    }
  }
}
