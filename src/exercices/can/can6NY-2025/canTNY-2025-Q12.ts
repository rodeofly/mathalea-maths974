import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
import { handleAnswers } from '../../../lib/interactif/gestionInteractif'
import { creerNomDePolygone } from '../../../lib/outils/outilString'
import { arrondi } from '../../../lib/outils/nombres'

import { toutPourUnPoint } from '../../../lib/interactif/mathLive'
import FractionEtendue from '../../../modules/FractionEtendue'
import { ecritureParentheseSiNegatif } from '../../../lib/outils/ecritures'
export const titre = "Calculer les coordonnées d'un milieu"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '2ecf9'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['1mF5-1'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora
 */
export default class coordMilieu extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
  }

  nouvelleVersion() {
    const nom = creerNomDePolygone(2, ['PQDO'])
    const b = randint(-5, 5) * 2 + 1
    const c = randint(-5, 5) * 2 + 1
    const reponse1 = new FractionEtendue(2025 + b, 2).texFraction
    const reponse2 = new FractionEtendue(2025 + c, 2).texFraction
    this.consigne = `Dans un repère du plan, on donne $${nom[0]}(${texNombre(2025, 0)}\\,;\\,${c})$ et $${nom[1]}(${b}\\,;\\,${texNombre(2025, 0)})$.<br>
        Déterminer les coordonnées (sous forme décimale) du milieu de $[${nom[0] + nom[1]}]$.`
    this.question = '(%{champ1}\\,;\\,%{champ2})'
    this.correction = `Les coordonnées du milieu sont données par :
        $\\left(\\dfrac{${texNombre(2025, 0)}+${ecritureParentheseSiNegatif(b)}}{2};\\dfrac{${c}+${texNombre(2025, 0)}}{2}\\right)=
        \\left(\\dfrac{${texNombre(2025 + b, 0)}}{2};\\dfrac{${texNombre(c + 2025, 0)}}{2}\\right)=
        ${miseEnEvidence(`(${texNombre((2025 + b) / 2, 1)};${texNombre((c + 2025) / 2, 1)})`)}$.<br>`
    this.reponse = `(${arrondi((2025 + b) / 2, 1)};${arrondi((c + 2025) / 2, 1)})`

    handleAnswers(this, 0, {
      bareme: (listePoints) => [Math.min(listePoints[0], listePoints[1]), 1],
      champ1: { value: reponse1 },
      champ2: { value: reponse2 },
    })
    this.reponse = {
      bareme: toutPourUnPoint,
      champ1: { value: reponse1 },
      champ2: { value: reponse2 },
    }
    this.formatInteractif = 'fillInTheBlank'
    this.canReponseACompleter = '$(\\,\\ldots\\,;\\,\\ldots\\,)$'
    this.canEnonce = this.consigne
  }
}
