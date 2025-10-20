import { choice, shuffle } from '../../lib/outils/arrayOutils'
import Exercice from '../Exercice'
import { listeQuestionsToContenu } from '../../modules/outils'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import FractionEtendue from '../../modules/FractionEtendue'
import { range1, rangeMinMax } from '../../lib/outils/nombres'

export const titre =
  'Connaître, de façon automatique, les liens entre 1/4, 1/2 et 3/4'
export const dateDePublication = '10/07/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'e32d0'
export const refs = {
  'fr-fr': ['auto6N3B'],
  'fr-2016': ['6N22-4'],
  'fr-ch': [],
}

/** Connaître, de façon automatique, les liens entre 1/4, 1/2 et 3/4
 * @author Eric Elter
 */

export default class ConnaitreQuart extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 5

    this.besoinFormulaireNumerique = [
      'Valeurs à trouver',
      3,
      '1 : Somme ou différence\n2 : Un des deux termes\n3 : Peu importe',
    ]
    this.sup = 3
  }

  nouvelleVersion() {
    const unDemi = new FractionEtendue(1, 2).texFraction
    const unQuart = new FractionEtendue(1, 4).texFraction
    const troisQuarts = new FractionEtendue(3, 4).texFraction
    const un = new FractionEtendue(1, 1).texFraction
    this.consigne = `Compléter avec $${unQuart}$, $${troisQuarts}$, $${unDemi}$ ou $${un}$.`

    const typeQuestions =
      this.sup === 1
        ? shuffle(range1(8))
        : this.sup === 2
          ? shuffle(rangeMinMax(9, 22))
          : shuffle(range1(22))

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      let reponse = ''
      let texteAvant
      let texteApres
      switch (typeQuestions[i]) {
        case 1:
          texteCorr = choice([true, false])
            ? `$${unQuart}+${unDemi}=`
            : `$${unDemi}+${unQuart}=`
          reponse = troisQuarts
          break

        case 2:
          texteCorr = choice([true, false])
            ? `$${unQuart}+${troisQuarts}=`
            : `$${troisQuarts}+${unQuart}=`
          reponse = un
          break

        case 3:
          texteCorr = `$${unDemi}+${unDemi}=`
          reponse = un
          break

        case 4:
          texteCorr = `$${unQuart}+${unQuart}=`
          reponse = unDemi
          break

        case 5:
          texteCorr = `$${un}-${unQuart}=`
          reponse = troisQuarts
          break

        case 6:
          texteCorr = `$${troisQuarts}-${unQuart}=`
          reponse = unDemi
          break

        case 7:
          texteCorr = `$${unDemi}-${unQuart}=`
          reponse = unQuart
          break

        case 8:
          texteCorr = `$${troisQuarts}-${unDemi}=`
          reponse = unQuart
          break

        case 9:
          if (choice([true, false])) {
            texteAvant = `$${unQuart}+`
            texteApres = `=${troisQuarts}$`
          } else {
            texteAvant = '$'
            texteApres = `+${unQuart}=${troisQuarts}$`
          }
          reponse = unDemi
          break

        case 10:
          if (choice([true, false])) {
            texteAvant = `$${unDemi}+`
            texteApres = `=${troisQuarts}$`
          } else {
            texteAvant = '$'
            texteApres = `+${unDemi}=${troisQuarts}$`
          }
          reponse = unQuart
          break

        case 11:
          if (choice([true, false])) {
            texteAvant = `$${unQuart}+`
            texteApres = `=${un}$`
          } else {
            texteAvant = '$'
            texteApres = `+${unQuart}=${un}$`
          }
          reponse = troisQuarts
          break

        case 12:
          if (choice([true, false])) {
            texteAvant = `$${unQuart}+`
            texteApres = `=${un}$`
          } else {
            texteAvant = '$'
            texteApres = `+${unQuart}=${un}$`
          }
          reponse = troisQuarts
          break

        case 13:
          if (choice([true, false])) {
            texteAvant = `$${unQuart}+`
            texteApres = `=${unDemi}$`
          } else {
            texteAvant = '$'
            texteApres = `+${unQuart}=${unDemi}$`
          }
          reponse = unQuart
          break

        case 14:
          if (choice([true, false])) {
            texteAvant = `$${unDemi}+`
            texteApres = `=${un}$`
          } else {
            texteAvant = '$'
            texteApres = `+${unDemi}=${un}$`
          }
          reponse = unDemi
          break

        case 15:
          texteAvant = `$${un}-`
          texteApres = `=${troisQuarts}$`
          reponse = unQuart
          break

        case 16:
          texteAvant = '$'
          texteApres = `-${unQuart}=${troisQuarts}$`
          reponse = un
          break

        case 17:
          texteAvant = `$${troisQuarts}-`
          texteApres = `=${unDemi}$`
          reponse = unQuart
          break

        case 18:
          texteAvant = '$'
          texteApres = `-${unQuart}=${unDemi}$`
          reponse = troisQuarts
          break

        case 19:
          texteAvant = `$${unDemi}-`
          texteApres = `=${unQuart}$`
          reponse = unQuart
          break

        case 20:
          texteAvant = '$'
          texteApres = `-${unQuart}=${unQuart}$`
          reponse = unDemi
          break

        case 21:
          texteAvant = `$${troisQuarts}-`
          texteApres = `=${unQuart}$`
          reponse = unDemi
          break

        case 22:
        default:
          texteAvant = '$'
          texteApres = `-${unDemi}=${unQuart}$`
          reponse = troisQuarts
          break
      }
      if (typeQuestions[i] < 9) {
        texte =
          texteCorr +
          (this.interactif
            ? '$' +
              ajouteChampTexteMathLive(
                this,
                i,
                KeyboardType.clavierDeBaseAvecFraction,
              )
            : '\\ldots$')
        texteCorr += `${miseEnEvidence(reponse)}$`
      } else {
        texte = this.interactif
          ? ajouteChampTexteMathLive(
              this,
              i,
              KeyboardType.clavierDeBaseAvecFraction,
              { texteAvant: texteAvant + '$', texteApres: '$' + texteApres },
            )
          : texteAvant + '\\ldots' + texteApres
        texteCorr = texteAvant + miseEnEvidence(reponse) + texteApres
      }

      if (this.questionJamaisPosee(i, typeQuestions[i + 1])) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        handleAnswers(this, i, {
          reponse: { value: reponse, options: { fractionIdentique: true } },
        })

        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
