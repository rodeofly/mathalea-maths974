import type Exercice from '../../exercices/Exercice'
import { context } from '../../modules/context'
import { addElement, get } from '../html/dom'
import { verifQuestionCliqueFigure } from './cliqueFigure'
import { verifQuestionMathLive } from './mathLive'
import { verifQuestionQcm } from './qcm'

export interface ButtonWithMathaleaListener extends HTMLButtonElement {
  hasMathaleaListener: boolean
}
export function gestionCan(exercice: Exercice) {
  context.nbBonnesReponses = 0
  context.nbMauvaisesReponses = 0
  for (let i = 0; i < exercice.nbQuestions; i++) {
    const button1question = document.querySelector(
      `#boutonVerifexercice${exercice.numeroExercice}Q${i}`,
    ) as ButtonWithMathaleaListener
    if (button1question) {
      if (!button1question.hasMathaleaListener) {
        button1question.addEventListener('click', () => {
          let resultat
          if (exercice.interactifType === 'mathLive') {
            resultat = verifQuestionMathLive(exercice, i)?.isOk ? 'OK' : 'KO'
          }
          if (exercice.interactifType === 'qcm') {
            resultat = verifQuestionQcm(exercice, i)
          }
          if (exercice.interactifType === 'cliqueFigure') {
            resultat = verifQuestionCliqueFigure(exercice, i)
          }
          if (
            exercice.interactifType === 'custom' &&
            exercice.correctionInteractive
          ) {
            resultat = exercice.correctionInteractive(i)
          }
          if (exercice.interactifType === 'qcm_mathLive')
            throw Error(
              "qcm_mathLive ça n'existe pas comme formatInteractif, c'est qcm ou mathlive",
            )
          /*  if (exercice.autoCorrection[i]?.propositions != null) {
              resultat = verifQuestionQcm(exercice, i)
            } else {
              resultat = verifQuestionMathLive(this, i).isOk ? 'OK' : 'KO'
            }
          }
           */
          // Mise en couleur du numéro de la question dans le menu du haut
          if (resultat === 'OK') {
            document
              .getElementById(`btnMenuexercice${exercice.numeroExercice}Q${i}`)
              ?.classList.add('green')
            context.nbBonnesReponses++
          }
          if (resultat === 'KO') {
            document
              .getElementById(`btnMenuexercice${exercice.numeroExercice}Q${i}`)
              ?.classList.add('red')
            context.nbMauvaisesReponses++
          }
          if (resultat === 'OK' || resultat === 'KO') {
            button1question.classList.add('disabled')
            if (exercicesCanRestants().length) {
              ;(exercicesCanDispoApres() as HTMLButtonElement).click()
            } else {
              afficheScoreCan(
                exercice,
                context.nbBonnesReponses,
                context.nbMauvaisesReponses,
              )
            }
          }
        })
        button1question.hasMathaleaListener = true
      }
    }
  }
}

const exercicesCanRestants = () =>
  document.querySelectorAll(
    '[id ^= "btnMenuexercice"].circular.ui.button:not(.green):not(.red)',
  )
const exercicesCanDispoApres = () => {
  const liste = Array.from(document.querySelectorAll('[id^=btnMenu]'))
  for (let i = Number(context.questionCanEnCours); i < liste.length; i++) {
    if (
      !liste[i].classList.contains('red') &&
      !liste[i].classList.contains('green')
    ) {
      return liste[i]
    }
  }
  return exercicesCanRestants()[0]
}

export function afficheScoreCan(
  exercice: Exercice,
  nbBonnesReponses: number,
  nbMauvaisesReponses: number,
) {
  // const exercice = { id: 'can', sup: document.location.href + 'serie=' + context.graine }
  const divMenuEval = document.querySelector('#menuEval') as HTMLDivElement
  if (divMenuEval) {
    const divScore = addElement(divMenuEval, 'div', {
      className: 'score',
      id: 'scoreTotal',
    })
    divScore.innerHTML = `Résultat : ${nbBonnesReponses} / ${nbBonnesReponses + nbMauvaisesReponses}`
    window.parent.postMessage(
      {
        url: window.location.href,
        graine: context.graine,
        titre: exercice.titre,
        nbBonnesReponses,
        nbMauvaisesReponses,
      },
      '*',
    )
    // Arrête le timer
    if (context.timer) {
      clearInterval(context.timer)
      // ToDo à sauvegarder dans les résultats
      // const tempsRestant = document.getElementById('timer').innerText
    }
    divScore.style.color = '#f15929'
    divScore.style.fontWeight = 'bold'
    divScore.style.fontSize = 'xx-large'
    divScore.style.marginTop = '20px'
    document.querySelectorAll('[id^=divexcorr]').forEach((e) => {
      ;(e as HTMLDivElement).style.display = 'block'
    })
    const divCorr = get('corrections')
    divCorr.style.display = 'block'
    ;(
      document.getElementById('btnMenuexercice0Q0') as HTMLButtonElement
    ).click()
  } else {
    console.error('divMenuEval non trouvé')
  }
}
