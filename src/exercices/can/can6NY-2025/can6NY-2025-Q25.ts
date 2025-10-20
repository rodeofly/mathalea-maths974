import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'

import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { prenomF, prenomM } from '../../../lib/outils/Personne'
export const titre = ''
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '1c133'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
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
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const choixF = prenomF()
    const choixM = prenomM()
    const pm = randint(1, 9) * 100 + 25
    switch (randint(1, 2)) {
      case 1:
        this.question = `${choixF} a une collection de timbres qui est composée de $${texNombre(2025, 0)}$ timbres.<br>
         ${choixM} en possède $${pm}$ de plus.<br>
         Combien en a-t-il ?`
        this.reponse = texNombre(2025 + pm, 0)
        this.correction = ` ${choixM} possède $${pm}$ timbres de plus que ${choixF}.<br>
        $${texNombre(2025, 0)} + ${pm}=${this.reponse}$<br>
         ${choixM} a $${miseEnEvidence(this.reponse)}$ timbres.`
        break
      case 2:
        this.question = `${choixF} a une collection de timbres qui est composée de $${texNombre(2025, 0)}$ timbres.<br>
        ${choixM} en possède $${pm}$ de moins.<br>
        Combien en a-t-il ?`
        this.reponse = texNombre(2025 - pm, 0)
        this.correction = ` ${choixM} en possède $${pm}$ timbres de moins que ${choixF}.<br>
       $${texNombre(2025, 0)} - ${pm}=${this.reponse}$<br>
      ${choixM} en a $${miseEnEvidence(this.reponse)}$ timbres.`
        break
    }
    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
