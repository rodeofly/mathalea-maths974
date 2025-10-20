import PremierOuPas from './3A10-1'
export const titre = 'Reconnaitre les premiers nombres premiers'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'
export const dateDePublication = '11/10/2023'
export const uuid = '3e436'
export const refs = {
  'fr-fr': ['3A10-0'],
  'fr-ch': ['9NO4-26'],
}
export default class PremierOuPasDebut extends PremierOuPas {
  constructor() {
    super()
    this.besoinFormulaireNumerique = false
    this.besoinFormulaire2CaseACocher = false
    this.besoinFormulaire3CaseACocher = false
    this.sup3 = true
  }
}
