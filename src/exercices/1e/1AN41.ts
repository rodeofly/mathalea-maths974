import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { ecritureAlgebrique, rienSi1 } from '../../lib/outils/ecritures'
import { sp } from '../../lib/outils/outilString'
import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'

import { setReponse } from '../../lib/interactif/gestionInteractif'

export const titre = "Mesure principale d'un angle"
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '20/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 *
 * @author Stéphane Guyon

 */
export const uuid = 'a720c'

export const refs = {
  'fr-fr': ['1AN41'],
  'fr-ch': [],
}
export default class MesurePrincipale extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 3 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  }

  nouvelleVersion() {
    const lettresGrecques = [
      ['α', '\\alpha'],
      ['β', '\\beta'],
      ['δ', '\\delta'],
      ['γ', '\\gamma'],
      ['ω', '\\omega'],
      ['ε', '\\epsilon'],
      ['θ', '\\theta'],
      ['λ', '\\lambda'],
    ]
    const alfa = lettresGrecques[randint(0, 7)][1]
    this.consigne = `Déterminer la mesure principale de l'angle $${alfa}$, c'est-à-dire sa mesure sur $]-\\pi;\\pi]$`

    const typeQuestionsDisponibles = [
      'type1',
      'type2',
      'type3',
      'type4',
      'type5',
      'type6',
      'type7',
      'type8',
      'type9',
    ] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(
      typeQuestionsDisponibles,
      this.nbQuestions,
    ) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, k, kMin, p, n, angle, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (
        listeTypeQuestions[i] // Suivant le type de question, le contenu sera différent
      ) {
        case 'type1': // k* 2\pi + p*\pi/n
          p = randint(-2, 2, [0])
          n = 3
          break
        case 'type2': // k* 2\pi + p*\pi/n
          p = randint(-5, 5, [-4, -3, -2, 0, 2, 3, 4])
          n = 6
          break
        case 'type3': // k* 2\pi + p*\pi/n
          p = randint(-4, 4, [0])
          n = 5
          break
        case 'type4': // k* 2\pi + p*\pi/n
          p = randint(-3, 3, [-2, 0, 2])
          n = 4
          break
        case 'type5': // k* 2\pi + p*\pi/n
          p = randint(-6, 6, [0])
          n = 7
          break
        case 'type6': // k* 2\pi + p*\pi/n
          p = randint(-8, 8, [-6, -3, 0, 3, 6])
          n = 9
          break
        case 'type7': // k* 2\pi + p*\pi/n
          p = randint(-9, 9, [-8, -6, -5, -4, -2, 0, 2, 4, 5, 6, 8])
          n = 10
          break
        case 'type8': // k* 2\pi + p*\pi/n
          p = randint(-10, 10, [0])
          n = 11
          break
        case 'type9': // k* 2\pi + p*\pi/n
        default:
          p = randint(-12, 12, [0])
          n = 13
          break
      }
      k = randint(-5, 5, [0, 1]) // modulo 2k\pi
      angle = 2 * n * k + p

      texte = `$${alfa}=\\dfrac{${angle}\\pi}{${n}}$` // Le LateX entre deux symboles $, les variables dans des ${ }
      if (this.interactif) {
        setReponse(this, i, `$\\dfrac{${rienSi1(p)}\\pi}{${n}}$`)
        texte +=
          ' et sa mesure principale est :' +
          ajouteChampTexteMathLive(this, i, ' ')
      }

      kMin = angle / (2 * n) < k ? k - 1 : k // Ce parametre permet d'adapter le code selon si k est la borne inférieure ou supérieure de l'encadrement entre deux entiers de angle/2n.

      texteCorr = `On cherche le nombre de multiples inutiles de $2\\pi$ pour déterminer la mesure principale de $\\dfrac{${angle}\\pi}{${n}}$,`
      texteCorr += `<br>c'est-à-dire le nombre de multiples de $${2 * n}\\pi$ dans $${angle}\\pi$.`
      texteCorr +=
        '<br>On peut diviser le numérateur par le double du dénominateur, pour avoir un ordre de grandeur du meilleur multiple :'
      texteCorr += `<br> On obtient : $\\quad ${kMin}<\\dfrac{${angle}\\pi}{${2 * n}\\pi}< ${kMin + 1}$`
      texteCorr += `<br><br>D'une part : $${alfa}=\\dfrac{${angle}\\pi}{${n}}=\\dfrac{${angle - 2 * n * kMin}\\pi${ecritureAlgebrique(2 * n * kMin)} \\pi  }{${n}}=  \\dfrac{${angle - 2 * n * kMin}\\pi}{${n}}+\\dfrac{${kMin} \\times ${2 * n}\\pi}{${n}} =\\dfrac{${angle - 2 * n * kMin}\\pi}{${n}}${ecritureAlgebrique(kMin)}\\times 2\\pi$`
      texteCorr += `<br><br>D'autre part : $${alfa}=\\dfrac{${2 * n * k + p}\\pi}{${n}}=\\dfrac{${angle - 2 * n * (kMin + 1)}\\pi${ecritureAlgebrique(2 * n * (kMin + 1))}\\pi}{${n}}= \\dfrac{${angle - 2 * n * (kMin + 1)}\\pi}{${n}}+\\dfrac{${kMin + 1} \\times ${2 * n}\\pi}{${n}}=\\dfrac{${angle - 2 * n * (kMin + 1)}\\pi}{${n}}${ecritureAlgebrique(kMin + 1)}\\times 2\\pi$`
      texteCorr += '<br><br>On observe que : '
      texteCorr +=
        kMin === k
          ? `$\\dfrac{${angle - 2 * n * (kMin + 1)}\\pi}{${n}}`
          : `$\\dfrac{${angle - 2 * n * kMin}\\pi}{${n}}`
      texteCorr += `${sp()}\\notin ${sp()}]-\\pi${sp()} ;${sp()} \\pi ]$.`
      texteCorr += '<br><br>Alors que : '
      texteCorr +=
        kMin !== k
          ? `$\\dfrac{${angle - 2 * n * (kMin + 1)}\\pi}{${n}}`
          : `$\\dfrac{${angle - 2 * n * kMin}\\pi}{${n}}`
      texteCorr += `${sp()}\\in${sp()}]-\\pi${sp()} ;${sp()} \\pi ]$,`
      texteCorr += `<br> La mesure principale de $${alfa}$ est donc $\\dfrac{${rienSi1(p)}\\pi}{${n}}$.`
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) {
        // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
