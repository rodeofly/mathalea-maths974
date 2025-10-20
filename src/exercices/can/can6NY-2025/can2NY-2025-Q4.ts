import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'

import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { droiteGraduee } from '../../../lib/2d/reperes'
import Decimal from 'decimal.js'
import { latex2d } from '../../../lib/2d/textes'
export const titre = 'Trouver le nombre à ajouter'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '3cde4'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class NombreAajouter extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
  }

  nouvelleVersion() {
    const abs0 = 2025
    const abs1 = abs0 + 1
    const abs2 = abs0 + 2
    const graduation = randint(1, 9, 5)
    const x1 = new Decimal(graduation).div(5)
    const x1B = Number(x1.toFixed(1))
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

    this.reponse = texNombre(x1, 2) // texNombre(x1 * 25 + abs0)
    this.correction = `Entre $${texNombre(abs0)}$ et $${texNombre(abs1)}$, il y a un écart de $${texNombre(abs1 - abs0)}$ et il y a $${nbIntervalles}$ intervalles.<br>
       $${texNombre(abs1 - abs0)} \\div ${nbIntervalles} = 0,2$<br>
            Une graduation correspond donc à $0,2$ unité. <br>`
    if (graduation > 1)
      this.correction += `$${graduation}$ graduations correspondent donc à $${miseEnEvidence(this.reponse)}$ unité car $${graduation}\\times 0,2 = ${miseEnEvidence(this.reponse)}$. <br>`
    this.correction += `Ainsi, pour obtenir l'abscisse du point $A$, il faut ajouter $${miseEnEvidence(this.reponse)}$.`

    this.question = `Quel nombre doit-on ajouter à $${texNombre(2025, 0)}$ pout obtenir l'abscisse de $A$ ?`
    this.question +=
      '<br>' +
      mathalea2d(
        {
          xmin: -0.9,
          ymin: -1.5,
          xmax: 12,
          ymax: 1.5,
          pixelsParCm: 20,
          scale: 0.6,
        },
        latex2d('A', x1B * 5, 0.5, { color: 'blue' }),
        d,
      )
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
