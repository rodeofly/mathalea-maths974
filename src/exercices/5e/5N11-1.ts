import TableauxEtPourcentages from './_Tableaux_et_pourcentages'

export const titre =
  'Compléter tableau (issu de pourcentages avec un prix constant)'
export const interactifReady = false

/**
 * * Tableaux et pourcentages prix constant
 * * numéro de l'exo ex : 5N11-1 fils de 5N11-pere
 * * publication initiale le 25/11/2020
 * @author Sébastien Lozano
 */

export const uuid = 'f00fb'

export const refs = {
  'fr-fr': ['5N11-1', 'BP2AutoB3', 'BP2CCF1'],
  'fr-ch': ['9NO14-4'],
}

export default class TableauxEtPourcentagesPrixConstant extends TableauxEtPourcentages {
  constructor() {
    super()
    this.exo = '5N11-1'
    this.consigne = 'Compléter le tableau suivant. Le prix est fixe.'
    this.besoinFormulaireNumerique = [
      'Le coefficient entre les pourcentages',
      2,
      '1 : est entier.\n2 : est décimal.',
    ]
    this.besoinFormulaire3CaseACocher = ['Modulation de ce qui est demandé']
    this.besoinFormulaire2Numerique = [
      'Nombre de colonnes à remplir (fixé à 3 lorsque la case ci-dessous est cochée)',
      4,
      '1 : Une colonne\n2 : Deux colonnes\n3 : Trois colonnes\n4 : Quatre colonnes',
    ]
  }
}
