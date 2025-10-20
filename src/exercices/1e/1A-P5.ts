import { texNombre } from '../../lib/outils/texNombre'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { Arbre, texProba } from '../../modules/arbres'
import { randint } from '../../modules/outils'
import ExerciceSimple from '../ExerciceSimple'
export const titre =
  "Calculer une probabilité à l'aide d'un arbre de probabilités"
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '4/5/2024'

export const uuid = '51599'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['3mQCM-1'],
}

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Rémi Angot clone de can1P04 de Jean-Claude Lhote, Stéphane Guyon pour le QCM

*/
export default class can1P04 extends ExerciceSimple {
  constructor() {
    super()
    this.nbQuestions = 1
    this.versionQcm = true
  }

  nouvelleVersion() {
    const rationnel = true
    let objets = []
    // On choisit les probas de l'arbre
    const pA = Number(randint(2, 8) / 10)
    const pB = Number(1 - pA)
    const pAC = Number(randint(2, 8) / 10)
    const pBC = Number(randint(2, 8) / 10)
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
              proba: Number(1 - pAC),
            }),
          ],
        }),
        new Arbre({
          rationnel,
          nom: '\\bar A',
          proba: Number(1 - pA),
          enfants: [
            new Arbre({
              rationnel,
              nom: 'C',
              proba: pBC,
              visible: false,
              alter: 'x',
            }),
            new Arbre({
              rationnel,
              nom: '\\bar C',
              proba: Number(1 - pBC),
              visible: false,
              alter: '',
            }),
          ],
        }),
      ],
    })

    omega.setTailles() // On calcule les tailles des arbres.
    objets = omega.represente(0, 6, 0, rationnel ? 2 : 1.5, true, 1, 8) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
    const pC = omega.getProba('C', false) // on calcule P(C) décimale.
    let texte = `On donne l'arbre de probabilités ci-dessous et $P(C)=${texProba(pC)}$.<br><br> 
          `
    texte += mathalea2d(
      Object.assign({ style: 'inline' }, fixeBordures(objets)),
      objets,
    )
    if (this.versionQcm) {
      texte += '<br> Quelle est la valeur de $x$ ?'
    } else {
      texte += `
          
          $x=$`
    }
    let texteCorr =
      "Comme $A$ et $\\bar A$ forment une partition de l'univers, d'après la loi des probabilités totales :<br>"
    texteCorr += '$P(C)=P(A \\cap C)+P(\\bar{A} \\cap C)$.<br>'
    texteCorr += `Or $P(\\bar{A} \\cap C)=P(\\bar{A}) \\times P_{\\bar{A}}(C)=${texProba(pB, false)}x$.<br>`
    texteCorr += `Donc $${texProba(pB, false)}x=P(C)-P(A \\cap C)=${texProba(pC, false)}-${texProba(pA, false)}\\times ${texProba(pAC, false)}=${texProba(pC, false)}-${texProba(pA * pAC, false)}=${texProba(pC - pA * pAC, false)}$.<br>`
    texteCorr += `Donc $x=\\dfrac{${texProba(pC - pA * pAC, false)}}{${texProba(pB, false)}}=${texProba(pBC)}$`
    this.reponse = pBC
    this.distracteurs = [
      `$Sol : ${texNombre(pBC)}$`,
      `$BB=${texNombre(pBC + 0.1)}$`,
      `$CC=${texNombre(pBC - 0.1)}$`,
      `$DD=${texNombre(10 * pBC)}$`,
    ]
    this.canEnonce = `On donne l'arbre de probabilités ci-dessous et $P(C)=${texProba(pC)}$.<br>
          
          `
    this.question = texte
    this.correction = texteCorr
    this.canEnonce += mathalea2d(
      {
        xmin: -0.1,
        xmax: 14,
        ymin: 0,
        ymax: 6,
        style: 'inline',
        scale: 0.5,
      },
      objets,
    )
    this.canReponseACompleter = `   
          $x=\\ldots$ `
  }
}
