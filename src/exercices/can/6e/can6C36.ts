import Decimal from 'decimal.js'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Résoudre un problème de reste*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '01/08/2022'
export const dateDeModifImportante = '03/07/2025'
/**
 * @author Gilles Mora
 */
export const uuid = '6e1de'

export const refs = {
  'fr-fr': ['can6C36', '6N2A-flash7'],
  'fr-ch': [],
}
export default class PetitsProblemeReste2 extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1

    this.formatChampTexte = KeyboardType.clavierNumbers
  }

  nouvelleVersion() {
    switch (choice([1, 2])) {
      case 1:
        {
          const a = randint(6, 10) * 10
          const nbre = randint(2, 4)
          const b = new Decimal(randint(5, 12) * 10 + 5).div(10)
          const c = new Decimal(b).mul(nbre)
          this.reponse = new Decimal(a).sub(c)
          this.question = `  Un électricien dispose d’un rouleau de fil électrique de $${a}$ m. <br>Il découpe $${nbre}$
      morceaux de fil de ce rouleau de $${texNombre(b, 2, true)}$ m chacun.<br>
      Quelle longueur de fil électrique reste-t-il dans le rouleau ?`
          this.correction = `Les $${nbre}$  morceaux de fil ont une longueur de $${nbre}\\times ${texNombre(b, 2, true)}$, soit $${texNombre(c, 2)}$ m.<br>
      Il reste alors : $${a}-${texNombre(c, 2)}=${miseEnEvidence(texNombre(Number(this.reponse), 2))}$ m.`
          if (this.interactif) {
            this.optionsChampTexte = { texteAvant: '<br>', texteApres: ' m' }
          }
          this.canEnonce = this.question
          this.canReponseACompleter = '$\\dots$ m'
        }
        break
      case 2:
        {
          const a = randint(6, 10) * 10
          const nbre = randint(2, 4)
          const b = new Decimal(randint(5, 12) * 10 + 5).div(10)
          const c = new Decimal(b).mul(nbre)
          this.reponse = new Decimal(a).sub(c)
          this.question = ` Un plombier possède un tuyau de $${a}$ mètres.<br>
Il coupe $${nbre}$ sections de tuyau de $${texNombre(b, 2, true)}$ mètres chacune.<br>
Quelle longueur de tuyau lui reste-t-il ?`
          this.correction = `Les $${nbre}$  sections de tuyau ont une longueur de $${nbre}\\times ${texNombre(b, 2, true)}$, soit $${texNombre(c, 2)}$ m.<br>
      Il reste alors : $${a}-${texNombre(c, 2)}=${miseEnEvidence(texNombre(Number(this.reponse), 2))}$ m.`
          if (this.interactif) {
            this.optionsChampTexte = { texteAvant: '<br>', texteApres: ' m' }
          }
          this.canEnonce = this.question
          this.canReponseACompleter = '$\\dots$ m'
        }
        break
    }
  }
}
