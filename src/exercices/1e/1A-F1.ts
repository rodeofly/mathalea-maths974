import CalculImageSecondDegre from '../can/2e/can2F01'
export const titre = 'Calculer une image avec le second degré (1)'
export const dateDePublication = '23/07/2025'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Clone de can2F01 pour les auto 1er
 * @author Gilles Mora
 */

export const uuid = 'fdba8'

export const refs = {
  'fr-fr': ['1A-F1'],
  'fr-ch': [],
}
export default class Auto1AF1 extends CalculImageSecondDegre {
  constructor() {
    super()
    this.versionQcm = true
  }
}
