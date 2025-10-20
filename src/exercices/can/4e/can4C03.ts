import { choice } from '../../../lib/outils/arrayOutils'
import {
  miseEnEvidence,
  texteEnCouleur,
} from '../../../lib/outils/embellissements'
import { obtenirListeFractionsIrreductibles } from '../../../modules/fractions'
import FractionEtendue from '../../../modules/FractionEtendue'
import ExerciceSimple from '../../ExerciceSimple'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Effectuer une division avec une fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '17/05/2025'

/**
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021

 */
export const uuid = '22c4c'

export const refs = {
  'fr-fr': ['can4C03'],
  'fr-ch': ['NR'],
}
export default class QuotientEntierQuiVaBienParFraction extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    this.optionsDeComparaison = { fractionEgale: true }
  }

  nouvelleVersion() {
    const a = choice(obtenirListeFractionsIrreductibles())
    const c = choice([2, 3, 4, 5, 6])
    const b = a.n * c
    this.question = `Calculer $${b}\\div ${a.texFraction}$.<br>`
    this.reponse = new FractionEtendue(b * a.d, a.n)
    if (a.n === 1) {
      this.correction = `Diviser par un nombre revient à multiplier par son inverse. <br>
    Ici, on divise par $${a.texFraction}$, donc cela revient à multiplier par son inverse : $${a.inverse().texFraction}$.<br>
    $${b}\\div ${a.texFraction}=${b}\\times ${a.inverse().texFraction}=
        ${miseEnEvidence(c * a.d)}$`
    } else {
      this.correction = `Diviser par un nombre revient à multiplier par son inverse. <br>
    Ici, on divise par $${a.texFraction}$, donc cela revient à multiplier par son inverse :  $${a.inverse().texFraction}$.<br>
    $${b}\\div ${a.texFraction}=${b}\\times ${a.inverse().texFraction}=
    \\dfrac{${b}\\times ${a.d}}{${a.n}}=
    ${c}\\times ${a.d}=${miseEnEvidence(c * a.d)}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
    Pour multiplier $${b}$ par $${a.inverse().texFraction}$,
    on commence par diviser $${b}$ par $${a.n}$, ce qui donne $${b / a.n}$,
     puis on multiplie par $${a.d}$, ce qui donne $${b / a.n}\\times ${a.d}=${c * a.d}$.      `)
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
