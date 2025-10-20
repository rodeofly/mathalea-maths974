import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'

import Decimal from 'decimal.js'
import { texNombre } from '../../../lib/outils/texNombre'
import { toutPourUnPoint } from '../../../lib/interactif/mathLive'

export const titre = 'Encadrer un décimal par deux entiers consécutifs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'ffbe9'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Jean-Claude Lhote

*/

export default class EncadreParDeuxEntiers extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatInteractif = 'fillInTheBlank'

    this.canOfficielle = false
  }

  nouvelleVersion() {
    let decimal: Decimal
    let partieDecimale: Decimal
    if (this.canOfficielle) {
      decimal = new Decimal('19.3')
    } else {
      partieDecimale = new Decimal(randint(2, 8)).div(10)
      decimal = new Decimal(randint(11, 99)).add(partieDecimale)
    }
    const entierInf = decimal.floor()
    const entierSup = decimal.ceil()
    this.consigne = `Encadre $${texNombre(decimal, 1)}$ par deux entiers consécutifs : `
    this.question = `%{champ1} < ${texNombre(decimal, 1)} < %{champ2}`
    this.canEnonce = 'Encadre par deux entiers consécutifs.'
    this.canReponseACompleter = `$\\ldots < ${texNombre(decimal, 1)} < \\ldots$`
    this.reponse = {
      bareme: toutPourUnPoint,
      champ1: { value: entierInf },
      champ2: { value: entierSup },
    }
    this.correction = `$${miseEnEvidence(texNombre(entierInf, 0))} < ${texNombre(decimal, 1)} < ${miseEnEvidence(texNombre(entierSup, 0))}$`
  }
}
