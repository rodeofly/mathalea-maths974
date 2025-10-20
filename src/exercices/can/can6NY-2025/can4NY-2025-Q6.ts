import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import { texNombre } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import FractionEtendue from '../../../modules/FractionEtendue'
export const titre = 'Trouver un inverse ou un opposé'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '936a4'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora
 */
export default class InverseOppose extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const c = choice([2, 4, 5])
    const b = randint(1, c - 1)
    const maFraction = new FractionEtendue(b, c)
    const a = 2025
    const resultat = maFraction.ajouteEntier(a).valeurDecimale
    this.question = `Quelle est la valeur décimale de  $${texNombre(a, 0)}+${maFraction.texFraction}$ ?`
    this.correction = `$${a}+${maFraction.texFraction} = ${a} + ${texNombre(maFraction.valeurDecimale)}= ${miseEnEvidence(texNombre(resultat, 2))}$`
    this.reponse = resultat

    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
