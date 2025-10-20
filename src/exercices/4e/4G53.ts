import CalculDeVolumes from '../5e/5M20-1'
export const titre = 'Calculs de volumes'
export const amcReady = true
export const amcType = 'AMCHybride'
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
export const dateDeModifImportante = '17/04/2025'
export const uuid = 'b6cbe'
export const refs = {
  'fr-fr': ['4G53', 'BP2G12'],
  'fr-ch': ['10GM2-2', '11GM2-1'],
}
export default class CalculDeVolumes4e extends CalculDeVolumes {
  constructor() {
    super()
    this.sup = 1
    this.classe = 4
    this.sup4 = 7
    this.besoinFormulaire4Texte = [
      'Type de solides',
      'Nombres séparés par des tirets :\n1  : Cubes\n2 : Pavés droits\n3 : Cylindres\n4 : Prismes droits\n5 : Cônes\n6 : Pyramides à base carrée\n7 : Pyramides à base triangulaire rectangle\n8 : Pyramides à base triangulaire quelconque\n9 : Mélange',
    ]
    this.besoinFormulaireNumerique = [
      'Niveau de difficulté',
      3,
      '1 : Sans conversion\n2 : Avec des conversions\n3 : Sans conversion avec ​π≃3',
    ]
  }
}
