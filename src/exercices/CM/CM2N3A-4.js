import AdditionsSoustractionsMultiplicationsPosees from '../6e/6N2A-1'
export const titre =
  'Poser additions, soustractions et multiplications de nombres entiers'

export const dateDeModifImportante = '15/02/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpen'
/**
 *Clone de 6C10 pour les CM1-CM2
 *
 * @author Jean-Claude Lhote
 */
export const uuid = 'fa836'

export const refs = {
  'fr-fr': ['CM2N3A-4'],
  'fr-2016': ['c3C10'],
  'fr-ch': [],
}
export default class OperationsPosees extends AdditionsSoustractionsMultiplicationsPosees {
  constructor() {
    super()
    this.nbQuestions = 3
  }
}
