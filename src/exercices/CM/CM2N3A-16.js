import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Somme de deux nombres mariés'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'

/**
 * Somme de deux nombres dont les chiffres des unités sont des compléments à 10
 * @author Rémi Angot

 */
export const uuid = 'fbd32'

export const refs = {
  'fr-fr': ['CM2N3A-16'],
  'fr-2016': ['CM015'],
  'fr-ch': [],
}
export default class SommeDeDeuxNombresMaries extends Exercice {
  constructor() {
    super()

    this.consigne = 'Calculer.'

    this.nbCols = 2
    this.nbColsCorr = 2
  }

  nouvelleVersion() {
    for (
      let i = 0, texte, texteCorr, a, b, u1, u2, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      u1 = randint(1, 9)
      u2 = 10 - u1
      a = randint(1, 9) * 10 + u1
      b = randint(1, 9) * 10 + u2

      texte = `$${a}+${b}=$`
      texteCorr = `$${a}+${b}=${a + b}$`
      setReponse(this, i, a + b)
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
