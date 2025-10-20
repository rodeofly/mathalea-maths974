import Transformations from '../../6e/_Transformations'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const titre = 'Trouver l’image d’un point par une  transformation 3e'

/**
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021

 */
export const uuid = '8e651'

export const refs = {
  'fr-fr': ['can3G02'],
  'fr-ch': [],
}
export default class ImageD1Point extends Transformations {
  constructor() {
    super()
    this.can = true
    this.sup = 4
  }
}
