import { pave } from '../../../lib/2d/projections3d'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
export const titre = 'Volume de pavé droit'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '04/07/2022'

/**
 * @author Jean-Claude Lhote
 *

 */
export const uuid = 'f8019'

export const refs = {
  'fr-fr': ['can6M10'],
  'fr-ch': [],
}
export default class VolumePaveSimple extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.sup = 1
  }

  nouvelleVersion() {
    const l = randint(2, 5)
    const L = randint(2, 4)
    const h = randint(2, 6, [l, L])
    const pav = pave(L, l, h)
    this.question = `L'unité de longueur est le centimètre. Quel est le volume du pavé droit ci-dessous ?<br>
  ${mathalea2d(Object.assign({ scale: 0.8 }, fixeBordures([pav])), pav)}`
    this.reponse = L * l * h
    this.correction = `Le volume de ce pavé droit est : $${L}$ $\\text{cm}\\times ${l}$ $\\text{cm}\\times ${h}$ $\\text{cm}=${miseEnEvidence(this.reponse)}$ $\\text{cm}^3$.`
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\dots$ cm$^3$'
  }
}
