import Exercice4S12 from '../4e/4S12'

export const titre = "Déterminer la moyenne d'une série de températures"
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '12/4/2025'

export const uuid = 'a5300'
export const refs = {
  'fr-fr': ['BP2AutoD2'],
  'fr-ch': [],
}

export default class ExerciceMoyenneTemperatures extends Exercice4S12 {
  onlyMoyenne = true
}
