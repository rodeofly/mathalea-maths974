import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
import { texNombre } from '../../../lib/outils/texNombre'

export const titre = 'Compléter une égalité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'e56b3'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierNumbers
    this.formatInteractif = 'fillInTheBlank'
    this.canOfficielle = false
  }

  nouvelleVersion() {
    const a = this.canOfficielle ? 7 : randint(5, 9)
    const b = this.canOfficielle ? 3 : randint(2, 6)
    const c = this.canOfficielle ? 2 : randint(2, 6)

    this.reponse = texNombre(a + b + c, 0)
    this.consigne = 'Complète. '
    this.question = `${a}+${b}= %{champ1} -${c} `
    this.correction = `Le nombre cherché est donné par : $${a}+${b}+${c}$ soit $${miseEnEvidence(this.reponse)}$.`
    this.canEnonce = 'Complète.'
    this.canReponseACompleter = `$${a}+${b}=\\ldots -${c}$ `
  }
}
