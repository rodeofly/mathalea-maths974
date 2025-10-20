import ArrondirUneValeur6e from '../6e/6N1K'
export const titre = "Trouver la valeur arrondie d'une racine carrée"
export const dateDePublication = '13/04/2021'
export const amcReady = true
export const amcType = 'qcmMult'
export const interactifReady = true
export const interactifType = 'qcm'
export const uuid = '9c484'
export const refs = {
  'fr-fr': ['4G20-5', 'BP2AutoS3'],
  'fr-ch': ['10NO3-3'],
}
export default class ArrondirUneValeur4eRac extends ArrondirUneValeur6e {
  constructor() {
    super()
    this.version = 3
    this.sup2 = true
    this.besoinFormulaireNumerique = false
  }
}
