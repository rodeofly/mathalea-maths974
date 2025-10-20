import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceQcm from '../../ExerciceQcm'

export const uuid = 'e205f'
export const refs = {
  'fr-fr': ['TSP1-QCM08'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Métropole 03/23 : conditionnelles'
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
      '$\\dfrac{1}{3}$', // Réponse correcte (b)
      '$\\dfrac{1}{5}$', // Mauvaise réponse (a)
      '$\\dfrac{7}{15}$', // Mauvaise réponse (c)
      '$\\dfrac{5}{12}$', // Mauvaise réponse (d)
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
      'La probabilité que le joueur choisisse le monde A et gagne la partie est égale à :'
    this.correction = 'On utilise la formule des probabilités totales :<br>'
    this.correction += '$P(G) = P(A \\cap G) + P(B \\cap G).$<br>'
    this.correction +=
      'On connaît $P(G) = \\dfrac{12}{25}$ et $P(A \\cap G) = \\dfrac{7}{25}$, donc :<br>'
    this.correction +=
      '$P(B \\cap G) = P(G) - P(A \\cap G) = \\dfrac{12}{25} - \\dfrac{7}{25} = \\dfrac{5}{25} = \\dfrac{1}{5}.$<br>'
    this.correction +=
      'Ensuite, on utilise la formule des probabilités conditionnelles :<br>'
    this.correction +=
      '$P_B(G) = \\dfrac{P(B \\cap G)}{P(B)} = \\dfrac{\\dfrac{1}{5}}{\\dfrac{3}{5}} = \\dfrac{1}{3}.$<br>'
    this.correction += `La bonne réponse est donc $${miseEnEvidence('\\dfrac{1}{3}')}$.`
  }

  constructor() {
    super()
    this.options = { vertical: false, ordered: false }
    this.versionOriginale()
    this.besoinFormulaire3CaseACocher = ["Avec le préambule de l'énoncé", true]
    this.sup3 = true
  }
}
