import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import FractionEtendue from '../../../modules/FractionEtendue'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre =
  'Connaître les relations entre unités consécutives de longueurs'
export const dateDePublication = '28/07/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true

/**
 * @author Eric Elter

 */
export const uuid = '10697'

export const refs = {
  'fr-fr': ['can6M20', 'auto6M12-flash1'],
  'fr-ch': ['NR'],
}
export default class ConversionUnitesMetriquesConsecutives extends ExerciceSimple {
  constructor() {
    super()
    this.nbQuestions = 1

    this.typeExercice = 'simple'
  }

  nouvelleVersion() {
    const pairesMetriques: string[][] = [
      ['km', 'hm'],
      ['hm', 'dam'],
      ['dam', 'm'],
      ['m', 'dm'],
      ['dm', 'cm'],
      ['cm', 'mm'],
    ]
    const choixPlusGdVerPlusPetit = choice([true, false])
    const choixPaires = randint(0, 5)
    const unite1 = pairesMetriques[choixPaires][choixPlusGdVerPlusPetit ? 0 : 1]
    const unite2 = pairesMetriques[choixPaires][choixPlusGdVerPlusPetit ? 1 : 0]

    this.question = `$1$ ${unite1} = ${this.interactif ? '' : `$\\ldots$ ${unite2}`}`

    this.reponse = choixPlusGdVerPlusPetit
      ? 10
      : new FractionEtendue(1, 10).texFraction
    this.correction = `$1$ ${unite1} $= ${miseEnEvidence(this.reponse)}$ ${unite2}`
    if (!choixPlusGdVerPlusPetit)
      this.correction += `$= ${miseEnEvidence(texNombre(0.1))}$ ${unite2}`
    this.canEnonce = 'Compléter.'
    this.canReponseACompleter = `$1$ ${unite1} = $\\ldots$ ${unite2}`

    this.optionsChampTexte = { texteApres: unite2 }
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    this.optionsDeComparaison = {
      nombreDecimalSeulement: true,
      fractionEgale: true,
    }
  }
}
