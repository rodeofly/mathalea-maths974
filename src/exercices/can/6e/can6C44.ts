import { choice } from '../../../lib/outils/arrayOutils'
import Exercice from '../../Exercice'
import FractionEtendue from '../../../modules/FractionEtendue'
import { context } from '../../../modules/context'
import { listeQuestionsToContenu } from '../../../modules/outils'
import { remplisLesBlancs } from '../../../lib/interactif/questionMathLive'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../../lib/interactif/gestionInteractif'
import { miseEnEvidence } from '../../../lib/outils/embellissements'

export const titre = 'Comparer deux fractions*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '04/11/2022'
/**
 * @author Gilles Mora
 */

export const uuid = '16c8e'

export const refs = {
  'fr-fr': ['can6C44'],
  'fr-ch': ['NR'],
}
export default class ComparerFraction extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    this.consigne = 'Compléter avec $>$ ou $<$.'
    const listeFractions1 = [
      [7, 8, 11, 8],
      [5, 8, 7, 8],
      [4, 11, 7, 11],
      [2, 11, 10, 11],
      [8, 15, 13, 15],
      [14, 33, 17, 33],
      [34, 45, 37, 45],
      [18, 35, 19, 35],
      [14, 47, 37, 47],
      [11, 35, 31, 35],
      [12, 25, 16, 25],
      [15, 19, 17, 19],
      [8, 15, 11, 15],
      [14, 27, 17, 27],
      [17, 32, 25, 32],
      [3, 7, 6, 7],
      [16, 35, 21, 35],
      [11, 26, 15, 26],
      [9, 13, 10, 13],
      [21, 40, 27, 40],
      [8, 15, 14, 15],
      [13, 22, 15, 22],
    ]

    const listeFractions2 = [
      [47, 25, 51, 25],
      [9, 8, 11, 8],
      [15, 11, 19, 11],
      [14, 5, 17, 5],
      [9, 7, 15, 7],
      [16, 3, 22, 3],
      [53, 45, 71, 45],
      [49, 45, 52, 45],
      [18, 7, 23, 7],
      [45, 16, 51, 16],
      [19, 3, 25, 3],
      [14, 9, 19, 9],
      [50, 41, 55, 41],
      [53, 46, 59, 46],
      [15, 7, 27, 7],
      [17, 4, 21, 4],
      [19, 4, 25, 4],
      [10, 7, 27, 7],
      [13, 10, 12, 13],
      [27, 12, 35, 12],
      [21, 11, 25, 11],
      [14, 5, 11, 5],
      [7, 3, 11, 3],
    ]

    this.formatInteractif = 'texte'

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      const fraction1 = choice(listeFractions1)
      const fraction2 = choice(listeFractions2)
      const a = choice(
        [new FractionEtendue(fraction1[0], fraction1[1])],
        [new FractionEtendue(fraction1[2], fraction1[3])],
      )
      const b = choice(
        [new FractionEtendue(fraction2[0], fraction2[1])],
        [new FractionEtendue(fraction2[2], fraction2[3])],
      )
      if (choice([true, false])) {
        // <plus petit que 1>
        this.question = 'Compléter avec $>$ ou $<$ : <br>'
        this.question += `$${a.texFraction}$ $\\ldots$ $${b.texFraction}$`
        texte = remplisLesBlancs(
          this,
          i,
          `${a.texFraction}\\quad %{champ1} \\quad ${b.texFraction}`,
          KeyboardType.clavierCompare,
        )
        handleAnswers(this, i, {
          champ1: { value: '<', options: { texteSansCasse: true } },
        })
        this.correction = `$${a.texFraction} <1$ et $${b.texFraction}>1$.<br>
      On en déduit : $${a.texFraction} ${miseEnEvidence('<')} ${b.texFraction}$.`
        this.reponse = '<'
        this.canEnonce = 'Compléter avec $>$ ou $<$.'
        this.canReponseACompleter = `$${a.texFraction}$ $\\ldots$ $${b.texFraction}$`
      } else {
        // >
        this.question = 'Compléter avec $>$ ou $<$ : <br>'
        this.question += `$${b.texFraction}$ $\\ldots$ $${a.texFraction}$`
        texte = remplisLesBlancs(
          this,
          i,
          `${b.texFraction}\\quad %{champ1} \\quad ${a.texFraction}`,
          KeyboardType.clavierCompare,
        )
        handleAnswers(this, i, {
          champ1: { value: '>', options: { texteSansCasse: true } },
        })
        this.correction = `$${b.texFraction} >1$ et $${a.texFraction}<1$.<br>
      On en déduit : $${b.texFraction} ${miseEnEvidence('>')} ${a.texFraction}$.`
        this.reponse = '>'
        this.canEnonce = 'Compléter avec $>$ ou $<$.'
        this.canReponseACompleter = `$${b.texFraction}$ $\\ldots$ $${a.texFraction}$`
      }
      if (this.questionJamaisPosee(i, a.texFraction, b.texFraction)) {
        this.listeCorrections[i] = this.correction
        this.listeCanEnonces[i] = this.canEnonce
        this.listeCanReponsesACompleter[i] = this.canReponseACompleter
        if (context.isHtml) {
          this.listeQuestions[i] = texte
        } else {
          this.listeQuestions[i] = this.canReponseACompleter
        }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
