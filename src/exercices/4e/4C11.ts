import {
  choice,
  combinaisonListes,
  enleveElement,
} from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
} from '../../lib/outils/ecritures'
import { range1 } from '../../lib/outils/nombres'
import { lettreDepuisChiffre } from '../../lib/outils/outilString'
import { listeDesDiviseurs } from '../../lib/outils/primalite'
import Exercice from '../Exercice'
import { context } from '../../modules/context'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'

export const titre = 'Calculs utilisant les priorités opératoires'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Plusieurs type de calcul avec des entiers.
 *
 * Sans parenthèses :
 * * a+b*c
 * * a+b÷c
 * * a/b*c
 * * a*b÷c
 * * a*b+c
 * * a-b+c
 * * a+b+c*d
 * * a*b+c*d
 * * a*b*c+d
 * * a*b-c÷d
 * * a*b+c÷d
 *
 * Avec parenthèses :
 * * a*(b-c)
 * * (a-b)*c
 * * (a-b)÷c
 * * a÷(b+c)
 * * (a-b)÷c
 * * a*(b-c)*d
 * * a*b*(c-d)
 * * a*(b-c*d)
 * * (a+b*c)÷d
 * * a*(b-c*d)
 * * a*b÷(c+d)
 * * a*(b÷c+d)
 * * a-(b+c)
 * * (a+b+c)*d
 * @author Rémi Angot
 */
export const uuid = '62f66'

export const refs = {
  'fr-fr': ['4C11'],
  'fr-ch': ['10NO6-2'],
}
export default class PrioritesEtRelatifs extends Exercice {
  constructor() {
    super()

    this.consigne = 'Calculer.'
    this.spacing = 2
    this.nbQuestions = 6
    this.nbCols = 2

    this.sup = 3
    this.besoinFormulaireNumerique = [
      'Type de calculs',
      3,
      '1 : Sans opérations entre parenthèses\n2 : Avec des opérations entre parenthèses\n3 : Mélange',
    ]
    this.besoinFormulaire2CaseACocher = [
      'Présentation des corrections en colonnes',
      false,
    ]
    this.listeAvecNumerotation = false
  }

  nouvelleVersion() {
    let listeQuestionsDisponibles
    if (this.sup === 1) {
      listeQuestionsDisponibles = range1(11)
    } else if (this.sup === 2) {
      listeQuestionsDisponibles = range1(20, range1(11))
    } else {
      listeQuestionsDisponibles = range1(20)
    }
    const listeTypeDeQuestions = combinaisonListes(
      listeQuestionsDisponibles,
      this.nbQuestions,
    )
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      let a: number
      let b: number
      let c: number
      let d: number

      switch (listeTypeDeQuestions[i]) {
        case 1: // a+b*c
          a = randint(2, 11) * choice([-1, 1])
          b = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1])
            b = randint(2, 11) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(c)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${a}${miseEnEvidence('~' + ecritureAlgebrique(b) + '\\times' + ecritureParentheseSiNegatif(c))}=${a}${ecritureAlgebrique(
            b * c,
          )}=${a + b * c}$`
          setReponse(this, i, a + b * c)
          break
        case 2: // a+b/c
          a = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          b = c * randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
            b = c * randint(2, 11) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}${ecritureAlgebrique(b)}\\div${ecritureParentheseSiNegatif(c)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${a}${miseEnEvidence('~' + ecritureAlgebrique(b) + '\\div' + ecritureParentheseSiNegatif(c))}=${a}${ecritureAlgebrique(
            b / c,
          )}=${a + b / c}$`
          setReponse(this, i, a + b / c)
          break
        case 3: // a/b*c
          b = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          a = b * randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            b = randint(2, 11) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
            a = b * randint(2, 11) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}\\div${ecritureParentheseSiNegatif(b)}\\times${ecritureParentheseSiNegatif(c)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${miseEnEvidence(a + '\\div' + ecritureParentheseSiNegatif(b))}\\times${ecritureParentheseSiNegatif(c)}=${
            a / b
          }\\times${ecritureParentheseSiNegatif(c)}=${(a / b) * c}$`
          setReponse(this, i, (a / b) * c)
          break
        case 4: // a*b/c
          if (choice([true, false])) {
            // a est un multiple de c
            c = randint(2, 6) * choice([-1, 1])
            a = c * randint(2, 5) * choice([-1, 1])
            b = randint(2, 6) * choice([-1, 1])
            while (a > 0 && b > 0 && c > 0) {
              c = randint(2, 6) * choice([-1, 1])
              a = c * randint(2, 5) * choice([-1, 1])
              b = randint(2, 6) * choice([-1, 1])
            }
          } else {
            // b est un multiple de c
            c = randint(2, 6) * choice([-1, 1])
            b = c * randint(2, 5) * choice([-1, 1])
            a = randint(2, 6) * choice([-1, 1])
            while (a > 0 && b > 0 && c > 0) {
              c = randint(2, 6) * choice([-1, 1])
              b = c * randint(2, 5) * choice([-1, 1])
              a = randint(2, 6) * choice([-1, 1])
            }
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times${ecritureParentheseSiNegatif(b)}\\div${ecritureParentheseSiNegatif(c)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${miseEnEvidence(a + '\\times' + ecritureParentheseSiNegatif(b))}\\div${ecritureParentheseSiNegatif(c)}=${
            a * b
          }\\div${ecritureParentheseSiNegatif(c)}=${(a * b) / c}$`
          setReponse(this, i, (a * b) / c)
          break
        case 5: // a*b+c
          a = randint(2, 11) * choice([-1, 1])
          b = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1])
            b = randint(2, 11) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times${ecritureParentheseSiNegatif(b)}${ecritureAlgebrique(c)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${miseEnEvidence(a + '\\times' + ecritureParentheseSiNegatif(b))}${ecritureAlgebrique(c)}=${
            a * b
          }${ecritureAlgebrique(c)}=${a * b + c}$`
          setReponse(this, i, a * b + c)
          break
        case 6: // a-b+c
          a = randint(2, 11) * choice([-1, 1])
          b = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1])
            b = randint(2, 11) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}-(${ecritureAlgebrique(b)})${ecritureAlgebrique(c)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${a}${miseEnEvidence(ecritureAlgebrique(-b))}${ecritureAlgebrique(c)}=${a - b}${ecritureAlgebrique(c)}=${
            a - b + c
          }$`
          setReponse(this, i, a - b + c)
          break
        case 7: // a+b+c*d
          a = randint(2, 20) * choice([-1, 1])
          b = randint(2, 20) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          d = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            a = randint(2, 20) * choice([-1, 1])
            b = randint(2, 20) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
            d = randint(2, 11) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}${ecritureAlgebrique(b)}${ecritureAlgebrique(c)}\\times${ecritureParentheseSiNegatif(d)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${a}${ecritureAlgebrique(b)}${miseEnEvidence(
            ecritureAlgebrique(c) + '\\times' + ecritureParentheseSiNegatif(d),
          )}=${a}${ecritureAlgebrique(b)}${ecritureAlgebrique(c * d)}=${a + b + c * d}$`
          setReponse(this, i, a + b + c * d)
          break
        case 8: // a*b+c*d
          a = randint(2, 11) * choice([-1, 1])
          b = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          d = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            a = randint(2, 20) * choice([-1, 1])
            b = randint(2, 20) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
            d = randint(2, 11) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times${ecritureParentheseSiNegatif(b)}${ecritureAlgebrique(c)}\\times${ecritureParentheseSiNegatif(d)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${
            a + miseEnEvidence('\\times') + ecritureParentheseSiNegatif(b)
          }${ecritureAlgebrique(c) + miseEnEvidence('\\times') + ecritureParentheseSiNegatif(d)}=${a * b}${ecritureAlgebrique(c * d)}=${
            a * b + c * d
          }$`
          setReponse(this, i, a * b + c * d)
          break
        case 9: // a*b*c+d
          a = randint(2, 5) * choice([-1, 1])
          b = randint(2, 5) * choice([-1, 1])
          c = randint(2, 5) * choice([-1, 1])
          d = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            a = randint(2, 5) * choice([-1, 1])
            b = randint(2, 5) * choice([-1, 1])
            c = randint(2, 5) * choice([-1, 1])
            d = randint(2, 11) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times${ecritureParentheseSiNegatif(b)}\\times${ecritureParentheseSiNegatif(c)}${ecritureAlgebrique(d)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${miseEnEvidence(
            a + '\\times' + ecritureParentheseSiNegatif(b),
          )}\\times${ecritureParentheseSiNegatif(c)}${ecritureAlgebrique(d)}=${miseEnEvidence(a * b + '\\times' + ecritureParentheseSiNegatif(c))}${ecritureAlgebrique(d)}
          =${a * b * c}${ecritureAlgebrique(d)}
          =${a * b * c + d}$`
          setReponse(this, i, a * b * c + d)
          break
        case 10:
          a = randint(2, 11) * choice([-1, 1])
          b = randint(2, 11) * choice([-1, 1])
          d = randint(2, 11) * choice([-1, 1])
          c = d * randint(2, 8) * choice([-1, 1])
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times${ecritureParentheseSiNegatif(b)}${ecritureAlgebrique(c)}\\div${ecritureParentheseSiNegatif(d)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${
            a +
            miseEnEvidence('\\times') +
            ecritureParentheseSiNegatif(b) +
            ecritureAlgebrique(c) +
            miseEnEvidence('\\div') +
            ecritureParentheseSiNegatif(d)
          }=${a * b}${ecritureAlgebrique(c / d)}=${a * b + c / d}$`
          setReponse(this, i, a * b + c / d)
          break
        case 11: // a*(b+c)
          a = randint(2, 11) * choice([-1, 1])
          b = randint(1, 11) * choice([-1, 1])
          c = randint(1, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(2, 11) * choice([-1, 1])
            b = randint(1, 11) * choice([-1, 1])
            c = randint(1, 11) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times(${b}${ecritureAlgebrique(c)})=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times(${miseEnEvidence(b + ecritureAlgebrique(c))})=${a}\\times${ecritureParentheseSiNegatif(b + c)}=${a * (b + c)}$`
          setReponse(this, i, a * (b + c))
          break
        case 12: // (a+b)*c
          a = randint(1, 11) * choice([-1, 1])
          b = randint(1, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(1, 11) * choice([-1, 1])
            b = randint(1, 11) * choice([-1, 1])
            c = randint(2, 11) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = (${a}${ecritureAlgebrique(b)})\\times${ecritureParentheseSiNegatif(c)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = (${miseEnEvidence(a + ecritureAlgebrique(b))})\\times${ecritureParentheseSiNegatif(c)}=${a + b}\\times${ecritureParentheseSiNegatif(c)}=${(a + b) * c}$`
          setReponse(this, i, (a + b) * c)
          break
        case 13: // (a+b)/c
          c = randint(2, 11) * choice([-1, 1])
          b = randint(11, 39) * choice([-1, 1])
          a = c * randint(2, 9) * choice([-1, 1]) - b
          while (a > 0 && b > 0 && c > 0) {
            c = randint(2, 11) * choice([-1, 1])
            b = randint(11, 39) * choice([-1, 1])
            a = c * randint(2, 9) * choice([-1, 1]) - b
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = (${a}${ecritureAlgebrique(b)})\\div${ecritureParentheseSiNegatif(c)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = (${miseEnEvidence(a + ecritureAlgebrique(b))})\\div${ecritureParentheseSiNegatif(c)}=${
            a + b
          }\\div${ecritureParentheseSiNegatif(c)}=${(a + b) / c}$`
          setReponse(this, i, (a + b) / c)
          break
        case 14: // a/(b+c)
          b = randint(-5, 5, [-1, 0, 1])
          c = randint(-6, 6, [-1, 0, 1, -b])
          a = (b + c) * randint(2, 9) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            b = randint(-5, 5, [-1, 0, 1])
            c = randint(-6, 6, [-1, 0, 1, -b])
            a = (b + c) * randint(2, 9) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}\\div(${b}${ecritureAlgebrique(c)})=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${a}\\div(${miseEnEvidence(b + ecritureAlgebrique(c))})=${a}\\div${ecritureParentheseSiNegatif(b + c)}=${a / (b + c)}$`
          setReponse(this, i, a / (b + c))
          break
        case 15: // a(b+c)*d
          c = randint(11, 39) * choice([-1, 1])
          b = randint(2, 5) * choice([-1, 1]) - c
          a = randint(2, 5) * choice([-1, 1])
          d = randint(2, 5) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            c = randint(11, 39) * choice([-1, 1])
            b = (randint(2, 5) - c) * choice([-1, 1])
            a = randint(2, 5) * choice([-1, 1])
            d = randint(2, 5) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times(${b}${ecritureAlgebrique(c)})\\times${ecritureParentheseSiNegatif(d)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times(${miseEnEvidence(b + ecritureAlgebrique(c))})\\times${ecritureParentheseSiNegatif(d)}=${a}\\times${ecritureParentheseSiNegatif(b + c)}\\times${ecritureParentheseSiNegatif(d)}=${a * (b + c) * d}$`
          setReponse(this, i, a * (b + c) * d)
          break
        case 16: // a*b*(c+d)
          d = randint(11, 39) * choice([-1, 1])
          c = randint(2, 5) * choice([-1, 1]) - d
          a = randint(2, 5) * choice([-1, 1])
          b = randint(2, 5) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0 && d > 0) {
            d = randint(11, 39) * choice([-1, 1])
            c = randint(2, 5) * choice([-1, 1]) - d
            a = randint(2, 5) * choice([-1, 1])
            b = randint(2, 5) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times${ecritureParentheseSiNegatif(b)}\\times(${c}${ecritureAlgebrique(d)})=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times${ecritureParentheseSiNegatif(b)}\\times(${miseEnEvidence(
            c + ecritureAlgebrique(d),
          )})=${a}\\times${ecritureParentheseSiNegatif(b)}\\times${ecritureParentheseSiNegatif(c + d)}=${a * b * (c + d)}$`
          setReponse(this, i, a * b * (c + d))
          break
        case 17: // a*(b/c+d)
          a = randint(2, 11) * choice([-1, 1])
          c = randint(2, 11) * choice([-1, 1])
          b = c * randint(2, 5) * choice([-1, 1])
          d = randint(2, 6) * choice([-1, 1])
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times(${b}\\div${ecritureParentheseSiNegatif(c)}${ecritureAlgebrique(d)})=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times(${miseEnEvidence(
            b + '\\div' + ecritureParentheseSiNegatif(c),
          )}${ecritureAlgebrique(d)})=${a}\\times(${miseEnEvidence(
            b / c + ecritureAlgebrique(d),
          )})=${a}\\times${ecritureParentheseSiNegatif(b / c + d)}=${a * (b / c + d)}$`
          setReponse(this, i, a * (b / c + d))
          break
        case 18:
          {
            // a*b/(c+d)
            a = randint(2, 11)
            b = randint(2, 11)
            while (listeDesDiviseurs(a * b).length < 5) {
              a = randint(2, 11)
              b = randint(2, 11)
            }
            const liste = listeDesDiviseurs(a * b)
            if (liste.length > 2) {
              liste.pop() // on supprime le plus grand diviseur qui est le produit
              enleveElement(liste, a) // on supprime a
              enleveElement(liste, b) // on supprime b
            }
            const somme = choice(liste, [1]) * choice([-1, 1]) // la somme doit être un diviseur différent de 1
            c = randint(-30, 30, [0])
            d = somme - c
            while (a > 0 && b > 0 && c > 0 && d > 0) {
              c = randint(-30, 30, [0])
              d = somme - c
              a *= choice([-1, 1])
              b *= choice([-1, 1])
            }
            texte = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times${ecritureParentheseSiNegatif(b)}\\div(${c}${ecritureAlgebrique(d)})=$`
            texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${a}\\times${ecritureParentheseSiNegatif(b)}\\div(${miseEnEvidence(
              c + ecritureAlgebrique(d),
            )})=${miseEnEvidence(a + '\\times' + ecritureParentheseSiNegatif(b))}\\div${ecritureParentheseSiNegatif(c + d)}=${
              a * b
            }\\div${ecritureParentheseSiNegatif(c + d)}=${(a * b) / (c + d)}$`
            setReponse(this, i, (a * b) / (c + d))
          }
          break
        case 19: // a-(b+c)
          a = randint(1, 9) * choice([-1, 1])
          b = randint(1, 9) * choice([-1, 1])
          c = randint(1, 9) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(1, 9) * choice([-1, 1])
            b = randint(1, 9) * choice([-1, 1])
            c = randint(1, 9) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a}-(${b}${ecritureAlgebrique(c)})=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${a}-(${miseEnEvidence(b + ecritureAlgebrique(c))})=${a}-(${ecritureAlgebrique(b + c)})=${a + ecritureAlgebrique(-b - c)}=${a - b - c}$`
          setReponse(this, i, a - b - c)
          break
        case 20: // (a+b+c)*d
        default:
          a = randint(1, 9) * choice([-1, 1])
          b = randint(1, 9) * choice([-1, 1])
          c = randint(1, 9) * choice([-1, 1])
          d = randint(2, 5) * choice([-1, 1])
          while (a > 0 && b > 0 && c > 0) {
            a = randint(1, 9) * choice([-1, 1])
            b = randint(1, 9) * choice([-1, 1])
            c = randint(1, 9) * choice([-1, 1])
          }
          texte = `$${lettreDepuisChiffre(i + 1)} = (${a + ecritureAlgebrique(b) + ecritureAlgebrique(c)})\\times${ecritureParentheseSiNegatif(d)}=$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = (${miseEnEvidence(a + ecritureAlgebrique(b) + ecritureAlgebrique(c))})\\times${ecritureParentheseSiNegatif(d)}=${a + b + c}\\times${ecritureParentheseSiNegatif(d)}=${(a + b + c) * d} $`
          setReponse(this, i, (a + b + c) * d)
          break
      }
      texte += ajouteChampTexteMathLive(this, i, KeyboardType.clavierDeBase)
      if (this.sup2) {
        texte = `${lettreDepuisChiffre(i + 1)} = ${texte.substring(0, texte.length - 2) + '$'}`
        // On découpe
        const etapes = texteCorr.split('=')
        texteCorr = ''
        etapes.forEach(function (etape) {
          etape = etape.replace('$', '')
          if (context.isHtml) {
            texteCorr += '<br>'
          }
          texteCorr += `${lettreDepuisChiffre(i + 1)} = $${etape}$ <br>`
        })
      }
      if (this.questionJamaisPosee(i, listeTypeDeQuestions[i], a, b, c)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
