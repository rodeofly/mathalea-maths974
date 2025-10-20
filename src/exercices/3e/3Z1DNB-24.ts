import Exercice from '../Exercice'
import type ExerciceQcmA from '../ExerciceQcmA'
import Question1 from '../QCMBrevet/A2025/MJ25E3Q1'
import Question2 from '../QCMBrevet/A2025/MJ25E3Q2'
import Question3 from '../QCMBrevet/A2025/MJ25E3Q3'
import Question4 from '../QCMBrevet/A2025/MJ25E3Q4'
import Question5 from '../QCMBrevet/A2025/MJ25E3Q5'
import Question6 from '../QCMBrevet/A2025/MJ25E3Q6'
export const uuid = '47a56'
export const refs = {
  'fr-fr': ['3Z1DNB-24'],
  'fr-ch': [],
}
export const interactifReady = false
export const titre = 'Métropole Juin 2025 - Exercice 3'
export const dateDePublication = '27/08/2025'
/**
 * @author Jean-Claude Lhote
 */
export default class MetropoleJ25Exo3 extends Exercice {
  questions: ExerciceQcmA[] = []
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = ['Version originale', true]
    this.nbQuestions = 6
    this.sup = true
    this.questions = [
      new Question1(),
      new Question2(),
      new Question3(),
      new Question4(),
      new Question5(),
      new Question6(),
    ]
  }

  nouvelleVersion() {
    for (const q of this.questions) {
      q.sup = this.sup
      q.interactif = this.interactif
      q.nouvelleVersion()
      this.listeQuestions.push(q.listeQuestions[0])
      this.listeCorrections.push(q.listeCorrections[0])
      this.autoCorrection.push(q.autoCorrection[0])
    }
  }
}
