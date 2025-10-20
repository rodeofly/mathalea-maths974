import {
  colorToLatexOrHTML,
  fixeBordures,
  ObjetMathalea2D,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import FractionEtendue from '../../modules/FractionEtendue'
import { Point3d } from '../3d/3dProjectionMathalea2d/elements'
import { arrondi } from '../outils/nombres'
import { angleOriente } from './angles'
import { Cercle } from './cercle'
import { Droite, droite } from './droites'
import MainLevee from './MainLevee'
import {
  milieu,
  Point,
  point,
  pointIntersectionDD,
  pointIntersectionLC,
  pointSurSegment,
} from './points'
import { pointAbstrait, PointAbstrait } from './points-abstraits'
import { latex2d, texteParPosition } from './textes'
import { rotation, similitude, translation } from './transformations'

/**
 * v = vecteur('V') // son nom
 * v = vecteur(x,y) // ses composantes
 * v = vecteur(A,B) // son origine et son extrémité (deux Points)
 * v = vecteur(x,y,'v') // son nom et ses composantes.
 * v.representant(E,'blue') // Dessine le vecteur v issu de E, en bleu.
 * Commenter toutes les méthodes possibles
 * @author Jean-Claude Lhote et Rémi Angot
 */
export class Vecteur {
  nom: string
  x: number
  y: number

  constructor(
    arg1: FractionEtendue | number | PointAbstrait | string,
    arg2: FractionEtendue | number | PointAbstrait,
    nom = '',
  ) {
    if (arguments.length === 1) {
      this.nom = String(arg1)
      this.x = 0
      this.y = 0
    } else {
      if (typeof arg1 === 'number' || arg1 instanceof FractionEtendue) {
        this.x =
          arg1 instanceof FractionEtendue ? arg1.valeurDecimale : Number(arg1)
        this.y =
          arg2 instanceof FractionEtendue ? arg2.valeurDecimale : Number(arg2)
      } else {
        if (arg1 instanceof PointAbstrait && arg2 instanceof PointAbstrait) {
          this.x = arg2.x - arg1.x
          this.y = arg2.y - arg1.y
        } else {
          window.notify(
            'Vecteur : (attendus : A et B) les arguments de sont pas des points valides',
            {
              arg1,
              arg2,
            },
          )
          this.x = 0
          this.y = 0
        }
      }
      this.nom = nom
    }
  }

  norme() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  oppose() {
    this.x = -this.x
    this.y = -this.y
  }

  xSVG(coeff: number) {
    return this.x * coeff
  }

  ySVG(coeff: number) {
    return -this.y * coeff
  }

  representant(A: Point, color = 'black') {
    const B = point(A.x + this.x, A.y + this.y)
    const s = segment(A, B, color, '->')
    s.tailleExtremites = 5
    return s
  }

  representantNomme(A: Point, nom: string, taille = 1, color = 'black') {
    let s
    let v
    const B = point(A.x + this.x, A.y + this.y)
    const M = milieu(A, B)
    s = segment(A, B, color)
    const angle = s.angleAvecHorizontale
    v = similitude(this, A, 90, 0.5 / this.norme())
    if (Math.abs(angle) > 90) {
      s = segment(B, A, color)
      // angle = s.angleAvecHorizontale
      v = similitude(this, A, -90, 0.5 / this.norme())
    }
    const N = translation(M, v)
    return nomVecteurParPosition(nom, N.x, N.y, taille, 0, color)
  }
}

/**
 * @example v = vecteur('V') // son nom
 * @example v = vecteur(x,y) // ses composantes
 * @example v = vecteur(A,B) // son origine et son extrémité (deux Points)
 * @example v = vecteur(x,y,'v') // son nom et ses composantes.
 * @author Jean-Claude Lhote et Rémi Angot
 */
export function vecteur(
  arg1: FractionEtendue | number | PointAbstrait | string,
  arg2: FractionEtendue | number | PointAbstrait,
  nom = '',
) {
  return new Vecteur(arg1, arg2, nom)
}

/**
 * @author Jean-Claude Lhote le 31/01/2021
 * crée un nom de vecteur avec sa petite flèche
 * l'angle formé par avec l'horizontale est à donner comme argument, par défaut c'est 0
 * la taille impactera le nom et la flèche en proportion.
 * (x,y) sont les coordonnées du centre du nom.
 */
export class NomVecteurParPosition extends ObjetMathalea2D {
  nom: string
  x: number
  y: number
  angle: number
  taille: number
  constructor(
    nom: string,
    x: number,
    y: number,
    taille = 1,
    angle = 0,
    color = 'black',
  ) {
    super()
    this.nom = nom
    this.x = x
    this.y = y
    this.color = colorToLatexOrHTML(color)
    this.angle = angle
    this.taille = taille
    // @todo créer deux objets : vecteurI et vecteurJ pour ça.
    // if (this.nom === 'i') return latex2d('\\vec \\imath', this.x, this.y, { color })
    // if (this.nom === 'j') return latex2d('\\vec \\jmath', this.x, this.y, { color })

    const t = texteParPosition(
      this.nom,
      this.x,
      this.y,
      -this.angle,
      color,
      this.taille,
      'milieu',
      true,
    )
    const M = point(this.x, this.y)
    const P = point(M.x + 0.25 * this.nom.length, M.y)
    const M0 = similitude(P, M, 90 + this.angle, 1.5)
    const M1 = rotation(translation(M0, vecteur(P, M)), M0, this.angle)
    const M2 = similitude(M1, M0, 180, 1.5)
    const s = segment(M1, M2, color)
    s.styleExtremites = '->'
    s.tailleExtremites = 3
    this.objets = [t, s]
    const bordures = fixeBordures(this.objets, {
      rxmin: 0,
      rxmax: 0,
      rymin: 0,
      rymax: 0,
    })
    this.bordures = [bordures.xmin, bordures.ymin, bordures.xmax, bordures.ymax]
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

export function nomVecteurParPosition(
  nom: string,
  x: number,
  y: number,
  taille = 1,
  angle = 0,
  color = 'black',
) {
  // Katex ne reconnais pas \\vec qui est une commande définie ailleurs.
  if (nom === 'i') return latex2d('\\vec{\\imath}', x, y, { color })
  if (nom === 'j') return latex2d('\\vec{\\jmath}', x, y, { color })
  return new NomVecteurParPosition(nom, x, y, taille, angle, color)
}

/**
 * s = segment(A, B) //Segment d'extrémités A et B
 * s = segment(A,B,'blue') //Segment d'extrémités A et B et de couleur bleue
 * s = segment(x1,y1,x2,y2) //Segment défini par les coordonnées des deux extrémités
 * s = segment(x1,y1,x2,y2,'blue') //Segment défini par les coordonnées des deux extrémités et de couleur bleue
 * @class
 * @author Rémi Angot
 */
export class Segment extends ObjetMathalea2D {
  tailleExtremites: number
  styleExtremites: string
  angleAvecHorizontale: number
  x1: number
  y1: number
  x2: number
  y2: number
  extremite1: PointAbstrait
  extremite2: PointAbstrait
  longueur: number
  constructor(
    ...args:
      | [PointAbstrait | Point3d, PointAbstrait | Point3d, string?, string?]
      | [number, number, number, number, string?, string?]
  ) {
    super()
    this.bordures = [0, 0, 0, 0]
    this.typeObjet = 'segment'
    if (typeof args[0] === 'number') {
      this.styleExtremites = args[5] || ''
    } else {
      this.styleExtremites = String(args[3]) || ''
    }
    this.tailleExtremites = 4
    if (args[0] instanceof PointAbstrait || args[0] instanceof Point3d) {
      if (args[1] instanceof PointAbstrait || args[1] instanceof Point3d) {
        this.x1 = args[0].x
        this.y1 = args[0].y
        this.x2 = args[1].x
        this.y2 = args[1].y
      } else {
        window.notify(
          `Segment : (attendus : A et B${arguments.length === 3 ? ' et "couleur"' : ''}) les arguments de sont pas des points valides`,
          { ...args },
        )
        this.x1 = 0
        this.y1 = 0
        this.x2 = 0
        this.y2 = 0
      }
      this.color = colorToLatexOrHTML(args[2]?.toString() || 'black')
      this.styleExtremites = args[3]?.toString() || ''
    } else {
      if (
        Number.isNaN(args[0]) ||
        Number.isNaN(args[1]) ||
        Number.isNaN(args[2]) ||
        Number.isNaN(args[3])
      ) {
        window.notify(
          'Segment : (attendus : x1, y1, x2, y2 et "couleur") les arguments de sont pas des nombres valides',
          { ...args },
        )
      }
      this.x1 = Number(args[0])
      this.y1 = Number(args[1])
      this.x2 = Number(args[2])
      this.y2 = Number(args[3])
      this.color = colorToLatexOrHTML(args[4] || 'black')
      this.styleExtremites = args[5] || ''
    }

    this.x1 = arrondi(this.x1, 2)
    this.y1 = arrondi(this.y1, 2)
    this.x2 = arrondi(this.x2, 2)
    this.y2 = arrondi(this.y2, 2)

    this.epaisseur = 1
    this.opacite = 1
    this.pointilles = 0

    this.bordures = [
      Number(Math.min(this.x1, this.x2)),
      Number(Math.min(this.y1, this.y2)),
      Number(Math.max(this.x1, this.x2)),
      Number(Math.max(this.y1, this.y2)),
    ]
    this.extremite1 = point(this.x1, this.y1)
    this.extremite2 = point(this.x2, this.y2)
    this.longueur = Math.sqrt(
      (this.x2 - this.x1) ** 2 + (this.y2 - this.y1) ** 2,
    )
    // utiliser les fonctions de calcul d'angle avec un segment de longueur nulle est une erreur ! Je blinde en retournant un angle nul
    this.angleAvecHorizontale =
      this.longueur < 1e-8
        ? 0
        : angleOriente(
            point(this.x1 + 1, this.y1),
            this.extremite1,
            this.extremite2,
            5,
          )
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

    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    let code = this.codeExtremitesSVG(coeff)
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)

    code += `\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(coeff)}" x2="${B.xSVG(
      coeff,
    )}" y2="${B.ySVG(coeff)}" stroke="${this.color[0]}" ${this.style} />`

    if (this.styleExtremites.length > 0) {
      code = `<g id="${this.id}">${code}</g>`
    } else {
      code = code.replace('/>', `id="${this.id}" />`)
    }

    return code
  }

  tikz() {
    let optionsDraw = ''
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color =${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    switch (this.pointilles) {
      case 1:
        tableauOptions.push(' dash dot ')
        break
      case 2:
        tableauOptions.push(' densely dash dot dot ')
        break
      case 3:
        tableauOptions.push(' dash dot dot ')
        break

      case 4:
        tableauOptions.push(' dotted ')
        break
      case 5:
        tableauOptions.push(' dashed ')
        break
    }
    let arrowsOption = ''
    if (this.styleExtremites.length > 0) {
      // Map des styles
      const map: { [key: string]: string } = {
        '|': 'Bar',
        '>': 'Stealth',
        '<': 'Stealth',
      }
      // Taille des pointes
      const width = Math.max(2, Math.round(this.tailleExtremites))
      const length = Math.max(4, Math.round(this.tailleExtremites * 2))
      let left = '',
        right = ''
      if (this.styleExtremites.length === 3) {
        left = map[this.styleExtremites[0]] || ''
        right = map[this.styleExtremites[2]] || ''
      } else if (this.styleExtremites.length === 2) {
        if (this.styleExtremites[0] in map) left = map[this.styleExtremites[0]]
        if (this.styleExtremites[1] in map) right = map[this.styleExtremites[1]]
      } else if (this.styleExtremites.length === 1) {
        if (this.styleExtremites[0] in map) right = map[this.styleExtremites[0]]
      }
      // Ajout des tailles personnalisées
      const leftTip = left ? `{${left}[width=${width}mm]}` : ''
      const rightTip = right ? `{${right}[width=${width}mm]}` : ''
      if (leftTip && rightTip) {
        arrowsOption = `${leftTip}-${rightTip}`
      } else if (leftTip) {
        arrowsOption = `${leftTip}-`
      } else if (rightTip) {
        arrowsOption = `-${rightTip}`
      }
      if (arrowsOption) {
        tableauOptions.push(arrowsOption)
      }
    }
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    return `\\draw${optionsDraw} (${this.x1},${this.y1})--(${this.x2},${this.y2});`
  }

  svgml(coeff: number, amplitude: number) {
    const mainLevee = MainLevee.create() // mainLevee permet d'accéder aux méthodes pour créer les objets roughjs
    if (mainLevee != null) {
      const A = point(this.x1, this.y1)
      const B = point(this.x2, this.y2)
      let code = this.codeExtremitesSVG(coeff)
      code += mainLevee.line(
        A.xSVG(coeff),
        A.ySVG(coeff),
        B.xSVG(coeff),
        B.ySVG(coeff),
        {
          color: this.color[0],
          epaisseur: this.epaisseur,
          roughness: amplitude * 2,
        },
      )
      if (this.styleExtremites.length > 0) {
        code = `<g id="${this.id}">${code}</g>`
      } else {
        code = code.replace('/>', `id="${this.id}" />`)
      }
      mainLevee.destroy() // ne pas oublier de faire ça, sinon, il va trainer un svg qui ne sert à rien dans le DOM
      return code
    } else return ''
  }

  tikzml(amp: number) {
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    let optionsDraw = ''
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color =${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    if (this.styleExtremites.length > 1) {
      if (
        this.styleExtremites.includes('[') ||
        this.styleExtremites.includes(']')
      ) {
        tableauOptions.push('{' + this.styleExtremites + '}')
      } else {
        tableauOptions.push(this.styleExtremites)
      }
    }
    tableauOptions.push(
      `decorate,decoration={random steps , amplitude = ${amp}pt}`,
    )
    optionsDraw = '[' + tableauOptions.join(',') + ']'

    const code = `\\draw${optionsDraw} (${A.x},${A.y})--(${B.x},${B.y});`
    return code
  }

  codeExtremitesSVG(coeff: number) {
    let code = ''
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    const h = this.tailleExtremites
    if (this.styleExtremites.length > 1) {
      const fin = this.styleExtremites.slice(-1)
      if (fin === '|') {
        // si ça termine par | on le rajoute en B
        const M = pointSurSegment(B, A, h / context.pixelsParCm)
        const B1 = rotation(M, B, 90)
        const B2 = rotation(M, B, -90)
        code += `<line x1="${B1.xSVG(coeff)}" y1="${B1.ySVG(
          coeff,
        )}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${
          this.color[0]
        }" stroke-width="${this.epaisseur}" />`
      }
      if (fin === '>') {
        // si ça termine par > on rajoute une flèche en B
        const M = pointSurSegment(B, A, h / context.pixelsParCm)
        const B1 = similitude(B, M, 90, 0.7)
        const B2 = similitude(B, M, -90, 0.7)
        code += `<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(
          coeff,
        )}" x2="${B1.xSVG(coeff)}" y2="${B1.ySVG(coeff)}" stroke="${
          this.color[0]
        }" stroke-width="${this.epaisseur}" />`
        code += `\n\t<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(
          coeff,
        )}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${this.color[0]}" stroke-width="${this.epaisseur}" />`
      }
      if (fin === '<') {
        // si ça termine par < on rajoute une flèche inversée en B
        const M = pointSurSegment(B, A, -h / context.pixelsParCm)
        const B1 = similitude(B, M, 90, 0.7)
        const B2 = similitude(B, M, -90, 0.7)
        code += `<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(
          coeff,
        )}" x2="${B1.xSVG(coeff)}" y2="${B1.ySVG(coeff)}" stroke="${
          this.color[0]
        }" stroke-width="${this.epaisseur}" />`
        code += `\n\t<line x1="${B.xSVG(coeff)}" y1="${B.ySVG(
          coeff,
        )}" x2="${B2.xSVG(coeff)}" y2="${B2.ySVG(coeff)}" stroke="${this.color[0]}" stroke-width="${this.epaisseur}" />`
      }
      if (fin === '[') {
        // si ça termine par | on le rajoute en B
        const M = pointSurSegment(B, A, h / context.pixelsParCm)
        const B1 = similitude(M, B, 90, 1)
        const B2 = similitude(M, B, -90, 1)
        const C1 = similitude(B, B1, -90, 0.3)
        const C2 = similitude(B, B2, 90, 0.3)
        code += `<polyline points="${C2.xSVG(coeff)},${C2.ySVG(coeff)} ${B2.xSVG(coeff)},${B2.ySVG(coeff)} ${B1.xSVG(coeff)},${B1.ySVG(coeff)} ${C1.xSVG(coeff)},${C1.ySVG(coeff)}" fill="none" stroke="${this.color[0]}" ${this.style} id="${this.id}" stroke-width="${this.epaisseur}" />`
      }
      if (fin === ']') {
        // si ça termine par | on le rajoute en B
        const M = pointSurSegment(B, A, h / context.pixelsParCm)
        const B1 = similitude(M, B, 90, 1)
        const B2 = similitude(M, B, -90, 1)
        const C1 = similitude(B, B1, 90, 0.3)
        const C2 = similitude(B, B2, -90, 0.3)
        code += `<polyline points="${C2.xSVG(coeff)},${C2.ySVG(coeff)} ${B2.xSVG(coeff)},${B2.ySVG(coeff)} ${B1.xSVG(coeff)},${B1.ySVG(coeff)} ${C1.xSVG(coeff)},${C1.ySVG(coeff)}" fill="none" stroke="${this.color[0]}" ${this.style} id="${this.id}" stroke-width="${this.epaisseur}" />`
      }
      const debut = this.styleExtremites[0]
      if (debut === '[') {
        // si ça termine par | on le rajoute en B
        const M = pointSurSegment(A, B, h / context.pixelsParCm)
        const B1 = similitude(M, A, 90, 1)
        const B2 = similitude(M, A, -90, 1)
        const C1 = similitude(A, B1, 90, 0.3)
        const C2 = similitude(A, B2, -90, 0.3)
        code += `<polyline points="${C2.xSVG(coeff)},${C2.ySVG(coeff)} ${B2.xSVG(coeff)},${B2.ySVG(coeff)} ${B1.xSVG(coeff)},${B1.ySVG(coeff)} ${C1.xSVG(coeff)},${C1.ySVG(coeff)}" fill="none" stroke="${this.color[0]}" ${this.style} id="${this.id}" stroke-width="${this.epaisseur}" />`
      }
      if (debut === ']') {
        // si ça termine par | on le rajoute en B
        const M = pointSurSegment(A, B, h / context.pixelsParCm)
        const B1 = similitude(M, A, 90, 1)
        const B2 = similitude(M, A, -90, 1)
        const C1 = similitude(A, B1, -90, 0.3)
        const C2 = similitude(A, B2, 90, 0.3)
        code += `<polyline points="${C2.xSVG(coeff)},${C2.ySVG(coeff)} ${B2.xSVG(coeff)},${B2.ySVG(coeff)} ${B1.xSVG(coeff)},${B1.ySVG(coeff)} ${C1.xSVG(coeff)},${C1.ySVG(coeff)}" fill="none" stroke="${this.color[0]}" ${this.style} id="${this.id}" stroke-width="${this.epaisseur}" />`
      }
      if (debut === '<') {
        // si ça commence par < on rajoute une flèche en A
        const M = pointSurSegment(A, B, h / context.pixelsParCm)
        const A1 = similitude(A, M, 90, 0.7)
        const A2 = similitude(A, M, -90, 0.7)
        code += `<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
          coeff,
        )}" x2="${A1.xSVG(coeff)}" y2="${A1.ySVG(coeff)}" stroke="${
          this.color[0]
        }" stroke-width="${this.epaisseur}" />`
        code += `\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
          coeff,
        )}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${
          this.color[0]
        }" stroke-width="${this.epaisseur}" />`
      }
      if (debut === '>') {
        // si ça commence par > on rajoute une flèche inversée en A
        const M = pointSurSegment(A, B, -h / context.pixelsParCm)
        const A1 = similitude(A, M, 90, 0.7)
        const A2 = similitude(A, M, -90, 0.7)
        code += `<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
          coeff,
        )}" x2="${A1.xSVG(coeff)}" y2="${A1.ySVG(coeff)}" stroke="${
          this.color[0]
        }" stroke-width="${this.epaisseur}" />`
        code += `\n\t<line x1="${A.xSVG(coeff)}" y1="${A.ySVG(
          coeff,
        )}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${
          this.color[0]
        }" stroke-width="${this.epaisseur}" />`
      }
      if (debut === '|') {
        // si ça commence par | on le rajoute en A
        const N = pointSurSegment(A, B, h / context.pixelsParCm)
        const A1 = rotation(N, A, 90)
        const A2 = rotation(N, A, -90)
        code += `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(
          coeff,
        )}" x2="${A2.xSVG(coeff)}" y2="${A2.ySVG(coeff)}" stroke="${
          this.color[0]
        }" stroke-width="${this.epaisseur}" />`
      }
    }
    return code
  }

  /**
   * Teste si un segment coupe un cercle, une droite, une demi-cercle ou un autre segment
   * @memberof Segment
   * @param {Segment | Droite | DemiDroite | Cercle} objet Objet géométrique dont on veut tester l'intersection avec le segment
   * @example s1.estSecant(d1) // Renvoie true si s1 est sécant avec d1, false sinon
   * @author Jean-Claude Lhote
   * @return {boolean}
   */
  // JSDOC Validee par EE Aout 2022
  estSecant(objet: any) {
    // Si le segment est de longueur nulle, on ne peut définir sa direction et ça pose problème pour les calculs d'intersection
    // On regarde si la première extémité (qui est aussi la deuxième est sur l'objet)
    if (
      Math.abs(this.x1 - this.x2) < 0.01 &&
      Math.abs(this.y1 - this.y2) < 0.01
    ) {
      const P1 = point(this.x1, this.y1)
      return P1.estSur(objet)
    }

    const ab = droite(this.extremite1, this.extremite2)
    if (objet instanceof Cercle) {
      const P1 = pointIntersectionLC(ab, objet, '', 1)
      const P2 = pointIntersectionLC(ab, objet, '', 2)
      return (
        (P1 instanceof Point && P1.estSur(this)) ||
        (P2 instanceof Point && P2.estSur(this))
      )
    }
    let I: Point | boolean
    if (objet instanceof Droite) {
      I = pointIntersectionDD(ab, objet)
    } else {
      const cd = droite(objet.extremite1, objet.extremite2)
      I = pointIntersectionDD(ab, cd)
      if (typeof I === 'boolean') {
        I =
          objet.extremite1.estSur(this) ||
          objet.extremite2.estSur(this) ||
          this.extremite1.estSur(segment(objet.extremite1, objet.extremite2)) ||
          this.extremite2.estSur(segment(objet.extremite1, objet.extremite2))
      }
    }
    if (typeof I === 'boolean') return I
    return I.estSur(objet) && I.estSur(this)
  }
}
/**
 * @param {...any} args Points ou coordonnées + couleur facultative en dernier
 * @example segment(A,B,'blue') // Segment [AB] de couleur bleu
 * @example segment(x1,y1,x2,y2,'#f15929') // Segment dont les extrémités sont respectivement (x1,y1) et (x2,y2), de couleur orange (#f15929)
 * @author Rémi Angot
 */

export function segment(
  ...args:
    | [PointAbstrait | Point3d, PointAbstrait | Point3d, string?, string?]
    | [number, number, number, number, string?, string?]
) {
  return new Segment(...args)
}

/**
 * @param {...args} args Points ou coordonnées
 * @param {string} color Facultatif
 * @example segmentAvecExtremites(A,B,'blue')
 * @example segmentAvecExtremites(x1,y1,x2,y2,'#f15929')
 * @author Rémi Angot
 */
export function segmentAvecExtremites(
  ...args:
    | [PointAbstrait | Point3d, PointAbstrait | Point3d, string?, string?]
    | [number, number, number, number, string?, string?]
) {
  const s = segment(...args)
  s.styleExtremites = '|-|'
  return s
}

/**  Trace la demi-droite d'origine A passant par B
 * @param {PointAbstrait} A Origine de la droite
 * @param {PointAbstrait} B Point de la demi-droite, autre que l'origine
 * @param {string} [color = 'black'] Couleur de la demi-droite : du type 'blue' ou du type '#f15929'
 * @param {boolean} [extremites = false] Trace (ou pas) l'origine de la demi-droite
 * @property {string} color Couleur de la demi-droite. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opacite
 * @property {number} pointilles (0 pour pas de pointillés)
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Aout 2022
export class DemiDroite extends Segment {
  constructor(
    A: PointAbstrait,
    B: PointAbstrait,
    color = 'black',
    extremites = false,
  ) {
    super(A, B)
    this.opacite = 1
    this.pointilles = 0
    this.epaisseur = 1
    const B1 = pointSurSegment(B, A, -10)
    this.x2 = B1.x
    this.y2 = B1.y
    this.color = colorToLatexOrHTML(color)
    if (extremites) this.styleExtremites = '|-'
  }
}

/**  Trace la demi-droite d'origine A passant par B
 * @param {PointAbstrait} A
 * @param {PointAbstrait} B
 * @param {string} [color='black'] Facultatif, 'black' par défaut
 * @param {boolean} [extremites = false] Trace (ou pas) l'origine de la demi-droite
 * @example demiDroite(M, N) // Trace la demi-droite d'origine M passant par N et de couleur noire
 * @example demiDroite(M, N, 'blue', true) // Trace la demi-droite d'origine M passant par N et de couleur bleue, en traçant le trait signifiant l'origine de la demi-droite
 * @author Rémi Angot
 * @return {DemiDroite}
 */
// JSDOC Validee par EE Aout 2022
export function demiDroite(
  A: PointAbstrait,
  B: PointAbstrait,
  color = 'black',
  extremites = false,
) {
  return new DemiDroite(A, B, color, extremites)
}

/**
 * Renvoie la distance de A à B
 * @param {PointAbstrait} A
 * @param {PointAbstrait} B
 * @param {number} [precision] Nombre de chiffres après la virgule.
 * (ne sert à rien car si le number correspondant à l'arrondi ne tombe pas sur un flottant convertible en bianire sans erreur, il y aura 18 chiffres significatifs dans le number retourné
 * C'est à la fonction d'affichage de limiter le nombre de chiffres
 * @author Rémi Angot
 */
export function longueur(
  A: PointAbstrait | Point3d,
  B: PointAbstrait | Point3d,
  precision = 2,
) {
  return arrondi(Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2), precision ?? 6)
  // j chiffres après la virgule pour l'arrondi sachant que c'est à la fonction d'affichage de limiter le nombre de chiffres.
}

/**
 * norme(V) renvoie la norme du vecteur
 *
 * @author Rémi Angot
 */
export function norme(v: Vecteur) {
  return Math.sqrt(v.x ** 2 + v.y ** 2)
}

export class Cordelette extends ObjetMathalea2D {
  amplitude: number
  constructor(
    A: PointAbstrait,
    B: PointAbstrait,
    amplitude = 1,
    mollesse = 0.5,
    color = 'black',
  ) {
    super()
    this.typeObjet = 'cordelette'
    this.A = A
    this.B = B
    this.tailleExtremites = 0
    this.color = colorToLatexOrHTML(color)
    this.amplitude = amplitude
    this.bordures = [
      Math.min(A.x, B.x),
      Math.min(A.y, B.y),
      Math.max(A.x, B.x),
      Math.max(A.y, B.y),
    ]
  }

  svg(coeff: number) {
    const mainLevee = MainLevee.create()
    if (mainLevee != null) {
      const A = this.A
      const B = this.B

      // Calcul de la distance entre A et B
      const distance = Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2)

      // Nombre de points intermédiaires basé sur la distance
      // Plus la distance est grande, plus on a de points (environ 1 point tous les 0.5 unités)
      const nbPointsIntermediaires = Math.max(2, Math.floor(distance / 0.2))

      // Génération des points de la cordelette
      const points = this.genererPointsCordelette(A, B, nbPointsIntermediaires)

      // Conversion en coordonnées SVG
      const pointsSVG = points.map((point) => [
        point.x * coeff,
        -point.y * coeff,
      ]) as [number, number][]

      const code = mainLevee.curve(pointsSVG, {
        color: this.color[0],
        epaisseur: this.epaisseur,
        roughness: this.amplitude * 0.5, // Réduire la roughness car on a déjà le décalage
        bowing: 1, // Réduire le bowing aussi
      })

      mainLevee.destroy()
      return code
    } else return ''
  }

  /**
   * Génère des points intermédiaires décalés pour simuler une cordelette
   */
  private genererPointsCordelette(
    A: PointAbstrait,
    B: PointAbstrait,
    nbPoints: number,
  ) {
    const points = [A] // Commence par le point A

    // Vecteur directeur AB
    const vecteurAB = { x: B.x - A.x, y: B.y - A.y }
    // Vecteur perpendiculaire (pour les décalages)
    const vecteurPerp = { x: -vecteurAB.y, y: vecteurAB.x }
    // Normalisation du vecteur perpendiculaire
    const normePerp = Math.sqrt(vecteurPerp.x ** 2 + vecteurPerp.y ** 2)
    if (normePerp > 0) {
      vecteurPerp.x /= normePerp
      vecteurPerp.y /= normePerp
    }

    // Distance entre A et B
    const longueurAB = Math.sqrt(vecteurAB.x ** 2 + vecteurAB.y ** 2)

    // Génération d'une fonction de décalage continue basée sur plusieurs sinusoïdes
    // pour créer un aspect naturel mais lisse
    const frequence1 = 1 // Oscillation principale
    const frequence2 = 2.3 // Oscillation secondaire (nombre premier pour éviter la périodicité)
    const frequence3 = 3.7 // Oscillation tertiaire

    // Amplitudes relatives
    const amp1 = 1
    const amp2 = 0.6
    const amp3 = 0.3

    // Seed pour la reproductibilité (basé sur les coordonnées des points)
    const seed = (A.x + A.y + B.x + B.y) * 1000

    // Fonction de décalage continue
    const calculerDecalage = (t: number): number => {
      // Facteur d'atténuation aux extrémités (forme en cloche)
      const facteurExtremites = Math.sin(t * Math.PI)

      // Combinaison de plusieurs sinusoïdes avec phases différentes
      const phase1 = seed * 0.001
      const phase2 = seed * 0.0013
      const phase3 = seed * 0.0017

      const decalage =
        amp1 * Math.sin(t * Math.PI * frequence1 + phase1) +
        amp2 * Math.sin(t * Math.PI * frequence2 + phase2) +
        amp3 * Math.sin(t * Math.PI * frequence3 + phase3)

      return decalage * facteurExtremites
    }

    // Génération des points intermédiaires
    for (let i = 1; i < nbPoints; i++) {
      const t = i / nbPoints // Paramètre entre 0 et 1

      // Point sur le segment AB
      const pointSurSegment = {
        x: A.x + t * vecteurAB.x,
        y: A.y + t * vecteurAB.y,
      }

      // Amplitude du décalage basée sur la longueur et l'amplitude fournie
      const amplitudeDecalage = this.amplitude * 0.05 * longueurAB

      // Décalage continu et lisse
      const decalage = calculerDecalage(t) * amplitudeDecalage

      // Effet de gravité (la cordelette "tombe" naturellement)
      const decalageGravite =
        Math.sin(t * Math.PI) * this.amplitude * 0.02 * longueurAB

      // Point final décalé
      const pointDecale = pointAbstrait(
        pointSurSegment.x + decalage * vecteurPerp.x,
        pointSurSegment.y + decalage * vecteurPerp.y - decalageGravite,
      )

      points.push(pointDecale)
    }

    points.push(B) // Termine par le point B
    return points
  }

  tikz() {
    const A = this.A
    const B = this.B

    // Calcul de la distance entre A et B
    const distance = Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2)

    // Nombre de points intermédiaires basé sur la distance
    const nbPointsIntermediaires = Math.max(2, Math.floor(distance / 0.2))

    // Génération des points de la cordelette
    const points = this.genererPointsCordelette(A, B, nbPointsIntermediaires)

    // Construction des options TikZ
    const tableauOptions = []

    // Gestion de la couleur (utilise this.color[1] qui est le nom de couleur LaTeX)
    if (this.color[1] !== 'black') {
      tableauOptions.push(this.color[1])
    }

    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width=${this.epaisseur}`)
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity=${this.opacite}`)
    }

    const optionsDraw =
      tableauOptions.length > 0 ? `[${tableauOptions.join(', ')}]` : ''

    // Construction du path avec courbes lisses (sans décorateur conflictuel)
    const coordonnees = points
      .map((point) => `(${point.x.toFixed(3)},${point.y.toFixed(3)})`)
      .join(' ')

    return `\\draw${optionsDraw} plot[smooth] coordinates {${coordonnees}};`
  }
}

export function cordelette(
  A: PointAbstrait,
  B: PointAbstrait,
  amplitude = 1,
  mollesse = 0.5,
  color = 'black',
) {
  return new Cordelette(A, B, amplitude, mollesse, color)
}
