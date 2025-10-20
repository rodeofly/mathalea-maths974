import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { choice } from '../../lib/outils/arrayOutils'
import { arrondi } from '../../lib/outils/nombres'
import { texNombre } from '../../lib/outils/texNombre'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Diviser un entier par 10, 100 ou 1000'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'

export const amcType = 'AMCNum'
/**
 * Division d'un entier par 10, 100, 1000
 * @author Rémi Angot

 */
export const uuid = '8f2a4'

export const refs = {
  'fr-fr': ['CM2N3H-1'],
  'fr-2016': ['CM016'],
  'fr-ch': [],
}
export default class DiviserPar101001000 extends Exercice {
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
      a = choice([randint(1, 9), randint(11, 99), randint(101, 999)])
      b = choice([10, 100, 1000])
      texte = `$${texNombre(a)}\\div${texNombre(b)}=$`
      texteCorr = `$${texNombre(a)}\\div${texNombre(b)}=${texNombre(a / b)}$`
      setReponse(this, i, arrondi(a / b))
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
}
