import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Aire du disque'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '3422w'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N4Q27 extends ExerciceCan {
  enonce(a?: number) {
    if (a == null) {
      a = randint(4, 12) * 2
    }
    this.question = `Aire exacte du disque de diamètre $${a}$ m`
    this.correction = `Le rayon du disque est : $r=${a}\\div 2=${a / 2}$.<br>L'aire du disque est : $\\pi r^2=\\pi\\times ${a / 2}^2=${miseEnEvidence(`${(a * a) / 4}\\pi`)}\\text{ m}^2$.`
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\ldots$ m$^2$'
    this.optionsChampTexte = { texteApres: '$\\text{ m}^2$' }
    this.formatChampTexte = KeyboardType.college6eme
    this.reponse = `${Math.round((a * a) / 4)}\\pi`
    this.question += this.interactif ? '<br>' : ''
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(6) : this.enonce()
  }
}
