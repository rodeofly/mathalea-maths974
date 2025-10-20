import { codageSegments } from '../../../lib/2d/codages'
import { point } from '../../../lib/2d/points'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { labelPoint } from '../../../lib/2d/textes'
import { choice } from '../../../lib/outils/arrayOutils'
import { creerNomDePolygone } from '../../../lib/outils/outilString'
import { texNombre } from '../../../lib/outils/texNombre'
import ExerciceSimple from '../../ExerciceSimple'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { randint } from '../../../modules/outils'
export const titre = 'Calculer une longueur avec le théorème de Thalès (milieu)'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 * Date de publication septembre 2021
*/
export const uuid = 'ae712'

export const refs = {
  'fr-fr': ['can4G07', 'BP2AutoR13'],
  'fr-ch': [],
}
export default class CalculLongueurThalesMilieu extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let a, A, B, C, D, E, objets, nom
    if (choice([true, false])) {
      nom = creerNomDePolygone(5, ['QD'])
      a = randint(1, 9) + randint(1, 5) / 10 + randint(1, 9) / 100

      A = point(0, 0, nom[0], 'below')
      B = point(6, 0, nom[1], 'below')
      C = point(5, 4, nom[2], 'above')
      D = point(2.5, 2, nom[3], 'above')
      E = point(3, 0, nom[4], 'below')
      objets = []
      objets.push(
        segment(A, B),
        segment(D, E),
        segment(A, C),
        segment(B, C),
        codageSegments('||', 'blue', A, D, D, C),
        labelPoint(A, B, C, D, E),
      )

      this.question = `$(${nom[3]}${nom[4]})//(${nom[1]}${nom[2]})$ et
      $${nom[3]}${nom[4]}=${texNombre(a)}$.<br>

      Calculer $${nom[1]}${nom[2]}$.<br>

     `
      this.question += mathalea2d(
        {
          xmin: -1,
          ymin: -1,
          xmax: 8,
          ymax: 5,
          pixelsParCm: 18,
          mainlevee: false,
          amplitude: 0.5,
          style: 'margin: auto',
        },
        objets,
      )
      this.correction = ` Les longueurs du triangle $${nom[0]}${nom[1]}${nom[2]}$ sont 2 fois plus grandes que les longueurs du triangle $${nom[0]}${nom[3]}${nom[4]}$.<br>
      Le triangle $${nom[0]}${nom[1]}${nom[2]}$ est un agrandissement du triangle $${nom[0]}${nom[3]}${nom[4]}$.<br>
      Ainsi : $${nom[1]}${nom[2]}=2\\times ${nom[3]}${nom[4]}=2\\times ${texNombre(a)}=${texNombre(2 * a)}$.
  `

      this.reponse = 2 * a
      this.canEnonce = this.question // 'Compléter'
      this.canReponseACompleter = `$${nom[1]}${nom[2]}=\\ldots$`
    } else {
      nom = creerNomDePolygone(5, ['QD'])
      a = (randint(1, 9) + randint(1, 5) / 10) * 2
      A = point(0, 0, nom[0], 'below')
      B = point(6, 0, nom[1], 'below')
      C = point(5, 4, nom[2], 'above')
      D = point(2.5, 2, nom[3], 'above')
      E = point(3, 0, nom[4], 'below')
      objets = []
      objets.push(
        segment(A, B),
        segment(D, E),
        segment(A, C),
        segment(B, C),
        codageSegments('||', 'blue', A, D, D, C),
        labelPoint(A, B, C, D, E),
      )

      this.question = `$(${nom[3]}${nom[4]})//(${nom[1]}${nom[2]})$ et
       $${nom[1]}${nom[2]}=${texNombre(a)}$. <br>

         Calculer $${nom[3]}${nom[4]}$.<br>
         
         `
      this.question += mathalea2d(
        {
          xmin: -1,
          ymin: -1,
          xmax: 8,
          ymax: 5,
          pixelsParCm: 18,
          mainlevee: false,
          amplitude: 0.5,
          style: 'margin: auto',
        },
        objets,
      )
      this.correction = ` Les longueurs du triangle $${nom[0]}${nom[3]}${nom[4]}$ sont 2 fois plus petites que les longueurs du triangle $${nom[0]}${nom[1]}${nom[2]}$.<br>
      Le triangle $${nom[0]}${nom[3]}${nom[4]}$ est une réduction du triangle $${nom[0]}${nom[1]}${nom[2]}$. <br>
            Ainsi : $${nom[3]}${nom[4]}= ${nom[1]}${nom[2]} \\div 2 = ${texNombre(a)}\\div 2 =${texNombre(a / 2)}$.
     `

      this.reponse = a / 2
      this.canEnonce = this.question // 'Compléter'
      this.canReponseACompleter = `$${nom[3]}${nom[4]}=\\ldots$`
    }
  }
}
