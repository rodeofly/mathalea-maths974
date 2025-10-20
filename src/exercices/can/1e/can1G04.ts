import {
  afficheLongueurSegment,
  afficheMesureAngle,
} from '../../../lib/2d/codages'
import { point, pointAdistance } from '../../../lib/2d/points'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { labelPoint } from '../../../lib/2d/textes'
import { choice } from '../../../lib/outils/arrayOutils'
import { choisitLettresDifferentes } from '../../../lib/outils/aleatoires'
import { texNombre } from '../../../lib/outils/texNombre'
import ExerciceSimple from '../../ExerciceSimple'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { randint } from '../../../modules/outils'
import Decimal from 'decimal.js'
import FractionEtendue from '../../../modules/FractionEtendue'
export const titre =
  'Calculer un produit scalaire à l’aide de normes et d’un angle '
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '26/06/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 *
*/
export const uuid = 'df08a'

export const refs = {
  'fr-fr': ['can1G04'],
  'fr-ch': [],
}
export default class ProduitScalaireNormesAngles extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const choix = choice([true, false])
    const nom = choisitLettresDifferentes(3, 'O', true)
    const A = point(0, 0, nom[0], 'below')
    const a = randint(4, 8) //
    const B = pointAdistance(A, a, 0, nom[1], 'below')
    const b = randint(4, 8) //
    const d = new Decimal(a * b).div(2)
    const f1 = new FractionEtendue(a * b, 2)
    const Angle = [
      [60, '\\dfrac{\\pi}{3}', '\\dfrac{\\pi}{3}', 2.5],
      [30, '\\dfrac{\\pi}{6}', '\\dfrac{\\pi}{6}', 5],
      [45, '\\dfrac{\\pi}{4}', '\\dfrac{\\pi}{4}', 3],
      [120, '\\dfrac{2\\pi}{3}', '\\dfrac{2\\pi}{3}', 2],
      [135, '\\dfrac{3\\pi}{4}', '\\dfrac{3\\pi}{4}', 2],
      [150, '\\dfrac{5\\pi}{6}', '\\dfrac{5\\pi}{6}', 1.5],
    ]
    const angle = choice(Angle)
    const C = pointAdistance(A, b, angle[0], nom[2], 'above')
    const vAB = segment(A, B, 'blue', '->')
    vAB.epaisseur = 2
    const a1 = afficheLongueurSegment(B, A, 'black', 0.5, '')
    const a2 = afficheLongueurSegment(A, C, 'black', 0.5, '')
    const vAC = segment(A, C, 'red', '->')
    vAC.epaisseur = 2
    vAC.tailleExtremites = 7
    vAB.tailleExtremites = 7
    const a3 = afficheMesureAngle(
      B,
      A,
      C,
      'black',
      2,
      choix ? `${angle[0]}°` : `${angle[1]}`,
      { ecart: 1 },
    )
    const objets = []
    const xmin = Math.min(A.x, B.x, C.x) - 1
    const ymin = Math.min(A.y, B.y, C.y) - 1.5
    const xmax = Math.max(A.x, B.x, C.x) + 1
    const ymax = Math.max(A.y, B.y, C.y) + 1.5

    objets.push(a3, vAB, vAC, labelPoint(A, B, C), a1, a2)

    this.question = `Calculer $\\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}$.<br>
    
    `
    this.question += mathalea2d(
      {
        xmin,
        ymin,
        xmax,
        ymax,
        pixelsParCm: 15,
        mainlevee: false,
        amplitude: 0.3,
        scale: 0.5,
        style: 'margin: auto',
      },
      objets,
    )
    if (angle[0] === 30) {
      this.correction = `
    $\\begin{aligned}
    \\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}&=${nom[0]}${nom[1]}\\times ${nom[0]}${nom[2]}\\times \\cos(\\widehat{${nom[2]}${nom[0]}${nom[1]}})\\\\
    &=${choix ? `${a}\\times ${b}\\times \\cos(${angle[0]}°)` : `${a}\\times ${b}\\times \\cos\\left(${angle[2]}\\right)`}\\\\
             &=\\dfrac{${a * b}\\sqrt{3}}{2}\\\\
             &=${texNombre(d, 1)}\\sqrt{3}
             \\end{aligned}$



   `
      this.reponse = [`${d}\\sqrt{3}`, `${f1.texFraction}\\times\\sqrt{3}`]
    }

    if (angle[0] === 45) {
      this.correction = `
      $\\begin{aligned}
      \\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}&=${nom[0]}${nom[1]}\\times ${nom[0]}${nom[2]}\\times \\cos(\\widehat{${nom[2]}${nom[0]}${nom[1]}})\\\\
      &=${choix ? `${a}\\times ${b}\\times \\cos(${angle[0]}°)` : `${a}\\times ${b}\\times \\cos\\left(${angle[2]}\\right)`}\\\\
               &=\\dfrac{${a * b}\\times\\sqrt{2}}{2}\\\\
               &=${texNombre(d, 1)}\\sqrt{2}
               \\end{aligned}$



     `
      this.reponse = [`${d}\\sqrt{2}`, `${f1.texFraction}\\times\\sqrt{2}`]
    }

    if (angle[0] === 60) {
      this.correction = `
      $\\begin{aligned}
      \\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}&=${nom[0]}${nom[1]}\\times ${nom[0]}${nom[2]}\\times \\cos(\\widehat{${nom[2]}${nom[0]}${nom[1]}})\\\\
               &=${choix ? `${a}\\times ${b}\\times \\cos(${angle[0]}°)` : `${a}\\times ${b}\\times \\cos\\left(${angle[2]}\\right)`}\\\\
               &=${a * b}\\times\\dfrac{1}{2}\\\\
               &=${texNombre(d, 1)}
               \\end{aligned}$



     `
      this.reponse = [`${d}`, `${f1.texFraction}`]
    }

    if (angle[0] === 120) {
      this.correction = `
    $\\begin{aligned}
    \\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}&=${nom[0]}${nom[1]}\\times ${nom[0]}${nom[2]}\\times \\cos(\\widehat{${nom[2]}${nom[0]}${nom[1]}})\\\\
    &=${choix ? `${a}\\times ${b}\\times \\cos(${angle[0]}°)` : `${a}\\times ${b}\\times \\cos\\left(${angle[2]}\\right)`}\\\\
             &=${a * b}\\times\\dfrac{-1}{2}\\\\
             &=${texNombre(-d, 1)}
             \\end{aligned}$



   `
      this.reponse = [`${-d}`, `${f1.oppose().texFraction}`]
    }

    if (angle[0] === 135) {
      this.correction = `
  $\\begin{aligned}
  \\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}&=${nom[0]}${nom[1]}\\times ${nom[0]}${nom[2]}\\times \\cos(\\widehat{${nom[2]}${nom[0]}${nom[1]}})\\\\
  &=${choix ? `${a}\\times ${b}\\times \\cos(${angle[0]}°)` : `${a}\\times ${b}\\times \\cos\\left(${angle[2]}\\right)`}\\\\
           &=${a * b}\\times\\dfrac{-\\sqrt{2}}{2}\\\\
           &=${texNombre(-d, 1)}\\sqrt{2}
           \\end{aligned}$



 `
      this.reponse = [
        `${-d}\\sqrt{2}`,
        `${f1.oppose().texFraction}\\times\\sqrt{2}`,
      ]
    }

    if (angle[0] === 150) {
      this.correction = `
    $\\begin{aligned}
    \\overrightarrow{${nom[0]}${nom[1]}}\\cdot\\overrightarrow{${nom[0]}${nom[2]}}&=${nom[0]}${nom[1]}\\times ${nom[0]}${nom[2]}\\times \\cos(\\widehat{${nom[2]}${nom[0]}${nom[1]}})\\\\
    &=${choix ? `${a}\\times ${b}\\times \\cos(${angle[0]}°)` : `${a}\\times ${b}\\times \\cos\\left(${angle[2]}\\right)`}\\\\
             &=${a * b}\\times\\dfrac{-\\sqrt{3}}{2}\\\\
             &=${texNombre(-d, 1)}\\sqrt{3}
             \\end{aligned}$



   `
      this.reponse = [
        `${-d}\\sqrt{3}`,
        `${f1.oppose().texFraction}\\times\\sqrt{3}`,
      ]
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
