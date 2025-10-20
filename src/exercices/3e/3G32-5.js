import problemesTrigoLongueur from '../3e/3G32-0'
export const titre = 'Triangle rectangle inscrit dans un triangle rectangle'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDeModifImportante = '10/10/2025'

/**
 * @author Guillaume Valmont
 */
export const uuid = '8ba77'

export const refs = {
  'fr-fr': ['3G32-5'],
  'fr-ch': ['1mT-11'],
}
export default class CalculHauteurMontagne extends problemesTrigoLongueur {
  constructor() {
    super()
    this.sup2 = 6
    this.nbQuestions = 1
    this.besoinFormulaireCaseACocher = false
  }
}
