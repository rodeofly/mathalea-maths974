import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../../lib/outils/embellissements'
import ExerciceQcm from '../../ExerciceQcm'

export const uuid = '752b3'
export const refs = {
  'fr-fr': ['TSA6-QCM7'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Métropole 05/22 : primitive'
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
      '$F(x) = \\dfrac{1}{2}\\text{e}^{x^2} + \\dfrac{1}{2}$', // Réponse correcte (d)
      '$F(x) = \\dfrac{x^2}{2}\\text{e}^{x^2}$', // Mauvaise réponse (a)
      '$F(x) = \\dfrac{1}{2}\\text{e}^{x^2}$', // Mauvaise réponse (b)
      '$F(x) = \\left(1 + 2x^2\\right)\\text{e}^{x^2}$', // Mauvaise réponse (c)
    ]

    this.enonce = 'Soit $f$ la fonction définie sur $\\R$ par '
    this.enonce += '$f(x) = x\\text{e}^{x^2}.$<br>'
    this.enonce +=
      'La primitive $F$ de $f$ sur $\\R$ qui vérifie $F(0) = 1$ est définie par :'

    this.correction =
      "On remarque que $f(x)$ est de la forme $u'(x) \\times \\text{e}^{u(x)}$ avec $u(x) = x^2$.<br>"
    this.correction += 'Ainsi, une primitive de $f$ est :'
    this.correction += '$F(x) = \\dfrac{1}{2} \\text{e}^{x^2} + k,$ '
    this.correction += 'où $k$ est une constante.<br>'
    this.correction +=
      'On utilise la condition $F(0) = 1$ pour déterminer $k$ :<br>'
    this.correction +=
      '$\\dfrac{1}{2} \\text{e}^{0} + k = 1 \\iff \\dfrac{1}{2} + k = 1 \\iff k = \\dfrac{1}{2}.$<br>'
    this.correction += 'Donc, la primitive recherchée est :'
    this.correction +=
      ' $F(x) = \\dfrac{1}{2} \\text{e}^{x^2} + \\dfrac{1}{2}.$<br>'
    this.correction += `La bonne réponse est donc $${miseEnEvidence('F(x) = \\dfrac{1}{2}\\text{e}^{x^2} + \\dfrac{1}{2}')}$.`
  }

  constructor() {
    super()
    this.options = { vertical: true, ordered: false }
    this.versionOriginale()
  }
}
