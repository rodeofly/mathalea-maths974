import Exercice2F106 from '../2e/2F10-6'
export const titre = "Déterminer le sens de variation d'une fonction affine"
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export const uuid = '28a36'

export const refs = {
  'fr-fr': ['BP2FONC28'],
  'fr-ch': ['NR'],
}
export default class ExerciceBPFONC28 extends Exercice2F106 {
  constructor() {
    super()
    this.besoinFormulaireNumerique = false
    this.sup = 1
  }
}
