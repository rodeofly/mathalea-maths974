import { angle, angleOriente } from '../../lib/2d/angles'
import { point, pointAdistance, pointSurSegment } from '../../lib/2d/points'
import { polygone } from '../../lib/2d/polygones'
import { longueur } from '../../lib/2d/segmentsVecteurs'
import { texteParPoint } from '../../lib/2d/textes'
import { homothetie, similitude } from '../../lib/2d/transformations'
import { triangle2points2longueurs } from '../../lib/2d/triangle'
import { ajouterBoutonMathalea2d } from '../../lib/outils/enrichissements'
import { texteGras } from '../../lib/format/style'
import { creerNomDePolygone } from '../../lib/outils/outilString'
import Exercice from '../Exercice'
import { mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'

export const titre = 'Écrire une relation de Thalès'

/**
 * Relation de Thalès
 * @author Sébastien LOZANO
 */
export default class RelationDeThales extends Exercice {
  level: number
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Configuration',
      3,
      '1 : Triangles imbriqués\n2 : Papillon\n3 : Mélange',
    ]

    this.nbQuestions = 1

    this.sup = 1 // Triangles imbriqués / configuration papillon / les 2
    this.level = 4
  }

  nouvelleVersion(numeroExercice: number) {
    let listeDeNomsDePolygones: string[] = []

    if (this.level === 4) {
      this.sup = 1
    }
    const premiereQuestionPapillon = randint(0, 1) // Pour alterner les configurations et savoir par laquelle on commence

    for (
      let i = 0, texte = '', texteCorr = '', cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      // this.autoCorrection[i] = {}
      if (i % 3 === 0) {
        // Toutes les 3 questions, on repart à zéro sur les noms des polygones
        listeDeNomsDePolygones = ['QD']
      }
      const nomDesPoints = creerNomDePolygone(5, listeDeNomsDePolygones)
      listeDeNomsDePolygones.push(nomDesPoints)
      const nomA = nomDesPoints[0]
      const nomB = nomDesPoints[1]
      const nomC = nomDesPoints[2]
      const nomM = nomDesPoints[3]
      const nomN = nomDesPoints[4]
      const ab = randint(5, 10)
      const ac = randint(5, 10, ab)
      const bc = randint(Math.max(ab - ac, ac - ab) + 1, ab + ac - 1, [ab, ac]) // Pas de triangle isocèle ou équilatéral
      const A = point(0, 0, nomA)
      const B = pointAdistance(A, ab, nomB)
      const ABC = triangle2points2longueurs(A, B, ac, bc)
      ABC.id = `M2D_${numeroExercice}_${i}_1`
      const C = ABC.listePoints[2]
      C.nom = nomC
      let k = randint(3, 8, 5) / 10
      if (this.sup === 2) {
        k *= -1
      }
      if (this.sup === 3 && (i + premiereQuestionPapillon) % 2 === 0) {
        k *= -1
      }
      const M = homothetie(A, C, k)
      const N = homothetie(B, C, k)
      const MNC = polygone(M, N, C)
      MNC.id = `M2D_${numeroExercice}_${i}_2`
      const m = pointSurSegment(M, N, -0.5)
      const n = pointSurSegment(N, M, -0.5)
      const marqueNomM = texteParPoint(nomM, m, 0, 'black', 1, 'milieu', true)
      const marqueNomN = texteParPoint(nomN, n, 0, 'black', 1, 'milieu', true)
      const a = pointSurSegment(A, B, -0.5)
      const b = pointSurSegment(B, A, -0.5)
      const marqueNomA = texteParPoint(nomA, a, 0, 'black', 1, 'milieu', true)
      const marqueNomB = texteParPoint(nomB, b, 0, 'black', 1, 'milieu', true)
      let c
      if (k < 0) {
        if (angle(A, C, N) < angle(N, C, A)) {
          c = similitude(A, C, -angleOriente(A, C, N) / 2, 1 / longueur(A, C))
        } else {
          c = similitude(
            A,
            C,
            -angleOriente(N, C, A) / 2,
            (1 / longueur(A, C)) * 0.5,
          )
        }
      } else {
        c = similitude(
          A,
          C,
          -180 + angleOriente(A, C, B) / 2,
          (1 / longueur(A, C)) * 0.5,
        )
      }
      const marqueNomC = texteParPoint(nomC, c, 0, 'black', 1, 'milieu', true)

      texte = 'Sur la figure suivante : '
      if (k > 0) {
        texte += `
        <br> $\\leadsto ${nomM}$ est sur $${'[' + nomC + nomA + ']'}$,
        <br> $\\leadsto ${nomN}$ est sur $${'[' + nomC + nomB + ']'}$,`
      } else {
        texte += `<br> $\\leadsto$ les droites $(${nomA + nomM})$ et $(${nomB + nomN})$ sont sécantes en $${nomC}$,`
      }

      texte += `<br> $\\leadsto$ les droites $(${nomA + nomB})$ et $(${nomM + nomN})$ sont parallèles.<br>Écrire une relation de Thalès.<br>`

      texte += mathalea2d(
        {
          xmin: Math.min(A.x, B.x, C.x, M.x, N.x) - 1.5,
          ymin: Math.min(A.y, B.y, C.y, M.y, N.y) - 0.8,
          xmax: Math.max(A.x, B.x, C.x, M.x, N.x) + 1.5,
          ymax: Math.max(A.y, B.y, C.y, M.y, N.y) + 0.8,
          scale: 0.5,
        },

        ABC,
        MNC,
        marqueNomA,
        marqueNomB,
        marqueNomC,
        marqueNomM,
        marqueNomN,
      )

      const epaisseurTriangle = k < 0 ? 2 : 6 // En cas de configuration papillon il est inutile de changer l'épaisseur
      const boutonAideMathalea2d = ajouterBoutonMathalea2d(
        `${numeroExercice}_${i}`,
        `if (!document.getElementById('M2D_${numeroExercice}_${i}_1').dataset.colorie == true || (document.getElementById('M2D_${numeroExercice}_${i}_1').dataset.colorie == 'false')){
          document.getElementById('M2D_${numeroExercice}_${i}_1').style.stroke = 'blue';
          document.getElementById('M2D_${numeroExercice}_${i}_2').style.stroke = 'red';
          document.getElementById('M2D_${numeroExercice}_${i}_1').style.opacity = .5;
          document.getElementById('M2D_${numeroExercice}_${i}_1').style.strokeWidth = ${epaisseurTriangle};
          document.getElementById('M2D_${numeroExercice}_${i}_2').style.opacity = 1;
          document.getElementById('M2D_${numeroExercice}_${i}_2').style.strokeWidth = 2;
          document.getElementById('M2D_${numeroExercice}_${i}_1').dataset.colorie = true;
          document.getElementById('btnMathALEA2d_${numeroExercice}_${i}').classList.add('active');
        } else {
          document.getElementById('M2D_${numeroExercice}_${i}_1').style.stroke = 'black';
          document.getElementById('M2D_${numeroExercice}_${i}_2').style.stroke = 'black';
          document.getElementById('M2D_${numeroExercice}_${i}_1').style.opacity = 1;
          document.getElementById('M2D_${numeroExercice}_${i}_1').style.strokeWidth = 1;
          document.getElementById('M2D_${numeroExercice}_${i}_2').style.opacity = 1;
          document.getElementById('M2D_${numeroExercice}_${i}_2').style.strokeWidth = 1;
          document.getElementById('M2D_${numeroExercice}_${i}_1').dataset.colorie = false;
          document.getElementById('btnMathALEA2d_${numeroExercice}_${i}').classList.remove('active');
  
        }
        `,
        'Mettre en couleur les 2 triangles',
      )

      if (k > 0) {
        texteCorr = `Dans le triangle $${nomA + nomB + nomC}$ :
       <br> $\\leadsto$ $${nomM}\\in${'[' + nomC + nomA + ']'}$,
       <br> $\\leadsto$ $${nomN}\\in${'[' + nomC + nomB + ']'}$,
       <br> $\\leadsto$  $(${nomA + nomB})//(${nomM + nomN})$,
       <br> donc d'après le théorème de Thalès, les triangles $${nomA + nomB + nomC}$ et $${nomM + nomN + nomC}$ ont des longueurs proportionnelles.`
      } else {
        texteCorr = `$\\leadsto$ Les droites $(${nomA + nomM})$ et $(${nomB + nomN})$ sont sécantes en $${nomC}$,
        <br> $\\leadsto$ les droites $(${nomA + nomB})$ et $(${nomM + nomN})$ sont parallèles,<br>
        donc d'après le théorème de Thalès, les triangles $${nomA + nomB + nomC}$ et $${nomM + nomN + nomC}$ ont des longueurs proportionnelles.`
      }
      texteCorr += '<br><br>'
      if (context.isHtml) {
        texteCorr += `$\\dfrac{\\color{red}${nomC + nomM}}{\\color{blue}${nomC + nomA}}=\\dfrac{\\color{red}${nomC + nomN}}{\\color{blue}${nomC + nomB}}=\\dfrac{\\color{red}${nomM + nomN}}{\\color{blue}${nomA + nomB}}$`
      } else {
        texteCorr += `$\\dfrac{${nomC + nomM}}{${nomC + nomA}}=\\dfrac{${nomC + nomN}}{${nomC + nomB}}=\\dfrac{${nomM + nomN}}{${nomA + nomB}}$`
      }

      texteCorr += context.isHtml ? '<br>' : '\\medskip'
      texteCorr += `<br>${texteGras('Remarque')}<br>On pourrait aussi écrire : `
      if (context.isHtml) {
        texteCorr += `$\\dfrac{\\color{blue}${nomC + nomA}}{\\color{red}${nomC + nomM}}=\\dfrac{\\color{blue}${nomC + nomB}}{\\color{red}${nomC + nomN}}=\\dfrac{\\color{blue}${nomA + nomB}}{\\color{red}${nomM + nomN}}$`
      } else {
        texteCorr += `$\\dfrac{${nomC + nomA}}{${nomC + nomM}}=\\dfrac{${nomC + nomB}}{${nomC + nomN}}=\\dfrac{${nomA + nomB}}{${nomM + nomN}}$`
      }

      if (context.isHtml) {
        texte += `<br><div style="display: inline-block;margin-top:20px;">${boutonAideMathalea2d}</div>`
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
