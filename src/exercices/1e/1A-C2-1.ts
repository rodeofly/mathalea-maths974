import NombreInverse from '../can/2e/can2C15'
export const titre = 'Calculer un nombre connaissant son inverse'
export const dateDePublication = '04/08/2025'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Clone de can2C15 pour les auto 1er
 * @author Gilles Mora
 */

export const uuid = 'efc17'

export const refs = {
  'fr-fr': ['1A-C2-1'],
  'fr-ch': [],
}
export default class Auto1AC2a extends NombreInverse {
  constructor() {
    super()
    this.versionQcm = true
  }
}
