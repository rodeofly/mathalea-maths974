import ExternalApp from './_ExternalApp'

export const uuid = 'duduReperageEspace'
export const titre = "Repérage dans l'espace"

class duduReperageEspace extends ExternalApp {
  constructor() {
    super('https://mathix.org/reperage_espace/index.html?suivi=1&mathalea=1')
  }
}

export default duduReperageEspace
