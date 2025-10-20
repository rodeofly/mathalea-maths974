import ImageFonctionsRefs from '../../2e/2F11-1'
export const titre =
  'Déterminer l’image d’un nombre par une fonction de référence'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '18/01/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const uuid = '1afde'
export const refs = {
  'fr-fr': ['can2F13'],
  'fr-ch': ['11FA9-12'],
}
export default class CANImageFonctionsRefs extends ImageFonctionsRefs {
  constructor() {
    super()
    this.can = true
    this.nbQuestions = 1
  }
}
