import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { choice } from '../../../lib/outils/arrayOutils'
import { extraireRacineCarree } from '../../../lib/outils/calculs'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Simplifier des racines carrées'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 * Date de publication
*/
export const uuid = 'cc300'

export const refs = {
  'fr-fr': ['can2C06'],
  'fr-ch': [],
}
export default class SimplificationsRacinesCarrees extends ExerciceSimple {
  constructor() {
    super()
    this.optionsChampTexte = { texteAvant: '<br>' }
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierFullOperations
    this.optionsDeComparaison = { texteSansCasse: true }
  }

  nouvelleVersion() {
    const a = choice([
      8, 18, 32, 50, 72, 98, 40, 200, 12, 27, 48, 75, 20, 45, 24, 28, 300, 500,
      600, 700, 40, 44, 52, 60, 63, 90, 54,
    ])
    const reduction = extraireRacineCarree(a)
    this.question = ` Écrire $\\sqrt{${a}}$ sous la forme $a\\sqrt{b}$ où $a$ et $b$ sont des entiers avec $b$ le plus petit possible.`
    this.correction = `On a $${a}=${reduction[0]}^2\\times ${reduction[1]}$.<br>
   Ainsi, $\\sqrt{${a}}=\\sqrt{${reduction[0]}^2\\times ${reduction[1]}} =
    \\sqrt{${reduction[0]}^2}\\times \\sqrt{${reduction[1]}} =
    ${miseEnEvidence(`${reduction[0]}\\sqrt{${reduction[1]}`)}}$.<br>`
    this.reponse = [
      `${reduction[0]}\\sqrt${reduction[1]}`,
      `${reduction[0]}\\times\\sqrt${reduction[1]}`,
      `\\sqrt${reduction[1]}\\times${reduction[0]}`,
    ]
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
