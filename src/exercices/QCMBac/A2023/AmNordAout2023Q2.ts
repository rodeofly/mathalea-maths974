import ExerciceQcm from '../../ExerciceQcm'

export const uuid = 'f5387'
export const refs = {
  'fr-fr': ['TSA4-QCM01'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Amérique 08/23 : TVI'
export const dateDePublication = '05/11/2024'
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
export default class SujetZero2024Ex5Q5 extends ExerciceQcm {
  versionOriginale: () => void = () => {
    this.reponses = [
      "il existe au moins un nombre réel $a$ dans l'intervalle $[1~;~3]$ tel que $h(a) = 1$.",
      "la fonction $h$ est croissante sur l'intervalle $[-1~;~1]$.",
      "la fonction $h$ est positive sur l'intervalle $[-1~;~1]$.",
      "l'équation $h(x)=1$ admet exactement deux solutions dans l'intervalle ",
    ]

    this.enonce = ` On considère une fonction $h$ continue sur l'intervalle $[-2 ; 4]$ telle que :

$h(-1)=0, \\qquad h(1) = 4, \\qquad h(3) = -1.$<br>

On peut affirmer que :`
    this.correction =
      "C'est l'application du théorème des valeurs intermédiaires sur l'intervalle $[1~;~3]$."
  }

  constructor() {
    super()
    this.options = { vertical: true, ordered: false }
    this.versionOriginale()
  }
}
