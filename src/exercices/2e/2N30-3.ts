import ExerciceMultiplierFractions from '../4e/4C22'
export const titre = 'Multiplier ou/et diviser des fractions'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '29919'
export const refs = {
  'fr-fr': ['2N30-3', 'BP2AutoH2'],
  'fr-ch': ['NR'],
}
export default class ExerciceMultiplierFractions2nde extends ExerciceMultiplierFractions {
  constructor() {
    super()
    this.sup = '3'
  }
}
