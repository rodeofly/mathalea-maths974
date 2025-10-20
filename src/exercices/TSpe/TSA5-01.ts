import InequationsLog from './TSA5-00'

export const titre = "Résolution d'inéquations du type $a^x \\leq b$ avec ln"
export const dateDePublication = '4/5/2024'
export const dateDeModifImportante = '18/07/2024'
export const uuid = 'e7929'
export const interactifReady = true
export const interactifType = 'mathLive'
export const refs = {
  'fr-fr': ['TSA5-01'],
  'fr-ch': [],
}

/**
 *
 * @author clone de TSpeAN1-0 de Claire Rousset réalisé par Jean-Claude Lhote

 */
export default class InequationsLn extends InequationsLog {
  constructor() {
    super()
    this.consigne =
      "Résoudre dans $\\R$ les inéquations suivantes. Les solutions devront être écrites sous la forme d'un intervalle."
    this.nbQuestions = 5
    this.spacingCorr = 3
    this.sup = '4'
    this.besoinFormulaireTexte = [
      'Type de question ',
      'Nombres séparés par des tirets  :\n : Borne rationnelle\n2 : Borne entière\n3 : Borne irrationnelle\n4 : Mélange',
    ]
    this.comment =
      "Exercice de résolution d'inéquation avec le logarithme népérien"
  }
}
