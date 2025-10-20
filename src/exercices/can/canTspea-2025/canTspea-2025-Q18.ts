import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
import { functionCompare } from '../../../lib/interactif/comparisonFunctions'
export const titre = 'Calculer une dérivée'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'f78d0'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Can2025TQ18 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.lycee
    this.compare = functionCompare
    this.optionsDeComparaison = { variable: 'x' }
    this.canOfficielle = true
    this.optionsChampTexte = { texteAvant: " <br>$f'(x)=$" }
  }

  nouvelleVersion() {
    const a = this.canOfficielle ? -2 : randint(-5, 5, [-1, 0, 1])
    const b = this.canOfficielle ? 5 : randint(3, 9)
    this.reponse = `${a}\\times e^{${a}x}+\\dfrac{1}{${b}}`
    this.question = `Soit $f(x)=\\text{e}^{${a}x}+\\dfrac{x}{${b}}$<br>`
    if (!this.interactif) {
      this.question += "$f'(x)=\\ldots$"
    }
    this.correction = `D'après le cours, si $f=\\text{e}^u$ alors $f'=u'\\times \\text{e}^{u}$.<br>
    De plus, $\\dfrac{x}{${b}}=\\dfrac{1}{${b}}x$.<br>
    Donc $f'(x)=${miseEnEvidence(`${a}\\text{e}^{${a}x}+\\dfrac{1}{${b}}`)}$.`
    this.canEnonce = ` $f(x)=\\text{e}^{${a}x}+\\dfrac{x}{${b}}$`
    this.canReponseACompleter = "$f'(x)=\\ldots$"
  }
}
