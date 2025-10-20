import Decimal from 'decimal.js'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { sp } from '../../lib/outils/outilString'
import {
  scientifiqueToDecimal,
  stringNombre,
  texNombre,
} from '../../lib/outils/texNombre'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import {
  handleAnswers,
  setReponse,
} from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { miseEnEvidence } from '../../lib/outils/embellissements'

export const titre = 'Associer un nombre décimal à sa notation scientifique'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Écrire un nombre décimal en notation scientifique et inversement
 * @author Jean-Claude Lhote
 */

export const uuid = 'a0d16'

export const refs = {
  'fr-fr': ['4C32', 'BP2AutoF1', '3autoN07-1'],
  'fr-ch': ['10NO2-16'],
}
export default class NotationScientifique extends Exercice {
  can: boolean
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Type de questions',
      2,
      '1 : Traduire en notation scientifique\n2 : Traduire en notation décimale',
    ]
    this.besoinFormulaire2Numerique = [
      'Niveau de difficulté',
      3,
      '1 : Facile\n2 : Moyen\n3 : Difficile',
    ]
    this.sup = 1
    this.sup2 = 1
    this.nbQuestions = 5
    this.interactif = false
    this.can = false
  }

  nouvelleVersion() {
    Decimal.set({ toExpNeg: -15, toExpPos: 20 })
    let reponse
    if (this.sup === 1)
      this.consigne =
        this.nbQuestions === 1
          ? 'Donner la notation scientifique du nombre suivant.'
          : 'Donner la notation scientifique des nombres suivants.'
    else
      this.consigne =
        this.nbQuestions === 1
          ? "Donner l'écriture décimale du nombre suivant."
          : "Donner l'écriture décimale des nombres suivants."
    let typesDeQuestionsDisponibles
    if (this.sup2 === 1) typesDeQuestionsDisponibles = [0, 0, 0, 1, 1]
    else if (this.sup2 === 2) typesDeQuestionsDisponibles = [0, 1, 1, 2, 2]
    else typesDeQuestionsDisponibles = [2, 2, 3, 3, 3]

    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )
    for (
      let i = 0,
        texteAMC,
        texte,
        texteCorr,
        mantisse,
        exp,
        decimalstring,
        scientifiquestring,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 0:
          mantisse = new Decimal(randint(1, 9))
          if (!context.isAmc) {
            exp = randint(1, 5)
          } else {
            exp = randint(1, 3)
          }

          break
        case 1:
          mantisse = new Decimal(randint(11, 99)).div(10)
          if (!context.isAmc) {
            exp = randint(1, 5)
          } else {
            exp = randint(1, 3)
          }
          break
        case 2:
          if (choice([false, true]))
            mantisse = new Decimal(randint(111, 999)).div(100)
          else
            mantisse = new Decimal(randint(1, 9))
              .plus(randint(1, 9) * 100)
              .div(100)
          if (!context.isAmc) {
            exp = randint(1, 7) * choice([-1, 1])
          } else {
            exp = randint(1, 3) * choice([-1, 1])
          }
          break
        case 3:
        default:
          if (choice([true, false]))
            mantisse = new Decimal(randint(1, 19) * 5)
              .plus(randint(1, 9) * 1000)
              .div(1000)
          else mantisse = new Decimal(randint(1111, 9999)).div(1000)
          if (!context.isAmc) {
            exp = randint(1, 7) * choice([-1, 1])
          } else {
            exp = randint(1, 3) * choice([-1, 1])
          }

          break
      }

      scientifiquestring = `${texNombre(mantisse, 8)}\\times 10^{${exp}}`
      decimalstring = scientifiqueToDecimal(mantisse.toNumber(), exp)

      if (this.sup === 1) {
        reponse = `${stringNombre(mantisse, 8)}e${exp}`
        texteAMC = `$${decimalstring}$`
        texteCorr = `$${decimalstring} = ${miseEnEvidence(scientifiquestring)}$`
      } else {
        reponse = mantisse.mul(Decimal.pow(10, exp))
        texteCorr = `$${scientifiquestring} = ${miseEnEvidence(decimalstring)}$`
        texteAMC = `$${scientifiquestring}$`
      }
      texte = texteAMC + `$${sp()}=$`
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(
          this,
          i,
          '  ' +
            (this.sup === 2
              ? KeyboardType.clavierDeBase
              : KeyboardType.clavierFullOperations),
        )
      } else {
        texte += `$${sp()}\\dots$`
      }

      if (this.questionJamaisPosee(i, mantisse, exp)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        if (this.sup === 1) {
          if (context.isAmc) {
            setReponse(
              this,
              i,
              String(reponse)
                .replace(/\\thickspace /g, '')
                .replace(/ /g, ''),
              {
                // formatInteractif: 'ecritureScientifique',
                digits: listeTypeDeQuestions[i] + 1,
                decimals: listeTypeDeQuestions[i],
                signe: false,
                exposantNbChiffres: 1,
                exposantSigne: true,
                approx: 0,
              },
            )
          } else {
            handleAnswers(this, i, {
              reponse: {
                value: reponse,
                options: { ecritureScientifique: true },
              },
            })
          }
        } else {
          if (context.isAmc) {
            setReponse(this, i, reponse, {
              // formatInteractif: 'nombreDecimal',
              decimals: Math.max(0, listeTypeDeQuestions[i] - exp),
            })
          } else {
            handleAnswers(this, i, { reponse: { value: reponse } })
          }
        }

        if (context.isAmc) {
          texteAMC += '.'
          // @ts-expect-error
          this.autoCorrection[i].reponse.valeur = [
            mantisse.mul(Decimal.pow(10, exp)).toString(),
          ]
          if (this.sup === 1) {
            this.amcType = 'AMCNum'
            this.autoCorrection[i].enonce =
              'Donner la notation scientifique du nombre ' + texteAMC
          } else {
            this.amcType = 'qcmMono'
            this.autoCorrection[i].enonce =
              "Donner l'écriture décimale du nombre " + texteAMC
            this.autoCorrection[i].options = {
              ordered: false,
              lastChoice: 5,
            }
            this.autoCorrection[i].propositions = [
              {
                texte: `$${decimalstring}$`,
                statut: true,
              },
              {
                texte: `$${texNombre(mantisse.mul(Decimal.pow(10, exp - 1)), 20)}$`,
                statut: false,
              },
              {
                texte: `$${texNombre(mantisse.mul(Decimal.pow(10, exp + 1)), 20)}$`,
                statut: false,
              },
              {
                texte: `$${texNombre(mantisse.mul(Decimal.pow(10, -exp)), 20)}$`,
                statut: false,
              },
            ]
          }
        }
        i++
      }
      cpt++
    }
    if (this.can) {
      this.listeQuestions[0] = `${this.consigne.substring(0, this.consigne.length - 1)} : ${this.listeQuestions[0]}`
      this.consigne = ''
    }
    listeQuestionsToContenu(this)
  }
}
