import { choice } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import { randint } from '../../modules/outils'
// import ExerciceQcmA from '../../ExerciceQcmA'
import ExerciceQcmA from '../ExerciceQcmA'

export const uuid = '406b1'
export const refs = {
  'fr-fr': ['1A-E5'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer un taux réciproque'
export const dateDePublication = '15/07/2025'
// Ceci est un exemple de QCM avec version originale et version aléatoire
/**
 *
 * @author Gilles Mora
 *
 */
export default class TauxReciproque extends ExerciceQcmA {
  // S'occupe de passser les données originales à la fonction appliquerLesValeurs

  versionOriginale: () => void = () => {
    const bonneReponse1 = '\\dfrac{1}{1,27}-1'
    const bonneReponse2 = '\\dfrac{-0,27}{1,27}'
    const bonneReponseRetenue = choice([bonneReponse1, bonneReponse2])
    this.enonce = `Le prix d’un article a subi une augmentation de $27\\,\\%$.<br>
  Le taux à appliquer pour que cet article retrouve son prix initial est donné par  :`
    this.correction = `Le coefficient multiplicateur associé à une augmentation de $27\\,\\%$ est $1+0,27=1,27$.<br>
      Le coefficient multiplicateur réciproque est donc : $\\dfrac{1}{1,27}$.<br>
      On en déduit que le taux réciproque  est $\\dfrac{1}{1,27}-1$ ou $\\dfrac{-0,27}{1,27}$.<br>
      Le taux réciproque est donc $${miseEnEvidence(bonneReponseRetenue)}$.`

    this.reponses = [
      `$${bonneReponseRetenue}$`,
      '$\\dfrac{1}{1,27}$',
      '$1-\\dfrac{1}{1,27}$',
      '$\\dfrac{0,27}{1,27}$',
    ]
  }

  versionAleatoire: () => void = () => {
    switch (choice([1, 2])) {
      case 1:
        {
          const taux = randint(5, 49, [10, 20, 30, 40])
          const bonneReponse1 = `\\dfrac{1}{${texNombre(1 + taux / 100, 4)}}-1`
          const bonneReponse2 = `\\dfrac{${texNombre(-taux / 100, 4)}}{${texNombre(1 + taux / 100, 4)}}`
          const bonneReponseRetenue = choice([bonneReponse1, bonneReponse2])
          this.enonce = `Le prix d’un article a subi une augmentation de $${taux}\\,\\%$.<br>
  Le taux à appliquer pour que cet article retrouve son prix initial est donné par  :`
          this.correction = `Le coefficient multiplicateur associé à une augmentation de $${taux}\\,\\%$ est $1+${texNombre(taux / 100, 2)}=${texNombre(1 + taux / 100, 4)}$.<br>
      Le coefficient multiplicateur réciproque est donc  $\\dfrac{1}{${texNombre(1 + taux / 100, 4)}}$.<br>
      On en déduit que le taux réciproque  est  $\\dfrac{1}{${texNombre(1 + taux / 100, 4)}}-1$ ou $\\dfrac{-${texNombre(taux / 100, 4)}}{${texNombre(1 + taux / 100, 4)}}$.<br>
      Le taux réciproque est donc $${miseEnEvidence(bonneReponseRetenue)}$.`

          this.reponses = [
            `$${bonneReponseRetenue}$`,
            `$\\dfrac{1}{${texNombre(taux / 100, 4)}}$`,
            `$1-\\dfrac{1}{${texNombre(taux / 100, 4)}}$`,
            `$\\dfrac{1}{${texNombre(1 - taux / 100, 4)}}-1$`,
          ]
        }
        break

      case 2:
      default:
        {
          const taux = randint(5, 49, [10, 20, 30, 40])
          const bonneReponse1 = `\\dfrac{1}{${texNombre(1 - taux / 100, 4)}}-1`
          const bonneReponse2 = `\\dfrac{${texNombre(taux / 100, 4)}}{${texNombre(1 - taux / 100, 4)}}`
          const bonneReponseRetenue = choice([bonneReponse1, bonneReponse2])
          this.enonce = `Le prix d’un article a subi une baisse de $${taux}\\,\\%$.<br>
  Le taux à appliquer pour que cet article retrouve son prix initial est donné par  :`
          this.correction = `Le coefficient multiplicateur associé à une baisse de $${taux}\\,\\%$ est $1-${texNombre(taux / 100, 2)}=${texNombre(1 - taux / 100, 4)}$.<br>
      Le coefficient multiplicateur réciproque est donc  $\\dfrac{1}{${texNombre(1 - taux / 100, 4)}}$.<br>
      On en déduit que le taux réciproque  est  $\\dfrac{1}{${texNombre(1 - taux / 100, 4)}}-1$ ou $\\dfrac{${texNombre(taux / 100, 4)}}{${texNombre(1 - taux / 100, 4)}}$.<br>
      Le taux réciproque est donc $${miseEnEvidence(bonneReponseRetenue)}$.`

          this.reponses = [
            `$${bonneReponseRetenue}$`,
            `$\\dfrac{1}{${texNombre(taux / 100, 4)}}$`,
            `$1-\\dfrac{1}{${texNombre(1 - taux / 100, 4)}}$`,
            `$\\dfrac{${texNombre(-taux / 100, 4)}}{${texNombre(1 - taux / 100, 4)}}$`,
          ]
        }
        break
    }
  }

  // Ici il n'y a rien à faire, on appelle juste la version aleatoire (pour un qcm aleatoirisé, c'est le fonctionnement par défaut)
  constructor() {
    super()
    // this.options = { vertical: true, ordered: false }
    this.versionAleatoire()
  }
}
