import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { ecritureParentheseSiNegatif } from '../../lib/outils/ecritures'
import { arrondi } from '../../lib/outils/nombres'
import { texNombre } from '../../lib/outils/texNombre'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre =
  "Déterminer la moyenne et la médiane d'une série statistique"
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '6/1/2022'

export const uuid = '9a574'
export const refs = {
  'fr-fr': ['4S12'],
  'fr-ch': [],
}

/**
 * @author Rémi Angot
 */
export default class MoyenneEtMediane extends Exercice {
  onlyMoyenne = false
  constructor() {
    super()
    this.nbQuestionsModifiable = false
    this.sup = 1
    this.besoinFormulaireNumerique = [
      'Effectif total',
      2,
      '1 : Impair\n2 : Pair',
    ]
  }

  nouvelleVersion() {
    const nbTemperatures = 2 * randint(3, 5) + this.sup
    const temperatures = generateTemperatures(nbTemperatures)
    this.consigne = `Voici les températures, en degré Celsius, relevées sur une période de ${nbTemperatures} jours : ${stringList(temperatures)}.`
    const moyenne = getMoyenne(temperatures)
    let isExact = false
    if ((moyenne * 10) % 1 === 0) {
      isExact = true
    }
    let question1 = `Calculer la température moyenne ${isExact ? '' : ', au dixième près, '} de cette série.`
    if (this.interactif) {
      question1 +=
        '<br>' +
        ajouteChampTexteMathLive(this, 0, KeyboardType.clavierDeBase, {
          texteAvant: `$M ${isExact ? '=' : '\\approx'} $`,
          texteApres: '°C',
        })
      handleAnswers(this, 0, {
        reponse: {
          value: arrondi(moyenne, 1),
          options: { nombreDecimalSeulement: true },
        },
      })
    }
    let correction1 = stringCalculMoyenne(temperatures)
    correction1 += `<br><br> La température moyenne est de $${texNombre(getMoyenne(temperatures), 1)}$°C.`

    let question2 = ''
    let correction2 = ''
    if (this.onlyMoyenne === false) {
      question2 += 'Quelle est la température médiane de cette série ?'
      correction2 = `On réordonne les températures par ordre croissant : ${sortedStringList(temperatures)}.<br>`
      const mediane = getMedianne(temperatures)
      correction2 +=
        stringCalculMediane(temperatures) + `$${texNombre(mediane)}$°C.`
      if (this.interactif) {
        question2 +=
          '<br>' +
          ajouteChampTexteMathLive(this, 1, KeyboardType.clavierDeBase, {
            texteAvant: 'Médiane : ',
            texteApres: '°C',
          })
        const sortedList = temperatures.sort((a, b) => a - b)
        const n = sortedList.length
        if (n % 2 === 0) {
          if (sortedList[n / 2 - 1] !== sortedList[n / 2]) {
            handleAnswers(this, 1, {
              reponse: {
                value: `]${sortedList[n / 2 - 1]};${sortedList[n / 2]}[`,
                options: { estDansIntervalle: true },
              },
            })
          } else {
            handleAnswers(this, 1, {
              reponse: {
                value: mediane,
                options: { nombreDecimalSeulement: true },
              },
            })
          }
        } else {
          handleAnswers(this, 1, {
            reponse: {
              value: mediane,
              options: { nombreDecimalSeulement: true },
            },
          })
        }
      }
    }

    if (this.onlyMoyenne) {
      this.listeQuestions = [question1]
      this.listeCorrections = [correction1]
      this.nbQuestions = 1
    } else {
      this.nbQuestions = 2
      this.listeQuestions.push(question1, question2)
      this.listeCorrections.push(correction1, correction2)
    }

    listeQuestionsToContenu(this)
  }
}

function generateTemperatures(nbTemperatures: number): number[] {
  const temperatures = [randint(0, 20)]
  for (let i = 1; i < nbTemperatures; i++) {
    temperatures.push(temperatures[i - 1] + randint(-3, 3))
  }
  return temperatures
}

function stringList(list: number[]): string {
  let result = ''
  for (const item of list) {
    result += `$${item}$ ; `
  }
  return result.slice(0, -3)
}

function sortedStringList(list: number[]): string {
  const sortedList = list.sort((a, b) => a - b)
  return stringList(sortedList)
}

function stringCalculMoyenne(list: number[], arrondi = 1): string {
  let result = '$M = \\dfrac{'
  for (const item of list) {
    result += `${ecritureParentheseSiNegatif(item)} + `
  }
  result = result.slice(0, -3)
  result += `}{${list.length}}`
  const m = getMoyenne(list)
  if ((m * 10 ** arrondi) % 1 === 0) {
    result += ` = ${texNombre(m, arrondi)}$`
  } else {
    result += ` \\approx ${texNombre(m, arrondi)}$`
  }
  return result
}

function getMoyenne(list: number[]): number {
  return list.reduce((a, b) => a + b, 0) / list.length
}

function stringCalculMediane(list: number[]): string {
  const sortedList = list.sort((a, b) => a - b)
  const n = sortedList.length
  let result = `L'effectif total est de ${list.length}, `
  if (n % 2 === 0) {
    result += `la médiane est donc une valeur comprise entre le ${n / 2}e et le ${n / 2 + 1}e élément de la série ordonnée soit, par exemple  `
  } else {
    result += `la médiane est donc le ${Math.ceil(n / 2)}e élément de la série ordonnée soit `
  }
  return result
}

function getMedianne(list: number[]): number {
  const sortedList = list.sort((a, b) => a - b)
  const n = sortedList.length
  if (n % 2 === 0) {
    return (sortedList[n / 2 - 1] + sortedList[n / 2]) / 2
  } else {
    return sortedList[Math.ceil(n / 2) - 1]
  }
}
