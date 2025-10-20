import ExerciceSimple from '../../ExerciceSimple'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = "Calculer le volume d'un cube"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '8b4a4'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase

    this.canOfficielle = false
  }

  nouvelleVersion() {
    let reponse: number
    if (this.canOfficielle) {
      reponse = 27
      this.question = "Le volume d'un cube d'arête $3$ cm est : "
      this.correction = `Le volume du cube est : $3^3=${miseEnEvidence(27)}$ cm$^3$`
    } else {
      const a = choice([0.2, 2, 3, 0.3, 4, 20, 30])
      reponse = a ** 3
      this.question = `Le volume d'un cube d'arête $${texNombre(a, 1)}$ cm est : `
      this.correction = `Le volume du cube est : $${texNombre(a, 1)}^3=${miseEnEvidence(texNombre(a ** 3, 3))}$ cm$^3$`
    }
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\ldots$ cm$^3$'
    this.reponse = reponse.toFixed(3)
    if (!this.interactif) {
      this.question += '$\\ldots$ cm$^3$'
    } else {
      this.optionsChampTexte = { texteApres: 'cm$^3$' }
    }
  }
}
