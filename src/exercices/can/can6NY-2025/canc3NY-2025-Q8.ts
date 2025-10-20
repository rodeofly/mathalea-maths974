import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import { mathalea2d } from '../../../modules/2dGeneralites'
import Decimal from 'decimal.js'
import { droiteGraduee } from '../../../lib/2d/reperes'
import { choice } from '../../../lib/outils/arrayOutils'
import { latex2d } from '../../../lib/2d/textes'

import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Déterminer une abscisse'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '79e4a'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter + Gilles Mora

*/
export default class CompleterUneSuite extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const choix = choice([true, false])
    const abs0 = choix ? 2000 : 2020
    const abs1 = choix ? abs0 + 25 : abs0 + 5
    const abs2 = choix ? abs0 + 50 : abs0 + 10
    const x1 = this.canOfficielle
      ? new Decimal(0.6)
      : new Decimal(randint(1, 9, 5) * 2).div(10)
    const x1B = Number(x1.toFixed(1))
    const x2 = x1.mul(choix ? 25 : 5).add(abs0)
    const d = droiteGraduee({
      Unite: 5,
      Min: 0,
      Max: 2.1,
      thickSecDist: 0.2,
      axeStyle: '->',
      pointTaille: 3,
      pointStyle: 'x',
      labelsPrincipaux: false,
      thickSec: true,
      labelListe: [
        [0, `${texNombre(abs0)}`],
        [1, `${texNombre(abs1)}`],
        [2, `${texNombre(abs2)}`],
      ],
      pointListe: [[x1, '']],
    })
    const nbIntervalles = 5

    this.reponse = texNombre(x2, 0) // texNombre(x1 * 25 + abs0)
    this.correction = `Entre $${texNombre(abs0)}$ et $${texNombre(abs1)}$, il y a un écart de $${texNombre(abs1 - abs0)}$ et $${nbIntervalles}$ intervalles.<br>
    $${texNombre(abs1 - abs0)} \\div ${nbIntervalles} = 5$<br>
                Une graduation correspond donc à $5$ unités. <br>
               Ainsi, l'abscisse du point $A$ est $${miseEnEvidence(this.reponse)}$.`

    this.question = "Déterminer l'abscisse du point $A$ ci-dessous :"
    this.question +=
      '<br>' +
      mathalea2d(
        {
          xmin: -0.9,
          ymin: -1.5,
          xmax: 15,
          ymax: 1.5,
          pixelsParCm: 30,
          scale: 0.6,
        },
        latex2d('A', x1B * 5, 0.5, { color: 'blue' }),
        d,
      )
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
