import Exercice from '../Exercice'
import { mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'

import { fraction } from '../../modules/fractions'
import { gestionnaireFormulaireTexte } from '../../modules/outils'

export const titre = 'Faire des camemberts pour travailler les fractions'

export const refs = {
  'fr-fr': ['P012'],
  'fr-ch': [],
}
export const uuid = '62f5e'

/**
 * Fonction permettant aux enseignants de proposer rapidement des diques partagés en parts
 * @author Jean-Claude Lhote
 */
export default class Camemberts extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Nombre de parts séparés par des tirets (de 2 à 12)',
      '',
    ]
    this.besoinFormulaire2Texte = [
      'Nombre de disques par ligne séparés par des tirets (de 1 à 5)',
      '',
    ]

    this.nbCols = 1
    this.nbQuestions = 3
    this.nbQuestionsModifiable = false
    this.sup = '2-3-4-5' // nombre de parts
    this.sup2 = '5' // nombre de disques par ligne
  }

  nouvelleVersion() {
    this.contenu = ''
    if (this.sup === '') {
      this.sup = '2-3-4-5'
    }
    const secteurs = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 2,
      max: 12,
      defaut: 6,
      nbQuestions: this.nbQuestions,
      shuffle: false,
      melange: 0,
    }).map(Number)
    const unites = gestionnaireFormulaireTexte({
      saisie: this.sup2,
      min: 1,
      max: 5,
      defaut: 2,
      nbQuestions: this.nbQuestions,
      shuffle: false,
      melange: 0,
    }).map(Number)

    // const secteurs = combinaisonListesSansChangerOrdre(nbParts, this.nbQuestions)
    // const unites = combinaisonListesSansChangerOrdre(nbDisques, this.nbQuestions)
    let f
    const fenetre = {
      xmin: -2.5,
      xmax: 35,
      ymin: -2.5,
      ymax: 2.5,
      pixelsParCm: 20,
      scale: 0.5,
    }
    for (let i = 0; i < this.nbQuestions; i++) {
      f = fraction(secteurs[i] * unites[i], secteurs[i]).representation(
        0,
        0,
        2,
        0,
        'gateau',
        'white',
      )
      this.contenu += mathalea2d(fenetre, f)
      if (context.isHtml) {
        this.contenu += '<br>'
      } else {
        this.contenu += '\\\\'
      }
    }
    this.listeQuestions[0] = this.contenu
  }
}
