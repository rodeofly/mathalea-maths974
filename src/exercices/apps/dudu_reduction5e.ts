import ExternalApp from './_ExternalApp'

export const uuid = 'duduReduction5e'
export const titre = 'Réductions 5e'

class duduReduction5e extends ExternalApp {
  constructor() {
    super('https://mathix.org/reduction/5e/index.html?suivi=1&mathalea=1')
  }
}

export default duduReduction5e
