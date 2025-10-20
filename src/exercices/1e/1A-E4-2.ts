import TauxGlobal from '../can/2e/can2C12'
export const titre = 'Déterminer une évolution globale (3)'
export const dateDePublication = '22/07/2025'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Clone de can5P01 pour les auto 1er
 * @author Gilles Mora
 */

export const uuid = '6edc6'

export const refs = {
  'fr-fr': ['1A-E4-2'],
  'fr-ch': [],
}
export default class Auto1AE4b extends TauxGlobal {
  constructor() {
    super()
    this.versionQcm = true
  }
}
