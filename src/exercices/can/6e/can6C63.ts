import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Écrire une fraction le plus simplement possible'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const dateDePublication = '14/09/2025'

/**
 * @author Gilles Mora

 */

export const uuid = '81051'

export const refs = {
  'fr-fr': ['can6C63'],
  'fr-ch': [],
}
export default class SimplifierFractionEntier extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
    this.optionsChampTexte = { texteAvant: '<br>' }
    this.spacingCorr = 1.5
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    this.optionsDeComparaison = { nombreDecimalSeulement: true }
  }

  nouvelleVersion() {
    const d = randint(2, 10)
    const k = randint(2, 10)
    const n = d * k

    this.reponse = k
    this.question = `Écrire la fraction $\\dfrac{${n}}{${d}}$ le plus simplement possible.`
    this.correction = `Le numérateur est un multiple du dénominateur, on peut donc simplifier la fraction sous la forme d'un nombre entier.<br>
          $\\dfrac{${n}}{${d}}=${n}\\div ${d} =${miseEnEvidence(this.reponse)}$`
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
