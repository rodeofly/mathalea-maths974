import ExternalApp from './_ExternalApp'

export const uuid = 'duduStatistix6e'
export const titre = 'Statistix 6e'

class duduStatistix6e extends ExternalApp {
  constructor() {
    super('https://mathix.org/statistix/6e/index.html?suivi=1&mathalea=1')
  }
}

export default duduStatistix6e
