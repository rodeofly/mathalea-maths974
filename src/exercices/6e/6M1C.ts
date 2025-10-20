import PerimetreAireDisques from '../5e/5M11-3'

export const titre = 'Calculer périmètre de disques'
export const dateDePublication = '27/07/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Calculer périmètre de disques
 * @author Eric Elter (comme clone de 6M22-1 de Rémi Angot)
 */

export const uuid = 'f2a18'

export const refs = {
  'fr-fr': ['6M1C'],
  'fr-2016': ['6M22-1a'],
  'fr-ch': [],
}
export default class PerimetreDisques extends PerimetreAireDisques {
  constructor() {
    super()
    this.besoinFormulaireNumerique = false
    this.sup = 1
  }
}
