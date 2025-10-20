import SolutionInequation from '../can/2e/can2L05'
export const titre = 'Résoudre une inéquation'
export const dateDePublication = '23/07/2025'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Clone de can2L05 pour les auto 1er
 * @author Gilles Mora
 */

export const uuid = 'f0230'

export const refs = {
  'fr-fr': ['1A-C12'],
  'fr-ch': [],
}
export default class Auto1AC12 extends SolutionInequation {
  constructor() {
    super()
    this.versionQcm = true
  }
}
