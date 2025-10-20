import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { choice } from '../../../lib/outils/arrayOutils'
import { arrondi } from '../../../lib/outils/nombres'
import { texNombre } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Trouver le nombre manquant dans une somme'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '20/11/2021'

/**
 * @author Jean-Claude Lhote

 */
export const uuid = '3ca23'

export const refs = {
  'fr-fr': ['canc3C06'],
  'fr-ch': [],
}
export default class ComplementAuDixiemeOuALaDizaine extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1

    this.formatChampTexte = KeyboardType.clavierNumbers
  }

  nouvelleVersion() {
    let a, b
    if (choice([true, false])) {
      // décimal ou entier ?
      a = arrondi(randint(1, 5) * 10 + randint(1, 9) / 10)
      b = Math.ceil(a)
      this.reponse = arrondi(b - a)
      this.question = `Compléter : $${texNombre(a)}+\\dots=${b}$`
      this.correction = `On doit compléter les dixièmes du nombre $${texNombre(a)}$ pour obtenir une unité de plus.<br>Il faut donc ajouter $${texNombre(this.reponse)}$.`
      this.canEnonce = 'Compléter.'
      this.canReponseACompleter = `$${texNombre(a)}+\\dots=${b}$`
    } else {
      a = arrondi(randint(2, 5) * 100 + randint(1, 9) * 10 + randint(1, 9))
      b = Math.ceil(a / 10) * 10
      this.reponse = b - a
      this.question = `Compléter : $${a}+\\dots=${b}$`
      this.correction = `On doit compléter les unités du nombre $${a}$ pour obtenir une dizaine de plus.<br>Il faut donc ajouter $${this.reponse}$.`
      this.canEnonce = 'Compléter.'
      this.canReponseACompleter = `$${a}+\\dots=${b}$`
    }
  }
}
