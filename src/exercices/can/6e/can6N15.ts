import { choice } from '../../../lib/outils/arrayOutils'
import { randint } from '../../../modules/outils'
import EcrirePetitsNombresEntiers from '../../6e/6N0A-6'
export const titre = 'Lire et écrire des nombres'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '14/08/2022'
/**
 * Écrire en chiffres un nombre donné en lettres
 * variante Can de 6N10
 * Par Jean-Claude Lhote
 */

export const uuid = '41030'

export const refs = {
  'fr-fr': ['can6N15', '6N1C-flash1'],
  'fr-ch': ['NR'],
}
export default class EcrirePetitsNombresEntiersCan extends EcrirePetitsNombresEntiers {
  constructor() {
    super()

    this.nbQuestions = 1 // on en fait un exo qui n'aura qu'une question
    this.nbQuestionsModifiable = false // on fait disparaitre le paramètre nombre de questions
    this.sup = choice([4, 5, 6]) // on calibre l'exo comme on veut.
    this.sup3 = 2
    this.sup2 = randint(0, 3)
    this.besoinFormulaireTexte = false // pour ne pas qu'il y ait de paramètrage possible.
    this.besoinFormulaire2Texte = false // afin de conserver les paramètres fixés ci-dessus et choisis par le programmeur
    this.besoinFormulaire3Numerique = false
    this.besoinFormulaire4CaseACocher = false
  }
}
