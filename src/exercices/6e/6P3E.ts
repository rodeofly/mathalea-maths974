import EchellesProblemes from '../5e/5P13'

export const titre = "Utiliser ou trouver l'échelle d'un plan"

export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

// Gestion de la date de publication initiale
export const dateDePublication = '19/04/2024'
/**
 * Clone de 5P13 pour les 6èmes
 *
 * @author Eric Elter
 */
export const uuid = '9c78f'

export const refs = {
  'fr-fr': ['BP2AutoM2', '6P3E'],
  'fr-2016': ['6P12-1', 'BP2AutoM2'],
  'fr-ch': [],
}
export default class EchellesProblemes6eme extends EchellesProblemes {
  constructor() {
    super()
    this.sup = '2-3'
    this.sup2 = true
  }
}
