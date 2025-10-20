import { texteEnCouleur } from '../../../lib/outils/embellissements'
import { arrondi } from '../../../lib/outils/nombres'
import { texNombre } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Soustraire deux décimaux'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '09/05/2022'
/**
 * @author  Gilles Mora
 *
 *
 */
export const uuid = '1293c'

export const refs = {
  'fr-fr': ['can5C19', '6N2A-flash10'],
  'fr-ch': ['NR'],
}
export default class Soustraire2Decimaux extends ExerciceSimple {
  constructor() {
    super()
    this.nbQuestions = 1

    this.typeExercice = 'simple'
  }

  nouvelleVersion() {
    const a = randint(2, 15)
    const b = randint(1, a - 1)
    const d1 = randint(1, 6)
    const d2 = randint(d1, 9)

    this.question = `Calculer $${texNombre(a + d1 / 10, 1)}-${texNombre(b + d2 / 10, 1)}$.`
    this.correction = `$${texNombre(a + d1 / 10, 1)}-${texNombre(b + d2 / 10, 1)}=${texNombre(a + d1 / 10 - b - d2 / 10, 1)}$`
    this.reponse = arrondi(a + d1 / 10 - b - d2 / 10, 1)
    this.correction += texteEnCouleur(`
    <br> Mentalement : <br>
   On commence par soustraire les unités : $${texNombre(a + d1 / 10, 1)}-${b}=${texNombre(a - b + d1 / 10, 1)}$.<br>
    Puis les dixièmes : $${texNombre(a - b + d1 / 10, 1)}-${texNombre(d2 / 10)}=${texNombre(a + d1 / 10 - b - d2 / 10, 1)}$`)
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
