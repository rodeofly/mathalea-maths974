import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import FractionEtendue from '../../../modules/FractionEtendue'
import { obtenirListeFractionsIrreductiblesFaciles } from '../../../modules/fractions'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Effectuer un calcul complexe avec des fractions'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '06/08/2025'
/**
 * @author Gilles Mora
 *

 */
export const uuid = '88281'

export const refs = {
  'fr-fr': ['can3C19'],
  'fr-ch': [],
}
export default class CalculComplexeFraction extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.versionQcmDisponible = true
    this.nbQuestions = 1
    this.spacingCorr = 2
    this.optionsDeComparaison = { fractionEgale: true }
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    this.optionsDeComparaison = { nombreDecimalSeulement: true }
    this.optionsChampTexte = { texteAvant: '<br>$A=$' }
  }

  nouvelleVersion() {
    const frac1 = choice(obtenirListeFractionsIrreductiblesFaciles())
    const a = randint(1, 5)
    const b = randint(1, 6, [frac1.num]) // sinon division par zéro avec les distracteurs

    this.question = this.versionQcm
      ? `On considère $A=\\dfrac{${a}}{${b}-${frac1.texFraction}}$. On a :`
      : `Calculer $A=\\dfrac{${a}}{${b}-${frac1.texFraction}}$.`

    // Calculs pour la correction
    const bFraction = new FractionEtendue(b, 1) // Conversion de b en fraction
    const denominateur = bFraction.differenceFraction(frac1) // b - frac1
    const resultat = new FractionEtendue(a, 1).diviseFraction(denominateur) // a / (b - frac1)

    // Calculs détaillés pour la correction
    const bAvecDenominateurCommun = new FractionEtendue(
      b * frac1.den,
      frac1.den,
    )
    const fractionAvecDenominateurCommun = new FractionEtendue(
      frac1.num,
      frac1.den,
    )
    const denominateurReduit = new FractionEtendue(
      b * frac1.den - frac1.num,
      frac1.den,
    )
    const fractionInverse = new FractionEtendue(
      frac1.den,
      b * frac1.den - frac1.num,
    )

    this.correction = `
$\\begin{aligned}
A &= \\dfrac{${a}}{${b}-${frac1.texFraction}} \\\\
&= \\dfrac{${a}}{${bAvecDenominateurCommun.texFraction}-${fractionAvecDenominateurCommun.texFraction}} \\\\
&= \\dfrac{${a}}{${denominateurReduit.texFraction}} \\\\
&= ${a} \\times ${fractionInverse.texFraction} \\\\
&= ${miseEnEvidence(resultat.texFractionSimplifiee)}
\\end{aligned}$`
    this.reponse = this.versionQcm
      ? `$${resultat.texFractionSimplifiee}$`
      : resultat.texFractionSimplifiee

    // Distracteur 2 : oubli de la division (juste le dénominateur simplifié)
    const distracteur2 = denominateur

    // Distracteur 3 : erreur de signe
    const distracteur3 = denominateur.multiplieEntier(a)

    // Distracteur 4 : mauvaise soustraction au dénominateur (b - num/den = (b-num)/den au lieu de (b*den-num)/den)
    const denominateurErreur4 = new FractionEtendue(b - frac1.num, frac1.den)
    const distracteur4 = new FractionEtendue(a, 1).diviseFraction(
      denominateurErreur4,
    )

    this.distracteurs = [
      `$${distracteur2.texFractionSimplifiee}$`,
      `$${distracteur3.texFractionSimplifiee}$`,
      `$${distracteur4.texFractionSimplifiee}$`,
      `$${distracteur3.oppose().texFractionSimplifiee}$`,
    ]
    this.canEnonce = `Calculer $A=\\dfrac{${a}}{${b}-${frac1.texFraction}}$.`
    this.canReponseACompleter = '$A=\\ldots$'
  }
}
