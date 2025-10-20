import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'

import { mathalea2d } from '../../../modules/2dGeneralites'
import { milieu, point } from '../../../lib/2d/points'
import { latex2d } from '../../../lib/2d/textes'
import { codageSegments } from '../../../lib/2d/codages'
import { segment } from '../../../lib/2d/segmentsVecteurs'
export const titre = 'Trouver une longuer'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '90ae3'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora
 */
export default class longueurDansTriangle extends ExerciceSimple {
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
        `${texNombre(b, 0)} \\text{ cm}`,
        milieu(A, B).x,
        milieu(A, B).y - 0.7,
        { letterSize: 'scriptsize' },
      ),
      latex2d('?', milieu(B, C).x + 1, milieu(B, C).y + 0.5, {
        letterSize: 'scriptsize',
      }),
      s1,
      s2,
      s3,
    )

    this.question = `Le périmètre de ce triangle est  $${texNombre(2 * a + b)}$ cm. <br>
        Que vaut la longueur indiquée par le point d'interrogation ?`
    this.reponse = a
    this.correction = `Le triangle est isocèle, il possède donc deux longueurs égales.<br>
            Puisque le périmètre est  $${texNombre(2 * a + b)}$ cm, on obtient la somme des deux longueurs égales  du triangle en effectuant la différence $${texNombre(2 * a + b)}-${texNombre(b)}=${texNombre(2 * a)}$ cm.<br>
            On obtient la longueur cherchée en divisant par $2$, soit $${texNombre(2 * a)}\\div 2=${miseEnEvidence(texNombre(a))}$ cm.`
    this.question +=
      '<br>' +
      mathalea2d(
        {
          xmin: -0.5,
          ymin: -1,
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
