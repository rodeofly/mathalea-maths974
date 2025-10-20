import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { texNombre } from '../../lib/outils/texNombre'
export const titre = 'Dénombrement'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '21/04/2025' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

export const uuid = '3a384'
export const refs = {
  'fr-fr': ['TSG1-07'],
  'fr-ch': [],
}

/**
 * Ce model est prévu pour les exercice où le nombre de questions est fixe
 * et où on ne demande pas la même chose à toutes les questions
 * @author Stéphane Guyon

*/
export default class nomExercice extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 3
    this.nbQuestionsModifiable = false
  }

  nouvelleVersion() {
    function factorielle(num: number): number {
      if (num === 0 || num === 1) return 1
      return num * factorielle(num - 1)
    }
    // membre association
    const n = randint(20, 40) // nombre d'adhérents
    const ca = randint(5, 8) // nombre membres au CA
    const partieEntiere = Math.floor(n / 2) // partie entière de n/2;
    const garcons = randint(partieEntiere, n - 5) // nombre de garcons
    const filles = n - garcons // nombre de filles
    const prenomGarcons = [
      'Jean-Claude',
      'Rémi',
      'Éric',
      'Gilles',
      'Stéphane',
      'Mickaël',
      'Sylvain',
      'Guillaume',
      'Liouba',
      'Nathan',
      'Mathieu',
      'Cyril',
      'Maxime',
      'Olivier',
      'Pierre',
    ]
    const numerogarcon1 = randint(0, 14)
    const prenomFilles = [
      'Sophie',
      'Aude',
      'Mireille',
      'Lydie',
      'Claire',
      'Ève',
      'Julie',
    ]
    const numerofille1 = randint(0, 6)
    const factorielleN = factorielle(n)
    const factorielleCA = factorielle(ca)
    const factorielleNmoinsCA = factorielle(n - ca)
    const resultat1 = factorielleN / (factorielleCA * factorielleNmoinsCA)
    const NombreCAGarcons =
      factorielle(garcons) / (factorielle(ca) * factorielle(garcons - ca))
    this.consigne = `L'association Coopmaths organise son assemblée générale annuelle pour élire son nouveau Conseil d'Administration (CA) composé de $${ca}$ membres, qui élira ensuite en son sein, un bureau. `
    this.consigne += `<br>Il y a $${n}$ adhérents à jour de cotisations, qui peuvent donc voter et candidater au CA. <br>`
    let question1 = `${prenomGarcons[numerogarcon1]} souhaite déterminer combien de CA différents il est possible de constituer avec tous les adhérents.<br> Déterminer ce nombre.<br>`
    const reponse1 = 1
    let correction1 = `On doit choisir ${ca} adhérents parmi ${n}. <br>`
    correction1 += `L'ordre des candidats ne compte pas dans ce choix. Il s'agit donc de déterminer le nombre de combinaisons de  $${ca}$ membres parmi $${n}$.<br>`
    correction1 += `On calcule donc <br>$\\begin{aligned}\\dbinom{${n}}{${ca}} &= \\dfrac{${n}~!}{${ca}~!\\times ${n - ca}~!}\\\\&=${texNombre(resultat1)}\\end{aligned}$<br>`
    correction1 += `Il y a donc $${miseEnEvidence(texNombre(resultat1))}$ CA possibles.<br>`
    let question2 = `${prenomGarcons[numerogarcon1]} intervient fièrement pour annoncer le résultat de son calcul. Mais ${prenomFilles[numerofille1]} prend la parole pour lui rappeler que les statuts de l'association imposent la présence d'au moins une femme dans le CA et que son calcul est donc faux.<br>`
    question2 += ` Sachant qu'il y a $${garcons}$ garçons et $${filles}$ filles parmi les adhérents, en déduire le nombre exact de CA possibles.`
    let correction2 = `Dans les $${texNombre(resultat1)}$ CA possibles, il faut retirer ceux qui ne contiennent que des garçons.`
    correction2 +=
      '<br>On calcule donc le nombre de CA possibles avec uniquement des garçons :<br>'
    correction2 += `$\\begin{aligned}\\dbinom{${garcons}}{${ca}} &= \\dfrac{${garcons}~!}{${ca}~!\\times ${garcons - ca}~!}\\\\&=${texNombre(factorielle(garcons) / (factorielle(ca) * factorielle(garcons - ca)))}\\end{aligned}$<br>`
    correction2 +=
      'Il faut donc soustraire ce résultat du nombre total de CA possibles.<br>'
    correction2 += `On a donc $${texNombre(resultat1)} - ${texNombre(NombreCAGarcons)} = ${miseEnEvidence(texNombre(resultat1 - NombreCAGarcons))}$ CA possibles avec au moins une fille.`
    const reponse2 = 2
    let question3 =
      "Le CA étant élu, il se réunit pour élire en son sein le bureau, composé d'un président ou d'une présidente, d'un secrétaire ou d'une secrétaire et d'un trésorier ou d'une trésorière.<br>"
    question3 += 'Combien de bureaux différents peut-on constituer ?'
    let correction3 =
      "Pour constituer le bureau, l'ordre compte, puisqu'il y a trois postes différents à pourvoir.<br>"
    correction3 += `Il faut donc déterminer le nombre de triplets d'éléments distincts que l'on peut constituer dans une liste à ${ca} éléments.<br>`
    correction3 += `On calcule donc <br>$\\begin{aligned}\\dfrac{${ca}~!}{(${ca} - 3)~!}&=\\dfrac{${ca}~!}{${ca - 3} ~! }\\\\&=${texNombre(factorielle(ca) / factorielle(ca - 3))}\\end{aligned}$<br>`
    correction3 += `Il y a donc $${miseEnEvidence(texNombre(factorielle(ca) / factorielle(ca - 3)))}$ bureaux possibles.`
    const reponse3 = factorielleCA / factorielle(ca - 3)
    listeQuestionsToContenu(this)
    handleAnswers(this, 0, { reponse: { value: reponse1 } })
    question1 += ajouteChampTexteMathLive(this, 0, KeyboardType.clavierDeBase)
    this.listeQuestions.push(question1)
    this.listeCorrections.push(correction1)
    handleAnswers(this, 1, { reponse: { value: reponse2 } })
    question2 += ajouteChampTexteMathLive(this, 1, KeyboardType.clavierDeBase)
    this.listeQuestions.push(question2)
    this.listeCorrections.push(correction2)
    handleAnswers(this, 2, { reponse: { value: reponse3 } })
    question3 += ajouteChampTexteMathLive(this, 2, KeyboardType.clavierDeBase)
    this.listeQuestions.push(question3)
    this.listeCorrections.push(correction3)
  }
}
