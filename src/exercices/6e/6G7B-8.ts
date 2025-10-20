import SerieDeTransformations from '../4e/4G12'
export const titre = 'Trouver les symétries axiales successives dans un damier'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpen'
export const dateDePublication = '4/12/2021'

/**
 * @author Jean-Claude Lhote
 * Créé le 4/12/2021

 */
export const uuid = 'd7da5'

export const refs = {
  'fr-fr': ['6G7B-8'],
  'fr-2016': ['6G26'],
  'fr-ch': [],
}
export default class SerieDeTransformations6e extends SerieDeTransformations {
  version: number
  constructor() {
    super()
    this.version = 1
    this.nbQuestions = 1
    this.besoinFormulaireNumerique = false
  }
}
