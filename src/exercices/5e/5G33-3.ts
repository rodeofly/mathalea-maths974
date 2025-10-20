import { codageAngleDroit } from '../../lib/2d/angles'
import { afficheLongueurSegment } from '../../lib/2d/codages'
import { distancePointDroite, droite } from '../../lib/2d/droites'
import { point, tracePoint } from '../../lib/2d/points'
import { polygoneAvecNom } from '../../lib/2d/polygones'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { labelPoint } from '../../lib/2d/textes'
import { projectionOrtho } from '../../lib/2d/transformations'
import { choisitLettresDifferentes } from '../../lib/outils/aleatoires'
import { texNombre } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import { mathalea2d } from '../../modules/2dGeneralites'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { context } from '../../modules/context'
export const titre = "Mesurer la distance d'un point à une droite"

export const dateDePublication = '01/03/2023'

/**
 * Simple exercice de mesure de distance entre un point et une droite
 * @author Guillaume Valmont

*/
export const uuid = '29c3b'

export const refs = {
  'fr-fr': ['5G33-3'],
  'fr-2016': ['6G53'],
  'fr-ch': ['9ES3-8'],
}
export default class MesurerDistancePointDroite extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      const objetsEnonce = []
      const objetsCorrection = []
      const O = point(0, 0)
      const B = point(randint(-4, 4, [0]), randint(-3, 4, [0]))
      const d = droite(O, B, '(d)')
      let A = point(
        randint(-4, 4),
        randint(-3, 4),
        choisitLettresDifferentes(1, 'OH')[0],
      )
      while (distancePointDroite(A, d) < 1) {
        A = point(
          randint(-4, 4),
          randint(-3, 4),
          choisitLettresDifferentes(1, 'OH')[0],
        )
      }
      const traceA = tracePoint(A)
      traceA.taille = context.isHtml ? 2 : 1
      objetsEnonce.push(traceA, labelPoint(A), d)
      objetsCorrection.push(traceA, d)
      const H = projectionOrtho(A, d, 'H')
      if (A.y > H.y) H.positionLabel = 'below'
      const segmentAH = segment(A, H)
      segmentAH.pointilles = 5
      const AH = polygoneAvecNom(A, H)
      objetsCorrection.push(
        AH[0],
        AH[1],
        afficheLongueurSegment(A, H),
        codageAngleDroit(A, H, B),
      )
      const xmin = -5
      const xmax = 5
      const ymin = -4
      const ymax = 5
      const paramsEnonce = { xmin, ymin, xmax, ymax, pixelsParCm: 20, scale: 1 }
      texteCorr = '' + mathalea2d(paramsEnonce, objetsCorrection) + '<br>'
      texteCorr += `Pour mesurer la distance entre le point $${A.nom}$ et la droite ($d$) :<br>
      - on utilise l'équerre pour tracer la perpendiculaire à la droite ($d$)) qui passe par le point $${A.nom}$<br>
      - si on nomme $${H.nom}$ le pied de la perpendiculaire, alors la distance entre le point $${A.nom}$ et la droite ($d$) est la longueur $${A.nom + H.nom} = ${texNombre(distancePointDroite(A, d), 1)} cm$`
      texte = `Mesurer la distance entre le point $${A.nom}$ et la droite ($d$).<br>`
      texte += mathalea2d(paramsEnonce, objetsEnonce)
      if (this.questionJamaisPosee(i, A.nom)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
