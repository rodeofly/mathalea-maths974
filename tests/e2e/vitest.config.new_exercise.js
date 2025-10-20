import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'
import { resolve } from 'node:path'

const arg = process.argv[2]

console.log('Running newExercise test with', arg)

export default mergeConfig(
  viteConfig,
  defineConfig({
    resolve: {
      alias: {
        testBrowser: resolve(__dirname, 'e2e'),
      },
    },
    test: {
      include: ['./tests/test_exercice/testExercice.test.{js,ts}'],
      hookTimeout: 1200_000,
      testTimeout: 1200_000,
      poolOptions: {
        threads: {
          singleThread: true,
        },
      },
    },
  }),
)
