import { courbe } from '../../lib/2d/courbes'
import {  droiteParPointEtPente } from '../../lib/2d/droites'
import { point } from '../../lib/2d/points'
import { repere } from '../../lib/2d/reperes'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { latex2d } from '../../lib/2d/textes'
import { deuxColonnes } from '../../lib/format/miseEnPage'
import { choice } from '../../lib/outils/arrayOutils'
import { texteEnCouleurEtGras } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'

import { mathalea2d } from '../../modules/2dGeneralites'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '02/10/2025'
export const dateDeModifImportante = '12/10/2025'
export const uuid = 'cc015'
// 
/**
 *
 * @author Gilles Mora + Claude ia pour la factorisation
 *
 */
export const refs = {
  'fr-fr': ['1A-C10-6'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Résoudre une inéquation du type $\\sqrt{x}<a$ ou $\\sqrt{x}>a$ (avec ou sans courbe)'

export default class Auto1AC10f extends ExerciceQcmA {
   private appliquerLesValeurs(
    val: number,
    estInegStrict: boolean,
    typeInequation: 'inf' | 'sup'
  ): void {
    // Détermination du signe d'inégalité
    const signeInégalité =
      typeInequation === 'inf'
        ? estInegStrict ? '<' : ' \\leqslant '
        : estInegStrict ? '>' : ' \\geqslant '

    // Création des éléments graphiques
    const elements = this.creerElementsGraphiques(val, estInegStrict, typeInequation)
    const { graphique, graphiqueC } = this.creerGraphiques(val, elements)
    const reponses = this.formaterReponses(val, estInegStrict, typeInequation)

    // Énoncé
    this.enonce = this.sup5
      ? `On note $(I)$ l'inéquation, sur $[0\\,;\\,+\\infty[$, $\\sqrt{x}${signeInégalité} ${val}$.<br><br>
         L'ensemble des solutions $S$ de cette inéquation est :`
      : `${deuxColonnes(
          `On a représenté la courbe d'équation $y=\\sqrt{x}$. <br><br>
           On note $(I)$ l'inéquation, sur $[0\\,;\\,+\\infty[$, $\\sqrt{x}${signeInégalité} ${val}$.<br><br>`,
          `${graphique}`
        )}<br> L'ensemble des solutions $S$ de cette inéquation est :`

    // Correction
    this.correction = this.genererCorrection(
      val,
      estInegStrict,
      typeInequation,
      graphiqueC,
      reponses[0]
    )

    // Réponses
    this.reponses = reponses
  }

  // Méthode utilitaire pour créer les éléments graphiques communs
  private creerElementsGraphiques(
    val: number,
    estInegStrict: boolean,
    typeInequation: 'inf' | 'sup'
  ) {
    const o = latex2d('\\text{O}', -0.2, -0.3, { letterSize: 'scriptsize' })

    // Position graphique fixe pour l'affichage
    const valGraphique = 1.5
    const carreValGraphique = valGraphique ** 2

    // Points et segments verticaux
    const A = point(carreValGraphique, valGraphique)
    const Ax = point(A.x, 0)
    const sAAx = segment(A, Ax)
    sAAx.epaisseur = 2
    sAAx.pointilles = 5

    const O = point(0, 0)

    // Segments de solution selon le type d'inéquation
    let segmentsSolution = []
    if (typeInequation === 'inf') {
      const sOAx = segment(O, Ax, 'red')
      sOAx.epaisseur = 2
      sOAx.styleExtremites = estInegStrict ? '[-[' : '[-]'
      sOAx.tailleExtremites = 6
      segmentsSolution = [sOAx]
    } else {
      const AInf = point(5, 0)
      const sAxAInf = segment(Ax, AInf, 'red')
      sAxAInf.epaisseur = 2
      sAxAInf.styleExtremites = estInegStrict ? ']-' : '[-'
      sAxAInf.tailleExtremites = 6
      segmentsSolution = [sAxAInf]
    }

    // Textes
    const textes = [
      latex2d(`y=${val}`, 4, valGraphique - 0.3, {
        letterSize: 'scriptsize',
        color: 'green'
      }),
      latex2d('y=\\sqrt{x}', 3, 2.3, {
        letterSize: 'scriptsize',
        color: 'blue',
      }),
      latex2d(`${val ** 2}`, carreValGraphique, -0.6, {
        letterSize: 'scriptsize',
      }),
    ]

    return {
      o,
      A,
      Ax,
      O,
      sAAx,
      segmentsSolution,
      textes,
      carreValGraphique,
    }
  }

  // Méthode utilitaire pour créer le repère et les graphiques
  private creerGraphiques(val: number, elements: any) {
    const { o, sAAx, segmentsSolution, textes } = elements

    const r1 = repere({
      xMin: -1,
      yMin: -1,
      yMax: 4,
      xMax: 5,
      xUnite: 1,
      yUnite: 1,
      axeXStyle: '->',
      axeYStyle: '->',
      grilleX: false,
      grilleY: false,
      xThickListe: [0],
      yThickListe: [0],
      xLabelListe: [-6],
      yLabelListe: [-6],
    })

    const f = (x: number) => Math.sqrt(Number(x))
    const Cg = droiteParPointEtPente(point(0, 1.5), 0, '', 'green')
    Cg.epaisseur = 2

    // Graphique simple pour l'énoncé
    const graphique = mathalea2d(
      {
        xmin: -2,
        xmax: 6,
        ymin: -1,
        ymax: 4,
        pixelsParCm: 30,
        scale: 0.7,
      },
      r1,
      o,
      courbe(f, { repere: r1, color: 'blue', epaisseur: 2 })
    )

    // Graphique complet pour la correction
    const graphiqueC = mathalea2d(
      {
        xmin: -1,
        xmax: 5,
        ymin: -1,
        ymax: 4,
        pixelsParCm: 30,
        scale: 1,
      },
      courbe(f, { repere: r1, color: 'blue', epaisseur: 2 }),
      Cg,
      r1,
      o,
      sAAx,
      ...segmentsSolution,
      ...textes
    )

    return { graphique, graphiqueC }
  }

  // Méthode utilitaire pour formater les réponses sous forme d'intervalles
  private formaterReponses(
    val: number,
    estInegStrict: boolean,
    typeInequation: 'inf' | 'sup'
  ) {
    const borne = val ** 2
    const borneIncorrecte1 = val
    const borneIncorrecte2 = Math.floor(borne / 2)

    if (typeInequation === 'inf') {
      const crochets = estInegStrict
        ? `[0\\,;\\,${borne}[`
        : `[0\\,;\\,${borne}]`
      const incorrecte1 = estInegStrict
        ? `[0\\,;\\,${borneIncorrecte1}[`
        : `[0\\,;\\,${borneIncorrecte1}]`
      const incorrecte2 = estInegStrict
        ? `[0\\,;\\,${texNombre(val / 2)}[`
        : `[0\\,;\\,${texNombre(val / 2)}]`
      const incorrecte3 = estInegStrict
        ? `[0\\,;\\,\\sqrt{${val}}[`
        : `[0\\,;\\,\\sqrt{${val}}]`

      return [
        `$S = ${crochets}$`,
        `$S = ${incorrecte1}$`,
        `$S = ${incorrecte2}$`,
        `$S = ${incorrecte3}$`,
      ]
    } else {
      const intervalleCorrect = estInegStrict
        ? `]${borne}\\,;\\,+\\infty[`
        : `[${borne}\\,;\\,+\\infty[`
      const incorrecte1 = estInegStrict
        ? `]${texNombre(val / 2)}\\,;\\,+\\infty[`
        : `[${texNombre(val / 2)}\\,;\\,+\\infty[`
      const incorrecte2 = estInegStrict
        ? `]${val}\\,;\\,+\\infty[`
        : `[${val}\\,;\\,+\\infty[`
      const incorrecte3 = estInegStrict
        ? `]\\sqrt{${val}}\\,;\\,+\\infty[`
        : `[\\sqrt{${val}}\\,;\\,+\\infty[`

      return [
        `$S = ${intervalleCorrect}$`,
        `$S = ${incorrecte1}$`,
        `$S = ${incorrecte2}$`,
        `$S = ${incorrecte3}$`,
      ]
    }
  }

  // Méthode utilitaire pour générer la correction
  private genererCorrection(
    val: number,
    estInegStrict: boolean,
    typeInequation: 'inf' | 'sup',
    graphiqueC: any,
    reponseCorrecte: string
  ) {
    const borne = val ** 2
    const positionText =
      typeInequation === 'inf'
        ? estInegStrict ? 'strictement en dessous de' : 'sur ou sous'
        : estInegStrict ? 'strictement au dessus de' : 'sur ou au dessus de'

    return `Pour résoudre graphiquement cette inéquation : <br>
            $\\bullet$ On trace la courbe d'équation $y=\\sqrt{x}$. <br>
            $\\bullet$ On trace la droite horizontale d'équation $y=${val}$. Cette droite coupe la courbe en $${val}^2=${borne}$. <br>
            $\\bullet$ Les solutions de l'inéquation sont les abscisses des points de la courbe qui se situent ${positionText} la droite.<br>
            ${graphiqueC}<br>
            Comme la fonction racine carrée est définie sur $[0\\,;\\,+\\infty[$, l'ensemble des solutions de l'inéquation $(I)$ est : ${texteEnCouleurEtGras(reponseCorrecte)}.`
  }

  versionOriginale: () => void = () => {
    // Version originale : √x ≤ 3
    this.appliquerLesValeurs(
      3,      // val
      false,  // estInegStrict
      'inf'   // typeInequation
    )
  }

  versionAleatoire: () => void = () => {
    const typeInequation = choice(['inf', 'sup'] as const)
    const estInegStrict = choice([true, false])
    const val = randint(1, 12)

    this.appliquerLesValeurs(val, estInegStrict, typeInequation)
  }

  constructor() {
    super()
    this.versionAleatoire()
    this.besoinFormulaire5CaseACocher = ['Sans la courbe']
  }
}