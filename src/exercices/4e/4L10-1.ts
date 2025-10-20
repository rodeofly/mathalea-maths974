import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  ecritureAlgebrique,
  ecritureParentheseSiMoins,
  ecritureParentheseSiNegatif,
  rienSi1,
} from '../../lib/outils/ecritures'
import { lettreDepuisChiffre } from '../../lib/outils/outilString'
import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { setReponse } from '../../lib/interactif/gestionInteractif'

export const titre =
  'Réduire et simplifier, si possible, une expression littérale simple'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Réduire et simplifier, si possible, une expression littérale simple
 *
 * * ax+b
 * * a+bx
 * * ax-a
 * * ax+bx
 * * ax+x
 * * ax×b
 * * a×bx
 * * ax×bx
 * * ax+0
 * * ax×0
 * * ax^2×x
 * * ax^2-a
 * * ax^2-ax
 *
 *
 * @author Rémi Angot
 */
export const uuid = 'cc129'

export const refs = {
  'fr-fr': ['4L10-1', 'BP2AutoI12'],
  'fr-ch': ['10FA1-15'],
}
export default class ReductionsPiegesClassiques extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = ['Avec des nombres relatifs']

    this.sup = true
    this.listeAvecNumerotation = false
  }

  nouvelleVersion() {
    this.consigne = 'Réduire et simplifier, si possible, '
    this.consigne +=
      this.nbQuestions > 1
        ? 'les expressions suivantes.'
        : "l'expression suivante."

    const typesDeQuestionsDisponibles = [
      'ax+b',
      'a+bx',
      'ax-a',
      'ax+bx',
      'ax+x',
      'ax×b',
      'a×bx',
      'ax×bx',
      'ax+0',
      'ax×0',
      'ax^2×x',
      'ax^2-a',
      'ax^2-ax^2',
    ]
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )
    let typesDeQuestions // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]
      a = randint(2, 11)
      b = randint(2, 11)
      if (this.sup) {
        a *= choice([-1, 1])
        b *= choice([-1, 1])
      }
      let reponse
      const saufD = this.interactif
      switch (typesDeQuestions) {
        case 'ax+b':
          texte = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}x${ecritureAlgebrique(b)}$`
          texteCorr = texte
          reponse = `${a}x${ecritureAlgebrique(b)}`
          break
        case 'a+bx':
          texte = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}${ecritureAlgebrique(b)}x$`
          texteCorr = texte
          reponse = `${a}${ecritureAlgebrique(b)}x`
          break
        case 'ax-a':
          texte = `$${lettreDepuisChiffre(i + 1, saufD)}=${Math.abs(a)}x-${Math.abs(a)}$`
          texteCorr = texte
          reponse = `${Math.abs(a)}x-${Math.abs(a)}`
          break
        case 'ax+bx':
          texte = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}x${ecritureAlgebrique(b)}x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}x${ecritureAlgebrique(b)}x=${rienSi1(a + b)}x$`
          reponse = `${rienSi1(a + b)}x`
          break
        case 'ax+x':
          texte = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}x+x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}x+x=${a + 1}x$`
          reponse = `${a + 1}x`
          break
        case 'ax×b':
          texte = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}x\\times${ecritureParentheseSiNegatif(b)}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}x\\times${ecritureParentheseSiNegatif(b)}=${a * b}x$`
          reponse = `${a * b}x`
          break
        case 'a×bx':
          texte = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}\\times${ecritureParentheseSiMoins(b + 'x')}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}\\times${ecritureParentheseSiMoins(b + 'x')}=${a * b}x$`
          reponse = `${a * b}x`
          break
        case 'ax×bx':
          texte = `$${lettreDepuisChiffre(i + 1, saufD)}=${a + 'x'}\\times${ecritureParentheseSiMoins(b + 'x')}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1, saufD)}=${a + 'x'}\\times${ecritureParentheseSiMoins(b + 'x')}=${a * b}x^2$`
          reponse = `${a * b}x^2`
          break
        case 'ax+0':
          texte = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}x+0$`
          texteCorr = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}x+0=${a}x$`
          reponse = `${a}x`
          break
        case 'ax×0':
          texte = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}x\\times 0$`
          texteCorr = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}x\\times 0=0$`
          reponse = '0'
          break
        case 'ax^2×x':
          texte = `$${lettreDepuisChiffre(i + 1, saufD)}=${a + 'x^2'}\\times x$`
          texteCorr = `$${lettreDepuisChiffre(i + 1, saufD)}=${a + 'x^2'}\\times x=${a + 'x^3'}$`
          reponse = `${a + 'x^3'}`
          break
        case 'ax^2-a':
          a = Math.abs(a)
          texte = `$${lettreDepuisChiffre(i + 1, saufD)}=${a + 'x^2'}-${a}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1, saufD)}=${a + 'x^2'}-${a}$`
          reponse = `${a + 'x^2'}-${a}`
          break
        case 'ax^2-ax^2':
        default:
          a = Math.abs(a)
          texte = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}x^2-${a}x^2$`
          texteCorr = `$${lettreDepuisChiffre(i + 1, saufD)}=${a}x^2-${a}x^2=0$`
          reponse = '0'
          break
      }

      if (this.interactif) {
        reponse = [
          reponse,
          `${lettreDepuisChiffre(i + 1, saufD)}=${reponse}`.replace('D=', 'd='),
        ]
        setReponse(this, i, reponse)
        texte += ajouteChampTexteMathLive(this, i, ' ', { texteAvant: ' $=$' })
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
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
