import MesurePrincipal from '../../1e/1AN42'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Simplifier les sinus et cosinus des angles associés'
export const dateDePublication = '01/06/2022'
export const uuid = '21c03'
export const refs = {
  'fr-fr': ['can1G03'],
  'fr-ch': ['2mTrigo-2'],
}
export default class AnglesAssociesCAN extends MesurePrincipal {
  constructor() {
    super()
    this.nbQuestions = 1
    this.can = true
  }
}
