import ExerciceSimple from '../../ExerciceSimple'
import { Grille } from '../../../lib/2d/reperes'
import { Point } from '../../../lib/2d/points'

import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { latex2d } from '../../../lib/2d/textes'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { randint } from '../../../modules/outils'
import { texNombre } from '../../../lib/outils/texNombre'

export const titre = 'Calculer une longueur'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'f2560'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Can2025N6Q17 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.optionsChampTexte = { texteApres: 'cm ' }
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const grille = new Grille(0, 0, 8, 3, 'gray', 1, 1)
    const A = new Point(1, 1)
    const B = new Point(7, 1)
    const seg1 = segment(A, B)
    const C = new Point(6, 2)
    const D = new Point(1, 2)
    const seg2 = segment(C, D)
    const l1 = this.canOfficielle ? 20 : randint(1, 10) * 5
    const l2 = l1 * 1.2
    seg1.epaisseur = 3
    seg2.epaisseur = 3
    const long = latex2d(`${l1}\\text{ cm}`, 3.5, 2.5, {
      letterSize: 'normalsize',
    })
    const longCherche = latex2d('\\ldots \\text{ cm}', 4.5, 0.5, {
      letterSize: 'normalsize',
    })
    const objets = [grille, seg1, seg2, long, longCherche]
    this.question = 'Complète.'
    this.question += mathalea2d(
      Object.assign({ scale: 0.5 }, fixeBordures(objets)),
      objets,
    )
    this.canEnonce = 'Complète.'
    this.canReponseACompleter = mathalea2d(
      Object.assign({ scale: 0.5 }, fixeBordures(objets)),
      objets,
    )
    this.reponse = texNombre(l2, 0)
    this.correction = `Chaque carreau a une longueur de $${l1}\\div 5 = ${texNombre(l1 / 5, 0)}$ cm, ainsi la longueur du segment est $6$ fois celle d'un carreau, soit $${miseEnEvidence(this.reponse)}$ cm.`
  }
}
