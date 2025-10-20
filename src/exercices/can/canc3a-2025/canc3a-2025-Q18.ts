import ExerciceSimple from '../../ExerciceSimple'
import { point, Point } from '../../../lib/2d/points'

import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { latex2d } from '../../../lib/2d/textes'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { randint } from '../../../modules/outils'
import { texNombre } from '../../../lib/outils/texNombre'
import { Polygone } from '../../../lib/2d/polygones'
import { codageSegments } from '../../../lib/2d/codages'
export const titre = "Calculer la longueur d'un côté d'un triangle équilatéral"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '9c3bb'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Can2025CM2Q18 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsChampTexte = { texteApres: 'cm. ' }
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const perimetre = this.canOfficielle ? 15 : randint(5, 12) * 3
    const A = new Point(0, 0)
    const B = new Point(4, 0)
    const C = new Point(2, 3.5)
    const triangle = new Polygone([A, B, C])
    const codage = codageSegments('//', 'black', A, B, B, C, C, A)
    const horizontale = segment(point(0, -0.7), point(4, -0.7))
    horizontale.styleExtremites = '<->'

    const longueur = latex2d('\\ldots \\text{ cm}', 2, -1.5, {
      letterSize: 'normalsize',
    })
    const objets = [triangle, horizontale, longueur, codage]

    this.question = mathalea2d(
      Object.assign(
        { scale: 0.5, style: 'display: block', pixelsParCm: 25 },
        fixeBordures(objets),
      ),
      objets,
    )
    this.question += `Le périmètre de ce triangle équilatéral est de  $${perimetre}$ cm.<br>
    La longueur du côté est égale à `
    if (!this.interactif) {
      this.question += '$\\ldots$ cm.'
    }
    this.canEnonce = `Le périmètre de ce triangle équilatéral est de  $${perimetre}$ cm.<br>
    Complète. `
    this.canReponseACompleter = mathalea2d(
      Object.assign(
        { scale: 0.5, style: 'display: block', pixelsParCm: 25 },
        fixeBordures(objets),
      ),
      objets,
    )
    this.reponse = texNombre(perimetre / 3, 0)
    this.correction = `La longueur du côté du triangle équilatéral est  : $${perimetre}\\div 3= ${miseEnEvidence(this.reponse)}$ cm.`
  }
}
