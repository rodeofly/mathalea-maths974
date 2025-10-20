import { afficheMesureAngle, codageSegments } from '../../../lib/2d/codages'
import { point } from '../../../lib/2d/points'
import { polygoneAvecNom } from '../../../lib/2d/polygones'
import { degTan } from '../../../lib/mathFonctions/trigo'
import { choice } from '../../../lib/outils/arrayOutils'
import { creerNomDePolygone } from '../../../lib/outils/outilString'
import { texNombre } from '../../../lib/outils/texNombre'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'

export const titre = 'Calculer un angle dans un triangle isocèle'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 * Date de publication
 */
export const uuid = '7b386'

export const refs = {
  'fr-fr': ['can5G02'],
  'fr-ch': [],
}
export default class AngleTriangleIsocele extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let a, A, B, C, objets, nom, pol, xmin, xmax, ymin, ymax

    switch (choice(['a', 'b'])) {
      case 'a':
        nom = creerNomDePolygone(3, ['QD'])
        a = randint(4, 16, 12) * 5
        A = point(0, 0, nom[0])
        B = point(5, 0, nom[1])
        C = point(2.5, 2.5 * degTan(a), nom[2])
        pol = polygoneAvecNom(A, B, C)

        objets = []
        if (a > 60) {
          xmin = Math.min(A.x, B.x, C.x) - 2
          ymin = Math.min(A.y, B.y, C.y) - 2
          xmax = Math.max(A.x, B.x, C.x) + 2
          ymax = Math.max(A.y, B.y, C.y) + 2
          objets.push(pol[0], pol[1])
          objets.push(
            afficheMesureAngle(B, A, C, 'black', 1, a + '^\\circ'),
            codageSegments('||', 'blue', C, A, C, B),
          )
          this.question = `Quelle est la mesure en degré de l'angle $\\widehat{${nom[2]}}$ ? <br>
        `
          this.question += mathalea2d(
            {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 10,
              mainlevee: false,
              amplitude: 0.3,
              scale: 1,
              style: 'margin: auto',
            },
            objets,
          )
          this.optionsChampTexte = { texteApres: ' °' }
          this.correction = ` Le triangle est isocèle. Ses deux angles à la base sont égaux.<br>
        Ainsi $\\widehat{${nom[2]}}=180°-2\\times ${a}°=${texNombre(180 - 2 * a)}°$
    <br>`
          this.reponse = 180 - 2 * a
        } else {
          xmin = Math.min(A.x, B.x, C.x) - 1
          ymin = Math.min(A.y, B.y, C.y) - 1.5
          xmax = Math.max(A.x, B.x, C.x) + 1
          ymax = Math.max(A.y, B.y, C.y) + 1.5
          objets.push(pol[0], pol[1])
          objets.push(
            afficheMesureAngle(B, A, C, 'black', 1, a + '^\\circ'),
            codageSegments('||', 'blue', C, A, C, B),
          )
          this.question = `Quelle est la mesure en degré de l'angle $\\widehat{${nom[2]}}$ ? <br>
            `
          this.question += mathalea2d(
            {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 30,
              mainlevee: false,
              amplitude: 0.3,
              scale: 0.8,
              style: 'margin: auto',
            },
            objets,
          )
          this.optionsChampTexte = { texteApres: ' °' }
          this.correction = ` Le triangle est isocèle. Ses deux angles à la base sont égaux.<br>
            Ainsi $\\widehat{${nom[2]}}=180°-2\\times ${a}°=${texNombre(180 - 2 * a)}°$
        <br>`
          this.reponse = 180 - 2 * a
        }
        break
      case 'b':
        nom = creerNomDePolygone(3, ['QD'])
        a = randint(4, 16, 12) * 5
        A = point(0, 0, nom[0])
        B = point(5, 0, nom[1])
        C = point(2.5, 2.5 * degTan(a), nom[2])
        pol = polygoneAvecNom(A, B, C)
        objets = []
        if (a > 60) {
          xmin = Math.min(A.x, B.x, C.x) - 2
          ymin = Math.min(A.y, B.y, C.y) - 2
          xmax = Math.max(A.x, B.x, C.x) + 2
          ymax = Math.max(A.y, B.y, C.y) + 3
          objets.push(pol[0], pol[1])
          objets.push(
            afficheMesureAngle(A, C, B, 'black', 2.5, 180 - 2 * a + '^\\circ'),
            codageSegments('||', 'blue', C, A, C, B),
          )
          this.question = `Quelle est la mesure en degré de l'angle $\\widehat{${nom[1]}}$ ?<br>
            `
          this.question += mathalea2d(
            {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 10,
              mainlevee: false,
              amplitude: 0.3,
              scale: 0.8,
              style: 'margin: auto',
            },
            objets,
          )
          this.optionsChampTexte = { texteApres: ' °' }
          this.correction = ` Le triangle est isocèle. Ses deux angles à la base sont égaux.<br>
          Ainsi $\\widehat{${nom[1]}}=(180-${180 - 2 * a})\\div 2=${texNombre(a)}$.
      <br>`
          this.reponse = a
        } else {
          xmin = Math.min(A.x, B.x, C.x) - 1
          ymin = Math.min(A.y, B.y, C.y) - 1
          xmax = Math.max(A.x, B.x, C.x) + 1
          ymax = Math.max(A.y, B.y, C.y) + 1
          objets.push(pol[0], pol[1])
          objets.push(
            afficheMesureAngle(A, C, B, 'black', 0.4, 180 - 2 * a + '^\\circ'),
            codageSegments('||', 'blue', C, A, C, B),
          )
          this.question = `Quelle est la mesure en degré de l'angle $\\widehat{${nom[1]}}$ ?<br>
              `
          this.question += mathalea2d(
            {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 35,
              mainlevee: false,
              amplitude: 0.3,
              scale: 0.8,
              style: 'margin: auto',
            },
            objets,
          )
          this.optionsChampTexte = { texteApres: ' °' }
          this.correction = ` Le triangle est isocèle. Ses deux angles à la base sont égaux.<br>
          Ainsi $\\widehat{${nom[1]}}=(180-${180 - 2 * a})\\div 2=${texNombre(a)}$.
      <br>`
          this.reponse = a
        }
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\ldots ^\\circ$'
  }
}
