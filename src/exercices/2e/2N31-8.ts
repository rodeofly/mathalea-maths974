import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { texNombre } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ecritureParentheseSiNegatif } from '../../lib/outils/ecritures'
import { arrondi } from '../../lib/outils/nombres'
export const titre = 'Lier calcul avec des puissances de 10 et les préfixes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDeModifImportante = '09/09/2023'
export const dateDePublication = '05/02/2021'

/**
 * Utiliser les puissances de 10 et les préfixes kilo, Méga, Giga, Téra
 * @author Rémi Angot
 */
export const uuid = 'fedae'

export const refs = {
  'fr-fr': ['2N31-8'],
  'fr-ch': [],
}
export default class ConversionsPuissancesDe10 extends Exercice {
  constructor() {
    super()

    this.consigne = 'Compléter :'
    this.nbQuestions = 5
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX

    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = !context.isHtml
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = [
      'm>km',
      'u>M',
      'u>G',
      'g>t',
      'M>G',
      'M>T',
      'G>T',
      'm>mm',
      'm>um',
      'm>nm',
    ] // On créé 3 types de questions
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    ) // Tous les types de questions sont posés mais l'ordre diffère à chaque `cycle`
    const listeDeSens = combinaisonListes(['div', 'fois'], this.nbQuestions)
    let exposantReponse

    let correctionDetail
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const a = choice(
        [
          arrondi(randint(1, 9) + randint(1, 9) / 10),
          arrondi(randint(11, 99) + randint(1, 9) / 10 + randint(1, 9) / 100),
          arrondi(randint(11, 999) + randint(1, 9) / 10),
        ],
        arrondi(randint(10000, 99999) / 100),
      )
      let texte = ''
      let texteCorr = ''
      let n = 0
      let unite: string[]
      let uniteOrdre: string[] = []
      switch (
        listeTypeDeQuestions[i] // Suivant le type de question, le contenu sera différent
      ) {
        case 'm>km':
          n = randint(6, 12)
          uniteOrdre =
            listeDeSens[i] === 'div'
              ? ['\\text{m}', '\\text{km}']
              : ['\\text{km}', '\\text{m}']
          exposantReponse = listeDeSens[i] === 'div' ? n - 3 : n + 3
          correctionDetail = [
            `Il faut $${texNombre(1000)}$ m pour 1 km, on va donc diviser par $${texNombre(1000)}$, c'est-à-dire multiplier par $10^{-3}$.<br>`,
            `$1~\\text{km}=${texNombre(1000)}~\\text{km}$, on va donc multiplier par $${texNombre(1000)}$, c'est-à-dire multiplier par $10^{3}$.<br>`,
          ]
          break
        case 'u>M':
          n = randint(11, 20)
          unite = choice([
            ['W', 'watts', 'watt'],
            ['Wh', 'watts-heure', 'watt-heure'],
          ])
          uniteOrdre =
            listeDeSens[i] === 'div'
              ? [`\\text{${unite[0]}}`, `\\text{M${unite[0]}}`]
              : [`\\text{M${unite[0]}}`, `\\text{${unite[0]}}`]
          exposantReponse = listeDeSens[i] === 'div' ? n - 6 : n + 6
          correctionDetail = [
            `Il faut 1 million de ${unite[1]} pour 1 M${unite[0]}, on va donc diviser par 1 million, c'est-à-dire multiplier par $10^{-6}$.<br>`,
            `1 M${unite[0]}, c'est 1 million de ${unite[1]}, on va donc multiplier par 1 million, c'est-à-dire multiplier par $10^{6}$.<br>`,
          ]
          break
        case 'u>G':
          n = listeDeSens[i] === 'div' ? randint(13, 20) : randint(4, 10)
          unite = choice([
            ['W', 'watts', 'watt'],
            ['Wh', 'watts-heure', 'watt-heure'],
          ])
          uniteOrdre =
            listeDeSens[i] === 'div'
              ? [`\\text{${unite[0]}}`, `\\text{G${unite[0]}}`]
              : [`\\text{G${unite[0]}}`, `\\text{${unite[0]}}`]
          exposantReponse = listeDeSens[i] === 'div' ? n - 9 : n + 9
          correctionDetail = [
            `Il faut 1 milliard de ${unite[1]} pour 1 G${unite[0]}, on va donc diviser par 1 milliard, c'est-à-dire multiplier par $10^{-9}$.<br>`,
            `1 G${unite[0]}, c'est 1 milliard de ${unite[1]}, on va donc multiplier par 1 milliard, c'est-à-dire multiplier par $10^{9}$.<br>`,
          ]
          break
        case 'g>t':
          n = listeDeSens[i] === 'div' ? randint(13, 20) : randint(4, 10)
          uniteOrdre =
            listeDeSens[i] === 'div'
              ? ['\\text{g}', '\\text{t}']
              : ['\\text{t}', '\\text{g}']
          exposantReponse = listeDeSens[i] === 'div' ? n - 6 : n + 6
          correctionDetail = [
            "Il faut 1 million de grammes pour 1 tonne, on va donc diviser par 1 million, c'est-à-dire multiplier par $10^{-6}$.<br>",
            "1 tonne c'est 1 million de grammes, on va donc multiplier par 1 million, c'est-à-dire multiplier par $10^{6}$.<br>",
          ]
          break
        case 'M>G':
          n = listeDeSens[i] === 'div' ? randint(8, 12) : randint(4, 10)
          unite = choice([
            ['W', 'watts', 'watt'],
            ['Wh', 'watts-heure', 'watt-heure'],
          ])
          uniteOrdre =
            listeDeSens[i] === 'div'
              ? [`\\text{M${unite[0]}}`, `\\text{G${unite[0]}}`]
              : [`\\text{G${unite[0]}}`, `\\text{M${unite[0]}}`]
          exposantReponse = listeDeSens[i] === 'div' ? n - 3 : n + 3
          correctionDetail = [
            `Il faut $${texNombre(1000)}$ millions de ${unite[1]} pour faire 1 milliard de ${unite[1]}, on va donc diviser par $${texNombre(1000)}$, c'est-à-dire multiplier par $10^{-3}$.<br>`,
            `1 milliard de ${unite[1]}, c'est $${texNombre(1000)}$ millions de ${unite[1]}, on va donc multiplier par $${texNombre(1000)}$, c'est-à-dire multiplier par $10^{3}$.<br>`,
          ]
          break
        case 'M>T':
          n = listeDeSens[i] === 'div' ? randint(9, 15) : randint(4, 10)
          unite = choice([
            ['W', 'watts', 'watt'],
            ['Wh', 'watts-heure', 'watt-heure'],
          ])
          uniteOrdre =
            listeDeSens[i] === 'div'
              ? [`\\text{M${unite[0]}}`, `\\text{T${unite[0]}}`]
              : [`\\text{T${unite[0]}}`, `\\text{M${unite[0]}}`]
          exposantReponse = listeDeSens[i] === 'div' ? n - 6 : n + 6
          correctionDetail = [
            `Il faut $${texNombre(1000)}$ méga-${unite[1]} pour faire 1 giga-${unite[2]} et $${texNombre(1000)}$ giga-${unite[1]} pour faire 1 téra-${unite[2]}, on va donc diviser par 1 million, c'est-à-dire multiplier par $10^{-6}$.<br>`,
            `1 téra-${unite[1]}, c'est $${texNombre(1000)}$ giga-${unite[1]} donc un million de méga-${unite[1]}, on va donc multiplier par un million, c'est-à-dire multiplier par $10^{6}$.<br>`,
          ]
          break
        case 'G>T':
          n = listeDeSens[i] === 'div' ? randint(8, 12) : randint(4, 10)
          unite = choice([
            ['W', 'watts', 'watt'],
            ['Wh', 'watts-heure', 'watt-heure'],
          ])
          uniteOrdre =
            listeDeSens[i] === 'div'
              ? [`\\text{G${unite[0]}}`, `\\text{T${unite[0]}}`]
              : [`\\text{T${unite[0]}}`, `\\text{G${unite[0]}}`]
          exposantReponse = listeDeSens[i] === 'div' ? n - 3 : n + 3
          correctionDetail = [
            `Il faut $${texNombre(1000)}$ giga-${unite[1]} pour faire 1 téra-${unite[2]}, on va donc diviser par $${texNombre(1000)}$, c'est-à-dire multiplier par $10^{-3}$.<br>`,
            `1 téra-${unite[1]}, c'est $${texNombre(1000)}$ giga-${unite[1]}, on va donc multiplier par $${texNombre(1000)}, c'est-à-dire multiplier par $10^{3}$.<br>`,
          ]
          break
        case 'm>mm':
          n = randint(6, 12)
          uniteOrdre =
            listeDeSens[i] === 'div'
              ? ['\\text{mm}', '\\text{m}']
              : ['\\text{m}', '\\text{mm}']
          exposantReponse = listeDeSens[i] === 'div' ? n - 3 : n + 3
          correctionDetail = [
            `Il faut $${texNombre(1000)}$ mm pour 1 m, on va donc diviser par $${texNombre(1000)}$, c'est-à-dire multiplier par $10^{-3}$.<br>`,
            `$1~\\text{m}=${texNombre(1000)}~\\text{mm}$, on va donc multiplier par $${texNombre(1000)}$, c'est-à-dire multiplier par $10^{3}$.<br>`,
          ]
          break
        case 'm>um':
          n =
            listeDeSens[i] === 'div' ? randint(3, 10) : randint(3, 10, [6]) * -1
          uniteOrdre =
            listeDeSens[i] === 'div'
              ? ['\\mu\\text{m}', '\\text{m}']
              : ['\\text{m}', '\\mu\\text{m}']
          exposantReponse = listeDeSens[i] === 'div' ? n - 6 : n + 6
          correctionDetail = [
            "Il faut 1 million de $\\mu\\text{m}$ pour 1 m, on va donc diviser par 1 million, c'est-à-dire multiplier par $10^{-6}$.<br>",
            "1 mètre équivaut à 1 million de micro-mètres, on va donc multiplier par 1 million, c'est-à-dire multiplier par $10^{6}$.<br>",
          ]
          break
        case 'm>nm':
        default:
          n =
            listeDeSens[i] === 'div'
              ? randint(3, 8)
              : randint(3, 12, [9, 11]) * -1
          uniteOrdre =
            listeDeSens[i] === 'div'
              ? ['\\text{nm}', '\\text{m}']
              : ['\\text{m}', '\\text{nm}']
          exposantReponse = listeDeSens[i] === 'div' ? n - 9 : n + 9
          correctionDetail = [
            "Il faut 1 milliard de nano-mètres pour 1 m, on va donc diviser par 1 milliard, c'est-à-dire multiplier par $10^{-9}$.<br>",
            "1 mètre équivaut à 1 milliard de nano-mètres, on va donc multiplier par 1 milliard, c'est-à-dire multiplier par $10^{9}$.<br>",
          ]
          break
      }
      texte = this.interactif
        ? `$${texNombre(a)}\\times10^{${n}}~${uniteOrdre[0]} = ${texNombre(a)}\\times $` +
          ajouteChampTexteMathLive(this, i, ' ', {
            texteApres: ` $${uniteOrdre[1]}$`,
          })
        : `$${texNombre(a)}\\times10^{${n}}~${uniteOrdre[0]} = ${texNombre(a)}\\times 10^{${miseEnEvidence('\\ldots', 'black')}}~${uniteOrdre[1]}$`
      setReponse(this, i, [
        '10^' + exposantReponse,
        '10^{' + exposantReponse + '}',
      ])
      if (this.correctionDetaillee) {
        texteCorr +=
          listeDeSens[i] === 'div' ? correctionDetail[0] : correctionDetail[1]
      }
      texteCorr += `$${texNombre(a)}\\times10^{${n}}~${uniteOrdre[0]} = ${texNombre(a)}\\times10^{${n}}\\times10^{${exposantReponse - n}}~${uniteOrdre[1]} = ${texNombre(a)}\\times10^{${n + '+' + ecritureParentheseSiNegatif(exposantReponse - n)}}~${uniteOrdre[1]} `
      texteCorr += this.interactif
        ? ` = ${texNombre(a)}\\times{${miseEnEvidence('10^{' + exposantReponse + '}')}}~${uniteOrdre[1]}$`
        : ` = ${texNombre(a)}\\times10^{${miseEnEvidence(exposantReponse)}}~${uniteOrdre[1]}$`

      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
