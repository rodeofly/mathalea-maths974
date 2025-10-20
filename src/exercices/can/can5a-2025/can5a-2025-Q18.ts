import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { point } from '../../../lib/2d/points'
import { polygone } from '../../../lib/2d/polygones'
import { afficheMesureAngle } from '../../../lib/2d/codages'
import { context } from '../../../modules/context'
import { codageAngleDroit } from '../../../lib/2d/angles'

export const titre = "Somme des angles d'un triangle"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'a343x'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N5Q18 extends ExerciceCan {
  enonce(a?: number) {
    if (a == null) {
      a = randint(7, 12) * 5
    }
    const A = point(0, 0)
    const B =
      a > 45
        ? point(0, 5 * Math.sin((a * Math.PI) / 180))
        : point(5 * Math.cos((a * Math.PI) / 180), 0)
    const C =
      a > 45
        ? point(5 * Math.cos((a * Math.PI) / 180), 0)
        : point(0, 5 * Math.sin((a * Math.PI) / 180))
    const triangle1 = polygone(A, B, C)
    const ad = codageAngleDroit(B, A, C)
    const am1 = afficheMesureAngle(A, B, C, 'black', 0.8)
    const am2 = afficheMesureAngle(B, C, A, 'black', 0.5, '?')
    this.reponse = a > 45 ? a : 90 - a
    this.question = `${mathalea2d(Object.assign({ scale: 0.7 }, fixeBordures([triangle1, ad, am1, am2], { rymin: 0 })), [triangle1, ad, am1, am2])}`
    this.correction = `La somme des angles d'un triangle est égale à $180$°, donc $90^\\circ+${a}^\\circ+\\text{ ? } =180^\\circ$<br>
    Soit $?=180^\\circ-90^\\circ-${a > 45 ? `${90 - a}` : `${a}`}^\\circ=90^\\circ-${a > 45 ? `${90 - a}` : `${a}`}^\\circ=${miseEnEvidence(`${a > 45 ? `${a}` : `${90 - a}`}`)}^\\circ$.`
    this.canEnonce = this.question
    this.canReponseACompleter = '$?=\\ldots^\\circ$'
    this.optionsChampTexte = { texteApres: '$^\\circ$' }
    if (this.interactif) {
      this.question += '<br>$?=$'
    } else if (context.isHtml) {
      this.question += '<br>$?=\\ldots^\\circ$'
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(40) : this.enonce()
  }
}
