import { expect } from '@playwright/test'
import type { Page } from 'playwright'
import prefs from '../../helpers/prefs.js'
import { runTest } from '../../helpers/run.js'

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
          '../../mock/mock.capytale.save.3L11-2.module.js',
        ),
      })
    },
  )

  // Go to the page
  const hostname = `http://localhost:${process.env.CI ? '80' : '5173'}/parent`
  await page.setDefaultTimeout(60000) // Set timeout to 60 seconds
  await page.goto(hostname)

  await page.getByText('bonjour').waitFor({ state: 'visible' })

  // await page.locator('#iframe').contentFrame().getByRole('button', { name: 'Exercice 1' }).click()
  // const box = await page.locator('#iframe').contentFrame().locator('.minute-hand').boundingBox()
  // if (box !== null) {
  //   await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  //   await page.mouse.down()
  //   await page.mouse.move(box.x + box.width / 2 + 10, box.y + box.height / 2 + 10)
  //   await page.mouse.up()
  // }

  await page.waitForSelector('#iframe')
  await page.waitForTimeout(3000) // attendre 3000 ms de plus pour assurer le rendu
  if (page.frames().length > 0) {
    await Promise.all(
      page.frames().map((frame) => frame.waitForLoadState('networkidle')),
    )
  }

  expect(
    await page
      .locator('#iframe')
      .contentFrame()
      .locator('#divScoreEx0')
      .innerText(),
  ).toBe('4 / 7')

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

// pnpm vitest --config tests/e2e/vitest.config.view.js --run tests\e2e\tests\view\view.capytale.save.test.ts
