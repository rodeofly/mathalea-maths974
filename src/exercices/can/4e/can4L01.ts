import ExerciceEquationASolutionEntiere from '../../4e/4L20-0'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const titre = 'Résoudre une équation $x+a=b$ ou $ax=b$'
export const uuid = '0641c'
export const refs = {
  'fr-fr': ['can4L01'],
  'fr-ch': ['NR'],
}
export default class UneEquationSimple extends ExerciceEquationASolutionEntiere {
  constructor() {
    super()
    this.nbQuestions = 1
    this.correctionDetaillee = false
    this.sup = false
    this.sup2 = 1
    this.consigne = "Résoudre l'équation :"
  }
}
