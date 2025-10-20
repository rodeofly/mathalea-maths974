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
import { codageAngleDroit } from '../../../lib/2d/angles'
import { codageSegments } from '../../../lib/2d/codages'

export const titre = "Calculer la longueur d'un côté d'un carré"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'c12df'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Can2025N6Q18 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsChampTexte = { texteApres: 'cm. ' }
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const perimetre = this.canOfficielle ? 18 : randint(2, 9) * 4 + 2
    const A = new Point(0, 0)
    const B = new Point(4, 0)
    const C = new Point(4, 4)
    const D = new Point(0, 4)
    const rectangle = new Polygone([A, B, C, D])
    const angle1 = codageAngleDroit(D, A, B)
    const angle2 = codageAngleDroit(A, B, C)
    const angle3 = codageAngleDroit(B, C, D)
    const angle4 = codageAngleDroit(C, D, A)
    const codage = codageSegments('//', 'black', A, B, B, C, C, D, D, A)
    const horizontale = segment(point(0, -0.7), point(4, -0.7))
    horizontale.styleExtremites = '<->'

    const longueur = latex2d('\\ldots \\text{ cm}', 2, -1, {
      letterSize: 'normalsize',
    })
    const objets = [
      rectangle,
      angle1,
      angle2,
      angle3,
      angle4,
      horizontale,
      longueur,
      codage,
    ]

    this.question = mathalea2d(
      Object.assign(
        { scale: 0.5, style: 'display: block', pixelsParCm: 25 },
        fixeBordures(objets),
      ),
      objets,
    )
    this.question += `Le périmètre de ce carré est égal à $${perimetre}$ cm.<br>
    La longueur du côté est égale à `
    if (!this.interactif) {
      this.question += '$\\ldots$ cm.'
    }
    this.canEnonce = `Le périmètre de ce carré est égal à $${perimetre}$ cm.<br>
    Complète. `
    this.canReponseACompleter = mathalea2d(
      Object.assign(
        { scale: 0.5, style: 'display: block', pixelsParCm: 25 },
        fixeBordures(objets),
      ),
      objets,
    )
    this.reponse = texNombre(perimetre / 4, 1)
    this.correction = `La longueur du côté du carré est  : $${perimetre}\\div 4= ${miseEnEvidence(this.reponse)}$ cm.`
  }
}
