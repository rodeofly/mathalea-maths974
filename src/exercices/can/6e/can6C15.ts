import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { pgcd } from '../../../lib/outils/primalite'
import { context } from '../../../modules/context'
import FractionEtendue from '../../../modules/FractionEtendue'
import { randint } from '../../../modules/outils'

import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Trouver la fraction (définition)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 */
export const uuid = '84b48'

export const refs = {
  'fr-fr': ['can6C15', '6N3C-flash1'],
  'fr-ch': [],
}
export default class FractionCommeFacteurManquant extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.optionsDeComparaison = { fractionEgale: true }
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
  }

  nouvelleVersion() {
    let a, b
    do {
      a = randint(2, 25)
      b = randint(2, 25, a)
    } while (pgcd(a, b) !== 1)
    const c = new FractionEtendue(a, b)
    this.reponse = c
    this.question = `Quel est le nombre qui, multiplié par $${b}$, donne $${a}$ ?`
    this.correction = `Le nombre qui, multiplié par $a$, donne $b$ est le nombre $\\dfrac{b}{a}$.<br>
    Ainsi, le nombre qui,  multiplié par $${b}$ donne $${a}$ est $${miseEnEvidence(c.texFraction)}$.<br>
    On a bien : $ ${b} \\times${c.texFraction}= ${a}$`

    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: this.question,
        options: { multicols: true },
        propositions: [
          {
            type: 'AMCNum',
            propositions: [
              {
                texte: this.correction,
                statut: '',
                reponse: {
                  texte: 'Numérateur',
                  valeur: a,
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: false,
                    approx: 0,
                  },
                },
              },
            ],
          },
          {
            type: 'AMCNum',
            propositions: [
              {
                texte: '',
                statut: '',
                reponse: {
                  texte: 'Dénominateur',
                  valeur: b,
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: false,
                    approx: 0,
                  },
                },
              },
            ],
          },
        ],
      }
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
