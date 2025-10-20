import TrouverLaTransformation from '../4e/4G12-1'
export const titre = 'Identifier une transformation'
export const interactifReady = true
export const interactifType = 'listeDeroulante'
export const dateDePublication = '4/12/2021'
export const dateDeModifImportante = '16/12/2024'
export const uuid = '2d343'
export const refs = {
  'fr-fr': ['5G12-3'],
  'fr-ch': ['10GM2-4'],
}
export default class TrouverLaTransformation5e extends TrouverLaTransformation {
  constructor() {
    super()
    this.sup = 1
    this.nbQuestions = 1
    this.besoinFormulaireNumerique = []
  }
}
