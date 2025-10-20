import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import ExerciceSimple from '../../ExerciceSimple'

import { choice } from '../../../lib/outils/arrayOutils'
import { randint } from '../../../modules/outils'
export const titre = "Donner le nombre de solutions d'une équation"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '10886'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['11FA10-7b'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class nbreSolutions extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const a = 2025
    const b = randint(2020, 2030)
    this.question = ` Combien de solutions réelles possède l'équation  ${choice([true, false]) ? `$-x^2+${texNombre(a)}=${texNombre(b)}$` : `$${texNombre(a)}-x^2=${texNombre(b)}$`} ?`
    if (a - b > 0) {
      this.correction = `L'équation est équivalente à $-x^2=${texNombre(b)}-${texNombre(a)}$, soit $x^2=${texNombre(a - b)}$.<br>
            $${a - b}$ étant strictement positif, cette équation a $${miseEnEvidence('2')}$ solutions.`
      this.reponse = 2
    } else if (a - b === 0) {
      this.correction = `L'équation est équivalente à $-x^2=${texNombre(b)}-${texNombre(a)}$, soit $x^2=${texNombre(a - b)}$.<br>
            cette équation a $${miseEnEvidence('1')}$  seule solution réelle : 0.`
      this.reponse = 1
    } else {
      this.correction = `L'équation est équivalente à $-x^2=${texNombre(b)}-${texNombre(a)}$, soit $x^2=${texNombre(a - b)}$.<br>
           Cette équation n'a pas de solution réelle ($${miseEnEvidence('0')}$ solution) car $${texNombre(a - b)}<0$.`
      this.reponse = 0
    }
    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
