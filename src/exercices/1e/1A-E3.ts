import PoucentageE2 from '../can/5e/can5P10'
export const titre = 'Calculer une évolution en pourcentage'
export const dateDePublication = '22/07/2025'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Clone de can5P01 pour les auto 1er
 * @author Gilles Mora
 */

export const uuid = 'c9efa'

export const refs = {
  'fr-fr': ['1A-E3'],
  'fr-ch': [],
}
export default class Auto1AE3 extends PoucentageE2 {
  constructor() {
    super()
    this.versionQcm = true
  }
}
