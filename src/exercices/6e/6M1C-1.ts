import PerimetreAireEtPortionsDeDisques from '../5e/5M11-4'

export const titre = 'Calculer périmètre de portions de disques'
export const dateDePublication = '27/07/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Calculer périmètre de portions de disques
 * @author Eric Elter (comme clone de 6M22-2 de Rémi Angot)
 */

export const uuid = '5db4a'

export const refs = {
  'fr-fr': ['6M1C-1'],
  'fr-2016': ['6M22-2a'],
  'fr-ch': [],
}
export default class PerimetrePortionsDeDisques extends PerimetreAireEtPortionsDeDisques {
  constructor() {
    super()
    this.besoinFormulaireNumerique = false
    this.sup = 1
  }
}
