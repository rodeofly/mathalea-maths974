import { texNombre } from '../../lib/outils/texNombre'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { Arbre } from '../../modules/arbres'
import FractionEtendue from '../../modules/FractionEtendue'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '10/08/2025'
export const uuid = '24438'
// Author Stéphane Guyon
export const refs = {
  'fr-fr': ['1A-P3-3'],
  'fr-ch': ['3mP1-2'],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Déterminer une probabilité conditionnelle.'
export default class auto1AP3c extends ExerciceQcmA {
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
          enfants: [
            new Arbre({
              rationnel,
              nom: 'C',
              proba: 0.6,
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
              // alter: 'x'
            }),
            new Arbre({
              rationnel,
              nom: '\\bar C',
              proba: 0.6,
              visible: true,
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

    this.enonce = "On donne l'arbre de probabilités ci-dessous :<br>"
    this.enonce += mathalea2d(
      Object.assign({ style: 'inline' }, fixeBordures(objets)),
      objets,
    )
    this.enonce += '<br>$p_C(A)=\\ldots$'
    this.correction = `On sait que $ P_C(A)=\\dfrac{P(A \\cap C)}{P(C)}$<br>
        D'après la formule des probabilités totales :<br>
         $\\begin{aligned}P(C)&=p(A\\cap C)+p(\\bar A \\cap C)\\\\
         &=P(A)\\times P_A(C)+P(\\bar A)\\times P_{\\bar A}(C)\\\\
         &=${texNombre(0.3)}\\times ${texNombre(0.6)}+${texNombre(0.7)}\\times ${texNombre(0.4)}\\\\
         &=${texNombre(0.18)}+${texNombre(0.28)}\\\\
            &=${texNombre(0.46)}\\\\
            \\end{aligned}$<br>
         <br>$\\begin{aligned}
    P_C(A)&=\\dfrac{P(A \\cap C)}{P(C)}\\\\
    &=\\dfrac{P(A)\\times P_A(C)}{P(C)}\\\\
    &=\\dfrac{${texNombre(0.18)}}{${texNombre(0.46)}}\\\\
   &=\\dfrac{9}{23}
     \\end{aligned}$`

    this.reponses = [
      '$\\dfrac{9}{23}$',
      '$\\dfrac{11}{23}$ ',
      '$\\dfrac{13}{23}$ ',
      '$\\dfrac{9}{50}$ ',
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
          enfants: [
            new Arbre({
              rationnel,
              nom: 'C',
              proba: pAC,
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
              // alter: 'x'
            }),
            new Arbre({
              rationnel,
              nom: '\\bar C',
              proba: pBC.entierMoinsFraction(1),
              visible: true,
              alter: '',
            }),
          ],
        }),
      ],
    })

    omega.setTailles() // On calcule les tailles des arbres.
    objets = omega.represente(0, 6, 0, 3, true, 1, 8)
    const pC1 = pA.produitFraction(pAC)
    const pC2 = pA.entierMoinsFraction(1).produitFraction(pBC)
    const pC = pC1.sommeFraction(pC2) // On a calculé p(C)
    const Reponse = pC1.diviseFraction(pC)
    // Génère distracteur2 différent de distracteur1 et de la bonne réponse

    this.enonce = "On donne l'arbre de probabilités ci-dessous :<br>"
    this.enonce += mathalea2d(
      Object.assign({ style: 'inline' }, fixeBordures(objets)),
      objets,
    )
    this.enonce += '<br>$P_C(A)=\\ldots$'
    const resultat = Reponse.texFractionSimplifiee

    this.correction = `On sait que $ P_C(A)=\\dfrac{P(A \\cap C)}{P(C)}$<br>
        D'après la formule des probabilités totales :<br>
         $\\begin{aligned}P(C)&=p(A\\cap C)+p(\\bar A \\cap C)\\\\
         &=P(A)\\times P_A(C)+P(\\bar A)\\times P_{\\bar A}(C)\\\\
         &=${pA.texFractionSimplifiee}\\times ${pAC.texFractionSimplifiee}+${pA.entierMoinsFraction(1).texFractionSimplifiee}\\times ${pBC.texFractionSimplifiee}\\\\
         &=${pC1.texFractionSimplifiee}+${pC2.texFractionSimplifiee}\\\\
            &=${pC.texFractionSimplifiee}\\\\
            \\end{aligned}$<br>
         <br>$\\begin{aligned}
    P_C(A)&=\\dfrac{P(A \\cap C)}{P(C)}\\\\
    &=\\dfrac{P(A)\\times P_A(C)}{P(C)}\\\\
    &=\\dfrac{${pC1.texFractionSimplifiee}}{${pC.texFractionSimplifiee}}\\\\
    &=${Reponse.texFractionSimplifiee}\\\\
     \\end{aligned}$`
    // --- Distracteurs sûrs, distincts et ≠ bonne réponse --- Merci mon ami Chat GPT pour cette astuce, devenue trop lourde car j'ai viré un distracteur....
    const denom = Math.max(1, Reponse.denIrred) // garde-fou
    const correct = Reponse.numIrred

    // 1) Construire un pool de numérateurs candidats
    let candidats: number[] = []
    if (denom > 2) {
      // Numérateurs "classiques" entre 1 et denom-1
      for (let k = 1; k < denom; k++) {
        if (k !== correct) candidats.push(k)
      }
    } else {
      // Cas limites (denom = 1 ou 2) : valeurs autour de la réponse
      candidats = [
        correct + 1,
        Math.max(1, correct - 1),
        correct + 2,
        correct + 3,
      ]
    }

    // Déduplication et positifs
    candidats = Array.from(new Set(candidats)).filter((n) => n > 0)

    // 2) S'assurer d'avoir au moins 2 options
    while (candidats.length < 2) {
      const extra = correct + randint(1, 5)
      if (!candidats.includes(extra) && extra !== correct) candidats.push(extra)
    }

    // 3) Tirer deux candidats distincts sans boucle infinie
    const takeOne = () => {
      const i = randint(0, candidats.length - 1)
      return candidats.splice(i, 1)[0] // retire du pool pour garantir la distinction
    }
    const n1 = takeOne()
    const n2 = takeOne()

    // 4) Construire les deux distracteurs
    const distracteur1 = new FractionEtendue(n1, denom)
    const distracteur2 = new FractionEtendue(n2, denom)
    this.reponses = [
      `$${Reponse.texFractionSimplifiee} $`,
      `$${distracteur1.texFractionSimplifiee}$ `,
      `$${pC1.texFractionSimplifiee} $`,
      `$${pAC.texFractionSimplifiee} $`,
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
