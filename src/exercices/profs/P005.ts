import { point } from '../../lib/2d/points'
import { carre, polygone } from '../../lib/2d/polygones'
import {
  grille,
  lignesHorizontales,
  lignesVerticales,
} from '../../lib/2d/reperes'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { texteParPosition } from '../../lib/2d/textes'
import Exercice from '../Exercice'
import { mathalea2d } from '../../modules/2dGeneralites'

export const titre = 'Grilles décimales'

export const refs = {
  'fr-fr': ['P005'],
  'fr-ch': [],
}
export const uuid = 'ad5f7'

/**
 * Fonction permettant aux enseignants de proposer des grilles décimale à colorier
 * @author Jean-Claude Lhote
 */
export default class FeuilleDeGrilles extends Exercice {
  constructor() {
    super()

    this.besoinFormulaireNumerique = [
      'nombre de cases',
      3,
      '1 : 10\n2 : 100\n3 : 1000',
    ]

    this.sup = 1
    this.nbQuestionsModifiable = false
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const objets = []
    let fleche
    let A
    let B
    let C
    let D
    let texte = ''
    this.contenu = ''
    if (this.sup === 1) {
      // On travaille au dixième
      for (let i = 0; i < 5; i++) {
        objets.length = 0
        // pixelsParCm=50
        objets.push(carre(point(1, 1), point(2, 1)))
        objets.push(texteParPosition('= 1 unité', 3.5, 1.5))
        objets.push(grille(15, -2, 19, 2, 'black', 1, 4))
        for (let j = 0; j < 11; j++) {
          A = point(0 + j * 1.1, -0.5)
          B = point(1 + j * 1.1, -0.5)
          C = point(1 + j * 1.1, 0.5)
          D = point(0 + j * 1.1, 0.5)
          objets.push(polygone(A, B, C, D))
        }
        objets.push(segment(point(11.5, 0.5), point(15, 2), 'gray'))
        objets.push(segment(point(11.5, -0.5), point(15, -2), 'gray'))
        fleche = segment(12, 0, 15, 0)
        fleche.styleExtremites = '->'
        objets.push(texteParPosition('ZOOM', 13.5, 0.4))
        objets.push(texteParPosition('x4', 13.5, -0.4))
        objets.push(fleche)
        objets.push(lignesHorizontales(15, -2, 19, 2, 'gray', 1, 0.8))
        objets.push(lignesVerticales(15, -2, 19, 2, 'gray', 1, 2))
        objets.push(lignesHorizontales(11, -0.5, 12, 0.5, 'gray', 0.8, 0.2))
        objets.push(lignesVerticales(11, -0.5, 12, 0.5, 'gray', 0.8, 0.5))

        texte = mathalea2d(
          {
            xmin: -0.5,
            ymin: -2.2,
            xmax: 21,
            ymax: 3,
            pixelsParCm: 30,
            scale: 0.8,
          },
          objets,
        )
        this.contenu = texte
        this.contenu += '<br>'
      }
    } else if (this.sup === 2) {
      for (let i = 0; i < 4; i++) {
        objets.length = 0
        // pixelsParCm=50
        objets.push(carre(point(1, 1.5), point(2, 1.5)))
        objets.push(texteParPosition('= 1 unité', 3.5, 2))
        objets.push(grille(15, -2.5, 20, 2.5, 'black', 1, 0.5))
        objets.push(grille(11, -0.5, 12, 0.5, 'black', 0.3, 0.1))

        for (let j = 0; j < 11; j++) {
          A = point(0 + j * 1.1, -0.5)
          B = point(1 + j * 1.1, -0.5)
          C = point(1 + j * 1.1, 0.5)
          D = point(0 + j * 1.1, 0.5)
          objets.push(polygone(A, B, C, D))
        }
        objets.push(segment(point(11.5, 0.5), point(15, 2.5)))
        objets.push(segment(point(11.5, -0.5), point(15, -2.5)))
        fleche = segment(12, 0, 15, 0)
        fleche.styleExtremites = '->'
        objets.push(texteParPosition('ZOOM', 13.5, 0.5))
        objets.push(texteParPosition('x5', 13.5, -0.5))
        objets.push(fleche)
        texte = mathalea2d(
          {
            xmin: -0.5,
            ymin: -3,
            xmax: 26,
            ymax: 3,
            pixelsParCm: 30,
            scale: 0.8,
          },
          objets,
        )
        this.contenu = texte
        this.contenu += '<br>'
      }
    } else {
      for (let i = 0; i < 3; i++) {
        objets.length = 0
        // pixelsParCm=50
        for (let j = 0; j < 11; j++) {
          A = point(0 + j * 1.1, -0.5)
          B = point(1 + j * 1.1, -0.5)
          C = point(1 + j * 1.1, 0.5)
          D = point(0 + j * 1.1, 0.5)
          objets.push(polygone(A, B, C, D))
        }
        objets.push(carre(point(1, 1.5), point(2, 1.5)))
        objets.push(texteParPosition('= 1 unité', 3.5, 2))
        objets.push(segment(point(11.5, 0.5), point(15, 5)))
        objets.push(segment(point(11.5, -0.5), point(15, -5)))
        fleche = segment(12, 0, 15, 0)
        fleche.styleExtremites = '->'
        objets.push(texteParPosition('ZOOM', 13.5, 0.5))
        objets.push(texteParPosition('x10', 13.5, -0.5))
        objets.push(fleche)
        objets.push(lignesHorizontales(15, -5, 25, 5, 'gray', 0.8, 0.2))
        objets.push(lignesVerticales(15, -5, 25, 5, 'gray', 0.8, 0.5))
        objets.push(grille(15, -5, 25, 5, 'black', 1, 1))
        objets.push(grille(11, -0.5, 12, 0.5, 'black', 0.3, 0.1))
        texte = mathalea2d(
          {
            xmin: -0.1,
            ymin: -5.5,
            xmax: 26,
            ymax: 5.5,
            pixelsParCm: 25,
            scale: 0.7,
          },
          objets,
        )
        this.contenu = texte
        this.contenu += '<br>'
      }
    }
    this.listeQuestions[0] = this.contenu
    // listeDeChosesAImprimer(this);
  }
}
