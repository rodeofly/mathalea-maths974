import ExerciceSimple from '../../ExerciceSimple'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { droiteGraduee } from '../../../lib/2d/reperes'
import { choice } from '../../../lib/outils/arrayOutils'
import FractionEtendue from '../../../modules/FractionEtendue'
export const titre = 'Placer un point sur une droite graduée'
export const interactifReady = true
export const interactifType = 'qcm'
export const uuid = '64fa8'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class Can2025N6Q26 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatInteractif = 'qcm'
  }

  nouvelleVersion() {
    const choix = this.canOfficielle
      ? [
          [
            texNombre(1.5, 1),
            new FractionEtendue(3, 2).texFraction,
            'E',
            new FractionEtendue(6, 4).texFraction,
          ],
        ]
      : [
          [
            texNombre(0.25, 2),
            new FractionEtendue(1, 4).texFraction,
            'A',
            new FractionEtendue(1, 4).texFraction,
          ],
          [
            texNombre(0.5, 1),
            new FractionEtendue(1, 2).texFraction,
            'B',
            new FractionEtendue(2, 4).texFraction,
          ],
          [
            texNombre(0.75, 2),
            new FractionEtendue(3, 4).texFraction,
            'C',
            new FractionEtendue(3, 4).texFraction,
          ],
          [
            texNombre(1.25, 2),
            new FractionEtendue(5, 4).texFraction,
            'D',
            new FractionEtendue(5, 4).texFraction,
          ],
          [
            texNombre(1.75, 2),
            new FractionEtendue(7, 4).texFraction,
            'F',
            new FractionEtendue(7, 4).texFraction,
          ],
        ]
    const a = choice(choix)
    const d = droiteGraduee({
      Unite: 3,
      Min: 0,
      Max: 2.5,
      x: 0,
      y: 0,
      thickDistance: 1,
      thickSec: true,
      thickSecDist: 0.25,
      thickOffset: 0,
      axeStyle: '->',
      pointListe: [
        [0.25, '\\text{A}'],
        [0.5, '\\text{B}'],
        [0.75, '\\text{C}'],
        [1.25, '\\text{D}'],
        [1.5, '\\text{E}'],
        [1.75, '\\text{F}'],
      ],
      pointCouleur: 'black',
      pointStyle: '',
      labelsPrincipaux: true,
    })
    const dPDF = droiteGraduee({
      Unite: 3,
      Min: 0,
      Max: 2.5,
      x: 0,
      y: 0,
      thickDistance: 1,
      thickSec: true,
      thickSecDist: 0.25,
      thickOffset: 0,
      axeStyle: '->',
      pointStyle: '',
      labelsPrincipaux: true,
    })
    this.reponse = `${a[2]}`

    this.question = mathalea2d(
      {
        xmin: -1,
        ymin: -1.3,
        xmax: 10,
        ymax: 0.9,
        pixelsParCm: 20,
        scale: 0.6,
        style: 'margin: auto',
      },
      d,
    )
    this.question += `Quelle lettre repère le nombre $${a[1]}$ ?`
    if (a[2] === 'E' || a[2] === 'B') {
      this.correction = `L'unité est partagée en $4$.<br>
      Comme  $${a[1]}=${a[3]}$, alors la lettre qui repère le nombre $${a[1]}$ est $${miseEnEvidence(a[2])}$.`
    } else {
      this.correction = `L'unité est partagée en $4$ donc la lettre qui repère le nombre $${a[1]}$ est $${miseEnEvidence(a[2])}$.`
    }
    this.canEnonce = `Place le nombre $${a[1]}$.`
    this.canReponseACompleter = mathalea2d(
      {
        xmin: -1,
        ymin: -1.3,
        xmax: 10,
        ymax: 0.8,
        pixelsParCm: 20,
        scale: 0.5,
        style: 'margin: auto',
      },
      dPDF,
    )

    if (this.interactif) {
      this.autoCorrection[0] = {
        options: { ordered: true },
        enonce: this.question + '<br>Cocher la bonne réponse.',
        propositions: [
          {
            texte: '$A$',
            statut: a[2] === 'A',
          },
          {
            texte: '$B$',
            statut: a[2] === 'B',
          },
          {
            texte: '$C$',
            statut: a[2] === 'C',
          },
          {
            texte: '$D$',
            statut: a[2] === 'D',
          },
          {
            texte: '$E$',
            statut: a[2] === 'E',
          },
          {
            texte: '$F$',
            statut: a[2] === 'F',
          },
        ],
      }
    }
  }
}
