import { droite } from '../../lib/2d/droites'
import {
  point,
  pointIntersectionDD,
  pointSurSegment,
} from '../../lib/2d/points'
import { longueur, segment } from '../../lib/2d/segmentsVecteurs'
import { rotation } from '../../lib/2d/transformations'
import { creerNomDePolygone } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Alea2iep from '../../modules/Alea2iep'

export const titre =
  'Tracer un triangle dont on connaît une longueur et 2 angles'

/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @author Rémi Angot
 */
export const uuid = '1ad45'

export const refs = {
  'fr-fr': ['6G6A-5'],
  'fr-2016': ['6G23-2'],
  'fr-ch': ['9ES4-11', '9ES5-5'],
}
export default class TracerTriangle2Angles extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 3
    this.besoinFormulaireCaseACocher = [
      "Longueurs données qu'à la fin de l'animation",
    ]
    this.sup = false
  }

  nouvelleVersion() {
    let listeDeNomsDePolygones: string[] = []
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      if (i % 5 === 0) listeDeNomsDePolygones = ['PQD']
      const c = randint(30, 70) / 10
      const angle1 = randint(20, 70)
      const angle2 = randint(20, 70)
      const p = creerNomDePolygone(3, listeDeNomsDePolygones)
      listeDeNomsDePolygones.push(p)
      texte = `Tracer un triangle $${p}$ tel que $${p[0] + p[1]}=${texNombre(
        c,
      )}$ cm, $\\widehat{${
        p[1] + p[0] + p[2]
      }}=${angle1}^\\circ$ et $\\widehat{${
        p[0] + p[1] + p[2]
      }}=${angle2}^\\circ$.`
      texte += `<br> Mesurer $${p[0] + p[2]}$ et $${p[1] + p[2]}$.`
      // const A0 = point(0, 0, p[0], 'left')
      const B0 = point(c, 0, p[1], 'right')
      // const s0 = segmentAvecExtremites(A0, B0)
      // const t1 = afficheLongueurSegment(B0, A0)

      const A1 = point(B0.x + 4, 0, p[0], 'left')
      const B1 = point(A1.x + c, 0, p[1], 'right')
      const s1 = segment(A1, B1)
      s1.styleExtremites = '-|'
      // const c1 = rotation(B1, A1, angle1)
      // const C1 = pointSurSegment(c1, A1, -3)
      // const s2 = segment(A1, C1)
      // const t2 = afficheMesureAngle(B1, A1, C1)

      const A2 = point(B1.x + 4, 0, p[0], 'left')
      const B2 = point(A2.x + c, 0, p[1], 'right')
      // const s3 = segment(A2, B2)
      const c2 = rotation(B2, A2, angle1)
      const C2 = pointSurSegment(c2, A2, -3)
      // const s4 = segment(A2, C2)
      const c3 = rotation(A2, B2, -angle2)
      const C3 = pointSurSegment(c3, B2, -3)
      // const t3 = afficheMesureAngle(A2, B2, C3)
      // const s5 = segment(B2, C3)
      const d1 = droite(A2, C2)
      const d2 = droite(B2, C3)
      const C = pointIntersectionDD(d1, d2, p[2])
      // const l = labelPoint(A0, B0, A1, B1, A2, B2, C)

      // if (context.isHtml) {
      //   texteCorr = mathalea2d(
      //     { xmin: -1, xmax: 3 * c + 10, ymin: -1, ymax: 10 }, s0, s1, s2, s3, s4, s5, t1, t2, t3, l)
      //   texteCorr += '<br><br>'
      // } else {
      //   texteCorr = ''
      // }
      if (this.sup) {
        texteCorr = ''
      } else {
        texteCorr = `$${p[0] + p[2]}\\approx${texNombre(longueur(A2, C, 1))}$ cm et $${p[1] + p[2]}\\approx${texNombre(longueur(B2, C, 1))}$ cm.`
      }
      const anim = new Alea2iep()
      anim.triangle1longueur2angles(p, c, angle1, angle2, {
        description: true,
        mesure: true,
      }) // description et longueur
      texteCorr += anim.htmlBouton(this.numeroExercice ?? 0, i)

      if (this.questionJamaisPosee(i, c, angle1, angle2)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
