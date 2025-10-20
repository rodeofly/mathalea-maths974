import { tableauColonneLigne } from '../../lib/2d/tableau'
import { choice } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import FractionEtendue from '../../modules/FractionEtendue'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '14/09/2025'
export const uuid = '2e3f9'

export const refs = {
  'fr-fr': ['1A-P1'],
  'fr-ch': ['3mQCM-3'],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer une probabilité dans un tableau'
export default class auto1AP1 extends ExerciceQcmA {
  /**
   * Génère l'énoncé commun avec le tableau de probabilités
   */
  private genererEnonce(valeurs: string[]): string {
    return (
      `On lance un dé à 4 faces. La probabilité d'obtenir chacune des faces est donnée dans le tableau ci-dessous :<br><br>` +
      tableauColonneLigne(
        ['\\text{Numéro de la face}', '1', '2', '3', '4'],
        ['\\text{Probabilité}'],
        valeurs
      ) +
      `<br><br>On peut affirmer que :`
    )
  }

  /**
   * Génère le début de correction commun
   */
  private debutCorrection(): string {
    return `La somme des probabilités doit être égale à 1.  <br>`
  }

  /**
   * Applique les valeurs pour le cas 3 : 2 décimales + 1 fraction → réponse en fraction
   */
  private appliquerLesValeurs(
    fraction1: { frac: FractionEtendue; fracd: FractionEtendue; val: number },
    fraction2: { frac: FractionEtendue; fracd: FractionEtendue; val: number },
    fraction3: { frac: FractionEtendue; fracd: FractionEtendue; val: number },
    fraction4: { frac: FractionEtendue; fracd: FractionEtendue; val: number }
  ): void {
    this.enonce = this.genererEnonce([
      texNombre(fraction1.val),
      texNombre(fraction2.val),
      fraction3.frac.texFraction,
      'x',
    ])

    this.correction =
      this.debutCorrection() +
      `Comme $${fraction3.frac.texFraction}=${texNombre(fraction3.val)}$, on a : <br>
        $\\begin{aligned}
        x&=1-\\left(${texNombre(fraction1.val)}+${texNombre(fraction2.val)}+${texNombre(fraction3.val)}\\right)\\\\
        x&=${texNombre(fraction4.val)}\\\\
         x&=${miseEnEvidence(fraction4.frac.texFraction)}
        \\end{aligned}$ <br>`

    this.reponses = [
      `$x=${fraction4.frac.texFraction}$`,
      `$x=${fraction1.fracd.sommeFractions(fraction2.fracd, fraction3.fracd).texFraction}$`,
      `$\\vphantom{\\dfrac{1}{3}}x=${texNombre(1 - fraction4.val)}$`,
      `$x=${fraction1.frac.sommeFractions(fraction3.fracd).oppose().ajouteEntier(1).texFraction}$`,
    ]
  }

  versionOriginale: () => void = () => {
    this.enonce = this.genererEnonce(['0,5', '\\dfrac{1}{6}', '0,2', 'x'])

    this.correction =
      this.debutCorrection() +
      `Comme $0,5=\\dfrac{1}{2}$ et $0,2=\\dfrac{1}{5}$, on a : <br>
    $\\begin{aligned}
    x&=1-\\left(\\dfrac{1}{2}+\\dfrac{1}{6}+\\dfrac{1}{5}\\right)\\\\
    & =1-\\left(\\dfrac{15}{30}+\\dfrac{5}{30}+\\dfrac{6}{30}\\right)\\\\
    & =1-\\dfrac{26}{30}\\\\
    &=\\dfrac{4}{30}\\\\
    &=${miseEnEvidence('\\dfrac{2}{15}')}
    \\end{aligned}$ <br>`

    this.reponses = [
      '$x=\\dfrac{2}{15}$',
      '$x=\\dfrac{2}{3}$',
      `$\\vphantom{\\dfrac{1}{3}}x=0,4$`,
      '$\\vphantom{\\dfrac{1}{3}}x=0,1$',
    ]
  }

  versionAleatoire = () => {
    switch (choice([1, 2, 3])) {
      case 1: {
        // Cas où la réponse est décimale énoncé avec 1 fraction et deux décimales
        const tableaux = [
          {
            fraction: {
              frac: new FractionEtendue(1, 4),
              tex: '\\dfrac{1}{4}',
              val: 0.25,
            },
            decimales: [0.35, 0.3, 0.1],
          },
          {
            fraction: {
              frac: new FractionEtendue(1, 5),
              tex: '\\dfrac{1}{5}',
              val: 0.2,
            },
            decimales: [0.3, 0.35, 0.15],
          },
          {
            fraction: {
              frac: new FractionEtendue(3, 10),
              tex: '\\dfrac{3}{10}',
              val: 0.3,
            },
            decimales: [0.35, 0.25, 0.1],
          },
          {
            fraction: {
              frac: new FractionEtendue(1, 10),
              tex: '\\dfrac{1}{10}',
              val: 0.1,
            },
            decimales: [0.45, 0.3, 0.15],
          },
          {
            fraction: {
              frac: new FractionEtendue(7, 20),
              tex: '\\dfrac{7}{20}',
              val: 0.35,
            },
            decimales: [0.3, 0.25, 0.1],
          },
          {
            fraction: {
              frac: new FractionEtendue(9, 20),
              tex: '\\dfrac{9}{20}',
              val: 0.45,
            },
            decimales: [0.3, 0.15, 0.1],
          },
          {
            fraction: {
              frac: new FractionEtendue(3, 20),
              tex: '\\dfrac{3}{20}',
              val: 0.15,
            },
            decimales: [0.45, 0.3, 0.1],
          },
        ]

        const tableau = choice(tableaux)
        const bonneReponse = choice(tableau.decimales)
        const autresDecimales = tableau.decimales.filter(
          (d: number) => d !== bonneReponse
        )

        this.enonce = this.genererEnonce([
          tableau.fraction.tex,
          texNombre(autresDecimales[0]),
          texNombre(autresDecimales[1]),
          'x',
        ])

        this.correction =
          this.debutCorrection() +
          `Comme $${tableau.fraction.tex}=${texNombre(tableau.fraction.val)}$, on a : <br>
        $\\begin{aligned}
        x&=1-\\left(${texNombre(tableau.fraction.val)}+${texNombre(autresDecimales[0])}+${texNombre(autresDecimales[1])}\\right)\\\\
        &=1-${texNombre(tableau.fraction.val + autresDecimales[0] + autresDecimales[1])}\\\\
        &=${miseEnEvidence(texNombre(bonneReponse))}
        \\end{aligned}$ <br>`

        this.reponses = [
          `$\\vphantom{\\dfrac{1}{3}}x=${texNombre(bonneReponse)}$`,
          `$x=${tableau.fraction.frac.oppose().ajouteEntier(1).texFraction}$`,
          `$\\vphantom{\\dfrac{1}{3}}x=${texNombre(1 - autresDecimales[0] - autresDecimales[1])}$`,
          `$\\vphantom{\\dfrac{1}{3}}x=${texNombre(tableau.fraction.val + autresDecimales[0] + autresDecimales[1])}$`,
        ]
        break
      }

      case 2: {
        // Cas avec 2 fractions dans tableau, 1 décimale et x (bonne réponse en fraction)
        const tableaux = [
          {
            fraction2: {
              frac: new FractionEtendue(1, 4),
              fracd: new FractionEtendue(15, 60),
              val: 0.25,
            },
            fraction3: {
              frac: new FractionEtendue(1, 5),
              fracd: new FractionEtendue(12, 60),
              val: 0.2,
            },
            fraction4: {
              frac: new FractionEtendue(1, 3),
              fracd: new FractionEtendue(20, 60),
              val: 0.333333,
            },
            fraction1: {
              frac: new FractionEtendue(13, 60),
              fracd: new FractionEtendue(13, 60),
              val: 0.216667,
            },
          },
          {
            fraction2: {
              frac: new FractionEtendue(3, 10),
              fracd: new FractionEtendue(18, 60),
              val: 0.3,
            },
            fraction3: {
              frac: new FractionEtendue(1, 4),
              fracd: new FractionEtendue(15, 60),
              val: 0.25,
            },
            fraction4: {
              frac: new FractionEtendue(1, 6),
              fracd: new FractionEtendue(10, 60),
              val: 0.166667,
            },
            fraction1: {
              frac: new FractionEtendue(17, 60),
              fracd: new FractionEtendue(17, 60),
              val: 0.283333,
            },
          },
          {
            fraction2: {
              frac: new FractionEtendue(3, 10),
              fracd: new FractionEtendue(9, 30),
              val: 0.3,
            },
            fraction3: {
              frac: new FractionEtendue(1, 5),
              fracd: new FractionEtendue(6, 30),
              val: 0.2,
            },
            fraction4: {
              frac: new FractionEtendue(1, 3),
              fracd: new FractionEtendue(10, 30),
              val: 0.333333,
            },
            fraction1: {
              frac: new FractionEtendue(1, 6),
              fracd: new FractionEtendue(5, 30),
              val: 0.166667,
            },
          },
          {
            fraction2: {
              frac: new FractionEtendue(1, 10),
              fracd: new FractionEtendue(3, 30),
              val: 0.1,
            },
            fraction3: {
              frac: new FractionEtendue(1, 3),
              fracd: new FractionEtendue(10, 30),
              val: 0.333333,
            },
            fraction4: {
              frac: new FractionEtendue(8, 15),
              fracd: new FractionEtendue(16, 30),
              val: 0.533333,
            },
            fraction1: {
              frac: new FractionEtendue(1, 30),
              fracd: new FractionEtendue(1, 30),
              val: 0.033333,
            },
          },
        ]

        const tableau = choice(tableaux)
        this.enonce = this.genererEnonce([
          tableau.fraction1.frac.texFraction,
          texNombre(tableau.fraction2.val),
          tableau.fraction3.frac.texFraction,
          'x',
        ])

        this.correction =
          this.debutCorrection() +
          `Comme $${texNombre(tableau.fraction2.val)}=${tableau.fraction2.frac.texFraction}$, on a : <br>
        $\\begin{aligned}
        x&=1-\\left(${tableau.fraction1.frac.texFraction}+${tableau.fraction2.frac.texFraction}+${tableau.fraction3.frac.texFraction}\\right)\\\\
        x&=1-\\left(${tableau.fraction1.fracd.texFraction}+${tableau.fraction2.fracd.texFraction}+${tableau.fraction3.fracd.texFraction}\\right)\\\\
        x&=1-${tableau.fraction1.fracd.sommeFractions(tableau.fraction2.fracd, tableau.fraction3.fracd).texFraction}\\\\
        x&=${miseEnEvidence(tableau.fraction4.frac.texFraction)}
        \\end{aligned}$ <br>`

        this.reponses = [
          `$x=${tableau.fraction4.frac.texFraction}$`,
          `$x=${tableau.fraction1.fracd.sommeFractions(tableau.fraction2.fracd, tableau.fraction3.fracd).texFraction}$`,
          `$\\vphantom{\\dfrac{1}{3}}x=${texNombre(1 - tableau.fraction2.val)}$`,
          `$x=${tableau.fraction1.frac.sommeFractions(tableau.fraction3.fracd).oppose().ajouteEntier(1).texFraction}$`,
        ]
        break
      }

      case 3:
      default: {
        // Cas avec 2 décimales, 1 fraction, x (bonne réponse en fraction)
        // Utilise appliquerLesValeurs()
        const tableaux = [
          {
            fraction1: {
              frac: new FractionEtendue(3, 10),
              fracd: new FractionEtendue(6, 20),
              val: 0.3,
            },
            fraction2: {
              frac: new FractionEtendue(3, 20),
              fracd: new FractionEtendue(3, 20),
              val: 0.15,
            },
            fraction3: {
              frac: new FractionEtendue(7, 20),
              fracd: new FractionEtendue(7, 20),
              val: 0.35,
            },
            fraction4: {
              frac: new FractionEtendue(1, 5),
              fracd: new FractionEtendue(4, 20),
              val: 0.2,
            },
          },
          {
            fraction1: {
              frac: new FractionEtendue(3, 5),
              fracd: new FractionEtendue(6, 10),
              val: 0.6,
            },
            fraction2: {
              frac: new FractionEtendue(1, 10),
              fracd: new FractionEtendue(1, 10),
              val: 0.1,
            },
            fraction3: {
              frac: new FractionEtendue(1, 5),
              fracd: new FractionEtendue(2, 10),
              val: 0.2,
            },
            fraction4: {
              frac: new FractionEtendue(1, 10),
              fracd: new FractionEtendue(1, 10),
              val: 0.1,
            },
          },
          {
            fraction1: {
              frac: new FractionEtendue(7, 20),
              fracd: new FractionEtendue(7, 20),
              val: 0.35,
            },
            fraction2: {
              frac: new FractionEtendue(3, 10),
              fracd: new FractionEtendue(6, 20),
              val: 0.3,
            },
            fraction3: {
              frac: new FractionEtendue(9, 20),
              fracd: new FractionEtendue(9, 20),
              val: 0.45,
            },
            fraction4: {
              frac: new FractionEtendue(1, 20),
              fracd: new FractionEtendue(1, 20),
              val: 0.05,
            },
          },
          {
            fraction1: {
              frac: new FractionEtendue(9, 20),
              fracd: new FractionEtendue(9, 20),
              val: 0.45,
            },
            fraction2: {
              frac: new FractionEtendue(7, 20),
              fracd: new FractionEtendue(7, 20),
              val: 0.35,
            },
            fraction3: {
              frac: new FractionEtendue(3, 20),
              fracd: new FractionEtendue(3, 20),
              val: 0.15,
            },
            fraction4: {
              frac: new FractionEtendue(1, 20),
              fracd: new FractionEtendue(1, 20),
              val: 0.05,
            },
          },
        ]

        const tableau = choice(tableaux)
        this.appliquerLesValeurs(
          tableau.fraction1,
          tableau.fraction2,
          tableau.fraction3,
          tableau.fraction4
        )
        break
      }
    }
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}