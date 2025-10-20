import MultiplierDecimauxPar101001000 from '../6e/6C30-1'
export const titre =
  'Multiplier un nombre entier (ou décimal) par 10, 100 ou 1 000'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '12/12/2021'
export const dateDeModifImportante = '11/02/2025'

/**
 * @author Eric Elter et Rémi Angot
 * Date décembre 2021
 */
export const uuid = 'f92e1'

export const refs = {
  'fr-fr': ['CM2N3G-1'],
  'fr-2016': ['c3C10-3'],
  'fr-ch': ['9NO8-2'],
}
export default class MultiplierDecimauxPar101001000CM extends MultiplierDecimauxPar101001000 {
  constructor() {
    super()
    this.sup = '1' // Par défaut, pas de fractions
    this.sup3 = false // Peu importe ici, car pas de décimaux par défaut
  }
}
