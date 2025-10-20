import ExerciceSimple from '../../ExerciceSimple'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
import { milieu, point, pointAdistance } from '../../../lib/2d/points'
import { similitude } from '../../../lib/2d/transformations'
import { polygoneAvecNom } from '../../../lib/2d/polygones'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { codageAngleDroit } from '../../../lib/2d/angles'
import { latex2d } from '../../../lib/2d/textes'
export const titre = "Calculer l'hypoténuse dans un triangle rectangle"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '0d70d'
export const refs = {
  'fr-fr': [''],
  'fr-ch': ['NR'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class hypoténusePythagore extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierFullOperations

    this.optionsChampTexte = { texteAvant: '', texteApres: 'cm.' }
    this.canOfficielle = true
  }

  nouvelleVersion() {
    const a = this.canOfficielle ? 2 : randint(2, 7) //
    const b = this.canOfficielle ? 3 : randint(3, 7) //
    const c2 = a ** 2 + b ** 2

    const S = point(0, 0, 'S')
    const R = pointAdistance(S, a, randint(0, 45), 'R')
    const T = similitude(S, R, 90, b / a, 'T')
    const pol = polygoneAvecNom(S, R, T) // polygoneAvecNom s'occupe du placement des noms des sommets
    const objets = []
    const xmin = Math.min(S.x, R.x, T.x) - 1
    const ymin = Math.min(S.y, R.y, T.y) - 1
    const xmax = Math.max(S.x, R.x, T.x) + 2
    const ymax = Math.max(S.y, R.y, T.y) + 1
    objets.push(pol[0], pol[1], codageAngleDroit(S, R, T)) // pol[0], c'est le tracé et pol[1] ce sont les labels
    objets.push(
      latex2d(
        `${texNombre(a)} \\text{ cm}`,
        milieu(S, R).x - 0.2,
        milieu(S, R).y + 0.8,
        { color: 'black' },
      ),
      latex2d(
        `${texNombre(b)} \\text{ cm}`,
        milieu(R, T).x + 1,
        milieu(R, T).y,
        { color: 'black' },
      ),
    )

    this.question = mathalea2d(
      {
        xmin,
        ymin,
        xmax,
        ymax,
        pixelsParCm: 22,
        mainlevee: false,
        amplitude: 0.3,
        scale: 0.7,
        style: 'margin: auto',
      },
      objets,
    )
    this.canEnonce = this.question
    this.question += '<br>La valeur exacte de $ST$ est '
    if (!this.interactif) {
      this.question += '$\\ldots$ cm.'
    }
    this.correction = ` On utilise le théorème de Pythagore dans le triangle $SRT$,  rectangle en $R$.<br>
                  $\\begin{aligned}
                    RS^2+RT^2&=ST^2\\\\
                   ST^2&=RS^2+RT^2\\\\
                    ST^2&=${b}^2+${a}^2\\\\
                    ST^2&=${b ** 2}+${a ** 2}\\\\
                    ST^2&=${c2}\\\\
                    ST&=${miseEnEvidence(`\\sqrt{${c2}}`)}
                    \\end{aligned}$`
    this.reponse = `\\sqrt{${c2}}`
    this.canReponseACompleter = 'La valeur exacte de $ST$ est $\\ldots$ cm.'
  }
}
