import {
  colorToLatexOrHTML,
  ObjetMathalea2D,
} from '../../modules/2dGeneralites'
import type { Point3d } from '../3d/3dProjectionMathalea2d/elements'

import { context } from '../../modules/context'
import {
  egal,
  inferieurouegal,
  randint,
  superieurouegal,
} from '../../modules/outils'
import { degToRad } from '../mathFonctions/trigo'
import { arrondi } from '../outils/nombres'
import { Cercle, cercle } from './cercle'
import {
  droite,
  Droite,
  droiteParPointEtPerpendiculaire,
  Mediatrice,
} from './droites'
import { PointAbstrait } from './points-abstraits'
import { carre, Polygone, polygone } from './polygones'
import {
  DemiDroite,
  longueur,
  Segment,
  segment,
  vecteur,
} from './segmentsVecteurs'
import { homothetie, rotation, similitude } from './transformations'

/**
 * A = point('A') //son nom
 * A = point(x,y) //ses coordonnées
 * A = point(x,y,'A') //ses coordonnées et son nom
 * A = point(x,y,'A',below') //ses coordonnées,son nom et la position de son label
 * @author Rémi Angot
 * @class
 */
export class Point extends PointAbstrait {
  /**
   * Teste l'appartenance d'un point à tout type de polygone (non convexe ou convexe). Pour info, la fonction utilise une triangulation du polygone réalisée par la librairie earcut Copyright (c) 2016, Mapbox.
   * @memberof Point
   * @param {Polygone} p Polygone dont on veut tester l'appartenance avec le point
   * @example M.estDansPolygone(p1) // Renvoie true si M appartient au polygone p1, false sinon
   * @author Jean-Claude Lhote
   * @return {boolean}
   */
  // JSDOC Validee par EE Aout 2022
  estDansPolygone(p: Polygone): boolean {
    for (const triangle of p.triangulation) {
      if (this.estDansTriangle(...(triangle as [Point, Point, Point])))
        return true
    }
    return false
  }

  /**
   * Teste l'appartenance d'un point dans un triangle
   * @memberof Point
   * @param {Point} A Premier sommet du triangle
   * @param {Point} B Deuxième sommet du triangle
   * @param {Point} C Troisième sommet du triangle
   * @example M.estDansTriangle(V, S, T) // Renvoie true si M appartient au triangle VST, false sinon
   * @author Eric Elter
   * @return {boolean}
   */
  // JSDOC Validee par EE Aout 2022
  estDansTriangle(
    A: PointAbstrait,
    B: PointAbstrait,
    C: PointAbstrait,
  ): boolean {
    const vMA = vecteur(this, A)
    const vMB = vecteur(this, B)
    const vMC = vecteur(this, C)
    const x1 = vMB.x * vMC.y - vMB.y * vMC.x
    const x2 = vMC.x * vMA.y - vMC.y * vMA.x
    const x3 = vMA.x * vMB.y - vMA.y * vMB.x
    return (
      (superieurouegal(x1, 0) &&
        superieurouegal(x2, 0) &&
        superieurouegal(x3, 0)) ||
      (inferieurouegal(x1, 0) &&
        inferieurouegal(x2, 0) &&
        inferieurouegal(x3, 0))
    )
  }

  /**
   * Teste l'appartenance d'un point à un polygone convexe
   * @memberof Point
   * @param {Polygone} p Polygone dont on veut tester l'appartenance avec le point
   * @example M.estDansPolygoneConvexe(p1) // Renvoie true si M appartient au polygone convexe p1, false sinon
   * @author Jean-Claude Lhote
   * @return {boolean}
   */
  // JSDOC Validee par EE Aout 2022
  estDansPolygoneConvexe(p: Polygone): boolean {
    const l = p.listePoints.length
    if (l === 3) {
      return this.estDansTriangle(...(p.listePoints as [Point, Point, Point]))
    } else {
      const A = p.listePoints[0]
      const B = p.listePoints[1]
      const C = p.listePoints[l - 1]
      const p2 = polygone(...p.listePoints.slice(1))
      if (this.estDansTriangle(A, B, C)) return true
      else return this.estDansPolygoneConvexe(p2)
    }
  }

  /**
   * Teste l'appartenance d'un point dans un quadrilatère
   * @memberof Point
   * @param {Point} A Premier sommet du quadrilatère
   * @param {Point} B Deuxième sommet du quadrilatère
   * @param {Point} C Troisième sommet du quadrilatère
   * @param {Point} D Quatrième sommet du quadrilatère
   * @example M.estDansQuadrilatere(F, G, H, I) // Renvoie true si M appartient au quadrilatère FGHI, false sinon
   * @author Eric Elter
   * @return {boolean}
   */
  // JSDOC Validee par EE Aout 2022
  estDansQuadrilatere(A: Point, B: Point, C: Point, D: Point) {
    return this.estDansTriangle(A, B, C) || this.estDansTriangle(A, C, D)
  }

  /**
   * Teste l'appartenance d'un point sur un segment, un cercle, une droite ou une demi-droite
   * @memberof Point
   * @param {Segment | Cercle | Droite | DemiDroite} objet Objet géométrique dont on veut tester si le point en fait partie
   * @example M.estSur(s) // Renvoie true si M appartient au segment s (au préalablement défini), false sinon
   * @return {boolean}
   */
  // JSDOC Validee par EE Aout 2022
  estSur(objet: Droite | Segment | DemiDroite | Cercle) {
    if (objet instanceof Droite)
      return egal(objet.a * this.x + objet.b * this.y + objet.c, 0, 0.01)
    if (objet instanceof Segment) {
      const prodvect =
        (objet.extremite2.x - objet.extremite1.x) *
          (this.y - objet.extremite1.y) -
        (this.x - objet.extremite1.x) *
          (objet.extremite2.y - objet.extremite1.y)
      const prodscal =
        (this.x - objet.extremite1.x) *
          (objet.extremite2.x - objet.extremite1.x) +
        (this.y - objet.extremite1.y) *
          (objet.extremite2.y - objet.extremite1.y)
      const prodscalABAB =
        (objet.extremite2.x - objet.extremite1.x) ** 2 +
        (objet.extremite2.y - objet.extremite1.y) ** 2
      return (
        egal(prodvect, 0, 0.01) &&
        superieurouegal(prodscal, 0) &&
        inferieurouegal(prodscal, prodscalABAB)
      )
    }
    if (objet instanceof DemiDroite) {
      const OM = vecteur(objet.extremite1, this)
      const vd = vecteur(objet.extremite1, objet.extremite2)
      const prodscal = OM.x * vd.x + OM.y * vd.y
      const prodvect = OM.x * vd.y - OM.y * vd.x
      return egal(prodvect, 0, 0.01) && superieurouegal(prodscal, 0, 0.01)
    }
    if (objet instanceof Cercle)
      return egal(longueur(this, objet.centre), objet.rayon, 0.01)
  }
}

/**
 * Crée un objet Point ayant les propriétés suivantes :
 * @param {number} x abscisse
 * @param {number} y ordonnée
 * @param {string} nom son nom qui apparaîtra
 * @param {string} [positionLabel] Les possibilités sont : 'left', 'right', 'below', 'above', 'above right', 'above left', 'below right', 'below left'. Si on se trompe dans l'orthographe, ce sera 'above left' et si on ne précise rien, pour un point ce sera 'above'.
 * @return {Point}
 */
export function point(x: number, y: number, nom = '', positionLabel = 'above') {
  return new Point(x, y, nom, positionLabel)
}

export function pointDepuisPointAbstrait(point: PointAbstrait) {
  return new Point(point.x, point.y, point.nom, point.positionLabel)
}

/**
 * @author Jean-Claude Lhote
 * @param {number} x abscisse
 * @param {number} y ordonnée
 * @param {object} param2 permet de définir le rayon du 'plot', sa couleur, sa couleur de remplissage
 */
export class Plot extends ObjetMathalea2D {
  couleurDeRemplissage: string[]
  rayon: number
  x: number
  y: number
  opaciteDeRemplissage: number
  constructor(
    x: number,
    y: number,
    {
      rayon = 0.05,
      couleur = 'black',
      couleurDeRemplissage = 'black',
      opacite = 1,
      opaciteDeRemplissage = 1,
    } = {},
  ) {
    super()
    if (isNaN(x) || isNaN(y))
      window.notify('Plot : les coordonnées ne sont pas valides', { x, y })
    this.color = colorToLatexOrHTML(couleur) // EE : 08/05/2022
    this.couleurDeRemplissage = colorToLatexOrHTML(couleurDeRemplissage)
    this.rayon = rayon
    this.x = x
    this.y = y
    this.bordures = [x - rayon, y - rayon, x + rayon, y + rayon]
    this.opacite = opacite
    this.opaciteDeRemplissage = opaciteDeRemplissage
  }

  svg(coeff: number) {
    if (this.couleurDeRemplissage[0] === '') {
      return `\n\t <circle cx="${this.x * coeff}" cy="${-this.y * coeff}" r="${this.rayon * coeff}" stroke="${this.color[0]}" stroke-opacity="${this.opacite || 1}"/>`
    } else {
      return `\n\t <circle cx="${this.x * coeff}" cy="${-this.y * coeff}" r="${this.rayon * coeff}" stroke="${this.color[0]}" fill="${this.couleurDeRemplissage[0]}" stroke-opacity="${this.opacite || 1}" fill-opacity="${this.opaciteDeRemplissage || 1}"/>`
    }
  }

  tikz() {
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line-width=${this.epaisseur}`)
    }
    if (this.opacite !== 1) {
      tableauOptions.push(`opacity=${this.opacite}`)
    }
    if (this.opaciteDeRemplissage !== 1) {
      tableauOptions.push(`fill opacity=${this.opaciteDeRemplissage}`)
    }
    if (
      this.couleurDeRemplissage[1] !== '' &&
      this.couleurDeRemplissage[1] !== 'none' &&
      this.couleurDeRemplissage[1] !== ''
    ) {
      tableauOptions.push(`fill=${this.couleurDeRemplissage[1]}`)
    }
    let optionsDraw = ''
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    return `\n\t \\filldraw${optionsDraw} (${this.x},${this.y}) circle (${this.rayon});`
  }
}

export function plot(
  x: number,
  y: number,
  {
    rayon = 0.05,
    couleur = 'black',
    couleurDeRemplissage = 'black',
    opacite = 1,
    opaciteDeRemplissage = 1,
  } = {},
) {
  return new Plot(arrondi(x), arrondi(y), {
    rayon,
    couleur,
    couleurDeRemplissage,
    opacite,
    opaciteDeRemplissage,
  })
}

/**
 * tracePoint(A) // Place une croix à l'emplacement du point A
 * tracePoint(A,B,C,D) // Place une croix pour les différents points
 * tracePoint(A,B,C,D,'blue') // Place une croix pour les différents points
 * Après coup, on peut notamment changer l'épaissseur, le style et l'opacité du point par :
 * pt = tracePoint(A)
 * pt.epaisseur = 5 (par défaut : 1)
 * pt.opacite = 0.2 (par défaut : 0.8 = 80%)
 * pt.style = '#' (choix parmi 'x','o','#','|','+','.' et par défaut : 'x')
 * @property {string} color
 * @author Rémi Angot et Jean-Claude Lhote
 */
export class TracePoint extends ObjetMathalea2D {
  taille: number
  tailleTikz: number
  points: (Point | Point3d)[]
  couleurDeRemplissage?: string[]
  constructor(...points: (PointAbstrait | Point | Point3d | string)[]) {
    super()
    this.taille = 3
    this.tailleTikz = this.taille / 15
    this.epaisseur = 1
    this.opacite = 0.8
    this.style = 'x'
    let xmin = 1000
    let xmax = -1000
    let ymin = 1000
    let ymax = -1000
    let lePoint
    if (typeof points[points.length - 1] === 'string') {
      this.color = colorToLatexOrHTML(String(points[points.length - 1]))
      points.pop()
    } else this.color = colorToLatexOrHTML('black')
    this.points = points as (Point | Point3d)[]
    for (const unPoint of this.points) {
      const point = unPoint as Point | Point3d
      if (point.typeObjet !== 'point3d' && point.typeObjet !== 'point')
        window.notify('TracePoint : argument invalide', { ...points })
      lePoint = point.typeObjet === 'point' ? point : (point as Point3d).c2d
      xmin = Math.min(xmin, lePoint.x - this.taille / context.pixelsParCm)
      xmax = Math.max(xmax, lePoint.x + this.taille / context.pixelsParCm)
      ymin = Math.min(ymin, lePoint.y - this.taille / context.pixelsParCm)
      ymax = Math.max(ymax, lePoint.y + this.taille / context.pixelsParCm)
    }
    this.bordures = [xmin, ymin, xmax, ymax]
  }

  svg(coeff: number) {
    const objetssvg = []
    let s1
    let s2
    let p1
    let p2
    let c, A
    for (const unPoint of this.points) {
      if (unPoint.typeObjet === 'point3d') {
        A = (unPoint as Point3d).c2d
      } else {
        A = unPoint
      }
      if (A.constructor === Point) {
        if (this.style === 'x') {
          s1 = segment(
            point(A.x - this.taille / coeff, A.y + this.taille / coeff),
            point(A.x + this.taille / coeff, A.y - this.taille / coeff),
            this.color[0],
          )
          s2 = segment(
            point(A.x - this.taille / coeff, A.y - this.taille / coeff),
            point(A.x + this.taille / coeff, A.y + this.taille / coeff),
            this.color[0],
          )
          s1.epaisseur = this.epaisseur
          s2.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          s2.opacite = this.opacite
          objetssvg.push(s1, s2)
        } else if (this.style === 'o') {
          p1 = point(A.x, A.y)
          c = cercle(p1, this.taille / coeff, this.color[0])
          c.epaisseur = this.epaisseur
          c.opacite = this.opacite
          c.couleurDeRemplissage = this.color
          c.opaciteDeRemplissage = this.opacite / 2
          objetssvg.push(c)
        } else if (this.style === '#') {
          p1 = point(A.x - this.taille / coeff, A.y - this.taille / coeff)
          p2 = point(A.x + this.taille / coeff, A.y - this.taille / coeff)
          c = carre(p1, p2, this.color[0]) as unknown as Polygone
          c.epaisseur = this.epaisseur
          c.opacite = this.opacite
          c.couleurDeRemplissage = [
            this.color[0] ?? 'black',
            this.color[1] ?? 'black',
          ]
          c.opaciteDeRemplissage = this.opacite / 2
          objetssvg.push(c)
        } else if (this.style === '+') {
          s1 = segment(
            point(A.x, A.y + this.taille / coeff),
            point(A.x, A.y - this.taille / coeff),
            this.color[0],
          )
          s2 = segment(
            point(A.x - this.taille / coeff, A.y),
            point(A.x + this.taille / coeff, A.y),
            this.color[0],
          )
          s1.epaisseur = this.epaisseur
          s2.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          s2.opacite = this.opacite
          objetssvg.push(s1, s2)
        } else if (this.style === '|') {
          s1 = segment(
            point(A.x, A.y + this.taille / coeff),
            point(A.x, A.y - this.taille / coeff),
            this.color[0],
          )
          s1.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          objetssvg.push(s1)
        } else if (this.style === '.') {
          s1 = plot(A.x, A.y, {
            couleur: this.color[0],
            rayon: this.epaisseur * 0.05,
            couleurDeRemplissage: this.color[0],
          })
          objetssvg.push(s1)
        }
      }
    }
    let code = ''
    for (const objet of objetssvg) {
      code += '\n\t' + objet.svg(coeff)
    }
    code = `<g id="${this.id}">` + code + '</g>'
    return code
  }

  tikz() {
    const objetstikz = []
    let s1
    let s2
    let p1
    let p2
    let c, A
    for (const unPoint of this.points) {
      if (unPoint.typeObjet === 'point3d') {
        A = (unPoint as Point3d).c2d
      } else {
        A = unPoint
      }
      if (A.constructor === Point) {
        if (this.style === 'x') {
          this.tailleTikz = this.taille / 16 // EE : Sinon, on ne voit pas la croix.
          s1 = segment(
            point(A.x - this.tailleTikz, A.y + this.tailleTikz),
            point(A.x + this.tailleTikz, A.y - this.tailleTikz),
            this.color[1],
          )
          s2 = segment(
            point(A.x - this.tailleTikz, A.y - this.tailleTikz),
            point(A.x + this.tailleTikz, A.y + this.tailleTikz),
            this.color[1],
          )
          s1.epaisseur = this.epaisseur / 1.6
          s2.epaisseur = this.epaisseur / 1.6
          s1.opacite = this.opacite
          s2.opacite = this.opacite
          objetstikz.push(s1, s2)
        } else if (this.style === 'o') {
          p1 = point(A.x, A.y)
          c = cercle(p1, this.tailleTikz, this.color[1])
          c.epaisseur = this.epaisseur
          c.opacite = this.opacite
          c.couleurDeRemplissage = this.color
          c.opaciteDeRemplissage = this.opacite / 2
          objetstikz.push(c)
        } else if (this.style === '#') {
          p1 = point(A.x - this.tailleTikz, A.y - this.tailleTikz)
          p2 = point(A.x + this.tailleTikz, A.y - this.tailleTikz)
          c = carre(p2, p1, this.color[1]) as unknown as Polygone
          c.epaisseur = this.epaisseur
          c.opacite = this.opacite
          c.couleurDeRemplissage = [
            this.color[0] ?? 'black',
            this.color[1] ?? 'black',
          ]
          c.opaciteDeRemplissage = this.opacite / 2
          objetstikz.push(c)
        } else if (this.style === '+') {
          s1 = segment(
            point(A.x, A.y + this.tailleTikz),
            point(A.x, A.y - this.tailleTikz),
            this.color[1],
          )
          s2 = segment(
            point(A.x - this.tailleTikz, A.y),
            point(A.x + this.tailleTikz, A.y),
            this.color[1],
          )
          s1.epaisseur = this.epaisseur
          s2.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          s2.opacite = this.opacite
          objetstikz.push(s1, s2)
        } else if (this.style === '|') {
          s1 = segment(
            point(A.x, A.y + this.tailleTikz),
            point(A.x, A.y - this.tailleTikz),
            this.color[1],
          )
          s1.epaisseur = this.epaisseur
          s1.opacite = this.opacite
          objetstikz.push(s1)
        } else if (this.style === '.') {
          s1 = plot(A.x, A.y, {
            couleur: this.color[0],
            rayon: this.epaisseur * 0.05,
            couleurDeRemplissage: this.color[1], // je mets la couleur html, car elle va être parsée par colorToLatexOrHtml à nouveau
          })
          objetstikz.push(s1)
        }
      }
    }
    let code = ''
    for (const objet of objetstikz) {
      code += objet.tikz()
    }
    return code
  }
}

/**
 * @param  {(Point |PointCliquable| string)[]} args Points précédemment créés. Si le dernier argument est une chaîne de caractère, définit la couleur des points tracés.
 * @return  {TracePoint}
 * @example tracePoint(A,B,C,'red) // Trace les points A,B,C précédemment créés en rouge
 * @example tracePoint(A).style = '|' // Le style du point A sera '|' et non 'x' par défaut.
 * @example tracePoint(A).epaisseur = 5 // L'épaisseur du style du point sera 5 et non 1 par défaut.
 * @example tracePoint(A).opacite = 0.4 // L'opacité du style du point sera 40% et non 80%(0.8) par défaut.
 */
export function tracePoint(
  ...args: (PointAbstrait | Point | Point3d | string)[]
) {
  return new TracePoint(...args)
}

/**
 * P=tracePointSurDroite(A,d) //Ajoute un trait perpendiculaire à d supposée tracée marquant la posiion du point A
 * P=tracePointSurDroite(A,B) //Ajoute un trait perpendiculaire à la droite (AB) supposée tracée marquant la posiion du point A
 *
 * @author Rémi Angot et Jean-Claude Lhote
 */
export class TracePointSurDroite extends ObjetMathalea2D {
  lieu: PointAbstrait
  taille: number
  x: number
  y: number
  direction: PointAbstrait
  stringColor: string

  constructor(A: PointAbstrait, O: PointAbstrait | Droite, color = 'black') {
    super()
    this.stringColor = color
    this.lieu = A
    this.taille = 0.2
    this.x = A.x
    this.y = A.y
    let M, d
    this.bordures = [A.x - 0.2, A.y - 0.2, A.x + 0.2, A.y + 0.2]

    if (O instanceof PointAbstrait) {
      if (longueur(this.lieu, O) < 0.001) {
        window.notify(
          'TracePointSurDroite : points trop rapprochés pour définir une droite',
          {
            A,
            O,
          },
        )
      }
      M = pointSurSegment(this.lieu, O, 1)
      this.direction = rotation(M, this.lieu, 90)
    } else {
      d = droiteParPointEtPerpendiculaire(this.lieu, O as Droite)
      this.direction = pointSurSegment(point(d.x1, d.y1), point(d.x2, d.y2), 1)
    }
  }

  svg(coeff: number) {
    const A1 = pointSurSegment(
      this.lieu,
      this.direction,
      (this.taille * 20) / coeff,
    )
    const A2 = pointSurSegment(
      this.lieu,
      this.direction,
      (-this.taille * 20) / coeff,
    )
    const s = segment(A1, A2, this.stringColor)
    this.id = s.id
    return s.svg(coeff)
  }

  tikz() {
    const A1 = pointSurSegment(
      this.lieu,
      this.direction,
      this.taille / context.scale,
    )
    const A2 = pointSurSegment(
      this.lieu,
      this.direction,
      -this.taille / context.scale,
    )
    const s = segment(A1, A2, this.stringColor)
    return s.tikz()
  }
}

export function tracePointSurDroite(
  A: PointAbstrait,
  O: PointAbstrait | Droite,
  color = 'black',
) {
  return new TracePointSurDroite(A, O, color)
}

export function traceMilieuSegment(A: PointAbstrait, B: PointAbstrait) {
  return new TracePointSurDroite(milieu(A, B), droite(A, B))
}

/**
 * M = milieu(A,B) //M est le milieu de [AB]
 * M = milieu(A,B,'M') //M est le milieu [AB] et se nomme M
 * M = milieu(A,B,'M','below') //M est le milieu [AB], se nomme M et le nom est en dessous du point
 * @returns {PointAbstrait} Milieu du segment [AB]
 * @author Rémi Angot
 */
export function milieu(
  A: PointAbstrait,
  B: PointAbstrait,
  nom = '',
  positionLabel = 'above',
): Point {
  if (isNaN(longueur(A, B)))
    window.notify('milieu : Quelque chose ne va pas avec les points', { A, B })
  const x = (A.x + B.x) / 2
  const y = (A.y + B.y) / 2
  return point(x, y, nom, positionLabel)
}

/**
 * M = pointSurSegment(A,B,l) //M est le point de [AB] à l cm de A
 * M = pointSurSegment(A,B,l,'M') //M est le point de [AB] à l cm de A et se nomme M
 * M = pointSurSegment(A,B,l,'M','below') //M est le point de [AB] à l cm de A, se nomme M et le nom est en dessous du point
 *
 * M = pointSurSegment(A,B,'h','M') // M est un point au hasard sur [AB] (on peut écrire n'importe quel texte à la place de 'h')
 * M = pointSurSegment(A,B) // M est un point au hasard sur [AB]
 * Sécurité ajoutée par Jean-Claude Lhote : si AB=0, alors on retourne A
 * @author Rémi Angot
 */
export function pointSurSegment(
  A: PointAbstrait,
  B: PointAbstrait,
  l?: number,
  nom = '',
  positionLabel = 'above',
): Point {
  if (isNaN(longueur(A, B)))
    window.notify('pointSurSegment : Quelque chose ne va pas avec les points', {
      A,
      B,
    })
  if (longueur(A, B) === 0) return pointDepuisPointAbstrait(A)
  if (l === undefined || typeof l === 'string') {
    l = (longueur(A, B) * randint(15, 85)) / 100
  }
  return pointDepuisPointAbstrait(
    homothetie(B, A, l / longueur(A, B), nom, positionLabel),
  )
}

/**
 *
 * @param {Cercle} c
 * @param {number} angle
 * @param {string} nom
 * @param {string} positionLabel
 * M = pointSurCercle(c,'','M') // M est un point choisi au hasard sur le cercle c et se nomme M.
 * N = pointSurCercle(c,90) // N est le point du cercle c situé à 90° par rapport à l'horizontale, donc au dessus du centre de c
 * P = pointSurCercle(c,-90) // P est le point du cercle c situé à l'opposé du point N précédent.
 * @author Jean-Claude Lhote
 */
export function pointSurCercle(
  c: Cercle,
  angle: number,
  nom: string,
  positionLabel = 'above',
): Point {
  if (typeof angle !== 'number') angle = randint(-180, 180)
  const x = c.centre.x + c.rayon * Math.cos(degToRad(angle))
  const y = c.centre.y + c.rayon * Math.sin(degToRad(angle))
  return point(x, y, nom, positionLabel)
}

/**
 * Retourne un point sur la droite d dont l'abscisse est x. Si c'est impossible (droite verticale) alors ce sera le point dont l'ordonnée vaut x.
 * @param {Droite} d
 * @param {number} x Abscisse du point
 * @param {string} [nom] Nom du point
 * @param {string} [positionLabel='above'] Facultatif, 'above' par défaut.
 * @return {Point} Point de la droite d dont l'abscisse est x
 * @author Jean-Claude Lhote
 */
export function pointSurDroite(
  d: Droite,
  x: number,
  nom = '',
  positionLabel = 'above',
): Point {
  // si d est parallèle à l'axe des ordonnées, le paramètre x servira pour y.
  if (d.b === 0) return point(-d.c / d.a, x, nom, positionLabel)
  else if (d.a === 0) return point(x, -d.c / d.b, nom, positionLabel)
  else return point(x, (-d.c - d.a * x) / d.b, nom, positionLabel)
}

/**
 * Renvoie 'M' le point d'intersection des droites d1 et d2
 * @param {Droite} d
 * @param {Droite} f
 * @param {string} nom  le nom du point d'intersection. Facultatif, vide par défaut.
 * @param {string} [positionLabel='above'] Facultatif, 'above' par défaut.
 * @return {Point} Point 'M' d'intersection de d1 et de d2
 * @author Jean-Claude Lhote
 */
export function pointIntersectionDD(
  d: Droite | Mediatrice,
  f: Droite | Mediatrice,
  nom = '',
  positionLabel = 'above',
): Point | false {
  let x, y
  if (egal(f.a * d.b - f.b * d.a, 0, 0.000001)) {
    // Les droites sont parallèles ou confondues, pas de point d'intersection ou une infinité
    return pointIntersectionNonTrouveEntre(d, f, point(0, 0))
  } else {
    y = (f.c * d.a - d.c * f.a) / (f.a * d.b - f.b * d.a)
  }
  if (egal(d.a, 0, 0.000001)) {
    // si d est horizontale alors f ne l'est pas donc f.a<>0
    x = (-f.c - f.b * y) / f.a
  } else {
    // d n'est pas horizontale donc ...
    x = (-d.c - d.b * y) / d.a
  }
  return point(x, y, nom, positionLabel)
}

/**
 * @example pointAdistance(A,d,angle,nom="",positionLabel="above") // Seuls le point A et la distance d sont obligatoires, angle peut être choisi : il s'agit de l'angle signé avec l'axe [OI) sinon, il est choisi aléatoirement.
 * @example p=pointAdistance(A,5,'M') // Place un point aléatoirement à 5 unités de A et lui donne le nom de 'M'.
 * @author Jean-Claude Lhote
 */
export function pointAdistance(
  A: PointAbstrait,
  d: number = 1,
  angle: string | number = 0,
  nom = '',
  positionLabel = 'above',
): Point {
  let leNom = ''
  let lAngle = 0
  let lePositionLabel = 'above'
  if (typeof angle === 'string') {
    lAngle = randint(0, 360)
    leNom = angle
    if (nom != null) lePositionLabel = nom
  } else {
    lAngle = angle ?? randint(0, 360)
    if (nom != null) leNom = nom
    if (positionLabel != null) lePositionLabel = positionLabel
  }

  const B = point(A.x + 1, A.y)
  return similitude(B, A, lAngle, d, leNom, lePositionLabel)
}

/**
 * @param {Droite} d la droite qui intecepte (ou pas le cercle)
 * @param {Cercle} C le cercle
 * @param {string} nom le nom du point d'intersection
 * @param {entier} n 1 pour le premier point, 2 sinon. Si il n'y a qu'un seul point d'intesection, l'un ou l'autre renvoie ce point.
 * @example I = pointItersectionLC(d,c,'I',1) // I est le premier point d'intersection si il existe de la droite (d) et du cercle (c). On renvoie le centre du cercle sinon.
 * @author Jean-Claude Lhote
 */
export function pointIntersectionLC(
  d: Droite,
  C: Cercle,
  nom = '',
  n = 1,
): Point | false {
  const O = C.centre
  const r = C.rayon
  const a = d.a
  const b = d.b
  const c = d.c
  const xO = O.x
  const yO = O.y
  let Delta, delta, xi, yi, xiPrime, yiPrime
  if (egal(b, 0, 0.000001)) {
    // la droite est verticale
    xi = -c / a
    xiPrime = xi
    Delta = 4 * (-xO * xO - (c * c) / (a * a) - (2 * xO * c) / a + r * r)
    if (Delta < 0) return pointIntersectionNonTrouveEntre(d, C, C.centre)
    else if (egal(Delta, 0)) {
      // un seul point d'intersection
      yi = yO + Math.sqrt(Delta) / 2
      yiPrime = yi
    } else {
      // deux points d'intersection
      yi = yO - Math.sqrt(Delta) / 2
      yiPrime = yO + Math.sqrt(Delta) / 2
    }
  } else if (egal(a, 0, 0.0000001)) {
    // la droite est horizontale
    yi = -c / b
    yiPrime = yi
    Delta = 4 * (-yO * yO - (c * c) / (b * b) - (2 * yO * c) / b + r * r)
    if (Delta < 0) return pointIntersectionNonTrouveEntre(d, C, C.centre)
    else if (egal(Delta, 0)) {
      // un seul point d'intersection
      xi = xO + Math.sqrt(Delta) / 2
      xiPrime = xi
    } else {
      // deux points d'intersection
      xi = xO - Math.sqrt(Delta) / 2
      xiPrime = xO + Math.sqrt(Delta) / 2
    }
  } else {
    // cas général
    Delta =
      (2 * ((a * c) / (b * b) + (yO * a) / b - xO)) ** 2 -
      4 *
        (1 + (a / b) ** 2) *
        (xO * xO + yO * yO + (c / b) ** 2 + (2 * yO * c) / b - r * r)
    if (Delta < 0) return pointIntersectionNonTrouveEntre(d, C, C.centre)
    else if (egal(Delta, 0)) {
      // un seul point d'intersection
      delta = Math.sqrt(Delta)
      xi =
        (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) /
        (2 * (1 + (a / b) ** 2))
      xiPrime = xi
      yi = (-a * xi - c) / b
      yiPrime = yi
    } else {
      // deux points d'intersection
      delta = Math.sqrt(Delta)
      xi =
        (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) - delta) /
        (2 * (1 + (a / b) ** 2))
      xiPrime =
        (-2 * ((a * c) / (b * b) + (yO * a) / b - xO) + delta) /
        (2 * (1 + (a / b) ** 2))
      yi = (-a * xi - c) / b
      yiPrime = (-a * xiPrime - c) / b
    }
  }
  if (n === 1) {
    if (yiPrime > yi) {
      return point(xiPrime, yiPrime, nom)
    } else {
      return point(xi, yi, nom)
    }
  } else {
    if (yiPrime > yi) {
      return point(xi, yi, nom)
    } else {
      return point(xiPrime, yiPrime, nom)
    }
  }
}

/**
 * M = pointIntersectionCC(c1,c2,'M') // M est le point d'intersection le plus haut des cercles c1 et c2
 * M = pointIntersectionCC(c1,c2,'M',2) // M est le point d'intersection le plus bas des cercles c1 et c2
 * La fonction ne renvoie rien si les cercles n'ont pas de points d'intersection
 * @author Rémi Angot
 * @see https://stackoverflow.com/questions/12219802/a-javascript-function-that-returns-the-x-y-points-of-intersection-between-two-ci
 */
export function pointIntersectionCC(
  c1: Cercle,
  c2: Cercle,
  nom = '',
  n = 1,
): Point | false {
  const O1 = c1.centre
  const O2 = c2.centre
  const r0 = c1.rayon
  const r1 = c2.rayon
  const x0 = O1.x
  const x1 = O2.x
  const y0 = O1.y
  const y1 = O2.y
  const dx = x1 - x0
  const dy = y1 - y0
  const d = Math.sqrt(dy * dy + dx * dx)
  if (d > r0 + r1) {
    return pointIntersectionNonTrouveEntre(c1, c2, c1.centre)
  }
  if (d < Math.abs(r0 - r1)) {
    return pointIntersectionNonTrouveEntre(c1, c2, c1.centre)
  }
  const a = (r0 * r0 - r1 * r1 + d * d) / (2.0 * d)
  const x2 = x0 + (dx * a) / d
  const y2 = y0 + (dy * a) / d
  const h = Math.sqrt(r0 * r0 - a * a)
  const rx = -dy * (h / d)
  const ry = dx * (h / d)
  const xi = x2 + rx
  const xiPrime = x2 - rx
  const yi = y2 + ry
  const yiPrime = y2 - ry
  if (n === 1) {
    if (yiPrime > yi) {
      return point(xiPrime, yiPrime, nom)
    } else {
      return point(xi, yi, nom)
    }
  } else {
    if (yiPrime > yi) {
      return point(xi, yi, nom)
    } else {
      return point(xiPrime, yiPrime, nom)
    }
  }
}

function pointIntersectionNonTrouveEntre(
  objet1: Cercle | Droite | Mediatrice,
  objet2: Cercle | Droite | Mediatrice,
  valeurParDefaut: PointAbstrait,
): false {
  // window.notify(`${objet1.nom} et ${objet2.nom} ne se coupent pas. Impossible de trouver leur intersection.`, { objet1, objet2 })
  // return pointDepuisPointAbstrait(valeurParDefaut)
  return false
}
