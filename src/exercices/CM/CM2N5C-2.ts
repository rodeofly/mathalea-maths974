import QuestionsMasses from '../6e/6N5-2'
export const titre = 'Résoudre des problèmes de masses'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

// Gestion de la date de publication initiale
export const dateDePublication = '02/11/2021'

/**
 * @author Eric Elter

 * Date octobre 2021
 */
export const uuid = 'ec3cc'

export const refs = {
  'fr-fr': ['CM2N5C-2'],
  'fr-2016': ['c3C13-1'],
  'fr-ch': ['9FA3-17'],
}
export default class QuestionsMassesCM extends QuestionsMasses {
  constructor() {
    super()
    this.sup = '1-2-3-4-5-6' // Par défaut, pas de divisions
    this.sup3 = false // Par défaut, que des entiers
  }
}
