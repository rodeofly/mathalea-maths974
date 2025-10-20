import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { milieu, point } from '../../../lib/2d/points'
import { latex2d } from '../../../lib/2d/textes'
import { codageSegments } from '../../../lib/2d/codages'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { codageAngleDroit } from '../../../lib/2d/angles'
import Decimal from 'decimal.js'
import { choice } from '../../../lib/outils/arrayOutils'
export const titre = 'Calculer un périmètre'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'e45ab'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora
 */
export default class perimetreCalcul extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsChampTexte = { texteApres: ' cm' }
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const objets = []
    const diviseur = choice([1, 10, 100, 1000])
    const a = new Decimal(2025).div(diviseur)
    const A = point(0, 0, 'A', 'below')
    const B = point(6, 0, 'B', 'below')
    const C = point(6, 6, 'C', 'below')
    const D = point(0, 6, 'D', 'below')
    const s1 = segment(A, B)
    const s2 = segment(B, C)
    const s3 = segment(C, D)
    const s4 = segment(A, D)

    objets.push(
      latex2d(
        `${texNombre(new Decimal(a), 3)} \\text{ cm}`,
        8,
        milieu(B, C).y + 0.7,
        { letterSize: 'scriptsize' },
      ),
      codageSegments('||', 'blue', A, B),
      codageSegments('||', 'blue', B, C),
      codageSegments('||', 'blue', C, D),
      codageSegments('||', 'blue', A, D),
      codageAngleDroit(D, A, B),
      codageAngleDroit(A, B, C),
      codageAngleDroit(B, C, D),
      codageAngleDroit(C, D, A),
      s1,
      s2,
      s3,
      s4,
    )
    this.question = 'Quel est le périmètre de ce carré ? '

    this.question +=
      '<br>' +
      mathalea2d(
        Object.assign(
          { scale: 0.4, style: 'margin: auto' },
          fixeBordures(objets),
        ),
        objets,
      )
    this.reponse = texNombre(new Decimal(a).mul(4), 4)
    this.correction = `Il s'agit d'un carré. <br>
          Son périmètre est donc
         $4$ fois la longueur de son côté, soit $4\\times ${texNombre(a)}=${miseEnEvidence(this.reponse)}$ cm.`

    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\ldots$ cm'
  }
}
