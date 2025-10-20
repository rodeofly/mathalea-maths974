import FabriqueAYohaku from '../6e/_Yohaku'
export const titre =
  'Résoudre un Yohaku multiplicatif expressions littérales niveau 1'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpen'

export const dateDePublication = '10/08/2022'
export const dateDeModifImportante = '16/12/2023'

export const uuid = '1f9b4'

export const refs = {
  'fr-fr': ['3L11-8'],
  'fr-ch': ['11FA2-14'],
}
/**
 * @author Jean-Claude Lhote
 * @constructor
 */
export default class FabriqueAYohaku3L1 extends FabriqueAYohaku {
  constructor() {
    super()
    this.sup = 10
    this.sup2 = 2
    this.sup3 = 2
    this.sup4 = false
    this.type = 'littéraux'
    this.besoinFormulaireNumerique = false
    this.besoinFormulaire2Numerique = false
    this.besoinFormulaire3Numerique = false
    this.besoinFormulaire4CaseACocher = [
      "Avec aide (la présence d'une valeur impose une solution unique)",
      false,
    ]
  }
}
