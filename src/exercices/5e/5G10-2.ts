import ConstruireParSymetrie from '../6e/_Construire_par_symetrie'

export const titre =
  "Construire le symétrique d'un triangle par rapport à une droite"
export const interactifReady = false
export const amcReady = true
export const amcType = 'AMCOpen'
export const dateDeModifImportante = '14/11/2021'
/**
 * @author Jean-Claude Lhote
 */
export const uuid = '8ea24'

export const refs = {
  'fr-fr': ['5G10-2'],
  'fr-ch': ['9ES6-4'],
}
export default class SymetrieAxialeFigure5e extends ConstruireParSymetrie {
  constructor() {
    super()
    this.figure = true
    this.sup = 4
    this.besoinFormulaireNumerique = [
      'Type de questions',
      4,
      '1 : Axe horizontal ou vertical\n2 : Axe oblique à 45°\n3 : Axe avec une légère pente\n4 : Mélange',
    ]
  }
}
