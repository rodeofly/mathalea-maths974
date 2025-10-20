import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import Decimal from 'decimal.js'
import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Soustraire un décimal'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '917c2'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class soustraireDecimal extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsChampTexte = { texteAvant: ' $=$' }
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const annee = new Decimal(2025)
    const a = new Decimal(randint(0, 4) * 2 + 1).div(2)
    this.reponse = annee.sub(a).toFixed(1)
    this.question = `$${texNombre(2025, 0)}-${texNombre(a, 1)}$`
    this.correction = `$${texNombre(2025, 0)}-${texNombre(a, 1)}=${miseEnEvidence(texNombre(annee.sub(a), 1))}$`

    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
