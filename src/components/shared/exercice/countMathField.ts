import type Exercice from '../../../exercices/Exercice'

export function countMathField(exercise: Exercice): number {
  if (exercise == null) return 0
  let numbOfAnswerFields: number = 0
  if (exercise.interactif) {
    if (!exercise.autoCorrection || !Array.isArray(exercise.autoCorrection)) {
      return 0
    }
    for (const autoCorr of exercise.autoCorrection) {
      if (
        autoCorr != null &&
        autoCorr.reponse != null &&
        autoCorr.reponse.param != null &&
        autoCorr.reponse.param.formatInteractif != null
      ) {
        if (
          autoCorr.reponse?.param?.formatInteractif === 'mathlive' ||
          autoCorr.reponse?.param?.formatInteractif === 'qcm'
        ) {
          numbOfAnswerFields++
        }
      }
    }
    if (
      exercise.interactifType === 'custom' &&
      'goodAnswers' in exercise &&
      Array.isArray(exercise.goodAnswers)
    ) {
      for (const goodAnswer of exercise.goodAnswers) {
        if (Array.isArray(goodAnswer)) {
          numbOfAnswerFields += goodAnswer.length
        } else {
          numbOfAnswerFields++
        }
      }
    }
    return numbOfAnswerFields
  }
  return 0
}
