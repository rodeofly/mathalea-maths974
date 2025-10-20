import ExerciceSimple from '../../ExerciceSimple'
import { Grille } from '../../../lib/2d/reperes'
import { Point } from '../../../lib/2d/points'
import { Polygone } from '../../../lib/2d/polygones'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { latex2d } from '../../../lib/2d/textes'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { segment } from '../../../lib/2d/segmentsVecteurs'
export const titre = "Calculer la longueur d'un contour"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '86c44'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Can2025CM1Q15 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
    this.optionsChampTexte = { texteApres: 'u' }
  }

  nouvelleVersion() {
    const grille = new Grille(3, 0, 10, 5, 'gray', 1, 1)
    const A = new Point(4, 4)
    const B = new Point(5, 4)
    const E = new Point(6, 1)
    const F = new Point(9, 1)
    const G = new Point(9, 2)
    const H = new Point(8, 2)
    const I = new Point(8, 3)
    const J = new Point(9, 3)
    const K = new Point(9, 4)
    const L = new Point(6, 4)
    const poly1 = new Polygone([E, F, G, H, I, J, K, L])
    const segU = segment(A, B)
    poly1.epaisseur = 3
    segU.epaisseur = 4
    const Unite = latex2d('1 \\text{u}', 4.4, 4.7, { letterSize: 'normalsize' })
    const objets = [grille, poly1, Unite, segU]
    this.question = 'Donne la longueur du contour de cette figure.<br> '
    this.question += mathalea2d(
      Object.assign(
        { scale: 0.5, style: 'margin: auto' },
        fixeBordures(objets),
      ),
      objets,
    )
    /* this.canEnonce = this.question
      this.canReponseACompleter = 'Figure $\\ldots$'
      */
    this.reponse = 14
    this.canEnonce = mathalea2d(
      Object.assign({ scale: 0.5 }, fixeBordures(objets)),
      objets,
    )
    this.canReponseACompleter =
      'La longueur du contour de cette figure est $\\ldots$ u.'

    this.correction = ` La longueur du contour  est  $${miseEnEvidence(14)}$ u.`
  }
}
