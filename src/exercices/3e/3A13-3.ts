import VocabulaireDivisionEuclidienne from '../6e/6N2J-4'
export const titre =
  "Trouver le vocabulaire associé aux termes de l'égalité issue de la division euclidienne"
export const amcReady = true
export const amcType = 'qcmMult'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '14/09/2022'

/**
 * Détermination du vocabulaire associé à l'égalité issue de la division euclidienne
 * Ref 3A13-3
 *
 * @author Eric Elter
 */

export const uuid = 'd9cf3'

export const refs = {
  'fr-fr': ['3A13-3'],
  'fr-ch': [],
}
export default class VocabulaireDivisionEuclidienne3e extends VocabulaireDivisionEuclidienne {
  constructor() {
    super()
    this.sup4 = 1
  }
}
