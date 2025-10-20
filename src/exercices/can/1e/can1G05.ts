import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
} from '../../../lib/outils/ecritures'
import { sp } from '../../../lib/outils/outilString'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
export const titre = 'Déterminer un produit scalaire avec les coordonnées'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '27/06/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 *
*/
export const uuid = 'e20cc'

export const refs = {
  'fr-fr': ['can1G05'],
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
    const vx = randint(-10, 10, 0)
    const vy = randint(-10, 10, 0)

    this.question = ` Dans un repère orthonormé $\\big(O ; \\vec \\imath,\\vec \\jmath\\big)$, on donne deux vecteurs :<br>
    $\\vec{u}\\begin{pmatrix}${ux}${sp(1)} \\\\ ${sp(1)}${uy}\\end{pmatrix}$ et $\\vec{v}\\begin{pmatrix}${vx}${sp(1)} \\\\ ${sp(1)}${vy}\\end{pmatrix}$<br>

    Alors $\\vec{u}\\cdot\\vec{v}=$`
    if (!this.interactif) {
      this.question += ' ....'
    }
    this.correction = `$\\begin{aligned}\\vec{u}\\cdot\\vec{v}&=${ux}\\times ${ecritureParentheseSiNegatif(vx)}+${ecritureParentheseSiNegatif(uy)}\\times ${ecritureParentheseSiNegatif(vy)}\\\\
    &=${ux * vx} ${ecritureAlgebrique(uy * vy)}\\\\
    &=${miseEnEvidence(ux * vx + uy * vy)}\\end{aligned}$



   `
    this.reponse = ux * vx + uy * vy
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
