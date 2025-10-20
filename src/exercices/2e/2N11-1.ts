import {
  CrochetD,
  crochetD,
  CrochetG,
  crochetG,
  intervalle,
} from '../../lib/2d/intervalles'
import { Point, point } from '../../lib/2d/points'
import { Segment, segment } from '../../lib/2d/segmentsVecteurs'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import Exercice from '../Exercice'
import { mathalea2d } from '../../modules/2dGeneralites'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { context } from '../../modules/context'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'

import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'

export const titre =
  'Associer un intervalle de  $\\mathbb{R}$ à une inéquation et son schéma sur une droite graduée'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * 2N11-1, ex 2N24
 * @Stéphane Guyon
 */
export const uuid = '31c01'

export const refs = {
  'fr-fr': ['2N11-1'],
  'fr-ch': ['2mIneq-8', '1mEI-6'],
}
export default class IntervallesDeR extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 4
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    ]
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const typeDeQuestion = listeTypeDeQuestions[i]
      let texte = ''
      let texteCorr = ''
      const s = segment(0, 0, 12, 0)
      s.styleExtremites = '->'
      const X1 = point(0, 0)
      const X2 = point(12, 0)

      const int = intervalle(X1, X2, 'black', 0)
      let a: number
      let b: number
      let A: Point
      let B: Point
      let c1: CrochetG
      let c2: CrochetD
      let int1: Segment
      let c = 0
      switch (typeDeQuestion) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?
        case 1:
          a = randint(1, 15)
          b = randint(a, 25)
          A = point(2, 0, String(a))
          B = point(6, 0, String(b))
          c1 = crochetG(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4
          int1 = intervalle(A, X2, 'red', 0)
          int1.epaisseur = 6
          texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $x>${a}$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
          )
          texteCorr += `$I=]${a};+\\infty[$`
          break

        case 2:
          a = randint(1, 15)
          b = randint(a, 25)
          A = point(2, 0, String(a))
          B = point(6, 0, String(b))
          c1 = crochetD(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4
          int1 = intervalle(A, X2, 'red', 0)
          int1.epaisseur = 6
          texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $x\\geqslant ${a}$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
          )
          texteCorr += `$I=[${a};+\\infty[$`
          break

        case 3:
          a = randint(1, 15)
          b = randint(a, 25)
          A = point(2, 0, String(a))
          B = point(6, 0, String(b))
          c1 = crochetD(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4
          int1 = intervalle(X1, A, 'red', 0)
          int1.epaisseur = 6
          texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $x<${a}$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
          )
          texteCorr += `$I=]-\\infty;${a}[$`
          break

        case 4:
          a = randint(1, 15)
          b = randint(a, 25)
          A = point(2, 0, String(a))
          B = point(6, 0, String(b))
          c1 = crochetG(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4
          int1 = intervalle(X1, A, 'red', 0)
          int1.epaisseur = 6
          texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $x\\leqslant ${a}$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
          )
          texteCorr += `$I=]-\\infty;${a}]$`
          break

        case 5:
          a = randint(1, 15)
          c = a + 1
          b = randint(c, 25)
          A = point(2, 0, String(a))
          B = point(6, 0, String(b))
          c1 = crochetG(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4
          c2 = crochetD(B, 'red')
          c2.taille = context.isHtml ? 0.2 : 0.4
          int1 = intervalle(A, B, 'red', 0)
          int1.epaisseur = 6
          texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $${a} < x < ${b}$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
            c2,
          )
          texteCorr += `$I=]${a};${b}[$`
          break

        case 6:
          a = randint(1, 15)
          c = a + 1
          b = randint(c, 25)
          A = point(2, 0, String(a))
          B = point(6, 0, String(b))
          c1 = crochetD(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4
          c2 = crochetD(B, 'red')
          c2.taille = context.isHtml ? 0.2 : 0.4
          int1 = intervalle(A, B, 'red', 0)
          int1.epaisseur = 6
          texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $${a}\\leqslant x<${b}$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
            c2,
          )
          texteCorr += `$I=[${a};${b}[$`
          break

        case 7:
          a = randint(1, 15)
          c = a + 1
          b = randint(c, 25)
          A = point(2, 0, String(a))
          B = point(6, 0, String(b))
          c1 = crochetD(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4
          c2 = crochetG(B, 'red')
          c2.taille = context.isHtml ? 0.2 : 0.4
          int1 = intervalle(A, B, 'red', 0)
          int1.epaisseur = 6
          texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $${a}\\leqslant x\\leqslant ${b}$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
            c2,
          )
          texteCorr += `$I=[${a};${b}]$`
          break

        case 8:
          a = randint(1, 15)
          c = a + 1
          b = randint(c, 25)
          A = point(2, 0, String(a))
          B = point(6, 0, String(b))
          c1 = crochetG(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4
          c2 = crochetG(B, 'red')
          c2.taille = context.isHtml ? 0.2 : 0.4
          int1 = intervalle(A, B, 'red', 0)
          int1.epaisseur = 6
          texte = `Déterminer l'intervalle $I$ de $\\mathbb{R}$ correspondant à l'inéquation $${a}< x\\leqslant ${b}$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
            c2,
          )
          texteCorr += `$I=]${a};${b}]$`
          break

        case 9:
          a = randint(1, 15)
          c = a + 1
          b = randint(c, 25)
          A = point(2, 0, String(a))
          B = point(6, 0, String(b))
          c1 = crochetG(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4
          c2 = crochetG(B, 'red')
          c2.taille = context.isHtml ? 0.2 : 0.4
          int1 = intervalle(A, B, 'red', 0)
          int1.epaisseur = 6
          texte = `Déterminer l'inéquation correspondant à $x \\in ]${a};${b}]$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
            c2,
          )
          texteCorr += `$${a}< x\\leqslant ${b}$`
          break
        case 10:
          a = randint(1, 15)
          c = a + 1
          b = randint(c, 25)
          A = point(2, 0, String(a))
          B = point(6, 0, String(b))
          c1 = crochetD(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4
          c2 = crochetG(B, 'red')
          c2.taille = context.isHtml ? 0.2 : 0.4
          int1 = intervalle(A, B, 'red', 0)
          int1.epaisseur = 6
          texte = `Déterminer l'inéquation correspondant à $x \\in [${a};${b}]$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
            c2,
          )
          texteCorr += `$${a}\\leqslant x\\leqslant ${b}$`
          break
        case 11:
          a = randint(1, 15)
          c = a + 1
          b = randint(c, 25)
          A = point(2, 0, String(a))
          B = point(6, 0, String(b))
          c1 = crochetD(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4
          c2 = crochetD(B, 'red')
          c2.taille = context.isHtml ? 0.2 : 0.4
          int1 = intervalle(A, B, 'red', 0)
          int1.epaisseur = 6
          texte = `Déterminer l'inéquation correspondant à $x \\in [${a};${b}[$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
            c2,
          )
          texteCorr += `$${a}\\leqslant x< ${b}$`
          break
        case 12:
          a = randint(1, 15)
          c = a + 1
          b = randint(c, 25)
          A = point(2, 0, String(a))
          B = point(12, 0, String(b))
          c1 = crochetG(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4

          int1 = intervalle(A, B, 'red', 0)
          texte = `Déterminer l'inéquation correspondant à $x \\in ]${a};+\\infty[$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          int1.epaisseur = 6
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
          )
          texteCorr += `$x > ${a}$`
          break
        case 13:
          a = randint(1, 15)
          c = a + 1
          b = randint(c, 25)
          A = point(7, 0, String(a))
          B = point(12, 0, String(b))
          c1 = crochetD(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4

          int1 = intervalle(X1, A, 'red', 0)
          int1.epaisseur = 6
          texte = `Déterminer l'inéquation correspondant à $x \\in ]-\\infty;${a}[$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
          )
          texteCorr += `$x < ${a}$`
          break
        case 14:
        default:
          a = randint(1, 15)
          c = a + 1
          b = randint(c, 25)
          A = point(7, 0, String(a))
          B = point(12, 0, String(b))
          c1 = crochetG(A, 'red')
          c1.taille = context.isHtml ? 0.2 : 0.4

          int1 = intervalle(X1, A, 'red', 0)
          int1.epaisseur = 6
          texte = `Déterminer l'inéquation correspondant à $x \\in ]-\\infty;${a}]$${this.interactif ? '.' : " et représenter l'intervalle sur une droite graduée."}`
          texteCorr = mathalea2d(
            {
              xmin: -2,
              ymin: -2,
              xmax: 15,
              ymax: 2,
              scale: 0.6,
            },
            s,
            int,
            int1,
            c1,
          )
          texteCorr += `$x \\leqslant ${a}$`
          break
      }
      if (this.questionJamaisPosee(i, a, b, typeDeQuestion)) {
        // Si la question n'a jamais été posée, on en créé une autre
        if (this.interactif) {
          let reponse
          if (typeDeQuestion < 9) {
            reponse = texteCorr.split('I=')[1] // On prend la réponse après 'I='
            reponse = reponse.substring(0, reponse.length - 1) // et on vire le $ de la fin.
            handleAnswers(this, i, {
              reponse: { value: reponse, options: { intervalle: true } },
            })
          } else {
            const rep = texteCorr.match(/\$(.*)\$/g) // On prend ce qui est entre les $ $.
            if (rep !== null) {
              reponse = rep[0] as string
              handleAnswers(this, i, { reponse: { value: reponse } })
            }
          }
          texte += ajouteChampTexteMathLive(
            this,
            i,
            ` ${KeyboardType.clavierEnsemble} ${KeyboardType.clavierCompare}`,
          )
        }
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
