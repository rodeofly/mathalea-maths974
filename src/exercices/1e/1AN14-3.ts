import type { BoxedExpression } from '@cortex-js/compute-engine'
import engine, {
  functionCompare,
} from '../../lib/interactif/comparisonFunctions'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { Polynome } from '../../lib/mathFonctions/Polynome'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  ecritureAlgebrique,
  ecritureAlgebriqueSauf1,
} from '../../lib/outils/ecritures'
import { obtenirListeFractionsIrreductibles } from '../../modules/fractions'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = "Dérivée d'un polynôme"
export const dateDePublication = '06/05/2024'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Calculer la dérivée d'un polynome
 * @author Jean-Claude Lhote
 */

export const uuid = 'ec088'

export const refs = {
  'fr-fr': ['1AN14-3'],
  'fr-ch': ['3mA2-2'],
}
const termNames = ['u', 'v', 'w', 'z']

export default class DeriveePoly extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Types de fonctions',
      'Nombres séparés par des tirets :\n1 Constante\n2 : Affine\n3 : Degré 2\n4 : Degré 3\n5 : Deux monomes\n6 : Mélange',
    ]
    this.besoinFormulaire2CaseACocher = ['Coefficients rationnels', false]
    this.besoinFormulaire3CaseACocher = ['Coefficients décimaux', false]

    this.consigne =
      "Pour chacune des fonctions suivantes, déterminer l'expression de sa fonction dérivée."
    this.nbQuestions = 3
    // Sortie LaTeX

    this.spacing = 2
    this.spacingCorr = 2
    this.sup = '6'
    this.sup2 = false
    this.sup3 = false
    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = false
    // On modifie les règles de simplifications par défaut de math.js pour éviter 10x+10 = 10(x+1) et -4x=(-4x)
    // const reglesDeSimplifications = math.simplify.rules.slice()
    // reglesDeSimplifications.splice(reglesDeSimplifications.findIndex(rule => rule.l === 'n1*n2 + n2'), 1)
    // reglesDeSimplifications.splice(reglesDeSimplifications.findIndex(rule => rule.l === 'n1*n3 + n2*n3'), 1)
    // reglesDeSimplifications.push({ l: '-(n1*v)', r: '-n1*v' })
    // reglesDeSimplifications.push('-(n1/n2) -> -n1/n2')
  }

  nouvelleVersion() {
    const listeValeurs: string[] = [] // Les questions sont différentes du fait du nom de la fonction, donc on stocke les valeurs

    // Types d'énoncés
    const listeTypeDeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup,
      nbQuestions: this.nbQuestions,
      listeOfCase: ['const', 'poly1', 'poly2', 'poly3', 'monbis'],
      min: 1,
      max: 5,
      melange: 6,
      defaut: 1,
    }).map(String)
    for (
      let i = 0, texte, texteCorr, nameF, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      // On commence par générer des fonctions qui pourrait servir
      const listeFracs = obtenirListeFractionsIrreductibles()
      let coeffs
      let useFraction
      if (this.sup2) {
        if (this.sup3) useFraction = choice([true, false])
        else useFraction = true
      } else useFraction = false
      let useDecimal
      if (this.sup3) {
        if (useFraction) {
          useDecimal = choice([true, false])
          useFraction = !useDecimal
        } else useDecimal = true
      } else useDecimal = false
      if (useFraction) {
        coeffs = combinaisonListes(listeFracs, 4).slice(0, 4)
      } else {
        coeffs = [
          [10, true],
          [10, true],
          [10, true],
          [10, true],
        ]
      }
      let deg = randint(1, 2)
      const deuxCoeffs = coeffs.slice(0, 2)
      const troisCoeffs = coeffs.slice(0, 3)
      const unCoeff = coeffs.slice(0, 1)
      const dictFonctions = {
        poly1: new Polynome({
          rand: true,
          coeffs: deuxCoeffs,
          useFraction,
          useDecimal,
        }),
        poly2: new Polynome({
          rand: true,
          coeffs: troisCoeffs,
          useFraction,
          useDecimal,
        }),
        poly3: new Polynome({ rand: true, coeffs, useFraction, useDecimal }),
        const: new Polynome({
          rand: true,
          coeffs: unCoeff,
          useFraction,
          useDecimal,
        }),
        monbis: new Polynome(
          choice([
            {
              rand: true,
              coeffs: [coeffs[0], 0, coeffs[2], 0],
              useFraction,
              useDecimal,
            },
            {
              rand: true,
              coeffs: [0, coeffs[1], 0, coeffs[3]],
              useFraction,
              useDecimal,
            },
            {
              rand: true,
              coeffs: [0, 0, coeffs[2], coeffs[3]],
              useFraction,
              useDecimal,
            },
            {
              rand: true,
              coeffs: [0, coeffs[1], coeffs[2], 0],
              useFraction,
              useDecimal,
            },
          ]),
        ),
        poly: new Polynome({
          rand: true,
          coeffs: coeffs.slice(0, deg + 1),
          useFraction,
          useDecimal,
        }),
      }
      const poly = dictFonctions[listeTypeDeQuestions[i]]
      let expression = poly.toMathExpr()
      if (expression.startsWith('+')) expression = expression.substring(1)
      // Enoncé
      nameF = [
        'f',
        'g',
        'h',
        'l',
        'm',
        'p',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'b',
        'c',
        'd',
        'e',
      ][i % 16]
      const fExpr = engine.parse(expression) as unknown as BoxedExpression
      texte = `$${nameF}(x)=${fExpr != null ? fExpr.latex.replaceAll('.', '{,}') : 'Erreur dans la fonction'}$<br>`
      // Correction
      texteCorr = `$${nameF}$ est dérivable sur $\\R$.<br>`
      texteCorr +=
        'On rappelle le cours : si $u,v$ sont  deux fonctions dérivables sur un même intervalle $I$ alors leur somme est dérivable sur $I$ et on a la formule : '
      texteCorr += '\\[(u + v)^\\prime=u^\\prime+v^\\prime.\\]'
      let termes = []
      let termesD = []
      deg = poly.deg
      for (let p = 1; p < poly.monomes.length; p++) {
        if (poly.monomes[deg + 1 - p] !== 0) {
          termes.push(
            `${ecritureAlgebriqueSauf1(poly.monomes[deg + 1 - p])}${deg + 1 - p > 1 ? 'x^' + String(deg + 1 - p) : deg + 1 - p === 1 ? 'x' : ''}`,
          )
          const monomeD = poly.derivee().monomes[deg - p]
          termesD.push(
            `${deg - p > 1 ? ecritureAlgebriqueSauf1(monomeD) : ecritureAlgebrique(monomeD)}${deg - p > 1 ? 'x^' + String(deg - p) : deg - p === 1 ? 'x' : ''}`,
          )
        }
      }
      if (poly.monomes[0] !== 0) {
        termes.push(ecritureAlgebrique(poly.monomes[0]))
        termesD.push('0')
      }

      if (this.correctionDetaillee) {
        termes = termes.map((el) => (el.startsWith('+') ? el.substring(1) : el))
        termesD = termesD.map((el) =>
          el.startsWith('+') ? el.substring(1) : el,
        )
        if (termes.length > 1) {
          const fExpr = engine.parse(expression) as unknown as BoxedExpression
          texteCorr = `La fonction $${nameF}(x)=${fExpr.latex.replaceAll('.', '{,}')}$ est une somme de $${termes.length}$ termes.<br>${useFraction ? '<br>' : ''}`
          texteCorr +=
            'On rappelle que $(u+v)^\\prime=u^\\prime+v^\\prime$.<br>'
          for (let n = 0; n < termes.length; n++) {
            texteCorr += `$${termNames[n]}(x)=${termes[n]},\\ ${termNames[n]}^\\prime(x)=${termesD[n]}$.<br>${useFraction ? '<br>' : ''}`
          }
        } else {
          const fExpr = engine.parse(expression) as unknown as BoxedExpression
          texteCorr = `La fonction $${nameF}(x)=${fExpr.latex.replaceAll('.', '{,}')}$ est une fonction constante, sa dérivée est la fonction constante nulle.<br>`
        }
      } else {
        if (poly.monomes.length > 1) {
          texteCorr = `$${nameF}^\\prime(x)=${poly.detailleCalculDerivee()}$.<br>`
          texteCorr += 'On effectue les produits.<br>'
        } else {
          texteCorr = `La fonction $${nameF}(x)=${fExpr.latex.replaceAll('.', '{,}')}$ est une fonction constante, sa dérivée est la fonction constante nulle.<br>`
        }
      }
      texteCorr += `On obtient alors : $${nameF}^\\prime(x)=${poly.derivee().toLatex().replaceAll('.', '{,}')}$.`

      texte = texte.replaceAll('\\frac', '\\dfrac')
      texteCorr = texteCorr.replaceAll('\\frac', '\\dfrac')
      if (this.interactif) {
        texte +=
          `<br>${useFraction ? '<br>' : ''}` +
          ajouteChampTexteMathLive(this, i, '', {
            texteAvant: `$${nameF}'(x)=$`,
          })
      }
      handleAnswers(this, i, {
        reponse: { value: poly.derivee().toLatex(), compare: functionCompare },
      })

      if (listeValeurs.indexOf(expression) === -1) {
        listeValeurs.push(expression)
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
