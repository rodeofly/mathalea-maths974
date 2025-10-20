import { texNombre } from '../../lib/outils/texNombre'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { Arbre } from '../../modules/arbres'
import FractionEtendue from '../../modules/FractionEtendue'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '10/08/2025'
export const uuid = '939af'
// Author Stéphane Guyon
export const refs = {
  'fr-fr': ['1A-P3-1'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Utiliser un arbre pour calculer une probabilité (intersection) '
export default class auto1AP3a extends ExerciceQcmA {
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
    this.enonce += '<br>$P(A \\cap C)=\\ldots$'
    this.correction = `On sait que <br>$\\begin{aligned}
        P(A \\cap C) &= P(A) \\times P_A(C)\\\\
        &= \\dfrac{3}{10} \\times \\dfrac{6}{10} \\\\
        &= \\dfrac{18}{100}\\\\
        &= \\dfrac{9}{50}
        \\end{aligned}$`

    this.reponses = [
      '$\\dfrac{9}{50}$',
      '$\\dfrac{13}{50}$ ',
      '$\\dfrac{7}{50}$ ',
      '$\\dfrac{11}{50}$ ',
    ]
  }

  versionAleatoire = () => {
    let objets = []
    const rationnel = true
    const NumA = randint(1, 9)
    const DenA = 10
    const NumAC = randint(1, 9)
    const DenAC = 10
    const NumBC = randint(2, 8)
    const DenBC = 10
    const pA = new FractionEtendue(NumA, DenA)
    const pAC = new FractionEtendue(NumAC, DenAC)
    const pBC = new FractionEtendue(NumBC, DenBC)

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
              nom: '\\bar C',
              proba: pAC.entierMoinsFraction(1),
            }),
          ],
        }),
        new Arbre({
          rationnel,
          nom: '\\bar A',
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
              nom: '\\bar C',
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
    const distracteur = pA.sommeFraction(pAC)

    // Génère distracteur2 différent de distracteur1 et de la bonne réponse

    this.enonce = 'On donne l\'arbre de probabilités ci-dessous :<br>'
    this.enonce += mathalea2d(Object.assign({ style: 'inline' }, fixeBordures(objets)), objets)
    this.enonce += '<br>$P(A \\cap C)=\\ldots$'

    this.correction = `On sait que <br>$\\begin{aligned}
        P(A \\cap C) &= P(A) \\times P_A(C)\\\\
        &= ${pA.texFractionSimplifiee} \\times ${pAC.texFractionSimplifiee} \\\\
        &= ${pC1.texFractionSimplifiee}
        \\end{aligned}$`

    this.reponses = [
      `$${pC1.texFractionSimplifiee}$`,
      `$${pAC.texFractionSimplifiee}$`,
      `$${pBC.entierMoinsFraction(1).texFractionSimplifiee}$`,
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
