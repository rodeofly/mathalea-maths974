import FractionEtendue from '../../../modules/FractionEtendue'
import { choice } from '../../../lib/outils/arrayOutils'
import { obtenirListeFractionsIrreductibles } from '../../../lib/outils/deprecatedFractions'
import ExerciceSimple from '../../ExerciceSimple'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Rendre irréductible une fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 */
export const uuid = 'f1208'

export const refs = {
  'fr-fr': ['can3C03'],
  'fr-ch': [],
}
export default class FractionIrreductibleCan extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction

    this.optionsDeComparaison = { fractionIrreductible: true }
  }

  nouvelleVersion() {
    const maFraction = choice(obtenirListeFractionsIrreductibles())
    const k = choice([2, 3, 4, 5, 9, 10, 20])
    const a = k * maFraction[0]
    const b = k * maFraction[1]
    const frac = new FractionEtendue(a, b)
    this.reponse = new FractionEtendue(maFraction[0], maFraction[1]).simplifie()
    this.question = `Rendre  la fraction $\\dfrac{${a}}{${b}}$ irréductible.`
    this.correction = `$\\dfrac{${a}}{${b}} ${frac.texSimplificationAvecEtapes(false, '#f15929')}$`
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
    if (this.interactif) {
      this.question += '<br>'
    }
  }
}
