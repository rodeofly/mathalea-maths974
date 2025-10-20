import ExerciceQcm from '../../ExerciceQcm'

export const uuid = '836b0'
export const refs = {
  'fr-fr': ['TSA1-QCM01'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Amérique 08/23 : limites'
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
      'la suite $\\left(\\dfrac{v_{n}}{u_{n}}\\right)$ converge.',
      'la suite $\\left(u_{n}\\right)$ est croissante.',
      'la suite $\\left(\\dfrac{1}{v_{n}}\\right)$ converge.',
      '$\\displaystyle\\lim _{n \\rightarrow+\\infty}\\left(-u_{n}\\right)^{n}=-\\infty$. ',
    ]

    this.enonce = `  On considère deux suites $\\left(u_{n}\\right)$ et $\\left(v_{n}\\right)$ à termes strictement positifs<br> telles que 
    $\\displaystyle\\lim _{n \\rightarrow+\\infty} u_{n}=+\\infty$ et $\\left(v_{n}\\right)$ converge vers 0 .<br>
    On peut affirmer que :`
    this.correction =
      'On calcule la limite du quotient de deux suites.<br>  $\\dfrac{0}{+\\infty}\\to 0$'
  }

  constructor() {
    super()
    this.options = { vertical: true, ordered: false }
    this.versionOriginale()
  }
}
