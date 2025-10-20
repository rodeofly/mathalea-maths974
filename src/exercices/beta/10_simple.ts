import ExerciceSimple from '../ExerciceSimple'
import { randint } from '../../modules/outils'
import { texNombre } from '../../lib/outils/texNombre'
export const titre = 'Somme de deux entiers'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '4/5/2024'

export const uuid = '88e43'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Rémi Angot

*/
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 4
  }

  nouvelleVersion() {
    const a = randint(1, 10)
    const b = randint(1, 10)
    this.question = `$${texNombre(a, 0)}+${texNombre(b, 0)}$`
    this.correction = `$${texNombre(a, 0)} + ${texNombre(b, 0)} = ${texNombre(a + b, 0)}$`
    this.reponse = a + b
  }
}
