import FabriqueAYohaku from '../6e/_Yohaku'
export const titre = 'Résoudre un Yohaku multiplicatif fractions niveau 1'
export const dateDePublication = '10/08/2022'
export const dateDeModifImportante = '16/12/2023'

export const interactifReady = true
export const interactifType = 'custom'
export const amcReady = true
export const amcType = 'AMCOpen'

export const uuid = 'ee808'

export const refs = {
  'fr-fr': ['4C22-3', 'BP2AutoH15'],
  'fr-ch': ['10NO5-8'],
}
/**
 * @author Jean-Claude Lhote
 * @constructor
 */
export default class FabriqueAYohaku4CF2 extends FabriqueAYohaku {
  constructor() {
    super()
    this.sup = 10
    this.sup2 = 2
    this.sup3 = 2
    this.sup4 = false
    this.type = 'fractions positives dénominateurs premiers'
    this.besoinFormulaireNumerique = false
    this.besoinFormulaire2Numerique = false
    this.besoinFormulaire3Numerique = false
    this.besoinFormulaire4CaseACocher = [
      "Avec aide (la présence d'une valeur impose une solution unique)",
      false,
    ]
  }
}
