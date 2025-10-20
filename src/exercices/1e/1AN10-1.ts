import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  ecritureAlgebrique,
  ecritureAlgebriqueSauf1,
  ecritureParentheseSiNegatif,
  reduireAxPlusB,
} from '../../lib/outils/ecritures'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Taux de variation des fonctions de référence'
export const interactifType = 'mathLive'
export const interactifReady = true

export const dateDePublication = '16/12/2021'
export const dateDeModifImportante = '06/02/2025'

/*
 * Calculer un taux de variation
 * Passage en typescript le 06/02°2025 + ajout des miseEnEvidence + interactivité Jean-Claude Lhote
 */

export const uuid = '29202'

export const refs = {
  'fr-fr': ['1AN10-1'],
  'fr-ch': ['3mA2-1'],
}

export default class Tauxvariation extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Type de fonctions ',
      5,
      '1 : Fonction affine\n 2 : Fonction carré\n 3: Fonction inverse\n 4: Fonction racine carrée\n 5: Mélange',
    ]

    this.nbQuestions = 1 // Nombre de questions par défaut

    this.sup = 1
  }

  nouvelleVersion() {
    let typesDeQuestionsDisponibles = [1, 2, 3, 4]
    // this.sup = contraindreValeur(1, 5, this.sup, 5)
    if (this.sup !== 5) typesDeQuestionsDisponibles = [this.sup]
    else {
      typesDeQuestionsDisponibles = [1, 2, 3, 4]
    }
    const listeTypeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    ) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      // Boucle principale où i+1 correspond au numéro de la question
      let a: number, m: number, p: number
      let texte = ''
      let texteCorr = ''
      let reponse: string
      const typeDeQuestion = listeTypeQuestions[i]
      switch (
        typeDeQuestion // Suivant le type de question, le contenu sera différent
      ) {
        case 1: // affine
          a = randint(-5, 5, [0])
          m = randint(-5, 5, [0]) // coeff dir de ax+b
          p = randint(-5, 5, [0])
          texte = `Soit $f$ la fonction définie pour tout $x$ de $\\mathbb{R}$ par $f(x)=${reduireAxPlusB(m, p)} $.<br>`
          texte += `Déterminer la valeur de  $f'(${a})$, en utilisant la définition de cours.`
          texteCorr = `Pour déterminer $f'(${a})$, `
          texteCorr += `on commence par calculer le taux de variation de $f$, <br> entre $${a}$ et $${a}+h$ , `
          texteCorr += 'noté $\\tau(h)$, où $h$ est un réel non nul.<br>'
          texteCorr += `$\\begin{aligned}\\tau(h) &= \\dfrac{f(${a}+h)-f(${a})}{h}&\\text{Définition du taux de variation}\\\\`
          texteCorr += `&= \\dfrac{${m}(${a}+h)${ecritureAlgebrique(p)}-${ecritureParentheseSiNegatif(m)}\\times ${ecritureParentheseSiNegatif(a)}${ecritureAlgebrique(-p)}}{h}&\\text{Application à la fonction } f(x)=${reduireAxPlusB(m, p)}  \\\\`
          texteCorr += `&= \\dfrac{${ecritureParentheseSiNegatif(a * m)}${ecritureAlgebriqueSauf1(m)} h ${ecritureAlgebrique(p)}-${ecritureParentheseSiNegatif(a * m)} ${ecritureAlgebriqueSauf1(-p)}}{h}&\\text{Développement au numérateur}  \\\\`
          texteCorr += `&= \\dfrac{${m} h } {h}&\\text{Réduction au numérateur}  \\\\`
          texteCorr += `&= ${m} &\\text{Simplification par } h  \\\\`
          texteCorr += '\\end{aligned}$'
          texteCorr +=
            '<br>Le taux de variations de $f$ est une constante qui ne dépend pas de $h$.'
          texteCorr +=
            "<br>Ce résultat était prévisible puisque la représentation graphique d'une fonction affine est une droite."
          texteCorr += `<br>La pente entre deux points de la droite est donc toujours égale au coefficient directeur de la fonction affine, ici ${m}.`
          texteCorr +=
            '<br>On en déduit facilement la limite du taux de variations quand $h$ tend vers $0$.'
          texteCorr += `<br>$\\lim\\limits_{h \\rightarrow 0} ${m}=${m} $`
          texteCorr += `<br>On peut en conclure que $f$ est dérivable en $${a}$ et`
          texteCorr += ` donc $f'(${a})=${miseEnEvidence(m)} $`
          reponse = m.toString()
          break
        case 2: // 'carre':
          a = randint(-5, 5, [0])
          texte =
            'Soit $f$ la fonction définie pour tout $x$ de $\\mathbb{R}$ par $f(x)=x^2$.<br>'
          texte += `Déterminer la valeur de  $f'(${a})$, en utilisant la définition de cours.`
          texteCorr = `Pour déterminer $f'(${a})$, `
          texteCorr += `on commence par calculer le taux de variation de $f$, <br> entre $${a}$ et $${a}+h$ , `
          texteCorr += 'noté $\\tau(h)$, où $h$ est un réel non nul.<br>'
          texteCorr += `$\\begin{aligned}\\tau(h) &= \\dfrac{f(${a}+h)-f(${a})}{h}&\\text{Définition du taux de variation}\\\\`
          texteCorr += `&= \\dfrac{(${a}+h)^2-(${a})^2}{h}&\\text{Application à la fonction carré.}\\\\`
          texteCorr += `&= \\dfrac{${ecritureParentheseSiNegatif(a)}^2+2\\times${ecritureParentheseSiNegatif(a)}\\times h+h^2-${ecritureParentheseSiNegatif(a)}^2}{h}&\\text{Développement de l'identité remarquable.}\\\\`
          texteCorr += `&= \\dfrac{${a * a}${ecritureAlgebrique(2 * a)} h+h^2-${a * a}}{h}&\\text{Simplification au numérateur.}\\\\`

          texteCorr += `&= \\dfrac{${2 * a} h+h^2}{h}&\\text{Réduction au numérateur.}\\\\`
          texteCorr += `&= \\dfrac{h(${2 * a}+h)}{h}&\\text{Factorisation  par } h \\text{ au numérateur.}\\\\`
          texteCorr += `&=${2 * a} +h&\\text{Simplification par} h\\\\`
          texteCorr += '\\end{aligned}$'
          texteCorr +=
            '<br>On cherche maintenant la limite du taux de variations quand $h$ tend vers $0$.'
          texteCorr += `<br>$\\lim\\limits_{h \\rightarrow 0} ${2 * a} +h=${2 * a} $`
          texteCorr += `<br>Comme la limite existe, on peut en déduire que $f$ est dérivable en $${a}$ <br>et`
          texteCorr += ` on peut conclure que $f'(${a})=${miseEnEvidence(2 * a)} $`
          reponse = String(2 * a)
          break
        case 3: // 'inverse':
          a = randint(-5, 5, [0])
          texte =
            'Soit $f$ la fonction définie pour tout $x$ de $\\mathbb{R}^{*}$ par $f(x)=\\dfrac{1}{x}$.<br>'
          texte += `Déterminer la valeur de  $f'(${a})$, en utilisant la définition de cours.`
          texteCorr = `Pour déterminer $f'(${a})$, `
          texteCorr += `on commence par calculer le taux de variation de $f$, <br> entre $${a}$ et $${a}+h$ , `
          texteCorr += 'noté $\\tau(h)$, où $h$ est un réel non nul.<br>'
          texteCorr += `$\\begin{aligned}\\tau(h) &= \\dfrac{f(${a}+h)-f(${a})}{h}&\\text{Définition du taux de variation}\\\\`
          texteCorr += `&= \\dfrac{\\dfrac{1}{${a}+h}-\\dfrac{1}{${a}}}{h}&\\text{Application à la fonction inverse.}\\\\`
          texteCorr += `&= \\dfrac{\\dfrac{${a}}{(${a}+h)\\times ${ecritureParentheseSiNegatif(a)}}-\\dfrac{${a}+h}{${a}\\times (${a}+h)}}{h}&\\text{Mise au même dénominateur.}\\\\`
          texteCorr += `&= \\dfrac{\\dfrac{${a}${ecritureAlgebriqueSauf1(-a)}-h}{(${a}+h)\\times ${ecritureParentheseSiNegatif(a)}}}{h}&\\text{Réduction au numérateur.}\\\\`
          texteCorr += `&= \\dfrac{-h}{(${a}+h)\\times ${ecritureParentheseSiNegatif(a)}}\\times \\dfrac{1}{h}&\\text{Diviser par } h, \\text{c'est multiplier par }\\dfrac{1}{h}.\\\\`
          texteCorr += `&= \\dfrac{-1}{(${a}+h)\\times ${ecritureParentheseSiNegatif(a)}}&\\text{Simplification par }h \\\\`
          texteCorr += '\\end{aligned}$'
          texteCorr +=
            '<br>On cherche maintenant la limite du taux de variations quand $h$ tend vers $0$.'
          texteCorr += `<br>$\\lim\\limits_{h \\rightarrow 0} \\dfrac{-1}{(${a}+h)\\times ${ecritureParentheseSiNegatif(a)}}= \\dfrac{-1}{${a * a}} $`
          if (a !== 1 && a !== -1) {
            texteCorr += `<br>On peut donc conclure que $f'(${a})=${miseEnEvidence(`\\dfrac{-1}{${a * a}}`)}$`
            reponse = `\\frac{-1}{${a * a}}`
          } else {
            texteCorr += `<br>On peut donc conclure que $f'(${a})=${miseEnEvidence(-1)}$`
            reponse = '-1'
          }

          break
        case 4: // 'racine_carree':
        default:
          a = randint(1, 8)
          texte =
            'Soit $f$ la fonction définie pour tout $x$ de $\\mathbb{R}_{+}$ par $f(x)=\\sqrt{x}$.<br>'
          texte += `Déterminer la valeur de  $f'(${a})$, en utilisant la définition de cours.`
          texteCorr = `Pour déterminer $f'(${a})$, `
          texteCorr += `on commence par calculer le taux de variation de $f$, <br> entre $${a}$ et $${a}+h$ , `
          texteCorr += 'noté $\\tau(h)$, où $h$ est un réel non nul.<br>'
          texteCorr += `$\\begin{aligned}\\tau(h) &= \\dfrac{f(${a}+h)-f(${a})}{h}&\\text{Définition du taux de variation}\\\\`
          texteCorr += `&= \\dfrac{\\sqrt{${a}+h}-\\sqrt{${a}}}{h}&\\text{Application à la fonction racine carrée.}\\\\`
          texteCorr += `&=\\dfrac{(\\sqrt{${a}+h}-\\sqrt{${a}})(\\sqrt{${a}+h}+\\sqrt{${a}})}{h(\\sqrt{${a}+h}+\\sqrt{${a}})}&\\text{Multiplication par la "quantité conjuguée".}\\\\`
          texteCorr += `&=\\dfrac{${a}+h${ecritureAlgebrique(-a)}}{h(\\sqrt{${a}+h}+\\sqrt{${a}})}&\\text{Identité remarquable : } (a-b)(a+b)=a^2-b^2\\\\`

          texteCorr += `&=\\dfrac{h}{h(\\sqrt{${a}+h}+\\sqrt{${a}})}&\\text{Réduction au numérateur }.\\\\`
          texteCorr += `&=\\dfrac{1}{\\sqrt{${a}+h}+\\sqrt{${a}}}&\\text{Simplification de la fraction par } h.\\\\`

          texteCorr += '\\end{aligned}$'
          texteCorr +=
            '<br>On cherche maintenant la limite du taux de variations quand $h$ tend vers $0$.'
          texteCorr += `<br>$\\lim\\limits_{h \\rightarrow 0} \\dfrac{1}{\\sqrt{${a}+h}+\\sqrt{${a}}}=\\dfrac{1}{2 \\sqrt{${a}}}$`
          if (a === 1) {
            texteCorr += `<br>On peut donc conclure que $f'(${a})=${miseEnEvidence('\\dfrac{1}{2}')}$`
            reponse = '\\frac{1}{2}'
          } else if (a === 4) {
            texteCorr += `<br>On peut donc conclure que $f'(${a})=${miseEnEvidence('\\dfrac{1}{4}')}$`
            reponse = '\\frac{1}{4}'
          } else {
            texteCorr += `<br>On peut donc conclure que $f'(${a})=${miseEnEvidence(`\\dfrac{1}{2 \\sqrt{${a}}}`)}$`
            reponse = `\\frac{1}{2 \\sqrt{${a}}}`
          }
          break
      }
      texte += ajouteChampTexteMathLive(this, i, KeyboardType.lycee, {
        texteAvant: `$f'(${a})=$`,
      })
      handleAnswers(this, i, { reponse: { value: reponse } })
      if (this.questionJamaisPosee(i, typeDeQuestion, a)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
