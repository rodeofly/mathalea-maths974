import { bleuMathalea } from '../../../lib/colors'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { choice } from '../../../lib/outils/arrayOutils'
import {
  miseEnEvidence,
  texteEnCouleur,
} from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'

export const titre = 'Calculer le quart ou le tiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 */
export const uuid = 'fc2fd'

export const refs = {
  'fr-fr': ['can6C08', 'auto6P3A-flash1'],
  'fr-ch': [],
}

export default class QuartOuTiers extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierNumbers
    this.optionsDeComparaison = { nombreDecimalSeulement: true }
  }

  nouvelleVersion() {
    const a = randint(5, 10)
    let b
    if (choice([true, false])) {
      b = a * 8
      this.reponse = a * 2
      this.question = `Quel est le quart de $${b}$ ?`
      this.correction = `Le quart de $${b}$ est $${miseEnEvidence(a * 2)}.$<br>`
      this.correction += texteEnCouleur(
        `<br> Mentalement : <br>
      Prendre le quart d'une quantité revient à la diviser deux fois par $2$.<br>
      Ainsi, le quart de $${b}$ est égal à $${b}\\div 2 \\div 2=${a * 4}\\div 2=${a * 2}$.
         `,
        bleuMathalea,
      )
    } else {
      b = a * 6
      this.reponse = a * 2
      this.question = `Quel est le tiers de $${b}$ ?`
      this.correction = `Le tiers de $${b}$ est $${miseEnEvidence(a * 2)}.$<br>`
      this.correction += texteEnCouleur(
        `<br> Mentalement : <br>
      Prendre le tiers d'une quantité revient à la diviser par $3$.<br>
      Ainsi, le tiers de $${b}$ est égal à $${b}\\div 3=${a * 2}$.
      
      `,
        bleuMathalea,
      )
    }
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
