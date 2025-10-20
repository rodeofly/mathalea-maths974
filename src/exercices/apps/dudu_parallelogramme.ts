import ExternalApp from './_ExternalApp'

export const uuid = 'duduParallelogramme'
export const titre = 'Parallélogrammes'

class duduParallelogramme extends ExternalApp {
  constructor() {
    super('https://mathix.org/parallelogramme/index.html?suivi=1&mathalea=1')
  }
}

export default duduParallelogramme
