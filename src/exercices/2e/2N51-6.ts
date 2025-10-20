import { choice } from '../../lib/outils/arrayOutils'
import FractionEtendue from '../../modules/FractionEtendue'
import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
  rienSi1,
} from '../../lib/outils/ecritures'
import { abs } from '../../lib/outils/nombres'
import ExerciceSimple from '../ExerciceSimple'
import { randint } from '../../modules/outils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { warnMessage } from '../../lib/format/message'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
export const titre = 'Résoudre une équation du type $\\dfrac{ax+b}{c}=\\dfrac{d}{e}$'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '10/09/2025'

/**
 *
 * @author Jean-Léon Henry
*/
export const uuid = '550cf'

export const refs = {
  'fr-fr': ['2N51-6'],
  'fr-ch': [],
}
export default class ResoudreEquationAvecQuotient extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
  }

  nouvelleVersion() {
    // Paramètres
    const a = randint(-10, 10, 0)
    const b = randint(-10, 10, 0)
    const c = randint(-10, 10, [-1, 0, 1])
    let d = randint(-10, 10, 0)
    let e = randint(-10, 10, [-1, 0, 1, d])
    if (e * d >= 0) {
      e = abs(e)
      d = abs(d)
    }

    // Variables de calculs intermédiaires
    const membre2 = new FractionEtendue(d, e)
    const equation = (align = false) => { return `\\dfrac{${rienSi1(a)}x${ecritureAlgebrique(b)}}{${c}}${align ? '&=' : '='}${membre2.texFraction}` }
    const resultatFinal = new FractionEtendue(c * d - b * e, e * a)

    switch (choice([1])) {
      case 1:
        if (!this.interactif) {
          this.question = ` Résoudre l'équation $${equation()}$.`
        } else {
          this.question = ` Donner la solution de l'équation $${equation()}$.`
        }
        this.correction = warnMessage(`Pour tout réels $a$, $b$, $c$, $d$ tels que $b$ et $d$ soient non nuls : $\\dfrac{a}{b}=\\dfrac{c}{d}$ si et seulement si $ad=bc$.`, 'nombres', 'Rappel')
        this.correction += `\\[
\\begin{aligned}
${equation(true)}\\\\
${e}( ${rienSi1(a)}x${ecritureAlgebrique(b)} )&=${c} \\times ${ecritureParentheseSiNegatif(d)}\\\\
${rienSi1(e * a)}x${ecritureAlgebrique(e * b)}&=${c * d}\\\\
${rienSi1(e * a)}x&=${c * d}${ecritureAlgebrique(-b * e)}\\\\
${rienSi1(e * a)}x&=${c * d - b * e}`
        if (e * a !== 1) {
          this.correction += `\\\\x&=${resultatFinal.texFSD}`
          if (!resultatFinal.estIrreductible && resultatFinal.num !== 0) {
            this.correction += `=${resultatFinal.texFractionSimplifiee}`
          }
        }
        this.correction += `
\\end{aligned}
\\]`

        this.correction += `L'équation a donc pour unique solution : $${miseEnEvidence(resultatFinal.texFractionSimplifiee)}$.`
        this.reponse = resultatFinal.simplifie()
        break
    }
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
