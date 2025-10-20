import ExternalApp from './_ExternalApp'

export const uuid = 'duduAngleAI'
export const titre = 'Angles correspondants et alternes-internes'

class duduAngleAI extends ExternalApp {
  constructor() {
    super('https://mathix.org/angle_ai_co/index.html?suivi=1&mathalea=1')
  }
}

export default duduAngleAI
