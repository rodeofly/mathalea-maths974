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
          '../../mock/mock.capytale.review.can.module.js',
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
  // await page.pause()
  expect(
    await page
      .locator('#iframe')
      .contentFrame()
      .locator('#score:first-child > span')
      .innerText(),
  ).toBe('1/11')
  expect(
    await page
      .locator('#iframe')
      .contentFrame()
      .locator('#answer-0')
      .innerText(),
  ).toBe('12\n12 h \n15\n15')
  expect(
    await page
      .locator('#iframe')
      .contentFrame()
      .locator('#answer-1')
      .innerText(),
  ).toBe('20\n000\n000\n000\n20000000000')
  expect(
    await page
      .locator('#iframe')
      .contentFrame()
      .locator('#answer-2')
      .innerText(),
  ).toBe('600\n600')
  expect(
    await page
      .locator('#iframe')
      .contentFrame()
      .locator('#answer-3')
      .innerText(),
  ).toBe('Voir figure')
  expect(
    await page
      .locator('#iframe')
      .contentFrame()
      .locator('#answer-4')
      .innerText(),
  ).toBe('1\n1')
  expect(
    await page
      .locator('#iframe')
      .contentFrame()
      .locator('#answer-5')
      .innerText(),
  ).toBe('1\n1')
  expect(
    await page
      .locator('#iframe')
      .contentFrame()
      .locator('#answer-6')
      .innerText(),
  ).toBe('différence')
  expect(
    await page
      .locator('#iframe')
      .contentFrame()
      .locator('#answer-7')
      .innerText(),
  ).toBe('différence')
  expect(
    await page
      .locator('#iframe')
      .contentFrame()
      .locator('#answer-8')
      .innerText(),
  ).toBe('différence')
  expect(
    await page
      .locator('#iframe')
      .contentFrame()
      .locator('#answer-9')
      .innerText(),
  ).toBe('différence')
  expect(
    await page
      .locator('#iframe')
      .contentFrame()
      .locator('#answer-10')
      .innerText(),
  ).toBe('deux')
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
// pnpm vitest --config tests/e2e/vitest.config.view.js --run tests\e2e\tests\view\view.capytale.review.can.test.ts
