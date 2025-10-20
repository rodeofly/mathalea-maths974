import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { toutPourUnPoint } from '../../../lib/interactif/mathLive'
import type Exercice from '../../Exercice'
import type { MathfieldElement } from 'mathlive'
import { texNombre } from '../../../lib/outils/texNombre'
import { generateCleaner } from '../../../lib/interactif/comparisonFunctions'

export const titre = 'Trouver un produit égal à 1000'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '2e480'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N6Q12 extends ExerciceCan {
  enonce(c?: number) {
    if (c == null) {
      c = randint(1, 9) * 100
    }

    this.formatInteractif = 'fillInTheBlank'
    const callback = (exercice: Exercice, question: number) => {
      const mfe = document.querySelector(
        `#champTexteEx${exercice.numeroExercice}Q${question}`,
      ) as MathfieldElement
      const cleaner = generateCleaner(['virgules'])
      if (mfe == null)
        return {
          isOk: false,
          feedback: '',
          score: { nbBonnesReponses: 0, nbReponses: 0 },
        }
      const a = Number(cleaner(mfe.getPromptValue('champ1')) || 0)
      const b = Number(cleaner(mfe.getPromptValue('champ2')) || 0)
      const isOk = a * b === c
      if (isOk) {
        mfe.setPromptState('champ1', 'correct', true)
        mfe.setPromptState('champ2', 'correct', true)
      }
      const spanReponseLigne = document.querySelector(
        `#resultatCheckEx${exercice.numeroExercice}Q${question}`,
      )
      if (spanReponseLigne != null) {
        spanReponseLigne.innerHTML = isOk ? '😎' : '☹️'
      }
      return {
        isOk,
        feedback: '',
        score: { nbBonnesReponses: isOk ? 1 : 0, nbReponses: 1 },
      }
    }
    this.reponse = { bareme: toutPourUnPoint, callback }
    this.consigne = 'Complète.'
    this.canEnonce = this.consigne
    this.question = `${texNombre(c, 0)}= %{champ1}\\times %{champ2}`

    this.correction = `Par exemple, $${miseEnEvidence(2)}\\times ${miseEnEvidence(`${texNombre(c / 2, 0)}`)}=${texNombre(c, 0)}$.`
    this.canReponseACompleter = `$${texNombre(c, 0)}=\\ldots\\times \\ldots$`
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce(1000) : this.enonce()
  }
}
