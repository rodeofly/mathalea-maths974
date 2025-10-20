import {
  choice,
  combinaisonListes,
  enleveElement,
  shuffle,
} from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import {
  compareFractions,
  texFractionFromString,
} from '../../lib/outils/deprecatedFractions'
import Exercice from '../Exercice'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import FractionEtendue from '../../modules/FractionEtendue'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { remplisLesBlancs } from '../../lib/interactif/questionMathLive'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { bleuMathalea } from '../../lib/colors'

export const titre =
  'Comparer quatre fractions (dénominateurs multiples) et un nombre entier'
export const dateDeModifImportante = '20/05/2025'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * 4 fractions aux dénominateurs multiples et un nombre entier sont donnés, il faut les classer dans l'ordre croissant.
 * Pour la correction, les fractions sont toutes écrites avec un dénominateur commun avant d'être classées
 * @author Rémi Angot
 * Ajout du paramètre d'inclusion de nombres négatifs le 14/08/2021 : Guillaume Valmont
 * Rendu interactif le 20/05/2025 par Eric Elter
 */
export const uuid = 'ce9ca'

export const refs = {
  'fr-fr': ['5N14-2', 'BP2AutoG7'],
  'fr-ch': ['9NO12-6'],
}
export default class ExerciceComparerQuatreFractions extends Exercice {
  constructor() {
    super()

    this.consigne = "Ranger les nombres suivants dans l'ordre croissant."
    this.spacing = 2
    context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2.5)
    this.nbQuestions = 2

    this.sup = false

    this.besoinFormulaireCaseACocher = ['Inclure des nombres négatifs']
  }

  nouvelleVersion() {
    const listeSignes = combinaisonListes([-1, 1], this.nbQuestions * 4)
    for (
      let i = 0,
        denominateurs,
        n1,
        d1,
        n2,
        d2,
        n3,
        d3,
        n4,
        d4,
        k,
        positifOuNegatif = [],
        texte = '',
        texteCorr;
      i < this.nbQuestions;
      i++
    ) {
      if (this.sup === true) {
        positifOuNegatif[0] = listeSignes[4 * i]
        positifOuNegatif[1] = listeSignes[4 * i + 1]
        positifOuNegatif[2] = listeSignes[4 * i + 2]
        positifOuNegatif[3] = listeSignes[4 * i + 3]
      } else {
        positifOuNegatif[0] = 1
        positifOuNegatif[1] = 1
        positifOuNegatif[2] = 1
        positifOuNegatif[3] = 1
      }
      const listeDenominateurs = [
        [12, 2, 3, 4, 6],
        [16, 2, 4, 8],
        [18, 2, 3, 6, 9],
        [20, 2, 4, 5, 10],
        [24, 2, 3, 4, 8, 12],
        [30, 2, 3, 5, 6],
      ]
      denominateurs = choice(listeDenominateurs)
      d1 = denominateurs[0]
      enleveElement(denominateurs, d1)
      d2 = choice(denominateurs)
      enleveElement(denominateurs, d2)
      d3 = choice(denominateurs)
      d4 = choice(denominateurs)
      k = randint(1, 3)
      n1 = randint(1, 10)
      n2 = randint(1, 10)
      n3 = randint(1, 10)
      n4 = choice([d4 + randint(1, 3), d4 * 2 + randint(1, 2), randint(1, 10)])
      // [num,den,calcul de mise au même dénominateur, num qui correspond au denominateur commun]
      while (
        (n1 / d1 - n2 / d2) *
          (n1 / d1 - n3 / d3) *
          (n1 / d1 - n4 / d4) *
          (n2 / d2 - n3 / d3) *
          (n2 / d3 - n4 / d4) *
          (n3 / d3 - n4 / d4) <
          0.1 ||
        n1 % d1 === 0 ||
        n2 % d2 === 0 ||
        n3 % d3 === 0 ||
        n4 % d4 === 0
      ) {
        n1 = randint(1, 11)
        n2 = randint(1, 11)
        n3 = randint(1, 11)
        n4 = randint(1, 11)
      }
      n1 *= positifOuNegatif[0]
      n2 *= positifOuNegatif[1]
      n3 *= positifOuNegatif[2]
      n4 *= positifOuNegatif[3]
      const tableauFractions: [number, number, string, string][] = [
        [
          n1,
          d1,
          `$${new FractionEtendue(n1, d1).texFSD}$`,
          `$${new FractionEtendue(n1, d1).texFSD}$`,
        ],
      ]
      tableauFractions.push([
        n2,
        d2,
        `$${new FractionEtendue(n2, d2).texFSD} = ${texFractionFromString(n2 + miseEnEvidence('\\times ' + d1 / d2, bleuMathalea), d2 + miseEnEvidence('\\times ' + d1 / d2, bleuMathalea))}=${new FractionEtendue((n2 * d1) / d2, d1).texFSD}$`,
        `$${new FractionEtendue((n2 * d1) / d2, d1).texFSD}$`,
      ])
      tableauFractions.push([
        n3,
        d3,
        `$${new FractionEtendue(n3, d3).texFSD} = ${texFractionFromString(n3 + miseEnEvidence('\\times ' + d1 / d3, bleuMathalea), d3 + miseEnEvidence('\\times ' + d1 / d3, bleuMathalea))}=${new FractionEtendue((n3 * d1) / d3, d1).texFSD}$`,
        `$${new FractionEtendue((n3 * d1) / d3, d1).texFSD}$`,
      ])
      tableauFractions.push([
        n4,
        d4,
        `$${new FractionEtendue(n4, d4).texFSD} = ${texFractionFromString(n4 + miseEnEvidence('\\times ' + d1 / d4, bleuMathalea), d4 + miseEnEvidence('\\times ' + d1 / d4, bleuMathalea))}=${new FractionEtendue((n4 * d1) / d4, d1).texFSD}$`,
        `$${new FractionEtendue((n4 * d1) / d4, d1).texFSD}$`,
      ])
      tableauFractions.push([
        k,
        1,
        `$${k} = ${new FractionEtendue(d1 * k, d1).texFSD}$`,
        `$${new FractionEtendue(k * d1, d1).texFSD}$`,
      ])
      tableauFractions.sort(compareFractions)
      const tableauFractionsEnonce = shuffle(tableauFractions)
      texte = ''
      for (let j = 0; j < tableauFractionsEnonce.length; j++) {
        if (tableauFractionsEnonce[j][1] === 1) {
          texte += `$${tableauFractionsEnonce[j][0]}\\quad\\text{;}\\quad$`
        } else {
          texte += `$${new FractionEtendue(tableauFractionsEnonce[j][0], tableauFractionsEnonce[j][1]).texFSD}\\quad\\text{;}\\quad$`
        }
      }
      texte = texte.substring(0, texte.length - 19) + '$' // Enlève les 21 derniers caractères (pour le ; de la fin)
      tableauFractions.sort(compareFractions)

      if (this.interactif) {
        texte +=
          '<br>' +
          remplisLesBlancs(
            this,
            i,
            '%{champ1}~<~%{champ2}~<~%{champ3}~<~%{champ4}~<~%{champ5}',
            ` ${KeyboardType.clavierDeBaseAvecFraction}`,
          )
      }

      handleAnswers(this, i, {
        bareme: (listePoints) => [
          listePoints[0] +
            listePoints[1] +
            listePoints[2] +
            listePoints[3] +
            listePoints[4],
          5,
        ],
        champ1: {
          value: new FractionEtendue(
            tableauFractions[0][0],
            tableauFractions[0][1],
          ).texFSD,
          options: { fractionIdentique: true },
        },
        champ2: {
          value: new FractionEtendue(
            tableauFractions[1][0],
            tableauFractions[1][1],
          ).texFSD,
          options: { fractionIdentique: true },
        },
        champ3: {
          value: new FractionEtendue(
            tableauFractions[2][0],
            tableauFractions[2][1],
          ).texFSD,
          options: { fractionIdentique: true },
        },
        champ4: {
          value: new FractionEtendue(
            tableauFractions[3][0],
            tableauFractions[3][1],
          ).texFSD,
          options: { fractionIdentique: true },
        },
        champ5: {
          value: new FractionEtendue(
            tableauFractions[4][0],
            tableauFractions[4][1],
          ).texFSD,
          options: { fractionIdentique: true },
        },
      })

      texteCorr = `Pour comparer facilement ces fractions, mettons-les toutes sur le même dénominateur (ici, ce sera ${Math.max(d1, d2, d3, d4)} ).<br>`
      for (let j = 0; j < tableauFractionsEnonce.length; j++) {
        texteCorr += tableauFractionsEnonce[j][2]
        texteCorr += '<br>'
      }
      for (let j = 0; j < tableauFractions.length; j++) {
        texteCorr += tableauFractions[j][3]
        if (j < tableauFractions.length - 1) {
          texteCorr += '$\\quad<\\quad$'
        }
      }
      texteCorr += '<br>'
      let texteConclusion = ''
      for (let j = 0; j < tableauFractions.length; j++) {
        if (tableauFractions[j][1] === 1) {
          texteConclusion += `$${miseEnEvidence(tableauFractions[j][0])}\\quad<\\quad$`
        } else {
          texteConclusion += `$${miseEnEvidence(new FractionEtendue(tableauFractions[j][0], tableauFractions[j][1]).texFSD)}\\quad<\\quad$`
        }
      }
      texteCorr +=
        'Finalement : $\\quad$ ' +
        texteConclusion.substring(0, texteConclusion.length - 12) +
        '$'
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
}
