import EcrireUneExpressionNumerique from '../5e/_Ecrire_une_expression_numerique'
export const titre = 'Traduire une expression par une phrase'
export const amcReady = true
export const amcType = 'AMCOpen'
export const interactifReady = true
export const interactifType = 'listeDeroulante'
export const dateDePublication = '08/10/2023'

/**
 * @author Eric Elter
 */

export const uuid = 'e6f62'

export const refs = {
  'fr-fr': ['6N0B-3'],
  'fr-2016': ['6C13-2'],
  'fr-ch': ['9NO4-19'],
}
export default class TraduireUneExpressionParUnePhrase6eme extends EcrireUneExpressionNumerique {
  constructor() {
    super()
    this.version = 2
    this.nbQuestions = 4
    this.sup4 = '1'
    this.besoinFormulaire4Texte = false
  }
}
