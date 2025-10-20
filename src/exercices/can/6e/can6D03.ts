import { bleuMathalea } from '../../../lib/colors'
import {
  miseEnEvidence,
  texteEnCouleur,
} from '../../../lib/outils/embellissements'
import { sp } from '../../../lib/outils/outilString'
import { prenomM } from '../../../lib/outils/Personne'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Calculer une durée en minutes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021

 */
export const uuid = '05b2e'

export const refs = {
  'fr-fr': ['can6D03', '6M4B-flash2'],
  'fr-ch': ['10GM3-12'],
}
export default class CalculDureeMinutes extends ExerciceSimple {
  constructor() {
    super()
    this.nbQuestions = 1

    this.typeExercice = 'simple'

    this.optionsChampTexte = { texteApres: ' minutes' }
  }

  nouvelleVersion() {
    const a = randint(13, 15)
    const b = a + 1
    const c = randint(1, 4) * 10
    const d = randint(10, 58)
    this.reponse = b * 60 + d - (a * 60 + c)
    this.question = `${prenomM()} est parti à  $${a}$h${sp(1)}$${c}$ de son domicile.
    Il est arrivé à $${b}$h${sp(1)}$${d}$.<br>

    Combien de temps a duré son trajet ?`
    this.correction = `$${b}$h${sp(1)}$${d}-${a}$h${sp(1)}$${c}=${miseEnEvidence(this.reponse)}$ min`
    this.correction += texteEnCouleur(
      `<br> Mentalement : <br>
      On part de $${a}$h${sp(1)}$${c}$ et  on complète par $${(a + 1) * 60 - (a * 60 + c)}$ min pour arriver
      à $${a + 1}$h. <br>
      Puis on ajoute  les $${d}$ minutes pour arriver à $${b}$h${sp(1)}$${d}$.<br>
      Le résultat est donc donné par $${(a + 1) * 60 - (a * 60 + c)}+${d}=${this.reponse}$ min.
          `,
      bleuMathalea,
    )
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\ldots$ minutes'
  }
}
