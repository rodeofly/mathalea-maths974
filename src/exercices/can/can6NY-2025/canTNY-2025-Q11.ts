import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
import { rienSi1 } from '../../../lib/outils/ecritures'
import FractionEtendue from '../../../modules/FractionEtendue'

export const titre = 'Calculer un antécédent'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'cbaad'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora
 */
export default class calcAntecedent extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    // this.optionsDeComparaison = { fractionEgale: true }
  }

  nouvelleVersion() {
    const a = randint(-5, 5, 0)
    const ant = randint(2020, 2030)
    this.question = `Déterminer l'antécédent de $${texNombre(ant)}$ par la fonction $f$ définie par : $f(x)=${rienSi1(a)}x+${texNombre(2025, 0)}$.`
    this.reponse = new FractionEtendue(ant - 2025, a).simplifie().texFSD
    this.correction = `L'antécédent est la solution de l'équation  $${rienSi1(a)}x+${texNombre(2025, 0)}=${texNombre(ant)}$.<br>
    Il s'agit  de $${miseEnEvidence(this.reponse)}$.`
    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = '$f(x)=\\ldots$'
  }
}
