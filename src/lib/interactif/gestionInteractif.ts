import Decimal from 'decimal.js'
import FractionEtendue from '../../modules/FractionEtendue'
import Grandeur from '../../modules/Grandeur'
import { addElement, get, setStyles } from '../html/dom'
import {
  fonctionComparaison,
  // fractionCompare,
  // equalFractionCompare,
  // simplerFractionCompare,
  // hmsCompare,
  // intervalCompare,
  // numberCompare,
  // powerCompare,
  // scientificCompare,
  // unitsCompare,
  // texteAvecCasseCompare,
  // texteSansCasseCompare,
  // expressionDeveloppeeEtNonReduiteCompare,
  // expressionDeveloppeeEtReduiteCompare,
  type CompareFunction,
  type OptionsComparaisonType,
} from './comparisonFunctions'
import { verifQuestionMathLive } from './mathLive'
import { verifQuestionQcm } from './qcm'
import { verifQuestionListeDeroulante } from './questionListeDeroulante'
// import Hms from '../../modules/Hms'
import type Figure from 'apigeom/src/Figure'
import type Exercice from '../../exercices/Exercice'
import type { OldFormatInteractifType } from '../../exercices/Exercice'
import MetaExercice from '../../exercices/MetaExerciceCan'
import { context } from '../../modules/context'
import Hms from '../../modules/Hms'
import type { InteractivityType } from '../types'
import { afficheScore, type ResultOfExerciceInteractif } from './afficheScore'
import { verifDragAndDrop } from './DragAndDrop'
export interface ReponseParams {
  digits?: number
  decimals?: number
  signe?: boolean
  exposantNbChiffres?: number
  exposantSigne?: boolean
  approx?: number | 'intervalleStrict'
  aussiCorrect?: number | FractionEtendue
  digitsNum?: number
  digitsDen?: number
  basePuissance?: number
  exposantPuissance?: number
  baseNbChiffres?: number
  milieuIntervalle?: number
  formatInteractif?: InteractivityType | OldFormatInteractifType
  precision?: number
  scoreapprox?: number
  vertical?: boolean
  strict?: boolean
  vhead?: boolean
  tpoint?: string
}

/** les figures cliquables pour une question donnée */
export type clickFigures = { id: string; solution: boolean }[]

export type AnswerType = {
  value: AnswerValueType
  compare?: CompareFunction
  options?: OptionsComparaisonType
}

export type AnswerNormalizedType = {
  value: string | string[]
  compare?: CompareFunction
  options?: OptionsComparaisonType
}

export interface Valeur {
  bareme?: (listePoints: number[]) => [number, number]
  feedback?: (saisies: Record<string, string>) => string
  reponse?: AnswerType
  champ1?: AnswerType
  champ2?: AnswerType
  champ3?: AnswerType
  champ4?: AnswerType
  champ5?: AnswerType
  champ6?: AnswerType
  rectangle1?: AnswerType
  rectangle2?: AnswerType
  rectangle3?: AnswerType
  rectangle4?: AnswerType
  rectangle5?: AnswerType
  rectangle6?: AnswerType
  rectangle7?: AnswerType
  rectangle8?: AnswerType

  // on va aller jusque 8 pour l'instant, si besoin on en ajoutera
  L1C1?: AnswerType
  L1C2?: AnswerType
  L1C3?: AnswerType
  L2C1?: AnswerType
  L2C2?: AnswerType
  L2C3?: AnswerType
  L3C1?: AnswerType
  L3C2?: AnswerType
  L3C3?: AnswerType

  // idem on en ajoutera si besoin
  callback?: (
    exercice: Exercice,
    question: number,
    variables: [string, AnswerType][],
    bareme: (listePoints: number[]) => [number, number],
  ) => {
    isOk: boolean
    feedback: string
    score: { nbBonnesReponses: number; nbReponses: number }
  }
}
/**
 * Puisque tous les attributs de Valeur sont facultatifs, on vérifie juste si c'est un objet (et ce type est assez inutile du coup car quasiment identique à un unknown)
 */
export function isValeur(value: unknown): value is Valeur {
  return typeof value === 'object'
}

export interface ValeurNormalized {
  bareme?: (listePoints: number[]) => [number, number]
  feedback?: (saisies: object) => string
  reponse?: AnswerNormalizedType
  champ1?: AnswerNormalizedType
  champ2?: AnswerNormalizedType
  champ3?: AnswerNormalizedType
  champ4?: AnswerNormalizedType
  champ5?: AnswerNormalizedType
  champ6?: AnswerNormalizedType
  rectangle1?: AnswerNormalizedType
  rectangle2?: AnswerNormalizedType
  rectangle3?: AnswerNormalizedType
  rectangle4?: AnswerNormalizedType
  rectangle5?: AnswerNormalizedType
  rectangle6?: AnswerNormalizedType
  rectangle7?: AnswerNormalizedType
  rectangle8?: AnswerNormalizedType

  // on va aller jusque 6 pour l'instant, si besoin on en ajoutera
  L1C1?: AnswerNormalizedType
  L1C2?: AnswerNormalizedType
  L2C1?: AnswerNormalizedType
  L2C2?: AnswerNormalizedType // idem on en ajoutera si besoin
  callback?: (
    exercice: Exercice,
    question: number,
    variables: [string, AnswerNormalizedType][],
    bareme: (listePoints: number[]) => [number, number],
  ) => {
    isOk: boolean
    feedback: string
    score: { nbBonnesReponses: number; nbReponses: number }
  }
}

export type AnswerValueType =
  | string
  | string[]
  | number
  | number[]
  | FractionEtendue
  | Decimal
  | Grandeur
  | Hms
  | Grandeur[]
  | Hms[]
  | Decimal[]
  | FractionEtendue[]
export function isAnswerValueType(value: unknown): value is AnswerValueType {
  return (
    typeof value === 'string' ||
    (Array.isArray(value) &&
      value.every((value) => typeof value === 'string')) ||
    typeof value === 'number' ||
    (Array.isArray(value) &&
      value.every((value) => typeof value === 'number')) ||
    value instanceof FractionEtendue ||
    (Array.isArray(value) &&
      value.every((value) => value instanceof FractionEtendue)) ||
    value instanceof Decimal ||
    (Array.isArray(value) &&
      value.every((value) => value instanceof Decimal)) ||
    value instanceof Grandeur ||
    (Array.isArray(value) &&
      value.every((value) => value instanceof Grandeur)) ||
    value instanceof Hms ||
    (Array.isArray(value) && value.every((value) => value instanceof Hms))
  )
}

export type ReponseComplexe = AnswerValueType | Valeur
export function isReponseComplexe(value: unknown): value is ReponseComplexe {
  return isAnswerValueType(value) || isValeur(value)
}

export type UneProposition = {
  texte?: string
  statut?: number | boolean | string
  sanscadre?: boolean | number
  multicolsBegin?: boolean
  multicolsEnd?: boolean
  numQuestionVisible?: boolean
  type?: string
  feedback?: string
  pointilles?: boolean | number
  enonce?: string
  propositions?: UneProposition[]
  options?: {
    ordered?: boolean
    vertical?: boolean
    lastChoice?: number
    barreseparation?: boolean
    multicols?: boolean
    nbCols?: number
    digits?: number
    decimals?: number
    signe?: boolean
    exposantNbChiffres?: number
    exposantSigne?: boolean
    approx?: number
    multicolsAll?: boolean
    numerotationEnonce?: boolean
    avecSymboleMult?: boolean
  }
  reponse?: {
    valeur?:
      | ValeurNormalized
      | ValeurNormalized[]
      | number
      | number[]
      | FractionEtendue
      | Decimal
      | FractionEtendue[]
      | Decimal[]
      | string
      | string[]
    param?: ReponseParams
    textePosition?: string
    texte?: string
    alignement?: string
  }
}

export type LegacyReponse = string | FractionEtendue | Decimal | number
export type LegacyReponses = LegacyReponse[] | LegacyReponse
export interface AutoCorrection {
  enonce?: string
  enonceAvant?: boolean
  melange?: boolean
  enonceAGauche?: boolean
  enonceAvantUneFois?: boolean
  enonceCentre?: boolean
  enonceApresNumQuestion?: boolean
  propositions?: UneProposition[]
  reponse?: {
    valeur?: ValeurNormalized
    param?: ReponseParams
    textePosition?: string
    texte?: string
  }
  options?: {
    radio?: boolean
    ordered?: boolean
    vertical?: boolean
    lastChoice?: number
    barreseparation?: boolean
    multicols?: boolean
    nbCols?: number
    digits?: number
    decimals?: number
    signe?: boolean
    exposantNbChiffres?: number
    exposantSigne?: boolean
    approx?: number
    multicolsAll?: boolean
    numerotationEnonce?: boolean
    avecSymboleMult?: boolean
  }
}

export interface MathaleaSVG extends SVGSVGElement {
  etat: boolean
  hasMathaleaListener: boolean
}

export function isClickFiguresArray(
  figures: Figure[] | clickFigures[],
): figures is clickFigures[] {
  return figures.length > 0 && Array.isArray(figures[0])
}

/**
 * Pour positionner le formatInteractif d'une question sur 'cliqueFigure'
 * On passe this.autoCorrection[i] c'est à dire l'objet réponse de la question.
 * à appeler après avoir rempli l'objet réponse qvec enonce et propositions
 * @param objetReponse
 */
export function setCliqueFigure(objetReponse: AutoCorrection) {
  objetReponse.reponse = {
    ...objetReponse.reponse,
    param: { formatInteractif: 'cliqueFigure' },
  }
}
/**
 * Pour positionner le formatInteractif d'une question sur 'qcm'
 * On passe this.autoCorrection[i] c'est à dire l'objet réponse de la question.
 * à appeler après avoir rempli l'objet réponse qvec enonce et propositions
 * @param objetReponse
 */
export function setQcm(objetReponse: AutoCorrection) {
  objetReponse.reponse = {
    ...objetReponse.reponse,
    param: { formatInteractif: 'qcm' },
  }
}
/**
 * Pour positionner le formatInteractif d'une question sur 'listeDeroulante'
 * On passe this.autoCorrection[i] c'est à dire l'objet réponse de la question.
 * à appeler après avoir rempli l'objet réponse qvec enonce et propositions
 * @param objetReponse
 */
export function setListeDeroulante(objetReponse: AutoCorrection) {
  objetReponse.reponse = {
    ...objetReponse.reponse,
    param: { formatInteractif: 'listeDeroulante' },
  }
}

/**
 * Cette fonction vérifie les réponses de chaque question en appelant la fonction associée à son formatInteractif ('mathlive', 'listeDeroulante', 'cliqueFigure', 'qcm')
 * @param {Exercice} exercice
 * @param {HTMLDivElement} divScore
 * @param {HTMLButtonElement} buttonScore
 * @returns {{numberOfPoints: number, numberOfQuestions: number}}
 */
export function exerciceInteractif(
  exercice: Exercice,
  divScore: HTMLDivElement,
  buttonScore: HTMLButtonElement,
): ResultOfExerciceInteractif {
  let nbQuestionsValidees = 0
  let nbQuestionsNonValidees = 0
  exercice.answers = {}
  if (exercice.interactifType === 'custom') {
    return verifExerciceCustom(exercice, divScore, buttonScore)
  }
  for (let i = 0; i < exercice.autoCorrection.length; i++) {
    const format = exercice.autoCorrection[i]?.reponse?.param?.formatInteractif
    let resultat: string
    switch (format) {
      case 'custom': {
        if (exercice instanceof MetaExercice) {
          const result = exercice.correctionInteractives[i](i)
          result === 'OK' ? nbQuestionsValidees++ : nbQuestionsNonValidees++
        }
        break
      }
      case 'dnd': {
        const result = verifDragAndDrop(exercice, i)
        nbQuestionsValidees += result.score.nbBonnesReponses
        nbQuestionsNonValidees +=
          result.score.nbReponses - result.score.nbBonnesReponses
        if (result.feedback !== '') {
          const spanFeedback = document.querySelector(
            `#feedbackEx${exercice.numeroExercice}Q${i}`,
          )
          if (spanFeedback != null) {
            spanFeedback.innerHTML = `💡 ${result.feedback}`
            spanFeedback.classList.add(
              'py-2',
              'italic',
              'text-coopmaths-warn-darkest',
              'dark:text-coopmathsdark-warn-darkest',
            )
          }
        }
        break
      }
      case 'qcm':
        resultat = verifQuestionQcm(exercice, i)
        resultat === 'OK' ? nbQuestionsValidees++ : nbQuestionsNonValidees++
        break
      case 'listeDeroulante': {
        resultat = verifQuestionListeDeroulante(exercice, i)
        resultat === 'OK' ? nbQuestionsValidees++ : nbQuestionsNonValidees++
        break
      }
      case 'cliqueFigure':
        if ('callback' in exercice && typeof exercice.callback === 'function') {
          resultat = verifQuestionCliqueFigure(
            exercice,
            i,
            exercice.callback as (exercice: Exercice, i: number) => void,
          )
        } else {
          resultat = verifQuestionCliqueFigure(exercice, i)
        }
        resultat === 'OK' ? nbQuestionsValidees++ : nbQuestionsNonValidees++
        break
      default:
        {
          const result = verifQuestionMathLive(exercice, i)
          if (result == null) {
            window.notify('erreur dans la correction de la question', {
              exercice,
              i,
            })
          } else {
            nbQuestionsValidees += result.score.nbBonnesReponses
            nbQuestionsNonValidees +=
              result.score.nbReponses - result.score.nbBonnesReponses
            if (result.feedback && result.feedback !== '') {
              const divFeedback = document.querySelector(
                `#feedbackEx${exercice.numeroExercice}Q${i}`,
              )
              if (divFeedback != null) {
                divFeedback.innerHTML = `💡 ${result.feedback}`
                divFeedback.classList.add(
                  'py-2',
                  'italic',
                  'text-coopmaths-warn-darkest',
                  'dark:text-coopmathsdark-warn-darkest',
                )
                ;(divFeedback as HTMLDivElement).style.display = 'block'
              }
            }
          }
        }
        break
    }
  }
  return afficheScore(
    exercice,
    nbQuestionsValidees,
    nbQuestionsNonValidees,
    divScore,
    buttonScore,
  )
}

/**
 * Le cas à part : un exercice custom fournit une fonction correctionInteractive qui doit corriger toutes les questions et s'occuper du feedback
 * @param exercice
 * @param divScore
 * @param buttonScore
 * @return {{numberOfPoints, numberOfQuestions: *}}
 */
function verifExerciceCustom(
  exercice: Exercice,
  divScore: HTMLDivElement,
  buttonScore: HTMLButtonElement,
) {
  let nbBonnesReponses = 0
  let nbMauvaisesReponses = 0
  // Le get est non strict car on sait que l'élément n'existe pas à la première itération de l'exercice
  let eltFeedback = get(`feedbackEx${exercice.numeroExercice}`, false)
  // On ajoute le div pour le feedback
  if (!eltFeedback) {
    const eltExercice = get(
      `exercice${exercice.numeroExercice}`,
    ) as HTMLDivElement
    eltFeedback = addElement(
      eltExercice,
      'div',
      {
        id: `feedbackEx${exercice.numeroExercice}`,
      },
      '',
    )
  }
  setStyles(eltFeedback, 'marginBottom: 20px')
  if (eltFeedback) eltFeedback.innerHTML = ''
  // On utilise la correction définie dans l'exercice
  if (exercice.exoCustomResultat) {
    for (let i = 0; i < exercice.nbQuestions; i++) {
      if (exercice.correctionInteractive != null) {
        const correction = exercice.correctionInteractive(i)
        if (Array.isArray(correction)) {
          for (const result of correction) {
            if (result === 'OK') nbBonnesReponses++
            else nbMauvaisesReponses++
          }
        } else {
          correction === 'OK' ? nbBonnesReponses++ : nbMauvaisesReponses++
        }
      }
    }
  } else {
    for (let i = 0; i < exercice.nbQuestions; i++) {
      if (exercice.correctionInteractive != null) {
        exercice.correctionInteractive(i) === 'OK'
          ? nbBonnesReponses++
          : nbMauvaisesReponses++
      }
    }
  }
  return afficheScore(
    exercice,
    nbBonnesReponses,
    nbMauvaisesReponses,
    divScore,
    buttonScore,
  )
}

export function prepareExerciceCliqueFigure(exercice: Exercice) {
  // Dès que l'exercice est affiché, on rajoute des listenners sur chaque éléments de this.figures.
  for (let i = 0; i < exercice.nbQuestions; i++) {
    if (
      exercice.figures != null &&
      exercice.figures[i] != null &&
      isClickFiguresArray(exercice.figures)
    ) {
      const figures = exercice.figures[i]
      for (const objetFigure of figures) {
        const figSvg: unknown = document.getElementById(objetFigure.id)
        if (figSvg != null) {
          const fig = figSvg as MathaleaSVG
          if (!fig.hasMathaleaListener) {
            fig.addEventListener('mouseover', mouseOverSvgEffect)
            fig.addEventListener('mouseout', mouseOutSvgEffect)
            fig.addEventListener('click', mouseSvgClick)
            if (fig.etat === true) {
              // MGu : si l'état est true, c'est que ca a été coché par capytale
              // il faudrait revoir le système de figure cliquable avec un customelement
            } else {
              fig.etat = false
            }
            fig.style.margin = '10px'
            fig.style.border = '3px solid transparent'
            fig.hasMathaleaListener = true
            // On enregistre que l'élément a déjà un listenner pour ne pas lui remettre le même à l'appui sur "Nouvelles Données"
          }
        }
      }
    }
  }
}

// callback est une fonction facultative qui sera appelée avant de vérifier la question
// elle permet de faire des actions avant la vérification, comme par exemple mettre à jour la correction affichée (voir 6G45)
function verifQuestionCliqueFigure(
  exercice: Exercice,
  i: number,
  callback?: (exercice: Exercice, i: number) => void,
): string {
  // si il y a une callback, on l'appelle
  if (callback != null) {
    callback(exercice, i)
  }
  // suite du code habituel de verifQuestionCliqueFigure
  // Le get est non strict car on sait que l'élément n'existe pas à la première itération de l'exercice
  let eltFeedback = get(`resultatCheckEx${exercice.numeroExercice}Q${i}`, false)
  // On ajoute le div pour le feedback
  if (!eltFeedback) {
    const eltExercice = get(
      `exercice${exercice.numeroExercice}`,
    ) as HTMLDivElement
    eltFeedback = addElement(
      eltExercice,
      'div',
      {
        id: `resultatCheckEx${exercice.numeroExercice}Q${i}`,
      },
      '',
    )
  }
  setStyles(eltFeedback, 'marginBottom: 20px')
  if (eltFeedback) eltFeedback.innerHTML = ''
  const figures = []
  let erreur = false // Aucune erreur détectée
  let nbFiguresCliquees = 0
  if (
    exercice.figures != null &&
    exercice.figures[i] != null &&
    Array.isArray(exercice.figures[i])
  ) {
    for (const objetFigure of exercice.figures[i]) {
      const eltFigure: unknown = document.getElementById(objetFigure.id)
      if (eltFigure != null) {
        figures.push(eltFigure)
        const fig = eltFigure as MathaleaSVG
        fig.removeEventListener('mouseover', mouseOverSvgEffect)
        fig.removeEventListener('mouseout', mouseOutSvgEffect)
        fig.removeEventListener('click', mouseSvgClick)
        fig.hasMathaleaListener = false
        if (fig.etat) {
          nbFiguresCliquees++
          // Sauvegarde des reponses
          if (exercice.answers) exercice.answers[objetFigure.id] = '1'
        }
        if (fig.etat !== objetFigure.solution) erreur = true
      }
    }
  }

  if (nbFiguresCliquees > 0 && !erreur) {
    eltFeedback.innerHTML = '😎'
    return 'OK'
  }
  eltFeedback.innerHTML = '☹️'
  return 'KO'
}

function mouseOverSvgEffect(event: MouseEvent) {
  const elt = event.target as MathaleaSVG
  elt.style.border = '3px solid #1DA962'
}

function mouseOutSvgEffect(event: MouseEvent) {
  const elt = event.target as MathaleaSVG
  elt.style.border = '3px solid transparent'
}

function mouseSvgClick(event: MouseEvent) {
  const elt = event.target as MathaleaSVG
  if (elt.etat) {
    // Déja choisi, donc on le réinitialise
    elt.style.border = '3px solid transparent'
    elt.addEventListener('mouseover', mouseOverSvgEffect)
    elt.addEventListener('mouseout', mouseOutSvgEffect)
    elt.addEventListener('click', mouseSvgClick)
    elt.etat = false
  } else {
    // Passe à l'état choisi donc on désactive les listenners pour over et pour out
    elt.removeEventListener('mouseover', mouseOverSvgEffect)
    elt.removeEventListener('mouseout', mouseOutSvgEffect)
    elt.style.border = '3px solid #f15929'
    elt.etat = true
  }
}

/**
 * Précise la réponse attendue
 * Cette fonction est dépréciée : elle est remplacée par la fonction handleAnswers qu'elle appelle pour les anciens exercices
 * C'est donc maintenant un wrapper de handleAnswers.
 * @param {Exercice} exercice = this
 * @param {number} i numéro de la question
 * @param {any} valeurs Attention à ce que vous mettez ici : ça doit être en accord avec le formatInteractif ! pas de texNombre ou de stringNombre !
 * @param {ReponseParams} params
 * @deprecated Dans la mesure du possible, utiliser handleAnswers après avoir consulter la doc
 * @see https://forge.apps.education.fr/coopmaths/mathalea/-/wikis/Rendre-un-exercice-interactif
 */
export function setReponse(
  exercice: Exercice,
  i: number,
  valeurs: LegacyReponses,
  params: ReponseParams = {},
) {
  const url = new URL(window.location.href)
  // if (Array.isArray(valeurs) && !url.searchParams.has('testCI')) window.notifyLocal('setReponse a reçu un Array de reponses, il faut en finir avec ça', { valeurs })
  if (exercice.formatInteractif === 'qcm') return
  let formatInteractif = params?.formatInteractif
  let precision = params?.precision
  let signe = params?.signe
  if (formatInteractif === undefined) formatInteractif = 'calcul'
  let reponses: Array<LegacyReponse>
  if (url.hostname === 'localhost' && url.searchParams.has('triche')) {
    console.info(
      `Réponses de l'exercice ${(exercice.numeroExercice ?? 0) + 1} - question ${i + 1} : `,
      valeurs,
    )
  }
  if (
    typeof valeurs === 'object' &&
    (formatInteractif === 'tableauMathlive' ||
      formatInteractif === 'fillInTheBlank')
  ) {
    throw Error(
      'setReponse ne doit pas être utilisé pour tableauMathlive ni fillInTheBlank, il faut utiliser handleAnswers',
    )
  }
  if (Array.isArray(valeurs)) {
    // il peut y avoir une liste de valeurs de réponses à tester, on transfert dans reponses
    reponses = [...valeurs] // reponses contient donc directement le tableau valeurs
    // si valeur est un tableau on prend le signe de la première valeur
    if (valeurs[0] instanceof FractionEtendue) {
      signe = (valeurs[0] as FractionEtendue).signe === -1 // si c'est une fraction, alors on regarde son signe (valeur -1, 0 ou 1)
    } else {
      if (typeof valeurs[0] === 'number') {
        signe = valeurs[0] < 0 // on teste si elle est négative, si oui, on force la case signe pour AMC
      } else {
        signe = Number(valeurs[0]) < 0
      }
    }
  } else {
    // Il n'y a qu'une valeur, on uniformise le format : reponses est une liste de une seule valeur
    reponses = [valeurs] // ici, valeurs n'est pas un tableau mais on le met dans reponses sous forme de tableau
    if (valeurs instanceof FractionEtendue) {
      signe = valeurs.signe === -1 ? true : Boolean(signe) // si c'est une fraction, alors on regarde son signe (valeur -1, 0 ou 1)
    } else {
      signe = Number(valeurs) < 0 ? true : Boolean(signe) // on teste si elle est négative, si oui, on force la case signe pour AMC
    }
  }
  params.signe = signe

  // @fixme reponses est un array ! toujours. Normalement, il ne devrait y avoir qu'une seule goodAnswer dedans, mais avant, on n'avait pas d'autres moyens pour verifier les saisies diverses
  const reponse: LegacyReponse = (
    reponses as Array<LegacyReponse>
  )[0] as LegacyReponse // reponse est la première d'entre elles (ou la seule)

  // en contexte d'export AMC, on ne touche pas à l'existant
  if (context.isAmc) {
    let laReponseDemandee: LegacyReponse
    switch (formatInteractif) {
      case 'tableauMathlive':
        //   if (reponses.filter((cellule) => Object.keys(cellule)[0].match(/L\dC\d/).length === 0).length !== 0) {
        //    window.notify('setReponse : type "tableauMathlive" les objets proposés n\'ont pas tous une clé de la forme L$C$', { reponses, exercice: exercice.uuid })
        //  }
        break
      case 'fillInTheBlank':
        break
      case 'Num':
        if (!(reponse instanceof FractionEtendue)) {
          window.notify('setReponse : type "Num" une fraction est attendue !', {
            reponses,
            exercice: exercice.uuid,
          })
        } else if (Number.isNaN(reponse.num) || Number.isNaN(reponse.den)) {
          window.notify('setReponse : La fraction ne convient pas !', {
            reponses,
            exercice: exercice.uuid,
          })
        }
        break
      case 'Den':
        if (!(reponse instanceof FractionEtendue)) {
          window.notify('setReponse : type "Den" une fraction est attendue !', {
            reponses,
            exercice: exercice.uuid,
          })
        }
        break
      case 'calcul':
        laReponseDemandee = reponse
        if (typeof laReponseDemandee === 'string') {
          laReponseDemandee = laReponseDemandee.replaceAll('dfrac', 'frac')
        }
        if (
          typeof laReponseDemandee === 'number' ||
          typeof laReponseDemandee === 'string'
        ) {
          laReponseDemandee = laReponseDemandee
            .toString()
            .replace(/\s/g, '')
            .replace(',', '.')
        }
        break
      /* case 'nombreDecimal':
        if (!(reponse instanceof Decimal)) {
          window.notify(
            'setReponse : type "nombreDecimal" un nombre est attendu !',
            { reponses, exercice: exercice.uuid }
          )
        }
        break */
      /* case 'ecritureScientifique':
        if (!(typeof reponse === 'string')) {
          window.notify(
            'setReponse : type "ecritureScientifique" la réponse n\'est pas un string !',
            { reponses, exercice: exercice.uuid }
          )
        }
        // ToFix : vérifier que la chaine est au bon format
        break */

      case 'texte':
        if (!(typeof reponse === 'string')) {
          window.notify(
            'setReponse : type "texte" la réponse n\'est pas un string !',
            { reponses, exercice: exercice.uuid },
          )
        }
        break

      case 'ignorerCasse':
        if (!(typeof reponse === 'string')) {
          window.notify(
            'setReponse : type "ignorerCasse" la réponse n\'est pas un string !',
            { reponses, exercice: exercice.uuid },
          )
        }
        break

      case 'fractionEgale':
        if (!(reponse instanceof FractionEtendue))
          window.notify(
            'setReponse : type "fractionEgale" une fraction est attendue !',
            { reponses, exercice: exercice.uuid },
          )
        else if (isNaN(reponse.num) || isNaN(reponse.den))
          window.notify('setReponse : La fraction ne convient pas !', {
            reponses,
            exercice: exercice.uuid,
          })
        break

      case 'unites': // Pour les exercices où l'on attend une mesure avec une unité au choix
        if (!(reponse instanceof Grandeur)) {
          window.notify(
            'setReponse : type "longueur" la réponse n\'est pas une instance de Grandeur !',
            { reponses, exercice: exercice.uuid },
          )
        }
        break
      case 'intervalleStrict': // Pour les exercice où la saisie doit être dans un intervalle
        // ToFix : vérifier que la réponse est bien un intervalle valide
        break
      case 'intervalle':
        // ToFix : vérifier que la réponse est bien un intervalle valide
        break
      case 'puissance':
        // ToFix : vérifier que la réponse est bien l'écriture d'une puissance ou en tout cas une réponse acceptable pour ce format
        break
      case 'canonicalAdd':
        // à priori ce format ne concerne pas AMC
        break
    }

    if (exercice.autoCorrection[i] === undefined) {
      exercice.autoCorrection[i] = {}
    }
    if (exercice.autoCorrection[i].reponse === undefined) {
      exercice.autoCorrection[i].reponse = {}
    }
    const rep = exercice.autoCorrection[i].reponse
    if (rep != null) {
      rep.param = params
      // @ts-expect-error Pour AMC on ne change pas le format de réponse
      rep.valeur = reponses // On n'a rien changé pour AMC, on continue de passer un array dont seule la première valeur est utile
    }
    return // La réponse est prête pour AMC
  }
  // Ici on est en context non Amc, donc s'il y a un setReponse, c'est pour html interactif.
  // On va transformer le l'objetReponse pour handleAnswers(), il n'y
  let laReponseDemandee: LegacyReponse
  if (exercice != null) {
    params.formatInteractif = 'mathlive'
    switch (formatInteractif) {
      case 'listeDeroulante': {
        if (exercice.autoCorrection == null) exercice.autoCorrection = []
        if (exercice.autoCorrection[i] == null) exercice.autoCorrection[i] = {}
        if (exercice.autoCorrection[i].reponse == null) {
          exercice.autoCorrection[i].reponse = {}
        }
        const rep = exercice.autoCorrection[i].reponse
        if (rep != null) {
          if (rep.valeur == null) rep.valeur = {}
          if (rep.valeur.reponse == null) rep.valeur.reponse = { value: '' }
          if (rep.param == null) rep.param = {}
          rep.param.formatInteractif = 'listeDeroulante'
          Object.assign(rep.valeur.reponse.value, reponses)
        }
        return
      }
      case 'Num':
        if (!(reponse instanceof FractionEtendue)) {
          window.notify('setReponse : type "Num" une fraction est attendue !', {
            reponses,
            exercice: exercice.uuid,
          })
        } else if (Number.isNaN(reponse.num) || Number.isNaN(reponse.den)) {
          window.notify('setReponse : La fraction ne convient pas !', {
            reponses,
            exercice: exercice.uuid,
          })
        }
        return handleAnswers(
          exercice,
          i,
          {
            reponse: {
              value: String((reponse as FractionEtendue).num),
              //  compare: numberCompare
              compare: fonctionComparaison,
            },
          },
          params,
        )

      case 'Den':
        if (!(reponse instanceof FractionEtendue)) {
          window.notify('setReponse : type "Den" une fraction est attendue !', {
            reponses,
            exercice: exercice.uuid,
          })
        }
        return handleAnswers(
          exercice,
          i,
          {
            reponse: {
              value: String((reponse as FractionEtendue).den),
              //  compare: numberCompare
              compare: fonctionComparaison,
            },
          },
          params,
        )

      case 'calcul': {
        if (reponses.length === 1) {
          laReponseDemandee = reponse
          if (typeof laReponseDemandee === 'string') {
            laReponseDemandee = laReponseDemandee
              .replaceAll('dfrac', 'frac')
              .replace(/\s/g, '')
              .replace(',', '.')
          }
          // Ceci n'est plus nécessaire avec le wrapper de hanfleAnswer
          /* else if (typeof laReponseDemandee === 'number') {
            laReponseDemandee = String(laReponseDemandee)
          } else if (laReponseDemandee instanceof FractionEtendue) {
            laReponseDemandee = laReponseDemandee.texFraction.replaceAll(
              'dfrac',
              'frac'
            )
          } else if (laReponseDemandee instanceof Decimal) {
            laReponseDemandee = laReponseDemandee.toString()
          } */
          return handleAnswers(
            exercice,
            i,
            {
              reponse: {
                value: laReponseDemandee,
                compare: fonctionComparaison,
              },
            },
            params,
          )
        }
        const value = []
        for (let i = 0; i < reponses.length; i++) {
          laReponseDemandee = reponses[i]
          if (typeof laReponseDemandee === 'string') {
            laReponseDemandee = laReponseDemandee
              .replaceAll('dfrac', 'frac')
              .replace(/\s/g, '')
              .replace(',', '.')
          } else if (typeof laReponseDemandee === 'number') {
            laReponseDemandee = String(laReponseDemandee)
          } else if (laReponseDemandee instanceof FractionEtendue) {
            laReponseDemandee = laReponseDemandee.texFraction.replaceAll(
              'dfrac',
              'frac',
            )
          } else if (laReponseDemandee instanceof Decimal) {
            laReponseDemandee = laReponseDemandee.toString()
          }
          value.push(laReponseDemandee)
        }

        return handleAnswers(
          exercice,
          i,
          { reponse: { value, compare: fonctionComparaison } },
          params,
        )
      }

      case 'texte':
        if (typeof reponse !== 'string') {
          window.notify(
            'setReponse : type "texte" la réponse n\'est pas un string !',
            { reponses, exercice: exercice.uuid },
          )
        }
        return handleAnswers(
          exercice,
          i,
          {
            reponse: {
              value: Array.isArray(reponses)
                ? reponses.map(String)
                : String(reponses),
              compare: fonctionComparaison,
              options: { texteAvecCasse: true },
            },
          },
          params,
        )

      case 'ignorerCasse':
        if (typeof reponse !== 'string') {
          window.notify(
            'setReponse : type "ignorerCasse" la réponse n\'est pas un string !',
            { reponses, exercice: exercice.uuid },
          )
        }
        return handleAnswers(
          exercice,
          i,
          {
            reponse: {
              value: Array.isArray(reponses)
                ? reponses.map((el) => String(el).toLowerCase())
                : String(reponses).toLowerCase(),
              // compare: texteSansCasseCompare
              compare: fonctionComparaison,
              options: { texteSansCasse: true },
            },
          },
          params,
        )

      case 'fractionEgale':
        if (!(reponse instanceof FractionEtendue)) {
          window.notify(
            'setReponse : type "fractionEgale" une fraction est attendue !',
            { reponses, exercice: exercice.uuid },
          )
        } else if (Number.isNaN(reponse.num) || Number.isNaN(reponse.den)) {
          window.notify('setReponse : La fraction ne convient pas !', {
            reponses,
            exercice: exercice.uuid,
          })
        }
        if (Array.isArray(reponse)) {
          window.notify(
            "setReponse a reçu une liste de réponse pour le format fractionEgale, c'est incohérent !",
            { reponses, exercice: exercice.uuid },
          )
        }
        if (reponse instanceof FractionEtendue) {
          return handleAnswers(
            exercice,
            i,
            {
              reponse: {
                value: reponse, // reponse.texFraction.replace('dfrac', 'frac') plus nécessaire : le wrapper de handleAnswers s'en occupe
                compare: fonctionComparaison,
              },
            },
            params,
          )
        }
        break

      case 'unites': // Pour les exercices où l'on attend une mesure avec une unité au choix
        if (precision == null) precision = 0 // Des exercices utilisent le format 'unites' mais ne définissent pas la précision
        if (!(reponse instanceof Grandeur)) {
          window.notify(
            'setReponse : type "longueur" la réponse n\'est pas une instance de Grandeur !',
            { reponses, exercice: exercice.uuid },
          )
        }
        if (reponse instanceof Grandeur) {
          return handleAnswers(
            exercice,
            i,
            {
              reponse: {
                value: reponse, // .toString().replace('\u202f', '') plus nécessaire grâce au wrapper de handleAnswers
                compare: fonctionComparaison,
                options: {
                  unite: true,
                  precisionUnite:
                    10 ** precision *
                    10 ** (reponse.puissanceUnite * reponse.puissancePrefixe),
                },
              },
            },
            params,
          )
        }
        break
      case 'intervalleStrict': // Pour les exercice où la saisie doit être dans un intervalle
        if (
          reponses.length !== 2 ||
          reponses.filter((el) => typeof el !== 'number').length !== 0
        ) {
          window.notify(
            'setReponse : type "intervalle" la réponse n\'est pas un tupple [number,number] !',
            { reponses, exercice: exercice.uuid },
          )
        }
        return handleAnswers(
          exercice,
          i,
          {
            reponse: {
              value: `]${reponses[0]};${reponses[1]}[`,
              compare: fonctionComparaison,
              options: { estDansIntervalle: true },
            },
          },
          params,
        )
      case 'intervalle':
        if (
          !Array.isArray(reponses) ||
          reponses.length !== 2 ||
          reponses.filter((el) => typeof el !== 'number').length !== 0
        ) {
          window.notify(
            'setReponse : type "intervalle" la réponse n\'est pas un tupple [number,number] !',
            { reponses, exercice: exercice.uuid },
          )
        }
        return handleAnswers(
          exercice,
          i,
          {
            reponse: {
              value: `[${reponses[0]};${reponses[1]}]`,
              compare: fonctionComparaison,
              options: { estDansIntervalle: true },
            },
          },
          params,
        )
      case 'puissance':
        if (typeof reponse !== 'string') {
          window.notify(
            'setReponse : type "puissance" la réponse n\'est pas un string !',
            { reponses, exercice: exercice.uuid },
          )
        }
        return handleAnswers(
          exercice,
          i,
          {
            reponse: {
              value: String(reponse),
              // compare: powerCompare
              compare: fonctionComparaison,
              options: { puissance: true },
            },
          },
          params,
        )
    }
  }

  if (exercice.autoCorrection[i] === undefined) {
    exercice.autoCorrection[i] = {}
  }
  if (exercice.autoCorrection[i].reponse === undefined) {
    exercice.autoCorrection[i].reponse = {}
  }
  const rep = exercice.autoCorrection[i].reponse
  if (rep != null) {
    rep.param = params
    rep.valeur = reponses as ValeurNormalized
  }
}

// La solution est-elle un nombre ? Si oui, on force l'option nombreDecimalSeulement.
function isValidNumber(value: any): boolean {
  // Convertir la valeur en chaîne et remplacer les séparateurs de milliers (par exemple, '{,}')
  const cleanedValue = String(value)
    .replace(/{,}/g, '') // Enlève les caractères '{,}' (séparateurs de milliers comme dans "1{,}5")
    .replace(',', '.') // Remplace la virgule par un point pour les décimales
  // Vérifier que la chaîne ne contient que des chiffres et un seul séparateur décimal (point ou virgule)
  // Ou un nombre javascript écrit dans tous les formats supportés
  // const validNumberPattern = /^[+-]?(\d*(\.\d*)?([eE][+-]?\d*)?|0[xX][0-9a-fA-F]*|0[bB][01]*)$/
  const validNumberPattern = /^[+-]?\d+(.\d+)?$/

  // Vérifier si la chaîne nettoyée correspond à un nombre valide
  return validNumberPattern.test(cleanedValue)
}

function handleDefaultValeur(reponse: Valeur): ValeurNormalized {
  for (const [, val] of Object.entries(reponse)) {
    if (val !== undefined) {
      if (val?.value !== undefined) {
        if (Array.isArray(val.value)) {
          for (let i = 0; i < val.value.length; i++) {
            if (typeof val.value[i] === 'string') continue
            if (
              val.value[i] instanceof Decimal ||
              val.value[i] instanceof Grandeur ||
              val.value[i] instanceof Hms ||
              typeof val.value[i] === 'number'
            ) {
              val.value[i] = val.value[i].toString()
            }
            if (val.value[i] instanceof FractionEtendue)
              val.value[i] = val.value[i].texFraction
          }
        } else {
          if (typeof val.value === 'string') continue
          if (
            val.value instanceof Decimal ||
            val.value instanceof Grandeur ||
            val.value instanceof Hms ||
            typeof val.value === 'number'
          ) {
            val.value = val.value.toString()
          }
          if (val.value instanceof FractionEtendue)
            val.value = val.value.texFraction
        }
      }

      if (val.compare === undefined) val.compare = fonctionComparaison
      if (val.options === undefined || Object.keys(val.options).length === 0) {
        let reponseAttendueEstUnNombre: boolean
        if (Array.isArray(val.value)) {
          reponseAttendueEstUnNombre = true
          for (let ee = 0; ee < val.value.length; ee++) {
            reponseAttendueEstUnNombre &&= isValidNumber(val.value[ee])
          }
        } else {
          reponseAttendueEstUnNombre = isValidNumber(val.value)
        }
        const options = reponseAttendueEstUnNombre
          ? { nombreDecimalSeulement: true }
          : {}
        val.options = options
      }
    }
  }
  return reponse as ValeurNormalized // La normalisation consiste à transformer toute value en string et c'est fait maintenant par cette fonction
}

/**
 * La fonction à privilégier à partir de maintenant.
 * @param {Exercice} exercice
 * @param {number} question
 * @param {AnswerType} reponses
 * @param {ReponseParams} params
 */
export function handleAnswers(
  exercice: Exercice,
  question: number,
  reponses: Valeur,
  params: ReponseParams | undefined = {},
) {
  if (context.isAmc) {
    // handleAnswer ne s'occupe pas de l'export AMC
    return
  }
  let formatInteractif =
    params?.formatInteractif ??
    exercice.autoCorrection[question]?.reponse?.param?.formatInteractif ??
    'mathlive'
  if (exercice.autoCorrection == null) exercice.autoCorrection = []
  if (!(reponses instanceof Object)) {
    window.notify(`handleAnswer() reponses doit être un objet : ${reponses}`, {
      reponses,
      exercice: exercice.uuid,
    })
  }

  if (exercice.autoCorrection[question] === undefined) {
    exercice.autoCorrection[question] = {}
  }
  if (exercice.autoCorrection[question].reponse === undefined) {
    exercice.autoCorrection[question].reponse = {}
  }
  const rep = exercice.autoCorrection[question].reponse
  if (rep != null) {
    rep.param = params ?? { formatInteractif }
    if (formatInteractif === undefined) formatInteractif = 'mathlive'
    rep.param.formatInteractif = formatInteractif
    rep.valeur = handleDefaultValeur(reponses)
  }
  const url = new URL(window.location.href)

  if (url.hostname === 'localhost' && url.searchParams.has('triche')) {
    console.info(
      `Réponses de l'exercice ${(exercice.numeroExercice ?? 0) + 1} - question ${question + 1} : `,
      rep.valeur,
    )
  }
}
