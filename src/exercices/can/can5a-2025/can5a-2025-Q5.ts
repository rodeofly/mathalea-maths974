import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { DroiteGraduee, droiteGraduee } from '../../../lib/2d/reperes'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { choice } from '../../../lib/outils/arrayOutils'
import { texNombre } from '../../../lib/outils/texNombre'

export const titre = "Abscisse d'un point"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'a343k'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N5Q5 extends ExerciceCan {
  enonce(min?: number, max?: number, pas?: number, absB?: number) {
    let nbPas: number
    if (min != null && max != null && pas != null && absB != null) {
      nbPas = (max - min) / pas
    } else {
      nbPas = 6
      pas = choice([2, 3, 4])
      min = 100 + randint(1, 25)
      max = min + nbPas * pas
      absB = randint(1, nbPas - 1) * pas + min
    }
    const nbSauts = Math.round((absB - min) / pas)
    this.reponse = absB
    const d = droiteGraduee({
      Min: 0,
      Max: 2 * nbPas,
      Unite: 1,
      labelsPrincipaux: false,
      thickDistance: 2,
      thickOffset: 0.5,
      pointListe: [
        [2 * nbSauts, 'B'],
        [0, 'A'],
        [2 * nbPas, 'C'],
      ],
      labelListe: [
        [0, String(min)],
        [2 * nbPas, String(max)],
      ],
    }) as DroiteGraduee
    this.question = `${mathalea2d(Object.assign({ scale: 0.5 }, fixeBordures(d.objets!)), d.objets!)}
    Le point $B$ est repéré par le nombre`
    this.correction = `Pour trouver l'abscisse du point $B$, on commence par calculer la différence entre $${max}$ et $${min}$ : $${max}-${min}=${max - min}$.<br>
    Puis on divise par le nombre de parties pour avoir la valeur d'une graduation, le pas : $${max - min}\\div${nbPas}=${pas}$.<br>
    À $${min}$, on ajoute  $${nbSauts}$ fois le pas : $${min}+${nbSauts > 1 ? `${nbSauts}\\times ${pas}` : `${pas}`} =${miseEnEvidence(texNombre(absB, 0))}$.`
    this.canEnonce = `${mathalea2d(Object.assign({ scale: 0.5 }, fixeBordures(d.objets!)), d.objets!)}`
    this.canReponseACompleter =
      'Le point $B$ est repéré par le nombre $\\ldots$'
    this.optionsChampTexte = { texteApres: '.' }
    if (!this.interactif) {
      this.question += ' $\\ldots$'
    }
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(103, 115, 2, 105) : this.enonce()
  }
}
