import DeterminerDerniereOperationExpressionLitterale from '../5e/5L14-4'
export const titre =
  'Déterminer si ces expressions sont des sommes, des différences, des produits ou des quotients'
export const interactifReady = false
export const dateDePublication = '14/08/2021'
export const uuid = '68cda'
export const refs = {
  'fr-fr': ['4L16'],
  'fr-ch': ['11FA3-1'],
}
export default class DeterminerStructureExpressionLitterale extends DeterminerDerniereOperationExpressionLitterale {
  constructor() {
    super()
    this.consigne =
      'Déterminer si ces expressions sont des sommes, des différences, des produits ou des quotients.'
  }
}
