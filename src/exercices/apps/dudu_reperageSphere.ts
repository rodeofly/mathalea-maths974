import ExternalApp from './_ExternalApp'

export const uuid = 'duduReperageSphere'
export const titre = 'Repérage sur une sphère'

class duduReperageSphere extends ExternalApp {
  constructor() {
    super('https://mathix.org/reperage_sphere/index.html?suivi=1&mathalea=1')
  }
}

export default duduReperageSphere
