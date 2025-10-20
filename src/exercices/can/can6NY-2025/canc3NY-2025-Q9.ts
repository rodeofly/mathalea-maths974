import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import Decimal from 'decimal.js'
import { handleAnswers } from '../../../lib/interactif/gestionInteractif'
import { choice } from '../../../lib/outils/arrayOutils'

import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Compléter une multiplication'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'b0a02'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter + Gilles Mora

*/
export default class ProduitACompleter extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.nbQuestionsModifiable = false
    this.optionsChampTexte = { texteAvant: ' $=$' }
    this.formatInteractif = 'fillInTheBlank'
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const a = 2025
    const b = choice([10, 100, 1000])
    const resultat = new Decimal(2025).mul(b)
    const choix = choice([true, false])
    this.reponse = texNombre(b, 3)
    this.consigne = "Compléter l'égalité.<br>"
    handleAnswers(this, 0, { champ1: { value: this.reponse } })
    this.question = `${choix ? `${texNombre(a, 0)}\\times %{champ1} =${texNombre(resultat, 3)}` : `%{champ1} \\times ${texNombre(a, 0)}=${texNombre(resultat, 3)} `}`
    this.correction = `$${choix ? `${texNombre(a, 0)}\\times ${miseEnEvidence(this.reponse)} =${texNombre(resultat, 3)}` : `${miseEnEvidence(this.reponse)} \\times ${texNombre(a, 0)}=${texNombre(resultat, 3)} `}$ `
    this.canEnonce = "Compléter l'égalité."
    this.canReponseACompleter = `$${choix ? `${texNombre(a, 0)}\\times \\ldots =${texNombre(resultat, 3)}` : `\\ldots \\times ${texNombre(a, 0)}=${texNombre(resultat, 3)} `}$`
  }
}
