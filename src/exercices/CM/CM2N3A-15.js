import Exercice from '../Exercice'

import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { listeQuestionsToContenu, randint } from '../../modules/outils'

export const titre = 'Trouver le complément à une dizaine'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'

/**
 * Une soustraction dont le premier terme est un multiple de 10
 * @author Rémi Angot

 */
export const uuid = '5e009'

export const refs = {
  'fr-fr': ['CM2N3A-15'],
  'fr-2016': ['CM013'],
  'fr-ch': [],
}
export default class ComplementAUneDizaine extends Exercice {
  constructor() {
    super()

    this.consigne = 'Calculer.'

    this.nbCols = 2
    this.nbColsCorr = 2
  }

  nouvelleVersion() {
    for (
      let i = 0, texte, texteCorr, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(2, 9) * 10
      b = randint(2, a - 11)
      texte = `$${a}-${b}=$`
      texteCorr = `$${a}-${b}=${a - b}$`
      setReponse(this, i, a - b)
      if (this.interactif) texte += ajouteChampTexteMathLive(this, i, '')

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}
