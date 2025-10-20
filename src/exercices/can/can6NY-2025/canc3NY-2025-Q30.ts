import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'

import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { prenomM } from '../../../lib/outils/Personne'
export const titre = ''
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'da2fc'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter + Gilles Mora

*/
export default class resoudreUnProbleme extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsChampTexte = { texteApres: '€' }
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const prenoms = prenomM(2)
    this.reponse = randint(8, 12, 10)
    const a = this.reponse * 2
    const b = 2025 + a
    this.question = `${prenoms[0]} a $${texNombre(2025, 0)}$ € et ${prenoms[1]} a $${texNombre(b, 0)}$ €.<br>
       Combien ${prenoms[1]} doit-il donner d'argent à ${prenoms[0]} pour qu'ils aient tous les deux la même somme ?`

    this.correction = `${prenoms[1]} doit donner $${miseEnEvidence(texNombre(this.reponse, 0))}$ € à ${prenoms[0]}.<br>
        Ils auront $${texNombre(2025 + this.reponse, 0)}$ € chacun.`

    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\ldots$ €'
  }
}
