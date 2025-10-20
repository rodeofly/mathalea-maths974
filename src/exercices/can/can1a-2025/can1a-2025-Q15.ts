import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { prenomM } from '../../../lib/outils/Personne'
import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Calculer une vitesse moyenne'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '13440'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['11FA11-4'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Can2025N5Q15 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
    this.optionsChampTexte = { texteApres: ' km/h.' }
    this.canOfficielle = true
  }

  nouvelleVersion() {
    const quidam = this.canOfficielle ? 'Léa' : (prenomM() as string)
    const kmMin = this.canOfficielle
      ? [3, 15]
      : choice([
          [4, 15],
          [2, 10],
          [3, 10],
          [3, 20],
          [4, 20],
          [5, 20],
          [2, 10],
          [2, 15],
        ])
    const a = kmMin[1]
    const km = kmMin[0]
    this.reponse = texNombre((km * 60) / a, 0)
    this.question = `${quidam} a couru $${km}$ km en $${a}$ minutes, sa vitesse moyenne est de   `
    if (!this.interactif) {
      this.question += '$\\ldots$ km/h'
    }
    this.correction = `$${a}\\times ${texNombre(60 / a, 0)}= 60$ min $=1$ h<br>
    ${quidam} court $${texNombre(60 / a, 0)}$ fois plus de km en $1$ heure.<br>
   $${km}\\times ${texNombre(60 / a, 0)}=${texNombre((km * 60) / a, 0)}$<br>
   ${quidam} court à $${miseEnEvidence(`${texNombre((km * 60) / a, 0)}`)}$ km/h.`
    this.canEnonce = `${quidam} a couru $${km}$ km en $${a}$ minutes, sa vitesse moyenne est de   `
    this.canReponseACompleter = '$\\ldots$ km/h'
  }
}
