import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'

import { texNombre } from '../../../lib/outils/texNombre'
export const titre = 'Compléter une table de multiplication'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '82b18'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    this.formatInteractif = 'fillInTheBlank'
    this.canOfficielle = false
  }

  nouvelleVersion() {
    const a = this.canOfficielle ? 9 : randint(4, 9)
    const b = this.canOfficielle ? 4 : randint(4, 9)

    this.reponse = texNombre(b, 0)
    this.consigne = 'Complète. '
    this.correction = `$${a} \\times ${miseEnEvidence(this.reponse)}=${a * b}$`
    this.question = `${a} \\times %{champ1} = ${a * b} `
    this.canEnonce = 'Complète.'
    this.canReponseACompleter = `$${a} \\times \\ldots = ${a * b}$ `
  }
}
