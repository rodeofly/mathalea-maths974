import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import { texNombre } from '../../../lib/outils/texNombre'
export const titre = 'Trouver un inverse ou un opposé'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'c6cbe'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora
 */
export default class InverseOppose extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction // Car on attend fraction ou décimal
  }

  nouvelleVersion() {
    const nbre = choice([-2025, 2025])
    if (choice([true, false])) {
      this.question = `Quel est l'opposé de  $${texNombre(nbre)}$ ? `
      this.correction = `L'opposé de $${texNombre(nbre)}$ est $${miseEnEvidence(`${texNombre(-nbre)}`)}$.`
      this.reponse = -nbre
    } else {
      this.question = `Quel est l'inverse de  $${texNombre(nbre)}$ ? `
      this.correction = `L'inverse de $${texNombre(nbre)}$ est $${miseEnEvidence(`\\dfrac{1}{${texNombre(nbre)}}`)}$.`
      if (nbre === 2025) {
        this.reponse = `\\dfrac{1}{${nbre}}`
      } else {
        this.reponse = [`-\\dfrac{1}{${-nbre}}`, `\\dfrac{1}{${nbre}}`]
      }
    }
    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
