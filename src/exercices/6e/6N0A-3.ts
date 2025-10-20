import FabriqueAYohaku from './_Yohaku'
export const titre = 'Résoudre un Yohaku additif niveau 1'
export const dateDePublication = '10/08/2022'
export const interactifReady = true
export const interactifType = 'custom'
export const amcReady = true
export const amcType = 'AMCOpen'
export const dateDeModifImportante = '16/12/2023'

export const uuid = '26bb9'

export const refs = {
  'fr-fr': ['6N0A-3'],
  'fr-2016': ['6C10-7a'],
  'fr-ch': ['9NO3-12'],
}
/**
 * @author Jean-Claude Lhote
 * @constructor
 */
export default class FabriqueAYohaku6A extends FabriqueAYohaku {
  constructor() {
    super()
    this.sup = 10
    this.sup2 = 1
    this.sup3 = 2
    this.sup4 = false
    this.type = 'entiers'
    this.besoinFormulaireNumerique = false
    this.besoinFormulaire2Numerique = false
    this.besoinFormulaire3Numerique = false
    this.besoinFormulaire4CaseACocher = [
      "Avec aide (la présence d'une valeur impose une solution unique)",
      false,
    ]
  }
}
