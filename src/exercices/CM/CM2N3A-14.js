import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import { listeQuestionsToContenu, randint } from '../../modules/outils'

import Exercice from '../Exercice'

export const titre = 'Trouver le complément à 100'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'

/**
 * 100-...=
 * @author Rémi Angot

 */
export const uuid = '67962'

export const refs = {
  'fr-fr': ['CM2N3A-14'],
  'fr-2016': ['CM012'],
  'fr-ch': ['PR-6'],
}
export default class ComplementA100 extends Exercice {
  constructor() {
    super()

    this.besoinFormulaireNumerique = [
      "Type d'écriture",
      2,
      `   1 : 100 - n = ...
    2 : n + ... = 100`,
    ]
    this.sup = 1
    this.consigne = 'Calculer.'

    this.nbCols = 2
    this.nbColsCorr = 2
  }

  nouvelleVersion() {
    for (
      let i = 0, texte, texteCorr, a, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(11, 89)
      this.sup === 1 ? (texte = `$100-${a}=$`) : (texte = `$${a}+...=100$`)
      this.sup === 1
        ? (texteCorr = `$100-${a}=${miseEnEvidence(texNombre(100 - a))}$`)
        : (texteCorr = `$${a}+ ${miseEnEvidence(texNombre(100 - a))}=100$`)
      setReponse(this, i, 100 - a)
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
