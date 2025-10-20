import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'

import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { texNombre } from '../../../lib/outils/texNombre'
export const titre = ''
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '6c365'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class CalculDivers extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsChampTexte = { texteApres: 'heures' }
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const date = randint(27, 30)
    const nbre = randint(1, 23)
    this.question = `Nous sommes le $${date}$ décembre $2024$. Il est $${nbre}$ h${nbre < 12 ? ' du matin' : ''}.<br>
            Combien  d'heures faut-il attendre avant de pouvoir se souhaiter la nouvelle année $2025$ (à minuit le $31$ décembre $2024$) ?`
    this.correction = ` Jusqu'au $${date}$ décembre minuit, il y a $${24 - nbre}$ heures.  <br>
        Du $${date + 1}$ (0 h) au $31$ décembre (minuit), il y a $${31 - date}$ jour${31 - date > 1 ? 's' : ''}, soit $${24 * (31 - date)}$ heures${31 - date > 1 ? ` car $${31 - date}\\times 24 = ${24 * (31 - date)}$` : ''}. <br>
        Il faudra donc attendre $${24 * (31 - date)}+${24 - nbre}$ heures, soit $${miseEnEvidence(texNombre(24 * (31 - date) + 24 - nbre, 0))}$ heures avant de se souhaiter la bonne année.
       `
    this.reponse = 24 * (31 - date) + 24 - nbre
    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
