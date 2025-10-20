import DefinitionUnitesVolumes from '../5e/5M21'

export const titre = "Connaître la définition d'un centimètre cube"
export const interactifReady = true
export const interactifType = 'custom'
export const dateDePublication = '04/08/2025'

/**
 * @author Eric Elter
 */

export const uuid = '9bcab'

export const refs = {
  'fr-fr': ['6M3A'],
  'fr-2016': ['6M32'],
  'fr-ch': [],
}
export default class DefinitionUnitesCm3 extends DefinitionUnitesVolumes {
  constructor() {
    super()
    this.besoinFormulaire2Texte = false
    this.sup2 = '1'
  }
}
