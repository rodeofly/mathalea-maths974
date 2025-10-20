import { courbe } from '../../../lib/2d/courbes'
import { repere } from '../../../lib/2d/reperes'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { texteParPosition } from '../../../lib/2d/textes'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texFractionFromString } from '../../../lib/outils/deprecatedFractions'
import { reduireAxPlusB } from '../../../lib/outils/ecritures'
import { texteCentre } from '../../../lib/format/miseEnPage'
import ExerciceSimple from '../../ExerciceSimple'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Lire graphiquement une fonction affine'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora (2F10-02)
 */
export const uuid = '82f73'

export const refs = {
  'fr-fr': ['can3F07'],
  'fr-ch': [],
}
export default class LectureGraphiqueFonctionAffine1 extends ExerciceSimple {
  constructor() {
    super()
    this.formatChampTexte = KeyboardType.clavierFullOperations
    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const o = texteParPosition('O', -0.3, -0.3, 0, 'black', 1, 'milieu', true)
    let s1, s2
    const a = randint(-4, 4, 0)
    const b = randint(-4, 4, 0)

    const rep = repere({ xMin: -5, yMin: -5, xMax: 5, yMax: 5 })

    this.question = `$f$ est une fonction affine${this.interactif ? '.' : ' définie par $f(x)=\\ldots$'}<br>`
    this.question += `
    ${mathalea2d(
      {
        xmin: -5,
        ymin: -5,
        xmax: 5,
        ymax: 5,
        pixelsParCm: 20,
        scale: 0.7,
        style: 'margin: auto',
      },
      rep,
      courbe((x) => a * x + b, { repere: rep, color: 'blue' }),
      o,
    )}
        `
    this.optionsChampTexte = { texteAvant: '$f(x)=$' }
    this.reponse = { reponse: { value: `${reduireAxPlusB(a, b)}` } }
    this.correction = `$f$ est de la forme
    $f(x)=ax+b$ avec $a$ le coefficient directeur de la droite (inclinaison de la droite par rapport à l'horizontale)
    et $b$ l'ordonnée à l'origine (ordonnée du point d'intersection entre la droite et l'axe des ordonnées).<br>
    On a  $b=${b}$ et :`
    this.correction += texteCentre(
      `$a=\\dfrac{\\text{Dénivelé vertical}}{\\text{Déplacement horizontal}}=${texFractionFromString(miseEnEvidence(a, 'red'), miseEnEvidence(1, 'green'))}=${a}$`,
    )
    this.correction += `On en déduit que la fonction $f$ est définie par $f(x)=${reduireAxPlusB(a, b)}$.<br>`
    s1 = segment(0, 0, 1, 0, 'black')
    s2 = segment(0, 0, 1, 0, 'black')
    if (a > 0) {
      s1 = segment(0, b, 1, b, 'green')
      s2 = segment(1, b, 1, a + b, 'red')
    }
    if (a < 0) {
      s1 = segment(0, b, 1, b, 'green')
      s2 = segment(1, b, 1, a + b, 'red')
    }
    s2.epaisseur = 2
    s1.epaisseur = 2
    s2.styleExtremites = '->'
    s1.styleExtremites = '->'
    if (a > 0) {
      this.correction += `${mathalea2d(
        {
          xmin: -5,
          ymin: -5,
          xmax: 5,
          ymax: 5,
          pixelsParCm: 20,
          scale: 0.7,
          style: 'margin: auto',
        },
        rep,
        courbe((x) => a * x + b, { repere: rep, color: 'blue' }),
        o,
        s1,
        s2,
        texteParPosition('1', 0.5, b - 0.5, 0, 'green', 1, 'milieu', true),
        texteParPosition(a, 1.5, b + a / 2, 0, 'red', 1, 'milieu', true),
      )}<br>`
    }
    if (a < 0) {
      this.correction += `${mathalea2d(
        {
          xmin: -5,
          ymin: -5,
          xmax: 5,
          ymax: 5,
          pixelsParCm: 20,
          scale: 0.7,
          style: 'margin: auto',
        },
        rep,
        courbe((x) => a * x + b, { repere: rep, color: 'blue' }),
        o,
        s1,
        s2,
        texteParPosition('1', 0.5, b + 0.5, 0, 'green', 1, 'milieu', true),
        texteParPosition(a, 1.5, b + a / 2, 0, 'red', 1, 'milieu', true),
      )}<br>`
    }
    this.canEnonce = `$f$ est une fonction affine. <br>
    Exprimer $f(x)$ en fonction de $x$.`
    this.canEnonce += `
    ${mathalea2d(
      {
        xmin: -5,
        ymin: -5.2,
        xmax: 5,
        ymax: 5,
        pixelsParCm: 20,
        scale: 0.7,
        style: 'margin: auto',
      },
      rep,
      courbe((x) => a * x + b, { repere: rep, color: 'blue' }),
      o,
    )}`
    this.canReponseACompleter = '$f(x)=\\ldots$'
  }
}
