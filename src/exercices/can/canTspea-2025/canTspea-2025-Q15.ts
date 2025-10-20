import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
import FractionEtendue from '../../../modules/FractionEtendue'
export const titre = "Trouver la raison d'une suite géométrique"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '77ef9'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Can2025TQ15 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    this.optionsChampTexte = { texteApres: '.' }
    this.canOfficielle = true
  }

  nouvelleVersion() {
    const u0 = this.canOfficielle ? 9 : randint(3, 9)
    this.reponse = new FractionEtendue(1, u0)
    this.question = `$(u_n)$ est une suite géométrique telle que $u_0=${u0}$ et $u_1=1$.<br>
    Sa raison $q$ est `
    if (!this.interactif) {
      this.question += ' $\\ldots$'
    }
    this.correction = `Le nombre $q$ vérifie $q\\times u_0=u_1$, soit  $q\\times ${u0}=1$. <br>
   On obtient  $q= ${miseEnEvidence(this.reponse)}$.`
    this.canEnonce = `$(u_n)$ est une suite géométrique telle que $u_0=${u0}$ et $u_1=1$.`
    this.canReponseACompleter = 'Sa raison $q$ est $\\ldots$'
  }
}
