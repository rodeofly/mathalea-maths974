import ExternalApp from './_ExternalApp'

export const uuid = 'duduTrigo'
export const titre = 'Trigonométrie'

class duduTrigo extends ExternalApp {
  constructor() {
    super('https://mathix.org/trigo/index.html?suivi=1&mathalea=1')
  }
}

export default duduTrigo
