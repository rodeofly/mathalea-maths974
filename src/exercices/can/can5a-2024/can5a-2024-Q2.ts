import ExerciceSimple from '../../ExerciceSimple'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Calculer avec un quart, un tiers, ...'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'b34f7'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
    this.optionsChampTexte = { texteAvant: ' est : ', texteApres: '.' }

    this.canOfficielle = false
  }

  nouvelleVersion() {
    if (this.canOfficielle) {
      this.reponse = 6
      this.question = 'Le quart de $24$'
      this.correction = `Prendre le quart d'un nombre revient à le diviser par $4$.<br>
      Ainsi, le quart de $24$ est : $24\\div 4 =${miseEnEvidence(6)}$.`
    } else {
      const a = randint(6, 12) * 4
      const b = randint(6, 15) * 3
      const m = choice(['quart', 'tiers'])

      if (m === 'quart') {
        this.question = `Le quart de $${a}$  `
        this.correction = `Prendre le quart d'un nombre revient à le diviser par $4$.<br>
            Ainsi, le quart de $${a}$ est : $${a}\\div 4 =${miseEnEvidence(texNombre(a / 4))}$.`
        this.reponse = a / 4
      }
      if (m === 'tiers') {
        this.question = `Le tiers de $${b}$ `
        this.correction = `Prendre le tiers d'un nombre revient à le diviser par $3$.<br>
            Ainsi, le tiers de $${b}$ est : $${b}\\div 3 =${miseEnEvidence(texNombre(b / 3))}$.`
        this.reponse = b / 3
      }
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
