import ExerciceLabyrinthePremiers3e from '../3e/3A10-7'
export const titre = 'Explorer un labyrinthe de nombres premiers'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '12/10/2022'
export const uuid = '50663'
export const refs = {
  'fr-fr': ['4A10-1'],
  'fr-ch': ['NR'],
}
export default class ExerciceLabyrinthePremiers4e extends ExerciceLabyrinthePremiers3e {
  constructor() {
    super()
    this.sup = 2
  }
}
