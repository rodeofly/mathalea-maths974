import ExerciceSimple from '../../ExerciceSimple'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { DroiteGraduee } from '../../../lib/2d/reperes'
import { randint } from '../../../modules/outils'
export const titre = 'Trouver un nombre sur une droite graduée'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'b2be1'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class Can2025CM1Q26 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
  }

  nouvelleVersion() {
    const a1 = 0
    const a2 = 2

    const x = this.canOfficielle ? 3 : randint(1, 7, 4)
    this.reponse = { reponse: { value: `\\frac{${x}}{4}` } } // this.reponse = String(x)
    const drGrad = new DroiteGraduee({
      Unite: 4,
      Min: a1,
      Max: a2,
      thickSec: true,
      thickSecDist: 0.25,
      labelsPrincipaux: true,
      pointListe: [[x / 4, 'A']],
    })
    const objets = [drGrad]
    this.question = 'Quel nombre repère le point $A$ ?<br>'
    this.question += mathalea2d(
      Object.assign({ scale: 0.5 }, fixeBordures(objets)),
      objets,
    )
    this.canEnonce = this.question
    this.canReponseACompleter = ''
    this.correction = `L'unité est partagée en $4$. Ainsi, chaque part correspond à $0,25$.<br>
       Le point $A$  repère le nombre $${miseEnEvidence(texNombre(x / 4, 2))}$.`
  }
}
