import ExternalApp from './_ExternalApp'

export const uuid = 'duduReduction'
export const titre = 'Réductions'

class duduReduction extends ExternalApp {
  constructor() {
    super('https://mathix.org/reduction/index.html?suivi=1&mathalea=1')
  }
}

export default duduReduction
