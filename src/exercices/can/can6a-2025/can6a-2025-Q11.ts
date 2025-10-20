import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'

import { texNombre } from '../../../lib/outils/texNombre'
import { choice } from '../../../lib/outils/arrayOutils'
export const titre = 'Calculer avec des dixèmes/centièmes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '43cd9'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class Can2025N62Q11 extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
    this.optionsChampTexte = { texteApres: 'unités.' }
  }

  nouvelleVersion() {
    const a = this.canOfficielle ? 54 : randint(51, 59)
    const b = this.canOfficielle
      ? 'dixièmes'
      : choice(['dixièmes', 'centièmes'])

    this.reponse = b === 'dixièmes' ? texNombre(10 * a, 0) : texNombre(a, 0)
    this.question = `$100\\times ${a}$ ${b} est égal à `
    if (!this.interactif) {
      this.question += '$\\ldots$ unités.'
    }
    this.correction = `$100\\times ${a}$ ${b} est égal à $100\\times ${b === 'dixièmes' ? `${texNombre(a / 10, 1)}` : `${texNombre(a / 100, 2)}`} = ${miseEnEvidence(this.reponse)}$.`
    this.canEnonce = `$100\\times ${a}$ ${b} est égal à `
    this.canReponseACompleter = '$\\ldots$ unités'
  }
}
