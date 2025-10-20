import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'
import { texNombre } from '../../../lib/outils/texNombre'

export const titre = 'Ecriture décimale'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'a343q'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N5Q11 extends ExerciceCan {
  enonce(a?: number, categA?: string, b?: number, categB?: string) {
    let aa = 100
    let bb = 0.1
    if (a == null || b == null || categA == null || categB == null) {
      a = randint(2, 9)
      b = randint(2, 9, a)
      categA = choice(['dizaines', 'centaines', 'milliers'])
      categB = choice(['dixièmes', 'centièmes', 'millièmes'])
      aa = categA === 'dizaines' ? 10 : categA === 'centaines' ? 100 : 1000
      bb = categB === 'dixièmes' ? 0.1 : categB === 'centièmes' ? 0.01 : 0.001
    }
    this.reponse = a * aa + b * bb
    this.question = `Écriture décimale du nombre $${a}$ ${categA} et $${b}$ ${categB}`
    this.correction = `$${a}$ ${categA} et $${b}$ ${categB} est égal à : <br>
    $${a}\\times ${aa} + ${b}\\times ${texNombre(bb, 3)} = ${texNombre(a * aa, 0)}+${texNombre(b * bb, 3)} = ${miseEnEvidence(texNombre(a * aa + b * bb, 3))}$`
    this.canEnonce = this.question
    if (this.interactif) {
      this.question += '<br>'
    }
  }

  nouvelleVersion() {
    this.canOfficielle
      ? this.enonce(4, 'centaines', 3, 'dixièmes')
      : this.enonce()
  }
}
