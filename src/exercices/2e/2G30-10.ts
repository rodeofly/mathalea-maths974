import Figure from 'apigeom'
import type Point from 'apigeom/src/elements/points/Point'
import { droite } from '../../lib/2d/droites'
import { point, tracePoint } from '../../lib/2d/points'
import { repere } from '../../lib/2d/reperes'
import { vecteur } from '../../lib/2d/segmentsVecteurs'
import { labelPoint, latex2d } from '../../lib/2d/textes'
import { orangeMathalea } from '../../lib/colors'
import figureApigeom from '../../lib/figureApigeom'
import {
  ecritureAlgebrique,
  ecritureAlgebriqueSauf1,
  ecritureParentheseSiMoins,
  ecritureParentheseSiNegatif,
  rienSi1,
} from '../../lib/outils/ecritures'
import { colorToLatexOrHTML, mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import FractionEtendue from '../../modules/FractionEtendue'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = "Tracer une droite à partir d'une équation cartésienne"
export const dateDePublication = '09/03/2025'
export const interactifReady = true
export const interactifType = 'custom'

/**
 * @author Jean-Léon HENRY (adapté de 2G30-9)
 */
export const uuid = 'd45ce'

export const refs = {
  'fr-fr': ['2G30-10'],
  'fr-ch': [''],
}
export default class RepresenterDroiteDepuisEq extends Exercice {
  figures: Figure[] = []
  pointsA: Point[] = []
  pointsB: Point[] = []
  constructor() {
    super()
    this.nbQuestions = 1 // On complète le nb de questions
  }

  nouvelleVersion() {
    this.figures = []

    const textO = latex2d('\\text{O}', -0.3, -0.3, {
      letterSize: 'scriptsize',
    })
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const xA = randint(-3, 3)
      const yA = randint(-2, 2)
      const A = point(xA, yA, 'A')
      const pente = randint(-4, 4)
      // WARN: B.x != A.x, donc aucune droite ne sera verticale
      const B = point(xA + 1, yA + pente, 'B')
      const droiteAB = droite(A, B)
      const coeffMult = randint(-2, 2, [0])
      const ordonnéeOrigine = yA - pente * xA
      const vecteurDirecteur = vecteur(coeffMult, coeffMult * pente)
      const C = point(xA + vecteurDirecteur.x, yA + vecteurDirecteur.y, 'B')

      // Coefficient de l'équation cartésienne
      const coeffs = [
        -pente * coeffMult,
        coeffMult,
        ordonnéeOrigine * coeffMult,
      ]

      function makeEquation(x: string | number, y: string) {
        // Version LaTeX propre de l'équation
        let equation = ''
        if (coeffs[0] === 0) {
          equation = `${rienSi1(coeffs[1])}y`
        } else {
          if (typeof x === 'number') {
            equation = `${coeffs[0]}\\times ${ecritureParentheseSiMoins(x)}${ecritureAlgebriqueSauf1(
              coeffs[1],
            )}${y}`
          } else {
            equation = `${rienSi1(coeffs[0])}${x}${ecritureAlgebriqueSauf1(
              coeffs[1],
            )}${y}`
          }
        }
        equation += `=${coeffs[2]}`
        return equation
      }

      // Mise en place graphique
      const cadre = {
        xMin: Math.min(-3, Math.min(A.x, C.x) - 3),
        yMin: Math.min(-4, Math.min(A.y, C.y) - 3),
        xMax: Math.max(4, Math.max(A.x, C.x) + 3),
        yMax: Math.max(4, Math.max(A.y, C.y + 3)),
      }
      // C'est bizarre mais c'est parce que dans mathAlea, les attributs n'ont pas de majuscules.
      // Donc même quand c'est le même cadre, on doit le faire.
      const cadreFenetreSvg = {
        xmin: cadre.xMin,
        ymin: cadre.yMin,
        xmax: cadre.xMax,
        ymax: cadre.yMax,
        pixelsParCm: 25,
        scale: 0.6,
      }
      droiteAB.color = colorToLatexOrHTML('red')
      droiteAB.epaisseur = 2
      const monRepere = repere(cadre)
      const marquePointA = tracePoint(A, 'blue')
      const marquePointB = tracePoint(B, 'blue')
      const marquePointC = tracePoint(C, 'blue')
      const etiquetteA = labelPoint(A, 'blue')
      const etiquetteC = labelPoint(C, 'blue')
      marquePointA.taille = 5
      marquePointA.epaisseur = 2
      marquePointB.taille = 5
      marquePointB.epaisseur = 2
      marquePointC.taille = 5
      marquePointC.epaisseur = 2

      // Debut de l'énoncé/correction
      let texte, texteCorr: string
      texte = `Tracer dans le repère ci-dessous la droite $(d)$ dont une équation cartésienne est $${makeEquation('x', 'y')}$.<br>`
      if (!context.isHtml) {
        texte += mathalea2d(cadreFenetreSvg, monRepere, textO)
      }
      const ordonnéeA = new FractionEtendue(
        coeffs[2] - coeffs[0] * xA,
        coeffs[1],
      )
      texteCorr = `Dans l'équation cartésienne, on remplace $x$ par une valeur au choix, disons $${xA}$, et on en déduit la valeur de l'ordonnée : $${makeEquation(xA, 'y')}$, ce qui donne $y=\\dfrac{${
        coeffs[2]
      }-${ecritureParentheseSiNegatif(coeffs[0])}\\times${ecritureParentheseSiNegatif(
        xA,
      )}}{${
        coeffs[1]
      }}=${ordonnéeA.texFraction}${ordonnéeA.texSimplificationAvecEtapes()}$.<br>`
      texteCorr += `On peut donc placer le point $A$ de coordonnées $(${xA}\\,;\\,${yA})$.<br>`
      texteCorr += `Dans l'équation cartésienne, le coefficient de $x$ est $${coeffs[0]}$, et celui de $y$ est $${coeffs[1]}$. Notons le premier $a$, et le deuxième $b$.<br>`
      texteCorr +=
        "On sait qu'une droite d'équation $ax+by=c$ admet pour vecteur directeur celui de coordonnées $\\begin{pmatrix}b\\\\-a\\end{pmatrix}$.<br>"
      texteCorr += `Un vecteur directeur de la droite $d$ (notons le $\\vec{u}$) est donc de coordonnées $\\begin{pmatrix}${vecteurDirecteur.x}\\\\${vecteurDirecteur.y}\\end{pmatrix}$.`
      if (pente === 0) {
        texteCorr += ' Donc la droite $(d)$ est horizontale.'
        if (!context.isHtml) {
          texteCorr += mathalea2d(
            cadreFenetreSvg,
            etiquetteA,
            monRepere,
            droiteAB,
            marquePointA,
            textO,
          )
        }
      } else {
        texteCorr += `
             <br>On définit un deuxième point $B$ par $\\overrightarrow{AB}=\\vec{u}$.
            Les coordonnées $(x_B;y_B)$ de $B$ sont donc obtenues par
            <br>
            $
            \\begin{aligned}
            x_B-x_A=${vecteurDirecteur.x}&\\iff x_B = ${vecteurDirecteur.x}${ecritureAlgebrique(
              A.x,
            )}=${C.x}\\\\
            y_B-y_A=${vecteurDirecteur.y}&\\iff y_B = ${vecteurDirecteur.y}${ecritureAlgebrique(
              A.y,
            )}=${C.y}
            \\end{aligned}
            $
            <br>
            Les coordonnées de $B$ sont donc $(${C.x};${C.y})$.
<br><br>
            On connaît deux points de $(d)$, à savoir $A$ et $B$, ce qui suffit pour la tracer.<br>`
        if (!context.isHtml) {
          texteCorr += mathalea2d(
            cadreFenetreSvg,
            etiquetteA,
            etiquetteC,
            monRepere,
            droiteAB,
            marquePointA,
            marquePointC,
            textO,
          )
        }
      }

      const figure = new Figure({
        xMin: cadre.xMin + 0.1,
        yMin: cadre.yMin + 0.1,
        width: 290,
        height: 290,
      })
      const figureCorr = new Figure({
        xMin: cadre.xMin + 0.1,
        yMin: cadre.yMin + 0.1,
        width: 290,
        height: 290,
      })
      figure.options.labelAutomaticBeginsWith = 'A'
      figure.create('Grid')
      figure.options.color = 'blue'
      figure.options.gridWithTwoPointsOnSamePosition = false
      figure.options.thickness = 2
      figure.snapGrid = true
      figureCorr.loadJson(JSON.parse(figure.json))

      this.figures[i] = figure

      const A1 = figureCorr.create('Point', { x: A.x, y: A.y, label: A.nom })
      const B1 = figureCorr.create('Point', { x: C.x, y: C.y, label: C.nom })
      this.pointsA[i] = A1
      this.pointsB[i] = B1
      figureCorr.create('Line', {
        point1: A1,
        point2: B1,
        color: orangeMathalea,
      })

      figure.setToolbar({
        tools: ['POINT', 'LINE', 'NAME_POINT', 'MOVE_LABEL', 'DRAG', 'REMOVE'],
        position: 'top',
      })

      const emplacementPourFigure = figureApigeom({
        exercice: this,
        i,
        figure,
      })
      const emplacementPourFigureCorr = figureApigeom({
        exercice: this,
        i,
        figure: figureCorr,
        idAddendum: 'correction',
        isDynamic: false,
      })
      texte += emplacementPourFigure
      texteCorr += emplacementPourFigureCorr

      if (this.questionJamaisPosee(i, xA, yA)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }

  correctionInteractive = (i: number) => {
    if (this.pointsA[i] == null || this.pointsB[i] == null) return 'KO'
    const figure = this.figures[i]
    figure.isDynamic = false
    figure.divButtons.style.display = 'none'
    figure.divUserMessage.style.display = 'none'

    // Sauvegarde de la réponse pour Capytale
    if (this.answers == null) this.answers = {}
    this.answers[figure.id] = figure.json

    const divFeedback = document.querySelector(
      `#feedbackEx${this.numeroExercice}Q${i}`,
    ) // Ne pas changer le nom du FeedBack, il est écrit en dur, ailleurs.
    const lines = [...figure.elements.values()].filter((e) =>
      e.type.includes('Line'),
    )

    const isValid = figure.checkLine({
      point1: this.pointsA[i],
      point2: this.pointsB[i],
    }).isValid
    let result: 'OK' | 'KO' = 'KO'

    if (divFeedback != null) {
      if (isValid && lines.length === 1) {
        divFeedback.innerHTML = '😎'
        result = 'OK'
      } else {
        const p = document.createElement('p')
        p.innerText = '☹️'
        if (lines.length === 0) {
          p.innerHTML += " Aucune droite n'a été tracée."
        } else if (lines.length > 1) {
          p.innerHTML += " Il ne faut tracer qu'une seule droite."
        }
        divFeedback.insertBefore(p, divFeedback.firstChild)
      }
    }
    return result
  }
}
