import EqResolvantesThales from '../3e/3L13-2'

export const titre = 'Fractions égales et égalité des produits en croix 4e'
export const amcReady = true
export const amcType = 'qcmMono'
export const interactifType = 'qcm'
export const interactifReady = true
export const dateDePublication = '24/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const uuid = '7f2be'
export const refs = {
  'fr-fr': ['4C20-2'],
  'fr-ch': [],
}
export default class EqResolvantesThales4e extends EqResolvantesThales {
  constructor() {
    super()
    this.niveau = '4e'
  }
}
