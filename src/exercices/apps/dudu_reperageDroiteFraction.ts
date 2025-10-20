import ExternalApp from './_ExternalApp'

export const uuid = 'duduReperageDroiteFraction'
export const titre = 'Abscisses fractionnaires'

class duduReperageDroiteFraction extends ExternalApp {
  constructor() {
    super(
      'https://mathix.org/reperage_droite_fraction/index.html?suivi=1&mathalea=1',
    )
  }
}

export default duduReperageDroiteFraction
