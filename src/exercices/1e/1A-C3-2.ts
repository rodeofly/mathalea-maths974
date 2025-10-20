import CalculPuissancesOperation from '../can/2e/can2C13'
export const titre = 'Calculer avec  des puissances (2)'
export const dateDePublication = '22/07/2025'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Clone de can2C13 pour les auto 1er
 * @author Gilles Mora
 */

export const uuid = '71eba'

export const refs = {
  'fr-fr': ['1A-C3-2'],
  'fr-ch': [],
}
export default class Auto1AC3b extends CalculPuissancesOperation {
  constructor() {
    super()
    this.versionQcm = true
  }
}
