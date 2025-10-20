import { miseEnEvidence } from '../../lib/outils/embellissements'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '10/08/2025'
export const uuid = '65cdf'
// Author Stéphane Guyon
export const refs = {
  'fr-fr': ['1A-C3-3'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer avec des puissances (3)'
export default class Puissances extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce =
      'Soit $n$ un entier non nul. À quelle expression est égale $\\left(3^n\\right)^{2}$ ?'
    this.correction = `On applique la propriété des puissances de puissances d'un réel : <br>
    Soit $n\\in \\mathbb{N}$, et $p \\in \\mathbb{N}$, on a : 
     $\\left(a^{n}\\right)^{p}=a^{np}$<br>
    $\\begin{aligned}\\left(3^{n}\\right)^{2}&=3^{2n}\\\\
    &=\\left(3^{2}\\right)^{n}\\\\
    &=9^{n}
    \\end{aligned}$`
    miseEnEvidence('$3^{2n}$')

    this.reponses = [
      '$9^{n}$',
      '$3^{n^{2}}$',
      '$6^{n}$',
      'Aucune de ces propositions',
    ]
  }

  versionAleatoire = () => {
    const k = randint(2, 3)
    const a = randint(2, 4)

    this.enonce = `Soit $n$ un entier.  À quelle expression est égale $\\left(${a}^{n}\\right)^{${k}}$ ?`
    this.correction = `On applique la propriété des puissances de puissances d'un réel : <br>
    Soit $n\\in \\mathbb{N}$, et $p \\in \\mathbb{N}$, on a : 
     $\\left(a^{n}\\right)^{p}=a^{np}$<br>
    $\\begin{aligned}\\left(${a}^{n}\\right)^{${k}}&=${a}^{${k}n}\\\\
    &=\\left(${a}^{${k}}\\right)^{n}\\\\
    &=${a ** k}^{n}
    \\end{aligned}$`
    miseEnEvidence(`$${a}^{2n}$`)
    this.reponses = [
      `$${a ** k}^{n}$`,
      `$${a}^{n^{${k}}}$`,
      `$${a}^{${k}+n}$`,
      `$${a * k}^{n}$`,
    ]
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
