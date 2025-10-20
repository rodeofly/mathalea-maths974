import { droite } from '../../lib/2d/droites'
import { milieu, point, tracePoint } from '../../lib/2d/points'
import { repere } from '../../lib/2d/reperes'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { latex2d } from '../../lib/2d/textes'
import { deuxColonnes } from '../../lib/format/miseEnPage'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { mathalea2d } from '../../modules/2dGeneralites'
import FractionEtendue from '../../modules/FractionEtendue'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
/**
 * @author Gilles Mora
 *
 */
export const uuid = '5b9d0'
export const refs = {
  'fr-fr': ['1A-F6-3'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre =
  "Déterminer le coefficient directeur d'une droite à partir de sa représentation graphique"
export const dateDePublication = '10/07/2025'

export default class Auto1AF6c extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    const xA = 0
    const yA = 2
    const xB = 1
    const yB = -1
    const o = latex2d('\\text{O}', -0.3, -0.3, { letterSize: 'scriptsize' })
    const A = point(xA, yA)
    const B = point(xB, yB)
    const Bx = point(B.x, A.y)
    const sABx = segment(A, Bx)
    const sBBx = segment(B, Bx)
    const maFraction = new FractionEtendue(yB - yA, xB - xA)
    sBBx.epaisseur = 2
    sBBx.pointilles = 5
    sABx.epaisseur = 2
    sABx.pointilles = 5
    const lA = latex2d('A', xA, yA + 0.5, { letterSize: 'scriptsize' })
    const traceA = tracePoint(A, 'black') // Variable qui trace les points avec une croix
    const lB = latex2d('B', xB, yB + 0.5, { letterSize: 'scriptsize' })
    const lABx = latex2d(`${xB - xA}`, milieu(A, Bx).x, A.y + 0.3, {
      color: 'red',
      letterSize: 'scriptsize',
    })
    const lBBx = latex2d(`${yB - yA}`, B.x + 0.5, milieu(B, Bx).y, {
      color: 'blue',
      letterSize: 'scriptsize',
    })
    const traceB = tracePoint(B, 'black') // Variable qui trace les points avec une croix
    const d = droite(A, B, '', 'blue')
    d.epaisseur = 2
    traceA.taille = 3
    traceA.epaisseur = 2
    traceB.taille = 3
    traceB.epaisseur = 2
    const xmin = -3
    const ymin = -4
    const xmax = 3
    const ymax = 4
    const r1 = repere({
      xMin: xmin,
      xMax: xmax,
      xUnite: 1,
      yMin: ymin,
      yMax: ymax,
      yUnite: 1,
      thickHauteur: 0.1,
      xLabelMin: xmin + 1,
      xLabelMax: xmax - 1,
      yLabelMax: ymax - 1,
      yLabelMin: ymin + 1,
      axeXStyle: '->',
      axeYStyle: '->',
      yLabelDistance: 1,
      yLabelEcart: 0.4,
      grilleSecondaire: true,
      grilleSecondaireYDistance: 0.1,
      grilleSecondaireXDistance: 0.1,
      grilleSecondaireOpacite: 0.1,
      grilleSecondaireYMin: ymin - 0.1,
      grilleSecondaireYMax: ymax + 0.1,
      grilleSecondaireXMin: xmin - 0.1,
      grilleSecondaireXMax: xmax + 0.1,
    })
    const objet = mathalea2d(
      {
        xmin,
        xmax,
        ymin: ymin - 0.25,
        ymax: ymax + 0.25,
        pixelsParCm: 40,
        scale: 0.75,
        style: 'margin: auto',
      },
      d,
      r1,
      o,
    )
    const objetC = mathalea2d(
      {
        xmin,
        xmax,
        ymin,
        ymax: ymax + 0.25,
        pixelsParCm: 30,
        scale: 0.75,
        style: 'margin: auto',
      },
      d,
      r1,
      traceA,
      lA,
      lB,
      traceB,
      o,
      sABx,
      sBBx,
      lABx,
      lBBx,
    )
    this.enonce = `${deuxColonnes(
      `Dans un repère du plan, on a représenté une droite.<br><br>
      Le coefficient directeur de cette droite est égal  à :`,
      `${objet}`,
    )}<br>`

    this.correction = `En prenant deux points sur la droite, on obtient :<br>
     
    $m=\\dfrac{${miseEnEvidence(yB - yA, 'blue')}}{${miseEnEvidence(xB - xA, 'red')}}=${miseEnEvidence(`${maFraction.texFractionSimplifiee}`)}$
       `
    this.correction += `<br>
          ${objetC}<br>  `
    this.reponses = ['$-3$', '$-1$', '$2$', '$3$']
  }

  versionAleatoire: () => void = () => {
    const xA = 0
    const yA = randint(1, 5)
    const xB = randint(-5, 5, 0)
    const yB = randint(0, 6)
    const o = latex2d('\\text{O}', -0.3, -0.3, { letterSize: 'scriptsize' })
    const A = point(xA, yA)
    const B = point(xB, yB)
    const Bx = point(B.x, A.y)
    const sABx = segment(A, Bx)
    const sBBx = segment(B, Bx)
    const maFraction = new FractionEtendue(yB - yA, xB - xA)
    sBBx.epaisseur = 2
    sBBx.pointilles = 5
    sABx.epaisseur = 2
    sABx.pointilles = 5
    const lA = latex2d('A', xA, yA + 0.5, { letterSize: 'scriptsize' })
    const traceA = tracePoint(A, 'black') // Variable qui trace les points avec une croix
    const lB = latex2d('B', xB, yB + 0.5, { letterSize: 'scriptsize' })
    const lABx = latex2d(`${xB - xA}`, milieu(A, Bx).x, A.y + 0.3, {
      color: 'red',
      letterSize: 'scriptsize',
    })
    const lBBx = latex2d(`${yB - yA}`, B.x + 0.5, milieu(B, Bx).y, {
      color: 'blue',
      letterSize: 'scriptsize',
    })
    const traceB = tracePoint(B, 'black') // Variable qui trace les points avec une croix
    const d = droite(A, B, '', 'blue')
    d.epaisseur = 2
    traceA.taille = 3
    traceA.epaisseur = 2
    traceB.taille = 3
    traceB.epaisseur = 2
    const xmin = -6
    const ymin = -1
    const xmax = 6
    const ymax = 6
    const r1 = repere({
      xMin: xmin,
      xMax: xmax,
      xUnite: 1,
      yMin: ymin,
      yMax: ymax,
      yUnite: 1,
      thickHauteur: 0.1,
      xLabelMin: xmin + 1,
      xLabelMax: xmax - 1,
      yLabelMax: ymax - 1,
      yLabelMin: ymin + 1,
      axeXStyle: '->',
      axeYStyle: '->',
      yLabelDistance: 1,
      yLabelEcart: 0.3,
      grilleSecondaire: true,
      grilleSecondaireYDistance: 0.1,
      grilleSecondaireXDistance: 0.1,
      grilleSecondaireOpacite: 0.1,
      grilleSecondaireYMin: ymin - 0.1,
      grilleSecondaireYMax: ymax + 0.1,
      grilleSecondaireXMin: xmin - 0.1,
      grilleSecondaireXMax: xmax + 0.1,
    })
    const objet = mathalea2d(
      {
        xmin,
        xmax,
        ymin: ymin - 0.25,
        ymax: ymax + 0.25,
        pixelsParCm: 30,
        scale: 0.75,
        style: 'margin: auto',
      },
      d,
      r1,
      o,
    )
    const objetC = mathalea2d(
      {
        xmin,
        xmax,
        ymin,
        ymax: ymax + 0.25,
        pixelsParCm: 30,
        scale: 0.75,
        style: 'margin: auto',
      },
      d,
      r1,
      traceA,
      lA,
      lB,
      traceB,
      o,
      sABx,
      sBBx,
      lABx,
      lBBx,
    )

    this.enonce = `${deuxColonnes(
      `Dans un repère du plan, on a représenté une droite.<br><br>
      Le coefficient directeur de cette droite est égal  à :`,
      `${objet}`,
    )}<br>`

    if (yB === yA) {
      // this.reponse = this.versionQcm ? `$y= ${yA}$` : [`y=${maFraction.texFraction}x + ${yA}`, `y=\\frac{${yB - yA}}{${xB - xA}}x + ${yA}`, `y=\\frac{${yA - yB}}{${xA - xB}}x + ${yA}`]
      this.correction = `La droite est horizontale. On en déduit que son coefficient directeur est $m=${miseEnEvidence('0')}$.<br>
       `
      this.reponses = [
        '$0$',
        `${yA !== 1 && yA !== -1 ? `$${yA}$` : '$2$'}`,
        '$1$',
        '$-1$',
      ]
    } else {
      this.correction = `En prenant deux points sur la droite, on obtient :<br>
     
    $m=\\dfrac{${miseEnEvidence(yB - yA, 'blue')}}{${miseEnEvidence(xB - xA, 'red')}}=${miseEnEvidence(`${maFraction.texFractionSimplifiee}`)}$
       `
      this.correction += `<br>
          ${objetC}<br>  `
      this.reponses = [
        `$${maFraction.texFractionSimplifiee}$`,
        `${yB - yA !== xB - xA && yB - yA !== -(xB - xA) ? `$${maFraction.inverse().texFractionSimplifiee}$` : '$0$'}`,
        `$${maFraction.oppose().texFractionSimplifiee}$`,
        `${(yB - yA) / (xB - xA) !== yA ? `$${yA}$` : `$${xB}$`}`,
      ]
    }
  }

  // Ici il n'y a rien à faire, on appelle juste la version aleatoire (pour un qcm aleatoirisé, c'est le fonctionnement par défaut)
  constructor() {
    super()
    // this.options = { vertical: true, ordered: false }
    this.versionAleatoire()
  }
}
