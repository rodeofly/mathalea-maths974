import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { texNombre } from '../../../lib/outils/texNombre'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Appliquer un pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'f66e7'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()

    this.canOfficielle = false
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    this.optionsChampTexte = { texteAvant: ' $=$' }
  }

  nouvelleVersion() {
    if (this.canOfficielle) {
      this.reponse = 6
      this.question = '$20\\,\\%$ de $30$'
      this.correction = `$20\\,\\%$ de $30 = ${miseEnEvidence(6)}$`
      this.correction += `<br>Prendre $20\\,\\%$  de $30$ revient à prendre $2\\times 10\\,\\%$  de $30$.<br>
    Comme $10\\,\\%$  de $30$ vaut $3$ (pour prendre $10\\,\\%$  d'une quantité, on la divise par $10$), alors
    $20\\,\\%$ de $30=2\\times 3=6$.
   `
    } else {
      const a = randint(2, 9) * 10
      const p = randint(1, 4) * 10
      this.reponse = (a * p) / 100
      this.question = `$${p}\\,\\%$ de $${a}$`
      if (p === 10) {
        this.correction = `$10\\,\\%$ de $${a} = 0,1 \\times ${a}=${miseEnEvidence(texNombre(this.reponse))}$`
        this.correction += `<br> Prendre $10\\,\\%$  d'une quantité revient à la diviser par $10$.<br>
      Ainsi, $10\\,\\%$ de $${a} = \\dfrac{${a}}{10}=${texNombre(this.reponse)}$.`
      } else {
        this.correction = `$${p}\\,\\%$ de $${a} = ${miseEnEvidence(texNombre(this.reponse))}$`
        this.correction += `<br> Prendre $${p}\\,\\%$  de $${a}$ revient à prendre $${p / 10}\\times 10\\,\\%$  de $${a}$.<br>
      Comme $10\\,\\%$  de $${a}$ vaut $${a / 10}$ (pour prendre $10\\,\\%$  d'une quantité, on la divise par $10$), alors
      $${p}\\,\\%$ de $${a}=${p / 10}\\times ${a / 10}=${this.reponse}$.
     `
      }
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
