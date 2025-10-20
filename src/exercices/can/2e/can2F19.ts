import ExerciceSimple from '../../ExerciceSimple'
import {
  miseEnEvidence,
  texteEnCouleur,
} from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { functionCompare } from '../../../lib/interactif/comparisonFunctions'
import { choice } from '../../../lib/outils/arrayOutils'
import {
  ecritureParentheseSiNegatif,
  reduireAxPlusB,
} from '../../../lib/outils/ecritures'
export const titre = 'Déterminer une fonction affine avec deux images'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '30/04/2024'
export const uuid = '571b2'
export const refs = {
  'fr-fr': ['can2F19'],
  'fr-ch': ['11FA8-23', '1mF2-18'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class FonctionAffAvec2Images extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecVariable

    this.compare = functionCompare
  }

  nouvelleVersion() {
    switch (choice([1, 2])) {
      case 1: // on donne f(1) et f(0)
        {
          const nom = ['f', 'g', 'h']
          const nomF = choice(nom)
          const m = randint(1, 8)
          const p = randint(-10, 10)
          this.reponse = {
            reponse: {
              value: reduireAxPlusB(m, p),
              options: { variable: 'x', domaine: [-100, 100] },
              compare: functionCompare,
            },
          }
          this.question = `$${nomF}$ est une fonction affine vérifiant $${nomF}(0)=${p}$ et $${nomF}(1)=${p + m}$.<br>`
          if (this.interactif) {
            this.question += `L'expression algébrique de $${nomF}$ est $${nomF}(x)=$`
          } else {
            this.question += `Déterminer l'expression algébrique de $${nomF}$.`
          }
          this.correction = `$${nomF}$ est une fonction affine donc de la forme $${nomF}(x)=mx+p$ avec $p=${nomF}(0)=${p}$.<br>
          $\\begin{aligned}
          m&=\\dfrac{${nomF}(1)-${nomF}(0)}{1-0}\\\\
          &=${nomF}(1)-${nomF}(0)\\\\
          &=${p + m}-${ecritureParentheseSiNegatif(p)}\\\\
          &=${m}
          \\end{aligned}$<br>

          On en déduit  $${nomF}(x)=${miseEnEvidence(reduireAxPlusB(m, p))}$<br>`
          this.correction += texteEnCouleur(
            `
    Mentalement : <br>
Les images de $0$ et de $1$ permettent de déterminer rapidement le coefficient directeur qui est la différence des images, 
soit $${p + m}-${ecritureParentheseSiNegatif(p)}=${m}$.
`,
            'blue',
          )
        }
        break
      case 2: // on donne f(-1) et f(0)
        {
          const nom = ['f', 'g', 'h']
          const nomF = choice(nom)
          const m = randint(1, 8)
          const p = randint(-10, 10)
          this.reponse = {
            reponse: {
              value: reduireAxPlusB(m, p),
              options: { variable: 'x', domaine: [-100, 100] },
              compare: functionCompare,
            },
          }
          this.question = `$${nomF}$ est une fonction affine vérifiant $${nomF}(-1)=${p - m}$ et $${nomF}(0)=${p}$.<br>`
          if (this.interactif) {
            this.question += `L'expression algébrique de $${nomF}$ est $${nomF}(x)=$`
          } else {
            this.question += `Déterminer l'expression algébrique de $${nomF}$.`
          }
          this.correction = `$${nomF}$ est une fonction affine donc de la forme $${nomF}(x)=mx+p$ avec $p=${nomF}(0)=${p}$.<br>
        $\\begin{aligned}
        m&=\\dfrac{${nomF}(0)-${nomF}(-1)}{0-(-1)}\\\\
        &=${nomF}(0)-${nomF}(-1)\\\\
        &=${p}-${ecritureParentheseSiNegatif(p - m)}\\\\
        &=${m}
        \\end{aligned}$<br>

        On en déduit  $${nomF}(x)=${miseEnEvidence(reduireAxPlusB(m, p))}$<br>`
          this.correction += texteEnCouleur(
            `
  Mentalement : <br>
Les images de $-1$ et de $0$ permettent de déterminer rapidement le coefficient directeur qui est la différence des images, 
soit $${p}-${ecritureParentheseSiNegatif(p - m)}=${m}$.
`,
            'blue',
          )
        }
        break
    }
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
