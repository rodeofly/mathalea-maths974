import { droite } from '../../../lib/2d/droites'
import { point } from '../../../lib/2d/points'
import { polygone } from '../../../lib/2d/polygones'
import { grille } from '../../../lib/2d/reperes'
import { vecteur } from '../../../lib/2d/segmentsVecteurs'
import { texteParPosition } from '../../../lib/2d/textes'
import {
  rotation,
  symetrieAxiale,
  translation,
} from '../../../lib/2d/transformations'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { randint } from '../../../modules/outils'
import ExerciceQcmA from '../../ExerciceQcmA'

export const uuid = '47d56'
export const refs = {
  'fr-fr': [''],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Transformations (Métropole Juin 2025)'
export const dateDePublication = '27/05/2025'
/**
 *
 * @author Jean-Claude LHOTE
 * jean-claude.lhote@ac-nancy-metz.fr
 */

export default class MetropoleJ25EX3Q2 extends ExerciceQcmA {
  private appliquerLesValeurs(transfo: number): void {
    const point1 = point(1, 6)
    const point2 = point(3, 6)
    const point3 = point(4, 7)
    const point4 = point(5, 6)
    const point5 = point(5, 8)
    const point7 = point(4, 9)
    const point8 = point(5, 10)
    const point9 = point(3, 10)
    const point10 = point(3, 8)
    const cocotte = polygone([
      point1,
      point2,
      point3,
      point4,
      point5,
      point7,
      point8,
      point9,
      point10,
    ])
    cocotte.epaisseur = 2
    const d = droite(point(1, 0), point(5, 4))
    const C1 = point(6, 5)
    const C2 = point(4, 3)

    const cocotte2 = [
      symetrieAxiale(cocotte, d),
      rotation(cocotte, C1, 180),
      rotation(cocotte, C2, -90),
      translation(cocotte, vecteur(6, -6)),
    ][transfo]
    cocotte2.epaisseur = 2
    const fig1 = texteParPosition(
      'Figure 1',
      2,
      5.5,
      0,
      'black',
      0.8,
      'milieu',
      false,
    )
    const fig2 = texteParPosition(
      'Figure 2',
      10,
      1.5,
      0,
      'black',
      0.8,
      'milieu',
      false,
    )
    const grid = grille(0, -1, 12, 11, 'black', 0.5, 1)
    const objets = [grid, fig1, fig2, cocotte, cocotte2]
    const figure = mathalea2d(
      Object.assign({ style: 'display: inline' }, fixeBordures(objets)),
      objets,
    )
    const transfos = [
      'Une symétrie axiale',
      'Une symétrie centrale',
      'Une rotation',
      'Une translation',
    ]
    this.reponses = [
      transfos[transfo],
      transfos[(transfo + 1) % 4],
      transfos[(transfo + 2) % 4],
      transfos[(transfo + 3) % 4],
    ]
    this.enonce =
      'Quelle transformation permet de passer de la figure 1 à la figure 2 ?' +
      figure

    this.correction = transfos[transfo]
  }

  versionOriginale: () => void = () => {
    this.appliquerLesValeurs(0)
  }

  versionAleatoire: () => void = () => {
    this.appliquerLesValeurs(randint(0, 3))
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
