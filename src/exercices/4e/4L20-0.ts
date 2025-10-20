import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { sp } from '../../lib/outils/outilString'
import Exercice from '../Exercice'
import { context } from '../../modules/context'
import { listeQuestionsToContenu } from '../../modules/outils'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { equation1erDegre1Inconnue } from '../../lib/outils/equations'

export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export const titre =
  'Résoudre une équation du premier degré à solutions entières'

/**
 * Équation du premier degré
 * * Type 1 : x+b=d ou ax=d
 * * Type 2 : ax+b=d
 * * Type 3 : ax+b=cx+d
 * * Tous les types
 * @author Rémi Angot
 * Modifications de 4L20 pour n'avoir que des solutions entières : Jean-Claude Lhote
 * Refactorisation et extraction de la fonction génératrice d'équations par Guillaume Valmont le 06/06/2025
 * 4L20-0
 */
export const uuid = '515b0'

export const refs = {
  'fr-fr': ['4L20-0', 'BP2RES9'],
  'fr-ch': ['10FA3-6'],
}
export default class ExerciceEquationASolutionEntiere extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = ['Avec des nombres relatifs']
    this.besoinFormulaire2Numerique = [
      "Type d'équations",
      4,
      '1 : ax=d ou x+b=d ou x-b=d\n2: ax+b=d\n3: ax+b=cx+d\n4: Mélange',
    ]

    this.consigne = 'Résoudre les équations suivantes.'
    this.spacing = 2
    context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2)
    this.correctionDetailleeDisponible = true
    if (!context.isHtml) {
      this.correctionDetaillee = false
    } else {
      this.correctionDetaillee = true
    }
    this.sup = true // Avec des nombres relatifs
    this.sup2 = 4 // Choix du type d'équation
    this.nbQuestions = 6
  }

  nouvelleVersion() {
    let listeTypeDeQuestions: (
      | 'ax+b=0'
      | 'ax+b=d'
      | 'ax=d'
      | 'x+b=d'
      | 'ax+b=cx+d'
    )[] = []
    switch (this.sup2.toString()) {
      case '1':
        listeTypeDeQuestions = ['ax=d', 'x+b=d']
        break
      case '2':
        listeTypeDeQuestions = ['ax+b=d']
        break
      case '3':
        listeTypeDeQuestions = ['ax+b=cx+d']
        break
      default:
        listeTypeDeQuestions = [
          'ax+b=0',
          'ax+b=d',
          'ax=d',
          'x+b=d',
          'ax+b=cx+d',
        ]
        break
    }
    listeTypeDeQuestions = combinaisonListes(
      listeTypeDeQuestions,
      this.nbQuestions,
    )
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const equation = equation1erDegre1Inconnue({
        valeursRelatives: this.sup,
        type: listeTypeDeQuestions[i],
      })
      const texte = `$${equation.egalite}$ ${ajouteChampTexteMathLive(this, i, '', { texteAvant: sp(10) + '<br>La solution est $x=$' })}`
      const texteCorr =
        texte + '<br>' + this.correctionDetaillee
          ? equation.correctionDetaillee
          : equation.correction
      setReponse(this, i, equation.reponse, { signe: !!this.sup })
      if (this.questionJamaisPosee(i, equation.a, equation.b, equation.c)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
    if (!context.isHtml) {
      this.canEnonce = "Résoudre l'équation " + this.listeQuestions[0] + '.'
      this.correction = this.listeCorrections[0]
      this.canReponseACompleter = ''

      for (const enonce of this.listeQuestions) {
        this.listeCanEnonces.push("Résoudre l'équation " + enonce + '.')
      }
    }
  }
}
