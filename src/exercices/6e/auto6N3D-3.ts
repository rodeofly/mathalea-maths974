import ExoRose from './_Roses'
export const titre = 'Résoudre une Rose multiplicative'
export const interactifReady = true
export const interactifType = 'custom'
export const amcReady = true
export const amcType = 'AMCOpen'
export const dateDePublication = '12/08/2022'
export const dateDeModifImportante = '26/09/2023'
/**
 * Travailler les tables de multiplication autrement
 * @author Jean-Claude Lhote
 */

export const uuid = '57502'

export const refs = {
  'fr-fr': ['auto6N3D-3'],
  'fr-2016': ['6C10-6'],
  'fr-ch': ['9NO3-11'],
}
export default class RoseMultiplicative extends ExoRose {
  // c'est l'ExoRose zéro contenu dans _Roses.js
  constructor() {
    super()
    this.operation = 'multiplication'
    this.typeDonnees = 'entiers'
    this.besoinFormulaire2Numerique = ['Nombre de facteurs (entre 3 et 9)', 9]
  }
}
