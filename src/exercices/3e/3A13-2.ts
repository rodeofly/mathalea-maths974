import DivisionsEuclidiennesEgalite from '../6e/6N2J-1'
export const titre =
  "Déterminer reste et quotient d'une division euclidienne à partir d'une égalité"
export const amcReady = true
export const amcType = 'AMCHybride'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '14/09/2022'

/**
 * Détermination du reste et quotient à partir de l'égalité découlant de la division euclidienne
 * Ref 3A13-2
 *
 * @author Eric Elter
 */

export const uuid = 'd8bf2'

export const refs = {
  'fr-fr': ['3A13-2'],
  'fr-ch': [],
}
export default class DivisionsEuclidiennesEgalite3e extends DivisionsEuclidiennesEgalite {
  constructor() {
    super()
    this.nbQuestions = 3
    this.sup = 1
  }
}
