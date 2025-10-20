import Exercice4L20 from '../4e/4L20'

export const titre = 'Résoudre une équation du premier degré'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '13/4/2025'

export const uuid = 'bf662'
export const refs = {
  'fr-fr': ['BP2AutoK1'],
  'fr-ch': [],
}

export default class ExerciceEquations extends Exercice4L20 {
  constructor() {
    super()
    this.nbQuestions = 4
    this.besoinFormulaire2Texte = false
    this.sup2 = '3-4'
  }
}
