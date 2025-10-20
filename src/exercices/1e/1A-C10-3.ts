import { courbe } from '../../lib/2d/courbes'
import { droite } from '../../lib/2d/droites'
import { point } from '../../lib/2d/points'
import { repere } from '../../lib/2d/reperes'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { latex2d } from '../../lib/2d/textes'
import { deuxColonnes } from '../../lib/format/miseEnPage'
import { choice } from '../../lib/outils/arrayOutils'
import { texteEnCouleurEtGras } from '../../lib/outils/embellissements'

import { mathalea2d } from '../../modules/2dGeneralites'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '07/08/2025'
export const dateDeModifImportante = '12/10/2025'
export const uuid = '5d29b'
// 
/**
 *
 * @author Gilles Mora + Claude ia pour la factorisation
 *
 */
export const refs = {
  'fr-fr': ['1A-C10-3'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre =
  "Résoudre une inéquation du type $x^2<a$ ou $x^2>a$ avec ou sans courbe (solutions sous forme d'inégalités)"
export default class InequationsSecondDegre extends ExerciceQcmA {
  private appliquerLesValeurs(
    val: number,
    estInegStrict: boolean,
    typeInequation: 'inf' | 'sup',
  ): void {
    // Détermination du signe d'inégalité
    const signeInegalité =
      typeInequation === 'inf'
        ? estInegStrict
          ? '<'
          : ' \\leqslant '
        : estInegStrict
          ? '>'
          : ' \\geqslant '

    // Création des éléments graphiques
    const elements = this.creerElementsGraphiques(
      val,
      estInegStrict,
      typeInequation,
    )
    const { graphique, graphiqueC } = this.creerGraphiques(val, elements)
    const reponses = this.formaterReponses(val, estInegStrict, typeInequation)

    // Énoncé
    this.enonce = this.sup5
      ? `
         On note $(I)$ l'inéquation, sur $\\mathbb{R}$, $x^2${signeInegalité} ${val}$.<br><br>
         L'inéquation $(I)$ est équivalente à :`
      : `${deuxColonnes(
          `On a représenté la parabole d'équation $y=x^2$. <br><br>
           On note $(I)$ l'inéquation, sur $\\mathbb{R}$, $x^2${signeInegalité} ${val}$.<br><br>
           L'inéquation $(I)$ est équivalente à :`,
          `${graphique}`,
        )}<br>`

    // Correction
    this.correction = this.genererCorrection(
      val,
      estInegStrict,
      typeInequation,
      graphiqueC,
      reponses[0],
    )

    // Réponses
    this.reponses = reponses
  }

  // Méthode utilitaire pour créer les éléments graphiques communs
  private creerElementsGraphiques(
    val: number,
    estInegStrict: boolean,
    typeInequation: 'inf' | 'sup',
  ) {
    const o = latex2d('\\text{O}', -0.2, -0.3, { letterSize: 'scriptsize' })

    // Position graphique fixe pour l'affichage
    const valGraphique = 2
    const racineValGraphique = Math.sqrt(valGraphique)

    // Points et segments verticaux
    const A = point(racineValGraphique, valGraphique)
    const Ax = point(A.x, 0)
    const sAAx = segment(A, Ax)
    sAAx.epaisseur = 2
    sAAx.pointilles = 5

    const B = point(-racineValGraphique, valGraphique)
    const Bx = point(B.x, 0)
    const sBBx = segment(B, Bx)
    sBBx.epaisseur = 2
    sBBx.pointilles = 5

    // Segments de solution selon le type d'inéquation
    let segmentsSolution = []
    if (typeInequation === 'inf') {
      const sAxBx = segment(Bx, Ax, 'red')
      sAxBx.epaisseur = 2
      sAxBx.styleExtremites = estInegStrict ? ']-[' : '[-]'
      sAxBx.tailleExtremites = 6
      segmentsSolution = [sAxBx]
    } else {
      const BxI = point(-4, 0)
      const sBxBxI = segment(BxI, Bx, 'red')
      sBxBxI.epaisseur = 2
      sBxBxI.styleExtremites = estInegStrict ? '-[' : '-]'
      sBxBxI.tailleExtremites = 6

      const AxI = point(4, 0)
      const sAxAxI = segment(Ax, AxI, 'red')
      sAxAxI.epaisseur = 2
      sAxAxI.styleExtremites = estInegStrict ? ']-' : '[-'
      sAxAxI.tailleExtremites = 6

      segmentsSolution = [sBxBxI, sAxAxI]
    }

    // Textes
    const textes = [
      latex2d(`y=${val}`, 4, 2.7, { letterSize: 'scriptsize' }),
      latex2d('y=x^2', 3, 4.5, { letterSize: 'scriptsize' }),
      latex2d(`-\\sqrt{${val}}`, -racineValGraphique, -0.6, {
        letterSize: 'scriptsize',
      }),
      latex2d(`\\sqrt{${val}}`, racineValGraphique, -0.6, {
        letterSize: 'scriptsize',
      }),
      latex2d(`${val}`, -0.5, valGraphique + 0.1, { letterSize: 'scriptsize' }),
    ]

    return {
      o,
      A,
      Ax,
      B,
      Bx,
      sAAx,
      sBBx,
      segmentsSolution,
      textes,
      valGraphique,
    }
  }

  // Méthode utilitaire pour créer le repère et les graphiques
  private creerGraphiques(val: number, elements: any) {
    const { o, sAAx, sBBx, segmentsSolution, textes, valGraphique } = elements

    const r1 = repere({
      xMin: -4,
      yMin: -0.5,
      yMax: 5,
      xMax: 4,
      xUnite: 1,
      yUnite: 1,
      axeXStyle: '->',
      axeYStyle: '->',
      grilleX: false,
      grilleY: false,
      xThickListe: [0],
      yThickListe: [valGraphique],
      xLabelListe: [-6],
      yLabelListe: [-6],
    })

    const f = (x: number) => Number(x) ** 2
    const Cg = droite(
      point(-3, valGraphique),
      point(3, valGraphique),
      '',
      'green',
    )
    Cg.epaisseur = 2

    // Graphique simple pour l'énoncé
    const graphique = mathalea2d(
      {
        xmin: -5,
        xmax: 5,
        ymin: -0.5,
        ymax: 5,
        pixelsParCm: 20,
        scale: 0.7,
      },
      r1,
      o,
      textes[4],
      courbe(f, { repere: r1, color: 'blue', epaisseur: 2 }),
    )

    // Graphique complet pour la correction
    const graphiqueC = mathalea2d(
      {
        xmin: -6,
        xmax: 6,
        ymin: -0.5,
        ymax: 5,
        pixelsParCm: 30,
        scale: 1,
      },
      courbe(f, { repere: r1, color: 'blue', epaisseur: 2 }),
      Cg,
      r1,
      o,
      sAAx,
      sBBx,
      ...segmentsSolution,
      ...textes,
    )

    return { graphique, graphiqueC }
  }

  // Méthode utilitaire pour formater les réponses
  private formaterReponses(
    val: number,
    estInegStrict: boolean,
    typeInequation: 'inf' | 'sup',
  ) {
    const borne = `\\sqrt{${val}}`

    if (typeInequation === 'inf') {
      const signeInegalité = estInegStrict ? '<' : ' \\leqslant '
      const signeInegalitéFaux = estInegStrict ? ' \\leqslant ' : '<'

      const intervalleLaTex = (borneG: string, borneD: string, signe: string) =>
        ` ${borneG} ${signe} x ${signe} ${borneD}`

      return [
        `$${intervalleLaTex('-' + borne, borne, signeInegalité)}$`,
        `$${intervalleLaTex('-' + borne, borne, signeInegalitéFaux)}$`,
        `$x=-\\sqrt{${val}}$ ou $x=\\sqrt{${val}}$`,
        `$x ${estInegStrict ? '<' : ' \\leqslant '}-\\sqrt{${val}}$ ou $x ${estInegStrict ? '>' : ' \\geqslant '}\\sqrt{${val}}$`,
      ]
    } else {
      const signeInegalité = estInegStrict ? '>' : ' \\geqslant '
      const signeInegalitéFaux = estInegStrict ? ' < ' : ' \\leqslant '

      const intervalleLaTex = (borneG: string, borneD: string, signe: string) =>
        `$x ${signeInegalitéFaux} ${borneG}$ ou $x ${signe} ${borneD}$`

      return [
        `${intervalleLaTex('-' + borne, borne, signeInegalité)}`,
        `${intervalleLaTex('-' + borne, borne, signeInegalitéFaux)}`,
        `$x=-\\sqrt{${val}}$ ou $x=\\sqrt{${val}}$`,
        `$-\\sqrt{${val}} ${signeInegalitéFaux} x ${signeInegalitéFaux}\\sqrt{${val}}$`,
      ]
    }
  }

  // Méthode utilitaire pour générer la correction
  private genererCorrection(
    val: number,
    estInegStrict: boolean,
    typeInequation: 'inf' | 'sup',
    graphiqueC: any,
    reponseCorrecte: string,
  ) {
    const positionText =
      typeInequation === 'inf'
        ? estInegStrict
          ? 'strictement en-dessous de'
          : ' sur ou sous '
        : estInegStrict
          ? 'strictement au-dessus de'
          : ' sur ou au-dessus de '

    return `Pour résoudre graphiquement cette inéquation : <br>
            $\\bullet$ On trace la parabole d'équation $y=x^2$. <br>
            $\\bullet$ On trace la droite horizontale d'équation $y=${val}$. Cette droite coupe la parabole en $-\\sqrt{${val}}$ et $\\sqrt{${val}}$. <br>
            $\\bullet$ Les solutions de l'inéquation sont les abscisses des points de la courbe qui se situent ${positionText} la droite.<br>
            ${graphiqueC}<br>
            On en déduit que l'inéquation $(I)$ est équivalente à : ${texteEnCouleurEtGras(reponseCorrecte)}.`
  }

  versionOriginale: () => void = () => {
    // Version originale : x² ≥ 10
    this.appliquerLesValeurs(
      10, // val
      false, // estInegStrict
      'sup', // typeInequation
    )
  }

  versionAleatoire: () => void = () => {
    const typeInequation = choice(['inf', 'sup'] as const)
    const estInegStrict = choice([true, false])
    const val = randint(2, 19, [4, 9, 16])

    this.appliquerLesValeurs(val, estInegStrict, typeInequation)
  }

  constructor() {
    super()
    this.versionAleatoire()
    //this.options = { vertical: true, ordered: false }
    this.besoinFormulaire5CaseACocher = ['Sans la courbe']
  }
}
