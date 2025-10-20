import { bleuMathalea } from '../../../lib/colors'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import { choice } from '../../../lib/outils/arrayOutils'
import {
  miseEnEvidence,
  texteEnCouleur,
} from '../../../lib/outils/embellissements'
import { arrondi } from '../../../lib/outils/nombres'
import { texNombre } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'

export const titre = 'Soustraire un décimal d’un entier'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '09/05/2022'
/**
 * @author  Gilles Mora
 */
export const uuid = '5b443'

export const refs = {
  'fr-fr': ['can6C31', '6N2A-flash5'],
  'fr-ch': [],
}
export default class SoustraireEntierDecimal extends ExerciceSimple {
  constructor() {
    super()
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierNumbers
    this.typeExercice = 'simple'
  }

  nouvelleVersion() {
    let a, u, d, c
    switch (choice([1, 2])) {
      case 1: // 5-2,6 par ex
        a = randint(2, 15)
        u = randint(1, a - 1)
        d = randint(1, 9)

        this.question = `Calculer $${a}-${texNombre(u + d / 10, 1)}$.`
        this.correction = `$${a}-${texNombre(u + d / 10, 1)}=${a}-${u}-${texNombre(d / 10, 1)}=${miseEnEvidence(texNombre(a - u - d / 10, 1))}$<br>`
        this.reponse = arrondi(a - u - d / 10, 1)
        this.correction += texteEnCouleur(
          `
    <br> Mentalement : <br>
   On commence par soustraire les unités : $${a}-${u}=${a - u}$.<br>
    Puis les dixièmes : $${a - u}-${texNombre(d / 10)}=${texNombre(a - u - d / 10, 1)}$`,
          bleuMathalea,
        )
        break
      case 2: // 8-2,65
        a = randint(2, 15)
        u = randint(1, a - 1)
        d = randint(1, 9)
        c = randint(1, 9)
        this.question = `Calculer $${a}-${texNombre(u + d / 10 + c / 100, 2)}$.`
        this.correction = `$${a}-${texNombre(u + d / 10 + c / 100, 2)}=${a}-${u}-${texNombre(d / 10 + c / 100, 2)}=${miseEnEvidence(texNombre(a - u - d / 10 - c / 100, 2))}$<br>`
        this.reponse = arrondi(a - u - d / 10 - c / 100, 2)
        this.correction += texteEnCouleur(
          `
    <br> Mentalement : <br>
    On commence par soustraire les unités : $${a}-${u}=${a - u}$.<br>
    Puis on soustrait la partie décimale de $${texNombre(u + d / 10 + c / 100, 2)}$ c'est-à-dire $${texNombre(d / 10 + c / 100, 2)}$. On obtient $${a - u}-${texNombre(d / 10 + c / 100)}=${texNombre(a - u - d / 10 - c / 100, 2)}$`,
          bleuMathalea,
        )
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
