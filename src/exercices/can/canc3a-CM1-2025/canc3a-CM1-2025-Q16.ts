import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'

import { Grille } from '../../../lib/2d/reperes'
import { Point } from '../../../lib/2d/points'
import { Polygone } from '../../../lib/2d/polygones'
import {
  colorToLatexOrHTML,
  fixeBordures,
  mathalea2d,
} from '../../../modules/2dGeneralites'
import { latex2d } from '../../../lib/2d/textes'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Tracer une figure avec une aire donnée'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '7522d'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Can2025CM1Q16 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
    this.optionsChampTexte = { texteApres: 'petits carreaux' }
  }

  nouvelleVersion() {
    const u = this.canOfficielle ? 2 : randint(2, 4)
    const grille = new Grille(2, 0, 12, 5, 'gray', 1, 1)
    const A = new Point(8, 4)
    const B = new Point(8 + u, 4)
    const C = new Point(8 + u, 5)
    const D = new Point(8, 5)

    const poly1 = new Polygone([A, B, C, D])
    const a = this.canOfficielle ? 3 : randint(4, 6)
    poly1.epaisseur = 2
    poly1.couleurDeRemplissage = colorToLatexOrHTML('gray')
    const Unite = latex2d('1 \\text{ua}', (16 + u) / 2, 4.6, {
      letterSize: 'normalsize',
    })
    const objets = [grille, poly1, Unite]
    this.question = `On souhaite tracer une figure d'aire $${a}$ unités d'aire (ua). <br>
       De combien de petits carreaux doit-elle être formée ? `
    this.question += mathalea2d(
      Object.assign(
        { scale: 0.4, style: 'margin: auto' },
        fixeBordures(objets),
      ),
      objets,
    )
    /* this.canEnonce = this.question
         this.canReponseACompleter = 'Figure $\\ldots$'
         */
    this.reponse = u * a
    this.canEnonce = `Trace une figure d'aire $${a}$ unités d'aire (ua).`
    this.canReponseACompleter = mathalea2d(
      Object.assign({ scale: 0.4 }, fixeBordures(objets)),
      objets,
    )

    this.correction = `L'unité d'aire est composée de $${u}$ petits carreaux.<br>
    $${a}\\times ${u}=${a * u}$ <br>
      La figure tracée doit être composée de $${miseEnEvidence(u * a)}$ petits carreaux.`
  }
}
