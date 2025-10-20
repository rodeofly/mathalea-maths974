import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'

export const titre = 'Calculer avec les chiffres (relatifs)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '7a9aa'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora

*/
export default class calcAvecChiffresRel extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsChampTexte = { texteAvant: ' $=$' }
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const a = randint(1, 9)

    this.reponse = a - 2025
    this.question = `$${a}-${texNombre(2025, 0)}$`
    this.correction = `$${a}-${texNombre(2025, 0)}=${a}+(-${texNombre(2025, 0)})=${miseEnEvidence(texNombre(this.reponse, 0))}$`

    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
