import {
  tableauVariationsFonction,
  type Substitut,
} from '../../lib/mathFonctions/etudeFonction'
import { choice } from '../../lib/outils/arrayOutils'
import { abs } from '../../lib/outils/nombres'
import { sp } from '../../lib/outils/outilString'
import { context } from '../../modules/context'
import type FractionEtendue from '../../modules/FractionEtendue'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre =
  'Utiliser les variations des fonctions de référence pour comparer ou encadrer'
export const dateDePublication = '31/01/2022'
export const dateDeModifImportante = '12/07/2023'
/**
 *
 * @author Gilles Mora, Louis Paternault
 */
export const uuid = '1ca05'

export const refs = {
  'fr-fr': ['2F31-2'],
  'fr-ch': ['2mIneq-5'],
}
export default class EncadrerAvecFctRef extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Type de questions ',
      'Nombres séparés par des tirets :\n1 : Carré\n2 : Inverse\n3 : Racine carrée\n4 : Cube\n5 : Mélange',
    ]
    this.besoinFormulaire2CaseACocher = ["Pas d'inégalités doubles"]
    this.nbQuestions = 3
    this.sup = 5
    this.sup2 = false
    context.isHtml ? (this.spacing = 2) : (this.spacing = 1)
    context.isHtml ? (this.spacingCorr = 2.2) : (this.spacingCorr = 1)
  }

  nouvelleVersion() {
    const listeTypeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup,
      max: 4,
      melange: 5,
      defaut: 1,
      nbQuestions: this.nbQuestions,
      listeOfCase: ['carré', 'inverse', 'racine carrée', 'cube'],
    })
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      // Boucle principale où i+1 correspond au numéro de la question
      // les variables communes à toutes les questions
      let fonction // La fonction étudiée
      let derivee // Sa dérivée
      let xMin // La borne gauche de l'intervalle d'étude (prévoir une valeur de remplacement pour les infinis + et -)
      let xMax // La borne droite de l'intervalle d'étude
      let substituts: Substitut[] = [] // les valeur de substitution pour xMin ou xMax...
      let tolerance // la tolérance doit être réglée au cas par cas, car pour la dérivée de 1/x entre 17 et 19 par exemple, il y a trop peu de différence avec zéro !
      let texteCorrAvantTableau // la partie de la correction avant le tableau
      let texteCorrApresTableau // la partie de la correction après le tableau
      let a, b // Les valeurs seuils
      const large1 = choice([true, false]) // pour décider des inégalités larges ou pas
      const large2 = choice([true, false])

      switch (
        listeTypeQuestions[i] // Suivant le type de question, le contenu sera différent
      ) {
        case 'carré':
          {
            let N = choice([1, 2, 3, 4, 5])
            if (this.sup2) N = choice([1, 2])
            fonction = (x: number) => x ** 2
            derivee = (x: number) => 2 * x
            tolerance = 0.005
            switch (N) {
              case 1: // cas x<a avec a<0 ou a>0
                a = randint(-12, 12, 0)
                xMin = -200
                xMax = a
                substituts = [
                  {
                    antVal: -200,
                    antTex: '$-\\infty$',
                    imgTex: ' ',
                  },
                ]
                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${large1 ? '\\leqslant' : ' < '}${a}$ alors,  $x^2$ ......`
                texteCorrAvantTableau = `$x${large1 ? '\\leqslant' : ' < '} ${a}$ signifie $x\\in ]-\\infty;${a}${large1 ? ']' : ' [ '}$. <br>
                Puisque la fonction carré est strictement décroissante sur $]-\\infty;0]$ et strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                    sur l'intervalle $]-\\infty;${a}]$ : <br>
                `
                if (a < 0) {
                  texteCorrApresTableau = `<br>On constate que le minimum de $x^2$ sur $]-\\infty;${a}]$ est $${a ** 2}$. <br>
            On en déduit que si  $x${large1 ? '\\leqslant' : ' < '}${a}$ alors,  $x^2\\geqslant ${a ** 2}$.
            <br> Remarque :  la fonction carré étant strictement décroissante sur $]-\\infty;0]$, elle change l'ordre.<br>
            Ainsi, les antécédents et les images sont rangés dans l'ordre inverse. <br>
            Si $x${large1 ? '\\leqslant' : ' < '}${a}$ alors, $x^2\\geqslant (${a})^2$ soit $x^2\\geqslant ${a ** 2}$.`
                } else {
                  texteCorrApresTableau = `<br>On constate que le minimum de $x^2$ sur $]-\\infty;${a}]$ est $0$. <br>
        On en déduit que si  $x${large1 ? '\\leqslant' : ' < '}${a}$ alors, $x^2\\geqslant 0$.`
                }

                break
              case 2: // cas x>a
                a = randint(-12, 12, 0)
                xMin = a
                xMax = 200
                substituts = [
                  {
                    antVal: 200,
                    antTex: '$+\\infty$',
                    imgTex: ' ',
                  },
                ]
                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${large1 ? '\\geqslant' : ' > '}${a}$ alors,  $x^2$ ......`
                texteCorrAvantTableau = `$x${large1 ? '\\geqslant' : ' > '} ${a}$ signifie $x\\in ${large1 ? '[' : ' ] '}${a};+\\infty[$. <br>
                Puisque la fonction carré est strictement décroissante sur $]-\\infty;0]$ et strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                    sur l'intervalle $[${a};+\\infty[$ : <br>
                `
                if (a > 0) {
                  texteCorrApresTableau = `<br>On constate que le minimum de $x^2$ sur $[${a};+\\infty[$ est $${a ** 2}$. <br>
            On en déduit que si  $x${large1 ? '\\geqslant' : ' > '}${a}$ alors, $x^2${large1 ? '\\geqslant' : ' > '} ${a ** 2}$.
            <br> Remarque :  la fonction carré étant strictement croissante sur $[0;+\\infty[$, elle conserve l'ordre sur cet intervalle.<br>
            Ainsi, les antécédents et les images sont rangés dans le même ordre. <br>
          Si  $x${large1 ? '\\geqslant' : ' > '}${a}$ alors, $x^2${large1 ? '\\geqslant' : ' > '} ${a}^2$ soit  $x^2${large1 ? '\\geqslant' : ' > '} ${a ** 2}$.`
                } else {
                  texteCorrApresTableau = `<br>On constate que le minimum de $x^2$ sur $[${a};+\\infty[$ est $0$. <br>
          On en déduit que si  $x${large1 ? '\\geqslant' : ' > '}${a}$ alors, $x^2\\geqslant 0$.
          `
                }

                break
              case 3: // cas a<x<b avec a>0
                a = randint(1, 10)
                b = randint(a + 1, 12)
                xMin = a
                xMax = b
                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, ${sp(3)} .......  $x^2$ ........`
                texteCorrAvantTableau = `$${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${large1 ? '[' : ' ] '}${a};${b}${large2 ? ']' : ' [ '}$. <br>
                  Puisque la fonction carré est strictement décroissante sur $]-\\infty;0]$ et strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                      sur l'intervalle $[${a};${b}]$ : <br>`
                texteCorrApresTableau = `<br>On constate que le minimum de $x^2$ sur $[${a};${b}]$  est $${a ** 2}$ et son maximum est $${b ** 2}$. <br>
              On en déduit que si  $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, ${sp(2)}$${a ** 2} ${large1 ? '\\leqslant' : ' < '} x^2 ${large2 ? '\\leqslant' : ' < '}${b ** 2}$.
              <br> Remarque : la fonction carré étant strictement croissante sur $[0;+\\infty[$, elle conserve l'ordre sur cet intervalle.<br>
              Ainsi, les antécédents et les images sont rangés dans le même ordre. <br>
            Si  $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, $${sp(2)}${a}^2 ${large1 ? '\\leqslant' : ' < '} x^2 ${large2 ? '\\leqslant' : ' < '}${b}^2$, soit $${sp(2)}${a ** 2} ${large1 ? '\\leqslant' : ' < '} x^2 ${large2 ? '\\leqslant' : ' < '}${b ** 2}$.`

                break
              case 4: // cas a<x<b avec b<0
                a = -randint(2, 12)
                b = randint(a + 1, -1)
                xMin = a
                xMax = b
                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, ${sp(3)} .......  $x^2$  .......`
                texteCorrAvantTableau = `$${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${large1 ? '[' : ' ] '}${a};${b}${large2 ? ']' : ' [ '}$. <br>
                      Puisque la fonction carré est strictement décroissante sur $]-\\infty;0]$ et strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                          sur l'intervalle $[${a};${b}]$ : <br>`
                texteCorrApresTableau = `<br>On constate que le minimum de $x^2$ sur $[${a};${b}]$  est $${b ** 2}$ et son maximum est $${a ** 2}$. <br>
                  On en déduit que si  $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, ${sp(2)}$${b ** 2} ${large2 ? '\\leqslant' : ' < '} x^2 ${large1 ? '\\leqslant' : ' < '}${a ** 2}$.
                  <br> Remarque :  la fonction carré étant strictement décroissante sur $]-\\infty;0]$, elle change l'ordre sur cet intervalle.<br>
                  Ainsi, les antécédents et les images sont rangés dans l'ordre inverse. <br>
            Si $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, ${sp(2)}$(${a})^2 ${large1 ? '\\geqslant' : ' > '} x^2 ${large2 ? '\\geqslant' : ' > '}(${b})^2$ soit $${a ** 2} ${large1 ? '\\geqslant' : ' > '} x^2 ${large2 ? '\\geqslant' : ' > '}${b ** 2}$.`

                break
              case 5: // cas a<x<b avec a<0 et b>0
              default:
                a = randint(-10, -1)
                b = randint(1, 10)
                xMin = a
                xMax = b
                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, ${sp(3)} .......  $x^2$ ........`
                texteCorrAvantTableau = `$${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${large1 ? '[' : ' ] '}${a};${b}${large2 ? ']' : ' [ '}$. <br>
                  Puisque la fonction carré est strictement décroissante sur $]-\\infty;0]$ et strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
                      sur l'intervalle $[${a};${b}]$ : <br>
                  `
                texteCorrApresTableau = `<br>On constate que le minimum de $x^2$ sur $[${a};${b}]$  est $0$ et son maximum est $${Math.max(abs(a), b) ** 2}$. <br>
              On en déduit que si  $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, ${sp(2)}$0 ${large1 ? '\\leqslant' : ' < '} x^2 ${large2 ? '\\leqslant' : ' < '}${Math.max(abs(a), b) ** 2}$.`

                break
            }
          }
          break
        case 'inverse': {
          let N = choice([1, 2, 3])
          if (this.sup2) N = 3
          fonction = (x: number) => 1 / x
          derivee = (x: number) => -1 / x / x
          tolerance = 0.000001
          switch (N) {
            case 1: // cas a<x<b avec a>0
              a = randint(2, 20)
              b = randint(a + 1, 20)
              substituts = [
                {
                  antVal: a,
                  antTex: a.toString(),
                  imgVal: 1 / a,
                  imgTex: `$\\frac{1}{${a}}$`,
                },
                {
                  antVal: b,
                  antTex: b.toString(),
                  imgVal: 1 / b,
                  imgTex: `$\\frac{1}{${b}}$`,
                },
              ]
              texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, ${sp(3)} .......  $\\dfrac{1}{x}$  .......`
              texteCorrAvantTableau = `$${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${large1 ? '[' : ' ] '}${a};${b}${large2 ? ']' : ' [ '}$. <br>
                      Puisque la fonction inverse est strictement décroissante sur $]-\\infty;0[$ et strictement décroissante sur $[0;+\\infty[$, on obtient son tableau de variations
                          sur l'intervalle $[${a};${b}]$ : <br>
                      `
              texteCorrApresTableau = `<br>On constate que le minimum de $\\dfrac{1}{x}$ sur $[${a};${b}]$  est $\\dfrac{1}{${b}}$ et son maximum est $\\dfrac{1}{${a}}$. <br>
                  On en déduit que si  $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, ${sp(2)}$\\dfrac{1}{${b}} ${large2 ? '\\leqslant' : ' < '} \\dfrac{1}{x} ${large1 ? '\\leqslant' : ' < '}\\dfrac{1}{${a}}$.
                  <br> Remarque :  la fonction inverse étant strictement décroissante sur $]0; +\\infty[$, elle change l'ordre.<br>
                  Ainsi, les antécédents et les images sont rangés dans l'ordre inverse. <br>
            Si $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, ${sp(2)}$\\dfrac{1}{${a}} ${large1 ? '\\geqslant' : ' > '} \\dfrac{1}{x} ${large2 ? '\\geqslant' : ' > '}\\dfrac{1}{${b}}$. `
              break
            case 2: // cas a<x<b avec b<0
              a = randint(-20, -3)
              b = randint(a + 1, -2)
              substituts = [
                {
                  antVal: a,
                  antTex: a.toString(),
                  imgVal: 1 / a,
                  imgTex: `$-\\frac{1}{${-a}}$`,
                },
                {
                  antVal: b,
                  antTex: b.toString(),
                  imgVal: 1 / b,
                  imgTex: `$-\\frac{1}{${-b}}$`,
                },
              ]
              texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, ${sp(3)} .......  $\\dfrac{1}{x}$  .......`
              texteCorrAvantTableau = `$${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${large1 ? '[' : ' ] '}${a};${b}${large2 ? ']' : ' [ '}$. <br>
                      Puisque la fonction inverse est strictement décroissante sur $]-\\infty;0[$ et strictement décroissante sur $[0;+\\infty[$, on obtient son tableau de variations
                          sur l'intervalle $[${a};${b}]$ : <br>`
              texteCorrApresTableau = `<br>On constate que le minimum de $\\dfrac{1}{x}$ sur $[${a};${b}]$  est $-\\dfrac{1}{${-b}}$ et son maximum est $-\\dfrac{1}{${-a}}$. <br>
                  On en déduit que si  $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, ${sp(2)}$-\\dfrac{1}{${-b}} ${large2 ? '\\leqslant' : ' < '} \\dfrac{1}{x} ${large1 ? '\\leqslant' : ' < '}-\\dfrac{1}{${-a}}$.
                  <br> Remarque :  la fonction inverse étant strictement décroissante sur $]-\\infty;0[$, elle change l'ordre.<br>
                  Ainsi, les antécédents et les images sont rangés dans l'ordre inverse. <br>
            Si $${a} ${large1 ? '\\leqslant' : ' < '} x ${large2 ? '\\leqslant' : ' < '}${b}$ alors, ${sp(2)}$-\\dfrac{1}{${-a}} ${large1 ? '\\geqslant' : ' > '} \\dfrac{1}{x} ${large2 ? '\\geqslant' : ' > '}-\\dfrac{1}{${-b}}$. `
              break
            case 3: // cas x<a avec a<0 ou x>a avec a>0
            default:
              a = -200
              b = randint(-12, -2) // -\infty et b négatifs
              if (choice([true, false])) {
                // b et +\infty positifs
                const aTemp = -a
                a = -b
                b = aTemp
                substituts = [
                  {
                    antVal: a,
                    antTex: a.toString(),
                    imgVal: 1 / a,
                    imgTex: `$\\frac{1}{${a}}$`,
                  },
                  {
                    antVal: b,
                    antTex: '$+\\infty$',
                    imgVal: 1 / b,
                    imgTex: '',
                  },
                ]
                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${large1 ? '\\geqslant' : ' > '}${a}$ alors, $\\dfrac{1}{x}$ ......`
                texteCorrAvantTableau = `$x${large1 ? '\\geqslant' : ' > '} ${a}$ signifie $x\\in ${large1 ? '[' : ' ] '}${a};+\\infty[$. <br>
              Puisque la fonction inverse est strictement décroissante sur $]0;+\\infty[$, on obtient son tableau de variations
                  sur l'intervalle $]0;+\\infty[$ : <br>`
                texteCorrApresTableau = `<br>On constate que le maximum de $\\dfrac{1}{x}$ sur $]0;+\\infty[$ est $\\dfrac{1}{${a}}$. <br>
            On en déduit que si  $x${large1 ? '\\geqslant' : ' < '}${a}$ alors,  $\\dfrac{1}{x}${large1 ? '\\leqslant' : ' < '} \\dfrac{1}{${a}}$.
            <br> Remarque :  la fonction inverse étant strictement décroissante sur $]0;+\\infty[$, elle change l'ordre.<br>
            Ainsi, les antécédents et les images sont rangés dans l'ordre inverse. <br>
            Si $x${large1 ? '\\geqslant' : ' > '}${a}$ alors,  $\\dfrac{1}{x}${large1 ? '\\leqslant' : ' < '}\\dfrac{1}{${a}}$.`
              } else {
                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${large1 ? '\\leqslant' : ' < '}${b}$ alors,  $\\dfrac{1}{x}$ ......`
                texteCorrAvantTableau = `$x${large1 ? '\\leqslant' : ' < '} ${b}$ signifie $x\\in ]-\\infty;${b}${large1 ? ']' : ' [ '}$. <br>
              Puisque la fonction inverse est strictement décroissante sur $]-\\infty;0[$ et strictement décroissante sur $]0;+\\infty[$, on obtient son tableau de variations
                  sur l'intervalle $]-\\infty;${b}]$ : <br>`
                texteCorrApresTableau = `<br>On constate que le minimum de $\\dfrac{1}{x}$ sur $]-\\infty;${b}]$ est $-\\dfrac{1}{${-b}}$. <br>
            On en déduit que si  $x${large1 ? '\\leqslant' : ' < '}${b}$ alors,  $\\dfrac{1}{x}${large1 ? '\\geqslant' : ' > '} -\\dfrac{1}{${-b}}$.
            <br> Remarque :  la fonction inverse étant strictement décroissante sur $]-\\infty;0[$, elle change l'ordre.<br>
            Ainsi, les antécédents et les images sont rangés dans l'ordre inverse. <br>
            Si $x${large1 ? '\\leqslant' : ' < '}${b}$ alors,  $\\dfrac{1}{x}${large1 ? '\\geqslant' : ' > '}-\\dfrac{1}{${-b}}$.`
                substituts = [
                  {
                    antVal: a,
                    antTex: '$-\\infty$',
                    imgTex: ' ',
                  },
                  {
                    antVal: a,
                    antTex: b.toString(),
                    imgVal: 1 / b,
                    imgTex: `$\\frac{1}{${b}}$`,
                  },
                ]
              } // a est toujours le min et b le max

              break
          }
          xMin = a
          xMax = b
          break
        }
        case 'racine carrée': {
          const estParfait = (a: number) => Number.isInteger(Math.sqrt(a))
          let N = choice([1, 2, 3])
          if (this.sup2) N = choice([1, 2])
          fonction = (x: number) => Math.sqrt(x)
          derivee = (x: number) => 1 / 2 / Math.sqrt(x)
          tolerance = 0.005
          switch (N) {
            case 1:
              {
                // cas x<a
                a = randint(1, 100)
                const racineDeA = estParfait(a)
                  ? Math.sqrt(a).toString()
                  : `\\sqrt{${a}}`
                substituts = [
                  {
                    antVal: a,
                    antTex: a.toString(),
                    imgVal: Math.sqrt(a),
                    imgTex: `$${racineDeA}$`,
                  },
                ]
                xMin = 0
                xMax = a
                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${large1 ? '\\leqslant' : ' < '}${a}$
               alors,  $\\sqrt{x}$ ......`
                texteCorrAvantTableau = `$x${large1 ? '\\leqslant' : ' < '} ${a}$ signifie $x\\in [0;${a}${large1 ? ']' : ' [ '}$ puisque $x\\geqslant 0$. <br>
Puisque la fonction racine carrée est strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
sur l'intervalle $[0;${a}]$ : <br>`
                texteCorrApresTableau = `<br>On constate que le maximum de $\\sqrt{x}$ sur $[0;${a}]$ est $${racineDeA}$. <br>
On en déduit que si  $x${large1 ? '\\leqslant' : ' < '}${a}$ alors,  $\\sqrt{x}\\leqslant ${racineDeA}$.
<br> Remarque :  la fonction racine carrée étant strictement croissante sur $[0+\\infty[$, elle conserve l'ordre.<br>
Ainsi, les antécédents et les images sont rangés dans le même ordre : <br>
Si $x${large1 ? '\\leqslant' : ' < '}${a}$ alors,  $\\sqrt{x}${large1 ? '\\leqslant' : ' < '} ${racineDeA}$.`
              }
              break
            case 2:
              {
                // cas x>a
                a = randint(0, 100)
                xMin = a
                xMax = 10000
                const racineDeA = estParfait(a)
                  ? Math.sqrt(a).toString()
                  : `\\sqrt{${a}}`
                substituts = [
                  {
                    antVal: a,
                    antTex: a.toString(),
                    imgVal: Math.sqrt(a),
                    imgTex: `$${racineDeA}$`,
                  },
                  {
                    antVal: 10000,
                    antTex: '$+\\infty$',
                    imgTex: ' ',
                  },
                ]

                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${large1 ? '\\geqslant' : ' > '}${a}$
               alors,  $\\sqrt{x}$ ......`
                texteCorrAvantTableau = `$x${large1 ? '\\geqslant' : ' > '} ${a}$ signifie $x\\in ${large1 ? '[' : ' ] '}${a};+\\infty[$. <br>
Puisque la fonction racine carrée est strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
sur l'intervalle $[${a};+\\infty[$ : <br>`
                texteCorrApresTableau = `<br>On constate que le minimum de $\\sqrt{x}$ sur $[${a};+\\infty[$ est $${racineDeA}$. <br>
On en déduit que si  $x${large1 ? '\\geqslant' : ' > '}${a}$ alors,  $\\sqrt{x}\\geqslant ${racineDeA}$.
<br> Remarque :  la fonction racine carrée étant strictement croissante sur $[0+\\infty[$, elle conserve l'ordre.<br>
Ainsi, les antécédents et les images sont rangés dans le même ordre : <br>
Si $x${large1 ? '\\geqslant' : ' > '}${a}$ alors,  $\\sqrt{x}${large1 ? '\\geqslant' : ' > '} ${racineDeA}$.`
              }
              break
            case 3:
            default:
              {
                // cas a<x<b
                a = randint(0, 98)
                b = randint(a + 1, 100)
                xMin = a
                xMax = b
                const racineDeA = estParfait(a)
                  ? Math.sqrt(a).toString()
                  : `\\sqrt{${a}}`
                const racineDeB = estParfait(b)
                  ? Math.sqrt(b).toString()
                  : `\\sqrt{${b}}`
                substituts = [
                  {
                    antVal: a,
                    antTex: a.toString(),
                    imgVal: Math.sqrt(a),
                    imgTex: `$${racineDeA}$`,
                  },
                  {
                    antVal: b,
                    antTex: b.toString(),
                    imgVal: Math.sqrt(b),
                    imgTex: `$${racineDeB}$`,
                  },
                ]

                texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${a}${large1 ? ' \\leqslant ' : ' < '} x ${large1 ? '\\leqslant' : ' < '} ${b}$
               alors,  ...... $\\sqrt{x}$ ......`
                texteCorrAvantTableau = `$${a}${large1 ? '\\leqslant' : ' < '} x ${large1 ? '\\leqslant' : ' < '}${b}$ signifie $x\\in ${large1 ? '[' : ' ] '}${a};${b}${large1 ? ']' : ' [ '}$. <br>
Puisque la fonction racine carrée est strictement croissante sur $[0;+\\infty[$, on obtient son tableau de variations
sur l'intervalle $[${a};${b}]$ : <br>`
                texteCorrApresTableau = `<br>On constate que le minimum de $\\sqrt{x}$ sur $[${a};${b}]$ est $${racineDeA}$ et son maximum est $${racineDeB}$. <br>
On en déduit que si $${a}${large1 ? '\\leqslant' : ' < '} x ${large1 ? '\\leqslant' : ' < '}${b}$ alors, $${racineDeA}${large1 ? '\\leqslant' : ' < '} \\sqrt{x} ${large1 ? '\\leqslant' : ' < '}${racineDeB}$.
<br> Remarque :  la fonction racine carrée étant strictement croissante sur $[0+\\infty[$, elle conserve l'ordre.<br>
Ainsi, les antécédents et les images sont rangés dans le même ordre : <br>
Si $${a}${large1 ? '\\leqslant' : ' < '} x ${large1 ? '\\leqslant' : ' < '}${b}$ alors,  $${racineDeA}${large1 ? '\\leqslant' : ' < '} \\sqrt{x} ${large1 ? '\\leqslant' : ' < '}${racineDeB}$.`
              }
              break
          }
          break
        }
        case 'cube':
        default: {
          let N = choice([1, 2])
          if (this.sup2) N = 1
          fonction = (x: number) => x ** 3
          derivee = (x: number) => 3 * x ** 2
          tolerance = 0.005
          if (N === 1) {
            // cas x<a ou x>a
            const a = choice([
              randint(-10, 10),
              randint(11, 20) * choice([-1, 1]),
            ])
            const inférieur = choice([true, false]) // x < a ou x > a ?
            if (inférieur) {
              xMin = -200 // a peut aller jusqu'à -100 !
              xMax = a
              substituts = [
                {
                  antVal: -200,
                  antTex: '$-\\infty$',
                  imgTex: ' ',
                },
              ]
            } else {
              xMin = a
              xMax = 200
              substituts = [
                {
                  antVal: 200,
                  antTex: '$+\\infty$',
                  imgTex: ' ',
                },
              ]
            }
            let symbole
            let intervalle
            if (large1 && inférieur) {
              symbole = '\\leqslant'
              intervalle = `]-\\infty ; ${a}]`
            } else if (large1 && !inférieur) {
              symbole = '\\geqslant'
              intervalle = `[${a} ; +\\infty[`
            } else if (!large1 && inférieur) {
              symbole = '<'
              intervalle = `]-\\infty ; ${a}[`
            } else {
              // (! large) && (! inférieur)
              symbole = '>'
              intervalle = `]${a} ; +\\infty[`
            }
            texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $x${symbole}${a}$ alors, $x^3$ ......`
            texteCorrAvantTableau = `$x${symbole} ${a}$ signifie $x\\in ${intervalle}$. <br>
Puisque $(${a})^3=${Math.pow(a, 3)}$ et que la fonction cube est strictement croissante sur $\\mathbb{R}$, on obtient son tableau de variations
sur l'intervalle $]-\\infty;${a}]$ : <br>`
            texteCorrApresTableau = `<br>On constate que le ${inférieur ? ' maximum ' : ' minimum '} de $x^3$ sur $${intervalle}$ est $${Math.pow(a, 3)}$. <br>
On en déduit que si  $x${symbole}${a}$ alors,  $x^3${symbole} ${Math.pow(a, 3)}$.
<br> Remarque :  la fonction cube étant strictement croissante sur $\\mathbb{R}$, elle conserve l'ordre.<br>
Ainsi, les antécédents et les images sont rangés dans le même ordre : <br>
Si $x${symbole}${a}$ alors,  $x^3${symbole} ${Math.pow(a, 3)}$.`
          } else {
            // cas a<x<b
            let a, b
            do {
              a = choice([randint(-10, 10), randint(11, 20) * choice([-1, 1])])
              b = choice([randint(-10, 10), randint(11, 20) * choice([-1, 1])])
            } while (a === b)
            if (a > b) {
              ;[a, b] = [b, a]
            }
            ;[xMin, xMax] = [a, b]
            const inférieur = choice([true, false]) // a < x < b ou b > x > a ?
            substituts = []
            let inégalité
            let intervalle
            if (large1 && inférieur) {
              inégalité = `${a} \\leqslant x \\leqslant ${b}`
              intervalle = `[${a} ; ${b}]`
            } else if (large1 && !inférieur) {
              inégalité = `${b} \\geqslant x \\geqslant ${a}`
              intervalle = `[${a} ; ${b}]`
            } else if (!large1 && inférieur) {
              inégalité = `${a} < x < ${b}`
              intervalle = `]${a} ; ${b}[`
            } else {
              // (! large) && (! inférieur)
              inégalité = `${b} > x > ${a}`
              intervalle = `]${a} ; ${b}[`
            }
            texte = `Compléter par l'information la plus précise possible (on pourra utiliser un tableau de variations) : <br>Si $${inégalité}$ alors, $x^3$ ......`
            texteCorrAvantTableau = `$${inégalité}$ signifie $x\\in ${intervalle}$. <br>
Puisque $(${a})^3=${Math.pow(a, 3)}$ et $(${b})^3=${Math.pow(b, 3)}$, et que la fonction cube est strictement croissante sur $\\mathbb{R}$, on obtient son tableau de variations
sur l'intervalle $${intervalle}$ : <br>`
            texteCorrApresTableau = `<br>On constate que le minimum de $x^3$ sur $${intervalle}$ est $${Math.pow(a, 3)}$, et son maximum sur le même intervalle est $${Math.pow(b, 3)}$. <br>
On en déduit que si  $${inégalité}$ alors, $${Math.pow(a, 3)} ${large1 ? ' \\leqslant ' : ' < '} x^3 ${large1 ? ' \\leqslant ' : ' < '} ${Math.pow(b, 3)}$.
<br> Remarque :  la fonction cube étant strictement croissante sur $\\mathbb{R}$, elle conserve l'ordre.<br>
Ainsi, les antécédents et les images sont rangés dans le même ordre : <br>
Si $${inégalité}$ alors, $${Math.pow(a, 3)} ${large1 ? ' \\leqslant ' : ' < '} x^3 ${large1 ? ' \\leqslant ' : ' < '} ${Math.pow(b, 3)}$.`
          }
          break
        }
      }
      const tableau = tableauVariationsFonction(
        fonction as (x: number | FractionEtendue) => number,
        derivee as (x: number | FractionEtendue) => number,
        xMin,
        xMax,
        {
          substituts,
          step: 1,
          tolerance,
        },
      )
      texteCorr = texteCorrAvantTableau + tableau + texteCorrApresTableau
      if (this.questionJamaisPosee(i, this.listeQuestions[i], xMin, xMax)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
