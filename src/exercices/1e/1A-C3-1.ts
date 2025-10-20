import { choice } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '23/07/2025'
export const uuid = '6682b'

export const refs = {
  'fr-fr': ['1A-C3-1'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer avec des puissances (1)'
export default class Puissances extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce = 'On considère le nombre $N=\\dfrac{10^7}{5^2}$. On a :'
    this.correction = `$\\begin{aligned}
    N&=\\dfrac{10^7}{5^2}\\\\
    &=\\dfrac{2^7\\times 5^7}{5^2}\\\\
    &=2^7\\times 5^{7-2}\\\\
    &=2^7\\times 5^5\\\\
    &=(2\\times 5)^5\\times 2^2\\\\
    &=${miseEnEvidence('4\\times 10^5')}
    \\end{aligned}$`

    this.reponses = [
      '$N=4\\times 10^5$',
      '$N= 2^5$',
      `$N=${texNombre(20000)}$`,
      '$N=\\dfrac{1}{10^5}$',
    ]
  }

  versionAleatoire = () => {
    const a = choice([
      [5, 2],
      [2, 5],
      [5, 3],
      [5, 3],
      [2, 3],
      [3, 2],
    ])
    const n = randint(2, 4)
    const k = randint(2, 3)
    this.enonce = `
        On considère le nombre $N=\\dfrac{${a[0] * a[1]}^${n + k}}{${a[0]}^${n}}$. On a :<br>`
    this.correction = `$\\begin{aligned}
    N&=\\dfrac{${a[0] * a[1]}^${n + k}}{${a[0]}^${n}}\\\\
    &=\\dfrac{${a[0]}^${n + k}\\times ${a[1]}^${n + k} }{${a[0]}^${n}}\\\\
    &=${a[1]}^${n + k}\\times ${a[0]}^{${k}}\\\\
    &=${a[1] * a[0]}^${k}\\times ${a[1]}^{${n}}\\\\
    &=${miseEnEvidence(`${a[1] ** n}\\times ${a[0] * a[1]}^{${k}}`)}
    \\end{aligned}$`
    this.reponses = [
      ` $N=${a[1] ** n}\\times ${a[0] * a[1]}^{${k}}$`,
      `$N=${a[1]}^{${k}}$`,
      `$N=${a[0] * a[1]}^{${k}}$`,
      `$N=${a[0] ** n}\\times ${a[0] * a[1]}^{${k}}$`,
    ]
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
