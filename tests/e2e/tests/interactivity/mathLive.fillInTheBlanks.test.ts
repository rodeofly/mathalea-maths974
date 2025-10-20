import {
  checkFeedback,
  getQuestions,
  inputAnswer,
  runTest,
} from '../../helpers/run'
import type { Page } from 'playwright'
import prefs from '../../helpers/prefs.js'

async function test6N203(page: Page) {
  const hostname = local
    ? `http://localhost:${process.env.CI ? '80' : '5173'}/alea/`
    : 'https://coopmaths.fr/alea/'
  const urlExercice = hostname + '?uuid=3bdcd&id=6N20-3&alea=vBuv&i=1'
  const questions = await getQuestions(page, urlExercice)

  for (const question of questions) {
    const mathField = question.mathField
    const signe = mathField.includes('&lt') ? '<' : '>'
    const cleanMathField = mathField.replaceAll('\\,', '')
    const regex = /(\d+)/g
    const [, numString, denString] = cleanMathField.match(regex) as [
      string,
      string,
      string,
    ]
    const num = Number(numString)
    const den = Number(denString)
    let a, b: number
    if (question.isCorrect) {
      a = Math.floor(num / den)
      b = Math.ceil(num / den)
    } else {
      a = Math.floor(num / den) - 1
      b = Math.floor(num / den) + 1
    }
    const reponse =
      signe === '<'
        ? [a.toString(), b.toString()]
        : [b.toString(), a.toString()] // J'ai inversé l'ordre parce que le focus se place automatiquement sur le deuxième placeholder !
    await inputAnswer(page, question, reponse)
  }
  await checkFeedback(page, questions)
  return true
}

async function test5R211(page: Page) {
  const hostname = local
    ? `http://localhost:${process.env.CI ? '80' : '5173'}/alea/`
    : 'https://coopmaths.fr/alea/'
  const urlExercice = hostname + '?uuid=f2db1&alea=1iCO&i=1' // Mettre ici l'url de l'exercice (éventuellement avec la graine mais push sans la graine)
  const questions = await getQuestions(page, urlExercice)
  for (const question of questions) {
    const innerText = question.innerText
      .replaceAll(' ', '')
      .replaceAll('\n', '')
      .split('=')[0]
    let [stringA, stringB] = innerText.split(')-(')
    stringA = stringA.replace('(', '')
    stringB = stringB.replace(')', '')
    let a, b, c: number
    if (question.isCorrect) {
      a = Number(stringA)
      b = Number(stringB)
      b *= -1
      c = a + b
    } else {
      a = Number(stringA)
      b = Number(stringB)
      c = a + b
    }
    const reponse = [a.toString(), b.toString(), c.toString()]
    await inputAnswer(page, question, reponse)
  }
  await checkFeedback(page, questions)
  return true
}

const local = true
if (process.env.CI) {
  // utiliser pour les tests d'intégration
  prefs.headless = true
  runTest(test6N203, import.meta.url, { pauseOnError: false }) // true pendant le développement, false ensuite
  runTest(test5R211, import.meta.url, { pauseOnError: false }) // true pendant le développement, false ensuite
} else {
  runTest(test6N203, import.meta.url)
  runTest(test5R211, import.meta.url)
}
