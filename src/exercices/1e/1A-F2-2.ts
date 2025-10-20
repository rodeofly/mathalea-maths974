import ImageFctAff from '../can/2e/can2F20'
export const titre =
  'Déterminer une image par une fonction affine (non définie explicitement)'
export const dateDePublication = '06/08/2025'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Clone de can2F20 pour les auto 1er
 * @author Gilles Mora
 */

export const uuid = 'ab46f'

export const refs = {
  'fr-fr': ['1A-F2-2'],
  'fr-ch': [],
}
export default class Auto1AF2b extends ImageFctAff {
  constructor() {
    super()
    this.versionQcm = true
  }
}
