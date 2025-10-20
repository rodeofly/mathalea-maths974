import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { choice } from '../../../lib/outils/arrayOutils'

import { sp } from '../../../lib/outils/outilString'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = "Charger d'unités"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '0ebee'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class ChangerUnites extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsChampTexte = { texteAvant: ' $=$' }
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const choix = choice([true, false])
    if (choix) {
      this.reponse = 20.25
      this.question = `$${texNombre(2025)}$ cm  `

      this.correction = `
    Comme $1$ m $=100$ cm, alors $1$ cm $=0,01$ m.<br>
    Ainsi  $${texNombre(2025)}$ cm$=${miseEnEvidence(texNombre(2025 / 100, 2))}$ m.  `
      if (!this.interactif) {
        this.question += '$=\\ldots$ m'
      }
      this.optionsChampTexte = { texteAvant: ' $=$', texteApres: ' m' }
      this.canEnonce = 'Compléter.'
      this.canReponseACompleter = `$${texNombre(2025)}$ cm  $=$  $~~\\ldots~~$ m`
    } else {
      this.reponse = 202500
      this.question = `$${texNombre(2025)}$ m   `
      this.correction = ` Comme $1$ m $=100$ cm,  alors $${texNombre(2025)}$ m$${sp()}=${sp()}${miseEnEvidence(texNombre(202500))}$ cm.`
      if (!this.interactif) {
        this.question += '$=\\ldots$ cm'
      }
      this.optionsChampTexte = { texteAvant: ' $=$', texteApres: ' cm' }
      this.canEnonce = 'Compléter.'
      this.canReponseACompleter = `$${texNombre(2025)}$ m  $=$  $\\ldots$ cm`
    }
  }
}
