import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Effetuer une multiplication avec $25$'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '41d8d'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class Can2025N6Q21 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
    this.optionsChampTexte = { texteAvant: '$=$' }
  }

  nouvelleVersion() {
    this.reponse = 100
    this.question = '$4\\times 25$ '
    this.correction = `$4\\times 25 = ${miseEnEvidence(100)}$`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
