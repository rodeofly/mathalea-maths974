import Question1 from '../can/TSpe/canTSpeS01'
import Question2 from '../can/TSpe/canTSpeS02'
import Question3 from '../can/TSpe/canTSpeS03'
import Question4 from '../can/TSpe/canTSpeS04'
import Question5 from '../can/TSpe/canTSpeS05'
import Question6 from '../can/TSpe/canTSpeS06'
import Question7 from '../can/TSpe/canTSpeS07'
import Question8 from '../can/TSpe/canTSpeS08'
import Question9 from '../can/TSpe/canTSpeS09'

import Exercice from '../Exercice'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'

export const titre = 'Limites de suites'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'ff9d1'
export const refs = {
  'fr-fr': ['TSA1-00'],
  'fr-ch': [],
}
export const dateDePublication = '16/08/2024'
export const dateDeModifImportante = '26/10/2024'

/**
 * compilation des cans de terminale sur les suites
 * @author Jean-Claude Lhote
 */

const questions = [
  Question1,
  Question2,
  Question3,
  Question4,
  Question5,
  Question6,
  Question7,
  Question8,
  Question9,
]

export default class LimitesSuites extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 5
    this.comment =
      'Il y a 9 types de questions différentes correspondant aux exercices canTSpeS01 à canTSpeS09.'
  }

  nouvelleVersion() {
    const exos = combinaisonListes(questions, this.nbQuestions)
    for (let i = 0, index = 0; i < this.nbQuestions; ) {
      const Exo = exos[index]
      const question = new Exo()
      question.nouvelleVersion()
      const texte = question.question as string
      const texteCorr = question.correction as string
      const reponse = question.reponse as string
      if (this.questionJamaisPosee(i, texteCorr)) {
        this.listeQuestions[i] =
          texte + ajouteChampTexteMathLive(this, i, KeyboardType.lycee)
        this.listeCorrections[i] = texteCorr
        handleAnswers(this, i, { reponse: { value: reponse } })
        i++
      }
      index++
    }
  }
}
