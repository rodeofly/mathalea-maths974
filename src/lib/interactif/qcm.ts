import type Exercice from '../../exercices/Exercice'
import { context } from '../../modules/context'
import { messageFeedback } from '../../modules/messages'
import { shuffleJusquaWithIndexes } from '../amc/qcmCam'
import { get } from '../html/dom'
import {
  barreTexte,
  miseEnEvidence,
  texteEnCouleurEtGras,
  texteGras,
} from '../outils/embellissements'
import { lettreDepuisChiffre } from '../outils/outilString'
import { afficheScore } from './afficheScore'
import type { ButtonWithMathaleaListener } from './gestionCan'
import type { UneProposition } from './gestionInteractif'

export function verifQuestionQcm(exercice: Exercice, i: number) {
  let resultat
  // i est l'indice de la question
  let nbBonnesReponses = 0
  let nbMauvaisesReponses = 0
  let nbBonnesReponsesAttendues = 0
  if (exercice.answers == null) {
    exercice.answers = {}
  }
  // Compte le nombre de réponses justes attendues
  const nbReps = exercice.autoCorrection[i].propositions?.length ?? 0
  for (let k = 0; k < nbReps; k++) {
    if (exercice.autoCorrection[i]!.propositions![k].statut) {
      nbBonnesReponsesAttendues++
    }
  }
  const divReponseLigne = document.querySelector(
    `#resultatCheckEx${exercice.numeroExercice}Q${i}`,
  ) as HTMLDivElement
  exercice.autoCorrection[i]!.propositions!.forEach((proposition, indice) => {
    // La liste de question peut être plus courte que autoCorrection si on n'a pas réussi à générer suffisamment de questions différentes
    // if (exercice.listeQuestions[i] !== undefined) {
    // On a des exercices comme 6S10-1 où il y a 2 questions... mais 6 qcm !
    const label = document.querySelector(
      `#labelEx${exercice.numeroExercice}Q${i}R${indice}`,
    ) as HTMLLabelElement
    const check = document.querySelector(
      `#checkEx${exercice.numeroExercice}Q${i}R${indice}`,
    ) as HTMLInputElement
    if (check != null) {
      if (check.checked) {
        // Sauvegarde pour les exports Moodle, Capytale...
        exercice.answers![`Ex${exercice.numeroExercice}Q${i}R${indice}`] = '1'
        // Gestion du feedback de toutes les cases cochées
        if (exercice.autoCorrection[i].propositions![indice].feedback) {
          messageFeedback({
            id: `feedbackEx${exercice.numeroExercice}Q${i}R${indice}`,
            message: exercice.autoCorrection[i].propositions![indice].feedback,
            type: proposition.statut ? 'positive' : 'error',
          })
        }
      } else {
        exercice.answers![`Ex${exercice.numeroExercice}Q${i}R${indice}`] = '0'
      }
      if (proposition.statut) {
        if (check.checked === true) {
          nbBonnesReponses++
          label.classList.add('bg-coopmaths-warn-100', 'rounded-lg', 'p-1')
        } else {
          // Bonnes réponses non cochées
          label.classList.add('bg-coopmaths-warn-100', 'rounded-lg', 'p-1')
        }
      } else if (check.checked === true) {
        label.classList.add('bg-coopmaths-action-200', 'rounded-lg', 'p-1')
        nbMauvaisesReponses++
      }
      check.disabled = true
    }
  })
  let typeFeedback = 'positive'
  if (
    nbMauvaisesReponses === 0 &&
    nbBonnesReponses === nbBonnesReponsesAttendues
  ) {
    if (divReponseLigne) divReponseLigne.innerHTML = '😎'
    resultat = 'OK'
  } else {
    if (divReponseLigne) divReponseLigne.innerHTML = '☹️'
    typeFeedback = 'error'
    resultat = 'KO'
  }
  // Gestion du feedback global de la question
  if (divReponseLigne) divReponseLigne.style.fontSize = 'large'
  const eltFeedback = get(`feedbackEx${exercice.numeroExercice}Q${i}`, false)
  let message = ''
  if (eltFeedback) {
    eltFeedback.innerHTML = ''
  }
  if (resultat === 'KO') {
    // Juste mais incomplet
    if (
      nbBonnesReponses > 0 &&
      nbMauvaisesReponses === 0 &&
      nbBonnesReponses < nbBonnesReponsesAttendues
    ) {
      message = `${nbBonnesReponses} bonne${nbBonnesReponses > 1 ? 's' : ''} réponse${nbBonnesReponses > 1 ? 's' : ''}`
    } else if (nbBonnesReponses > 0 && nbMauvaisesReponses > 0) {
      // Du juste et du faux
      message = `${nbMauvaisesReponses} erreur${nbMauvaisesReponses > 1 ? 's' : ''}`
    } else if (nbBonnesReponses === 0 && nbMauvaisesReponses > 0) {
      // Que du faux
      message = `${nbMauvaisesReponses} erreur${nbMauvaisesReponses > 1 ? 's' : ''}`
    }
  } else {
    message = ''
  }
  if (nbBonnesReponsesAttendues > nbBonnesReponses) {
    message += ` ${nbBonnesReponsesAttendues - nbBonnesReponses} bonne${nbBonnesReponsesAttendues - nbBonnesReponses > 1 ? 's' : ''} réponse${nbBonnesReponsesAttendues - nbBonnesReponses > 1 ? 's' : ''} manquante${nbBonnesReponsesAttendues - nbBonnesReponses > 1 ? 's' : ''}`
  }
  if (message !== '') {
    messageFeedback({
      id: `resultatCheckEx${exercice.numeroExercice}Q${i}`,
      message,
      type: typeFeedback,
    })
  }
  return resultat
}

/**
 * @param {exercice}
 * @param {number} i indice de la question
 * @param {{style: string, format: string}} [options]
 * @returns {{texte: string, texteCorr: string}} {texte, texteCorr} le texte à ajouter pour la question traitée
 */
export function propositionsQcm(
  exercice: Exercice,
  i: number,
  options: { style: string; format: string } = { style: '', format: 'case' },
) {
  /**
   * Mélange les éléments d'un tableau jusqu'à un certain index et laisse les suivants inchangés.
   * @param {Array} array - Le tableau à mélanger.
   * @param {number} lastChoice - L'index jusqu'auquel mélanger les éléments.
   * @returns {{shuffledArray: Array, indexes: Array}} - Le tableau mélangé et les index des anciens éléments dans le nouvel ordre.
   */
  const indexes = []
  let texte = ''
  let texteCorr = ''
  let espace = ''
  let nbCols = 1
  let vertical = false
  const classCss =
    options?.style != null && options.style !== ''
      ? `class="ml-2" style="${options.style};" `
      : 'class="ml-2"'
  if (context.isAmc) return { texte: '', texteCorr: '' }
  if (exercice?.autoCorrection[i]?.propositions === undefined) {
    window.notify(
      'propositionsQcm a reçu une liste de propositions undefined',
      {
        autoCrorrection: exercice?.autoCorrection[i],
        propositions: exercice?.autoCorrection[i].propositions,
      },
    )
    return { texte: '', texteCorr: '' }
  } else if (exercice.autoCorrection[i].propositions.length === 0) {
    window.notify('propositionsQcm a reçu une liste de propositions vide', {
      autoCrorrection: exercice.autoCorrection[i],
      propositions: exercice.autoCorrection[i].propositions,
    })
    return { texte: '', texteCorr: '' }
  } else if (exercice.autoCorrection[i].propositions.length === 1) {
    window.notify(
      'propositionsQcm a reçu une liste de propositions de taille 1',
      {
        autoCrorrection: exercice.autoCorrection[i],
        propositions: exercice.autoCorrection[i].propositions,
      },
    )
    return { texte: '', texteCorr: '' }
  }

  // On regarde si il n'y a pas de doublons dans les propositions de réponse. Si c'est le cas, on enlève les mauvaises réponses en double.
  elimineDoublons(exercice.autoCorrection[i].propositions)
  if (context.isHtml) {
    espace = '&emsp;'
    if (exercice?.autoCorrection[i].reponse == null) {
      exercice.autoCorrection[i].reponse = {}
    }
    if (exercice.autoCorrection[i].reponse.param == null) {
      exercice.autoCorrection[i].reponse.param = {}
    }
    exercice.autoCorrection[i].reponse.param.formatInteractif = 'qcm'
  } else {
    espace = '\\qquad '
  }
  // Mélange les propositions du QCM sauf celles à partir de lastchoice (inclus)
  const lastChoice = Math.min(
    exercice.autoCorrection[i].options?.lastChoice ??
      exercice.autoCorrection[i].propositions.length,
    exercice.autoCorrection[i].propositions.length - 1,
  )
  vertical = exercice.autoCorrection[i].options?.vertical ?? false // est-ce qu'on veut une présentation en colonnes ?
  nbCols = Math.min(exercice.autoCorrection[i].options?.nbCols ?? 1, 1)
  const isTrueFalse =
    exercice.autoCorrection[i].propositions.some(
      (prop) => prop.texte === 'Vrai',
    ) &&
    exercice.autoCorrection[i].propositions.some(
      (prop) => prop.texte === 'Faux',
    )
  if (isTrueFalse) {
    // Si on a les réponses Vrai et Faux, on les met en premier
    const vrai = exercice.autoCorrection[i].propositions.findIndex(
      (prop) => prop.texte === 'Vrai',
    )
    const faux = exercice.autoCorrection[i].propositions.findIndex(
      (prop) => prop.texte === 'Faux',
    )
    if (vrai !== -1 && faux !== -1) {
      // On les met en premier
      const vraiProp = exercice.autoCorrection[i].propositions[vrai]
      const fauxProp = exercice.autoCorrection[i].propositions[faux]
      exercice.autoCorrection[i].propositions.splice(vrai, 1)
      exercice.autoCorrection[i].propositions.splice(faux - 1, 1)
      exercice.autoCorrection[i].propositions.unshift(fauxProp)
      exercice.autoCorrection[i].propositions.unshift(vraiProp)
    }
  }
  if (!exercice.autoCorrection[i].options?.ordered && !isTrueFalse) {
    const melange = shuffleJusquaWithIndexes(
      exercice.autoCorrection[i].propositions,
      lastChoice,
    )
    exercice.autoCorrection[i].propositions = melange.shuffledArray
    indexes.push(...melange.indexes)
  }
  if (!context.isHtml) {
    const formateQ = (format: string, rep: number) => {
      if (format == null || format === 'case') return '$\\square\\;$'
      if (format === 'lettre') {
        return `${texteGras(lettreDepuisChiffre(rep + 1))}.`
      }
      return `${texteGras(lettreDepuisChiffre(rep + 1))}$\\square\\;$`
    }
    const formateRV = (format: string, rep: number) => {
      if (format == null || format === 'case') return '$\\blacksquare\\;$'
      if (format === 'lettre') {
        return `${texteEnCouleurEtGras(lettreDepuisChiffre(rep + 1))}.`
      }
      return `${texteEnCouleurEtGras(lettreDepuisChiffre(rep + 1))}$\\blacksquare\\;$`
    }
    const formateRF = (format: string, rep: number) => {
      if (format == null || format === 'case') return '$\\square\\;$'
      if (format === 'lettre') {
        return `$${miseEnEvidence(`\\cancel{\\text{${lettreDepuisChiffre(rep + 1)}}}`, 'black')}$.`
      }
      return `$${miseEnEvidence(`\\cancel{\\text{${lettreDepuisChiffre(rep + 1)}}}`, 'black')}\\square\\;$`
    }
    texte += nbCols === 1 ? '\t' : `\n\n\\begin{multicols}{${nbCols}}\n\t`
    texteCorr += nbCols === 1 ? '\t' : `\n\n\\begin{multicols}{${nbCols}}\n\t`
    for (
      let rep = 0;
      rep < exercice.autoCorrection[i].propositions.length;
      rep++
    ) {
      texte += `${formateQ(options?.format, rep)} ${exercice.autoCorrection[i].propositions[rep].texte}`
      if (exercice.autoCorrection[i].propositions[rep].statut) {
        texteCorr += `${formateRV(options?.format, rep)} ${exercice.autoCorrection[i].propositions[rep].texte}`
      } else {
        texteCorr += `${formateRF(options?.format, rep)} ${exercice.autoCorrection[i].propositions[rep].texte}`
      }
      if (vertical) {
        texte += '\\\\\n\t'
        texteCorr += '\\\\\n\t'
      } else {
        texte += '\\qquad '
        texteCorr += '\\qquad '
      }
    }
    texte += nbCols === 1 ? '' : '\\end{multicols}'
    texteCorr += nbCols === 1 ? '' : '\\end{multicols}'
  }
  if (context.isHtml) {
    const isRadio = exercice.autoCorrection[i].options?.radio ?? false
    const formateQ = (format: string, rep: number) => {
      if (format == null || format === 'case') { return `<input type="${isRadio ? 'radio' : 'checkbox'}" name="checkEx${exercice.numeroExercice}Q${i}" ${exercice.interactif ? '' : 'disabled'} tabindex="0" style="height: 1rem; width: 1rem;" class="disabled:cursor-default" id="checkEx${exercice.numeroExercice}Q${i}R${rep}">` }
      if (format === 'lettre') {
        return `<label ${classCss} >${texteGras(lettreDepuisChiffre(rep + 1))}.</label>`
      }
      return `<input type="${isRadio ? 'radio' : 'checkbox'}" name="checkEx${exercice.numeroExercice}Q${i}" ${exercice.interactif ? '' : 'disabled'} tabindex="0" style="height: 1rem; width: 1rem;" class="disabled:cursor-default" id="checkEx${exercice.numeroExercice}Q${i}R${rep}"><label ${classCss} >${lettreDepuisChiffre(rep + 1)}.</label>`
    }
    const formateRV = (format: string, rep: number) => {
      if (format == null || format === 'case') { return `<input type="${isRadio ? 'radio' : 'checkbox'}" name="checkEx${exercice.numeroExercice}Q${i}" tabindex="0" style="height: 1rem; width: 1rem;" class="disabled:cursor-default" checked>` }
      if (format === 'lettre') {
        return `<label ${classCss} >${texteEnCouleurEtGras(lettreDepuisChiffre(rep + 1))}.</label>`
      }
      return `<input type="${isRadio ? 'radio' : 'checkbox'}" name="checkEx${exercice.numeroExercice}Q${i}" ${exercice.interactif ? '' : 'disabled'} tabindex="0" style="height: 1rem; width: 1rem;" class="disabled:cursor-default" checked><label ${classCss} >${texteEnCouleurEtGras(lettreDepuisChiffre(rep + 1))}.</label>`
    }
    const formateRF = (format: string, rep: number) => {
      if (format == null || format === 'case') { return `<input type="${isRadio ? 'radio' : 'checkbox'}" name="checkEx${exercice.numeroExercice}Q${i}" tabindex="0" style="height: 1rem; width: 1rem;" class="disabled:cursor-default">` }
      if (format === 'lettre') {
        return `<label ${classCss} >${texteGras(`${barreTexte(lettreDepuisChiffre(rep + 1))}`)}.</label>`
      }
      return `<input type="${isRadio ? 'radio' : 'checkbox'}" name="checkEx${exercice.numeroExercice}Q${i}" ${exercice.interactif ? '' : 'disabled'} tabindex="0" style="height: 1rem; width: 1rem;" class="disabled:cursor-default"><label ${classCss} >$${miseEnEvidence(`\\cancel{${lettreDepuisChiffre(rep + 1)}}`, 'black')}$.</label>`
    }

    texte = '<div class="my-3">'
    texteCorr = '<div class="my-3">'
    for (
      let rep = 0;
      rep < exercice.autoCorrection[i].propositions.length;
      rep++
    ) {
      if (nbCols > 1 && rep % nbCols === 0) texte += '<br>'
      texte += `<div class="ex${exercice.numeroExercice} ${vertical ? '' : 'inline-block'} my-2 align-center">
      ${formateQ(options?.format, rep)}
      <label id="labelEx${exercice.numeroExercice}Q${i}R${rep}" ${classCss} >${exercice.autoCorrection[i].propositions[rep].texte + espace}</label>
      <div id="feedbackEx${exercice.numeroExercice}Q${i}R${rep}" ${vertical ? '' : 'class="inline"'}></div></div>`
      texteCorr += `<div class="${vertical ? '' : 'inline-block'}">
    ${
      exercice.autoCorrection[i].propositions[rep].statut
        ? formateRV(options?.format, rep)
        : formateRF(options?.format, rep)
    }
      <label id="labelEx${exercice.numeroExercice}Q${i}R${rep}" ${classCss} >${exercice.autoCorrection[i].propositions[rep].texte + espace}</label>
      </div>`
    }
    texte += `</div><div class="m-2" id="resultatCheckEx${exercice.numeroExercice}Q${i}"></div>`
    texteCorr += '</div><div class="m-2"></div>'
  }
  if (!context.isHtml) {
    texte =
      ` 
    
    ` + texte
    texteCorr =
      ` 
    
    ` + texteCorr
  }
  return { texte, texteCorr, indexes }
}

/**
 * Lorsque l'évènement 'exercicesAffiches' est lancé par mathalea.js
 * on vérifie la présence du bouton de validation d'id btnValidationEx{i} créé par listeQuestionsToContenu
 * et on y ajoute un listenner pour vérifier les réponses cochées
 * @param {object} exercice
 */
export function exerciceQcm(exercice: Exercice) {
  document.addEventListener('exercicesAffiches', () => {
    // On vérifie le type si jamais il a été changé après la création du listenner (voir 5R20)
    if (exercice.interactifType === 'qcm') {
      const button = document.querySelector(
        `#btnValidationEx${exercice.numeroExercice}-${exercice.id}`,
      ) as ButtonWithMathaleaListener
      if (button) {
        if (!button.hasMathaleaListener) {
          button.addEventListener('click', () => {
            let nbQuestionsValidees = 0
            let nbQuestionsNonValidees = 0
            for (let i = 0; i < exercice.autoCorrection.length; i++) {
              const resultat = verifQuestionQcm(exercice, i)
              resultat === 'OK'
                ? nbQuestionsValidees++
                : nbQuestionsNonValidees++
            }
            const uichecks = document.querySelectorAll(
              `.ui.checkbox.ex${exercice.numeroExercice}`,
            )
            for (const uicheck of uichecks) {
              uicheck.classList.add('read-only')
            }
            button.classList.add('disabled')
            afficheScore(exercice, nbQuestionsValidees, nbQuestionsNonValidees)
          })
          button.hasMathaleaListener = true
        }
      }
    }
  })
}

/**
 * prend un tableau de propositions [{texte: 'prop1', statut: true, feedback: 'Correct !'}, {texte: 'prop2', statut: false, ....}
 * élimine en cas de doublon la proposition fausse ou la deuxième proposition si elle sont toutes les deux fausses.
 * @author Jean-Claude Lhote
 */
export function elimineDoublons(propositions: UneProposition[]) {
  // fonction qui va éliminer les doublons si il y en a
  let doublonsTrouves = false
  for (let i = 0; i < propositions.length - 1; i++) {
    for (let j = i + 1; j < propositions.length; ) {
      if (propositions[i].texte === propositions[j].texte) {
        // les réponses i et j sont les mêmes
        doublonsTrouves = true
        if (propositions[i].statut) {
          // si la réponse i est bonne, on vire la j
          propositions.splice(j, 1)
        } else if (propositions[j].statut) {
          // si la réponse i est mauvaise et la réponse j bonne,
          // comme ce sont les mêmes réponses, on vire la j mais on met la i bonne
          propositions.splice(j, 1)
          propositions[i].statut = true
        } else {
          // Les deux réponses sont mauvaises
          propositions.splice(j, 1)
        }
      } else {
        j++
      }
    }
  }
  return doublonsTrouves
}
