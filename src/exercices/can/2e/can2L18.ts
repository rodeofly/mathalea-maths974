import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import FactoriserIdentitesRemarquables2 from '../../2e/2N52-2'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Résoudre des équations avec un carré'
export const dateDePublication = '22/02/2025'
/**
 * @author Gilles Mora
 *

 */
export const uuid = 'f1286'

export const refs = {
  'fr-fr': ['can2L18'],
  'fr-ch': [],
}
export default class FactoriserIdentitesRemarquables2CAN extends FactoriserIdentitesRemarquables2 {
  constructor() {
    super()
    this.formatChampTexte = KeyboardType.clavierEnsemble
    this.nbQuestions = 1
    this.can = true
    this.sup = '1 - 2 - 3 - 4'
    //   this.correctionDetaillee = true
  }
}
