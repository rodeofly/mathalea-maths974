import { miseEnEvidence } from '../../lib/outils/embellissements'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '10/08/2025'
export const uuid = 'c0964'
// Author Stéphane Guyon
export const refs = {
  'fr-fr': ['1A-C3-8'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer avec des puissances (8)'
export default class Puissances extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.correction = `$\\begin{aligned} 2^{n}+2^n&=2\\times 2^n\\\\    &=${miseEnEvidence('2^{n+1}')}    \\end{aligned}$<br>`

    this.reponses = ['$2^{n+1}$', '$4^n$', '$2^{2n}$', '$(2^n)^2)$']
  }

  versionAleatoire = () => {
    const k = randint(3, 6)

    this.enonce = `Soit $n$ un entier non nul. <br>À quelle expression est égale $${k}^{n}+${k}^n$ ?`
    this.correction = `$\\begin{aligned} ${k}^{n}+${k}^n&=${miseEnEvidence(`2\\times ${k}^{n}`)}    \\end{aligned}$<br>`
    this.reponses = [
      `$2\\times ${k}^n$`,
      `$${2 * k}^n$`,
      `$${k}^{n+1}$`,
      `$ ${k}^{2n}$`,
    ]
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
