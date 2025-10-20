import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../../lib/outils/embellissements'
import ExerciceQcm from '../../ExerciceQcm'

export const uuid = 'a2828'
export const refs = {
  'fr-fr': ['TSA5-QCM12'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Madagascar 05/22 : tangente'
export const dateDePublication = '07/03/2025'
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
      '$y = \\left(6\\text{e}^{\\frac12}\\right)  x - 4\\text{e}$', // Réponse correcte (d)
      '$y = \\left(6\\text{e}^{\\frac12}\\right) x$', // Mauvaise réponse (a)
      '$y = \\left(6\\sqrt{\\text{e}}\\right) x + 2\\text{e}$', // Mauvaise réponse (b)
      '$y = 6\\text{e}^{\\frac{x}{2}}$', // Mauvaise réponse (c)
    ]

    this.enonce =
      "On considère la fonction $h$ définie sur l'intervalle $]0~;~2]$ par:    $h(x) = x^2(1 + 2\\ln (x)).$"
    this.enonce +=
      "<br>On admet que $h$ est dérivable sur l'intervalle $]0~;~2]$."
    this.enonce +=
      "<br>On note $h'$ sa dérivée et on admet que, pour tout réel $x$ de l'intervalle $]0~;~2]$, on a : $h'(x) = 4x(1 + \\ln (x)).$"
    this.enonce +=
      ' <br>On note $\\mathcal{C}_h$ la courbe représentative de $h$ dans un repère du plan. '
    this.enonce +=
      "<br>Une équation de la tangente à $\\mathcal{C}_h$ au point d'abscisse $\\sqrt{\\text{e}}$ est :<br>"
    this.correction =
      "<br>Une équation de la tangente est $y=h'\\left(\\sqrt{\\mathrm{e}}\\right) \\left(x - \\sqrt{\\mathrm{e}}\\right)+h\\left(\\sqrt{\\mathrm{e}}\\right)$.<br>"
    this.correction +=
      "$\\bullet~~$ On calcule $h'\\left(\\sqrt{\\text{e}}\\right) = 4 \\times \\sqrt{\\text{e}}\\left(1 + \\ln \\left(\\sqrt{\\text{e}}\\right)\\right) = 4 \\times \\sqrt{\\text{e}} \\times \\left(1 + \\dfrac12\\right) = 6\\sqrt{\\text{e}}$.<br>"
    this.correction +=
      '$\\bullet~~$ On calcule $h\\left(\\sqrt{\\text{e}}\\right) = \\left(\\sqrt{\\text{e}}\\right)^2\\left(1 + 2 \\ln \\left(\\sqrt{\\text{e}}\\right)\\right) = \\text{e} \\times (1 + 1) = 2\\text{e}$.<br>'
    this.correction += "L'équation de la tangente s'écrit donc :<br>"
    this.correction +=
      '$\\begin{aligned}    y  &= 6\\sqrt{\\text{e}}\\left(x - \\sqrt{\\text{e}}\\right)+ 2\\text{e}  \\\\    \\iff y &= 6x\\sqrt{\\text{e}} - 4\\text{e} \\end{aligned}$<br>'
    this.correction += `L'équation de la tangente est donc : $${miseEnEvidence('y = \\left(6\\text{e}^{\\frac12}\\right)  x - 4\\text{e}')}$`
  }

  constructor() {
    super()
    this.options = { vertical: true, ordered: false }
    this.versionOriginale()
  }
}
