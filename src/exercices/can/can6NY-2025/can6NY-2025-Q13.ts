import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import ExerciceSimple from '../../ExerciceSimple'

import { randint } from '../../../modules/outils'

import { codageSegments } from '../../../lib/2d/codages'
import { milieu, point } from '../../../lib/2d/points'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { latex2d } from '../../../lib/2d/textes'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { mathalea2d } from '../../../modules/2dGeneralites'
export const titre = "Déterminer le périmètre d'un triangle"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '31871'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['9ES2-13'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class SommeDeProduitsCompleter extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsChampTexte = { texteApres: ' cm' }
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const objets = []
    const a = randint(11, 15) * 100
    const b = 2025
    const A = point(0, 0, 'A', 'below')
    const B = point(5, 0, 'B', 'below')
    const C = point(2.5, 2, 'C', 'below')
    const s1 = segment(A, B)
    const s2 = segment(B, C)
    const s3 = segment(A, C)
    objets.push(
      codageSegments('||', 'blue', B, C),
      codageSegments('||', 'blue', C, A),
      latex2d(
        `${texNombre(2025, 0)} \\text{ cm}`,
        milieu(A, B).x,
        milieu(A, B).y - 0.7,
        { letterSize: 'scriptsize' },
      ),
      latex2d(
        `${texNombre(a, 0)} \\text{ cm}`,
        milieu(B, C).x + 1,
        milieu(B, C).y + 0.5,
        { letterSize: 'scriptsize' },
      ),
      s1,
      s2,
      s3,
    )
    this.question = 'Quel est  le périmètre de ce triangle ?'
    this.reponse = 2 * a + b
    this.correction = `Le triangle est isocèle.<br>
            Son périmètre est : $(2\\times ${texNombre(a)}$ cm) + $${texNombre(b)}$ cm $=${miseEnEvidence(texNombre(2 * a + b))}$ cm.`

    this.question +=
      '<br>' +
      mathalea2d(
        {
          xmin: -0.5,
          ymin: -0.9,
          xmax: 6,
          ymax: 2.5,
          scale: 0.7,
          style: 'margin: auto',
        },
        objets,
      )

    if (this.interactif) {
      this.question += '<br>'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\ldots$ cm'
  }
}
