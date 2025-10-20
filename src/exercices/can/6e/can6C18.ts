import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import {
  miseEnEvidence,
  texteEnCouleur,
} from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'

import { bleuMathalea } from '../../../lib/colors'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Utiliser la division euclidienne (cas concret)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '04/10/2025'
/**
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 */
export const uuid = 'd02a7'

export const refs = {
  'fr-fr': ['can6C18', '6N2K-flash1'],
  'fr-ch': [],
}
export default class ResteDivisionEuclidienne1 extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierNumbers
    this.optionsDeComparaison = { nombreDecimalSeulement: true }
  }

  nouvelleVersion() {
    let a, b, c, d, q, r

    a = randint(7, 9)
    b = randint(1, a - 1)
    d = randint(5, 9)
    c = d * a + b
    this.reponse = c % a
    this.question = `Je possède $${c}$ bonbons et je fabrique des sacs de $${a}$ bonbons.<br>
     Une fois mes sacs complétés, combien me restera-t-il de bonbons ?`
    if (b === 1) {
      this.correction = `Il me restera $${miseEnEvidence(b)}$ bonbon.<br>`
    } else {
      this.correction = `Il me restera $${miseEnEvidence(b)}$ bonbons.<br>`
    }
    this.correction += texteEnCouleur(
      `
    <br> Mentalement : <br>
    On cherche un multiple de $${a}$ inférieur à $${c}$ (mais le plus grand possible).
     C'est $${c - (c % a)}$. <br> `,
      bleuMathalea,
    )
    if (b === 1) {
      this.correction += texteEnCouleur(
        `
     Comme $${c}=${c - (c % a)} + ${b}$, donc il me restera $${b}$ bonbon.<br>
     Remarque : je pourrai faire $${(c - (c % a)) / a}$ sacs complets.
     `,
        bleuMathalea,
      )
    } else {
      this.correction += texteEnCouleur(
        `
     Comme $${c}=${c - (c % a)} + ${b}$, donc il me restera $${b}$ bonbons.<br>
     Remarque : je pourrai faire $${(c - (c % a)) / a}$ sacs complets.
     `,
        bleuMathalea,
      )
    }

    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
