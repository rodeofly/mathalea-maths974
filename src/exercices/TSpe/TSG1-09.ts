import ExerciceSimple from '../ExerciceSimple'
import { randint } from '../../modules/outils'
import { texNombre } from '../../lib/outils/texNombre'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { choice } from '../../lib/outils/arrayOutils'
export const titre = 'Dénombrement.'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '20/4/2025'

export const uuid = '261b9'
export const refs = {
  'fr-fr': ['TSG1-09'],
  'fr-ch': ['NR'],
}
function factorielle(num: number): number {
  if (num === 0 || num === 1) return 1
  return num * factorielle(num - 1)
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Stéphane Guyon

*/
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const n = randint(5, 15)
    const k = randint(2, n - 1)
    const factorielleN = factorielle(n)
    const combinaison = factorielle(n) / (factorielle(k) * factorielle(n - k))
    const prenom = choice([
      'Léa',
      'Noah',
      'Amina',
      'Elias',
      'Sofia',
      'Liam',
      'Yasmine',
      'Gabriel',
    ])
    const objet = choice([
      'smartphones',
      'tablettes',
      'écouteurs',
      'montres connectées',
      'enceintes bluetooth',
      'drones',
      'lunettes VR',
    ])
    this.question = `${prenom} range les ${n} ${objet} de son magasin et souhaite en placer indistinctement ${k} en vitrine.<br> Quel est le nombre de possibilités ?`
    this.correction = `Dans cette situation, l'ordre n'intervient pas.<br> Le problème de ${prenom} revient à déterminer le nombre de combinaisons de ${k} éléments parmi ${n} .<br>`
    this.correction +=
      'On sait que le nombre de combinaisons, de k éléments parmi n, vaut : $\\dbinom{n}{k} =\\dfrac{n~!}{k~!(n-k)~!}$.<br>'
    this.correction += `Dans notre situation, on calcule le nombre de combinaisons de ${k} éléments parmi ${n} :<br> $\\dbinom{${n}}{${k}}=\\dfrac{${n}~!}{${k}~!\\times ${n - k}~!}=${texNombre(combinaison)}$.<br>`
    this.correction += `Il y a donc $${miseEnEvidence(texNombre(combinaison))}$ vitrines possibles.<br>`
    this.reponse = combinaison
  }
}
