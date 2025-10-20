import { arrondi } from '../../../lib/outils/nombres'
import { creerNomDePolygone } from '../../../lib/outils/outilString'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
export const titre = "Trouver les coordonnées d'un point avec un milieu"
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '29/11/2023'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 *
*/
export const uuid = '9ff07'

export const refs = {
  'fr-fr': ['can2G22'],
  'fr-ch': [],
}
export default class CoordonneesMilieuExtremite extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const nom = creerNomDePolygone(2, 'PQDO')

    const a = randint(-9, 9, 0)
    const b = randint(-9, 9, 0)
    this.question = `Dans un repère du plan d'origine $O$, on donne $${nom[0]}(${a}\\,;\\,${b})$.<br>
        Déterminer les coordonnées du point $${nom[1]}$ de façon que $O$ soit le milieu de $[${nom[0]}${nom[1]}]$.<br><br>`
    this.optionsChampTexte = { texteAvant: `$${nom[1]}$ a pour coordonnées :` }
    this.correction = `Les points $${nom[0]}$ et $${nom[1]}$ ont des coordonnées opposées (faire un petit dessin pour représenter la situation), donc $${nom[1]}$ a pour coordonnées $${miseEnEvidence('(')} ${miseEnEvidence(`${texNombre(-a)}`)}\\,${miseEnEvidence(';')}\\,${miseEnEvidence(`${texNombre(-b)}`)} ${miseEnEvidence(')')}$.`
    this.reponse = `(${arrondi(-a, 0)};${arrondi(-b, 0)})`

    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
