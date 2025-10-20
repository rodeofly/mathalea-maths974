import ConvertirDuree from '../ch/10GM3-10'
export const titre = 'Convertir des durées en heures décimales ou en minutes'
export const dateDePublication = '24/09/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '8013d'
export const refs = {
  'fr-fr': ['6M4C-4'],
  'fr-ch': [],
}
/**
 * Exercice de conversion de durées
 * @author Eric Elter
 */
export default class ConvertirDuree6eV2 extends ConvertirDuree {
  // ConvertirDuree6eV1 et ConvertirDuree6eV2 diffère à cause du nb différent de questions dans l'interactif
  constructor() {
    super()
    this.version = '6M4C-4'
    this.besoinFormulaireNumerique = [
      'Type de conversions',
      6,
      '1 : heures décimales vers heures-minutes-secondes\n2 : minutes décimales vers heures-minutes-secondes\n3 : Mélange',
    ]

    this.sup2 = true
    this.sup3 = false
  }
}
