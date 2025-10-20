import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { choice } from '../../../lib/outils/arrayOutils'
import { randint } from '../../../modules/outils'
import { repere } from '../../../lib/2d/reperes'
import { point, tracePoint } from '../../../lib/2d/points'
import { labelPoint, latex2d } from '../../../lib/2d/textes'
import { mathalea2d } from '../../../modules/2dGeneralites'
export const titre = 'Multiplier un entier avec un décimal'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '1ef53'
export const refs = {
  'fr-fr': [''],
  'fr-ch': ['NR'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Coordonnees extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
    this.optionsChampTexte = { texteApres: '.' }
    this.canOfficielle = true
  }

  nouvelleVersion() {
    let b = this.canOfficielle ? -1 : randint(-2, 2)
    let a = this.canOfficielle ? 3 : randint(-3, 3, b)
    const choix = this.canOfficielle ? true : choice([true, false])

    do {
      b = this.canOfficielle ? -1 : randint(-2, 2)
      a = this.canOfficielle ? 3 : randint(-3, 3, b)
    } while (a === 0 && b === 0)
    this.reponse = choix ? a : b
    const r = repere({
      xUnite: 1,
      yUnite: 1,
      xMin: -4,
      xMax: 4,
      yMin: -3,
      yMax: 3,
      thickHauteur: 0.1,
      yLabelEcart: 0.4,
      xLabelEcart: 0.3,
      xLabelMin: -3,
      yLabelMin: -2,
      xLabelMax: 3,
      yLabelMax: 2,
      axeXStyle: '->',
      axeYStyle: '->',
      grilleSecondaire: false,
    })

    const A = point(a, b, 'A', 'above')
    const o = latex2d('\\text{O}', -0.2, -0.3, {
      color: 'black',
      letterSize: 'scriptsize',
    })
    const traceA = tracePoint(A) // Variable qui trace les points avec une croix
    traceA.taille = 3
    traceA.epaisseur = 2

    this.question = mathalea2d(
      {
        xmin: -5,
        xmax: 5,
        ymin: -3,
        ymax: 3,
        scale: 0.7,
        pixelsParCm: 30,
        style: 'margin: auto',
      },
      r,
      o,
      traceA,
      labelPoint(A),
    )
    this.question += `<br>L'${choix ? 'abscisse' : 'ordonnée'} du point $A$ est `
    if (!this.interactif) {
      this.question += '$\\ldots$'
    }
    this.correction = `L'${choix ? 'abscisse' : 'ordonnée'} du point se lit sur l'axe ${choix ? 'horizontal' : 'vertical'}.<br>
   On lit : $${miseEnEvidence(this.reponse)}$. `

    this.canEnonce = mathalea2d(
      {
        xmin: -5,
        xmax: 5,
        ymin: -2,
        ymax: 3,
        scale: 0.7,
        pixelsParCm: 30,
        style: 'margin: auto',
      },
      r,
      o,
      traceA,
      labelPoint(A),
    )
    this.canReponseACompleter = `L'${choix ? 'abscisse' : 'ordonnée'} du point $A$ est $\\ldots$`
  }
}
