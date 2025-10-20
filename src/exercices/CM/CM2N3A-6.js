import DernierChiffre from '../6e/6N0A-6'
export const titre = "Trouver le dernier chiffre d'un calcul"
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'
export const uuid = 'e2a48'
export const refs = {
  'fr-fr': ['CM2N3A-6'],
  'fr-2016': ['c3C12'],
  'fr-ch': [],
}
export default class DernierChiffreC3 extends DernierChiffre {
  constructor() {
    super()
    this.nbQuestions = 4
    this.version = 2
    this.besoinFormulaireNumerique = false
  }
}
