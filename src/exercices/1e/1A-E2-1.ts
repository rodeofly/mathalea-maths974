import { choice } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import ExerciceQcmA from '../ExerciceQcmA'

export const dateDePublication = '22/07/2025'
export const uuid = 'a3828'

export const refs = {
  'fr-fr': ['1A-E2-1'],
  'fr-ch': [],
}
/**
 *
 * @author Gilles Mora (IA)

 */
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = "Calculer avec un taux d'évolution (1)"

export default class BaissePrix extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce = `Un sac coûte $130$ euros. Le prix baisse de $10\\,\\%$. <br>
    Le nouveau prix en euros est :`
    this.correction = ` Diminuer de $10\\,\\%$ revient à multiplier par $0,9$ (coefficient multiplicateur).<br>
 Ainsi, le nouveau prix est donné par :  $130 \\times \\left(1 - \\dfrac{10}{100}\\right) = 130 \\times (1 - 0,1) = ${miseEnEvidence('130 \\times 0,9')}$`

    this.reponses = [
      '$130 \\times 0,9$',
      '$130 \\times 0,1$',
      '$130 \\times \\left(- \\dfrac{10}{100}\\right)$',
      '$130 \\times \\left(1 + \\dfrac{10}{100}\\right)$',
    ]
  }

  versionAleatoire = () => {
    // Génération d'un pourcentage de baisse (multiples de 5 entre 5 et 50)
    const pourcentagesBaisse = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
    const pourcentage = choice(pourcentagesBaisse)

    // Génération d'un prix (multiples de 10 entre 80 et 500)
    const prix = [
      80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 220, 240,
      250, 260, 280, 300, 320, 340, 350, 360, 380, 400, 420, 450, 480, 500,
    ]
    const prixInitial = choice(prix)

    // Calcul du coefficient multiplicateur
    const coefficientMultiplicateur = (100 - pourcentage) / 100
    const coefficientTexte = texNombre(coefficientMultiplicateur, 2)

    this.enonce = `Un sac coûte $${texNombre(prixInitial)}$ euros. Le prix baisse de $${pourcentage}\\,\\%$. <br>
    Le nouveau prix en euros est :`

    // Bonne réponse (plusieurs formes possibles)
    const bonnesReponses = [
      `$${texNombre(prixInitial)} \\times ${coefficientTexte}$`,
      `$${texNombre(prixInitial)} \\times \\left(1 - \\dfrac{${pourcentage}}{100}\\right)$`,
      `$${texNombre(prixInitial)} \\times \\left(1 - ${texNombre(pourcentage / 100, 2)}\\right)$`,
    ]

    // Si le coefficient a une forme décimale simple, on l'ajoute
    if (pourcentage === 10) {
      bonnesReponses.push(`$${texNombre(prixInitial)} \\times 0,9$`)
    } else if (pourcentage === 20) {
      bonnesReponses.push(`$${texNombre(prixInitial)} \\times 0,8$`)
    } else if (pourcentage === 25) {
      bonnesReponses.push(`$${texNombre(prixInitial)} \\times 0,75$`)
    } else if (pourcentage === 30) {
      bonnesReponses.push(`$${texNombre(prixInitial)} \\times 0,7$`)
    } else if (pourcentage === 40) {
      bonnesReponses.push(`$${texNombre(prixInitial)} \\times 0,6$`)
    } else if (pourcentage === 50) {
      bonnesReponses.push(`$${texNombre(prixInitial)} \\times 0,5$`)
    }

    // Distracteurs classiques
    const distracteurs = [
      `$${texNombre(prixInitial)} \\times ${texNombre(pourcentage / 100, 2)}$`, // Confusion : multiplier par le pourcentage de baisse
      `$${texNombre(prixInitial)} \\times \\left(- \\dfrac{${pourcentage}}{100}\\right)$`, // Signe négatif mal placé
      `$${texNombre(prixInitial)} \\times \\left(1 + \\dfrac{${pourcentage}}{100}\\right)$`, // Confusion baisse/hausse
      `$${texNombre(prixInitial)} \\times \\dfrac{${pourcentage}}{100}$`, // Juste le pourcentage
      `$${texNombre(prixInitial)} \\times \\left(\\dfrac{100 - ${pourcentage}}{${pourcentage}}\\right)$`, // Formule inversée
      `$${texNombre(prixInitial)} \\times \\left(\\dfrac{${pourcentage}}{100 - ${pourcentage}}\\right)$`, // Autre formule fausse
      `$${texNombre(prixInitial)} \\times ${texNombre((100 + pourcentage) / 100, 2)}$`, // Confusion avec une hausse
      `$${texNombre(prixInitial)} \\times 0,1$`, // Valeur fixe erronée
    ]

    // Sélection d'une bonne réponse
    const bonneReponse = choice(bonnesReponses)

    // Sélection de 3 distracteurs distincts
    const distracteursFiltres = distracteurs.filter(
      (rep) => rep !== bonneReponse,
    )
    const troisDistracteurs: string[] = []

    while (troisDistracteurs.length < 3 && distracteursFiltres.length > 0) {
      const distracteur = choice(distracteursFiltres)
      if (!troisDistracteurs.includes(distracteur)) {
        troisDistracteurs.push(distracteur)
      }
      // Retirer le distracteur sélectionné pour éviter les doublons
      const index = distracteursFiltres.indexOf(distracteur)
      distracteursFiltres.splice(index, 1)
    }

    this.correction = `Diminuer de $${pourcentage}\\,\\%$ revient à multiplier par $${texNombre(1 - pourcentage / 100, 2)}$ (coefficient multiplicateur).<br>
 Ainsi, le nouveau prix est donné par :  $${texNombre(prixInitial)} \\times \\left(1 - \\dfrac{${pourcentage}}{100}\\right) = ${texNombre(prixInitial)} \\times (1 - ${texNombre(pourcentage / 100, 2)}) = ${miseEnEvidence(bonneReponse.replace(/\$/g, ''))}$`

    // Construction du tableau final avec exactement 4 réponses
    this.reponses = [bonneReponse, ...troisDistracteurs]
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
