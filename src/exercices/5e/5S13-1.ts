import calculEffectifFrequence from '../3e/3S12'
export const titre = 'Calculer des effectifs et des fréquences'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const uuid = '7d429'
export const refs = {
  'fr-fr': ['5S13-1'],
  'fr-ch': ['11NO2-3'],
}
export default class CalculEffectifFrequence5e extends calculEffectifFrequence {
  constructor() {
    super()
    this.sup = 1
  }
}
