import prefs from '../../helpers/prefs.js'
import { expect } from '@playwright/test'
import type { Page } from 'playwright'
import { runTest } from '../../helpers/run'

async function testV(page: Page) {
  // Mock the api call before navigating
  await page.route(
    `http://localhost:${process.env.CI ? '80' : '5173'}/parent`,
    async (route) => {
      await route.fulfill({
        contentType: 'text/html',
        body: `<html>
      <body>
      bonjour
      <div style='height: 90%;'>
      <iframe id='iframe' width="100%" height="100%" allowfullscreen="" src='http://localhost:${process.env.CI ? '80' : '5173'}/alea/?recorder=capytale'></iframe>
      </div>
      <script src='modulemock.js' type='module'></script>
      </body></html>`,
      })
    },
  )
  await page.route(
    `http://localhost:${process.env.CI ? '80' : '5173'}/modulemock.js`,
    async (route) => {
      await route.fulfill({
        contentType: 'text/javascript',
        path: require('path').resolve(
          __dirname,
          '../../mock/mock.capytale.review.1.module.js',
        ),
      })
    },
  )

  // Go to the page
  const hostname = `http://localhost:${process.env.CI ? '80' : '5173'}/parent`
  await page.setDefaultTimeout(60000) // Set timeout to 60 seconds
  await page.goto(hostname)

  await page.getByText('bonjour').waitFor({ state: 'visible' })
  await page.waitForSelector('#iframe')
  await page.waitForTimeout(3000) // attendre 3000 ms de plus pour assurer le rendu
  if (page.frames().length > 0) {
    await Promise.all(
      page.frames().map((frame) => frame.waitForLoadState('networkidle')),
    )
  }

  const value1 = await page
    .locator('#iframe')
    .contentFrame()
    .locator('#exercice0')
    .getByText('/ 1')
    .innerText()
  expect(value1).toEqual('1 / 1')
  await page
    .locator('#iframe')
    .contentFrame()
    .getByRole('button', { name: 'Exercice 2' })
    .click()
  const value2 = await page
    .locator('#iframe')
    .contentFrame()
    .locator('#exercice1')
    .getByText('/ 1')
    .innerText()
  expect(value2).toEqual('1 / 1')
  await page
    .locator('#iframe')
    .contentFrame()
    .getByRole('button', { name: 'Exercice 3' })
    .click()
  const value3 = await page
    .locator('#iframe')
    .contentFrame()
    .locator('#exercice2')
    .getByText('/ 1')
    .innerText()
  expect(value3).toEqual('1 / 1')
  await page
    .locator('#iframe')
    .contentFrame()
    .getByRole('button', { name: 'Exercice 4' })
    .click()
  const value4 = await page
    .locator('#iframe')
    .contentFrame()
    .locator('#exercice3')
    .getByText('/ 2')
    .innerText()
  expect(value4).toEqual('2 / 2')
  await page
    .locator('#iframe')
    .contentFrame()
    .getByRole('button', { name: 'Exercice 5' })
    .click()
  const value5 = await page
    .locator('#iframe')
    .contentFrame()
    .locator('#exercice4')
    .getByText('/ 2')
    .innerText()
  expect(value5).toEqual('2 / 2')
  await page
    .locator('#iframe')
    .contentFrame()
    .getByRole('button', { name: 'Exercice 6' })
    .click()
  const value6 = await page
    .locator('#iframe')
    .contentFrame()
    .locator('#exercice5')
    .getByText('/ 4')
    .innerText()
  expect(value6).toEqual('4 / 4')
  await page
    .locator('#iframe')
    .contentFrame()
    .getByRole('button', { name: 'Exercice 7' })
    .click()
  const value7 = await page
    .locator('#iframe')
    .contentFrame()
    .locator('#exercice6')
    .getByText('/ 1')
    .innerText()
  expect(value7).toEqual('1 / 1')
  return true
}

if (process.env.CI) {
  // utiliser pour les tests d'intégration
  prefs.headless = true
  runTest(testV, import.meta.url, { pauseOnError: false })
} else {
  prefs.headless = false
  runTest(testV, import.meta.url, { pauseOnError: true })
}

// pnpm vitest --config tests/e2e/vitest.config.view.js --run tests\e2e\tests\view\view.capytale.review.1.test.ts
