import TracerDroite2nde from '../2e/2F10-3'

export const titre = "Représentation graphique d'une fonction affine"
export const dateDePublication = '06/04/2024'
export const interactifReady = true
export const interactifType = 'custom'
export const uuid = '20c65'
export const refs = {
  'fr-fr': ['3F20-3'],
  'fr-ch': ['1mF2-15', '11FA8-18'],
}

export default class TracerDroite extends TracerDroite2nde {
  constructor() {
    super()
    this.level = 3
    this.consigne = 'Représenter graphiquement la fonction affine définie par :'
    this.besoinFormulaireNumerique = [
      'Types de question ',
      3,
      '1 : Valeurs entières\n2 : Valeurs entières et demis pour le coefficient directeur\n3 : Mélange des deux cas précédents',
    ]
  }
}
