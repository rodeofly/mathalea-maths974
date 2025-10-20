import ExerciceSimple from '../../ExerciceSimple'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
export const titre = 'Résoudre un problème de longueurs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '2a856'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['PR-17'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Can2025CM12Q13 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
    this.optionsChampTexte = { texteApres: 'dm.' }
  }

  nouvelleVersion() {
    const a = this.canOfficielle ? 10 : randint(1, 3) * 10
    const b = this.canOfficielle ? 3 : randint(2, 5)
    this.reponse = texNombre((a * b) / 10, 0)
    this.question = `$${a}$ petites ficelles de longueur $${b}$ cm sont mises bout à bout.<br>
    On obtient une longueur de  `
    if (!this.interactif) {
      this.question += '$\\ldots$ dm.'
    }
    this.optionsChampTexte = { texteApres: ' dm.' }
    this.correction = ` La longueur totale est donnée par le produit du nombre de petites ficelles par la longueur d'une petite ficelle. <br>
    $${a}\\times ${b}=${a * b}$<br>
    La longueur totale est $${a * b}$ cm.<br>
    Comme $1$ dm $=10$ cm, la longueur totale est $${miseEnEvidence(this.reponse)}$ dm.`
    this.canEnonce = `$${a}$ petites ficelles de longueur $${b}$ cm sont mises bout à bout.`
    this.canReponseACompleter = 'On obtient une longueur de $\\ldots$ dm.'
  }
}
