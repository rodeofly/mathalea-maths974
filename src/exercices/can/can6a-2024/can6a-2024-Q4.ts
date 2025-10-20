import ExerciceSimple from '../../ExerciceSimple'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
export const titre = 'Calculer avec une proportionnalité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '4b9d2'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    this.optionsChampTexte = { texteApres: 'g' }

    this.canOfficielle = false
  }

  nouvelleVersion() {
    const unit = this.canOfficielle ? 4 : randint(3, 6)
    const a = this.canOfficielle ? 2 : randint(2, 4)
    const b = this.canOfficielle ? 6 : randint(5, 7)

    this.reponse = b * unit
    this.question = `$${a}$ carreaux de chocolats pèsent $${a * unit}$ g.<br>
      $${b}$ carreaux de chocolat pèsent  `
    this.correction = `$${a}$ carreaux de chocolats pèsent $${a * unit}$ g,  donc $1$ carreau pèse $${unit}$ g.<br>
      Donc $${b}$ carreaux pèsent  $${b}\\times${unit}$ g $=${miseEnEvidence(texNombre(this.reponse, 0))}$ g.`

    if (!this.interactif) {
      this.question += '$\\ldots$ g.'
    }
    this.canEnonce = `$${a}$ carreaux de chocolats pèsent $${a * unit}$ g.`
    this.canReponseACompleter = `$${b}$ carreaux de chocolat pèsent $\\ldots$ g.`
  }
}
