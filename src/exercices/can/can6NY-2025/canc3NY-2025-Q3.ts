import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Calculer des sommes avec 2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'd3e8f'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class calcAvecSommes extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsChampTexte = { texteAvant: ' $=$' }
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const choix = choice([1, 2, 3, 4])
    if (choix === 1) {
      this.question = `$${texNombre(2025, 0)}+${texNombre(2025, 0)}$`
      this.correction = `$${texNombre(2025, 0)}+${texNombre(2025, 0)}=${miseEnEvidence(texNombre(4050, 0))}$`
      this.reponse = 4050
    }
    if (choix === 2) {
      this.question = `$${texNombre(2025, 0)}\\times 2$`
      this.correction = `$${texNombre(2025, 0)}\\times 2=${miseEnEvidence(texNombre(4050, 0))}$`
      this.reponse = 4050
    }
    if (choix === 3) {
      this.question = `$${texNombre(2025, 0)}+${texNombre(2024, 0)}$`
      this.correction = `$${texNombre(2025, 0)}+${texNombre(2024, 0)}=${miseEnEvidence(texNombre(4049, 0))}$`
      this.reponse = 4049
    }
    if (choix === 4) {
      this.question = `$${texNombre(2025, 0)}+${texNombre(2026, 0)}$`
      this.correction = `$${texNombre(2025, 0)}+${texNombre(2026, 0)}=${miseEnEvidence(texNombre(4051, 0))}$`
      this.reponse = 4051
    }

    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
