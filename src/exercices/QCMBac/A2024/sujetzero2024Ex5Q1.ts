import ExerciceQcm from '../../ExerciceQcm'
export const uuid = 'e6d46'
export const refs = {
  'fr-fr': ['TA8-QCM01'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Sujet zéro 2024 : équation trigo'
export const dateDePublication = '28/10/2024'
/**
 * Ceci est un exo construit à partir d'une question de qcm de Bac.
 * Il utilise la classe ExerciceQcm qui définit les contours de l'exo (sans version aléatoire)
 * Ce moule à exo dispose d'une méthode qcmCamExport qui permet de récupérer le JSON de la question et de la reponse pour qcmCam.
 * Il est interactif et dispose d'un export AMC d'office
 */
/**
 *
 * @author Stéphane Guyon
 *
 */
export default class SujetZero2024Ex5Q1 extends ExerciceQcm {
  versionOriginale: () => void = () => {
    this.reponses = [
      'deux solutions',
      'zéro solution',
      'une solution',
      'quatre solutions',
    ]

    this.enonce = `Sur l'intervalle $[0~;~2 \\pi]$, l'équation 
    $\\sin (x) = 0,1$
    admet :`

    this.correction +=
      "On peut par exemple dire que la courbe représentant la fonction sinus et la droite d'équation $y=0,1$<br>"
    this.correction +=
      "ont deux points d'intersection sur l'intervalle   $[ 0~;~ 2\\pi]$."
  }

  constructor() {
    super()
    this.options = { vertical: true, ordered: false }
    this.versionOriginale()
  }
}
