import {
  colorToLatexOrHTML,
  fixeBordures,
  ObjetMathalea2D,
  xSVG,
  ySVG,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { estentier, inferieurouegal } from '../../modules/outils'
import type { Spline } from '../mathFonctions/Spline'
import { tousDeMemeSigne } from '../outils/nombres'
import { arc } from './cercle'
import { Point, point, tracePoint } from './points'
import {
  elimineBinomesXYIntermediairesAlignes,
  motifs,
  Polygone,
  polygone,
  polyline,
} from './polygones'
import { Repere } from './reperes'
import { segment } from './segmentsVecteurs'
import { texteParPosition } from './textes'

export class LectureImage extends ObjetMathalea2D {
  x: number
  y: number
  xscale: number
  yscale: number
  textAbs: string
  textOrd: string
  stringColor: string
  constructor(
    x: number,
    y: number,
    xscale = 1,
    yscale = 1,
    color = 'red',
    textAbs = '',
    textOrd = '',
  ) {
    super()
    this.x = x
    this.y = y
    this.xscale = xscale
    this.yscale = yscale
    // if (textAbs === '') textAbs = x.toString()
    // if (textOrd === '') textOrd = y.toString()
    this.textAbs = textAbs
    this.textOrd = textOrd
    this.stringColor = color
  }

  svg(coeff: number) {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x0, y0)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(X, M, this.stringColor)
    const Sy = segment(M, Y, this.stringColor)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = 5
    Sy.pointilles = 5
    return (
      '\t\n' +
      Sx.svg(coeff) +
      '\t\n' +
      Sy.svg(coeff) +
      '\t\n' +
      (this.textAbs != null
        ? texteParPosition(
            this.textAbs,
            x0,
            (-1 * 20) / coeff,
            0,
            this.stringColor,
          ).svg(coeff)
        : '') +
      '\t\n' +
      (this.textOrd != null
        ? texteParPosition(
            this.textOrd,
            (-1 * 20) / coeff,
            y0,
            0,
            this.stringColor,
          ).svg(coeff)
        : '')
    )
  }

  tikz() {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x0, y0)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(X, M, this.stringColor)
    const Sy = segment(M, Y, this.stringColor)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = 5
    Sy.pointilles = 5
    return (
      '\t\n' +
      Sx.tikz() +
      '\t\n' +
      Sy.tikz() +
      '\t\n' +
      texteParPosition(
        this.textAbs,
        x0,
        -1 / context.scale,
        0,
        this.stringColor,
      ).tikz() +
      '\t\n' +
      texteParPosition(
        this.textOrd,
        -1 / context.scale,
        y0,
        0,
        this.stringColor,
      ).tikz()
    )
  }

  svgml(coeff: number, amp: number) {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(this.x, this.y)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(X, M, this.stringColor)
    const Sy = segment(M, Y, this.stringColor)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = 5
    Sy.pointilles = 5
    return (
      '\t\n' +
      Sx.svgml(coeff, amp) +
      '\t\n' +
      Sy.svgml(coeff, amp) +
      '\t\n' +
      texteParPosition(
        this.textAbs,
        x0,
        (-1 * 20) / coeff,
        0,
        this.stringColor,
      ).svg(coeff) +
      '\t\n' +
      texteParPosition(
        this.textOrd,
        (-1 * 20) / coeff,
        y0,
        0,
        this.stringColor,
      ).svg(coeff)
    )
  }

  tikzml(amp: number) {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(this.x, this.y)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(X, M, this.stringColor)
    const Sy = segment(M, Y, this.stringColor)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = 5
    Sy.pointilles = 5
    return (
      '\t\n' +
      Sx.tikzml(amp) +
      '\t\n' +
      Sy.tikzml(amp) +
      '\t\n' +
      texteParPosition(
        this.textAbs,
        x0,
        -1 / context.scale,
        0,
        this.stringColor,
      ).tikz() +
      '\t\n' +
      texteParPosition(
        this.textOrd,
        -1 / context.scale,
        y0,
        0,
        this.stringColor,
      ).tikz()
    )
  }
}
/**
 */
export function lectureImage(
  x: number,
  y: number,
  xscale = 1,
  yscale = 1,
  color = 'red',
  textAbs = '',
  textOrd = '',
): LectureImage {
  return new LectureImage(x, y, xscale, yscale, color, textAbs, textOrd)
}

export class LectureAntecedent extends ObjetMathalea2D {
  x: number
  y: number
  xscale: number
  yscale: number
  textAbs: string
  textOrd: string
  stringColor: string
  constructor(
    x: number,
    y: number,
    xscale: number,
    yscale: number,
    color = 'black',
    textOrd: string,
    textAbs: string,
  ) {
    super()
    //
    this.x = x
    this.y = y
    this.xscale = xscale
    this.yscale = yscale
    // if (textAbs == null) textAbs = this.x.toString().replace('.', ',')
    // if (textOrd == null) textOrd = this.y.toString().replace('.', ',')
    this.textAbs = textAbs
    this.textOrd = textOrd
    this.stringColor = color
    this.bordures = [-2, -1.5, x + 2, y > 0 ? y + 1 : 0]
  }

  svg(coeff: number) {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x0, y0)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(M, X, this.stringColor)
    const Sy = segment(Y, M, this.stringColor)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = 5
    Sy.pointilles = 5
    return (
      '\t\n' +
      Sx.svg(coeff) +
      '\t\n' +
      Sy.svg(coeff) +
      '\t\n' +
      (this.textAbs != null
        ? texteParPosition(
            this.textAbs,
            x0,
            (-1 * 20) / coeff,
            0,
            this.stringColor,
          ).svg(coeff)
        : '') +
      '\t\n' +
      (this.textOrd != null
        ? texteParPosition(
            this.textOrd,
            (-1 * 20) / coeff,
            y0,
            0,
            this.stringColor,
          ).svg(coeff)
        : '')
    )
  }

  tikz() {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x0, y0)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(M, X, this.stringColor)
    const Sy = segment(Y, M, this.stringColor)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = 5
    Sy.pointilles = 5
    return (
      '\t\n' +
      Sx.tikz() +
      '\t\n' +
      Sy.tikz() +
      '\t\n' +
      texteParPosition(
        this.textAbs,
        x0,
        -1 / context.scale,
        0,
        this.stringColor,
      ).tikz() +
      '\t\n' +
      texteParPosition(
        this.textOrd,
        -1 / context.scale,
        y0,
        0,
        this.stringColor,
      ).tikz()
    )
  }

  svgml(coeff: number, amp: number) {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x0, y0)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(M, X, this.stringColor)
    const Sy = segment(Y, M, this.stringColor)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = 5
    Sy.pointilles = 5
    return (
      '\t\n' +
      Sx.svgml(coeff, amp) +
      '\t\n' +
      Sy.svgml(coeff, amp) +
      '\t\n' +
      texteParPosition(
        this.textAbs,
        x0,
        (-1 * 20) / coeff,
        0,
        this.stringColor,
      ).svg(coeff) +
      '\t\n' +
      texteParPosition(
        this.textOrd,
        (-1 * 20) / coeff,
        y0,
        0,
        this.stringColor,
      ).svg(coeff)
    )
  }

  tikzml(amp: number) {
    const x0 = this.x / this.xscale
    const y0 = this.y / this.yscale
    const M = point(x0, y0)
    const X = point(x0, 0)
    const Y = point(0, y0)
    const Sx = segment(M, X, this.stringColor)
    const Sy = segment(Y, M, this.stringColor)
    Sx.styleExtremites = '->'
    Sy.styleExtremites = '->'
    Sx.pointilles = 5
    Sy.pointilles = 5
    return (
      '\t\n' +
      Sx.tikzml(amp) +
      '\t\n' +
      Sy.tikzml(amp) +
      '\t\n' +
      texteParPosition(
        this.textAbs,
        x0,
        -1 / context.scale,
        0,
        this.stringColor,
      ).tikz() +
      '\t\n' +
      texteParPosition(
        this.textOrd,
        -1 / context.scale,
        y0,
        0,
        this.stringColor,
      ).tikz()
    )
  }
}

export function lectureAntecedent(
  x: number,
  y: number,
  xscale: number,
  yscale: number,
  color = 'black',
  textOrd: string,
  textAbs: string,
): LectureAntecedent {
  return new LectureAntecedent(x, y, xscale, yscale, color, textOrd, textAbs)
}

/**
 * Trace la courbe d'une fonction dans un repère
 * @param {function} f fonction à tracer comme par exemple : const f = x => a * x ** 2 + b * x + c
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = {}]  Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du tracé de la courbe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du tracé de la courbe
 * @param {number} [parametres.xMin]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.xMax]  Abscisse maximale du tracé de la courbe
 * @param {number} [parametres.yMin]  Ordonnée minimale du tracé de la courbe
 * @param {number} [parametres.yMax]  Ordonnée maximale du tracé de la courbe
 * @param {boolean|number} [parametres.step = false] Si false, le pas entre deux abscisses du tracé de la fonction est 0.2/xUnite. Sinon, ce pas vaut la valeur indiquée.
 * @param {number} [parametres.xUnite = 1]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.yUnite = 1]  Abscisse maximale du tracé de la courbe
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du tracé de la courbe. À associer obligatoirement à colorToLatexOrHTML().
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Aout 2022
export class Courbe extends ObjetMathalea2D {
  stringColor: string
  f?: (x: number) => number
  usePgfplots: boolean
  xmin: number
  xmax: number
  ymin: number
  ymax: number
  samples: number = 100
  xunite: number
  yunite: number
  epaisseur: number
  fLatex?: string
  constructor(
    f: (x: number) => number,
    {
      repere,
      color = 'black',
      epaisseur = 2,
      step = false,
      xMin,
      xMax,
      yMin,
      yMax,
      xUnite = 1,
      yUnite = 1,
      usePgfplots = false,
      fLatex,
    }: {
      repere?: Repere
      color?: string
      epaisseur?: number
      step?: boolean | number
      xMin?: number
      xMax?: number
      yMin?: number
      yMax?: number
      xUnite?: number
      yUnite?: number
      usePgfplots?: boolean
      fLatex?: string
    } = {},
  ) {
    super()
    this.objets = []
    this.usePgfplots = usePgfplots
    this.epaisseur = epaisseur
    this.fLatex = fLatex

    if (repere == null) {
      window.notify(
        'Erreur dans Courbe : Il faut préciser le repère dans lequel tracer la courbe',
        { repere },
      )
      repere = new Repere({ xMin: -10, xMax: 10, yMin: -10, yMax: 10 })
    }
    const xmin = xMin == null ? (xMin = repere.xMin ?? 0) : xMin
    const xmax = xMax == null ? (xMax = repere.xMax ?? 0) : xMax
    const ymin = yMin == null ? (yMin = repere.yMin ?? 0) : yMin
    const ymax = yMax == null ? (yMax = repere.yMax ?? 0) : yMax

    this.xmin = xmin
    this.xmax = xmax
    this.ymin = ymin
    this.ymax = ymax

    this.bordures = (repere?.bordures ?? [0, 0, 0, 0]) as unknown as [
      number,
      number,
      number,
      number,
    ]

    this.stringColor = color
    let xunite, yunite // Tout en minuscule pour les différencier des paramètres de la fonction
    xunite = repere.xUnite
    yunite = repere.yUnite

    if (isNaN(xunite)) {
      xunite = xUnite
    }

    if (isNaN(yunite)) {
      yunite = yUnite
    }

    this.xunite = xunite
    this.yunite = yunite

    let points = []
    let pas: number
    let p
    if (!step) {
      pas = 0.2 / xUnite
    } else {
      pas = Number(step)
    }
    for (let x = xmin; inferieurouegal(x, xMax ?? 10); x += pas) {
      if (x > xmax) x = xmax // normalement x<xmax... mais inférieurouegal ne compare qu'à 0.0000001 près, on peut donc avoir xmax+epsilon qui sort de l'intervalle de déf
      const y = Number(f(x))
      if (isFinite(y)) {
        if (f(x) < ymax + 1 && f(x) > ymin - 1) {
          points.push(point(x * xunite, f(x) * yunite))
        } else {
          if (points.length > 1) {
            p = polyline([...points], color)
            p.epaisseur = epaisseur
            this.objets.push(p)
            points = []
          }
        }
      } else {
        x += 0.05
      }
    }
    if (points.length > 1) {
      p = polyline([...points], color)
      p.epaisseur = epaisseur
      this.objets.push(p)
    }
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz(axisYMin?: number, axisYMax?: number) {
    if (this.usePgfplots && this.fLatex) {
      // Use pgfplots with function expression
      let colorLatex = colorToLatexOrHTML(this.stringColor)[1] || 'black'
      // Remove braces from color if present
      colorLatex = colorLatex.replace(/[{}]/g, '')
      const domainMin = (this.xmin * this.xunite).toFixed(3)
      const domainMax = (this.xmax * this.xunite).toFixed(3)

      // Use axis bounds if provided, otherwise use curve's ymin/ymax
      const yDomainMin = (
        axisYMin !== undefined ? axisYMin * 20 : this.ymin * this.yunite * 20
      ).toFixed(3)
      const yDomainMax = (
        axisYMax !== undefined ? axisYMax * 20 : this.ymax * this.yunite * 20
      ).toFixed(3)

      let code = `\\addplot[color=${colorLatex},line width=${this.epaisseur / 2}pt,domain=${domainMin}:${domainMax},restrict y to domain=${
        yDomainMin
      }:${yDomainMax},samples=${this.samples}] {${this.fLatex}};\n`

      return code
    } else {
      // Legacy behavior: use polylines
      let code = ''
      if (this.objets == null) return code
      for (const objet of this.objets) {
        code += '\n\t' + objet.tikz()
      }
      return code
    }
  }

  svgml(coeff: number, amp: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      if (typeof objet.svgml === 'undefined') code += '\n\t' + objet.svg(coeff)
      else code += '\n\t' + objet.svgml(coeff, amp)
    }
    return code
  }

  tikzml(amp: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      if (typeof objet.tikzml === 'undefined') code += '\n\t' + objet.tikz()
      else code += '\n\t' + objet.tikzml(amp)
    }
    return code
  }
}

/**
 * Trace la courbe d'une fonction dans un repère
 * @param {function} f Fonction à tracer comme par exemple : const f = x => a * x ** 2 + b * x + c
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere = {}] Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du tracé de la courbe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du tracé de la courbe
 * @param {number} [parametres.xMin = repere.xMin]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.xMax = repere.xMax]  Abscisse maximale du tracé de la courbe
 * @param {number} [parametres.yMin = repere.yMin]  Ordonnée minimale du tracé de la courbe
 * @param {number} [parametres.yMax = repere.yMax]  Ordonnée maximale du tracé de la courbe
 * @param {boolean|number} [parametres.step = false] Si false, le pas entre deux abscisses du tracé de la fonction est 0.2/xUnite. Sinon, ce pas vaut la valeur indiquée.
 * @param {number} [parametres.xUnite = 1]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.yUnite = 1]  Abscisse maximale du tracé de la courbe
 * @param {boolean} [parametres.usePgfplots = false] Si true, utilise pgfplots pour la sortie LaTeX au lieu de tracés polylignes
 * @param {string} [parametres.fLatex] Expression LaTeX de la fonction (requis si usePgfplots = true)
 * @example courbe(g, {repere: r})
 * // Trace, en noir avec une épaisseur de 2, la courbe g dans le repère r, tous deux précédemment définis.
 * @example courbe(g, {repere: r, epaisseur: 5, color: 'blue'})
 * // Trace la courbe g dans le repère r, tous deux précédemment définis, en bleu, avec une épaisseur de 5.
 * @example courbe(g, {repere: r, usePgfplots: true, fLatex: 'x^2 - 2*x + 1'})
 * // Trace la courbe g dans le repère r en utilisant pgfplots (sortie LaTeX plus compacte).
 * @author Rémi Angot
 * @return {Courbe}
 */
// JSDOC Validee par EE Aout 2022
export function courbe(
  f: (x: number) => number,
  {
    repere,
    color = 'black',
    epaisseur = 2,
    step = false,
    xMin,
    xMax,
    yMin,
    yMax,
    xUnite = 1,
    yUnite = 1,
    usePgfplots = false,
    fLatex,
  }: {
    repere?: Repere
    color?: string
    epaisseur?: number
    step?: boolean | number
    xMin?: number
    xMax?: number
    yMin?: number
    yMax?: number
    xUnite?: number
    yUnite?: number
    usePgfplots?: boolean
    fLatex?: string
  } = {},
) {
  return new Courbe(f, {
    repere,
    color,
    epaisseur,
    step,
    xMin,
    xMax,
    yMin,
    yMax,
    xUnite,
    yUnite,
    usePgfplots,
    fLatex,
  })
}

/**
 * Trace l'aire entre la courbe d'une fonction et l'axe des abscisses
 * @param {function} f fonction dont on veut tracer l'aire entre sa courbe et l'axe des abscisses comme par exemple : const f = x => a * x ** 2 + b * x + c
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = {}]  Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du contour de l'aire : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du contour de l'aire
 * @param {string} [parametres.couleurDeRemplissage = 'blue']  Couleur de l'intérieur de l'aire : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.opacite = 0.5] Taux d'opacité du remplissage entre 0 et 1
 * @param {number} [parametres.hachures = 0] Style des hachures dans cette aire (entier entre 0 et 10).
 * @param {boolean|number} [parametres.step = false] Si false, le pas entre deux abscisses pour tracer l'aire est 0.2/xUnite. Sinon, ce pas vaut la valeur indiquée.
 * @param {number} [parametres.a = 0]  Abscisse minimale du tracé de la courbe avec a < b
 * @param {number} [parametres.b = 1]  Abscisse maximale du tracé de la courbe avec a < b
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du contour de l'aire. À associer obligatoirement à colorToLatexOrHTML().
 * @property {string} couleurDeRemplissage Couleur de l'intérieur de l'aire. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} xUnite Unité des abscisses du repère
 * @property {number} yUnite Unité des ordonnées du repère
 * @property {number} ymin Ordonnée minimale du repère
 * @property {number} ymax Ordonnée maximale du repère
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class Integrale extends ObjetMathalea2D {
  constructor(
    f: (x: number) => number,
    {
      repere,
      color = 'black',
      couleurDeRemplissage = 'blue',
      epaisseur = 2,
      step = false,
      a = 0,
      b = 1,
      opacite = 0.5,
      hachures = 0,
    }: {
      repere?: Repere
      color?: string
      epaisseur?: number
      couleurDeRemplissage?: string
      step?: boolean | number
      a?: number
      b?: number
      opacite?: number
      hachures?: number
    } = {},
  ) {
    super()
    this.objets = []
    const ymin = repere?.yMin ?? -10
    const ymax = repere?.yMax ?? 10
    const xunite = repere?.xUnite ?? 1
    const yunite = repere?.yUnite ?? 1

    const objets = []
    const points = []
    let pas: number
    if (!step) {
      pas = 0.2 / xunite
    } else {
      pas = Number(step)
    }
    for (let x = a; inferieurouegal(x, b); x += pas) {
      if (x > b) x = b // normalement x<xMax... mais inférieurouegal ne compare qu'à 0.0000001 près, on peut donc avoir xMax+epsilon qui sort de l'intervalle de déf
      if (isFinite(f(x))) {
        if (f(x) < ymax + 1 && f(x) > ymin - 1) {
          points.push(point(x * xunite, f(x) * yunite))
        } else {
          window.notify(
            "Erreur dans Integrale : Il semble que la fonction ne soit pas continue sur l'intervalle",
            {
              f,
              a,
              b,
            },
          )
        }
      } else {
        x += 0.05
      }
    }
    points.push(
      point(b * xunite, f(b) * yunite),
      point(b * xunite, 0),
      point(a * xunite, 0),
    )
    const p = polygone([...points], color)
    p.epaisseur = epaisseur
    p.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
    p.opaciteDeRemplissage = opacite
    p.hachures = hachures !== -1 ? motifs(hachures) : false
    this.bordures = repere?.bordures as unknown as [
      number,
      number,
      number,
      number,
    ]
    objets.push(p)
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }

  svgml(coeff: number, amp: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      if (typeof objet.svgml === 'undefined') code += '\n\t' + objet.svg(coeff)
      else code += '\n\t' + objet.svgml(coeff, amp)
    }
    return code
  }

  tikzml(amp: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      if (typeof objet.tikzml === 'undefined') code += '\n\t' + objet.tikz()
      else code += '\n\t' + objet.tikzml(amp)
    }
    return code
  }
}

/**
 * Trace l'aire entre la courbe d'une fonction et l'axe des abscisses
 * @param {function} f fonction dont on veut tracer l'aire entre sa courbe et l'axe des abscisses comme par exemple : const f = x => a * x ** 2 + b * x + c
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = {}]  Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du contour de l'aire : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du contour de l'aire
 * @param {string} [parametres.couleurDeRemplissage = 'blue']  Couleur de l'intérieur de l'aire : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.opacite = 0.5] Taux d'opacité du remplissage entre 0 et 1
 * @param {number} [parametres.hachures = 0] Style des hachures dans cette aire (entier entre 0 et 10).
 * @param {boolean|number} [parametres.step = false] Si false, le pas entre deux abscisses pour tracer l'aire est 0.2/xUnite. Sinon, ce pas vaut la valeur indiquée.
 * @param {number} [parametres.a = 0]  Abscisse minimale du tracé de la courbe avec a < b
 * @param {number} [parametres.b = 1]  Abscisse maximale du tracé de la courbe avec a < b
 * @example integrale(g, {repere: r})
 * // Trace avec une épaisseur de 2, l'aire entre la courbe de la fonction g et l'axe des abscisses dans le repère r, tous deux précédemment définis.
 * @example integrale(g,  {repere: r, epaisseur: 5, color: 'blue', couleurDeRemplissage: 'red'})
 * // Trace avec une épaisseur de 5, l'aire entre la courbe de la fonction g et l'axe des abscisses dans le repère r, tous deux précédemment définis. L'aire est entourée de bleu et remplie de rouge.
 * @author Rémi Angot
 * @return {Integrale}
 */
// JSDOC Validee par EE Juin 2022
export function integrale(
  f: (x: number) => number,
  {
    repere,
    color = 'black',
    couleurDeRemplissage = 'blue',
    epaisseur = 2,
    step = false,
    a = 0,
    b = 1,
    opacite = 0.5,
    hachures = 0,
  }: {
    repere?: Repere
    color?: string
    epaisseur?: number
    couleurDeRemplissage?: string
    step?: boolean | number
    a?: number
    b?: number
    opacite?: number
    hachures?: number
  } = {},
) {
  return new Integrale(f, {
    repere,
    color,
    couleurDeRemplissage,
    epaisseur,
    step,
    a,
    b,
    opacite,
    hachures,
  })
}
/**
 * Trace l'aire entre la courbe d'une fonction et l'axe des abscisses
 * @param {function} f fonction dont on veut tracer l'aire entre sa courbe et l'axe des abscisses comme par exemple : const f = x => a * x ** 2 + b * x + c
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = {}]  Repère dans lequel le tracé de la fonction se fait
 * @param {number} [parametres.xMin]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.xMax]  Abscisse maximale du tracé de la courbe
 * @param {number} [parametres.pas = 1]  Pas entre deux abscisses pour tracer l'aire
 * @param {boolean} [parametres.sup = false] Si true, l'aire est arrondie par le haut, sinon par le bas
 * @param {string} [parametres.colorPositif = 'red']  Couleur de l'aire positive
 * @param {string} [parametres.colorNegatif = 'blue']  Couleur de l'aire négative
 * @example integraleComptable(g, {repere: r})
 * // Trace l'aire entre la courbe de la fonction g et l'axe des abscisses dans le repère r, tous deux précédemment définis.
 * @example integraleComptable(g, {repere: r, pas: 0.1, sup: true, colorPositif: 'green', colorNegatif: 'orange'})
 * // Trace l'aire entre la courbe de la fonction g et l'axe des abscisses dans le repère r, tous deux précédemment définis. L'aire est arrondie par le haut, le pas entre deux abscisses est de 0.1, l'aire positive est verte et l'aire négative est orange.
 * @author Jean-Claude Lhote
 */
export class IntegraleComptable extends ObjetMathalea2D {
  aire: { negative: number; positive: number }
  constructor(
    f: (x: number) => number,
    {
      xMin,
      xMax,
      pas = 1,
      sup = false,
      colorPositif = 'red',
      colorNegatif = 'blue',
    }: {
      xMin: number
      xMax: number
      pas?: number
      sup?: boolean
      colorPositif?: string
      colorNegatif?: string
    },
  ) {
    super()
    this.objets = []
    const rectangles: Polygone[] = []
    const echantillonnage: number[][] = []
    for (let k = 0; k < (xMax - xMin) / pas; k++) {
      echantillonnage[k] = []
      for (let j = 0; j < 5; j++) {
        const x = xMin + k * pas + (j * pas) / 5
        if (estentier(f(x) / pas, 0.05)) {
          echantillonnage[k].push(Math.round(f(x) / pas) * pas)
        } else {
          echantillonnage[k].push(
            sup ? Math.ceil(f(x) / pas) * pas : Math.floor(f(x) / pas) * pas,
          )
        }
      }
    }
    for (let k = 0; k < echantillonnage.length - 1; k++) {
      echantillonnage[k].push(echantillonnage[k + 1][0])
    }
    if (estentier(f(xMax) / pas, 0.05)) {
      echantillonnage[echantillonnage.length - 1].push(
        Math.round(f(xMax) / pas) * pas,
      )
    } else {
      echantillonnage[echantillonnage.length - 1].push(
        sup ? Math.ceil(f(xMax) / pas) * pas : Math.floor(f(xMax) / pas) * pas,
      )
    }

    for (let k = 0; k < echantillonnage.length; k++) {
      const xk = xMin + k * pas
      const yk = sup
        ? Math.max(...echantillonnage[k])
        : Math.min(...echantillonnage[k])
      if (tousDeMemeSigne(echantillonnage[k])) {
        const p = polygone(
          [
            point(xk, 0),
            point(xk, yk),
            point(xk + pas, yk),
            point(xk + pas, 0),
          ],
          yk > 0 ? colorPositif : colorNegatif,
        )
        p.couleurDeRemplissage = colorToLatexOrHTML(
          yk > 0 ? colorPositif : colorNegatif,
        )
        rectangles.push(p)
      } else {
        const couleur = sup ? colorPositif : colorNegatif
        const p = polygone(
          [
            point(xk, 0),
            point(xk, yk),
            point(xk + pas, yk),
            point(xk + pas, 0),
          ],
          couleur,
        )
        p.couleurDeRemplissage = colorToLatexOrHTML(couleur)
        rectangles.push(p)
      }
    }
    // On joint les rectangles adjacents de même couleur
    let color: string[] = []
    let sommetFinal: Point = point(0, 0)
    while (rectangles.length > 0) {
      const sommets = [
        rectangles[0].listePoints[0],
        rectangles[0].listePoints[1],
        rectangles[0].listePoints[2],
      ]
      color = rectangles[0].color.slice()
      const pol = rectangles.shift()
      if (pol != null) {
        sommetFinal = pol.listePoints[3]
      }
      while (
        rectangles.length > 0 &&
        rectangles[0].couleurDeRemplissage[0] === color[0]
      ) {
        sommets.push(rectangles[0].listePoints[1], rectangles[0].listePoints[2])
        const pol = rectangles.shift()
        if (pol != null) {
          sommetFinal = pol.listePoints[3]
        }
      }
      // Il n'y a plus de rectangle, on ferme le polygone
      if (rectangles.length === 0) {
        sommets.push(sommetFinal)
        const binomesXY = elimineBinomesXYIntermediairesAlignes(sommets)
        const p = polygone(binomesXY.map((el) => point(el.x, el.y)))
        p.color =
          p.bordures[1] < 0 && p.bordures[3] === 0
            ? colorToLatexOrHTML(colorNegatif)
            : colorToLatexOrHTML(colorPositif)
        p.couleurDeRemplissage = p.color
        this.objets.push(p)
        break
      }
      // on a encore des rectangles, donc on change de couleur et on ferme le précédent polygone
      // s'il reste qu'un seul rectangle alors on le pousse dans la liste des objets
      sommets.push(sommetFinal)
      const binomesXY = elimineBinomesXYIntermediairesAlignes(sommets)
      const p = polygone(binomesXY.map((el) => point(el.x, el.y)))
      p.color =
        p.bordures[1] < 0 && p.bordures[3] === 0
          ? colorToLatexOrHTML(colorNegatif)
          : colorToLatexOrHTML(colorPositif)
      p.couleurDeRemplissage = p.color
      this.objets.push(p)
      if (rectangles.length === 1) {
        this.objets.push(rectangles[0])
        rectangles.length = 0
        break
      } // sinon on contine en initialisant le nouveau polygone au début de la boucle
    }

    const { xmin, xmax, ymin, ymax } = fixeBordures(this.objets, {
      rxmax: 0,
      rxmin: 0,
      rymax: 0,
      rymin: 0,
    })
    this.bordures = [xmin, xmax, ymin, ymax] as unknown as [
      number,
      number,
      number,
      number,
    ]
    this.aire = { negative: 0, positive: 0 }
    for (const objet of this.objets) {
      if (objet.bordures[1] < 0 && objet.bordures[3] === 0) {
        this.aire.negative += objet.aire
      } else {
        this.aire.positive += objet.aire
      }
    }
  }
}
export class BezierPath extends ObjetMathalea2D {
  xStart: number
  yStart: number
  listeOfTriplets: [number, number][][]
  constructor({
    xStart = 0,
    yStart = 0,
    listeOfTriplets = [
      [
        [1, 1],
        [-1, -1],
        [1, 1],
      ],
    ] as [number, number][][],
    color = 'black',
    epaisseur = 2,
    opacite = 1,
  }) {
    super()
    this.color = colorToLatexOrHTML(color)
    this.opacite = opacite
    this.epaisseur = epaisseur
    this.xStart = xStart
    this.yStart = yStart
    this.listeOfTriplets = listeOfTriplets
  }

  svg(coeff: number) {
    //
    let path = `<path fill="none" stroke="${this.color[0]}" stroke-width=${this.epaisseur} d="M${xSVG(this.xStart, coeff)},${ySVG(this.yStart, coeff)} c`
    for (const triplet of this.listeOfTriplets) {
      path += `${xSVG(triplet[0][0], coeff)},${ySVG(triplet[0][1], coeff)} ${xSVG(triplet[1][0], coeff)},${ySVG(triplet[1][1], coeff)} ${xSVG(triplet[2][0], coeff)},${ySVG(triplet[2][1], coeff)} `
    }
    path += '" />\n'
    return path
  }

  tikz() {
    let path = `\n\t\\draw[color = ${this.color[1]},line width = ${this.epaisseur}, opacity = ${this.opacite}](${this.xStart},${this.yStart})`
    // Pour tikz, les coordonnées du point initial et final doivent être en coordonnées absolues, seules les points de contrôles peuvent-être en relatif à leur noeud respectif
    let x0 = this.xStart
    let y0 = this.yStart
    for (const triplet of this.listeOfTriplets) {
      const x3 = x0 + triplet[2][0]
      const y3 = y0 + triplet[2][1]
      const dX2X3 = triplet[1][0] - triplet[2][0] // tikz prend comme origine le point final pour calculer les coordonnées relatives du point de contrôle 2 !
      const dY2Y3 = triplet[1][1] - triplet[2][1]
      path += ` .. controls +(${triplet[0][0].toFixed(2)},${triplet[0][1].toFixed(2)}) and +(${dX2X3.toFixed(2)},${dY2Y3.toFixed(2)})  .. (${x3.toFixed(2)},${y3.toFixed(2)})\n`
      x0 = x3 // Le nouveau point de départ est le point d'arrivée du tronçon précédent !
      y0 = y3
    }
    path += ';\n'
    return path
  }
}

/**
 * Trace la courbe d'une fonction, précédemment définie comme Spline, dans un repère
 * @param {Spline} f fonction à tracer défine, au préalable, avec splineCatmullRom()
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = {}] Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du tracé de la courbe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du tracé de la courbe
 * @param {number} [parametres.xMin = repere.xMin]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.xMax = repere.xMax]  Abscisse maximale du tracé de la courbe
 * @param {number} [parametres.yMin = repere.yMin]  Ordonnée minimale du tracé de la courbe
 * @param {number} [parametres.yMax = repere.yMax]  Ordonnée maximale du tracé de la courbe
 * @param {boolean|number} [parametres.step = false] Si false, le pas entre deux abscisses du tracé de la fonction est 0.2/xUnite. Sinon, ce pas vaut la valeur indiquée.
 * @param {number} [parametres.xUnite = 1]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.yUnite = 1]  Abscisse maximale du tracé de la courbe
 * @param {boolean} [parametres.traceNoeuds = true]  Place (ou non) les points définis dans le paramètre f.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du tracé de la courbe. À associer obligatoirement à colorToLatexOrHTML().
 * @author Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class CourbeSpline extends ObjetMathalea2D {
  constructor(
    f: Spline,
    {
      repere,
      color = 'black',
      epaisseur = 2,
      step = false,
      xMin,
      xMax,
      yMin,
      yMax,
      xUnite = 1,
      yUnite = 1,
      traceNoeuds = true,
    }: {
      repere?: Repere
      color?: string
      epaisseur?: number
      step?: boolean | number
      xMin?: number
      xMax?: number
      yMin?: number
      yMax?: number
      xUnite?: number
      yUnite?: number
      traceNoeuds?: boolean
    } = {},
  ) {
    super()
    this.objets = []

    const noeuds = []
    let points = []
    let xunite, yunite // Tout en minuscule pour les différencier des paramètres de la fonction
    xunite = repere?.xUnite ?? 1
    yunite = repere?.yUnite ?? 1
    const xmin = xMin == null ? (xMin = repere?.xMin ?? 0) : xMin
    const xmax = xMax == null ? (xMax = repere?.xMax ?? 0) : xMax
    const ymin = yMin == null ? (yMin = repere?.yMin ?? 0) : yMin
    const ymax = yMax == null ? (yMax = repere?.yMax ?? 0) : yMax

    if (isNaN(xunite)) {
      xunite = xUnite
    }

    if (isNaN(yunite)) {
      yunite = yUnite
    }
    if (f.x == null || f.y == null) {
      window.notify(
        "On ne peut pas tracer la courbe de cette spline : elle n'a pas de noeuds",
        { spline: JSON.stringify(f) },
      )
      return
    }
    if (traceNoeuds) {
      for (let i = 0; i < f.x.length; i++) {
        noeuds[i] = tracePoint(point(f.x[i], f.y[i]), 'black')
        noeuds[i].taille = 3
        noeuds[i].style = '+'
        noeuds[i].epaisseur = 2
        noeuds[i].opacite = 0.5
        this.objets.push(noeuds[i])
      }
    }
    let pas: number
    let p, y
    if (!step) {
      pas = 0.2 / xUnite
    } else {
      pas = Number(step)
    }
    for (let x = xmin; inferieurouegal(x, xmax); x = x + pas) {
      if (x > xmax) x = xmax // normalement x<xMax... mais inférieurouegal ne compare qu'à 0.0000001 près, on peut donc avoir xMax+epsilon qui sort de l'intervalle de déf
      y = f.image(x)
      if (!isNaN(y)) {
        if (y < ymax + 1 && y > ymin - 1) {
          points.push(point(x * xunite, y * yunite))
        } else if (points.length > 0) {
          p = polyline([...points], color)
          p.epaisseur = epaisseur
          p.opacite = 0.7
          this.objets.push(p)
          points = []
        }
      } else {
        x += 0.05
      }
    }
    p = polyline([...points], color)
    p.epaisseur = epaisseur
    p.opacite = 0.7
    this.objets.push(p)
    this.bordures = repere?.bordures as unknown as [
      number,
      number,
      number,
      number,
    ]
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}

/**
 * Trace la courbe d'une fonction, précédemment définie comme Spline, dans un repère
 * @param {function} f fonction à tracer défine, au préalable, avec splineCatmullRom()
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = {}] Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du tracé de la courbe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du tracé de la courbe
 * @param {number} [parametres.xMin = repere.xMin]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.xMax = repere.xMax]  Abscisse maximale du tracé de la courbe
 * @param {number} [parametres.yMin = repere.yMin]  Ordonnée minimale du tracé de la courbe
 * @param {number} [parametres.yMax = repere.yMax]  Ordonnée maximale du tracé de la courbe
 * @param {boolean|number} [parametres.step = false] Si false, le pas entre deux abscisses du tracé de la fonction est 0.2/xUnite. Sinon, ce pas vaut la valeur indiquée.
 * @param {number} [parametres.xUnite = 1]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.yUnite = 1]  Abscisse maximale du tracé de la courbe
 * @param {boolean} [parametres.traceNoeuds = true]  Place (ou non) les points définis dans le paramètre f.
 * @example courbeSpline(g, {repere: r})
 * // Trace, en noir avec une épaisseur de 2, la courbe spline g dans le repère r, tous deux précédemment définis.
 * @example courbeSpline(g, {repere: r, epaisseur: 5, color: 'blue'})
 * // Trace la courbe spline g dans le repère r, tous deux précédemment définis, en bleu, avec une épaisseur de 5.
 * @author Jean-Claude Lhote
 * @return {CourbeSpline}
 */
// JSDOC Validee par EE Juin 2022
export function courbeSpline(
  f: Spline,
  {
    repere,
    color = 'black',
    epaisseur = 2,
    step = false,
    xMin,
    xMax,
    yMin,
    yMax,
    xUnite = 1,
    yUnite = 1,
    traceNoeuds = true,
  }: {
    repere?: Repere
    color?: string
    epaisseur?: number
    step?: boolean | number
    xMin?: number
    xMax?: number
    yMin?: number
    yMax?: number
    xUnite?: number
    yUnite?: number
    traceNoeuds?: boolean
  } = {},
) {
  return new CourbeSpline(f, {
    repere,
    color,
    epaisseur,
    step,
    xMin,
    xMax,
    yMin,
    yMax,
    xUnite,
    yUnite,
    traceNoeuds,
  })
}

/**
 * @see : https://gist.github.com/ericelliott/80905b159e1f3b28634ce0a690682957
 * @private
 */
// y1: start value
// y2: end value
// mu: the current frame of the interpolation,
//     in a linear range from 0-1.
const cosineInterpolate = (y1: number, y2: number, mu: number) => {
  const mu2 = (1 - Math.cos(mu * Math.PI)) / 2
  return y1 * (1 - mu2) + y2 * mu2
}

/**
 * Trace la courbe d'une fonction interpolée, linéaire par parties, dans un repère
 * @param {Array.number[]} tableau Ce tableau de tableaux contient les coordonnées des points à rejoindre comme par exemple : [[-5,2],[-1,-7],[2,5],[3,-1]]
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = { xMin: -1, yMin: 1 }] Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du tracé de la courbe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du tracé de la courbe
 * @param {number} [parametres.xMin = repere.xMin]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.xMax = repere.xMax]  Abscisse maximale du tracé de la courbe
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class CourbeInterpolee extends ObjetMathalea2D {
  courbes: Courbe[]
  constructor(
    tableau: number[][],
    {
      color = 'black',
      epaisseur = 2,
      repere,
      xMin,
      xMax,
      step = 0.2,
    }: {
      color?: string
      epaisseur?: number
      repere?: Repere
      xMin?: number
      xMax?: number
      step?: number
    } = {},
  ) {
    super()
    this.courbes = []
    const xmin = xMin != null ? xMin : (repere?.xMin ?? -1)
    const xmax = xMax != null ? xMax : (repere?.xMax ?? 1)
    for (let i = 0; i < tableau.length - 1; i++) {
      const x0 = tableau[i][0]
      const y0 = tableau[i][1]
      const x1 = tableau[i + 1][0]
      const y1 = tableau[i + 1][1]
      const f = (x: number) => cosineInterpolate(y0, y1, (x - x0) / (x1 - x0))
      let depart, fin
      xmin > x0 ? (depart = xMin) : (depart = x0)
      xmax < x1 ? (fin = xMax) : (fin = x1)
      const c = courbe(f, {
        repere,
        xMin: depart,
        xMax: fin,
        color,
        epaisseur,
        step,
      })
      this.courbes.push(c)
    }
    const lesY = tableau.map((el) => el[1])
    const lesX = tableau.map((el) => el[0])
    this.bordures = [
      Math.min(...lesX),
      Math.min(...lesY),
      Math.max(...lesX),
      Math.max(...lesY),
    ]
  }

  svg(coeff: number) {
    let code = ''
    if (this.courbes == null) return code
    for (const objet of this.courbes) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    if (this.courbes == null) return code
    for (const objet of this.courbes) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}

/**
 * Trace la courbe d'une fonction interpolée, linéaire par parties, dans un repère
 * @param {Array.number[]} tableau Ce tableau de tableaux contient les coordonnées des points à rejoindre comme par exemple : [[-5,2],[-1,-7],[2,5],[3,-1]]
 * @param {Object} parametres À saisir entre accolades
 * @param {Repere} [parametres.repere  = {}]  Repère dans lequel le tracé de la fonction se fait
 * @param {string} [parametres.color = 'black']  Couleur du tracé de la courbe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.epaisseur = 2]  Epaisseur du tracé de la courbe
 * @param {number} [parametres.xMin = repere.xMin]  Abscisse minimale du tracé de la courbe
 * @param {number} [parametres.xMax = repere.xMax]  Abscisse maximale du tracé de la courbe
 * @param {number|false} [parametres.step] Le step pour le tracé de la courbe
 * @example courbeInterpolee(tab, {repere: r})
 * // Trace, en noir avec une épaisseur de 2, la courbe de la fonction interpolée sur les intervalles définis dans tab, dans le repère r, tous deux précédemment définis.
 * @example courbeInterpolee(tab, {repere: r, epaisseur: 5, color: 'blue'})
 * // Trace la courbe de la fonction interpolée sur les intervalles définis dans tab, dans le repère r, tous deux précédemment définis, en bleu avec une épaisseur de 5.
 * @author Rémi Angot
 * @return {CourbeInterpolee}
 */
// JSDOC Validee par EE Juin 2022
export function courbeInterpolee(
  tableau: number[][],
  {
    color = 'black',
    epaisseur = 1,
    repere,
    xMin = -10,
    xMax = 10,
    step = 0.2,
  }: {
    color?: string
    epaisseur?: number
    repere?: Repere
    xMin?: number
    xMax?: number
    step?: number
  } = {},
) {
  return new CourbeInterpolee(tableau, {
    color,
    epaisseur,
    repere,
    xMin,
    xMax,
    step,
  })
}

export class GraphiqueInterpole extends ObjetMathalea2D {
  courbes: Courbe[]
  constructor(
    tableau: number[][],
    {
      color = 'black',
      epaisseur = 1,
      repere, // repère par défaut : le laisser...
      step = 0.2,
    }: {
      color?: string
      epaisseur?: number
      repere?: Repere
      step?: number
    } = {},
  ) {
    super()
    this.courbes = []
    const xmin = repere?.xMin ?? tableau[0][0]
    const xmax = repere?.xMax ?? tableau[tableau.length - 1][0]
    const ymin = repere?.yMin ?? Math.min(...tableau.map((el) => el[0]))
    const ymax = repere?.yMax ?? Math.max(...tableau.map((el) => el[1]))
    for (let i = 0; i < tableau.length - 1; i++) {
      const x0 = tableau[i][0]
      const y0 = tableau[i][1]
      const x1 = tableau[i + 1][0]
      const y1 = tableau[i + 1][1]
      const f = (x: number) => cosineInterpolate(y0, y1, (x - x0) / (x1 - x0))
      let depart, fin
      xmin > x0 ? (depart = xmin) : (depart = x0)
      xmax < x1 ? (fin = xmax) : (fin = x1)
      const c = courbe(f, {
        repere,
        step,
        xMin: depart,
        xMax: fin,
        color,
        epaisseur,
        xUnite: repere?.xUnite ?? 1,
        yUnite: repere?.yUnite ?? 1,
        yMin: ymin,
        yMax: ymax,
      })
      this.courbes.push(c)
    }
    this.bordures = repere?.bordures as unknown as [
      number,
      number,
      number,
      number,
    ]
  }

  svg(coeff: number) {
    let code = ''
    for (const objet of this.courbes) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    for (const objet of this.courbes) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}

/**
 *
 *
 * @author Rémi Angot
 */
export function graphiqueInterpole(
  tableau: number[][],
  {
    color = 'black',
    epaisseur = 1,
    repere, // repère par défaut : le laisser...
    step = 0.2,
  }: {
    color?: string
    epaisseur?: number
    repere?: Repere
    step?: number
  } = {},
) {
  return new GraphiqueInterpole(tableau, { color, epaisseur, repere, step })
}

export function imageInterpolee(tableau: number[][], antecedent: number) {
  const x0 = tableau[0][0]
  const y0 = tableau[0][1]
  const x1 = tableau[1][0]
  const y1 = tableau[1][1]
  const f = (x: number) => cosineInterpolate(y0, y1, (x - x0) / (x1 - x0))
  return f(antecedent)
}

export function antecedentInterpole(tableau: number[][], image: number) {
  const x0 = tableau[0][0]
  const y0 = tableau[0][1]
  const x1 = tableau[1][0]
  const y1 = tableau[1][1]
  const f = (x: number) => cosineInterpolate(y0, y1, (x - x0) / (x1 - x0))
  return antecedentParDichotomie(x0, x1, f, image, 0.01)
}

export function antecedentParDichotomie(
  xmin: number,
  xmax: number,
  f: (x: number) => number,
  y: number,
  precision = 0.01,
) {
  // On arrondit à 1E-6 parce que sinon, on passe à côté de valeur qui devraient être nulle mais le sont pas à 1E-15 !
  const ymax = Number(Math.max(f(xmax), f(xmin)).toFixed(6))
  const ymin = Number(Math.min(f(xmax), f(xmin)).toFixed(6))
  if (y > ymax || y < ymin) return false // y n'est pas entre les deux extrêmes, la méthode ne fonctionne pas.
  let xmoy, ymoy
  if (xmin > xmax) {
    xmoy = xmin
    xmin = xmax
    xmax = xmoy
  }
  xmoy = (xmax + xmin) / 2
  ymoy = f(xmoy)
  let cpt = 0
  while (Math.abs(ymoy - y) > precision && cpt < 1000) {
    if (f(xmin) < f(xmax)) {
      if (ymoy > y) {
        xmax = xmoy
      } else {
        xmin = xmoy
      }
    } else if (ymoy > y) {
      xmin = xmoy
    } else {
      xmax = xmoy
    }
    xmoy = (xmin + xmax) / 2
    ymoy = f(xmoy)
    cpt++
  }
  if (cpt > 1000) return false
  return xmoy
}

/**
 * crée un petit demi-cercle en x,y pour marquer une courbe sur un intervalle ouvert
 * @param {number} x
 * @param {number} y
 * @param {'gauche'|'droite'} sens 'gauche' par défaut
 * @param {number} rayon
 * @param {string} couleur
 * @returns {Arc}
 */
export function croche(
  x: number,
  y: number,
  sens = 'gauche',
  rayon = 0.1,
  couleur = 'black',
) {
  const centre = point(x + (sens === 'gauche' ? -rayon : rayon), y)
  const dessous = point(x + (sens === 'gauche' ? -rayon : rayon), y - rayon)
  const dessus = point(x + (sens === 'gauche' ? -rayon : rayon), y + rayon)
  const croche =
    sens === 'gauche'
      ? arc(dessous, centre, dessus)
      : arc(dessus, centre, dessous)
  croche.color = colorToLatexOrHTML(couleur)
  return croche
}
