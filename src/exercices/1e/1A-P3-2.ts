import { texNombre } from '../../lib/outils/texNombre'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { Arbre } from '../../modules/arbres'
import FractionEtendue from '../../modules/FractionEtendue'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '10/08/2025'
export const uuid = '93b62'
// Author Stéphane Guyon
export const refs = {
  'fr-fr': ['1A-P3-2'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Utiliser un arbre pour calculer une probabilité (conditionnelle)'
export default class auto1AP3b extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    let objets = []
    const rationnel = true

    const omega = new Arbre({
      racine: true,
      rationnel,
      nom: '',
      proba: 1,
      visible: false,
      alter: '',
      enfants: [
        new Arbre({
          rationnel,
          nom: 'A',
          proba: 0.3,
          visible: false,
          enfants: [
            new Arbre({
              rationnel,
              nom: 'C',
              proba: 0.6,
              visible: false,
            }),
            new Arbre({
              rationnel,
              nom: '\\bar C',
              proba: 0.4,
              visible: false,
            }),
          ],
        }),
        new Arbre({
          rationnel,
          nom: '\\bar A',
          proba: 0.7,
          enfants: [
            new Arbre({
              rationnel,
              nom: 'C',
              proba: 0.4,
              visible: true,
              alter: '',
            }),
            new Arbre({
              rationnel,
              nom: '\\bar C',
              proba: 0.6,
              visible: false,
              alter: '',
            }),
          ],
        }),
      ],
    })

    omega.setTailles() // On calcule les tailles des arbres.
    objets = omega.represente(0, 6, 0, 3, true, 1, 8)

    let distracteur2: number
    let distracteur3: number
    // Génère distracteur2 différent de distracteur1 et de la bonne réponse

    this.enonce = 'On donne l\'arbre de probabilités ci-dessous :<br>'
    this.enonce += mathalea2d(Object.assign({ style: 'inline' }, fixeBordures(objets)), objets)
    this.enonce += '<br>On sait que $P(A \\cap C)=\\dfrac{9}{50}$.'
    this.enonce += '<br>$P_A(\\overline{C})=\\ldots$'
    this.correction = `On déduit de l'énoncé<br>$\\begin{aligned}
        P(A)&=1-P(\\overline{A})\\\\
        &=1-\\dfrac{7}{10}\\\\
        &=\\dfrac{3}{10}.\\end{aligned}$<br>
        Avec la donnée de $P(A \\cap C)=\\dfrac{9}{50}$ dans l'énoncé, on peut alors calculer : <br>$\\begin{aligned}
        P_A(C)&=\\dfrac{P(A \\cap C)}{P(A)}\\\\
        &=\\dfrac{ \\dfrac{9}{50}}{\\dfrac{3}{10}} \\\\
        &=\\dfrac{9}{50} \\times \\dfrac{10}{3} \\\\
        &= \\dfrac{3}{5}.
      \\end{aligned}$<br>
        On sait alors que <br>$\\begin{aligned}
        P_A(\\overline{C})&=1-P_A(C)\\\\
        &=1-\\dfrac{3}{5}\\\\
        &=\\dfrac{2}{5}.\\end{aligned}$<br>`

    this.reponses = [
      '$\\dfrac{2}{5}$',
      '$\\dfrac{3}{5}$ ',
      '$\\dfrac{7}{50}$ ',
      '$\\dfrac{1}{5}$ ',
    ]
  }

  versionAleatoire = () => {
    let objets = []
    const rationnel = true
    const NumA = randint(1, 9)
    const DenA = 10
    const NumAC = randint(1, 9, NumA)
    const DenAC = 10
    const NumBC = randint(2, 8)
    const DenBC = 10
    const pA = new FractionEtendue(NumA, DenA)
    const pAC = new FractionEtendue(NumAC, DenAC)
    const pBC = new FractionEtendue(NumBC, DenBC)
    const distracteurNum = randint(1, 9, 10 - NumAC)

    const distracteur = new FractionEtendue(distracteurNum, 10)

    // On définit l'arbre complet
    const omega = new Arbre({
      racine: true,
      rationnel,
      nom: '',
      proba: 1,
      visible: false,
      alter: '',
      enfants: [
        new Arbre({
          rationnel,
          nom: 'A',
          proba: pA,
          visible: false,
          enfants: [
            new Arbre({
              rationnel,
              nom: 'C',
              proba: pAC,
              visible: false,
            }),
            new Arbre({
              rationnel,
              nom: '\\overline C',
              proba: pAC.entierMoinsFraction(1),
              visible: false,
            }),
          ],
        }),
        new Arbre({
          rationnel,
          nom: '\\overline A',
          proba: pA.entierMoinsFraction(1),
          enfants: [
            new Arbre({
              rationnel,
              nom: 'C',
              proba: pBC,
              visible: true,
            }),
            new Arbre({
              rationnel,
              nom: '\\overline C',
              proba: pBC.entierMoinsFraction(1),
              visible: false,
              alter: '',
            }),
          ],
        }),
      ],
    })

    omega.setTailles() // On calcule les tailles des arbres.
    objets = omega.represente(0, 6, 0, 3, true, 1, 8)
    const pC1 = pA.produitFraction(pAC)

    const inversepA = new FractionEtendue(pA.den, pA.num)

    // Génère distracteur2 différent de distracteur1 et de la bonne réponse

    this.enonce = 'On donne l\'arbre de probabilités ci-dessous :<br>'
    this.enonce += mathalea2d(Object.assign({ style: 'inline' }, fixeBordures(objets)), objets)
    this.enonce += `<br>On sait que $P(A \\cap C)=${pC1.texFractionSimplifiee}$.<br>`
    this.enonce += '$P_A(\\overline{C})=\\ldots$'

    this.correction = `On déduit de l'énoncé<br>$\\begin{aligned}
        P(A)&=1-P(\\overline{A})\\\\
        &=1-${pA.entierMoinsFraction(1).texFractionSimplifiee}\\\\
        &=${pA.texFractionSimplifiee}.\\end{aligned}$<br>
        Avec la donnée de $P(A \\cap C)=${pC1.texFractionSimplifiee}$ dans l'énoncé, on peut alors calculer : <br>$\\begin{aligned}
        P_A(C)&=\\dfrac{P(A \\cap C)}{P(A)}\\\\
        &=\\dfrac{ ${pC1.texFractionSimplifiee}}{ ${pA.texFractionSimplifiee}} \\\\
        &=${pC1.texFractionSimplifiee} \\times ${inversepA.texFractionSimplifiee} \\\\
        &= ${pC1.diviseFraction(pA).texFractionSimplifiee}.
      \\end{aligned}$<br>
        On sait alors que <br>$\\begin{aligned}
        P_A(\\overline{C})&=1-P_A(C)\\\\
        &=1-${pAC.texFractionSimplifiee}\\\\
        &=${pAC.entierMoinsFraction(1).texFractionSimplifiee} .\\end{aligned}$<br>`

    this.reponses = [
      `$${pAC.entierMoinsFraction(1).texFractionSimplifiee}$`,
      `$${pBC.texFractionSimplifiee}$`,
      `$${distracteur.texFractionSimplifiee}$`,
      `$${pAC.texFractionSimplifiee}$`,
    ]
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
function Do(arg0: number) {
  throw new Error('Function not implemented.')
}
