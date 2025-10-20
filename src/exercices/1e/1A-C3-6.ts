import { miseEnEvidence } from '../../lib/outils/embellissements'
import { rienSi1 } from '../../lib/outils/ecritures'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '10/08/2025'
export const uuid = '66ec4'
// Author Stéphane Guyon
export const refs = {
  'fr-fr': ['1A-C3-6'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer avec des puissances (6)'
export default class Puissances extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce =
      'Soit $a$ un nombre réel non nul et $n$ un entier non nul.<br> À quelle expression est égale $\\dfrac{a^{n^2}}{a^{n}}$ ?'
    this.correction =
      "On applique la propriété du quotient des puissances d'un réel : <br>"
    this.correction +=
      'Soit $n$ et $p$ deux entiers et $a$ un réel :  $\\dfrac{a^n}{a^p}=a^{n-p}$<br>'
    this.correction += `$\\begin{aligned}    \\dfrac{a^{n^2}}{a^{n}}&=a^{n^2-n}\\\\ &=${miseEnEvidence('a^{n(n-1)}')}    \\end{aligned}$<br>`

    this.reponses = [
      '$a^{n(n-1)}$',
      '$a^{n}$',
      '$a^{2^n}$',
      'Aucune de ces propositions',
    ]
  }

  versionAleatoire = () => {
    const k = randint(2, 5)
    this.enonce = `Soit $a$ un nombre réel non nul et $n$ un entier non nul.<br> À quelle expression est égale $\\dfrac{a^{n^{${k}}}}{a^{n}}$ ?`
    this.correction = `On applique la propriété du quotient des puissances d'un réel : <br>
    Soit $n$ et $p$ deux entiers et $a$ un réel :  $\\dfrac{a^n}{a^p}=a^{n-p}$<br>
    $\\begin{aligned} \\dfrac{a^{n^{${k}}}}{a^{n}}&=a^{n^{${k}}-n}\\\\
    &=${miseEnEvidence(`a^{n(n^{${rienSi1(k - 1)}}-1)}`)}
    \\end{aligned}$<br>`
    this.reponses = [
      `$a^{n(n^{${rienSi1(k - 1)}}-1)}$`,
      `$a^{${rienSi1(k - 1)}n}$`,
      `$a^{n^${k - 1}}$`,
      `$a^{${k}}$`,
    ]
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
