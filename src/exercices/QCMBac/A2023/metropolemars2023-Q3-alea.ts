import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceQcm from '../../ExerciceQcm'

export const uuid = '41f8f'
export const refs = {
  'fr-fr': ['TSP1-QCM09'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Métropole 03/23 : binomiale'
export const dateDePublication = '11/03/2025'
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
      '$0,188$', // Réponse correcte (c)
      '$0,859$', // Mauvaise réponse (a)
      '$0,671$', // Mauvaise réponse (b)
      '$0,187$', // Mauvaise réponse (d)
    ]

    this.enonce = this.sup3
      ? `Un jeu vidéo possède une vaste communauté de joueurs en ligne.<br> Avant de débuter une partie, le joueur doit choisir entre deux "mondes" : soit le monde A, soit le monde B.
<br>On choisit au hasard un individu dans la communauté des joueurs.<br>
Lorsqu'il joue une partie, on admet que :<br>
$\\bullet~~$ la probabilité que le joueur choisisse le monde A est égale à $\\dfrac25$ ;<br>
$\\bullet~~$ si le joueur choisit le monde A, la probabilité qu'il gagne la partie est de $\\dfrac{7}{10}$ ;<br>
$\\bullet~~$ la probabilité que le joueur gagne la partie est de $\\dfrac{12}{25}$.<br>
On considère les évènements suivants : <br>
$\\bullet~~$ $A$ :  "Le joueur choisit le monde A" ; <br>
$\\bullet~~$ $B$ :  "Le joueur choisit le monde B"  ;<br>
$\\bullet~~$ $G$ :  "Le joueur gagne la partie" .<br><br>`
      : ''

    this.enonce +=
      'La probabilité, arrondie au millième, que le joueur gagne exactement $6$ parties est égale à :'

    this.correction =
      'On utilise la loi binomiale avec $n = 10$ et $p = \\dfrac{12}{25}$ :<br>'
    this.correction +=
      '$P(X = 6) = \\binom{10}{6} \\left(\\dfrac{12}{25}\\right)^6 \\left(\\dfrac{13}{25}\\right)^4 \\approx 0,188.$<br>'
    this.correction += `La bonne réponse est donc $${miseEnEvidence('0,188')}$.`
  }

  constructor() {
    super()
    this.options = { vertical: false, ordered: false }
    this.versionOriginale()
    this.besoinFormulaire3CaseACocher = ["Avec le préambule de l'énoncé", true]
    this.sup3 = true
  }
}
