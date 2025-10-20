import Decimal from 'decimal.js'
import { format } from 'mathjs'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import {
  ajouteChampTexteMathLive,
  remplisLesBlancs,
} from '../../lib/interactif/questionMathLive'
import { choice } from '../../lib/outils/arrayOutils'
import { texNombre } from '../../lib/outils/texNombre'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = "Donner l'écriture décimale ou une fraction décimale"
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '28/09/22'

/**
 * On donne une fraction qui a pour dénominateur 10, 100 ou 1 000, il faut donner l'écriture décimale.
 * ou réciproquement
 * Le numérateur est de la forme X, XX, X0X, X00X ou XXX
 * @author Mickael Guironnet
 */

export const refs = {
  'fr-fr': ['6N1F-1', 'BP2AutoC4'],
  'fr-2016': ['6N23-8', 'BP2AutoC4'],
  'fr-ch': ['9NO10-10'],
}
export const uuid = '708a9'
export default class ExerciceEcritureDecimaleOuFractionDecimale extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Type de questions',
      [
        'Nombres séparés par des tirets  :',
        '1 : Ecriture décimale -> fraction décimale',
        '2 : Fraction décimale -> écriture décimale',
        '3 : Mélange',
      ].join('\n'),
    ]
    this.besoinFormulaire2CaseACocher = ['Dénominateur déjà saisi']
    this.besoinFormulaire3CaseACocher = ['Avec des zéros inutiles']

    this.consigne = "Donner l'écriture décimale ou la fraction décimale."
    this.spacing = 2
    this.spacingCorr = 2
    this.nbQuestions = 8
    this.nbCols = 2
    this.nbColsCorr = 2
    this.sup = '1-2' // Type de question
    this.sup2 = true
    this.sup3 = true
  }

  nouvelleVersion() {
    const listeTypeDeQuestions = gestionnaireFormulaireTexte({
      max: 2,
      defaut: 3,
      melange: 3,
      nbQuestions: this.nbQuestions,
      saisie: this.sup,
    })

    const consi = [false, false]
    for (
      let i = 0, a, b, n, typesDeQuestions, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]
      a = choice([
        randint(2, 9),
        randint(11, 99),
        randint(1, 9) * 100 + randint(1, 9),
        randint(1, 9) * 1000 + randint(1, 9),
        randint(1, 9) * 100 + randint(1, 9) * 10,
      ])
      // X, XX, X0X, X00X, XX0
      b = [10, 100, 1000, 10, 100][i % 5]
      const aDecimal = new Decimal(a)
      const bDecimal = new Decimal(b)
      n = aDecimal.div(bDecimal).toNumber()

      switch (typesDeQuestions) {
        case 2: // fraction décimale -> écriture décimale
          consi[1] = true
          handleAnswers(this, i, { reponse: { value: texNombre(n, 3) } })
          texte =
            `$${texFraction(texNombre(a), texNombre(b))}  ${!this.interactif ? '=\\ldots\\ldots\\ldots\\ldots' : '='} $` +
            ajouteChampTexteMathLive(this, i, '')
          texteCorr =
            '$ ' +
            texFraction(String(a), String(b)) +
            ' = ' +
            texNombre(n, 3) +
            ' $'
          // @ts-expect-error
          this.autoCorrection[i].reponse.param.digits = 5
          // @ts-expect-error
          this.autoCorrection[i].reponse.param.decimals = 3
          break
        case 1:
        default: {
          // / écriture décimale -> fraction décimale
          consi[0] = true
          const nombre = format(n, {
            notation: 'auto',
            lowerExp: -12,
            upperExp: 12,
            precision: 12,
          }).replace('.', ',')
          const rangVirgule = nombre.indexOf(',')
          let nbdigits = 0
          if (rangVirgule !== -1) {
            nbdigits = nombre.length - rangVirgule - 1
          }
          let precision = nbdigits
          if (nbdigits === 2 && b === 100) {
            precision = 3
          } else if (nbdigits === 1 && b === 10) {
            precision = randint(2, 3)
          }
          handleAnswers(this, i, {
            bareme: (listePoints) => [listePoints[0], 1],
            champ1: { value: String(a) },
          })

          if (this.interactif) {
            texte = this.sup2
              ? remplisLesBlancs(
                  this,
                  i,
                  `${texNombre(n, precision, this.sup3)} = \\dfrac{%{champ1}}{${texNombre(b)}}`,
                  'fillInTheBlanks',
                )
              : ajouteChampTexteMathLive(this, i, ' ', {
                  texteAvant: `$${texNombre(n, precision, this.sup3)} = $`,
                })

            if (!this.sup2) {
              handleAnswers(this, i, {
                reponse: { value: n, options: { fractionDecimale: true } },
              })
            }
          } else {
            texte = this.sup2
              ? `$${texNombre(n, precision, this.sup3)} = ${texFraction('\\ldots\\ldots\\ldots\\ldots', texNombre(b))} $`
              : `$${texNombre(n, precision, this.sup3)} = ${texFraction('\\ldots\\ldots\\ldots\\ldots', '\\ldots\\ldots\\ldots\\ldots')} $`
          }
          texteCorr =
            '$ ' +
            texNombre(n) +
            ' = ' +
            texFraction(texNombre(a), texNombre(b)) +
            ' $'
          // @ts-expect-error
          this.autoCorrection[i].reponse.param.digits = 6
          // @ts-expect-error
          this.autoCorrection[i].reponse.param.decimals = 0
          break
        }
      }
      if (this.questionJamaisPosee(i, a, b)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    if (consi[0] === true && consi[1] === true) {
      this.consigne = "Donner l'écriture décimale ou une fraction décimale"
    } else if (consi[0] === false && consi[1] === true) {
      this.consigne = "Donner l'écriture décimale"
    } else {
      this.consigne = 'Donner une fraction décimale'
    }
    this.consigne +=
      this.nbQuestions > 1 ? ' de ces nombres.' : ' de ce nombre.'
    listeQuestionsToContenu(this)
  }
}
const texFraction = (a: string | number, b: string | number) =>
  `\\dfrac{${a}}{${b}}`
