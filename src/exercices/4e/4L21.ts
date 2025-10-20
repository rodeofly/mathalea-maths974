import CalculerLaValeurDUneExpressionLitterale from '../5e/5L14'
export const titre =
  "Calculer la valeur d'une expression littérale de degré 1 à 1 inconnue"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '72765'
export const refs = {
  'fr-fr': ['4L21'],
  'fr-ch': ['NR'],
}
export const dateDePublication = '24/05/2025'

/**
 * @author Jean-Claude Lhote (implémentation des nombres relatifs dans 5L14)
 */
export default class CalculerLaValeurDUneExpressionLitteraleDeg1Inc1 extends CalculerLaValeurDUneExpressionLitterale {
  constructor() {
    super()
    this.version = '4L21'
    this.nbQuestions = 2
  }
}
