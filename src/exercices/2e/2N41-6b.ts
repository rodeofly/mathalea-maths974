import developperIdentiteRemarquable from '../3e/3L11-15'

export const titre = 'Développer une identité remarquable'
export const dateDePublication = '09/10/2025'

/**
 * Clone de 3L11-15 pour la France
 * @author Eric Elter
 */

export const uuid = 'be864'

export const refs = {
  'fr-fr': ['2N41-6b', 'BP2AutoI8'],
  'fr-ch': [],
}
export default class developperIdentiteRemarquableFrance extends developperIdentiteRemarquable {
  constructor() {
    super()
    this.pays = 'France'
    this.besoinFormulaireTexte = [
      'Choix des questions',
      'Nombres séparés par des tirets :\n1 : (x+a)^2\n2 : (x-a)^2\n3 : (x-a)(x-b)\n5 : (ax+by)^2\n6 : (ax-by)^2\n7 : (ax+by)(ax-by)\n9 - Mélange',
    ]
  }
}
