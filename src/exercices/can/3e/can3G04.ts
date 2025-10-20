import { milieu, point } from '../../../lib/2d/points'
import { polygoneAvecNom } from '../../../lib/2d/polygones'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { latex2d } from '../../../lib/2d/textes'
import { choice } from '../../../lib/outils/arrayOutils'
import { creerNomDePolygone } from '../../../lib/outils/outilString'
import { texNombre } from '../../../lib/outils/texNombre'
import ExerciceSimple from '../../ExerciceSimple'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
export const titre = 'Rechercher une valeur avec le théorème de Pythagore'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 * Date de publication sptembre 2021
*/
export const uuid = '85416'

export const refs = {
  'fr-fr': ['can3G04'],
  'fr-ch': [],
}
export default class RechercheValeurPythagore extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.formatChampTexte = KeyboardType.clavierFullOperations
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let a, A, B, C, objets, nom, pol

    switch (choice(['b'])) {
      case 'a':
        nom = creerNomDePolygone(3, ['QD'])
        a = randint(1, 5) * 2 //
        A = point(0, 0, nom[0])
        B = point(4, 0, nom[1])
        C = point(1.58, 3.7, nom[2])
        pol = polygoneAvecNom(A, B, C)
        objets = []
        objets.push(segment(A, B), segment(B, C), segment(A, C))
        objets.push(pol[0], pol[1])
        objets.push(
          latex2d(`${texNombre(a)}`, milieu(B, C).x + 0.5 + 0, milieu(B, C).y, {
            letterSize: 'scriptsize',
          }),
          latex2d('x', milieu(A, C).x - 0.5, milieu(A, C).y, {
            letterSize: 'scriptsize',
          }),
          latex2d('x', milieu(A, B).x, milieu(A, B).y - 0.5, {
            letterSize: 'scriptsize',
          }),
        )
        this.question = `${mathalea2d(Object.assign({ scale: 0.7, style: 'margin: auto; display: block' }, fixeBordures([objets], { rxmin: 0, rxmax: 0, rymax: 0, rymin: 0.5 })), [objets])}`
        if (this.interactif) {
          this.question += `Déterminer $x$ pour que le triangle soit rectangle.<br>
      (donner le résultat sous la forme $\\sqrt{a}$)<br>
      $x=$`
        } else {
          this.question += 'Déterminer $x$ pour que le triangle soit rectangle.'
        }

        this.correction = ` Le plus grand côté est $${a}$ (autrement il y aurait deux hypoténuses). On cherche $x$ tel que $x^2+x^2=${a}^2$, soit $2x^2=${a * a}$.<br>
      En divisant par $2$ chacun des membres, on obtient : $x^2=${(a * a) / 2}$.<br>
      Comme la valeur de $x$ cherchée est positive, on a  $x=${miseEnEvidence(`\\sqrt{${texNombre(a ** 2 / 2)}}`)}$.`

        this.reponse = [`\\sqrt{${a ** 2 / 2}}`, `${Math.sqrt(a ** 2 / 2)}`]
        break
      case 'b':
        nom = creerNomDePolygone(3, ['QD'])
        a = choice([8, 18, 32, 50, 72, 98, 128, 162, 200])
        A = point(0, 0, nom[0])
        B = point(4, 0, nom[1])
        C = point(1.58, 3.7, nom[2])
        pol = polygoneAvecNom(A, B, C)
        objets = []
        objets.push(pol[0], pol[1])
        objets.push(segment(A, B), segment(B, C), segment(A, C))
        objets.push(
          latex2d(`\\sqrt{${a}}`, milieu(B, C).x + 1, milieu(B, C).y, {
            letterSize: 'scriptsize',
          }),
          latex2d('x', milieu(A, C).x - 0.5, milieu(A, C).y, {
            letterSize: 'scriptsize',
          }),
          latex2d('x', milieu(A, B).x, milieu(A, B).y - 0.5, {
            letterSize: 'scriptsize',
          }),
        )

        this.question = `${mathalea2d(Object.assign({ scale: 0.7, style: 'margin: auto; display: block' }, fixeBordures([objets], { rxmin: 0, rxmax: 0, rymax: 0, rymin: 0.5 })), [objets])}`
        if (this.interactif) {
          this.question += `Déterminer $x$ pour que le triangle soit rectangle.<br>
      $x=$`
        } else {
          this.question += 'Déterminer $x$ pour que le triangle soit rectangle.'
        }
        this.correction = ` Le plus grand côté est $\\sqrt{${a}}$ (autrement il y aurait deux hypoténuses).
        On cherche $x$ tel que $x^2+x^2=\\sqrt{${a}}^2$, soit $2x^2=${a}$.<br>
      En divisant par $2$ chacun des membres, on obtient : $x^2=${a / 2}$.<br>
      Comme la valeur de $x$ cherchée est positive, on a  $x=\\sqrt{${texNombre(a / 2)}}=${miseEnEvidence(`${Math.sqrt(a / 2)}`)}$.`
        this.reponse = `\\sqrt{${a / 2}}`
        break
    }
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = '$x=\\ldots$'
  }
}
