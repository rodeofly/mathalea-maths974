import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = "Connaître des rapports entre fraction d'heure et minutes"
export const dateDePublication = '02/08/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Eric Elter

 */
export const uuid = 'ebb39'

export const refs = {
  'fr-fr': ['can6D07', 'auto6M4E-flash3'],
  'fr-ch': [],
}
export default class AutoFractionHeures extends ExerciceSimple {
  constructor() {
    super()
    this.nbQuestions = 1

    this.typeExercice = 'simple'
  }

  nouvelleVersion() {
    const durees = [
      ["Un quart d'heure", '\\dfrac14', '15', ' est égal'],
      ['Une demi-heure', '\\dfrac12', '30', 'est égale'],
      ["Trois quarts d'heure", '\\dfrac34', '45', 'sont égaux'],
    ]
    const choix = randint(0, 2)

    this.reponse = durees[choix][2]
    const avecFraction = choice([true, false])
    this.question = avecFraction
      ? `$${durees[choix][1]}$ h = `
      : `${durees[choix][0]} ${durees[choix][3]} à `
    this.canReponseACompleter =
      this.question + '$\\ldots\\ldots\\ldots\\ldots$ ' + 'minutes'
    this.correction =
      this.question + `$${miseEnEvidence(this.reponse)}$ minutes`
    if (!this.interactif) this.question = this.canReponseACompleter
    this.canEnonce = 'Compléter.'
    this.optionsChampTexte = { texteApres: 'minutes' }
  }
}
