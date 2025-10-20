import ReperageEntiersOuDecimaux from '../6e/6N1G-1'
export const titre = 'Repérer des entiers sur une droite graduée'
export const uuid = '14b84'
export const refs = {
  'fr-fr': ['CM2N2U-3'],
  'fr-2016': ['c3N11-1'],
  'fr-ch': ['9NO2-7'],
}
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '21/10/2024'
export const dateDeModifImportante = '15/06/2025'
/**
 * Exercice de repérage sur droite graduée
 * @author Jean-Claude Lhote
 */

class ReperageEntierC3 extends ReperageEntiersOuDecimaux {
  constructor() {
    super()
    this.version = 'cm'
    this.nbQuestions = 4
    this.besoinFormulaireTexte = [
      'Niveaux de difficulté ',
      'Nombres séparés par des tirets :\n1 : 10 graduations secondaires\n2 : 2 graduations secondaires\n3 : 5 graduations secondaires\n4 : Pas secondaire plus compliqué\n5 : Mélange',
    ]
    this.sup3 = false
  }
}
export default ReperageEntierC3
