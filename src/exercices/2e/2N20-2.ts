import TableauCriteresDeDivisibilite from '../5e/5A11-4'
export const titre =
  'Utiliser les critères de divisibilité (plusieurs possibles)'
export const interactifReady = true
export const interactifType = 'qcm'
export const dateDeModifImportante = '29/10/2021'
export const uuid = 'd5a6d'
export const refs = {
  'fr-fr': ['2N20-2'],
  'fr-ch': ['1mCN-1'],
}
export default class TableauCritereDeDivisibilite2nde extends TableauCriteresDeDivisibilite {
  constructor() {
    super()
    this.sup = true
    this.besoinFormulaireCaseACocher = false
  }
}
