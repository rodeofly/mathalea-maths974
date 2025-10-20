import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'

import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { choice } from '../../../lib/outils/arrayOutils'
export const titre = ''
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '603f6'
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
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const a = 2
    const b = 0
    const c = 2
    const d = 5
    const m = choice(['centaines', 'dizaines'])
    const n = a * 1000 + b * 100 + c * 10 + d
    this.question = `Quel est le nombre entier de ${m} dans $${texNombre(n)}$ ? `
    if (m === 'centaines') {
      this.correction = `Comme $${texNombre(a * 1000 + b * 100 + c * 10 + d)}=${miseEnEvidence(texNombre(a * 10 + b))}\\times 100+${c * 10 + d}$, il y a $${miseEnEvidence(texNombre(a * 10 + b, 0))}$ ${m} dans $${texNombre(a * 1000 + b * 100 + c * 10 + d)}$.`
      this.reponse = a * 10 + b
    } else {
      this.correction = `Comme $${texNombre(a * 1000 + b * 100 + c * 10 + d)}=${miseEnEvidence(texNombre(a * 100 + b * 10 + c))}\\times 10+${d}$, il y a $${miseEnEvidence(texNombre(a * 100 + b * 10 + c, 0))}$ ${m} dans $${texNombre(a * 1000 + b * 100 + c * 10 + d)}$.`
      this.reponse = a * 100 + b * 10 + c
    }
    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
