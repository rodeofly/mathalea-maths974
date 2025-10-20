import ExerciceConversionsAires from '../6e/_Exercice_conversions_aires'
export const titre = 'Convertir des aires'
export const amcReady = true
export const amcType = 'qcmMono'
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
export const dateDeModifImportante = '30/04/2023'
/**
 * @author Rémi Angot
 *
 */
export const uuid = '6225c'

export const refs = {
  'fr-fr': ['5M13', '3AutoG06-3'],
  'fr-2016': ['6M23'],
  'fr-ch': ['9GM2-2'],
}
export default class Reglages6M23 extends ExerciceConversionsAires {
  constructor() {
    super()
    this.interactif = false
    this.sup = 3
  }
}
