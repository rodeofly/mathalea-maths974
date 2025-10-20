import { bleuMathalea } from '../../../lib/colors'
import { choice } from '../../../lib/outils/arrayOutils'
import {
  miseEnEvidence,
  texteEnCouleur,
} from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Résoudre un problème de robinets'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 */
export const uuid = '8767b'

export const refs = {
  'fr-fr': ['can4P01'],
  'fr-ch': [],
}
export default class ProblemesDeRobinets extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const a = choice([2, 3, 4, 5, 6, 10]) // nombre de secondes pour remplir un litre
    const b = 60 / a // nombres de litres/min
    const c = randint(2, b - 1, [10]) % 10 // volume du seau à remplir
    this.reponse = c * a
    this.question = `Le débit d'eau d'un robinet est de $${b}$ L/min.<br>
    
    Combien de secondes faut-il pour remplir un seau de $${c}$ L ?`
    this.correction = `Il faut $${miseEnEvidence(texNombre(a * c))}$ s pour remplir le seau de $${c}$ L.`
    this.correction += texteEnCouleur(
      `<br> Mentalement : <br>
    On commence par déterminer le temps en secondes (puisque dans la question,
       il est demandé un temps en secondes) qu'il faut pour remplir $1$ L.<br>
    Comme le débit est de  $${b}$ L
    pour une minute soit $60$ secondes, on divise $60$ par $${b}$ pour obtenir
    ce temps :  $\\dfrac{60}{${b}}=${a}$ s.<br>
    Puisqu'il faut $${a}$ s pour remplir un litre, il en faut $${c}$ fois plus pour remplir un seau de
    $${c}$ L, soit $${a}\\times ${c}=${a * c}$ s.`,
      bleuMathalea,
    )
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
