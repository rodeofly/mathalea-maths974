import { ecritureParentheseSiNegatif } from '../../../lib/outils/ecritures'
import { sp } from '../../../lib/outils/outilString'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = "Calculer la norme d'un vecteur"
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '29/01/2025'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Stéphane Guyon

 *
*/
export const uuid = '3f038'

export const refs = {
  'fr-fr': ['canTSpeE06'],
  'fr-ch': [],
}
export default class ProduitScalaireCoordonnees extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const ux = randint(-10, 10)
    const uy = randint(-10, 10, 0)
    const uz = randint(-10, 10, 0)
    this.formatChampTexte = KeyboardType.clavierFullOperations
    this.question = ` Dans un repère orthonormé de l'espace $\\big(O ; \\vec \\imath,\\vec \\jmath, \\vec k\\big)$,<br> calculer la norme du vecteur
    $\\vec{u}\\begin{pmatrix}${ux}${sp(1)} \\\\ ${sp(1)}${uy}\\\\ ${sp(1)}${uz}\\end{pmatrix}$.<br>

     <br>$\\vert\\vert\\vec{u}\\vert\\vert=$`
    if (!this.interactif) {
      this.question += ' ....'
    }
    this.correction = `$\\begin{aligned}
    \\vert\\vert\\vec{u}\\vert\\vert&=\\sqrt{${ecritureParentheseSiNegatif(ux)}^2 +${ecritureParentheseSiNegatif(uy)}^2+${ecritureParentheseSiNegatif(uz)}^2}\\\\
   &=\\sqrt{${ux * ux} +${uy * uy}+${uz * uz}}\\\\
    &=\\sqrt{${miseEnEvidence(ux * ux + uy * uy + uz * uz)}}
    \\end{aligned}$`
    this.reponse = `\\sqrt{${ux * ux + uy * uy + uz * uz}}`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
