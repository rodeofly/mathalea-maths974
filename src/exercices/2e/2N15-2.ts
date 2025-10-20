import { point } from '../../lib/2d/points'
import { segment, segmentAvecExtremites } from '../../lib/2d/segmentsVecteurs'
import { labelPoint, texteParPosition } from '../../lib/2d/textes'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
} from '../../lib/outils/ecritures'
import Exercice from '../Exercice'
import { mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'

/* auteur Stéphane Guyon */
export const titre = 'Résoudre une équation avec des valeurs absolues'

/**
 * 2N15-2, ex 2N23
 * @author Stéphane Guyon
 */
export const uuid = 'e471c'

export const refs = {
  'fr-fr': ['2N15-2'],
  'fr-ch': [],
}
export default class ValeurAbsolueEtEquation extends Exercice {
  constructor() {
    super()

    this.consigne = 'Résoudre dans $\\mathbb{R}$ les équations suivantes.'
    this.nbQuestions = 4
    this.nbCols = 2
    this.nbColsCorr = 2
    this.sup = 1 //
    this.correctionDetailleeDisponible = true
    context.isHtml
      ? (this.correctionDetaillee = true)
      : (this.correctionDetaillee = false)
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = [1, 2, 2, 2, 2, 2]
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const typesDeQuestions = listeTypeDeQuestions[i]
      let a: number
      let b: number
      let c: number
      let texte = ''
      let texteCorr = ''
      switch (typesDeQuestions) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?
        case 1:
          c = 0 // c'est pour éviter les warnings
          a = randint(1, 15) * choice([-1, 1])
          b = randint(1, 15) * -1

          texte = `$\\vert x ${ecritureAlgebrique(a)}\\vert =${b}$`
          texteCorr = ` ${b} étant négatif, il n'existe pas de solution à cette équation. $S=\\emptyset$`

          break
        case 2:
        default:
          a = randint(1, 15) * choice([-1, 1])
          b = randint(1, 15)
          c = -a
          texte = `$\\vert x ${ecritureAlgebrique(a)}\\vert =${b}$`

          texteCorr = `Résoudre cette équation est équivalent à résoudre ces deux équations :<br>
                    $x ${ecritureAlgebrique(a)} =${b}$ et    $x ${ecritureAlgebrique(a)} =${-b}$<br>
                    Il existe donc deux solutions à cette équation :<br>
                    $x_1=${c} ${ecritureAlgebrique(b)}$ et $x_2=${c} -${ecritureParentheseSiNegatif(b)}$<br>
                    $S=\\{${c - b};${c + b}\\}$`
          if (this.correctionDetaillee) {
            const s = segment(point(0, 0), point(12, 0))
            s.styleExtremites = '->'
            const x0 = point(3, 0)
            x0.nom = String(c - b)
            x0.positionLabel = 'below'
            const A = point(6, 0, String(c))
            A.positionLabel = 'below'
            const x1 = point(9, 0, String(c + b), 'below')
            x1.positionLabel = 'below'
            const s1 = segmentAvecExtremites(x0, x1, 'blue')
            s1.epaisseur = 2
            const s2 = segmentAvecExtremites(x0, A)
            const l = labelPoint(A, x0, x1)
            const cote = segment(point(3, 1), point(5.95, 1))
            cote.styleExtremites = '<->'
            const texteCote = texteParPosition(b, 4.5, 1.6)
            const cote2 = segment(point(6.05, 1), point(9, 1))
            cote2.styleExtremites = '<->'
            const texteCote2 = texteParPosition(b, 7.5, 1.6)
            texteCorr += mathalea2d(
              { xmin: -1, xmax: 13, ymin: -2, ymax: 2.5 },
              s,
              s1,
              s2,
              l,
              cote,
              texteCote,
              cote2,
              texteCote2,
            )
          }
          break
      }

      if (this.questionJamaisPosee(i, a, b, c, typesDeQuestions)) {
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
