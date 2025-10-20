import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import ExerciceSimple from '../../ExerciceSimple'

import Decimal from 'decimal.js'
import { choice } from '../../../lib/outils/arrayOutils'
import { abs } from '../../../lib/outils/nombres'
import { randint } from '../../../modules/outils'
export const titre = 'Écrire un décimal sous une forme particulière'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '27504'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora+Eric Elter
 */
export default class decimalPuisance extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierFullOperations
    this.optionsDeComparaison = { fractionIdentique: true }
  }

  nouvelleVersion() {
    const puissance = randint(1, 5)
    const puissance10 = 10 ** puissance
    const a = choice([2025, -2025])
    const dec = new Decimal(a).div(puissance10)
    this.reponse = [
      (a < 0 ? '-' : '') + `\\dfrac{${abs(a)}}{10^{${puissance}}}`,
      `\\dfrac{${a}}{10^{${puissance}}}`,
    ] // Sans cela, le cas où la fraction est négative ne passe pas.

    this.question = `Écrire $${texNombre(dec, 5)}$ sous la forme $\\dfrac{a}{10^n}$ avec $a\\in \\mathbb{Z}$ et $n\\in \\mathbb{N}$, $n$ le plus petit possible.`
    this.correction = `$${texNombre(dec, 5)}=${miseEnEvidence(`\\dfrac{${texNombre(a, 0)}}{10^{${puissance}}}`)}$`
    if (this.interactif) {
      this.question += `<br>$${texNombre(dec, 5)}=$`
    }
    this.canEnonce = this.question
    this.canReponseACompleter = `$${texNombre(dec, 5)}=\\ldots$`
  }
}
