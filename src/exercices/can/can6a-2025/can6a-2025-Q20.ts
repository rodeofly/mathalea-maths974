import ExerciceSimple from '../../ExerciceSimple'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = "Calculer deux tiers d'une quantité"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '9e21f'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class Can2025N6Q20 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
    this.optionsChampTexte = { texteApres: 'g.' }
  }

  nouvelleVersion() {
    const a = this.canOfficielle
      ? 120
      : choice([randint(1, 9) * 30, randint(2, 9) * 3])
    this.reponse = texNombre((2 * a) / 3, 0)
    this.question = `Deux tiers de  $${a}$ g est égal à   `
    this.canEnonce = this.question
    if (!this.interactif) {
      this.question += '$\\ldots$ g.'
    }
    this.correction = `Pour prendre les deux tiers d'un nombre, on commence à en prendre le tiers en le divisant par $3$, puis on multiplie le résultat par $2$.<br>
     $${a}\\div 3 =${texNombre(a / 3, 0)}$<br>
     $${texNombre(a / 3, 0)}\\times 2= ${miseEnEvidence(texNombre((2 * a) / 3, 0))}$ g.`

    this.canReponseACompleter = '$\\ldots$ g'
  }
}
