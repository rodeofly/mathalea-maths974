import {
  ecritureAlgebriqueSauf1,
  reduireAxPlusB,
} from '../../lib/outils/ecritures'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '10/08/2025'
export const uuid = '90725'
// Author Stéphane Guyon
export const refs = {
  'fr-fr': ['1A-C9-6'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Travailler les expressions rationnelles (2).'
export default class Puissances extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce = 'Soit $x$ un réel non nul.<br>'

    this.enonce = 'Soit $x$ un réel non nul.<br>'

    this.enonce += `À quelle expression est égale $\\dfrac12-\\dfrac{x+1}{x}$?`
    this.correction = `On peut simplifier l'expression : <br>$\\begin{aligned}
        \\dfrac12-\\dfrac{x+1}{x}&=\\dfrac12-\\dfrac{x}{x}-\\dfrac{1}{x}\\\\
        &=\\dfrac12-1-\\dfrac{1}{x}\\\\
        &=\\dfrac{-1}{2}-\\dfrac{1}{x}\\\\
        &=\\dfrac{-x-2}{2x}
        &=-\\dfrac{x+2}{2x}.
     \\end{aligned}$`

    this.reponses = [
      '$-\\dfrac{x+2}{2x}$',
      '$\\dfrac{x-2}{2x}$ ',
      '$\\dfrac{-x+2}{2x}$ ',
      '$\\dfrac{x+2}{2x}$',
    ]
  }

  versionAleatoire = () => {
    const n = randint(2, 8)
    const p = randint(2, 5)
    const a = randint(2, 7)
    const b = randint(2, 5)
    this.enonce = 'Soit $x$ un réel non nul.<br>'

    this.enonce += `À quelle expression est égale $\\dfrac{1}{${n}}-\\dfrac{${reduireAxPlusB(a, b)}}{x}$ ?`
    this.correction = `On met l'expression au même dénominateur : <br>$\\begin{aligned}
        \\dfrac{1}{${n}}-\\dfrac{${reduireAxPlusB(a, b)}}{x}&=\\dfrac{x-${n}\\times \\left(${reduireAxPlusB(a, b)}\\right)}{${n}x}\\\\
        &=\\dfrac{x ${ecritureAlgebriqueSauf1(-a * n)}x ${ecritureAlgebriqueSauf1(-b * n)}}{${n}x}\\\\
        &=\\dfrac{${ecritureAlgebriqueSauf1(-a * n + 1)}x ${ecritureAlgebriqueSauf1(-b * n)}}{${n}x}\\\\
     \\end{aligned}$`
    if (-a * n + 1 < 0 && -b * n < 0) {
      this.correction += `<br>$\\phantom{\\dfrac{1}{${n}}-\\dfrac{${reduireAxPlusB(a, b)}}{x}}=-\\dfrac{${a * n - 1}x ${ecritureAlgebriqueSauf1(b * n)}}{${n}x}$`
      this.reponses = [
        `$-\\dfrac{${a * n - 1}x ${ecritureAlgebriqueSauf1(b * n)}}{${n}x}$`,
        `$\\dfrac{${a * n - 1}x ${ecritureAlgebriqueSauf1(b * n)}}{${n}x}$ `,
        `$\\dfrac{${-a * n + 1}x ${ecritureAlgebriqueSauf1(b * n)}}{${n}x}$ `,
        `$-\\dfrac{${a * n + 1}x ${ecritureAlgebriqueSauf1(b * n)}}{${n}x}$ `,
      ]
    } else {
      this.reponses = [
        `$\\dfrac{${-a * n + 1}x ${ecritureAlgebriqueSauf1(-b * n)}}{${n}x}$ `,
        `$\\dfrac{${-a * n + 1}x ${ecritureAlgebriqueSauf1(b * n)}}{${n}x}$ `,
        `$-\\dfrac{${-a * n + 1}x ${ecritureAlgebriqueSauf1(b * n)}}{${n}x}$ `,
        `$-\\dfrac{${a * n - 1}x ${ecritureAlgebriqueSauf1(b * n)}}{${n}x}$ `,
      ]
    }
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
