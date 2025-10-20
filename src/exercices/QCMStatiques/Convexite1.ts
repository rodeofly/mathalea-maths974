import ExerciceQcm from '../ExerciceQcm'

export const uuid = '9bfb4'
export const refs = {
  'fr-fr': ['TSA2-QCM02'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'QCM de cours : convexité'
export const dateDePublication = '03/11/2024'
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
export default class metropoleSept2024Ex4Q1 extends ExerciceQcm {
  versionOriginale: () => void = () => {
    this.reponses = [
      "$f'(x_2)\\geqslant f'(x_1)$",
      "$f''(x_2)\\geqslant f''(x_1)$",
      "$f'(x_1)\\geqslant f'(x_2)$",
      "$f^{\\prime\\prime}(x_2)\\leqslant f''(x_1)$",
    ]

    this.enonce =
      'Soit $f$ une fonction deux fois dérivable et convexe sur un intervalle $[a;b]$.<br> On a alors pour tout $x_1$ et $x_2$ vérifiant : $a\\leqslant x_1\\leqslant x_2\\leqslant b$'

    this.correction =
      "La fonction étant convexe sur l'intervalle $[a;b]$, la dérivée de $f$ est une fonction croissante sur l'intervalle.<br> "
    this.correction += " Il vient alors que $f'(x_2)\\geqslant f'(x_1)$"
  }

  constructor() {
    super()
    this.options = { vertical: true, ordered: false }
    this.versionOriginale()
  }
}
