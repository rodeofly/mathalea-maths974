import { texteEnCouleurEtGras } from '../../../lib/outils/embellissements'
import ExerciceQcm from '../../ExerciceQcm'

export const uuid = '26af7'
export const refs = {
  'fr-fr': ['TSA5-QCM14'],
  'fr-ch': ['NR'],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Polynésie 05/22 : dérivée'
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
      "$g'(x) = \\dfrac{2x + 1}{x^2 + x + 1}$", // Réponse correcte (d)
      "$g'(x) = \\dfrac{1}{2x + 1}$", // Mauvaise réponse (a)
      "$g'(x) = \\dfrac{1}{x^2 + x + 1}$", // Mauvaise réponse (b)
      "$g'(x) = \\ln (2x + 1)$", // Mauvaise réponse (c)
    ]

    this.enonce =
      'On considère la fonction $g$ définie et dérivable sur $]0~;~+ \\infty[$ par '
    this.enonce += '$g(x) = \\ln \\left(x^2 + x + 1\\right).$<br>'
    this.enonce +=
      "Pour tout nombre réel $x$ strictement positif, laquelle des expressions suivantes est égale à $g'(x)$ ?"

    this.correction =
      'La fonction $g$ est dérivable comme composée de fonctions dérivables.<br>'
    this.correction +=
      'On pose $u(x) = x^2 + x + 1$. Cette fonction est positive sur $]0~;~+\\infty[$ comme somme de fonctions positives.<br>'
    this.correction += "Sa dérivée est $u'(x) = 2x + 1$.<br>"
    this.correction +=
      "La dérivée de $\\ln(u(x))$ est donnée par $\\dfrac{u'(x)}{u(x)}$.<br>"
    this.correction += 'Ainsi, on a :<br>'
    this.correction += "$g'(x) = \\dfrac{2x + 1}{x^2 + x + 1}.$<br>"
    this.correction += `${texteEnCouleurEtGras('La dérivée de la fonction $g$ est donc égale à $\\dfrac{2x + 1}{x^2 + x + 1}$.')}`
  }

  constructor() {
    super()
    this.options = { vertical: true, ordered: false }
    this.versionOriginale()
  }
}
