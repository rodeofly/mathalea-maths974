import Figure from 'apigeom'
import type Point from 'apigeom/src/elements/points/Point'
import { droite } from '../../lib/2d/droites'
import { point, tracePoint } from '../../lib/2d/points'
import { repere } from '../../lib/2d/reperes'
import { segment, vecteur } from '../../lib/2d/segmentsVecteurs'
import { labelPoint, latex2d } from '../../lib/2d/textes'
import { orangeMathalea } from '../../lib/colors'
import figureApigeom from '../../lib/figureApigeom'
import { choice } from '../../lib/outils/arrayOutils'
import { abs } from '../../lib/outils/nombres'
import { getLang } from '../../lib/stores/languagesStore'
import { colorToLatexOrHTML, mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import FractionEtendue from '../../modules/FractionEtendue'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre =
  "Tracer une droite à partir d'un point et d'un coefficient directeur ou d'un vecteur directeur"
export const dateDePublication = '09/03/2025'
export const interactifReady = true
export const interactifType = 'custom'

/**
 * @author Gilles Mora (interactif par Eric Elter)
 */
export const uuid = '580a6'

export const refs = {
  'fr-fr': ['2G30-9'],
  'fr-ch': ['10FA5-19', '11FA8-16', '1mF2-14'],
}
export default class RepresenterfDroite extends Exercice {
  figures: Figure[] = []
  pointsA: Point[] = []
  pointsB: Point[] = []
  constructor() {
    super()
    const lang = getLang()
    this.nbQuestions = 1 // On complète le nb de questions
    if (lang === 'fr-CH') {
      this.sup = '1-2'
    } else {
      this.sup = '4'
    }
    this.besoinFormulaireTexte = [
      'Type de questions',
      [
        'Nombres séparés par des tirets  :',
        '1 : Un point et un coefficient directeur entier',
        '2 : Un point et un coefficient directeur fractionnaire',
        '3 : Un point et un vecteur directeur',
        '4 : Mélange',
      ].join('\n'),
    ]
  }

  nouvelleVersion() {
    const listeTypeDeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 1,
      max: 3,
      melange: 4,
      defaut: 4,
      nbQuestions: this.nbQuestions,
    })
    this.figures = []

    const textO = latex2d('\\text{O}', -0.3, -0.3, { letterSize: 'scriptsize' })
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const xA = randint(-3, 3)
      const yA = randint(-2, 2)
      const A = point(xA, yA, 'A')
      const B = point(0, 0, 'B')
      const cadre = {
        xMin: Math.min(-3, xA - 5),
        yMin: Math.min(-4, yA - 5),
        xMax: Math.max(4, xA + 5),
        yMax: Math.max(4, yA + 5),
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
      const a = randint(-4, 4)
      let texte, texteCorr: string
      switch (listeTypeDeQuestions[i]) {
        case 1:
          {
            B.x = xA + 1
            B.y = yA + a
            const droiteAB = droite(A, B)
            droiteAB.color = colorToLatexOrHTML('red')
            droiteAB.epaisseur = 2
            const monRepere = repere(cadre)
            const tA = tracePoint(A, 'blue') // Variable qui trace les points avec une croix
            const tB = tracePoint(B, 'blue') // Variable qui trace les points avec une croix
            const lA = labelPoint(A, 'blue') // Variable qui trace les nom s A et B
            const lB = labelPoint(B, 'blue') // Variable qui trace les nom s A et B
            tA.taille = 5
            tA.epaisseur = 2
            tB.taille = 5
            tB.epaisseur = 2
            texte = `Tracer dans le repère ci-dessous, la droite $d$ qui passe par le point $A(${xA}\\,;\\,${yA})$ de coefficient directeur $${a}$.<br>`
            if (!context.isHtml)
              texte += mathalea2d(cadreFenetreSvg, monRepere, textO)
            texteCorr = `On commence par placer le point $A$ de coordonnées $(${xA}\\,;\\,${yA})$.<br>`
            if (a === 0) {
              texteCorr +=
                'Le coefficient directeur est nul, donc la droite $d$ est horizontale.'
              if (!context.isHtml)
                texteCorr += mathalea2d(
                  cadreFenetreSvg,
                  lA,
                  monRepere,
                  droiteAB,
                  tA,
                  textO,
                )
            } else {
              texteCorr += `
            À partir de ce point, on se décale d'une unité vers la droite, puis on ${a < 0 ? 'descend' : 'monte'} de $${abs(a)}$ ${a === 1 || a === -1 ? 'unité' : 'unités'} pour obtenir un coefficient directeur de $${a}$.<br>
            On obtient alors le point $B$.<br>
            On trace alors la droite $(AB)$.<br>`
              if (!context.isHtml)
                texteCorr += mathalea2d(
                  cadreFenetreSvg,
                  lA,
                  lB,
                  monRepere,
                  droiteAB,
                  tA,
                  tB,
                  textO,
                )
            }
          }
          break
        case 2:
          {
            const listeCoeffdir = [
              [1, 3],
              [-1, 3],
              [-2, 3],
              [2, 3],
              [4, 3],
              [-4, 3],
              [1, 2],
              [-1, 2],
              [3, 2],
              [-3, 2],
            ]
            const coeffDir = choice(listeCoeffdir)
            const coeffDirF = new FractionEtendue(
              coeffDir[0],
              coeffDir[1],
            ).simplifie()
            B.x = xA + coeffDir[1]
            B.y = yA + coeffDir[0]
            const droiteAB = droite(A, B)
            droiteAB.color = colorToLatexOrHTML('red')
            droiteAB.epaisseur = 2
            const monRepere = repere(cadre)
            const tA = tracePoint(A, 'blue') // Variable qui trace les points avec une croix
            const tB = tracePoint(B, 'blue') // Variable qui trace les points avec une croix
            const lA = labelPoint(A, 'blue') // Variable qui trace les nom s A et B
            const lB = labelPoint(B, 'blue') // Variable qui trace les nom s A et B
            tA.taille = 5
            tA.epaisseur = 2
            tB.taille = 5
            tB.epaisseur = 2
            texte = `Tracer dans le repère ci-dessous, la droite $d$ qui passe par le point $A(${xA}\\,;\\,${yA})$ de coefficient directeur $${coeffDirF.texFSD}$.<br>`
            if (!context.isHtml)
              texte += mathalea2d(cadreFenetreSvg, monRepere, textO)
            texteCorr = `On commence par placer le point $A$ de coordonnées $(${xA}\\,;\\,${yA})$.<br>
            À partir de ce point, on se décale de $${coeffDir[1]}$ unités vers la droite, puis on ${coeffDir[0] < 0 ? 'descend' : 'monte'} de $${abs(coeffDir[0])}$ ${coeffDir[0] === 1 || coeffDir[0] === -1 ? 'unité' : 'unités'} pour obtenir un coefficient directeur de $${coeffDirF.texFSD}$.<br>
            On obtient alors le point $B$.<br>
            On trace alors la droite $(AB)$.<br>`
            if (!context.isHtml)
              texteCorr += mathalea2d(
                cadreFenetreSvg,
                lA,
                lB,
                monRepere,
                droiteAB,
                tA,
                tB,
                textO,
              )
          }
          break
        case 3:
        default:
          {
            // cas du coefficient directeur fractionnaire
            const xu = randint(-4, 4)
            const yu = randint(-3, 3, xu)

            B.x = xA + xu
            B.y = yA + yu
            const droiteAB = droite(A, B)
            droiteAB.color = colorToLatexOrHTML('red')
            droiteAB.epaisseur = 2
            const monRepere = repere(cadre)
            const AB = segment(A, B, 'blue', '->')
            const vAB = vecteur(A, B)
            AB.epaisseur = 3
            const nomvAB = vAB.representantNomme(A, 'u', 1, 'blue')
            const tA = tracePoint(A, 'blue') // Variable qui trace les points avec une croix
            const tB = tracePoint(B, 'blue') // Variable qui trace les points avec une croix
            const lA = labelPoint(A, 'blue') // Variable qui trace les nom s A et B
            const lB = labelPoint(B, 'blue') // Variable qui trace les nom s A et B
            tA.taille = 5
            tA.epaisseur = 2
            tB.taille = 5
            tB.epaisseur = 2
            texte = `Tracer dans le repère ci-dessous, la droite $d$ qui passe par le point $A(${xA}\\,;\\,${yA})$ de vecteur directeur $\\vec{u}(${xu}\\,;\\,${yu})$.<br>`
            if (!context.isHtml)
              texte += mathalea2d(cadreFenetreSvg, monRepere, textO)
            texteCorr = `On commence par placer le point $A$ de coordonnées $(${xA}\\,;\\,${yA})$.<br>`
            if (xu === 0) {
              texteCorr +=
                'Comme la première coordonnée du vecteur $\\vec{u}$ est nulle, la droite $d$ est verticale.<br>'
              if (!context.isHtml)
                texteCorr += mathalea2d(
                  cadreFenetreSvg,
                  lA,
                  monRepere,
                  droiteAB,
                  textO,
                  tA,
                  AB,
                  nomvAB,
                )
            } else if (yu === 0) {
              texteCorr +=
                'Comme la deuxième coordonnée du vecteur $\\vec{u}$ est nulle, la droite $d$ est horizontale.<br>'
              if (!context.isHtml)
                texteCorr += mathalea2d(
                  cadreFenetreSvg,
                  lA,
                  monRepere,
                  droiteAB,
                  textO,
                  tA,
                  AB,
                  nomvAB,
                )
            } else {
              texteCorr += ` À partir de ce point, on se décale ${xu === 1 || xu === -1 ? "d'une unité vers la" : `de $${abs(xu)}$ unités`} vers la  ${xu < 0 ? 'gauche' : 'droite'}, puis on ${yu < 0 ? 'descend' : 'monte'} de $${abs(yu)}$ ${yu === 1 || yu === -1 || yu === 0 ? 'unité' : 'unités'}.<br>
            On obtient alors le point $B$ qui permet de tracer le vecteur $\\overrightarrow{AB}$.<br>
            On peut alors tracer alors la droite $(AB)$.<br>`
              if (!context.isHtml)
                texteCorr += mathalea2d(
                  cadreFenetreSvg,
                  lA,
                  lB,
                  monRepere,
                  droiteAB,
                  textO,
                  AB,
                  tA,
                )
            }
          }
          break
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
      const B1 = figureCorr.create('Point', { x: B.x, y: B.y, label: B.nom })
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

      const emplacementPourFigure = figureApigeom({ exercice: this, i, figure })
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
