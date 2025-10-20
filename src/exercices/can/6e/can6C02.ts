import { bleuMathalea } from '../../../lib/colors'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import {
  miseEnEvidence,
  texteEnCouleur,
} from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'

export const titre = 'Multiplier un nombre pair par 5'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 */
export const uuid = '5c1b3'

export const refs = {
  'fr-fr': ['can6C02', 'auto6N3D-flash1'],
  'fr-ch': [],
}

export default class NombrePairFois5 extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierNumbers
    this.optionsDeComparaison = { nombreDecimalSeulement: true }
  }

  nouvelleVersion() {
    const a = randint(11, 49, [20, 30, 40, 15, 25, 35, 45]) * 2
    this.reponse = a * 5
    this.question = `Calculer $${a}\\times 5$.`
    this.canEnonce = this.question
    this.canEnonce = this.question
    this.canReponseACompleter = ''
    this.correction = `$${a}\\times 5 = ${miseEnEvidence(this.reponse)}$<br>`
    this.correction += texteEnCouleur(
      `<br> Mentalement : <br>
    Pour multiplier par $5$, on peut :  <br>
    $\\bullet$ ou bien d'abord multiplier par $10$, puis diviser par $2$ :<br>
    $${a}\\times 5 = (${a} \\times 10)\\div 2  = ${a * 10}\\div 2=${this.reponse}$.<br>
    $\\bullet$ ou bien d'abord diviser  par $2$, puis multiplier  par $10$ :<br>$${a}\\times 5 = (${a}\\div 2 ) \\times 10 = ${a / 2}\\times 10=${this.reponse}$.`,
      bleuMathalea,
    )
  }
}
