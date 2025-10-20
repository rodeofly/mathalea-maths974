import { choice } from '../../lib/outils/arrayOutils'
import Transformations from '../6e/_Transformations'
export const titre =
  "Trouver l'image d'un point par une symétrie axiale ou centrale"
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDeModifImportante = '31/03/2025'

/**
 * Transformations : trouvers un point numéroté par une des transformations du plan. Fonction générale utilisée sur tous les niveaux
 * @author Jean-Claude Lhote
 */
export const uuid = 'ec32b'

export const refs = {
  'fr-fr': ['5G11'],
  'fr-ch': ['9ES6-7'],
}
export default class Transformations5e extends Transformations {
  constructor() {
    super()
    this.sup = choice(['1-3-7', '1-4-7', '2-3-7', '2-4-7'])
  }
}
