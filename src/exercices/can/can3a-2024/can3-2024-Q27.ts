import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { choice } from '../../../lib/outils/arrayOutils'
import { milieu, point } from '../../../lib/2d/points'
import { polygoneAvecNom } from '../../../lib/2d/polygones'
import { labelPoint, latexParCoordonnees } from '../../../lib/2d/textes'
import { codageAngleDroit } from '../../../lib/2d/angles'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Calculer une longueur dans un triangle rectangle'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '3f574'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierFullOperations
    this.optionsChampTexte = { texteApres: 'cm.' }

    this.canOfficielle = false
  }

  nouvelleVersion() {
    const A = point(0, 0, 'E', 'above')
    const B = point(4, 0, 'F', 'above')
    const C = point(4, -2, 'G', 'below')

    const xmin = -1
    const ymin = -3
    const xmax = 5
    const ymax = 1
    const pol = polygoneAvecNom(A, B, C)
    const objets = []

    objets.push(pol[0])
    if (this.canOfficielle) {
      const triplet = [[3, 5, 34]]
      const a = choice(triplet)
      objets.push(
        latexParCoordonnees(
          `${a[1]}\\text{ cm}`,
          milieu(A, B).x,
          milieu(A, B).y + 0.4,
          'black',
          0,
          0,
          '',
        ),
        latexParCoordonnees(
          `${a[0]} \\text{ cm}`,
          milieu(B, C).x + 0.6,
          milieu(B, C).y,
          'black',
          0,
          0,
          '',
        ),
        labelPoint(A, B, C),
        codageAngleDroit(A, B, C),
      )
      this.reponse = `\\sqrt{${a[2]}}`
      this.question = mathalea2d(
        {
          xmin,
          ymin,
          xmax,
          ymax,
          pixelsParCm: 40,
          mainlevee: false,
          amplitude: 0.5,
          scale: 1,
          style: 'margin: auto',
        },
        objets,
      )
      this.question += '<br>La valeur exacte de $EG$ est : '
      this.correction = `On utilise le théorème de Pythagore dans le triangle  $EFG$ rectangle en $F$ :<br>
        $\\begin{aligned}
        EG^2&=FE^2+FG^2\\\\
        &=${a[0]}^2+${a[1]}^2\\\\
        &=${a[2]}
        \\end{aligned}$<br>
       Ainsi, $EG=${miseEnEvidence(`\\sqrt{${a[2]}}`)}$. `
      this.canEnonce = this.question
      this.canReponseACompleter = '$EG=\\ldots$ cm'
    } else {
      if (choice([true, false])) {
        const triplet = [
          [4, 5, 41],
          [2, 5, 29],
          [3, 6, 45],
          [4, 7, 65],
          [5, 6, 61],
        ]
        const a = choice(triplet)
        objets.push(
          latexParCoordonnees(
            `${a[1]} \\text{ cm}`,
            milieu(A, B).x,
            milieu(A, B).y + 0.4,
            'black',
            0,
            0,
            '',
          ),
          latexParCoordonnees(
            `${a[0]}\\text{ cm}`,
            milieu(B, C).x + 0.5,
            milieu(B, C).y,
            'black',
            0,
            0,
            '',
          ),
          labelPoint(A, B, C),
          codageAngleDroit(A, B, C),
        )
        this.reponse = `\\sqrt{${a[2]}}`
        this.question = mathalea2d(
          {
            xmin,
            ymin,
            xmax,
            ymax,
            pixelsParCm: 40,
            mainlevee: false,
            amplitude: 0.5,
            scale: 1,
            style: 'margin: auto',
          },
          objets,
        )
        this.question += '<br>La valeur exacte de $EG$ est : '

        this.correction = `On utilise le théorème de Pythagore dans le triangle  $EFG$ rectangle en $F$ :<br>
          $\\begin{aligned}
          EG^2&=FE^2+FG^2\\\\
          EG^2&=${a[0]}^2+${a[1]}^2\\\\
          EG^2&=${a[2]}
          \\end{aligned}$<br>
         Ainsi, $EG=${miseEnEvidence(`\\sqrt{${a[2]}}`)}$. `
        this.canEnonce = this.question
        this.canReponseACompleter = '$EG=\\ldots$ cm'
      } else {
        const triplet = [
          [6, 5, 11],
          [4, 3, 7],
          [7, 6, 13],
          [8, 5, 39],
          [7, 6, 13],
          [10, 9, 19],
          [10, 7, 51],
        ]
        const a = choice(triplet)
        objets.push(
          latexParCoordonnees(
            `${a[0]} \\text{ cm}`,
            milieu(A, C).x,
            milieu(A, C).y - 0.4,
            'black',
            0,
            0,
            '',
          ),
          latexParCoordonnees(
            `${a[1]}\\text{ cm} `,
            milieu(A, B).x,
            milieu(A, B).y + 0.5,
            'black',
            0,
            0,
            '',
          ),
          labelPoint(A, B, C),
          codageAngleDroit(A, B, C),
        )
        this.reponse = `\\sqrt{${a[2]}}`
        this.question = mathalea2d(
          {
            xmin,
            ymin,
            xmax,
            ymax,
            pixelsParCm: 40,
            mainlevee: false,
            amplitude: 0.5,
            scale: 1,
            style: 'margin: auto',
          },
          objets,
        )
        this.question += '<br>La valeur exacte de $FG$ est : '

        this.correction = `On utilise le théorème de Pythagore dans le triangle  $EFG$ rectangle en $F$ :<br>
          $\\begin{aligned}
          EG^2&=FE^2+FG^2\\\\
          FG^2&=EG^2-FE^2\\\\
          FG^2&=${a[0]}^2-${a[1]}^2\\\\
          FG^2 &=${a[2]}
          \\end{aligned}$<br>
         Ainsi, $FG=${miseEnEvidence(`\\sqrt{${a[2]}}`)}$. `
        this.canEnonce = this.question
        this.canReponseACompleter = '$EF=\\ldots$ cm'
      }
    }
    if (!this.interactif) {
      this.question += '$\\ldots$ cm'
    }
  }
}
