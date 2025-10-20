import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texRacineCarree } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre =
  'Déterminer le nombre de solutions d’une équation se ramenant à $x^2=a$'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Jean-Claude Lhote et Gilles Mora
 * Septembre 2021

 */
export const uuid = '3b832'

export const refs = {
  'fr-fr': ['can2L01'],
  'fr-ch': [],
}
export default class EquationPlusMoinsX2PlusAEgalB extends ExerciceSimple {
  constructor() {
    super()
    this.versionQcmDisponible = true
    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const a = randint(1, 20)
    const b = randint(1, 20)
    switch (
      choice(['a', 'b', 'c', 'd']) //
    ) {
      case 'a':
        this.question = ` Combien de solutions réelles possède l'équation  $-x^2+${a}=${b}$ ?<br>`
        if (a - b > 0) {
          this.correction = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
      $${a - b}$ étant strictement positif, cette équation a $${miseEnEvidence(2)}$ solutions : $${texRacineCarree(a - b)}$ et  $-${texRacineCarree(a - b)}$.`
          this.reponse = this.versionQcm ? '$2$ solutions' : 2
          this.distracteurs = [
            '$0$ solution',
            '$1$ solution',
            'Une infinité de solutions',
          ]
        } else if (a - b === 0) {
          this.correction = `L'équation est équivalente à$-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
      cette équation a $${miseEnEvidence(1)}$ seule solution réelle : 0.`
          this.reponse = this.versionQcm ? '$1$ solution' : 1
          this.distracteurs = [
            '$0$ solution',
            '$2$ solutions',
            'Une infinité de solutions',
          ]
        } else if (a - b < 0) {
          this.correction = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
     Cette équation a $${miseEnEvidence(0)}$ solution réelle car $${a - b}<0$.`
          this.reponse = this.versionQcm ? '$0$ solution' : 0
          this.distracteurs = [
            '$2$ solutions',
            '$1$ solution',
            'Une infinité de solutions',
          ]
        }
        break
      case 'b':
        this.question = ` Combien de solutions réelles possède l'équation $-${a}+x^2=-${b}$ ?<br>`
        if (a - b > 0) {
          this.correction = `L'équation est équivalente à $x^2=-${b}+${a}$, soit $x^2=${a - b}$.<br>
      $${a - b}$ étant strictement positif, cette équation a $${miseEnEvidence(2)}$ solutions : $${texRacineCarree(a - b)}$ et  $-${texRacineCarree(a - b)}$.`
          this.reponse = this.versionQcm ? '$2$ solutions' : 2
          this.distracteurs = [
            '$0$ solution',
            '$1$ solution',
            'Une infinité de solutions',
          ]
        } else if (a - b === 0) {
          this.correction = `L'équation est équivalente à $x^2=-${b}+${a}$, soit $x^2=${a - b}$.<br>
      cette équation a $${miseEnEvidence(1)}$ seule solution réelle : 0.`
          this.distracteurs = [
            '$0$ solution',
            '$2$ solutions',
            'Une infinité de solutions',
          ]
          this.reponse = this.versionQcm ? '$1$ solution' : 1
        } else if (a - b < 0) {
          this.correction = `L'équation est équivalente à $x^2=-${b}+${a}$, soit $x^2=${a - b}$.<br>
     Cette équation a $${miseEnEvidence(0)}$ solution réelle car $${a - b}<0$.`
          this.reponse = this.versionQcm ? '$0$ solution' : 0
          this.distracteurs = [
            '$2$ solutions',
            '$1$ solution',
            'Une infinité de solutions',
          ]
        }
        break
      case 'c':
        this.question = ` Combien de solutions réelles possède l'équation $${b}=-x^2+${a}$ ?<br>`
        if (a - b > 0) {
          this.correction = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
        $${a - b}$ étant strictement positif, cette équation a $${miseEnEvidence(2)}$ solutions : $${texRacineCarree(a - b)}$ et  $-${texRacineCarree(a - b)}$.`
          this.reponse = this.versionQcm ? '$2$ solutions' : 2
          this.distracteurs = [
            '$0$ solution',
            '$1$ solution',
            'Une infinité de solutions',
          ]
        } else if (a - b === 0) {
          this.correction = `L'équation est équivalente à$-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
        cette équation a $${miseEnEvidence(1)}$ seule solution réelle : 0.`
          this.reponse = this.versionQcm ? '$1$ solution' : 1
          this.distracteurs = [
            '$0$ solution',
            '$2$ solutions',
            'Une infinité de solutions',
          ]
        } else if (a - b < 0) {
          this.correction = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
       Cette équation a $${miseEnEvidence(0)}$ solution réelle car $${a - b}<0$.`
          this.reponse = this.versionQcm ? '$0$ solution' : 0
          this.distracteurs = [
            '$2$ solutions',
            '$1$ solution',
            'Une infinité de solutions',
          ]
        }
        break
      case 'd':
        this.question = ` Combien de solutions réelles possède l'équation  $-${b}=-x^2-${a}$ ?<br>`
        if (b - a > 0) {
          this.correction = `L'équation est équivalente à $-x^2=-${b}+${a}$, soit $x^2=${b - a}$.<br>
        $${b - a}$ étant strictement positif, cette équation a $${miseEnEvidence(2)}$ solutions : $${texRacineCarree(b - a)}$ et  $-${texRacineCarree(b - a)}$.`
          this.reponse = this.versionQcm ? '$2$ solutions' : 2
          this.distracteurs = [
            '$0$ solution',
            '$1$ solution',
            'Une infinité de solutions',
          ]
        } else if (b - a === 0) {
          this.correction = `L'équation est équivalente à$-x^2=-${b}+${a}$, soit $x^2=${b - a}$.<br>
        cette équation a $${miseEnEvidence(1)}$ seul solution réelle : 0.`
          this.reponse = this.versionQcm ? '$1$ solution' : 1
          this.distracteurs = [
            '$0$ solution',
            '$2$ solutions',
            'Une infinité de solutions',
          ]
        } else if (b - a < 0) {
          this.correction = `L'équation est équivalente à $-x^2=-${b}+${a}$, soit $x^2=${b - a}$.<br>
       Cette équation a $${miseEnEvidence(0)}$ solution réelle car $${b - a}<0$.`
          this.reponse = this.versionQcm ? '$0$ solution' : 0
          this.distracteurs = [
            '$2$ solutions',
            '$1$ solution',
            'Une infinité de solutions',
          ]
        }
        break
    }
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
