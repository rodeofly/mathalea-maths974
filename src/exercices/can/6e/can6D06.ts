import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre =
  'Connaître des unités de mesure de durées longues et les relations qui les lient'
export const dateDePublication = '02/08/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Eric Elter

 */
export const uuid = '1630a'

export const refs = {
  'fr-fr': ['can6D06', 'auto6M4D-flash2'],
  'fr-ch': ['PR-16'],
}
export default class AutoDureeAnnees extends ExerciceSimple {
  constructor() {
    super()
    this.nbQuestions = 1

    this.typeExercice = 'simple'
  }

  nouvelleVersion() {
    const durees = [
      ['millénaire', 'années', texNombre(1000)],
      ['siècle', 'années', '100'],
      ['année non bissextile', 'jours', 365],
      ['année bissextile', 'jours', 366],
    ]
    const choix = randint(0, 3)

    this.reponse = durees[choix][2]
    this.question = `$1$ ${durees[choix][0]} = `
    this.canReponseACompleter =
      this.question + '$\\ldots\\ldots\\ldots\\ldots$ ' + durees[choix][1]
    this.correction =
      this.question + `$${miseEnEvidence(this.reponse)}$ ${durees[choix][1]}`
    if (!this.interactif) this.question = this.canReponseACompleter
    this.canEnonce = 'Compléter.'
    this.optionsChampTexte = { texteApres: durees[choix][1] }
  }
}
