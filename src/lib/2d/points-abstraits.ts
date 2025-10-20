import { ObjetMathalea2D } from '../../modules/2dGeneralites'
import { arrondi } from '../outils/nombres'

export class PointAbstrait extends ObjetMathalea2D {
  nom: string
  x: number
  y: number

  constructor(
    arg1: string | number,
    arg2: number,
    arg3?: number | string,
    positionLabel = 'above',
  ) {
    super()
    this.typeObjet = 'point'
    this.x = 0
    this.y = 0
    this.nom = ' ' // Le nom d'un point est par défaut un espace. On pourra chercher tous les objets qui ont ce nom pour les nommer automatiquement
    if (arguments.length === 1) {
      this.nom = String(arg1)
    } else if (arguments.length === 2) {
      if (Number.isNaN(arg1) || Number.isNaN(arg2)) {
        window.notify('Point : les coordonnées ne sont pas valides', {
          arg1,
          arg2,
        })
      } else {
        this.x = Number(arg1)
        this.y = arg2
      }
    } else {
      if (Number.isNaN(arg1) || Number.isNaN(arg2)) {
        window.notify('Point : les coordonnées ne sont pas valides', {
          arg1,
          arg2,
        })
      } else {
        this.x = Number(arg1)
        this.y = arg2
      }
      this.nom = String(arg3)
    }
    // On n'a pas besoin de davantage de décimales pour les graphiques !
    this.x = arrondi(this.x, 2)
    this.y = arrondi(this.y, 2)

    this.positionLabel = positionLabel
    this.bordures = [this.x, this.y, this.x, this.y]
  }

  xSVG(coeff: number) {
    return arrondi(this.x * coeff, 1)
  }

  ySVG(coeff: number) {
    return arrondi(-this.y * coeff, 1)
  }
}

export function pointAbstrait(
  x: number,
  y: number,
  A = '',
  positionLabel = 'above',
) {
  return new PointAbstrait(x, y, A, positionLabel)
}

export function isPointAbstrait(objet: any): objet is PointAbstrait {
  return objet instanceof PointAbstrait
}
export function isPointsAbstraits(objets: any[]): objets is PointAbstrait[] {
  return objets.every(isPointAbstrait)
}
