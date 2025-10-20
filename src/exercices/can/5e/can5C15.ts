import { texteEnCouleur } from '../../../lib/outils/embellissements'
import { ecritureParentheseSiNegatif } from '../../../lib/outils/ecritures'
import { abs } from '../../../lib/outils/nombres'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
export const titre = 'Rechercher un nombre à ajouter'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 * Date de publication
*/
export const uuid = '6b25b'

export const refs = {
  'fr-fr': ['can5C15'],
  'fr-ch': [],
}
export default class NombreATrouver extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const a = randint(-9, 9, 0)
    const b = randint(1, 8)
    const c = a - b

    this.question = `Quel nombre doit-on ajouter à $${a}$ pour obtenir $${c}$ ?
    `
    this.correction = `Le nombre $n$ à ajouter vérifie $${a}+n=${c}$, soit
    $n=${c}-${ecritureParentheseSiNegatif(a)}=${c - a}$. <br>
    `
    this.correction += texteEnCouleur(` Mentalement : <br>
    Le nombre cherché est négatif car le résultat est plus petit que le nombre de départ. <br>
L'"écart" entre les deux nombres est $${abs(c - a)}$. Il faut donc ajouter $${c - a}$.
`)
    this.reponse = c - a
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
