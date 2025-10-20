import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '10/08/2025'
export const uuid = 'd388c'
// Author Stéphane Guyon
export const refs = {
  'fr-fr': ['1A-C9-5'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Travailler les expressions rationnelles (1).'
export default class Puissances extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce = 'Soit $x$ un réel non nul.<br>'

    this.enonce = 'Soit $x$ un réel non nul.<br>'

    this.enonce += `À quelle expression est égale $\\dfrac{4x^2}{\\dfrac{2}{x^2}}$?`
    this.correction = `On peut simplifier l'expression : <br>$\\begin{aligned}
        \\dfrac{4x^2}{\\dfrac{2}{x^2}}&=4x^2 \\times \\dfrac{x^2}{2}\\\\
        &=\\dfrac{4x^4}{2}\\\\
        &=2x^4.
     \\end{aligned}$`

    this.reponses = ['$2x^4$', '$2$ ', '$8$ ', '$8x^4$ ']
  }

  versionAleatoire = () => {
    const n = randint(2, 5)
    const p = randint(2, 5)
    const a = randint(2, 7)
    const k = randint(2, 5)
    this.enonce = 'Soit $x$ un réel non nul.<br>'

    this.enonce += `À quelle expression est égale $\\dfrac{${k * a}x^{${n}}}{\\dfrac{${a}}{x^${p}}}$?`
    this.correction = `On peut simplifier l'expression : <br>
              $\\begin{aligned}
       \\dfrac{${k * a}x^{${n}}}{\\dfrac{${a}}{x^${p}}}&=${k * a}x^{${n}} \\times \\dfrac{x^${p}}{${a}}\\\\
        &=\\dfrac{${k * a}x^{${n + p}}}{${a}}\\\\
        &=${k}x^{${n + p}}.
     \\end{aligned}$`

    this.reponses = [
      `$${k}x^{${n + p}}$`,
      `$${k}x^{${n - p}}$`,
      `$${k * a}x^{${n - p}}$`,
      `$${k * a}x^{${n + p}}$`,
    ]
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
