import TablesDeMultiplications from './_Tables_de_multiplications'

export const titre = 'Réviser les tables de multiplication'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '27/08/2024'
/**
 * Tables de multiplication classiques, à trou ou un mélange des deux.
 *
 * Par défaut ce sont les tables de 2 à 9 mais on peut choisir les tables que l'on veut
 * @author Rémi Angot (ES6 : Loïc Geeraerts)
 */
export const uuid = '0e6bd'

export const refs = {
  'fr-fr': ['auto6N3D-1'],
  'fr-2016': ['6C10-1'],
  'fr-ch': ['9NO3-8'],
}
export default class TablesParametres extends TablesDeMultiplications {
  constructor() {
    super()
    this.sup = '2-3-4-5-6-7-8-9-10'
  }
}
