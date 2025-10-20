import { courbeInterpolee } from '../../lib/2d/courbes'
import { point, tracePoint } from '../../lib/2d/points'
import { repere } from '../../lib/2d/reperes'
import Exercice from '../Exercice'
import { colorToLatexOrHTML, mathalea2d } from '../../modules/2dGeneralites'
export const titre = 'Interpolation cosinusoïdale'

export const refs = {
  'fr-fr': ['P013'],
  'fr-ch': [],
}
export const uuid = '5b767'

/**
 * Trace une courbe interpolee par portions cosinusoïdales.
 * @author Jean-Claude Lhote

*/
export default class TraceCourbeInterpolee1 extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Liste des points sous la forme: (x0;y0),(x1;y1);..',
      '',
    ]
    this.besoinFormulaire2CaseACocher = ['Afficher les points ', true]
    this.besoinFormulaire3Numerique = [
      'Modèles de couleur ',
      3,
      '1 : Points rouges sur courbe noire\n2 : Points bleus sur courbe rouge\n3 : Points verts sur courbe bleue',
    ]

    this.nbQuestions = 1
    this.nbQuestionsModifiable = false

    this.sup = '(-5;0)/(0;5)/(5;0)' // liste de points
    this.sup2 = true
    this.sup3 = 1
  }

  nouvelleVersion() {
    const liste = this.sup.split('/')
    const points = []
    const objets = []
    const couleurs = [
      { colPoint: 'red', colCourbe: 'black' },
      { colPoint: 'blue', colCourbe: 'red' },
      { colPoint: 'green', colCourbe: 'blue' },
    ]
    for (let i = 0, coords; i < liste.length; i++) {
      coords = liste[i].split(';')
      points.push([
        parseFloat(coords[0].substring(1)),
        parseFloat(coords[1].substring(0, coords[1].length - 1)),
      ])
    }
    let xMin = 100
    let xMax = -100
    let yMin = 100
    let yMax = -100
    for (let i = 0; i < points.length; i++) {
      xMin = Math.min(xMin, points[i][0])
      xMax = Math.max(xMax, points[i][0])
      yMin = Math.min(yMin, points[i][1])
      yMax = Math.max(yMax, points[i][1])
    }
    const r = repere({
      xMin: xMin - 1,
      xMax: xMax + 1,
      yMin: yMin - 1,
      yMax: yMax - 1,
    })
    const c = courbeInterpolee(points, {
      color: couleurs[parseInt(this.sup3) - 1].colCourbe,
      epaisseur: 2,
      repere: r,
      xMin,
      xMax,
    })
    objets.push(r, c)
    if (this.sup2) {
      for (let i = 0, p; i < points.length; i++) {
        p = tracePoint(point(points[i][0], points[i][1]))
        p.style = '+'
        p.epaisseur = 2
        p.color = colorToLatexOrHTML(couleurs[parseInt(this.sup3) - 1].colPoint)
        objets.push(p)
      }
    }
    this.contenu = mathalea2d(
      { xmin: xMin - 1, xmax: xMax + 1, ymin: yMin - 1, ymax: yMax + 1 },
      objets,
    )
    this.listeQuestions[0] = this.contenu
  }
}
