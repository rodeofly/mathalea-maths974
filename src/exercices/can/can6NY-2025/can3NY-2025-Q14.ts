import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import Decimal from 'decimal.js'
import { randint } from '../../../modules/outils'

export const titre = ''
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'f9915'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora
 */
export default class calcAvecChiffresPrio extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const choix = choice([true, false])
    const a = randint(1, 4)
    const val = new Decimal(2025).div(choice([10, 100, 1000]))
    if (a === 1) {
      this.question = `Calculer $${choix ? `4 \\times ${texNombre(val, 3)}\\times 25` : `25 \\times ${texNombre(val, 3)}\\times 4`}$.`
      this.reponse = texNombre(new Decimal(val).mul(100), 3)
      this.correction = `$${choix ? `4 \\times ${texNombre(val, 3)}\\times 25` : `25 \\times ${texNombre(val, 3)}\\times 4`}=100 \\times ${texNombre(val, 3)}=${miseEnEvidence(this.reponse)}$`
    } else if (a === 2) {
      this.question = `Calculer $${choix ? `2 \\times ${texNombre(val, 3)}\\times 50` : `50 \\times ${texNombre(val, 3)}\\times 2`}$.`
      this.reponse = texNombre(new Decimal(val).mul(100), 3)
      this.correction = ` $${choix ? `2 \\times ${texNombre(val, 3)}\\times 50` : `50 \\times ${texNombre(val, 3)}\\times 2`}=100 \\times ${texNombre(val, 3)}=${miseEnEvidence(this.reponse)}$`
    } else if (a === 3) {
      this.question = `Calculer $${choix ? `0,25 \\times ${texNombre(val, 3)}\\times 4` : `4 \\times ${texNombre(val, 3)}\\times 0,25`}$.`
      this.reponse = texNombre(new Decimal(val).mul(1), 3)
      this.correction = ` $${choix ? `0,25 \\times ${texNombre(val, 3)}\\times 4` : `4 \\times ${texNombre(val, 3)}\\times 0,25`}=1 \\times ${texNombre(val, 3)}=${miseEnEvidence(this.reponse)}$`
    } else {
      this.question = `Calculer $${choix ? `4 \\times ${texNombre(val, 3)}\\times 2,5` : `2,5 \\times ${texNombre(val, 3)}\\times 4`}$.`
      this.reponse = texNombre(new Decimal(val).mul(10), 3)
      this.correction = `  $${choix ? `4 \\times ${texNombre(val, 3)}\\times 2,5` : `2,5 \\times ${texNombre(val, 3)}\\times 4`}=10 \\times ${texNombre(val, 3)}=${miseEnEvidence(this.reponse)}$`
    }
    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
