import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { choice } from '../../../lib/outils/arrayOutils'
import { randint } from '../../../modules/outils'
import { handleAnswers } from '../../../lib/interactif/gestionInteractif'

import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Compléter une égalité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '3df60'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class EgaliteACompleter extends ExerciceSimple {
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
    const b = randint(2, 5)
    const c = randint(1, 5)
    const choix = this.canOfficielle ? true : choice([true, false])
    this.reponse = texNombre(a + b + c, 0)
    this.consigne = "Compléter l'égalité.<br>"
    handleAnswers(this, 0, { champ1: { value: this.reponse } })
    this.question = `${choix ? `${texNombre(a, 0)}+${b}=~%{champ1} -${c}` : `%{champ1}~-${c}=${texNombre(a, 0)}+${b} `}`
    this.correction = `Le nombre cherché vérifie  l'égalité : 
         ${choix ? `$${texNombre(a + b, 0)}= \\ldots -${c}$` : `$\\ldots -${c}=${texNombre(a + b, 0)}$ `}.<br>
         On cherche donc le nombre qui, diminué de $${c}$ est égal à  $${texNombre(a + b, 0)}$. <br>
         Ce nombre est $${miseEnEvidence(this.reponse)}$. <br>
         On a bien : $${choix ? `${texNombre(a, 0)}+${b}= ${miseEnEvidence(this.reponse)} -${c}` : `${miseEnEvidence(this.reponse)} -${c}=${texNombre(a, 0)}+${b} `}$.`
    this.canEnonce = "Compléter l'égalité."
    this.canReponseACompleter = `${choix ? `$${texNombre(a, 0)}+${b}= \\ldots -${c}$` : `$\\ldots -${c}=${texNombre(a, 0)}+${b}$ `}`
  }
}
