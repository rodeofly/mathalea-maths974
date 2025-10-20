import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Ajouter 9'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'

/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @author Rémi Angot

 */
export const uuid = '30800'

export const refs = {
  'fr-fr': ['CM2N3J-1'],
  'fr-2016': ['CM005'],
  'fr-ch': ['PR-4'],
}
export default class Ajouter9 extends Exercice {
  constructor() {
    super()

    this.consigne = 'Calculer.'

    this.nbCols = 2
    this.nbColsCorr = 2
  }

  nouvelleVersion() {
    for (
      let i = 0, texte, texteCorr, a, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(0, 9) * 10 + randint(1, 9)
      texte = `$${a}+9 = $`
      texteCorr = `$${a}+9=${a + 9}$`
      setReponse(this, i, a + 9)
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
