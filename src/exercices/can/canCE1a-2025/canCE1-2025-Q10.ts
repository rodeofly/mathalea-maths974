import ExerciceSimple from '../../ExerciceSimple'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { milieu, point } from '../../../lib/2d/points'
import { ellipse } from '../../../lib/2d/projections3d'
import {
  colorToLatexOrHTML,
  fixeBordures,
  mathalea2d,
} from '../../../modules/2dGeneralites'
import { propositionsQcm } from '../../../lib/interactif/qcm'
export const titre = 'Vocabulaire dans un solide (QCM)'
export const interactifReady = true
export const interactifType = 'qcm'
export const uuid = '3e8e3'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Gilles Mora

*/
export default class VocabulaireSolide extends ExerciceSimple {
  constructor() {
    super()
    this.formatInteractif = 'qcm'
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.canOfficielle = true
  }

  nouvelleVersion() {
    const A = point(0, 0, 'A', 'below')
    const B = point(-2, 0, 'B', 'below')
    const C = point(2, 0, 'C', 'below')
    const D = point(-2, -1.5, 'D', 'above')
    const E = point(2, -1.5, 'D', 'above')
    const c = ellipse(A, 2, 0.5)
    const c2 = ellipse(milieu(E, D), 2, 0.5)
    const H3 = point(-2.5, -2) // seg avec flèche
    c2.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
    c2.opaciteDeRemplissage = 0.3
    const s2 = segment(milieu(E, D), H3) // seg pour l'aire base
    s2.styleExtremites = '<-'
    const objets = []
    objets.push(segment(B, D), segment(E, C), c, c2, s2)
    this.question = mathalea2d(
      Object.assign(
        {
          pixelsParCm: 30,
          scale: 0.6,
          style: 'margin: auto; display: block',
        },
        fixeBordures(objets, { rxmin: 0, rxmax: 0, rymax: 0, rymin: -0.5 }),
      ),
      objets,
    )

    this.question += `Que montre la flèche ?<br>
       Coche la bonne réponse.`
    this.autoCorrection[0] = {
      enonce: this.question,
      propositions: [
        {
          texte: 'Une face ',
          statut: this.canOfficielle ? 'true' : 'false',
        },
        {
          texte: 'Un sommet',
          statut: false,
        },
        {
          texte: 'Une arête',
          statut: false,
        },
      ],
      options: { vertical: true },
    }
    const qcm = propositionsQcm(this, 0)

    this.question += qcm.texte
    this.correction = '  '
    this.canEnonce =
      mathalea2d(
        Object.assign(
          {
            pixelsParCm: 30,
            mainlevee: false,
            amplitude: 0.5,
            scale: 0.6,
            style: 'margin: auto; display: block',
          },
          fixeBordures(objets, { rxmin: 0, rxmax: 0, rymax: 0, rymin: 0 }),
        ),
        objets,
      ) +
      `Que montre la flèche ?<br>
       Coche la bonne réponse.`
    this.correction = qcm.texteCorr
    this.canReponseACompleter = qcm.texte
  }
}
