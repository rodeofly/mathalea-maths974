import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'

import { randint } from '../../../modules/outils'
import { prenomF } from '../../../lib/outils/Personne'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Trouver une année'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '2c4e0'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class anneeATrouver extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const a = randint(30, 50)
    const prenom = prenomF(1)
    this.question =
      'Si ' +
      prenom +
      ` a $${a}$ ans en $2025$, en quelle année est-elle naît  ?`
    this.reponse = 2025 - a
    this.correction = `Comme $${2025}-${a}=${texNombre(this.reponse, 0)}$, ${prenom} est naît en $${miseEnEvidence(texNombre(this.reponse))}$.`
    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
