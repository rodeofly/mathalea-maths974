import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'

import { reduireAxPlusB } from '../../../lib/outils/ecritures'
export const titre = 'Réduire une expression'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '95e6d'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora
 */
export default class reduireExpression extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecVariable
    this.optionsDeComparaison = { factorisation: true }
  }

  nouvelleVersion() {
    const b = randint(4, 30)
    const r1 = 2025 - b
    const r2 = -2025 + b
    if (choice([true, false])) {
      this.reponse = `${reduireAxPlusB(r1, 0)}`
      this.question = `Réduire l'écriture de $${texNombre(2025, 0)}x -${texNombre(b, 0)}x$.`
      this.correction = `$${texNombre(2025)}x -${texNombre(b, 0)}x= (${texNombre(2025, 0)} -${texNombre(b, 1)})x=${miseEnEvidence(texNombre(r1, 1) + 'x')}$ `
      this.optionsChampTexte = {
        texteAvant: `$${texNombre(2025, 0)}x -${texNombre(b, 0)}x=$`,
      }
    } else {
      this.reponse = `${reduireAxPlusB(r2, 0)}`
      this.question = `Réduire l'écriture de $${texNombre(b, 0)}x-${texNombre(2025, 0)}x$.`
      this.correction = `$${texNombre(b, 1)}x-${texNombre(2025, 0)}x=(${texNombre(b, 1)}-${texNombre(2025, 0)})x=${miseEnEvidence(texNombre(r2, 1) + 'x')}$ `
      this.optionsChampTexte = {
        texteAvant: `$${texNombre(b, 1)}x-${texNombre(2025, 0)}x=$`,
      }
    }
    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
