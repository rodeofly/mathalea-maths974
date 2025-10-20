import CalculDeVolumes from '../5e/5M20-1'
export const titre = 'Calculer des volumes'
export const amcReady = true
export const amcType = 'AMCHybride'
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
export const dateDeModifImportante = '17/04/2025'
export const uuid = '65bed'

export const refs = {
  'fr-fr': ['2G11-5', 'BP2G23'],
  'fr-ch': [],
}
export default class CalculDeVolumes2nde extends CalculDeVolumes {
  constructor() {
    super()
    this.sup = 1
    this.sup4 = 8
    this.classe = 3
    this.besoinFormulaire4Texte = [
      'Type de solides',
      'Nombres séparés par des tirets :\n1  : Cubes\n2 : Pavés droits\n3 : Cylindres\n4 : Prismes droits\n5 : Cônes\n6 : Pyramides à base carrée\n7 : Pyramides à base triangulaire rectangle\n8 : Pyramides à base triangulaire quelconque\n9 : Boules\n10 : Mélange',
    ]
  }
}
