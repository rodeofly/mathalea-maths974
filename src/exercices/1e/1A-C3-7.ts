import { miseEnEvidence } from '../../lib/outils/embellissements'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '10/08/2025'
export const uuid = '3f994'
// Author Stéphane Guyon
export const refs = {
  'fr-fr': ['1A-C3-7'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer avec des puissances (7)'
export default class Puissances extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce =
      'Soit $a$ un nombre réel non nul et $n$ un entier non nul. <br>À quelle expression est égale $a^{3n}(a^n)^2$ ?'
    this.correction =
      "On applique la propriété du quotient des puissances d'un réel : <br>"
    this.correction +=
      'Soit n et p deux entiers et a un réel :  $\\dfrac{a^n}{a^p}=a^{n-p}$<br>'
    this.correction +=
      "On applique la propriété du produit des puissances d'un réel : <br>"
    this.correction +=
      'Soient $n$ et $p$ deux entiers et $a$ un réel :  $a^n\\times a^p=a^{n+p}$<br>'
    this.correction += 'et du produit de puissances. <br>'
    this.correction +=
      'Pour tous entiers $n$ et $p$ et $a$ réel, on a :  $\\left(a^{n}\\right)^p=a^{np}$<br>'
    this.correction +=
      '$\\begin{aligned} a^{3n}(a^n)^2&=a^{3n}\\times a^{2n}\\\\    &=a^{5n}    \\end{aligned}$<br>'
    this.reponses = ['$a^{5n}$', '$a^{6n}$', '$a^{3n^2}$', '$a^{6n^2}$']
  }

  versionAleatoire = () => {
    const k = randint(2, 5)
    const p = randint(2, 5, k)
    this.enonce = `Soit $a$ un nombre réel non nul et $n$ un entier non nul. <br>À quelle expression est égale $a^{${k}n}(a^n)^${p}$ ?`
    this.correction = `On applique la propriété du produit des puissances d'un réel : <br>
   Soient $n$ et $p$ deux entiers et $a$ un réel :  $a^n\\times a^p=a^{n+p}$<br>
    et du produit de puissances. <br>
     Pour tous entiers $n$ et $p$ et $a$ réel, on a :  $\\left(a^{n}\\right)^p=a^{np}$<br>
    $\\begin{aligned} a^{${k}n}(a^n)^${p}&=a^{${k}n}\\times a^{${p}n}\\\\
   &=${miseEnEvidence(`a^{${k + p}n}`)}
    \\end{aligned}$<br>`
    this.reponses = [
      `$a^{${k + p}n}$`,
      `$a^{${k * p}n}$`,
      `$a^{${k + p}n^2}$`,
      `$a^{${k * p}n^2}$`,
    ]
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
