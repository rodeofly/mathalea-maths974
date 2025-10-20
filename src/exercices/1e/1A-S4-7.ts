import { shuffle } from '../../lib/outils/arrayOutils'
import { texteGras } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import { nombreElementsDifferents } from '../ExerciceQcm'
import ExerciceQcmA from '../ExerciceQcmA'

export const uuid = '0c97a'
export const refs = {
  'fr-fr': ['1A-S4-7'],
  'fr-ch': ['4mQCM-1'],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre =
  "Comparer la moyenne et l'écart-type d'une série rangée en classes."
export const dateDePublication = '05/08/2025'
// Ceci est un exemple de QCM avec version originale et version aléatoire
/**
 * @author Stéphane Guyon
 */

export default class MoyenneEcartTypeClasseQCM extends ExerciceQcmA {
  // Ceci est la fonction qui s'occupe d'écrire l'énoncé, la correction et les réponses
  // Elle factorise le code qui serait dupliqué dans versionAleatoire et versionOriginale
  private appliquerLesValeurs(): void {
    const moyenne = (arr: number[]) =>
      arr.reduce((sum, x) => sum + x, 0) / arr.length

    const ecartType = (arr: number[]) => {
      const m = moyenne(arr)
      const variance =
        arr.reduce((sum, x) => sum + Math.pow(x - m, 2), 0) / arr.length
      return Math.sqrt(variance)
    }

    const genereSerie = (
      moyenneCible: number,
      dispersion: number,
    ): number[] => {
      const base = moyenneCible
      const deltas = {
        faible: [0, 0, 1, -1],
        moyenne: [0, 2, -2, 0],
        forte: [3, -3, 0, 0],
      }

      const ecarts =
        deltas[
          dispersion === 1 ? 'faible' : dispersion === 2 ? 'moyenne' : 'forte'
        ]
      const melange = shuffle(ecarts)
      return melange.map((d) => base + d)
    }

    // Choix aléatoire de scénario
    const scenario = Math.floor(Math.random() * 4)

    let serieA: number[] = []
    let serieB: number[] = []

    switch (scenario) {
      case 0:
        // Même moyenne, mais série B plus dispersée
        serieA = genereSerie(10, 1)
        serieB = genereSerie(10, 3)
        break
      case 1:
        // Moyenne A > B, écart-type similaire
        serieA = genereSerie(12, 2)
        serieB = genereSerie(9, 2)
        break
      case 2:
        // Moyenne égale, A plus dispersée
        serieA = genereSerie(10, 3)
        serieB = genereSerie(10, 1)
        break
      case 3:
        // Moyenne B > A, écart-type égal
        serieA = genereSerie(9, 3)
        serieB = genereSerie(12, 3)
        break
    }

    const moyA = moyenne(serieA)
    const moyB = moyenne(serieB)
    const etA = ecartType(serieA)
    const etB = ecartType(serieB)

    // Liste standardisée des 4 réponses possibles
    const toutesLesReponses = [
      'La moyenne de la série B est strictement supérieure à la moyenne de la série A.',
      'La moyenne de la série A est strictement supérieure à la moyenne de la série B.',
      'L’écart-type de la série A est strictement supérieur à l’écart-type de la série B.',
      'L’écart-type de la série B est strictement supérieur à l’écart-type de la série A.',
    ]

    // Détection automatique de la bonne réponse
    let bonnePhrase = ''
    let explication = ''

    if (moyB > moyA) {
      bonnePhrase = toutesLesReponses[0]
      explication = `La moyenne de la série B est ${texNombre(moyB, 2)}, celle de la série A est ${texNombre(moyA, 2)}.<br>
      On peut conclure que la seule réponse acceptable est que la moyenne de la série B est strictement supérieure à celle de la série A.<br>
      Il n'est pas nécessaire de calculer l'écart-type pour répondre à cette question.`
    } else if (moyA > moyB) {
      bonnePhrase = toutesLesReponses[1]
      explication = `La moyenne de la série A est ${texNombre(moyA, 2)}, celle de la série B est ${texNombre(moyB, 2)}.
      <br>On peut conclure que la seule réponse acceptable est que la moyenne de la série A est strictement supérieure à celle de la série B.<br>
      Il n'est pas nécessaire de calculer l'écart-type pour répondre à cette question.`
    } else if (etA > etB) {
      bonnePhrase = toutesLesReponses[2]
      explication = `On calcule facilement les moyennes des deux séries qui sont toutes les deux égales à ${texNombre(moyA, 2)}.<br>
      Il s'agit donc de comparer les écarts-types des deux séries et non pas de les calculer. L'écart-type est un paramètre qui quantifie la dispersion d'une série. 
      On constate visuellement que la série A est plus dispersée que celle de la série B. <br>
      En conséquence, son écart-type est plus élevé. <br>
      L'écart-type de la série A est strictement supérieur à celui de la série B.`
    } else {
      bonnePhrase = toutesLesReponses[3]
      explication = `On calcule facilement les moyennes des deux séries qui sont toutes les deux égales à ${texNombre(moyA, 2)}.<br>
      Il s'agit donc de comparer les écarts-types des deux séries et non pas de les calculer. L'écart-type est un paramètre qui quantifie la dispersion d'une série. 
      On constate visuellement que la série B est plus dispersée que celle de la série A. <br>
      En conséquence, son écart-type est plus élevé. <br>
      L'écart-type de la série B est strictement supérieur à celui de la série A.`
    }

    // Réorganiser les réponses pour mettre la bonne en premier
    const autres = toutesLesReponses.filter((r) => r !== bonnePhrase)
    this.reponses = [bonnePhrase, ...autres]

    // Construire l'énoncé
    this.enonce = `On considère les deux séries suivantes :  <br>
${texteGras('Série A :')} $${serieA.join(' ; ')} $ <br>
${texteGras('Série B :')} $${serieB.join(' ; ')} $ <br>

Laquelle des quatre propositions suivantes est vraie ?`

    // Définir la bonne réponse
    this.reponse = bonnePhrase

    // Correction : explication simple, claire
    this.correction = explication
  }

  versionAleatoire: () => void = () => {
    const n = 4 // nombre de réponses différentes voulues (on rappelle que la première réponse est la bonne)
    do {
      this.appliquerLesValeurs()
    } while (nombreElementsDifferents(this.reponses) < n)
  }

  // Ici il n'y a rien à faire, on appelle juste la version aleatoire (pour un qcm aleatoirisé, c'est le fonctionnement par défaut)
  constructor() {
    super()
    this.options = { vertical: true, ordered: false }
    this.versionAleatoire()
  }
}
