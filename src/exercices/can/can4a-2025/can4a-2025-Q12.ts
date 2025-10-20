import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { point } from '../../../lib/2d/points'
import { homothetie, translation } from '../../../lib/2d/transformations'
import { segment, vecteur } from '../../../lib/2d/segmentsVecteurs'
import { labelPoint } from '../../../lib/2d/textes'
import { placeLatexSurSegment } from '../../../lib/2d/codages'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { choice } from '../../../lib/outils/arrayOutils'

export const titre = 'Distance sur un segment'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'byxrt'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N4Q12 extends ExerciceCan {
  enonce(a?: number, b?: number) {
    if (a == null || b == null) {
      b = randint(11, 25)
      a = choice([true, false])
        ? randint(4, Math.round(b / 2) - 1)
        : randint(Math.round(b / 2) - 1, b - 4)
    }
    const A = point(0, 0, 'A', 'above')
    const C = point(10, 0, 'C', 'above')
    const B = homothetie(C, A, a / b, 'B', 'above')
    const sB = segment(B.x, B.y - 0.2, B.x, B.y + 0.2)
    const s = segment(A, C)
    s.styleExtremites = '|-|'
    const s2 = translation(s, vecteur(0, -0.5))
    s2.styleExtremites = '<->'
    const labels = labelPoint(A, B, C)
    const l1 = placeLatexSurSegment(texNombre(a, 0), A, B, {
      letterSize: 'footnotesize',
    })
    const l2 = placeLatexSurSegment('x', B, C, { letterSize: 'footnotesize' })
    const l3 = placeLatexSurSegment(texNombre(b, 0), A, C, {
      distance: -1,
      letterSize: 'footnotesize',
    })
    const objets = [s, s2, labels, l1, l2, l3, sB]
    this.reponse = b - a
    this.question =
      mathalea2d(
        Object.assign({ pixelsParCm: 25, scale: 0.6 }, fixeBordures(objets)),
        objets,
      ) + '<br>'

    this.correction = `$x=${b}-${a}=${miseEnEvidence(b - a)}$`
    this.canEnonce = mathalea2d(
      Object.assign({ pixelsParCm: 25, scale: 0.6 }, fixeBordures(objets)),
      objets,
    )
    this.canReponseACompleter = '$x=\\ldots\\ldots$'
    if (this.interactif) {
      this.optionsChampTexte = { texteAvant: '$x =$ ' }
    } else {
      this.question += '$x=\\ldots$'
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(7, 11) : this.enonce()
  }
}
