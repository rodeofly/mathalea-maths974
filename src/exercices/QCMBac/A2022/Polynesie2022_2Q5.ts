import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../../lib/outils/embellissements'
import ExerciceQcm from '../../ExerciceQcm'

export const uuid = '2f559'
export const refs = {
  'fr-fr': ['TSA2-QCM10'],
  'fr-ch': ['NR'],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Polynésie 05/22 : tangente'
export const dateDePublication = '09/03/2025'
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
      '$y = 2\\text{e}x - \\text{e}$', // Réponse correcte (b)
      '$y = \\text{e}x + \\text{e}$', // Mauvaise réponse (a)
      '$y = 2\\text{e}x + \\text{e}$', // Mauvaise réponse (c)
      '$y = \\text{e}x$', // Mauvaise réponse (d)
    ]

    this.enonce =
      "L'équation réduite de la tangente au point d'abscisse 1 de la courbe de la fonction $f$<br> définie sur $\\R$ par "
    this.enonce += '$f(x) = x\\text{e}^x$ est'

    this.correction = 'On calcule la dérivée de $f$ :<br>'
    this.correction +=
      "$f'(x) = \\text{e}^x + x\\text{e}^x = (1 + x)\\text{e}^x.$<br>"
    this.correction += "Ainsi, $f'(1) = (1 + 1)\\text{e}^1 = 2\\text{e}$.<br>"
    this.correction +=
      'On a également $f(1) = 1 \\times \\text{e}^1 = \\text{e}$.<br>'
    this.correction += "L'équation de la tangente est donc :<br>"
    this.correction +=
      "$y = f'(1)(x - 1) + f(1) = 2\\text{e}(x - 1) + \\text{e} = 2\\text{e}x - 2\\text{e} + \\text{e} = 2\\text{e}x - \\text{e}.$<br>"
    this.correction += `La bonne réponse est donc $${miseEnEvidence('y = 2\\text{e}x - \\text{e}')}$`
  }

  constructor() {
    super()
    this.options = { vertical: true, ordered: false }
    this.versionOriginale()
  }
}
