import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import { randint } from '../../../modules/outils'
export const titre = 'Calculer avec des entiers relatifs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '7b6ee'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class CalculsEntiersRelatifs extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsChampTexte = { texteAvant: ' $=$' }
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const choix = choice([1, 2])
    const a = randint(-30, -5)
    if (choix === 1) {
      this.reponse = 2025 - a
      this.question = `$${texNombre(2025, 0)}-(${a})$`
      this.correction = `$${texNombre(2025, 0)}-(${a})=${texNombre(2025, 0)}+(-${a})=${miseEnEvidence(texNombre(this.reponse, 0))}$`
    }
    if (choix === 2) {
      this.reponse = a - 2025
      this.question = `$(${a})-${texNombre(2025, 0)}$`
      this.correction = `$(${a})-${texNombre(2025, 0)}=(${a})+(-${texNombre(2025, 0)})=${miseEnEvidence(texNombre(this.reponse, 0))}$`
    }

    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
