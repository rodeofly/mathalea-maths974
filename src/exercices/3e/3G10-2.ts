import { choice } from '../../lib/outils/arrayOutils'
import Transformations from '../6e/_Transformations'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const titre =
  "Trouver l'image d'un point par une homothétie ou une rotation"
export const dateDeModifImportante = '15/01/2023' //  Par EE

/**
 * Transformations : trouver un point numéroté par une homothétie ou une rotation
 * @author Jean-Claude Lhote

 */

export const uuid = 'd5f34'

export const refs = {
  'fr-fr': ['3G10-2'],
  'fr-ch': ['11ES3-2'],
}
export default class Transformations3e extends Transformations {
  constructor() {
    super()
    this.sup = choice(['5-6-9', '5-6-10', '5-9-10', '6-9-10'])
  }
}
