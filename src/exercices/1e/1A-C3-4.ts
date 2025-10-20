import { rienSi1 } from '../../lib/outils/ecritures'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '10/08/2025'
export const uuid = 'b37ab'
// Author Stéphane Guyon
export const refs = {
  'fr-fr': ['1A-C3-4'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer avec des puissances (4)'
export default class Puissances extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce =
      'Soient $a$ et $b$ deux nombres réels non nuls. À quelle expression est égale $a^2\\times b^3$ ?'
    this.correction =
      'a^2\\times b^3= a^2\\times b^2 \\times b = (ab)^2 \\times b$'
    miseEnEvidence('$(ab)^2 \\times b$')

    this.reponses = [
      '$(ab)^2 \\times b$',
      '$(ab)^5$',
      '$(ab)^6$',
      'Aucune de ces propositions',
    ]
  }

  versionAleatoire = () => {
    const n = randint(2, 4)
    const k = randint(n + 1, 6)
    this.enonce = `Soient $a$ et $b$ deux nombres réels non nuls.  À quelle expression est égale $a^${n}\\times b^${k}$ ?`
    this.correction = `$\\begin{aligned}
        a^${n}\\times b^${k}&= a^${n}\\times b^${n}\\times b^${k - n}\\\\
        &=${miseEnEvidence(`\\left(ab\\right)^${n}\\times b^${k - n}`)}\\end{aligned}$<br>`
    this.reponses = [
      `$\\left(ab\\right)^${n}\\times b^{${rienSi1(k - n)}}$`,
      `$\\left(ab\\right)^{${n + k}}$`,
      `$\\left(ab\\right)^{${n * k}} $`,
      'Aucune de ces propositions.',
    ]
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
