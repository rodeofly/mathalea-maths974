import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { arrondi } from '../../../lib/outils/nombres'
import { texNombre } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = "Arrondir à l'unité"
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Jean-Claude Lhote
 * Publié le 11 / 09 / 2021

 */
export const uuid = 'de7d5'

export const refs = {
  'fr-fr': ['canc3N04', 'BP2AutoS10'],
  'fr-ch': [],
}
export default class ArrondiUnite extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1

    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const a = randint(1, 20)
    const b = randint(0, 9, 5)
    const c = randint(0, 9, b)
    const d = arrondi(a + b * 0.1 + c * 0.01, 2)
    this.question = `Quel est l'arrondi à l'unité de $${texNombre(d, 2)}$ ?`
    this.correction = `$${texNombre(d, 2)} \\approx ${Math.round(d)}$`
    this.reponse = Math.round(d)
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
