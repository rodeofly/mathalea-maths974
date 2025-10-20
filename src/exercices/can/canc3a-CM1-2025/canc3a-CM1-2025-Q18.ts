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
import { choice } from '../../../lib/outils/arrayOutils'
export const titre =
  "Calculer la longueur d'un côté d'un triangle connaissant la longueur de son contour"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '66e74'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Can2025CM1Q18 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsChampTexte = { texteApres: 'cm. ' }
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const A = new Point(0, 0)
    const B = new Point(6, 0)
    const C = new Point(2.5, 3.3)
    const triangle = new Polygone([A, B, C])
    const cote1 = segment(point(0, -0.5), point(6, -0.5))
    const cote2 = segment(point(6.4, 0.2), point(2.65, 3.6))
    const cote3 = segment(point(2, 3.45), point(-0.3, 0.28))
    cote1.styleExtremites = '<->'
    cote2.styleExtremites = '<->'
    cote3.styleExtremites = '<->'
    triangle.epaisseur = 2
    const l1 = this.canOfficielle ? 6 : randint(5, 9)
    const l2 = this.canOfficielle ? 5 : l1 - 1
    const l3 = this.canOfficielle ? 4 : l1 - choice([2, 3])
    const longueur1 = latex2d(`${l1} \\text{ cm}`, 3, -1, {
      letterSize: 'normalsize',
    })
    const longueur2 = latex2d(`${l2} \\text{ cm}`, 5.5, 2, {
      letterSize: 'normalsize',
    })
    const longueur3 = latex2d('\\ldots \\text{ cm}', -0.5, 2, {
      letterSize: 'normalsize',
    })
    const objets = [
      triangle,
      cote1,
      cote2,
      cote3,
      longueur1,
      longueur2,
      longueur3,
    ]

    this.question = mathalea2d(
      Object.assign(
        { scale: 0.5, style: 'display: block', pixelsParCm: 25 },
        fixeBordures(objets),
      ),
      objets,
    )
    this.question += `La longueur du contour de ce triangle  est de  $${l1 + l2 + l3}$ cm.<br>`
    if (!this.interactif) {
      this.question += 'Complète.'
    } else {
      this.question += 'La longueur manquante est : '
    }
    this.canEnonce = `La longueur du contour de ce triangle  est de  $${l1 + l2 + l3}$ cm.<br>
    Complète. `
    this.canReponseACompleter = mathalea2d(
      Object.assign(
        { scale: 0.5, style: 'display: block', pixelsParCm: 25 },
        fixeBordures(objets),
      ),
      objets,
    )
    this.reponse = texNombre(l3, 0)
    this.correction = `La longueur du côté est donnée par :  <br>
    $${l1 + l2 + l3}-${l1}-${l2}=${miseEnEvidence(l3)}$ cm.`
  }
}
