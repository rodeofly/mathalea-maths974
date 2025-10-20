import { codageSegments, placeLatexSurSegment } from '../../../lib/2d/codages'
import { droite } from '../../../lib/2d/droites'
import { Point, point, tracePointSurDroite } from '../../../lib/2d/points'
import { segment, vecteur } from '../../../lib/2d/segmentsVecteurs'
import { labelPoint } from '../../../lib/2d/textes'
import { translation } from '../../../lib/2d/transformations'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import {
  fixeBordures,
  mathalea2d,
  ObjetMathalea2D,
} from '../../../modules/2dGeneralites'
import { context } from '../../../modules/context'
import { randint } from '../../../modules/outils'
import ExerciceCan from '../../ExerciceCan'

export const titre = "Partage d'un segment"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'y343x'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['PR-7'],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N5Q18 extends ExerciceCan {
  enonce(a?: number, b?: number, c?: number) {
    if (a == null || b == null || c == null) {
      b = randint(3, 6, 5)
      a = randint(1, b - 1)
      c = (randint(4, 9) * b) / 10
      do {
        b = randint(3, 6, 5)
        a = randint(1, b - 1)
        c = (randint(4, 9) * b) / 10
      } while (b === 2 * a)
    }
    const A = point(0, 0, 'A', 'above')
    const B = point((7 * a) / b, 0, 'B', 'above')
    const C = point(7, 0)
    const s = segment(A, C)
    s.styleExtremites = '|-|'
    s.tailleExtremites = 7
    const s2 = translation(s, vecteur(0, -0.5))
    s2.styleExtremites = '<->'
    const l = placeLatexSurSegment(`${texNombre(c, 1)}\\text{ cm}`, A, C, {
      distance: -0.9,
      letterSize: 'footnotesize',
    })
    const ps: ObjetMathalea2D[] = []
    const pts = [A]
    const d = droite(A, C)
    let p: Point
    for (let i = 0; i < b - 1; i++) {
      p = point(((i + 1) * 7) / b, 0)
      pts.push(p)
      pts.push(p)
      const pSurS = tracePointSurDroite(p, d)
      pSurS.epaisseur = 2
      pSurS.taille = 0.15
      ps.push(pSurS)
    }
    pts.push(C)
    const codages = codageSegments('//', 'black', ...pts)
    codages.echelle = 0.6
    const labels = labelPoint(A, B)
    this.reponse = texNombre((a * c) / b, 2)
    this.question = `${mathalea2d(Object.assign({ pixelsParCm: 30 }, fixeBordures([s, s2, codages, ps, labels, l], { rymin: 0 })), [s, s2, codages, ps, labels, l])}`
    this.correction = `Le segment $[AB]$ mesure $\\dfrac{${a}}{${b}}$ de $${texNombre(c, 1)}$ cm.<br>`
    if (a === 1) {
      this.correction += `$\\begin{aligned}
   AB&= \\dfrac{${a}}{${b}}\\times ${texNombre(c, 1)}\\\\
   &=\\dfrac{${texNombre(c, 1)}}{${b}}\\\\
    &=${texNombre(c, 1)}\\div ${b}\\\\
    &=${miseEnEvidence(texNombre((a * c) / b, 1))} \\text{ cm}
    \\end{aligned}$`
    } else {
      this.correction += `$\\begin{aligned}
      AB&=\\dfrac{${a}}{${b}}\\times ${texNombre(c, 1)}\\\\
      &=${a}\\times\\dfrac{${texNombre(c, 1)}}{${b}}\\\\
      &=${a}\\times ${texNombre(c / b, 1)}\\\\
      &=${miseEnEvidence(texNombre((a * c) / b, 1))} \\text{ cm}
      \\end{aligned}$`
    }
    this.canEnonce = this.question
    this.canReponseACompleter = '$AB=\\ldots$ cm'
    this.optionsChampTexte = { texteApres: ' cm' }
    if (this.interactif) {
      this.question += '<br>$AB=$'
    } else if (context.isHtml) {
      this.question += '<br>$AB=\\ldots$ cm'
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(1, 3, 2.1) : this.enonce()
  }
}
