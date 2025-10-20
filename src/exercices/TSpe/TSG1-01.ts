import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { texNombre } from '../../lib/outils/texNombre'
import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../lib/outils/embellissements'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'

function factorielle(num: number): number {
  if (num === 0 || num === 1) return 1
  return num * factorielle(num - 1)
}
export const titre = 'Dénombrer des tirages de boules dans une urne'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '18/04/2025' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

export const uuid = '5e90f'
export const refs = {
  'fr-fr': ['TSG1-01'],
  'fr-ch': [],
}
/**
 *
 * @author Stéphane Guyon
 */
export default class nomExercice extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Types de question ',
      5,
      '1 :Nombre de k-uplets\n2 : Arrangements\n3 : Combinaisons\n4 : Nombre de sous-parties\n5 : Permutations\n6 : Mélange',
    ]
    this.consigne = ''
    this.nbQuestions = 1 // Nombre de questions par défaut
    this.sup = 1
  }

  nouvelleVersion() {
    let typesDeQuestionsDisponibles: string[] = [
      'type1',
      'type2',
      'type3',
      'type4',
      'type5',
    ] // Mélange des cas précédents
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = ['type1'] //
    } else if (this.sup === 2) {
      typesDeQuestionsDisponibles = ['type2'] //
    } else if (this.sup === 3) {
      typesDeQuestionsDisponibles = ['type3'] //
    } else if (this.sup === 4) {
      typesDeQuestionsDisponibles = ['type4'] //
    } else if (this.sup === 5) {
      typesDeQuestionsDisponibles = ['type5'] //
    }
    if (this.sup >= 6) {
      typesDeQuestionsDisponibles = [
        'type1',
        'type2',
        'type3',
        'type4',
        'type5',
      ] // Mélange des cas précédents
    }
    const listeTypeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )
    let reponse = ''
    let n = randint(3, 15)
    const k = randint(2, n - 1)
    const arrangement = factorielle(n) / factorielle(n - k)
    const combinaison = factorielle(n) / (factorielle(k) * factorielle(n - k))
    let factorielleN = 0
    let kuplet = ''
    if (k === 2) {
      kuplet = 'couples'
    }
    if (k === 3) {
      kuplet = 'triplets'
    }
    if (k === 4) {
      kuplet = 'quadruplets'
    }
    if (k === 5) {
      kuplet = 'quintuplets'
    }
    if (k >= 6) {
      kuplet = `${k}-uplets`
    }

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      const variables: string[] = []
      switch (listeTypeQuestions[i]) {
        case 'type1':
          texte = `On considère une urne contenant ${n} boules numérotées de $1$ à ${n}.<br> On tire successivement ${k} boules au hasard dans l'urne, en replaçant après chaque tirage la boule dans l'urne.<br>`
          texte += 'Déterminer le nombre de tirages possibles.<br>'
          texteCorr += `On effectue ${k} tirages successifs avec remise, ce qui revient à déterminer le nombre de ${kuplet} de l'ensemble `
          if (n === 3) {
            texteCorr += '$E=\\left\\{1;2;3\\right\\}$.<br>'
          }
          if (n === 4) {
            texteCorr += '$E=\\left\\{1;2;3;4\\right\\}$.<br>'
          }
          if (n > 4) {
            texteCorr += `$E=\\left\\{1;2;\\ldots;${n}\\right\\}$.<br> `
          }
          texteCorr +=
            "Le nombre de $k$-uplet d'un ensemble fini $E$ est $\\mathrm{Card}(E)^k$.<br>"
          texteCorr += `Comme $\\mathrm{Card}(E)=${n}$, le nombre de ${kuplet} est $\\mathrm{Card}(E)^${k}=${n}^{${k}}=${texNombre(n ** k)}$.<br>`
          texteCorr += `Il y a donc $${miseEnEvidence(texNombre(n ** k))}$ tirages possibles.<br>`
          reponse = `${n ** k}`
          break
        case 'type2':
          texte = `On considère une urne contenant ${n} boules numérotées de $1$ à ${n}.<br> On tire successivement ${k} boules au hasard dans l'urne, sans les remettre une fois tirée.<br>`
          texte += 'Déterminer le nombre de tirages possibles.<br>'
          texteCorr += `On effectue ${k} tirages successifs sans remise, ce qui revient à déterminer le nombre de ${kuplet} ${texteEnCouleurEtGras("d'éléments distincts de l'ensemble")} `
          if (n === 3) {
            texteCorr += '$E=\\left\\{1;2;3\\right\\}$.<br>'
          }
          if (n === 4) {
            texteCorr += '$E=\\left\\{1;2;3;4\\right\\}$.<br>'
          }
          if (n > 4) {
            texteCorr += `$E=\\left\\{1;2;\\ldots;${n}\\right\\}$.<br> `
          }
          texteCorr +=
            "Le nombre de $k$-uplet d'éléments distincts d'un ensemble fini $E$ est appelé un arrangement, qu'on peut noter ainsi : $A_n^k$.<br>"
          texteCorr +=
            'On sait alors que : $A_n^k=n\\times (n-1)\\ldots (n-k+1)$ ou encore : $A_n^k=\\dfrac{n~!}{(n-k)~!}$.<br>'
          texteCorr += `Dans notre situation, $A_{${n}}^{${k}}=\\dfrac{${n}~!}{${n - k}~!}=${arrangement}$.<br>`
          texteCorr += `Il y a donc $${miseEnEvidence(texNombre(arrangement))}$ tirages possibles.<br>`
          reponse = `${arrangement}`
          break
          texteCorr += `Il y a donc $${miseEnEvidence(n ** k)}$ tirages possibles.<br>`
        case 'type3':
          texte = `On considère une urne contenant ${n} boules numérotées de $1$ à ${n}.<br> On tire simultanément ${k} boules au hasard dans l'urne.<br>`
          texte += 'Déterminer le nombre de tirages possibles.<br>'
          texteCorr = `On effectue ${k} tirages simultanés, ce qui revient à déterminer le nombre de sous parties à ${k} éléments de l'ensemble $E=\\left\\{1;2;\\ldots;${n}\\right\\}$.<br>`
          texteCorr +=
            'On sait que le nombre de combinaisons, de k éléments parmi n, vaut : $\\dbinom{n}{k} =\\dfrac{n~!}{k~!(n-k)~!}$.<br>'
          texteCorr += `Dans notre situation, on calcule le nombre de combinaisons de ${k} éléments parmi ${n} :<br> $\\dbinom{${n}}{${k}}=\\dfrac{${n}~!}{${k}~!\\times ${n - k}~!}=${combinaison}$.<br>`
          texteCorr += `Il y a donc $${miseEnEvidence(texNombre(combinaison))}$ tirages possibles.<br>`
          reponse = `${combinaison}`
          break
        case 'type4':
          texte = `On considère ${n} boules numérotées de $1$ à ${n}.<br> En considérant l'ensemble $E$ constitué de ces boules, combien de sous parties de $E$ peut-on créer ?<br>`
          texteCorr =
            "On sait que le nombre de sous parties d'un ensemble fini à $n$ éléménts est $2^n$.<br>"
          texteCorr += `Dans notre situation, $\\mathrm{Card}(E)=${n}$.<br>`
          texteCorr += `On calcule alors $2^{${n}}=${texNombre(2 ** n)}$ . <br>`
          texteCorr += `On peut donc créer $${miseEnEvidence(texNombre(2 ** n))}$ sous-parties de $E$.<br>`
          reponse = `${2 ** n}`
          break
        case 'type5':
          if (n >= 10) {
            n = randint(3, 9)
          }
          factorielleN = factorielle(n)
          texte = `On ${n} boules numérotées de $1$ à ${n}.<br> Déterminer le nombre de permutations possibles.<br>`
          texteCorr =
            "On sait que le nombre de permutations d'un ensemble fini à $n$ éléménts est $n~!$<br>"
          texteCorr += `Dans notre situation, $\\mathrm{Card}(E)=${n}$.<br>`
          texteCorr += `On calcule alors $${n}~!=${texNombre(factorielleN)}$ . <br>`
          texteCorr += `On peut donc créer $${miseEnEvidence(texNombre(factorielleN))}$ permutations de $E$.<br>`
          reponse = `${factorielleN}`
          break
      }

      handleAnswers(this, i, { reponse: { value: reponse } })
      texte += ajouteChampTexteMathLive(this, i, KeyboardType.clavierDeBase, {
        texteAvant: 'Ma réponse : ',
      })
      variables.push(listeTypeQuestions[i])
      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
