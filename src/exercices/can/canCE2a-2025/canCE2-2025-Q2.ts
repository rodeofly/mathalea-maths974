import Can2025N5Q1 from '../can5a-2025/can5a-2025-Q1'

export const titre = 'Tables de multiplication'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '5160f'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025NCE2Q2 extends Can2025N5Q1 {
  nouvelleVersion() {
    this.canOfficielle ? this.enonce(5, 7) : this.enonce()
  }
}
