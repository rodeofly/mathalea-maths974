import earcut from 'earcut'
import {
  colorToLatexOrHTML,
  ObjetMathalea2D,
  type NestedObjetMathalea2dArray,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { randint } from '../../modules/outils'
import { Point3d } from '../3d/3dProjectionMathalea2d/elements'
import { arrondi, rangeMinMax } from '../outils/nombres'
import { lettreDepuisChiffre } from '../outils/outilString'
import { codageAngleDroit } from './angles'
import { codageSegments } from './codages'
import { Point, point, pointAdistance, pointSurSegment } from './points'
import { isPointsAbstraits, PointAbstrait } from './points-abstraits'
import { longueur, segment, Vecteur, vecteur } from './segmentsVecteurs'
import {
  Latex2d,
  LatexParCoordonnees,
  latexParCoordonnees,
  TexteParPoint,
  texteParPoint,
  texteParPosition,
} from './textes'
import { homothetie, rotation, translation } from './transformations'
import { aireTriangle } from './triangle'

type BinomeXY = { x: number; y: number }
type BinomesXY = BinomeXY[]

/**
 * Crée le barycentre d'un polygone
 * @param {Polygone} p Polygone dont on veut créer le barycentre
 * @param {string} [nom = ''] Nom du barycentre
 * @param {string} [positionLabel = 'above'] Position du nom par rapport au point
 * @example G = barycentre(pol) // Crée G, le barycentre du polygone pol, sans lui donner de nom
 * @example G = barycentre(pol,'G','below') // Crée G, le barycentre du polygone pol, en notant G sous le point, s'il est tracé et labellisé.
 * @author Jean-Claude Lhote
 * @return {Point}
 */
// JSDOC Validee par EE Juin 2022
export function barycentre(p: Polygone, nom = '', positionLabel = 'above') {
  let sommex = 0
  let sommey = 0
  let nbsommets = 0
  for (const point of p.listePoints) {
    sommex += point.x
    sommey += point.y
    nbsommets++
  }
  const x = sommex / nbsommets
  const y = sommey / nbsommets
  return new Point(x, y, nom, positionLabel)
}

/**
 * polyline(A,B,C,D,E) //Trace la ligne brisée ABCDE
 *
 * @author Rémi Angot
 */
export class Polyline extends ObjetMathalea2D {
  listePoints: PointAbstrait[]
  listePoints3d: Point3d[]
  nom: string
  stringColor: string
  constructor(
    ...points:
      | (PointAbstrait | Point3d)[]
      | [(PointAbstrait | Point3d)[], string]
  ) {
    super()
    this.epaisseur = 1
    this.pointilles = 0
    this.opacite = 1
    if (Array.isArray(points[0])) {
      // Si le premier argument est un tableau
      this.listePoints = points[0].filter((el) => el instanceof PointAbstrait)
      this.listePoints3d = points[0].filter((el) => el instanceof Point3d)
      this.stringColor = String(points[1]) // alors le deuxième est un string
      this.color = colorToLatexOrHTML(String(points[1]))
    } else {
      // On n'a que des points
      this.listePoints = points.filter((el) => el instanceof PointAbstrait)
      this.listePoints3d = points.filter((el) => el instanceof Point3d)
      this.color = colorToLatexOrHTML('black')
      this.stringColor = 'black'
    }
    let xmin = 1000
    let xmax = -1000
    let ymin = 1000
    let ymax = -1000
    for (const unPoint of this.listePoints) {
      if (unPoint.typeObjet !== 'point')
        window.notify('Polyline : argument invalide', { ...points })
      xmin = Math.min(xmin, unPoint.x)
      xmax = Math.max(xmax, unPoint.x)
      ymin = Math.min(ymin, unPoint.y)
      ymax = Math.max(ymax, unPoint.y)
    }
    this.bordures = [xmin, ymin, xmax, ymax]
    this.nom = ''
    if (this.listePoints.length < 15) {
      // Ne nomme pas les lignes brisées trop grandes (pratique pour les courbes de fonction)
      for (const point of this.listePoints) {
        this.nom += point.nom
      }
      for (const point of this.listePoints3d) {
        this.nom += point.label
      }
    }
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
    let binomeXY = ''
    for (const point of this.listePoints) {
      const X = point.xSVG(coeff)
      const Y = point.ySVG(coeff)
      binomeXY += `${X},${Y} `
    }
    for (const point of this.listePoints3d) {
      const X = point.c2d.xSVG(coeff)
      const Y = point.c2d.ySVG(coeff)
      binomeXY += `${X},${Y} `
    }
    return `<polyline points="${binomeXY}" fill="none" stroke="${this.color[0]}" ${this.style} id="${this.id}" />`
  }

  tikz() {
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
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

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }

    let optionsDraw = ''
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    let binomeXY = ''
    for (const point of this.listePoints) {
      binomeXY += `(${arrondi(point.x)},${arrondi(point.y)})--`
    }
    binomeXY = binomeXY.substr(0, binomeXY.length - 2)
    return `\\draw${optionsDraw} ${binomeXY};`
  }

  svgml(coeff: number, amp: number) {
    let code = ''
    let s
    for (let k = 1; k < this.listePoints.length; k++) {
      s = segment(
        this.listePoints[k - 1],
        this.listePoints[k],
        this.stringColor,
      )
      s.epaisseur = this.epaisseur
      s.opacite = this.opacite
      code += s.svgml(coeff, amp)
    }
    return code
  }

  tikzml(amp: number) {
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }
    tableauOptions.push(
      `decorate,decoration={random steps , segment length=3pt, amplitude = ${amp}pt}`,
    )

    let optionsDraw = ''
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    let binomeXY = ''
    for (const point of this.listePoints) {
      binomeXY += `(${arrondi(point.x)},${arrondi(point.y)})--`
    }
    binomeXY = binomeXY.substr(0, binomeXY.length - 2)
    return `\\draw${optionsDraw} ${binomeXY};`
  }
}

/**
 * Trace une ligne brisée
 * @example polyline(A,B,C,D,E) // Trace la ligne brisée ABCDE en noir
 * @example polyline([A,B,C,D,E],'blue') // Trace la ligne brisée ABCDE en bleu
 * @example polyline([A,B,C,D,E],'#f15929') // Trace la ligne brisée ABCDE en orange (code couleur HTML : #f15929)
 * @returns Polyline
 * @author Rémi Angot
 */
export function polyline(
  ...args: (PointAbstrait | Point3d)[] | [(PointAbstrait | Point3d)[], string]
) {
  return new Polyline(...args)
}

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% LES POLYGONES %%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/
/**
 * polygone(A,B,C,D,E) //Trace ABCDE
 * polygone([A,B,C,D],"blue") // Trace ABCD en bleu
 * polygone([A,B,C,D],"blue","red","green") // Trace ABCD en bleu, rempli en rouge et hachuré en vert.
 * @property {Point[]} listePoints
 * @property {string[]} color
 * @property {string[]} couleurDeRemplissage
 * @property {string[]} couleurDesHachures
 * @property {number} epaisseurDesHachures
 * @property {number} distanceDesHachures
 * @property {number} opaciteDeRemplissage
 * @property {boolean|string} hachures
 * @property {number[]} bordures
 * @property {string} nom
 * @property {string} id
 * @property {string} style
 * @property {number} opacite
 * @property {number} epaisseur
 * @property {number} pointilles
 *
 * @author Rémi Angot*
 * @class
 */
export class Polygone extends ObjetMathalea2D {
  couleurDeRemplissage: string[]
  opaciteDeRemplissage: number
  couleurDesHachures: string[]
  distanceDesHachures: number
  epaisseurDesHachures: number
  hachures: boolean | string
  listePoints: PointAbstrait[]
  nom: string
  pointilles: number
  _triangulation: [PointAbstrait, PointAbstrait, PointAbstrait][]
  _flat: number[]
  _aire: number
  stringColor: string
  readonly perimetre: number
  constructor(...points: PointAbstrait[] | [PointAbstrait[], string?]) {
    super()
    this.epaisseurDesHachures = 1
    this.distanceDesHachures = 10
    this.couleurDeRemplissage = colorToLatexOrHTML('none')
    this.opaciteDeRemplissage = 0.5
    this.epaisseur = 1
    this.opacite = 1
    this.pointilles = 0
    this._triangulation = []
    this._flat = []
    this._aire = 0
    this.stringColor = 'black'
    if (Array.isArray(points[0])) {
      // Si le premier argument est un tableau
      this.listePoints = points[0]
      if (points[1]) {
        this.color = colorToLatexOrHTML(String(points[1]))
        this.stringColor = String(points[1])
      }
      if (points[2]) {
        this.couleurDeRemplissage = colorToLatexOrHTML(String(points[2]))
      } else {
        this.couleurDeRemplissage = colorToLatexOrHTML('none')
      }
      if (points[3]) {
        this.couleurDesHachures = colorToLatexOrHTML(String(points[3]))
        this.hachures = true
      } else {
        this.couleurDesHachures = colorToLatexOrHTML('black')
        this.hachures = false
      }
      this.nom = this.listePoints.map((el) => el.nom).join('')
    } else {
      if (typeof points[points.length - 1] === 'string') {
        this.color = colorToLatexOrHTML(String(points[points.length - 1]))
        this.stringColor = String(points[points.length - 1])
        points.splice(points.length - 1, 1)
      }
      this.listePoints = points.filter((el) => el instanceof PointAbstrait)
      this.nom = this.listePoints.map((el) => el.nom).join('')
      this.couleurDeRemplissage = colorToLatexOrHTML('none')
      this.couleurDesHachures = colorToLatexOrHTML('none') // Rajout EE du 22/02/2024 pour 6N22 cas 3
      this.hachures = false
    }
    let xmin = 1000
    let xmax = -1000
    let ymin = 1000
    let ymax = -1000
    this.bordures = [xmin, ymin, xmax, ymax]
    for (const unPoint of this.listePoints) {
      if (unPoint.typeObjet !== 'point')
        window.notify('Polygone : argument invalide', { ...points })
      xmin = Math.min(xmin, unPoint.x)
      xmax = Math.max(xmax, unPoint.x)
      ymin = Math.min(ymin, unPoint.y)
      ymax = Math.max(ymax, unPoint.y)
    }
    this.bordures = [xmin, ymin, xmax, ymax]
    let p = 0
    for (let i = 0; i < this.listePoints.length; i++) {
      p += longueur(
        this.listePoints[i],
        this.listePoints[(i + 1) % this.listePoints.length],
      )
    }
    this.perimetre = p
  }

  binomesXY(coeff: number) {
    let liste = ''
    for (const point of this.listePoints) {
      liste += `${point.xSVG(coeff)},${point.ySVG(coeff)} `
    }
    return liste
  }

  get flat() {
    if (this._flat.length === 0) {
      this._flat = polygoneToFlatArray(this)
    }
    return this._flat
  }

  get triangulation() {
    if (this._triangulation.length === 0) {
      const trianglesIndices = earcut(this.flat)
      this._triangulation = []
      for (let i = 0; i < trianglesIndices.length; i += 3) {
        this._triangulation.push([
          point(
            this.flat[trianglesIndices[i] * 2],
            this.flat[trianglesIndices[i] * 2 + 1],
          ),
          point(
            this.flat[trianglesIndices[i + 1] * 2],
            this.flat[trianglesIndices[i + 1] * 2 + 1],
          ),
          point(
            this.flat[trianglesIndices[i + 2] * 2],
            this.flat[trianglesIndices[i + 2] * 2 + 1],
          ),
        ])
      }
    }
    return this._triangulation
  }

  get aire() {
    if (this._aire === 0) {
      const triangles = this.triangulation
      this._aire = 0
      for (let i = 0; i < triangles.length; i++) {
        this._aire += Number(aireTriangle(polygone(triangles[i])))
      }
    }
    return this._aire
  }

  svg(coeff: number) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
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

    if (this.hachures) {
      if (this.couleurDeRemplissage.length < 1) {
        this.couleurDeRemplissage = colorToLatexOrHTML('none')
      }
      return (
        pattern({
          motif: String(this.hachures),
          id: String(this.id),
          distanceDesHachures: this.distanceDesHachures,
          epaisseurDesHachures: this.epaisseurDesHachures,
          couleurDesHachures: this.couleurDesHachures[0] || 'black',
          couleurDeRemplissage: this.couleurDeRemplissage[0],
          opaciteDeRemplissage: this.opaciteDeRemplissage,
        }) +
        `<polygon points="${this.binomesXY(coeff)}" stroke="${this.color[0]}" ${this.style} id="${this.id}" fill="url(#pattern${this.id})" />`
      )
    } else {
      if (
        this.couleurDeRemplissage[0] === '' ||
        this.couleurDeRemplissage[0] === undefined
      ) {
        this.style += ' fill="none" '
      } else {
        this.style += ` fill="${this.couleurDeRemplissage[0]}" `
        this.style += ` fill-opacity="${this.opaciteDeRemplissage}" `
      }
      if (this.opacite !== 1) {
        this.style += ` stroke-opacity="${this.opacite}" `
      }
      return `<polygon points="${this.binomesXY(coeff)}" stroke="${this.color[0]}" ${this.style} id="${this.id}" />`
    }
  }

  tikz() {
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
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
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity=${this.opacite}`)
    }

    if (
      this.couleurDeRemplissage[1] !== '' &&
      this.couleurDeRemplissage[1] !== 'none'
    ) {
      tableauOptions.push(
        `preaction={fill,color = ${this.couleurDeRemplissage[1]}${this.opaciteDeRemplissage !== 1 ? ', opacity = ' + this.opaciteDeRemplissage : ''}}`,
      )
    }

    if (this.hachures) this.hachures = 'dotted'
    if (this.hachures != null && typeof this.hachures === 'string') {
      tableauOptions.push(
        pattern({
          motif: this.hachures,
          id: String(this.id),
          distanceDesHachures: this.distanceDesHachures,
          couleurDesHachures: this.couleurDesHachures[1],
          couleurDeRemplissage: this.couleurDeRemplissage[1],
          opaciteDeRemplissage: this.opaciteDeRemplissage,
        }),
      )
    }
    let optionsDraw = ''
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }

    let binomeXY = ''

    for (const point of this.listePoints) {
      binomeXY += `(${arrondi(point.x)},${arrondi(point.y)})--`
    }
    const lines = `\\draw${optionsDraw} ${binomeXY}cycle;`

    return lines
  }

  svgml(coeff: number, amp: number) {
    let code = ''
    let segmentCourant
    let A, B
    for (let k = 1; k <= this.listePoints.length; k++) {
      B = this.listePoints[k % this.listePoints.length]
      A = this.listePoints[k - 1]
      segmentCourant = segment(A, B, this.stringColor)
      segmentCourant.epaisseur = this.epaisseur
      segmentCourant.opacite = this.opacite
      code += segmentCourant.svgml(coeff, amp)
    }
    return code
  }

  tikzml(amp: number) {
    let code = ''
    let segmentCourant
    let A, B
    for (let k = 1; k <= this.listePoints.length; k++) {
      B = this.listePoints[k % this.listePoints.length]
      A = this.listePoints[k - 1]
      segmentCourant = segment(A, B, this.stringColor)
      segmentCourant.epaisseur = this.epaisseur
      segmentCourant.opacite = this.opacite
      code += '\t' + segmentCourant.tikzml(amp) + '\n'
    }
    return code
  }
}

/**
 * Propriétés possibles : .color, .opacite, .epaisseur, .couleurDeRemplissage, .opaciteDeRemplissage, .hachures (un string correspondant à l'un des motifs de pattern), .distanceDesHachures, .epaisseurDesHachures,.couleurDesHachures
 * @return {Polygone} objet Polygone
 * @example polygone(A,B,C,D,E) //Trace ABCDE
 * @example polygone([A,B,C,D],"blue") // Trace ABCD en bleu
 * @example polygone([A,B,C,D],"#f15929") // Trace ABCD en orange (code couleur HTML : #f15929)
 * @property {PointAbstrait[]} listePoints
 * @property {string[]} color
 * @property {string[]} couleurDeRemplissage
 * @property {string[]} couleurDesHachures
 * @property {number} epaisseurDesHachures
 * @property {number} distanceDesHachures
 * @property {number} opaciteDeRemplissage
 * @property {boolean|string} hachures
 * @property {number[]} bordures
 * @property {string} nom
 * @property {string} id
 * @property {string} style
 * @property {number} opacite
 * @property {number} epaisseur
 * @property {number} pointilles
 *
 * @author Rémi Angot
 */
export function polygone(
  ...args: PointAbstrait[] | [PointAbstrait[], string?]
) {
  return new Polygone(...args)
}

/**
 * Crée un groupe d'objets contenant le polygone et ses sommets
 * @param  {...any} args
 * @return {array} [polygone,sommets]
 * Si le dernier argument est un nombre, celui-ci sera utilisé pour fixer la distance entre le sommet et le label (par défaut 0.5)
 * @exemple [poly, sommets] = polygoneAvecNom(A, B, C, D) // où A, B, C, D sont des objets Point
 */
export function polygoneAvecNom(
  ...args: (PointAbstrait | number)[]
): [Polygone, NommePolygone] {
  let k = 0.5
  if (typeof args[args.length - 1] === 'number') {
    k = Number(args[args.length - 1])
    args.splice(args.length - 1, 1)
  }
  if (!isPointsAbstraits(args)) {
    window.notify(
      'polygoneAvecNom : les arguments doivent être des objets PointAbstrait',
      { args },
    )
    return [polygone(), nommePolygone(polygone())]
  }
  const p = polygone(...args)
  let nom = ''
  args.forEach((el: PointAbstrait) => {
    nom += el.nom + ','
  })
  nom = nom.substring(0, nom.length - 1)
  const sommets = nommePolygone(p, nom, k)
  sommets.bordures = [0, 0, 0, 0]
  sommets.bordures[0] = p.bordures[0] - 1 - k
  sommets.bordures[1] = p.bordures[1] - 1 - k
  sommets.bordures[2] = p.bordures[2] + 1 + k
  sommets.bordures[3] = p.bordures[3] + 1 + k
  return [p, sommets]
}

/**
 * @description en une fois tous les sommets d'un polygone avec le tableau de string fourni
 * attention si on passe un string comme 'ABCD' ça fonctionne aussi...
 * Si on veut des noms de points à plus de 1 caractère, il faut soit les passer en tableau soit les séparer par des virgules au sein du string
 * @example renommePolygone(p, "A',B',C',D'") ou renommePolygone(p, ["A'","B'","C'","D'"])
 */
export function renommePolygone(p: Polygone, noms: string | string[]) {
  noms =
    typeof noms === 'string'
      ? noms.includes(',')
        ? noms.split(',')
        : noms
      : noms
  for (let i = 0; i < p.listePoints.length; i++) {
    if (noms[i] !== undefined) {
      p.listePoints[i].nom = noms[i]
    }
  }
}

/**
 * Trace le polygone régulier direct à n côtés qui a pour côté [AB]
 * Pour tracer le polygone régulier indirect de côté [AB], on iversera A et B
 * @param {Point} A
 * @param {Point} B
 * @param {number} n Nombre de côtés
 * @param {string} [color = 'black'] Couleur de l'arc ou 'none' : du type 'blue' ou du type '#f15929'
 * @return {Polygone}
 * @author Rémi Angot
 **/
export function polygoneRegulier(
  A: Point,
  B: Point,
  n: number,
  color = 'black',
) {
  const listePoints = [A, B]
  for (let i = 1; i < n - 1; i++) {
    listePoints[i + 1] = rotation(
      listePoints[i - 1],
      listePoints[i],
      -180 + 360 / n,
    )
  }
  return new Polygone(listePoints, color)
}

/**
 * Trace un carré
 * @param {Point} A Un sommet du carré
 * @param {Point} B Un sommet du carré, consécutif au précédent
 * @param {string} [color = 'black'] Couleur de l'arc ou 'none' : du type 'blue' ou du type '#f15929'
 * @example carre(M,N)
 *  // Trace le carré noir de sommets consécutifs M et N dans le sens direct
 * @example carre(N,M)
 *  // Trace le carré noir de sommets consécutifs M et N dans le sens indirect
 * @example carre(M,N,'blue')
 *  // Trace le carré bleu de sommets consécutifs M et N dans le sens direct
 * @return {Polygone}
 * @author Rémi Angot
 * JSDOC Validee par EE Juin 2022
 *
 */
export function carre(A: Point, B: Point, color = 'black') {
  return polygoneRegulier(A, B, 4, color)
}

/**
 * polygoneRegulierParCentreEtRayon(O,r,n) //Trace le polygone régulier à n côtés et de rayon r
 * @returns {Polygone} Objet Mathalea2d
 * @author Rémi Angot
 */
export function polygoneRegulierParCentreEtRayon(
  O: Point,
  r: number,
  n: number,
  color = 'black',
) {
  const p = []
  p[0] = point(O.x + r, O.y)
  for (let i = 1; i < n; i++) {
    p[i] = rotation(p[i - 1], O, -360 / n)
  }
  return polygone(p, color)
}

/**
 * Un constructeur de boites rectangulaires.
 * remplace l'objet Mathalea2d Boite()
 * On construit une Boite de base puis on peut
 * Ajouter des couleurs avec la méthode addColor()
 * Ajouter du texte ou du latex dedans avec addTextIn()
 * Enfin, la méthode render() retourne l'objet Mathalea2d ou un array d'objet Mathalea2d pour la fonction mathalea2d()
 * Exemple : const maBoite = new BoiteBuilder({xMin:0, yMin:0, xMax:3, yMax: 2}).addTextIn({textIn: '\\dfrac{1}{2}'}).render()
 */
export class BoiteBuilder {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  forme: Polygone
  text!: LatexParCoordonnees | TexteParPoint | Latex2d
  constructor({
    xMin,
    xMax,
    yMin,
    yMax,
  }: {
    xMin: number
    xMax: number
    yMin: number
    yMax: number
  }) {
    this.xMin = xMin
    this.xMax = xMax
    this.yMin = yMin
    this.yMax = yMax
    this.forme = polygone([
      point(xMin, yMin),
      point(xMax, yMin),
      point(xMax, yMax),
      point(xMin, yMax),
    ])
  }

  /**
   * l'objet ou l'array d'objet pour la fonction mathalea2d()
   * @return {[Polygone|Vide2d,LatexParCoordonnees|TexteParPoint)]|Polygone}
   */
  render() {
    return this.text ? [this.forme, this.text] : this.forme
  }

  /**
   * La méthode retourne l'objet afin de la rendre chaînable
   * @param {Object} params
   * @param {string} [params.color]
   * @param {string} [params.colorBackground]
   * @param {number} [params.opacity]
   * @param {number} [params.backgroudOpacity]
   * @return {BoiteBuilder}
   */
  addColor({
    color,
    colorBackground,
    opacity,
    backgroudOpacity,
  }: {
    color?: string
    colorBackground?: string
    opacity?: number
    backgroudOpacity?: number
  }) {
    this.forme.color = colorToLatexOrHTML(color ?? 'black')
    this.forme.opacite = opacity ?? 1
    this.forme.couleurDeRemplissage = colorToLatexOrHTML(
      colorBackground ?? 'none',
    )
    this.forme.opaciteDeRemplissage = backgroudOpacity ?? 0.7
    return this
  }

  /**
   * La méthode retourne l'objet afin de la rendre chaînable
   * @param {string} textIn si contient '\\' alors c'est une commande latex rendue par latexParCoordonnees()
   * @param {string} color
   * @param {number} opacity
   * @param {number} size (facteur d'agrandissement ou de réduction 1 par défaut)
   * @return {BoiteBuilder}
   */
  addTextIn({
    textIn,
    color,
    opacity,
    size,
  }: {
    textIn: string
    color?: string
    opacity?: number
    size?: number
  }) {
    if (typeof textIn !== 'string') {
      window.notify(
        'BoiteBuilder.addTextIn() requiert un texteIn de type string ',
        { textIn },
      )
    }
    if (textIn.length > 0) {
      this.text = textIn.includes('\\')
        ? latexParCoordonnees(
            textIn,
            (this.xMin + this.xMax) / 2,
            (this.yMin + this.yMax) / 2,
            color ?? 'black',
            50,
            0,
            '',
            (size ?? 1) * 10,
          )
        : texteParPosition(
            textIn,
            (this.xMin + this.xMax) / 2,
            (this.yMin + this.yMax) / 2,
            0,
            color ?? 'black',
            size,
          )
      this.text.opacite = opacity ?? 1
    }
    return this
  }
}

/**
 * @param {Polygone} p
 * @return {number[]} retourne la liste des coordonnées des sommets de p dans un seul tableau.
 * @author Jean-Claude Lhote
 */
export function polygoneToFlatArray(p: Polygone) {
  const flatArray = []
  for (let i = 0; i < p.listePoints.length; i++) {
    flatArray.push(p.listePoints[i].x, p.listePoints[i].y)
  }
  return flatArray
}

/**
 *
 * @param {number[]} [data = []] tableau à une seule dimension (flat array) contenant les coordonnées des sommets (extérieurs et intérieurs) du polygone
 * @param {number[]} [holes = []] tableau à une seule dimension contenant les indices des points qui démarrent un 'trou' dans le tableau data (exemple : holes = [4, 8] indique que les points 4 à 7 définissent un trou ainsi que 8 et suivants, donc les coordonnées 8 à 15 et 16 à ...(ne pas oublier que 1 point = 2 coordonnées))
 * @param {string} [noms = ''] chaine donnant les noms des sommets
 * @param {string} [color = 'black'] couleur du polygone
 * @param {string} [couleurDeRemplissage = ' blue'] la couleur de remplissage
 * @param {string} [couleurDeFond = 'white'] la couleur des trous
 * @class
 */
export class PolygoneATrous extends ObjetMathalea2D {
  _aire: number
  _triangulation: Polygone[]
  contour: Polygone
  trous: Polygone[]
  colorString: string
  triangles: number[]
  data: number[]
  holes: number[]
  stringColor: string
  stringCouleurDeFond: string
  stringCouleurDeRemplissage: string
  constructor({
    data = [],
    holes = [],
    noms = '',
    color = 'black',
    couleurDeRemplissage = 'blue',
    couleurDeFond = 'white',
  }) {
    super()
    this.colorString = color
    this.data = data
    this.holes = holes
    this.triangles = earcut(data, holes) // on crée le pavage de triangles grâce à Mapbox/earcut

    this._triangulation = []
    this._aire = 0
    this.stringColor = color

    const sommetsContour = [] // on crée le polygone extérieur
    for (let i = 0; i < 2 * holes[0]; i += 2) {
      sommetsContour.push(point(data[i], data[i + 1]))
      if (noms.length >= data.length << 1) {
        sommetsContour[i >> 1].nom = noms[i << 1]
      }
    }
    // On cherche les bordures
    for (
      let i = 0, xmin = 1000, xmax = -1000, ymin = 1000, ymax = -1000;
      i < data.length;
      i += 2
    ) {
      xmin = Math.min(xmin, data[i])
      xmax = Math.max(xmax, data[i])
      ymin = Math.min(ymin, data[i + 1])
      ymax = Math.max(ymax, data[i + 1])
      this.bordures = [xmin, ymin, xmax, ymax]
    }
    this.contour = polygone(...sommetsContour)
    this.trous = []
    this.stringCouleurDeRemplissage = couleurDeRemplissage
    this.contour.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
    this.contour.color = colorToLatexOrHTML(this.stringColor)
    this.stringCouleurDeFond = couleurDeFond
    const trous: Point[][] = []
    let trou: Point
    let trouPol: Polygone
    for (let i = 0; i < holes.length; i++) {
      trous[i] = []
      for (
        let j = holes[i] * 2;
        j < (i !== holes.length - 1 ? holes[i + 1] * 2 : data.length);
        j += 2
      ) {
        trou = point(data[j], data[j + 1])
        if (noms.length >= data.length >> 1) {
          trou.nom = noms[j >> 1]
        }
        trous[i].push(trou)
      }
      trouPol = polygone(...trous[i])
      trouPol.color = colorToLatexOrHTML(this.stringColor)
      trouPol.couleurDeRemplissage = colorToLatexOrHTML(
        this.stringCouleurDeFond,
      )
      this.trous.push(trouPol)
    }
  }

  get triangulation(): Polygone[] {
    if (this._triangulation === null) {
      this._triangulation = []
      for (let i = 0, triangle; i < this.triangles.length; i += 3) {
        triangle = polygone([
          point(
            this.data[this.triangles[i] * 2],
            this.data[this.triangles[i] * 2 + 1],
          ),
          point(
            this.data[this.triangles[i + 1] * 2],
            this.data[this.triangles[i + 1] * 2 + 1],
          ),
          point(
            this.data[this.triangles[i + 2] * 2],
            this.data[this.triangles[i + 2] * 2 + 1],
          ),
        ])
        triangle.color = colorToLatexOrHTML(this.stringColor)
        triangle.couleurDeRemplissage = colorToLatexOrHTML('none')
        this._triangulation.push(triangle)
      }
    }
    return this._triangulation
  }

  get aire(): number {
    if (this._aire === null) {
      this._aire = this.contour.aire
      for (let i = 0; i < this.trous.length; i++) {
        this._aire -= this.trous[i].aire
      }
    }
    return this._aire
  }

  svg(coeff: number) {
    let code = this.contour.svg(coeff)
    for (let i = 0; i < this.trous.length; i++) {
      code += this.trous[i].svg(coeff)
    }
    return code
  }

  tikz() {
    let code = this.contour.tikz()
    for (let i = 0; i < this.trous.length; i++) {
      code += '\n\t' + this.trous[i].tikz()
    }
    return code
  }
}

/**
 * Cet objet permet de créer un polygone avec une surface contenant des 'trous' eux-mêmes polygonaux
 * cerise sur le gâteau, la propriété this.triangulation fournit une liste de triangles pavant le polygone
 * @param {number[]} [data = []] contient la liste des coordonnées des sommets (contour puis trous) 2 coordonnées par point dans l'ordre abscisse, ordonnée
 * @param {number[]}  [holes = []] tableau à une seule dimension contenant les indices des points qui démarrent un 'trou' dans le tableau data (exemple : holes = [4, 8] indique que les points 4 à 7 définissent un trou ainsi que 8 et suivants, donc les coordonnées 8 à 15 et 16 à ...(ne pas oublier que 1 point = 2 coordonnées))
 * @param {string} [noms = ''] contient les noms des sommets
 * @param {string} [color = 'black'] est la couleur des bords
 * @param {string} [couleurDeRemplissage = 'blue'] est la couleur de la surface
 * @param {string} [couleurDeFond = 'white'] est la couleur de remplissage des trous
 * @return {PolygoneaTrou} un polygone à trous (ou pas : il peut ne pas y avoir de trou !)
 */
export function polygoneATrous({
  data = [],
  holes = [],
  noms = '',
  color = 'black',
  couleurDeRemplissage = 'blue',
  couleurDeFond = 'white',
}) {
  return new PolygoneATrous({
    data,
    holes,
    noms,
    color,
    couleurDeRemplissage,
    couleurDeFond,
  })
}

/*********************************************/
/**
 * fonction qui retourne le parallélogramme ABCD dont on donne les 3 premiers points A, B et C
 *
 * @param {string} nom
 * @param {Point} A
 * @param {Point} B
 * @param {Point} C
 * @return {PolygoneAvecNom}
 */
export function parallelogramme3points(
  nom: string,
  A: Point,
  B: Point,
  C: Point,
) {
  const D = translation(A, vecteur(B, C), nom[3])
  A.nom = nom[0]
  B.nom = nom[1]
  C.nom = nom[2]
  return polygoneAvecNom(A, B, C, D)
}

/**
 * parallelogramme2points1hauteur(A,B,5) renvoie un parallélogramme ABCD de base [AB] et de hauteur h
 * parallelogramme2points1hauteur(A,7,5) renvoie un parallélogramme ABCD de base 7cm (le point B est choisi sur le cercle de centre A et de rayon 7cm) et de hauteur h
 *
 * @param {String} nom
 * @param {objet} A
 * @param {objet} B
 * @param {number} h
 * @return {PolygoneAvecNom}
 */
export function parallelogramme2points1hauteur(
  nom: string,
  A: Point,
  B: Point,
  h: number,
) {
  if (typeof B === 'number') {
    B = pointAdistance(A, B, randint(-180, 180))
  }
  A.nom = nom[0]
  B.nom = nom[1]
  let H = rotation(B, A, 90)
  H = pointSurSegment(A, H, h)
  const D = translation(
    H,
    homothetie(
      vecteur(A, B),
      A,
      randint(-5, 5, rangeMinMax(-2, 2)) / 10,
    ) as Vecteur,
    nom[3],
  )
  const C = translation(D, vecteur(A, B), nom[2])
  return polygoneAvecNom(A, B, C, D)
}

/**
 * Construit un rectangle à partir d'un point A et de deux longueurs
 * @param {Point} A
 * @param {number} longueur
 * @param {number} largeur
 * @param {object} options
 * @param {string} [options.nom] noms des sommets
 * @param {number} [options.angleRotation] angle de rotation du rectangle
 * @return {PolygoneAvecNom}
 * @example rectangle1Point2Longueurs(A, 5, 3)
 * @example rectangle1Point2Longueurs(A, 5, 3, { nom: 'ABCD' })
 * @example rectangle1Point2Longueurs(A, 5, 3, { angleRotation: 45 })
 * @example rectangle1Point2Longueurs(A, 5, 3, { nom: 'ABCD', angleRotation: 45 })
 * @author Guillaume Valmont d'après 6M11 d'Eric Elter
 */
export function rectangle1Point2Longueurs(
  A: Point,
  longueur: number,
  largeur: number,
  options: {
    nom?: string
    angleRotation?: number
    avecCodageSegments?: boolean
    avecCodagesAnglesDroits?: boolean
  } = { avecCodageSegments: true, avecCodagesAnglesDroits: true },
) {
  const objets: ObjetMathalea2D[] = []
  const angleRotation = options.angleRotation ?? 0
  const B = pointAdistance(A, longueur, angleRotation)
  const C = rotation(pointAdistance(B, largeur, 180 + angleRotation), B, -90)
  const D = rotation(pointAdistance(A, largeur, angleRotation), A, 90)
  if (options.nom) {
    A.nom = options.nom[0]
    B.nom = options.nom[1]
    C.nom = options.nom[2]
    D.nom = options.nom[3]
  } else {
    const numA = randint(1, 26)
    const numB = randint(1, 26, [numA])
    const numC = randint(1, 26, [numA, numB])
    const numD = randint(1, 26, [numA, numB, numC])
    A.nom = lettreDepuisChiffre(numA)
    B.nom = lettreDepuisChiffre(numB)
    C.nom = lettreDepuisChiffre(numC)
    D.nom = lettreDepuisChiffre(numD)
  }
  objets.push(...polygoneAvecNom(A, B, C, D))
  if (options.avecCodageSegments || options.avecCodageSegments === undefined) {
    // Lorsqu'un objet d'options est passé, le avecCodageSegments: true par défaut est écrasé donc s'il n'est pas redéfini en false, on le considère comme true
    objets.push(
      codageSegments('/', 'red', B, C, D, A),
      codageSegments('||', 'blue', A, B, C, D),
    )
  }
  if (
    options.avecCodagesAnglesDroits ||
    options.avecCodagesAnglesDroits === undefined
  ) {
    // Lorsqu'un objet d'options est passé, le avecCodagesAnglesDroits: true par défaut est écrasé donc s'il n'est pas redéfini en false, on le considère comme true
    objets.push(
      codageAngleDroit(A, B, C),
      codageAngleDroit(D, C, B),
      codageAngleDroit(A, D, C),
      codageAngleDroit(B, A, D),
    )
  }
  return objets
}

/**
 * @description Place les labels passés dans le deuxième paramètre aux sommets du polygone en les plaçant alignés avec le barycentre du polygone à une distance fixée du point
 * @description Si les noms peuvent avoir plusieurs caractères, il faudra ajouter des virgules entre chaque nom dans le string passé en argument.
 * @example nommePolygone (p, "A',B',C',D',E'", 0.5, 'red')
 * @example nommePolygone (p,'ABCDE',0.5,'red') nomme les sommets du polygone A, B, C, D et E. Les labels sont placés à une distance de 0,5 cm des sommets
 * @author Jean-Claude Lhote
 */
export class NommePolygone extends ObjetMathalea2D {
  poly: Polygone
  dist: number
  constructor(p: Polygone, nom = '', k = 0.5, color = 'black', size = 1) {
    super()
    this.poly = p
    this.dist = k
    this.objets = []
    const noms = nom.includes(',') ? nom.split(',') : nom
    for (let i = 0; i < p.listePoints.length; i++) {
      if (noms.length > 0) p.listePoints[i].nom = noms[i]
    }
    const G = barycentre(p)
    let xMin = 1000
    let xMax = -1000
    let yMin = 1000
    let yMax = -1000
    for (const pt of p.listePoints) {
      const P = pointSurSegment(
        G,
        pt,
        longueur(G, pt) +
          (context.isHtml ? (k * 20) / context.pixelsParCm : k / context.scale),
      )
      P.positionLabel = 'center'
      this.objets.push(texteParPoint(pt.nom, P, 0, color, size, 'milieu', true))
      xMin = Math.min(xMin, P.x - 0.5)
      xMax = Math.max(xMax, P.x + 0.5)
      yMin = Math.min(yMin, P.y - 0.5)
      yMax = Math.max(yMax, P.y + 0.5)
    }
    this.bordures = [xMin, yMin, xMax, yMax]
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

export function nommePolygone(
  p: Polygone,
  nom = '',
  k = 0.5,
  color = 'black',
  size = 1,
) {
  return new NommePolygone(p, nom, k, color, size)
}

/**
 *
 * @param {number} index Choix du motif
 * le nom du motif sert dans la fonction pattern
 * @author Jean-Claude Lhote
 */
export function motifs(index: number) {
  switch (index) {
    case 0:
      return 'north east lines'
    case 1:
      return 'horizontal lines'
    case 2:
      return 'vertical lines'
    case 3:
      return 'dots'
    case 4:
      return 'crosshatch dots'
    case 5:
      return 'fivepointed stars'
    case 6:
      return 'sixpointed stars'
    case 7:
      return 'bricks'
    case 8:
      return 'checkerboard'
    case 9:
      return 'grid'
    case 10:
      return 'crosshatch'
    default:
      return 'north east lines'
  }
}

/**
 * Génère du code TikZ pour dessiner un motif de hachures personnalisé dans un rectangle.
 *
 * @param params - Objet contenant les paramètres de dessin.
 * @param params.x0 - Coordonnée x du coin inférieur gauche.
 * @param params.y0 - Coordonnée y du coin inférieur gauche.
 * @param params.x1 - Coordonnée x du coin supérieur droit.
 * @param params.y1 - Coordonnée y du coin supérieur droit.
 * @param params.distanceDesHachures - Espacement entre les éléments du motif (hachures, points...).
 * @param params.couleurDesHachures - Couleur utilisée pour dessiner le motif.
 * @param params.motif - Type de motif à dessiner. Valeurs possibles :
 *   - "north east lines" : lignes diagonales à 45°
 *   - "horizontal lines" : hachures horizontales
 *   - "vertical lines" : hachures verticales
 *   - "dots" : points réguliers (taille fixe ~0.05cm)
 *   - "crosshatch" : superposition de hachures horizontales et verticales
 *   - "grid" : identique à "crosshatch"
 *   - "checkerboard" : damier avec des carrés de côté `distanceDesHachures`
 *   - "crosshatch dots" : grille de points superposée à un quadrillage
 *   - "fivepointed stars" : étoiles à 5 branches disposées en grille.
 *       → Modifier `minimum size` dans le code pour ajuster la taille des étoiles (par défaut : 5pt)
 *   - "sixpointed stars" : étoiles à 6 branches, même principe que ci-dessus.
 *       → Modifier `minimum size` ou `star point ratio` pour ajuster style/taille
 *   - "bricks" : motif de briques horizontales décalées.
 *       → La largeur est `2 × distanceDesHachures` et la hauteur est `distanceDesHachures`
 *       → Pour des briques plus grandes, augmenter `distanceDesHachures`
 *
 * @author Eric Elter
 * @returns Une chaîne contenant le code TikZ généré, ou une chaîne vide si le motif est inconnu.
 *
 * @deprecated Cette fonction n'est pas recommandée pour créer des motifs au sein d'une surface quelconque en tikz
 * car elle ne fait qu'une surface rectangulaire et le fait en ajoutant un clip et un code très long.
 * Le même résultat (hachures, points, étoiles...) peut être obtenu la propriété hachures de l'objet Polygone.
 * les hachures sont gérées par la fonction pattern() et retourne une option pour la commande draw qui est plus efficace.
 * Il est donc préférable d'utiliser la propriété hachures des objets Polygone. (Jean-Claude Lhote)
 */
export function patternTikZ(params: {
  x0: number
  y0: number
  x1: number
  y1: number
  distanceDesHachures: number
  couleurDesHachures: string
  motif: string
}): string {
  const { x0, y0, x1, y1, distanceDesHachures, couleurDesHachures, motif } =
    params

  const lignes: string[] = []
  const hauteur = y1 - y0

  lignes.push('\\begin{scope}')
  lignes.push(`\\clip (${x0},${y0}) rectangle (${x1},${y1});`)

  switch (motif) {
    case 'horizontal lines': {
      for (let y = y0; y <= y1; y += distanceDesHachures) {
        lignes.push(
          `\\draw[${couleurDesHachures}] (${x0},${y.toFixed(2)}) -- (${x1},${y.toFixed(2)});`,
        )
      }
      break
    }

    case 'vertical lines': {
      for (let x = x0; x <= x1; x += distanceDesHachures) {
        lignes.push(
          `\\draw[${couleurDesHachures}] (${x.toFixed(2)},${y0}) -- (${x.toFixed(2)},${y1});`,
        )
      }
      break
    }

    case 'dots': {
      for (let x = x0; x <= x1; x += distanceDesHachures) {
        for (let y = y0; y <= y1; y += distanceDesHachures) {
          lignes.push(
            `\\fill[${couleurDesHachures}] (${x.toFixed(2)},${y.toFixed(2)}) circle (0.05);`,
          )
        }
      }
      break
    }

    case 'crosshatch': {
      // Combine horizontal + vertical
      for (let y = y0; y <= y1; y += distanceDesHachures) {
        lignes.push(
          `\\draw[${couleurDesHachures}] (${x0},${y.toFixed(2)}) -- (${x1},${y.toFixed(2)});`,
        )
      }
      for (let x = x0; x <= x1; x += distanceDesHachures) {
        lignes.push(
          `\\draw[${couleurDesHachures}] (${x.toFixed(2)},${y0}) -- (${x.toFixed(2)},${y1});`,
        )
      }
      break
    }

    case 'grid': {
      // Quadrillage = idem crosshatch
      const side = distanceDesHachures / 5
      for (let y = y0; y <= y1; y += side) {
        lignes.push(
          `\\draw[${couleurDesHachures}] (${x0},${y.toFixed(2)}) -- (${x1},${y.toFixed(2)});`,
        )
      }
      for (let x = x0; x <= x1; x += side) {
        lignes.push(
          `\\draw[${couleurDesHachures}] (${x.toFixed(2)},${y0}) -- (${x.toFixed(2)},${y1});`,
        )
      }
      break
    }

    case 'checkerboard': {
      const side = distanceDesHachures / 3
      let toggle = false
      for (let y = y0; y < y1; y += side) {
        toggle = !toggle
        for (let x = x0 + (toggle ? 0 : side); x < x1; x += 2 * side) {
          lignes.push(
            `\\fill[${couleurDesHachures}] (${x.toFixed(2)},${y.toFixed(2)}) rectangle (${(x + side).toFixed(2)},${(y + side).toFixed(2)});`,
          )
        }
      }
      break
    }

    case 'fivepointed stars': {
      const side = distanceDesHachures / 3
      for (let x = x0; x <= x1; x += side) {
        for (let y = y0; y <= y1; y += side) {
          lignes.push(
            `\\node[star,star points=5,star point ratio=2.25,fill=${couleurDesHachures},inner sep=0pt,minimum size=5pt] at (${x.toFixed(2)},${y.toFixed(2)}) {};`,
          )
        }
      }
      break
    }

    case 'sixpointed stars': {
      const side = distanceDesHachures / 2
      for (let x = x0; x <= x1; x += side) {
        for (let y = y0; y <= y1; y += side) {
          lignes.push(
            `\\node[star,star points=6,star point ratio=2.25,fill=${couleurDesHachures},inner sep=0pt,minimum size=5pt] at (${x.toFixed(2)},${y.toFixed(2)}) {};`,
          )
        }
      }
      break
    }

    case 'crosshatch dots': {
      // Grille de points
      const side = distanceDesHachures / 5
      for (let x = x0; x <= x1; x += side) {
        for (let y = y0; y <= y1; y += side) {
          lignes.push(
            `\\fill[${couleurDesHachures}] (${x.toFixed(2)},${y.toFixed(2)}) circle (0.05);`,
          )
        }
      }
      // Hachures horizontales
      for (let y = y0; y <= y1; y += distanceDesHachures) {
        lignes.push(
          `\\draw[${couleurDesHachures}] (${x0},${y.toFixed(2)}) -- (${x1},${y.toFixed(2)});`,
        )
      }
      // Hachures verticales
      for (let x = x0; x <= x1; x += distanceDesHachures) {
        lignes.push(
          `\\draw[${couleurDesHachures}] (${x.toFixed(2)},${y0}) -- (${x.toFixed(2)},${y1});`,
        )
      }
      break
    }

    case 'bricks': {
      const brickWidth = distanceDesHachures * 2
      const brickHeight = distanceDesHachures
      for (let y = y0; y < y1; y += brickHeight) {
        const isOddRow = Math.floor((y - y0) / brickHeight) % 2 === 1
        const xStart = isOddRow ? x0 - brickWidth / 2 : x0
        for (let x = xStart; x < x1; x += brickWidth) {
          const xLeft = Math.max(x, x0)
          const xRight = Math.min(x + brickWidth, x1)
          const yTop = Math.min(y + brickHeight, y1)
          if (xRight > x0 && xLeft < x1) {
            lignes.push(
              `\\draw(${xLeft.toFixed(2)},${y.toFixed(2)}) rectangle (${xRight.toFixed(2)},${yTop.toFixed(2)});`,
            )
          }
        }
      }
      break
    }

    case 'north east lines':
    default: {
      const xmin = x0 - hauteur
      const xmax = x1 + hauteur
      for (let x = xmin; x <= xmax; x += distanceDesHachures) {
        lignes.push(
          `\\draw[${couleurDesHachures}] (${x.toFixed(2)},${y0}) -- ++(${hauteur},${hauteur});`,
        )
      }
      break
    }
  }

  lignes.push('\\end{scope};')
  return lignes.join('\n')
}

/**
 *
 * @param {object} param0 paramètres de définition du motif de remplissage
 * définit un motif de remplissage pour les polygones, les rectangles... ou tout élément SVG qui se remplit.
 * @author Jean-Claude Lhote
 */
export function pattern({
  motif = 'north east lines',
  id = '0',
  distanceDesHachures = 10,
  epaisseurDesHachures = 1,
  couleurDesHachures = 'black',
  couleurDeRemplissage = 'none',
  opaciteDeRemplissage = 0.5,
}) {
  let myPattern = ''
  if (context.isHtml) {
    if (couleurDeRemplissage.length < 1) {
      couleurDeRemplissage = 'none'
    }
    switch (motif) {
      case 'north east lines':
        myPattern += `<pattern id="pattern${id}" width="${distanceDesHachures}" height="${distanceDesHachures}"  patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="${distanceDesHachures}" height="${distanceDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
            <line x1="0" y1="0" x2="0" y2="${distanceDesHachures}" style="stroke:${couleurDesHachures}; stroke-width:${epaisseurDesHachures}" />
            </pattern>`
        break
      case 'horizontal lines':
        myPattern += `<pattern id="pattern${id}" width="${distanceDesHachures}" height="${distanceDesHachures}"  patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="${distanceDesHachures}" height="${distanceDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
            <line x1="0" y1="${distanceDesHachures / 2}" x2="${distanceDesHachures}" y2="${distanceDesHachures / 2}" style="stroke:${couleurDesHachures}; stroke-width:${epaisseurDesHachures}" />
            </pattern>`
        break
      case 'vertical lines':
        myPattern += `<pattern id="pattern${id}" width="${distanceDesHachures}" height="${distanceDesHachures}"  patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="${distanceDesHachures}" height="${distanceDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
            <line x1="0" y1="0" x2="0" y2="${distanceDesHachures}" style="stroke:${couleurDesHachures}; stroke-width:${epaisseurDesHachures}" />
            </pattern>`
        break
      case 'dots':
        myPattern += `<pattern id="pattern${id}" width="${distanceDesHachures}" height="${distanceDesHachures}"  patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="${epaisseurDesHachures}" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
            <circle cx="8" cy="3" r="${epaisseurDesHachures}" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
            <circle cx="3" cy="8" r="${epaisseurDesHachures}" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
            <circle cx="8" cy="8" r="${epaisseurDesHachures}" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
            </pattern>`
        break
      case 'crosshatch dots':
        myPattern += `<pattern id="pattern${id}" width="12" height="12" x="12" y="12" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="${epaisseurDesHachures}" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="8" cy="2" r="${epaisseurDesHachures}" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="5" cy="5" r="${epaisseurDesHachures}" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="2" cy="8" r="${epaisseurDesHachures}" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="8" cy="8" r="${epaisseurDesHachures}" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="5" cy="11" r="${epaisseurDesHachures}" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="11" cy="5" r="${epaisseurDesHachures}" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          <circle cx="11" cy="11" r="${epaisseurDesHachures}" fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}"/>
          </pattern>`
        break
      case 'fivepointed stars':
        myPattern += `<pattern id="pattern${id}" width="12" height="12" x="10" y="10" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <polygon points="10,5 6.2,4.2 6.6,0.2 4.6,3.6 1,2 3.6,5 1,8 4.6,6.4 6.6,9.8 6.2,5.8 " stroke="${couleurDesHachures}"  fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}" />
          </pattern>`
        break
      case 'sixpointed stars':
        myPattern += `<pattern id="pattern${id}"  width="12" height="12" x="10" y="10" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
        <polygon points="10,5 7.6,3.4 7.6,0.6 5,2 2.6,0.6 2.4,3.4 0,5 2.4,6.4 2.6,9.4 5,8 7.6,9.4 7.6,6.4 " stroke="${couleurDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}" />
        </pattern>`
        break
      case 'crosshatch':
        myPattern += `<pattern id="pattern${id}" width="12" height="12" x="10" y="10" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <polygon points="2,2 7.6,7.6 7,8.4 9.8,8.4 9.8,5.6 9,6.2 3.4,0.6 " stroke="${couleurDesHachures}"  fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}" />
          </pattern>`
        break
      case 'bricks':
        myPattern += `<pattern id="pattern${id}" width="18" height="16" x="18" y="16" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <line x1="4" y1="2" x2="4" y2="4" stroke="${couleurDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"  />
          <line x1="0" y1="4" x2="16" y2="4" stroke="${couleurDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"   />
          <line x1="14" y1="4" x2="14" y2="12" stroke="${couleurDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"   />
          <line x1="16" y1="12" x2="0" y2="12" stroke="${couleurDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"   />
          <line x1="4" y1="12" x2="4" y2="16" stroke="${couleurDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"   />
          </pattern>`
        break
      case 'grid':
        myPattern += `<pattern id="pattern${id}" width="10" height="10" x="10" y="10" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <polyline points="8,8 0,8 0,0 " fill="none" stroke="${couleurDesHachures}" />
          </pattern>`
        break
      case 'checkerboard':
        myPattern += `<pattern id="pattern${id}" width="8" height="8" x="8" y="8" patternTransform="rotate(0 0 0)" patternUnits="userSpaceOnUse">
          <polygon points="4,4 8,4 8,0 4,0 "  fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}" />
          <polygon points="0,4 4,4 4,8 0,8 "  fill="${couleurDesHachures}" fill-opacity="${opaciteDeRemplissage}" />
        
          </pattern>`
        break
      default:
        myPattern += `<pattern id="pattern${id}" width="${distanceDesHachures}" height="${distanceDesHachures}"  patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="${distanceDesHachures}" height="${distanceDesHachures}" fill="${couleurDeRemplissage}" fill-opacity="${opaciteDeRemplissage}"/>
        <line x1="0" y1="0" x2="0" y2="${distanceDesHachures}" style="stroke:${couleurDesHachures}; stroke-width:${epaisseurDesHachures}" />
        </pattern>`
        break
    }
    return myPattern
  } else if (context.issortieNB) {
    switch (motif) {
      case 'north east lines':
        myPattern = `pattern = {Lines[angle=45, distance=${distanceDesHachures}pt, line width=0.3pt]}`
        break
      case 'horizontal lines':
        myPattern = `pattern = {Lines[angle=0, distance=${distanceDesHachures}pt, line width=0.3pt]}`
        break
      case 'vertical lines':
        myPattern = `pattern = {Lines[angle=90, distance=${distanceDesHachures}pt, line width=0.3pt]}`
        break
      case 'dots':
        myPattern = `pattern = ${motif}`
        break
      case 'crosshatch dots':
        myPattern = `pattern = ${motif}`
        break
      case 'fivepointed stars':
        myPattern = `pattern = ${motif}`
        break
      case 'sixpointed stars':
        myPattern = `pattern = ${motif}`
        break
      case 'crosshatch':
        myPattern = `pattern = ${motif}`
        break
      case 'bricks':
        myPattern = `pattern = ${motif}`
        break
      case 'grid':
        myPattern = `pattern = ${motif}`
        break
      case 'checkerboard':
        myPattern = `pattern = ${motif}`
        break
      default:
        myPattern = `pattern = {Lines[angle=45, distance=${distanceDesHachures}pt, line width=0.3pt]}`
        break
    }
    return myPattern
  } else {
    // Sortie Latex
    switch (motif) {
      case 'north east lines':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = {Lines[angle=45, distance=${distanceDesHachures}pt, line width=0.3pt]}`
        break
      case 'horizontal lines':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = {Lines[angle=0, distance=${distanceDesHachures}pt, line width=0.3pt]}`
        break
      case 'vertical lines':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = {Lines[angle=90, distance=${distanceDesHachures}pt, line width=0.3pt]}`
        break
      case 'dots':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'crosshatch dots':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'fivepointed stars':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'sixpointed stars':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'crosshatch':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'bricks':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'grid':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      case 'checkerboard':
        myPattern = `pattern color = ${couleurDesHachures} , pattern = ${motif}`
        break
      default:
        myPattern = `pattern color = ${couleurDesHachures} , pattern = {Lines[angle=45, distance=${distanceDesHachures}pt, line width=0.3pt]}`
        break
    }
    return `${myPattern}`
  }
}
/**
 * fonction utilitaire pour la classe Tetris
 * Détermine si deux points sont ceux d'un couple de points (dans l'ordre ou pas)
 * @param {Point} pt1
 * @param {Point} pt2
 * @param {[Point,Point]} couple
 * @returns {boolean}
 * @author Jean-Claude Lhote
 */
function trouveCouple(
  pt1: { x: number; y: number },
  pt2: { x: number; y: number },
  couple: [{ x: number; y: number }, { x: number; y: number }],
) {
  return (
    (pt1.x === couple[0].x &&
      pt1.y === couple[0].y &&
      pt2.x === couple[1].x &&
      pt2.y === couple[1].y) ||
    (pt1.x === couple[1].x &&
      pt1.y === couple[1].y &&
      pt2.x === couple[0].x &&
      pt2.y === couple[0].y)
  )
}
/**
 * fonction utilitaire pour la classe Tetris
 * @description Détermine si le point passé en paramètre est l'un des deux points d'un couple de points
 * @description Si c'est le cas, il renvoie le couple de points et la liste des couples restants après avoir supprimé le couple trouvé
 * @param {Point} pt1
 * @param {[Point,Point][]} couplesPoints
 * @returns
 */
function TrouveExtremites(
  pt1: { x: number; y: number },
  couplesPoints: [{ x: number; y: number }, { x: number; y: number }][],
) {
  const index = couplesPoints.findIndex(
    (couple: [{ x: number; y: number }, { x: number; y: number }]) =>
      (couple[0].x === pt1.x && couple[0].y === pt1.y) ||
      (couple[1].x === pt1.x && couple[1].y === pt1.y),
  )
  if (index !== -1) {
    const couple = couplesPoints[index]
    couplesPoints.splice(index, 1)
    if (couple[0].x === pt1.x && couple[0].y === pt1.y) {
      return {
        couple: [
          { x: couple[0].x, y: couple[0].y },
          { x: couple[1].x, y: couple[1].y },
        ],
        couplesPointsRestants: couplesPoints,
      }
    } else {
      return {
        couple: [
          { x: couple[1].x, y: couple[1].y },
          { x: couple[0].x, y: couple[0].y },
        ],
        couplesPointsRestants: couplesPoints,
      }
    }
  } else {
    return { couple: null, couplesPointsRestants: couplesPoints }
  }
}
/**
 * Classe Tetris
 * @description Cette classe permet de créer un pavage de carrés de surface aire
 * On crée une instance de la classe en lui donnant son aire et les coordonnées de l'origine (coin en bas à gauche du rectangle contenant son polygone)
 * Il faut savoir que les carresOccupes et les carresAdjacentDispo sont définis à partir du point (0;0), le polygone, lui, est translaté en (xOrigine; yOrigine).
 * sa propriété poly donne le polygone de la forme
 * sa méthode render retourne un array contenant toutes les cases carrées
 */
export class Polyquad {
  xOrigine: number
  yOrigine: number
  poly!: Polygone
  dots!: { x: number; y: number }[]
  carresOccupes: { x: number; y: number }[]
  carresAdjacentsDispo: { x: number; y: number }[]
  complexity: number
  rectangle: {
    xMin: number
    xMax: number
    yMin: number
    yMax: number
  }

  constructor(aire: number, xOrigine: number, yOrigine: number) {
    this.xOrigine = xOrigine
    this.yOrigine = yOrigine
    const casesAdjacentes = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 },
    ]
    // on crée un polygone à base de carrés de surface aire

    let cpt = 0
    let aireTotale = 0
    let aireExt = 0
    do {
      this.carresOccupes = [{ x: 0, y: 0 }]
      cpt++
      this.carresAdjacentsDispo = casesAdjacentes.map((caseAdj) => ({
        x: caseAdj.x,
        y: caseAdj.y,
      }))
      while (this.carresOccupes.length < aire) {
        const index = randint(0, this.carresAdjacentsDispo.length - 1) // On choisit une case adjacente disponible
        const carreChoisi = this.carresAdjacentsDispo[index] // La voilà
        this.carresAdjacentsDispo.splice(index, 1) // On supprime la case choisie des cases adjacentes disponibles
        this.carresOccupes.push({ x: carreChoisi.x, y: carreChoisi.y }) // Elle devient une case occupée
        for (const caseAdj of casesAdjacentes) {
          const caseAdjDispo = {
            x: carreChoisi.x + caseAdj.x,
            y: carreChoisi.y + caseAdj.y,
          }
          if (
            this.carresOccupes.find(
              (caseOccupe) =>
                caseAdjDispo.x === caseOccupe.x &&
                caseAdjDispo.y === caseOccupe.y,
            ) == null
          ) {
            if (
              this.carresAdjacentsDispo.find(
                (caseAdjDispoTrouvee) =>
                  caseAdjDispo.x === caseAdjDispoTrouvee.x &&
                  caseAdjDispo.y === caseAdjDispoTrouvee.y,
              ) == null
            ) {
              this.carresAdjacentsDispo.push(caseAdjDispo)
            }
          }
        }
      }

      this.rectangle = this.findRectangle()
      aireTotale =
        (this.rectangle.xMax - this.rectangle.xMin) *
        (this.rectangle.yMax - this.rectangle.yMin)
      aireExt = this.aireExt()

      this.translate(-this.rectangle.xMin, -this.rectangle.yMin)
      // permet de renseigner this.dots (la liste des sommets.)
      this.detoure()
    } while (aireTotale - aireExt !== aire && cpt < 100)
    this.complexity = aireExt / aireTotale

    this.poly = translation(
      polygone(
        this.dots.map((el: { x: number; y: number }) => point(el.x, el.y)),
      ),
      vecteur(xOrigine, yOrigine),
    )
    this.poly.color = colorToLatexOrHTML('red')
    this.poly.couleurDeRemplissage = colorToLatexOrHTML('orange')
    this.poly.epaisseur = 2
  }

  ajouteCarres(n: number): Polyquad {
    let cpt = 0
    let aireTotale = 0
    let aireExt = 0
    const casesAdjacentes = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 },
    ]
    const aire = this.carresOccupes.length + n
    let carresOccupes
    let casesAdjacentesDispo
    const tetris2 = new Polyquad(aire, this.xOrigine, this.yOrigine)
    do {
      carresOccupes = JSON.parse(JSON.stringify(this.carresOccupes))
      casesAdjacentesDispo = JSON.parse(
        JSON.stringify(this.carresAdjacentsDispo),
      )
      cpt++
      while (carresOccupes.length < aire) {
        const index = randint(0, casesAdjacentesDispo.length - 1) // On choisit une case adjacente disponible
        const carreChoisi = casesAdjacentesDispo[index] // La voilà
        casesAdjacentesDispo.splice(index, 1) // On supprime la case choisie des cases adjacentes disponibles
        carresOccupes.push({ x: carreChoisi.x, y: carreChoisi.y }) // Elle devient une case occupée
        for (const caseAdj of casesAdjacentes) {
          const caseAdjDispo = {
            x: carreChoisi.x + caseAdj.x,
            y: carreChoisi.y + caseAdj.y,
          }
          if (
            carresOccupes.find(
              (caseOccupe: { x: number; y: number }) =>
                caseAdjDispo.x === caseOccupe.x &&
                caseAdjDispo.y === caseOccupe.y,
            ) == null
          ) {
            if (
              casesAdjacentesDispo.find(
                (caseAdjDispoTrouvee: { x: number; y: number }) =>
                  caseAdjDispo.x === caseAdjDispoTrouvee.x &&
                  caseAdjDispo.y === caseAdjDispoTrouvee.y,
              ) == null
            ) {
              casesAdjacentesDispo.push(caseAdjDispo)
            }
          }
        }
      }
      tetris2.carresOccupes = JSON.parse(JSON.stringify(carresOccupes))
      tetris2.carresAdjacentsDispo = JSON.parse(
        JSON.stringify(casesAdjacentesDispo),
      )
      tetris2.rectangle = tetris2.findRectangle()
      aireTotale =
        (tetris2.rectangle.xMax - tetris2.rectangle.xMin) *
        (tetris2.rectangle.yMax - tetris2.rectangle.yMin)
      aireExt = tetris2.aireExt()

      tetris2.translate(-tetris2.rectangle.xMin, -tetris2.rectangle.yMin)
      // permet de renseigner this.dots (la liste des sommets)
      tetris2.detoure()
    } while (aireTotale - aireExt !== aire && cpt < 100)
    tetris2.carresOccupes = JSON.parse(JSON.stringify(carresOccupes))
    tetris2.carresAdjacentsDispo = JSON.parse(
      JSON.stringify(casesAdjacentesDispo),
    )
    tetris2.complexity = aireExt / aireTotale

    tetris2.poly = translation(
      polygone(
        tetris2.dots.map((el: { x: number; y: number }) => point(el.x, el.y)),
      ),
      vecteur(tetris2.xOrigine, tetris2.yOrigine),
    )
    tetris2.poly.color = colorToLatexOrHTML('red')
    tetris2.poly.couleurDeRemplissage = colorToLatexOrHTML('orange')
    tetris2.poly.epaisseur = 2
    return tetris2
  }

  private findRectangle() {
    let xMin = 1000
    let xMax = -1000
    let yMin = 1000
    let yMax = -1000
    for (const carre of this.carresOccupes) {
      xMin = Math.min(xMin, carre.x)
      xMax = Math.max(xMax, carre.x + 1)
      yMin = Math.min(yMin, carre.y)
      yMax = Math.max(yMax, carre.y + 1)
    }
    return { xMin, xMax, yMin, yMax }
  }

  translate(dx: number, dy: number) {
    for (const carre of this.carresOccupes) {
      carre.x += dx
      carre.y += dy
    }
    for (const carre of this.carresAdjacentsDispo) {
      carre.x += dx
      carre.y += dy
    }
    this.rectangle = {
      xMin: this.rectangle.xMin + dx,
      xMax: this.rectangle.xMax + dx,
      yMin: this.rectangle.yMin + dy,
      yMax: this.rectangle.yMax + dy,
    }
  }

  rotate(sens: boolean) {
    const matriceTransfo = sens
      ? [
          [0, -1],
          [1, 0],
        ]
      : [
          [0, 1],
          [-1, 0],
        ]
    if (matriceTransfo == null)
      throw Error('La matrice ne peut pas être créée, ce qui est impossible')
    for (const carre of this.carresOccupes) {
      const x = matriceTransfo[0][0] * carre.x + matriceTransfo[0][1] * carre.y
      const y = matriceTransfo[1][0] * carre.x + matriceTransfo[1][1] * carre.y
      carre.x = x
      carre.y = y
    }
    for (const carre of this.carresAdjacentsDispo) {
      const x = matriceTransfo[0][0] * carre.x + matriceTransfo[0][1] * carre.y
      const y = matriceTransfo[1][0] * carre.x + matriceTransfo[1][1] * carre.y
      carre.x = x
      carre.y = y
    }
    this.rectangle = this.findRectangle()
    this.translate(-this.rectangle.xMin, -this.rectangle.yMin)
    // permet de renseigner this.dots (la liste des sommets.)
    this.detoure()

    this.poly = translation(
      polygone(
        this.dots.map((el: { x: number; y: number }) => point(el.x, el.y)),
      ),
      vecteur(this.xOrigine, this.yOrigine),
    )
    this.poly.color = colorToLatexOrHTML('red')
    this.poly.couleurDeRemplissage = colorToLatexOrHTML('orange')
    this.poly.epaisseur = 2
  }

  isEmpty(x: number, y: number) {
    return (
      this.carresOccupes.find((carre) => carre.x === x && carre.y === y) == null
    )
  }

  aireExt() {
    let aire = 0
    const xMin = Math.min(...this.carresOccupes.map((carre) => carre.x))
    const xMax = Math.max(...this.carresOccupes.map((carre) => carre.x))
    const yMin = Math.min(...this.carresOccupes.map((carre) => carre.y))
    const yMax = Math.max(...this.carresOccupes.map((carre) => carre.y))
    for (let y = yMin; y <= yMax; y++) {
      let xG = xMin
      let xD = xMax
      let fini = false
      do {
        if (this.isEmpty(xG, y) && this.isEmpty(xD, y)) {
          aire += 2
          xG++
          xD--
        } else if (this.isEmpty(xG, y)) {
          aire++
          xG++
        } else if (this.isEmpty(xD, y)) {
          aire++
          xD--
        } else {
          fini = true
        }
      } while (!fini)
    }
    return aire
  }

  render() {
    const objets: NestedObjetMathalea2dArray = []
    for (const car of this.carresOccupes) {
      const quad = carre(
        point(car.x + this.xOrigine, car.y + this.yOrigine),
        point(car.x + this.xOrigine + 1, car.y + this.yOrigine),
      )
      quad.couleurDeRemplissage = colorToLatexOrHTML('orange')
      quad.color = colorToLatexOrHTML('black')
      objets.push(quad)
    }
    return objets
  }

  detoure() {
    const borduresNonNettoyees: [boolean, boolean, boolean, boolean][][] = []
    for (let x = this.rectangle.xMin; x < this.rectangle.xMax; x++) {
      borduresNonNettoyees[x] = []

      for (let y = this.rectangle.yMin; y < this.rectangle.yMax; y++) {
        borduresNonNettoyees[x][y] =
          this.carresOccupes.find((carre) => carre.x === x && carre.y === y) ==
          null
            ? [false, false, false, false]
            : [true, true, true, true]
      }
    }
    const xor = function (a: boolean, b: boolean) {
      return (a || b) && !(a && b)
    }
    const borduresNettoyees: [boolean, boolean, boolean, boolean][][] = []
    for (let x = this.rectangle.xMin; x < this.rectangle.xMax; x++) {
      borduresNettoyees[x] = []
      for (let y = this.rectangle.yMin; y < this.rectangle.yMax; y++) {
        borduresNettoyees[x][y] = [false, false, false, false]
        borduresNettoyees[x][y][0] =
          y === 0
            ? borduresNonNettoyees[x][y][0]
            : xor(
                borduresNonNettoyees[x][y][0],
                borduresNonNettoyees[x][y - 1][2],
              )
        borduresNettoyees[x][y][1] =
          x === this.rectangle.xMax - 1
            ? borduresNonNettoyees[x][y][1]
            : xor(
                borduresNonNettoyees[x][y][1],
                borduresNonNettoyees[x + 1][y][3],
              )
        borduresNettoyees[x][y][2] =
          y === this.rectangle.yMax - 1
            ? borduresNonNettoyees[x][y][2]
            : xor(
                borduresNonNettoyees[x][y][2],
                borduresNonNettoyees[x][y + 1][0],
              )
        borduresNettoyees[x][y][3] =
          x === 0
            ? borduresNonNettoyees[x][y][3]
            : xor(
                borduresNonNettoyees[x][y][3],
                borduresNonNettoyees[x - 1][y][1],
              )
      }
    }
    let couplesCoords: [{ x: number; y: number }, { x: number; y: number }][] =
      []

    for (let x = this.rectangle.xMin; x < this.rectangle.xMax; x++) {
      for (let y = this.rectangle.yMin; y < this.rectangle.yMax; y++) {
        if (borduresNettoyees[x][y][0]) {
          const pt1 = { x, y }
          const pt2 = { x: x + 1, y }
          if (!couplesCoords.some((couple) => trouveCouple(pt1, pt2, couple)))
            couplesCoords.push([pt1, pt2])
        }
        if (borduresNettoyees[x][y][1]) {
          const pt1 = { x: x + 1, y }
          const pt2 = { x: x + 1, y: y + 1 }
          if (!couplesCoords.some((couple) => trouveCouple(pt1, pt2, couple)))
            couplesCoords.push([pt1, pt2])
        }
        if (borduresNettoyees[x][y][2]) {
          const pt1 = { x: x + 1, y: y + 1 }
          const pt2 = { x, y: y + 1 }
          if (!couplesCoords.some((couple) => trouveCouple(pt1, pt2, couple)))
            couplesCoords.push([pt1, pt2])
        }
        if (borduresNettoyees[x][y][3]) {
          const pt1 = { x, y: y + 1 }
          const pt2 = { x, y }
          if (!couplesCoords.some((couple) => trouveCouple(pt1, pt2, couple)))
            couplesCoords.push([pt1, pt2])
        }
      }
    }

    this.dots = [
      { x: couplesCoords[0][0].x, y: couplesCoords[0][0].y },
      { x: couplesCoords[0][1].x, y: couplesCoords[0][1].y },
    ]
    couplesCoords.shift()
    // afin d'éviter les boucles infinies, on limite le nombre d'itérations au nombre de couples de points.
    let cpt = couplesCoords.length
    while (couplesCoords.length > 0 && cpt > 0) {
      const { couple, couplesPointsRestants } = TrouveExtremites(
        this.dots[this.dots.length - 1],
        couplesCoords,
      )
      cpt--
      const seg = couple
      couplesCoords = couplesPointsRestants
      if (seg) {
        if (seg[1].x !== this.dots[0].x || seg[1].y !== this.dots[0].y) {
          this.dots.push({ x: seg[1].x, y: seg[1].y })
        }
      } else {
        // window.notifyLocal('Le segment suivant n\'a pas été trouvé !', { pointCourant: this.dots[this.dots.length - 1], couplesPoints })
      }
    }
    // on supprime les points intermédiaires
    this.dots = elimineBinomesXYIntermediairesAlignes(this.dots)
  }
}

/**
 * Vérifie si deux vecteurs sont orientés dans la même direction
 * @param {number} dx1 Composante x du premier vecteur
 * @param {number} dy1 Composante y du premier vecteur
 * @param {number} dx2 Composante x du second vecteur
 * @param {number} dy2 Composante y du second vecteur
 * @returns {boolean} true si les vecteurs sont orientés dans la même direction, false sinon
 */
function sontVecteursAlignes(
  dx1: number,
  dy1: number,
  dx2: number,
  dy2: number,
): boolean {
  if (dx1 === 0) {
    if (dy1 === 0) {
      return dx2 === 0 && dy2 === 0
    } else {
      return dy2 / dy1 > 0
    }
  }
  if (dy1 === 0) {
    if (dx1 === 0) {
      return dx2 === 0 && dy2 === 0
    } else {
      return dx2 / dx1 > 0
    }
  }
  return dx2 * dy1 === dx1 * dy2 && dx1 * dx2 > 0 && dy1 * dy2 > 0
}

/**
 * Supprime de la liste de binomesXY les binomes intermédiaires correspondant à des point alignés avec le précédent et le suivant afin de limiter le nombre de sommets d'un polygone
 * Elle permet aussi de supprimer les doublons consécutifs puisque forcément, ils sont alignés
 * @param {BinomesXY} binomesXY une liste de binomesXY
 * @returns {BinomesXY} une liste de binomesXY
 * @author Jean-Claude Lhote
 */
export function elimineBinomesXYIntermediairesAlignes(binomesXY: BinomesXY) {
  // on supprime les binomesXY intermédiaires
  for (let i = 1; i < binomesXY.length - 1; ) {
    const pt1 = binomesXY[i - 1]
    const pt2 = binomesXY[i]
    const pt3 = binomesXY[i + 1]
    const dx = pt2.x - pt1.x
    const dy = pt2.y - pt1.y
    const dx2 = pt3.x - pt2.x
    const dy2 = pt3.y - pt2.y
    if (sontVecteursAlignes(dx, dy, dx2, dy2)) {
      binomesXY.splice(i, 1)
    } else {
      i++
    }
  }
  const pt1 = binomesXY[binomesXY.length - 1]
  const pt2 = binomesXY[0]
  const pt3 = binomesXY[1]
  const dx = pt2.x - pt1.x
  const dy = pt2.x - pt1.y
  const dx2 = pt3.x - pt2.x
  const dy2 = pt3.y - pt2.y
  if (dx2 === dx && dy2 === dy) {
    binomesXY.splice(0, 1)
  }
  return binomesXY
}
