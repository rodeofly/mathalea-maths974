import CalculPartieAvecTout from '../can/5e/can5P11'
export const titre = 'Déterminer un pourcentage de proportion'
export const dateDePublication = '22/07/2025'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Clone de can5P11 pour les auto 1er
 * @author Gilles Mora
 */

export const uuid = '458eb'

export const refs = {
  'fr-fr': ['1A-R4'],
  'fr-ch': [],
}
export default class Auto1AR4 extends CalculPartieAvecTout {
  constructor() {
    super()
    this.versionQcm = true
  }
}
