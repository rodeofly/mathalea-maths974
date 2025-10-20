import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
import { DroiteGraduee } from '../../../lib/2d/reperes'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'

export const titre = 'Déterminer une abscisse sur une droite graduée'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '07690'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora (reprise du fichier de Jean-Claude Lhote 6ième)

*/

export default class AbscisseEnDemiBisCM2 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1

    this.canOfficielle = false
  }

  nouvelleVersion() {
    let a1: number
    const delta = 3
    if (this.canOfficielle) {
      a1 = 20
    } else {
      a1 = 2 + randint(2, 6) * 3
    }
    const a2 = a1 + delta
    const x = a1 + delta / 2
    this.reponse = { reponse: { value: `\\frac{${2 * a1 + delta}}{2}` } }
    const drGrad = new DroiteGraduee({
      Unite: 1,
      Min: a1 - delta,
      Max: a2 + delta,
      thickOffset: 1,
      thickDistance: 3,
      thickSec: true,
      thickSecDist: 1.5,
      labelsPrincipaux: false,
      labelListe: [
        [a1 + 1, String(a1)],
        [a2 + 1, String(a2)],
      ],
      pointListe: [[x + 1, 'A']],
    })
    const objets = [drGrad]
    this.question = 'Donner le nombre qui repère le point A.<br>'
    this.question += mathalea2d(
      Object.assign({ scale: 0.5 }, fixeBordures(objets)),
      objets,
    )
    this.canEnonce = this.question
    this.canReponseACompleter = ''
    this.correction = `Le nombre qui repère le point A est : $${miseEnEvidence(texNombre(x, 1))}$.`
  }
}
