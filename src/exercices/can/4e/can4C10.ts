import { choice } from '../../../lib/outils/arrayOutils'
import { texteEnCouleur } from '../../../lib/outils/embellissements'
import { simplificationDeFractionAvecEtapes } from '../../../lib/outils/deprecatedFractions'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
import { fraction } from '../../../modules/fractions'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Calculer une somme/différence de fractions égyptiennes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * 1/n +/- 1/m
 * @author Gilles Mora
 * publié le 23/10/2021
 */
export const uuid = '8cbb4'

export const refs = {
  'fr-fr': ['can4C10'],
  'fr-ch': [],
}
export default class SommeDifferenceFractionsEgyptiennes extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1

    this.optionsDeComparaison = { fractionIrreductible: true }
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
          this.optionsChampTexte = { texteAvant: '<br>' }
  }

  nouvelleVersion() {
    const a = randint(2, 7)
    const b = randint(2, 7, a)
    if (choice([true, false])) {
      const laFraction = fraction(b + a, a * b).simplifie()
      this.reponse = laFraction
      this.question = `Calculer sous la forme d'une fraction simplifiée $\\dfrac{1}{${a}}+\\dfrac{1}{${b}}$.`
      this.correction = `$\\dfrac{1}{${a}}+\\dfrac{1}{${b}}=\\dfrac{1\\times ${b}}{${a}\\times ${b}}+\\dfrac{1\\times ${a}}{${b}\\times ${a}}=\\dfrac{${b}+${a}}{${a * b}}=${laFraction.texFraction}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
      Pour additionner des fractions, on les met au même dénominateur.<br>
      On prend pour  dénominateur commun  le produit des deux dénominateurs $${a}\\times ${b}=${a * b}$.<br>
      $\\dfrac{1}{${a}}=\\dfrac{${b}}{${a * b}}$ et $\\dfrac{1}{${b}}=\\dfrac{${a}}{${a * b}}$.<br>
      On en déduit : $\\dfrac{1}{${a}}+\\dfrac{1}{${b}}=\\dfrac{${b}+${a}}{${a * b}}=\\dfrac{${a + b}}{${a * b}}${simplificationDeFractionAvecEtapes(a + b, a * b)}$.
          `)
    } else {
      const laFraction = fraction(b - a, a * b).simplifie()
      this.reponse = laFraction
      this.question = `Calculer sous la forme d'une fraction simplifiée $\\dfrac{1}{${a}}-\\dfrac{1}{${b}}$.`
      this.correction = `$\\dfrac{1}{${a}}-\\dfrac{1}{${b}}=\\dfrac{1\\times ${b}}{${a}\\times ${b}}-\\dfrac{1\\times ${a}}{${a}\\times ${b}}=\\dfrac{${b}-${a}}{${a * b}}=\\dfrac{${b - a}}{${a * b}}=${laFraction.texFraction}$`
      this.correction += texteEnCouleur(`<br> Mentalement : <br>
      Pour additionner des fractions, on les met au même dénominateur.<br>
      On prend pour  dénominateur commun  le produit des deux dénominateurs $${a}\\times ${b}=${a * b}$.<br>
      $\\dfrac{1}{${a}}=\\dfrac{${b}}{${a * b}}$ et $\\dfrac{1}{${b}}=\\dfrac{${a}}{${a * b}}$.<br>
      On en déduit : $\\dfrac{1}{${a}}-\\dfrac{1}{${b}}=\\dfrac{${b}-${a}}{${a * b}}=\\dfrac{${b - a}}{${a * b}}${simplificationDeFractionAvecEtapes(b - a, a * b)}$.
          `)
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
