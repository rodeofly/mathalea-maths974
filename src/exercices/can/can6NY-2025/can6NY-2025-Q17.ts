import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'

import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { sp } from '../../../lib/outils/outilString'
import { minToHoraire } from '../../../lib/outils/dateEtHoraires'
export const titre = "Compléter une suite d'heures/minutes"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'cd8eb'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class SuiteACompleterHeures extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsDeComparaison = { HMS: true }
    this.formatChampTexte = KeyboardType.clavierHms
  }

  nouvelleVersion() {
    const h = 20
    const k = randint(14, 16)
    const minutes1Aff = minToHoraire(20 * 60 + 25, true)
    const minutes2Aff = minToHoraire(20 * 60 + 25 + k, true)
    const minutes3Aff = minToHoraire(20 * 60 + 25 + 2 * k, true)
    const minutes4Aff = minToHoraire(20 * 60 + 25 + 3 * k, true)

    this.question = `Compléter la suite : <br>
         $${minutes1Aff}$ ${sp(3)}; ${sp(3)}$${minutes2Aff}$ ${sp(3)}; ${sp(3)}$${minutes3Aff}$ ${sp(3)}; ${sp(3)} `

    this.correction = `On ajoute $${k}$ minutes à chaque fois, donc l'heure qui suit est $${miseEnEvidence(minutes4Aff)}$.`
    this.reponse = {
      reponse: {
        value: `${h + 1}h ${25 + 3 * k - 60}`,
        options: { HMS: true },
      },
    }
    if (!this.interactif) {
      this.question += `$\\ldots${sp()}\\text{h}${sp()}\\ldots${sp()}\\text{min}$`
    }

    this.canEnonce = 'Compléter la suite.'
    this.canReponseACompleter = `$${h}$ h $25$ min <br> $${h}$ h $${25 + k}$ min <br> $${h}$ h $${25 + 2 * k}$ min <br>  $\\ldots$ h $\\ldots$ min`
  }
}
