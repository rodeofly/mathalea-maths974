import DenombrerCubes from '../../6e/6G8A-1'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'
export const amcReady = true
export const titre = 'Compter les cubes manquants'

/**
 * @author Jean-Claude Lhote
 */
export const uuid = '5571c'

export const refs = {
  'fr-fr': ['can6G03', '6G8A-flash2'],
  'fr-ch': [],
}
export default class CompterLesCubes extends DenombrerCubes {
  constructor() {
    super()
    this.nbQuestions = 1
    this.sup2 = 1
    this.sup = 2
  }
}
