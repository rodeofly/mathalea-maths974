import EncadrerFractionEntre2Entiers from '../6e/6N3I-1'
export const titre = 'Encadrer une fraction entre deux nombres entiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
/**
 * Clone de 6N20-1 pour les 2nde
 *
 * @author Jean-Claude Lhote
 */
export const dateDeModifImportante = '14/05/2023' // ajout d'un paramètre pour choisir les dénominateurs
export const uuid = 'd309b'

export const refs = {
  'fr-fr': ['2N12-1'],
  'fr-ch': ['9NO11-9'],
}
export default class EncadrerFractionEntre2Entiers2nde extends EncadrerFractionEntre2Entiers {
  constructor() {
    super()
    this.lycee = true
    this.sup = false
    this.sup2 = '10'
    this.besoinFormulaire2Texte = [
      'Dénominateurs à choisir',
      'Nombres séparés par des tirets :\nDe 2 à 9 pour les dénominateurs correspondants\n10 Mélange',
    ]
  }
}
