import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import FractionEtendue from '../../../modules/FractionEtendue'
import { randint } from '../../../modules/outils'
import { texNombre } from '../../../lib/outils/texNombre'
export const titre = 'Trouver un nombre'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '5fec2'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora

*/
export default class nombreATrouver extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierFullOperations
  }

  nouvelleVersion() {
    const a = 1
    const b = randint(1, 9)
    const c = 2025
    const fracbSurC = `\\dfrac{${texNombre(b)}}{${texNombre(c)}}`
    const d = new FractionEtendue(a * c + b, c)
    const e = new FractionEtendue(a * c - b, c)
    const listeNom = ['R', 'x', 'y', 'T', 'z', 'U', 'A', 'B', 'C']
    const Nom = choice(listeNom)
    if (choice([true, false])) {
      this.reponse = new FractionEtendue(a * c + b, c).inverse().texFraction
      this.question = `Calculer $${Nom}$  sachant que : <br>
     $\\dfrac{1}{${Nom}}=${a}+${fracbSurC}$.`
      this.correction = `$\\dfrac{1}{${Nom}}=${a}+${fracbSurC} = \\dfrac{${a} \\times ${texNombre(c)}}{${texNombre(c)}} + \\dfrac{${b}}{${texNombre(c)}} = \\dfrac{${texNombre(a * c)}}{${texNombre(c)}} + \\dfrac{${b}}{${texNombre(c)}}  =${d.texFraction}$<br><br>
    Ainsi, $${Nom}=${miseEnEvidence(`${d.inverse().texFraction}`)}$.`
      this.canEnonce = `$\\dfrac{1}{${Nom}}=${a}+${fracbSurC}$` // 'Compléter'
      this.canReponseACompleter = `$${Nom}=\\ldots$`
    } else {
      this.reponse = new FractionEtendue(a * c - b, c).inverse().texFraction
      this.question = `Calculer $${Nom}$  sachant que : <br>
         $\\dfrac{1}{${Nom}}=${a}-${fracbSurC}$.`
      this.correction = `$\\dfrac{1}{${Nom}}=${a}-${fracbSurC} = \\dfrac{${a} \\times ${texNombre(c)}}{${texNombre(c)}} - \\dfrac{${b}}{${texNombre(c)}} = \\dfrac{${texNombre(a * c)}}{${texNombre(c)}} - \\dfrac{${b}}{${texNombre(c)}}  =${e.texFraction}$<br><br>
        Ainsi, $${Nom}=${miseEnEvidence(`${e.inverse().texFraction}`)}$.`

      this.canEnonce = `$\\dfrac{1}{${Nom}}=${a}-${fracbSurC}$` // 'Compléter'
      this.canReponseACompleter = `$${Nom}=\\ldots$`
    }
    if (this.interactif) {
      this.question += `<br><br>$${Nom}=$`
    }
  }
}
