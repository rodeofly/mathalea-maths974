import PolynesieJuin12Exo1Q1 from '../QCMBrevet/A2013/PJ13E1Q1'

export const titre = 'Calculs avec les puissances de 10 (QCM)'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '12/4/2025'

export const uuid = 'd6d5d'
export const refs = {
  'fr-fr': ['BP2AutoE4'],
  'fr-ch': [],
}

export default class ExercicePuissancesDe10QCM extends PolynesieJuin12Exo1Q1 {
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = false
    this.besoinFormulaire4CaseACocher = false
    this.sup = false
    this.sup4 = false
  }
}
