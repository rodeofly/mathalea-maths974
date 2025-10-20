import Exercice from '../../Exercice'

import { randint, listeQuestionsToContenu } from '../../../modules/outils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { remplisLesBlancs } from '../../../lib/interactif/questionMathLive'
import { handleAnswers } from '../../../lib/interactif/gestionInteractif'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Trouver deux entiers consécutifs'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '12/09/2024'
export const uuid = '58784'
export const refs = {
  'fr-fr': ['can2C18'],
  'fr-ch': ['10FA3-13'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class entiersConsecutifs extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
    this.spacing = 1.5
    // this.optionsDeComparaison = { ensembleDeNombres: true }
  }

  nouvelleVersion() {
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      const n1 = randint(-20, 20, [0, 1, 2, 3, 4, 5, 6, 7])
      const n2 = n1 + 1
      texte = `La somme de deux entiers consécutifs est $${n1 + n2}$.<br>
    Quels sont ces deux entiers ? `
      if (this.interactif) {
        texte +=
          '<br>' +
          remplisLesBlancs(
            this,
            i,
            '\\text{ Le plus petit est : } %{champ1} \\text{ et le plus grand est : } %{champ2}',
            KeyboardType.clavierDeBase,
          )
      }
      this.correction = `Si on retranche $1$ au plus grand des deux nombres, il devient égal au plus petit et la somme est diminuée de $1$.<br>
Ainsi le double du plus petit nombre est $${n1 + n2 - 1}$.<br>
          $${n1 + n2 - 1}\\div 2=${n1}$. <br>
          Le plus petit nombre est $${miseEnEvidence(texNombre(n1, 0))}$ et le plus grand est $${miseEnEvidence(texNombre(n2, 0))}$.
          `

      handleAnswers(this, i, {
        bareme: (listePoints) => [Math.min(listePoints[0], listePoints[1]), 1],
        champ1: { value: `${n1}` },
        champ2: { value: `${n2}` },
      })
      this.canEnonce = texte
      this.canReponseACompleter = '$\\ldots$ et $\\ldots$'
      if (this.questionJamaisPosee(i, n1, n2)) {
        this.listeCorrections[i] = this.correction
        this.listeQuestions[i] = texte
        this.listeCanEnonces[i] = this.canEnonce
        this.listeCanReponsesACompleter[i] = this.canReponseACompleter
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
