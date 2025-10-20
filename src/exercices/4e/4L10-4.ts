import ExoRose from '../6e/_Roses'
export const titre = 'Résoudre une Rose additive avec calcul littéral'
export const interactifReady = true
export const interactifType = 'custom'
export const amcReady = true
export const amcType = 'AMCOpen'
export const dateDePublication = '12/08/2022'

/**
 * Travailler les réductions d'expressions littérales
 * @author Jean-Claude Lhote
 */

export const uuid = 'a40d6'

export const refs = {
  'fr-fr': ['4L10-4'],
  'fr-ch': ['10FA1-17'],
}
export default class RoseAdditive4L extends ExoRose {
  // c'est l'ExoRose zéro contenu dans _Roses.js
  constructor() {
    super()

    this.operation = 'addition'
    this.typeDonnees = 'litteraux'
    this.besoinFormulaireNumerique = [
      'Valeur maximale (entre 10 et 30) des termes',
      30,
    ]
    this.besoinFormulaire2Numerique = ['Nombre de termes entre 3 et 5', 5]
    this.besoinFormulaire3Numerique = [
      'Type de questions',
      4,
      '1 : Calculer les sommes\n2 : Calculer les termes manquants\n3 : Course aux nombres 1\n4 : Course aux nombres 2',
    ]
  }
}
