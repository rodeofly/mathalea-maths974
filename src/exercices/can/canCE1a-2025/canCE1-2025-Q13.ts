import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
export const titre = "Trouver la moitié d'un nombre"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'cd933'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Gilles Mora

*/
export default class Can2025CE1Q13 extends ExerciceCan {
  enonce(a?: number) {
    if (a == null) {
      a = randint(2, 9) * 10
    }

    this.reponse = (a / 2).toString()
    this.optionsChampTexte = { texteApres: '.' }
    this.question = `La moitié de  $${a}$ est : `
    this.correction = `La moitié de $${a}$ est $${miseEnEvidence(a / 2)}$ car $2\\times ${a / 2}=${a}$.`

    this.canEnonce = `La moitié de  $${a}$ est :`
    this.canReponseACompleter = ' $\\ldots$ '
    if (!this.interactif) {
      this.question += ' $\\ldots$ '
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(80) : this.enonce()
  }
}
