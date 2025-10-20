import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'

import Decimal from 'decimal.js'
export const titre = ''
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '2d313'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
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
  }

  nouvelleVersion() {
    const a = randint(7, 29) * 10 + randint(1, 9, 5)
    const exposant2025 = randint(1, 3)
    const exposantA = a < 100 ? randint(1, 2) : randint(1, 3)
    const aDiv = new Decimal(a).div(new Decimal(10).pow(exposantA))
    const Nb2025Div = new Decimal(2025).div(new Decimal(10).pow(exposant2025))

    this.question = `Sachant que $${texNombre(a, 0)} \\times ${texNombre(2025, 0)} = ${texNombre(a * 2025, 0)} $, `
    this.question += `quelle est la valeur décimale de $${texNombre(aDiv, 4)} \\times ${texNombre(Nb2025Div, 4)}$ ?`
    this.reponse = new Decimal(aDiv).mul(Nb2025Div)
    const reponse = new Decimal(aDiv).mul(Nb2025Div)
    this.correction = `Comme $${texNombre(aDiv, 4)}=\\dfrac{${texNombre(a, 4)}}{${new Decimal(10).pow(exposantA)}}$ 
    et comme $${texNombre(Nb2025Div, 4)}=\\dfrac{${texNombre(2025, 0)}}{${new Decimal(10).pow(exposant2025)}}$, <br><br>
    alors $${texNombre(aDiv, 4)} \\times ${texNombre(Nb2025Div, 4)}= \\dfrac{${texNombre(a, 4)}}{${new Decimal(10).pow(exposantA)}} \\times \\dfrac{${texNombre(2025, 0)}}{${new Decimal(10).pow(exposant2025)}} = \\dfrac{${texNombre(a, 0)} \\times ${texNombre(2025, 0)}}{${new Decimal(10).pow(exposantA)} \\times ${new Decimal(10).pow(exposant2025)}}= \\dfrac{${texNombre(a * 2025, 0)}}{${new Decimal(10).pow(exposantA + exposant2025)}}$<br><br>
    et donc $${texNombre(aDiv, 4)} \\times ${texNombre(Nb2025Div, 4)}=${miseEnEvidence(texNombre(reponse, 5))}$`

    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
