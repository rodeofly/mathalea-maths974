import { miseEnEvidence } from '../../lib/outils/embellissements'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '10/08/2025'
export const uuid = '7fe71'
// Author Stéphane Guyon
export const refs = {
  'fr-fr': ['1A-C3-9'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer avec des puissances (9)'
export default class Puissances extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce =
      'Soit $n$ un entier non nul.<br> À quelle expression est égale $\\left(-1\\right)^{n+2}$ ?'
    this.correction =
      '$\\begin{aligned} \\left(-1\\right)^{n+2}&=\\left(-1\\right)^{2}\\times \\left(-1\\right)^{n} \\\\    &=1\\times \\left(-1\\right)^{n} \\\\    &= \\left(-1\\right)^{n}    \\end{aligned}$<br>'
    this.reponses = [
      '$\\left(-1\\right)^{n} $',
      '$\\left(-1\\right)^{n+1}$ ',
      '$-\\left(-1\\right)^{n} $',
      '$\\left(-1\\right)^{n-1}$ ',
    ]
  }

  versionAleatoire = () => {
    const k = randint(3, 6)

    this.enonce = `Soit $n$ un entier non nul.<br> À quelle expression est égale $\\left(-1\\right)^{n+${k}}$ ?`
    if (k === 2 || k === 4 || k === 6) {
      this.correction = `$\\begin{aligned} \\left(-1\\right)^{n+${k}}&=\\left(-1\\right)^{${k}} \\times \\left(-1\\right)^{n} \\\\  &=1\\times \\left(-1\\right)^{n} \\\\    &= \\left(-1\\right)^{n}      \\end{aligned}$<br>`
      this.reponses = [
        '$\\left(-1\\right)^{n} $',
        '$\\left(-1\\right)^{n+1}$ ',
        '$-\\left(-1\\right)^{n} $',
        '$\\left(-1\\right)^{n-1}$ ',
      ]
    } else {
      this.correction = `$\\begin{aligned} \\left(-1\\right)^{n+${k}}&=\\left(-1\\right)^{${k - 1}}\\times \\left(-1\\right)^{n+1} \\\\    &=1\\times \\left(-1\\right)^{n+1} \\\\    &= \\left(-1\\right)^{n+1}   \\end{aligned}$<br>`
      this.reponses = [
        '$\\left(-1\\right)^{n+1} $',
        '$\\left(-1\\right)^{n+2} $',
        '$-\\left(-1\\right)^{n+1} $',
        '$\\left(-1\\right)^{n}$ ',
      ]
    }
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
