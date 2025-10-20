import ExerciceCan from '../../ExerciceCan'
import { choice } from '../../../lib/outils/arrayOutils'
import { propositionsQcm } from '../../../lib/interactif/qcm'
import { point } from '../../../lib/2d/points'
import { polygone } from '../../../lib/2d/polygones'
import { latex2d } from '../../../lib/2d/textes'
import { mathalea2d } from '../../../modules/2dGeneralites'
export const titre = 'Ordre de grandeur'
export const interactifReady = true
export const interactifType = 'qcm'
export const uuid = '89710'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Gilles Mora

*/
export default class Can2025CE1Q15 extends ExerciceCan {
  enonce(a?: number) {
    if (a == null) {
      a = choice([0, 1, 2, 4])
    }
    const A = point(0, 1, 'A')
    const B = point(1, 0, 'B')
    const C = point(2, 1, 'C')
    const D = point(1, 2, 'D') // carré
    const E = point(3, 2, 'E')
    const F = point(6, 2, 'F')
    const G = point(6, 3, 'G')
    const H = point(3, 3, 'H') // rectangle
    const I = point(5, -1, 'I')
    const J = point(6, -1, 'J')
    const K = point(6, 0, 'K')
    const L = point(5.5, 1, 'L')
    const M = point(5, 0, 'M') // maison
    const N = point(2, -1, 'N')
    const O = point(3.5, -1, 'O')
    const P = point(4, 1, 'P')
    const Q = point(2, 0, 'Q')
    const poly1 = polygone([A, B, C, D], 'black')
    const poly2 = polygone([E, F, G, H], 'black')
    const poly3 = polygone([I, J, K, L, M], 'black')
    const poly4 = polygone([N, O, P, Q], 'black')
    const xmin = -0.5
    const ymin = -2
    const xmax = 7
    const ymax = 3.5
    const objets = []
    objets.push(poly1, poly2, poly3, poly4)
    objets.push(latex2d('1', 1, 1, { letterSize: 'scriptsize' }))
    objets.push(latex2d('2', 4.5, 2.5, { letterSize: 'scriptsize' }))
    objets.push(latex2d('3', 5.5, -0.5, { letterSize: 'scriptsize' }))
    objets.push(latex2d('4', 2.8, -0.5, { letterSize: 'scriptsize' }))

    this.formatInteractif = 'qcm'

    this.question =
      mathalea2d(
        {
          xmin,
          ymin,
          xmax,
          ymax,
          pixelsParCm: 30,
          mainlevee: false,
          amplitude: 0.5,
          scale: 0.6,
          style: 'margin: auto',
        },
        objets,
      ) + '<br>'

    this.question += `Quelle est la figure ${a === 0 ? "n'" : ''}ayant ${a === 1 ? 'un seul axe de symétrie' : a === 0 ? 'aucun axe de symétrie' : `que $${a}$ axes de symétrie`} ?`
    this.autoCorrection[0] = {
      enonce: this.question,
      propositions: [
        {
          texte: 'Figure 1 ',
          statut: a === 4,
        },
        {
          texte: 'Figure 2 ',
          statut: a === 2,
        },
        {
          texte: 'Figure 3 ',
          statut: a === 1,
        },
        {
          texte: 'Figure 4 ',
          statut: a === 0,
        },
      ],
      options: { vertical: true },
    }
    const qcm = propositionsQcm(this, 0)
    this.canEnonce =
      mathalea2d(
        {
          xmin,
          ymin,
          xmax,
          ymax,
          pixelsParCm: 30,
          mainlevee: false,
          amplitude: 0.5,
          scale: 0.6,
          style: 'margin: auto',
        },
        objets,
      ) + '<br>'
    this.canEnonce += `Quelle est la figure ayant ${a === 1 ? 'un seul axe de symétrie' : a === 0 ? 'aucun axe de symétrie' : `$${a}$ axes de symétrie`} ?`
    this.canReponseACompleter = qcm.texte
    this.correction =
      qcm.texteCorr +
      "Le carré (figure 1) a $4$ axes de symétrie, le rectangle (figure 2) en a $2$, la maison (figure 3) en a un et la figure 4 n'en a pas."
    this.canReponseACompleter = qcm.texte
  }

  nouvelleVersion() {
    this.formatInteractif = 'qcm'
    this.canOfficielle ? this.enonce(1) : this.enonce()
  }
}
