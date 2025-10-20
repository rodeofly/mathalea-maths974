import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import Decimal from 'decimal.js'
import { randint } from '../../../modules/outils'
export const titre = 'Donner une écriture scientifique'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'e0486'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class ecritureScien extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierFullOperations
    this.optionsDeComparaison = { texteSansCasse: true }
  }

  nouvelleVersion() {
    const exposant = randint(0, 2)
    const a = new Decimal(2025).div(new Decimal(10).pow(exposant))
    this.question = `Quelle est l'écriture scientifique de $${texNombre(a)}$ ?`
    this.reponse = `${texNombre(2.025)}\\times10^${3 - exposant}`
    this.correction = `L'écriture scientifique de $${texNombre(a)}$ est $${miseEnEvidence(`${this.reponse}`)}$.`
    if (this.interactif) {
      this.question += `<br>$${texNombre(a)}=$`
    }

    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
