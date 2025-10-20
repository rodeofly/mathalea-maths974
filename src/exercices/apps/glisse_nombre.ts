import ExternalApp from './_ExternalApp'

export const uuid = 'glisseNombre'
export const titre = 'Glisse-nombre'

export default class GlisseNombre extends ExternalApp {
  constructor() {
    super('https://coopmaths.fr/apps/glisse-nombre/?v=embed')
  }
}
