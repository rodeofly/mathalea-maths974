import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import FractionEtendue from '../../../modules/FractionEtendue'
import { abs } from '../../../lib/outils/nombres'
export const titre = 'Simplifier une fraction simple'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '663ca'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora

*/
export default class simplifierFractionSimple extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
  }

  nouvelleVersion() {
    const n = choice([2025, -2025])
    const d = choice([-1, 2025, -2025])
    const signe = n * d < 0 ? '-' : ''
    this.reponse = new FractionEtendue(n, d).texFractionSimplifiee
    this.question = `Écrire le plus simplement possible : $\\dfrac{${texNombre(n)}}{${texNombre(d)}}$.`
    this.correction = `$\\dfrac{${texNombre(n)}}{${texNombre(d)}}=`
    this.correction += !(signe === '' && n > 0)
      ? `${signe}\\dfrac{${texNombre(abs(n))}}{${texNombre(abs(d))}}=`
      : ''
    this.correction += `${miseEnEvidence(this.reponse)}$`
    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
