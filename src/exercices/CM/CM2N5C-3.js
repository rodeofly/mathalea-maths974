import ProblemeCourse from '../6e/6N5-9'
export const titre = 'Résoudre des problèmes : Les courses'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const uuid = 'b74c6'
export const refs = {
  'fr-fr': ['CM2N5C-3'],
  'fr-2016': ['c3C31'],
  'fr-ch': [],
}
export default class ProblemeCourseC3 extends ProblemeCourse {
  constructor() {
    super()
    this.nbQuestions = 1
    this.sup = true
  }
}
