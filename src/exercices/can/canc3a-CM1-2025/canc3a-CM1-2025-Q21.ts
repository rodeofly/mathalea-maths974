import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Effetuer une multiplication avec $50$'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '320c3'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class Can2025CM1Q21 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
    this.optionsChampTexte = { texteAvant: '$=$' }
  }

  nouvelleVersion() {
    this.reponse = 100
    this.question = '$2\\times 50$ '
    this.correction = `$2\\times 50 = ${miseEnEvidence(100)}$`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
