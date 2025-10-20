import { expect } from '@playwright/test'
import type { Locator, Page } from 'playwright'
import { describe, test } from 'vitest'
import { findStatic, findUuid } from '../../helpers/filter.js'
import { createIssue } from '../../helpers/issue.js'
import { getFileLogger, log as lg, logError as lgE } from '../../helpers/log'
import prefs from '../../helpers/prefs.js'
import { runSeveralTests } from '../../helpers/run.js'
import { checkEachCombinationOfParams } from '../../helpers/testAllViews'

const logConsole = getFileLogger('exportConsole', { append: true })

function log(...args: unknown[]) {
  lg(args)
  logConsole(args)
}

function logError(...args: unknown[]) {
  lgE(args)
  logConsole(args)
}

function logDebug(...args: unknown[]) {
  if (
    process.env.CI &&
    process.env.DEBUG !== null &&
    process.env.DEBUG !== undefined
  ) {
    if ((process.env.DEBUG as string).replaceAll(' ', '') === 'DEBUG') {
      log(args)
    }
  }
}

async function waitForExercicesAffiches(page: Page, buttonZoom: Locator) {
  const waitForEvent = page.evaluate(() => {
    return new Promise<void>((resolve) => {
      const listener = () => {
        document.removeEventListener('exercicesAffiches', listener)
        resolve()
      }
      document.addEventListener('exercicesAffiches', listener)
    })
  })
  await buttonZoom.click()
  // Attendre que l'événement exercicesAffiches soit déclenché
  const eventDetected = await Promise.race([
    waitForEvent,
    new Promise((resolve, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              "Timeout: L'événement exercicesAffiches n'a pas été détecté",
            ),
          ),
        5000,
      ),
    ),
  ])
  if (eventDetected instanceof Error) {
    logError(eventDetected.message)
  } else {
    logDebug('Événement exercicesAffiches détecté')
  }
}

async function action(page: Page, description: string) {
  logDebug(`Test avec les paramètres ${description}`)
  // clic sur nouvel énoncé 3 fois
  const buttonNewData = page.getByRole('button', { name: 'Nouvel énoncé ' })
  logDebug('Actualier (nouvel énoncé)')
  await buttonNewData.click({ force: true })
  logDebug('fin Actualier (nouvel énoncé)')
  const buttonZoom = page.locator(
    '#setupButtonsBar > div > div:nth-child(2) > button',
  )
  const buttonZoomMoins = page.locator(
    '#setupButtonsBar > div > div:nth-child(1) > button',
  )
  const zParam = new URL(page.url()).searchParams.get('z')
  const z = zParam === null || zParam === '' ? 1 : Number(zParam)
  log('Zoom')
  if (z < 1.4) {
    // await buttonZoom.highlight()
    await waitForExercicesAffiches(page, buttonZoom)
  } else {
    // await buttonZoomMoins.highlight()
    await waitForExercicesAffiches(page, buttonZoomMoins)
  }
  log('Fin zoom')
  // Active le mode interactif
  const activateInteractivityButton = page.getByRole('button', {
    name: 'Rendre interactif',
  })
  if (await activateInteractivityButton.isVisible()) {
    await activateInteractivityButton.click()
    logDebug('Active le mode interactif')
    // selectionne les questions
    const questionSelector = 'li[id^="exercice0Q"]'
    await page.waitForSelector(questionSelector)
    log('new URL (mode interactif): ' + page.url())
    const locators = await page.locator(questionSelector).all()
    log('nbre de questions:' + locators.length)
    // => TODOS à poursuivre
    // Cliquer sur vérifier les données
    const buttonVerifier = page.locator('#verif0')
    logDebug('Vérifier les réponses')
    await buttonVerifier.click()
    await page.waitForSelector('article + div')
    const buttonResult = await page.locator('article + div').innerText()
    log(buttonResult)
    logDebug('Actualier (nouvel énoncé) 3 fois')
    await buttonNewData.click({ clickCount: 3 })
    logDebug('fin Actualier (nouvel énoncé) 3 fois')
  } else {
    // MGu : obligé car parfois on rate l'exception car trop rapide
    // await new Promise((resolve) => setTimeout(resolve, 1000)) // GV : Si on attend 1 seconde après chaque cas, il va falloir 1 an si on veut tester toutes les possibilités
  }
}

async function getConsoleTest(page: Page, urlExercice: string) {
  log(urlExercice)
  // on configure à 5 min le timeout
  page.setDefaultTimeout(5 * 60 * 1000)

  const retries = 3 // Nombre de tentatives en cas d'erreur
  for (let attempt = 1; attempt <= retries; attempt++) {
    const messages: string[] = []
    try {
      page.on('pageerror', (msg) => {
        if (msg.message !== 'Erreur de chargement de Mathgraph') {
          // mtgLoad : 3G22
          messages.push('error:' + page.url() + ' ' + msg.stack)
          log(msg.message)
          log(msg.stack)
          logError(msg)
        }
      })
      page.on('crash', (msg) => {
        messages.push('crach:' + page.url() + ' ' + msg)
        logError(msg)
      })
      // Listen for all console events and handle errors
      page.on('console', (msg) => {
        // if (msg.type() === 'error') {
        if (
          !msg.text().includes('[vite]') &&
          !msg.text().includes('[bugsnag] Loaded!') &&
          !msg.text().includes('No character metrics for') && // katex
          !msg.text().includes('LaTeX-incompatible input') && // katex
          !msg.text().includes('mtgLoad') && // mtgLoad : 3G22
          !msg.text().includes('MG32div0') && // MG32div0 : 3G22
          !msg
            .text()
            .includes('UserFriendlyError: Le chargement de mathgraph') &&
          !msg.text().includes("Invalid 'X-Frame-Options' header") &&
          !msg
            .text()
            .includes(
              'Blockly.Workspace.getAllVariables was deprecated in v12',
            ) &&
          !msg.text().includes('A-Frame Version:') &&
          !msg
            .text()
            .includes(
              'THREE Version (https://github.com/supermedium/three.js)',
            ) &&
          !msg
            .text()
            .includes(
              'WARNING: Too many active WebGL contexts. Oldest context will be lost.',
            ) &&
          !msg.text().includes('GPU stall due to ReadPixels') &&
          !msg.text().includes(': le motif contient plus') &&
          !msg
            .text()
            .includes(
              'The column width is less than 0, need to adjust page width to make',
            ) &&
          !msg.location().url.includes('mathgraph32')
        ) {
          if (!msg.text().includes('<HeaderExercice>')) {
            messages.push('console:' + page.url() + ' ' + msg.text())
          }
        }
        // }
      })

      logDebug('On charge la page')
      await page.goto(urlExercice)
      await page.waitForLoadState('networkidle')
      logDebug('fin : On charge la page')

      // Correction
      // On cherche les questions
      logDebug('On cherche les questions')
      await page.waitForSelector('div.mb-5>ul>div#consigne0-0')
      logDebug('fin : On cherche les questions')
      // Pour chaque combinaison de paramètres, on clique sur nouvel énoncé 3 fois, active le mode interactif et reclique sur nouvel énoncé 3 fois
      await checkEachCombinationOfParams(page, action, { isFullViews: true })
      // Paramètres ça va les refermer puisqu'ils sont ouverts par défaut
      const buttonParam = page.getByRole('button', {
        name: "Changer les paramètres de l'",
      })
      logDebug('Ferme les paramètres ')
      if (await buttonParam.isVisible()) {
        await buttonParam.click()
      }
      if (messages.length > 0) {
        logError(messages)
        logError(`Il y a ${messages.length} erreurs : ${messages.join('\n')}`)
        log('url:' + page.url())
        await createIssue(urlExercice, messages, ['console'], log)
        return 'KO'
      } else {
        return 'OK'
      }
    } catch (error) {
      // si une exception comme timeout: on récupère la requete
      let message = 'Unknown Error'
      if (error instanceof Error) message = error.message
      messages.push('erreur:' + message)
      log('url:' + page.url())
      logError(messages)
      logError(`Il y a ${messages.length} erreurs : ${messages.join('\n')}`)
      if (attempt === retries) {
        if (!message.includes('net::ERR_CONNECTION_REFUSED')) {
          // le serveur ne répond pas... si net::ERR_CONNECTION_REFUSED
          await createIssue(urlExercice, messages, ['console'], log)
        }
        return 'KO'
      }
    }
  }
}

async function testRunAllLots(filter: string) {
  const uuids = filter.includes('dnb')
    ? await findStatic(filter)
    : await findUuid(filter)
  for (let i = 0; i < uuids.length && i < 300; i += 20) {
    const ff: ((page: Page) => Promise<boolean>)[] = []
    for (let k = i; k < i + 20 && k < uuids.length; k++) {
      const myName = uuids[k][1]
      const f = async function (page: Page) {
        // Listen for all console logs
        page.on('console', (msg) => {
          logConsole(msg.text())
        })
        log(filter)
        const hostname = local
          ? `http://localhost:${process.env.CI ? '80' : '5173'}/alea/`
          : 'https://coopmaths.fr/alea/'
        log(`uuid=${uuids[k][0]} exo=${uuids[k][1]} i=${k} / ${uuids.length}`)
        const resultReq = await getConsoleTest(
          page,
          `${hostname}?uuid=${uuids[k][0]}&id=${uuids[k][1].substring(0, uuids[k][1].lastIndexOf('.')) || uuids[k][1]}&alea=${alea}&testCI`,
        )
        log(`Resu: ${resultReq} uuid=${uuids[i][0]} exo=${uuids[k][1]}`)
        return resultReq === 'OK'
      }
      Object.defineProperty(f, 'name', { value: myName, writable: false })
      ff.push(f)
    }
    runSeveralTests(ff, import.meta.url, {
      pauseOnError: false,
      silent: false,
      debug: false,
    })
  }
}

const alea = 'e906e'
const local = true

if (
  process.env.CI &&
  process.env.NIV !== null &&
  process.env.NIV !== undefined
) {
  // utiliser pour les tests d'intégration
  const filter = (process.env.NIV as string).replaceAll(' ', '')
  prefs.headless = true
  log(filter)
  testRunAllLots(filter)
} else if (
  process.env.CI &&
  process.env.CHANGED_FILES !== null &&
  process.env.CHANGED_FILES !== undefined
) {
  const changedFiles = process.env.CHANGED_FILES?.split('\n') ?? []
  log(changedFiles)
  prefs.headless = true
  const filtered = changedFiles
    .filter(
      (file) =>
        file.startsWith('src/exercices/') &&
        !file.includes('ressources') &&
        !file.includes('apps') &&
        file.replace('src/exercices/', '').split('/').length >= 2,
    )
    .map((file) =>
      file
        .replace(/^src\/exercices\//, '')
        .replace(/\.ts$/, '.')
        .replace(/\.js$/, '.'),
    )
  log(filtered)
  if (filtered.length === 0) {
    // aucun fichier concerné.. on sort
    describe('dummy', () => {
      test('should pass', () => {
        expect(true).toBe(true)
      })
    })
  } else {
    filtered.forEach((file, index) => {
      const filter = file.replaceAll(' ', '')
      console.log(
        'launching test for:',
        filter + `,  ${index + 1}/${filtered.length}`,
      )
      testRunAllLots(filter)
    })
  }
} else {
  prefs.headless = false
  // testRunAllLots('can')
  // testRunAllLots('6e')
  // testRunAllLots('5e')
  // testRunAllLots('4e')
  // testRunAllLots('3e')
  // testRunAllLots('2e')
  // testRunAllLots('1e')
  // testRunAllLots('QCM')
  // testRunAllLots('TEx')
  // testRunAllLots('TSpe')
  // testRunAllLots('techno1')
  // testRunAllLots('QCMBac')
  // testRunAllLots('QCMBrevet')
  // testRunAllLots('QCMStatiques')

  // pour faire un test sur un exercice particulier:
  testRunAllLots('6e/6I16')
}
