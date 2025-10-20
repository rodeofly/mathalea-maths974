import {
  colorToLatexOrHTML,
  ObjetMathalea2D,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { Point, point } from './points'
import { segment } from './segmentsVecteurs'

export class CrochetD extends ObjetMathalea2D {
  A: Point
  taille: number
  constructor(A: Point, color = 'blue') {
    super()
    this.epaisseur = 2
    this.color = colorToLatexOrHTML(color)
    this.taille = 0.2
    this.A = A
  }

  svg(coeff: number) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    switch (this.pointilles) {
      case 1:
        this.style += ' stroke-dasharray="6 10" '
        break
      case 2:
        this.style += ' stroke-dasharray="6 3" '
        break
      case 3:
        this.style += ' stroke-dasharray="3 2 6 2 " '
        break
      case 4:
        this.style += ' stroke-dasharray="1 2" '
        break
      case 5:
        this.style += ' stroke-dasharray="5 5" '
        break
    }

    let code = `<polyline points="${this.A.xSVG(coeff) + this.taille * 20},${
      this.A.ySVG(coeff) + ((2 * this.taille * 20) / coeff) * coeff
    } ${this.A.xSVG(coeff)},${this.A.ySVG(coeff) + 2 * this.taille * 20} ${this.A.xSVG(coeff)},${
      this.A.ySVG(coeff) + -2 * this.taille * 20
    } ${this.A.xSVG(coeff) + this.taille * 20},${
      this.A.ySVG(coeff) + -2 * this.taille * 20
    }" fill="none" stroke="${this.color[0]}" ${this.style} />`
    code += `\n\t<text x="${this.A.xSVG(coeff)}" y="${
      this.A.ySVG(coeff) + this.taille * 20 * 5
    }" text-anchor="middle" dominant-baseline="central" fill="${this.color[0]}">${
      this.A.nom
    }</text>\n `
    return code
  }

  tikz() {
    let code = `\\draw[very thick,color=${this.color[1]}] (${this.A.x + this.taille / context.scale},${this.A.y + this.taille / context.scale})--(${
      this.A.x
    },${this.A.y + this.taille / context.scale})--(${this.A.x},${this.A.y - this.taille / context.scale})--(${this.A.x + this.taille / context.scale},${this.A.y - this.taille / context.scale});`
    code += `\n\t\\draw[color=${this.color[1]}] (${this.A.x},${this.A.y - this.taille / context.scale}) node[below] {$${this.A.nom}$};`
    return code
  }
}

export function crochetD(A: Point, color = 'blue') {
  return new CrochetD(A, color)
}

export class CrochetG extends ObjetMathalea2D {
  taille: number
  A: Point
  constructor(A: Point, color = 'blue') {
    super()
    this.epaisseur = 2
    this.color = colorToLatexOrHTML(color)
    this.taille = 0.2
    this.A = A
  }

  svg(coeff: number) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    switch (this.pointilles) {
      case 1:
        this.style += ' stroke-dasharray="6 10" '
        break
      case 2:
        this.style += ' stroke-dasharray="6 3" '
        break
      case 3:
        this.style += ' stroke-dasharray="3 2 6 2 " '
        break
      case 4:
        this.style += ' stroke-dasharray="1 2" '
        break
      case 5:
        this.style += ' stroke-dasharray="5 5" '
        break
    }

    let code = `<polyline points="${this.A.xSVG(coeff) - this.taille * 20},${
      this.A.ySVG(coeff) + 2 * this.taille * 20
    } ${this.A.xSVG(coeff)},${this.A.ySVG(coeff) + 2 * this.taille * 20} ${this.A.xSVG(coeff)},${
      this.A.ySVG(coeff) - 2 * this.taille * 20
    } ${this.A.xSVG(coeff) - this.taille * 20},${
      this.A.ySVG(coeff) - 2 * this.taille * 20
    }" fill="none" stroke="${this.color[0]}" ${this.style} />`
    code += `\n\t<text x="${this.A.xSVG(coeff)}" y="${
      this.A.ySVG(coeff) + 5 * this.taille * 20
    }" text-anchor="middle" dominant-baseline="central" fill="${this.color[0]}">${
      this.A.nom
    }</text>\n `
    return code
  }

  tikz() {
    let code = `\\draw[very thick,color=${this.color[1]}] (${this.A.x - this.taille / context.scale},${this.A.y + this.taille / context.scale})--(${
      this.A.x
    },${this.A.y + this.taille / context.scale})--(${this.A.x},${this.A.y - this.taille / context.scale})--(${this.A.x - this.taille / context.scale},${this.A.y - this.taille / context.scale});`
    code += `\n\t\\draw[color=${this.color[1]}] (${this.A.x},${this.A.y - this.taille / context.scale}) node[below] {$${this.A.nom}$};`
    return code
  }
}

export function crochetG(A: Point, color = 'blue') {
  return new CrochetG(A, color)
}

export function intervalle(A: Point, B: Point, color = 'blue', h = 0) {
  const A1 = point(A.x, A.y + h)
  const B1 = point(B.x, B.y + h)
  const s = segment(A1, B1, color)
  // s.styleExtremites = '->'

  s.epaisseur = 3
  return s
}
