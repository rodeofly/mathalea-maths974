import prettier from 'eslint-config-prettier'
import neostandard from 'neostandard'
export default [
  ...neostandard({ ts: true }),
  {
    rules: {
      // Désactive la règle stylistic qui pose problème
      '@stylistic/space-before-blocks': 'off',
      '@stylistic/space-in-parens': 'off',
      '@stylistic/space-before-function-paren': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 1 }],
    },
  },
  prettier, // à maintenir en dernier pour éviter les conflits entre ESLint et Prettier
]
