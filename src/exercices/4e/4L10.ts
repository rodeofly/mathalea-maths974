import ExerciceDevelopper from '../3e/3L11'
export const interactifType = 'mathLive'
export const interactifReady = true
export const amcReady = true
export const amcType = 'AMCHybride'
export const uuid = '71dd8'
export const refs = {
  'fr-fr': ['4L10'],
  'fr-ch': [],
}
export const titre = 'Utiliser la simple distributivité'
export default class ExerciceDevelopper4e extends ExerciceDevelopper {
  constructor() {
    super()
    this.sup = 3 // difficulté
    this.sup2 = 1 // consigne
    this.sup3 = 7 // forme de développement
  }
}
