import { context } from '../../modules/context'
import FonctionsProbabilite2 from '../2e/2S30-5'
export const interactifReady = true
export const titre =
  'Calculer des probabilités dans une expérience aléatoire à deux épreuves'
export const dateDeModifImportante = '20/06/2024'

/**
 * Calculs de probabilités sur une expérience aléatoire à deux épreuves
 * @author Jean-Claude Lhote
 */
export const uuid = '04f53'
export const refs = {
  'fr-fr': [], // Déréférencé car hors programme. Voir 3Z1DNB-19 pour un exercice sur ce thème.
  'fr-ch': ['11NO2-13'],
}

export default class FonctionsProbabilite extends FonctionsProbabilite2 {
  constructor() {
    super()
    this.comment =
      'La correction de cet exercice ne correspond pas au programme de 3e actuel.'
    this.besoinFormulaireTexte = [
      'Type de questions : ',
      'Nombres séparés par des tirets :\n1 : Yaourts\n2 : Cartes\n3 : Chaussettes\n4 : Dé\n5 : Mélange',
    ]
    this.nbQuestions = 2

    context.isHtml ? (this.spacing = 2) : (this.spacing = 2)
    context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2)
    this.sup = 1
  }
}
