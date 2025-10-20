import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
import { rienSi1 } from '../../../lib/outils/ecritures'
import { functionCompare } from '../../../lib/interactif/comparisonFunctions'
export const titre = 'Calculer une dérivée'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'c3202'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Can2025N5Q17 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierFullOperations
    this.canOfficielle = true
    this.optionsChampTexte = { texteAvant: " <br>$f'(x)=$" }
  }

  nouvelleVersion() {
    const a = this.canOfficielle ? 2 : randint(3, 6)
    this.reponse = {
      reponse: {
        value: `\\dfrac{-${a}x^{${a - 1}}}{x^{${2 * a}}}`,
        compare: functionCompare,
        options: { variable: 'x' },
      },
    }
    this.question = `Soit $f$ : $x\\longmapsto \\dfrac{1}{x^${a}}$<br>`
    if (!this.interactif) {
      this.question += "$f'(x)=\\ldots$"
    }
    this.correction = `D'après le cours, si $f=\\dfrac{1}{u}$ alors $f'=\\dfrac{-u'}{u^2}$.<br>
    $f'(x)=\\dfrac{-${a}x^{${rienSi1(a - 1)}}}{x^{${2 * a}}}=${miseEnEvidence(`-\\dfrac{${a}}{x^{${a + 1}}}`)}$.`
    this.canEnonce = `Soit $f$ : $x\\longmapsto \\dfrac{1}{x^${a}}$`
    this.canReponseACompleter = "$f'(x)=\\ldots$"
  }
}
