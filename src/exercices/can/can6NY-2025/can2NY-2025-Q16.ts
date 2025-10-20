import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Trouver un entier dans un intervalle'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'df646'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora
 */
export default class entierDansIntervalle extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const crochet1 = choice([']', '['])
    const crochet2 = choice([']', '['])
    if (choice([true, false])) {
      this.question = `Quel est le plus grand entier relatif appartenant à l'intervalle $${crochet1} ${texNombre(-2025, 0)}\\,;\\,${texNombre(2025, 0)}${crochet2}$ ? `
      this.correction = `Le second crochet  étant ${crochet2 === ']' ? 'fermé' : 'ouvert'}, c'est $${miseEnEvidence(`${texNombre(crochet2 === ']' ? 2025 : 2024, 0)}`)}$.`
      this.reponse = `${crochet2 === ']' ? '2025' : '2024'}`
    } else {
      this.question = `Quel est le plus petit entier relatif appartenant à l'intervalle $${crochet1} ${texNombre(-2025, 0)}\\,;\\,${texNombre(2025, 0)}${crochet2}$ ? `
      this.correction = `Le premier crochet  étant ${crochet1 === '[' ? 'fermé' : 'ouvert'}, c'est $${miseEnEvidence(`${texNombre(crochet1 === '[' ? -2025 : -2024, 0)}`)}$.`
      this.reponse = `${crochet1 === '[' ? '-2025' : '-2024'}`
    }
    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
