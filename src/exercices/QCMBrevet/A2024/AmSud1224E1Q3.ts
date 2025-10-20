import { cercle } from '../../../lib/2d/cercle'
import { point, pointIntersectionCC } from '../../../lib/2d/points'
import { polygoneAvecNom } from '../../../lib/2d/polygones'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { homothetie } from '../../../lib/2d/transformations'
import { choisitLettresDifferentes } from '../../../lib/outils/aleatoires'
import { choice, shuffle } from '../../../lib/outils/arrayOutils'
import { texNombre } from '../../../lib/outils/texNombre'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { context } from '../../../modules/context'
import { randint } from '../../../modules/outils'
import { nombreElementsDifferents } from '../../ExerciceQcm'
import ExerciceQcmA from '../../ExerciceQcmA'

export const uuid = 'be991'
export const refs = {
  'fr-fr': ['3G2QCM-2'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'QCM Brevet Amérique du Sud 2024 : Thales'
export const dateDePublication = '05/12/2024'
/**
 * Ceci est un exo construit à partir d'une question de qcm de Bac.
 * Il utilise la classe ExerciceQcm qui définit les contours de l'exo (sans version aléatoire)
 * Ce moule à exo dispose d'une méthode qcmCamExport qui permet de récupérer le JSON de la question et de la reponse pour qcmCam.
 * Il est interactif et dispose d'un export AMC d'office
 */
export default class AmeriqueSud1224Ex1Q3 extends ExerciceQcmA {
  private appliquerLesValeurs(BD: number, BC: number, AC: number): void {
    const labels = this.sup ? Array.from('AHBDC') : choisitLettresDifferentes(5)
    const HD = (AC * BD) / BC
    const HD1 = HD - 0.8
    const HD2 = HD + 0.8
    const HD3 = HD + 1.2
    const HD4 = HD - 1.2
    const HD5 = HD + 1.6
    const choix = this.sup
      ? [HD5, HD2]
      : shuffle([HD1, HD2, HD3, HD4].filter((x) => x > 0))
    this.reponses = [
      `$${texNombre(HD, 2)}$ cm`,
      `$${texNombre(choix[0], 1)}$ cm`,
      `$${texNombre(choix[1], 1)}$ cm`,
    ]
    const objets = []
    const B = point(0, 0, labels[2])
    const D = point(BD, 0, labels[3])
    const C = point(BC, 0, labels[4])
    const r = randint(AC - BC + 1, AC + BC - 1)
    const C1 = cercle(B, r)
    const C2 = cercle(C, AC)
    const A = pointIntersectionCC(C1, C2, labels[0], choice([1, 2]))
    const H = homothetie(A, B, BD / BC, labels[1])
    const poly = polygoneAvecNom(A, H, B, D, C, 0.8)
    const segHD = segment(H, D)
    objets.push(poly, segHD)
    const figure = mathalea2d(
      Object.assign({ scale: 0.5 }, fixeBordures(objets)),
      objets,
    )
    this.enonce = `${figure}${context.isHtml ? '' : '\n\n'}
    $${labels[2]}$, $${labels[1]}$ et $${labels[0]}$ sont alignés.<br>
    $${labels[2]}$, $${labels[3]}$ et $${labels[4]}$ sont alignés.<br>
    $${labels[2]}${labels[3]} = ${BD}$ cm ; $${labels[2]}${labels[4]} = ${BC}$ cm ; $${labels[0]}${labels[4]} = ${AC}$ cm.<br>
    $(${labels[3]}${labels[1]})//(${labels[4]}${labels[0]})$.<br>
    Quelle est la longueur du segment $${labels[1]}${labels[3]}$ ?`
    this.correction = `Cette figure est une configuration de Thales. On a $\\dfrac{${labels[2]}${labels[4]}}{${labels[2]}${labels[3]}}=\\dfrac{${labels[0]}${labels[4]}}{${labels[1]}${labels[3]}}$.<br>
    Donc $\\dfrac{${BC}}{${BD}}=\\dfrac{${AC}}{${labels[1]}${labels[3]}}$, soit  : $${labels[1]}${labels[3]}=\\dfrac{${BD}\\times${AC}}{${BC}}=${texNombre(HD, 2)}$ cm.`
  }

  versionOriginale: () => void = () => {
    this.appliquerLesValeurs(2, 10, 16)
  }

  versionAleatoire: () => void = () => {
    const nbReponses = 3 + this.sup4 ? 1 : 0
    do {
      const BD = randint(2, 3)
      const c = choice([2, 4, 5])
      const BC = c * BD
      const AC = randint(BC + 1, BC + 5)

      this.appliquerLesValeurs(BD, BC, AC)
    } while (nombreElementsDifferents(this.reponses) < nbReponses)
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
