import ProblemesAdditifsFractionsBis from '../4e/4C25-0'
export const titre =
  'Résoudre des problèmes additifs et de comparaison sur les fractions'
export const dateDePublication = '21/05/2025'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Résoudre des problèmes additifs et de comparaison sur les fractions
 * @author Eric Elter
 * Créé par Eric Elter après changements effectués dans 4C25-0
 */

export const uuid = 'a3914'

export const refs = {
  'fr-fr': ['5N22-1'],
  'fr-ch': ['9NO15-6', '10NO5-15'],
}
export default class ProblemesAdditifsFractions5eBis extends ProblemesAdditifsFractionsBis {
  constructor() {
    super()
    this.nbQuestions = 2
    this.sup = '1-2'
    this.sup2 = true
  }
}
