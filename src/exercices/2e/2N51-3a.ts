import EqResolvantesThales from '../3e/3L13-2'
export const titre =
  'Résoudre une équation du type $\\dfrac{x}{a}=\\dfrac{b}{c}$'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const uuid = '7959f'
export const refs = {
  'fr-fr': ['2N51-3a', 'BP2RES27'],
  'fr-ch': [],
}
export default class EqResolvantesThales2nde extends EqResolvantesThales {
  constructor() {
    super()
    this.exo = '4L15-1'
    this.sup = 1
  }
}
