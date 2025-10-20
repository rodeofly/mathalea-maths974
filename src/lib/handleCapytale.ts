import type { Activity, InterfaceResultExercice } from '../lib/types'
import {
  capytaleMode,
  capytaleStudentAssignment,
  exercicesParams,
  globalOptions,
  resultsByExercice,
} from './stores/generalStore'
import {
  mathaleaGoToView,
  mathaleaWriteStudentPreviousAnswers,
} from './mathalea'
import { get } from 'svelte/store'
import { RPC } from '@mixer/postmessage-rpc'
import { canOptions as canOptionsStore } from './stores/canStore'
import type { CanState } from './types/can'

interface AssignmentData {
  duration?: number
  resultsByQuestion?: boolean[]
}

interface ActivityParams {
  mode: 'create' | 'assignment' | 'review' | 'view'
  activity: Activity
  workflow: 'current' | 'finished' | 'corrected'
  studentAssignment: InterfaceResultExercice[]
  assignmentData: AssignmentData
}

const serviceId = 'capytale-player'

// Gestion des postMessage avec Capytale
const rpc = new RPC({
  target: window.parent,
  serviceId,
  origin: '*',
})

// On copie les réponses pour que la vue CAN puisse les utiliser
export let answersFromCapytale: InterfaceResultExercice[] = []
export let assignmentDataFromCapytale: AssignmentData = {}

// timer pour ne pas lancer hasChanged trop souvent
let timerId: ReturnType<typeof setTimeout> | undefined
let firstTime = true
let currentMode: 'create' | 'assignment' | 'review' | 'view'

/**
 * Fonction pour recevoir les paramètres des exercices depuis Capytale
 */
async function toolSetActivityParams({
  mode,
  activity,
  workflow,
  studentAssignment,
  assignmentData,
}: ActivityParams) {
  assignmentDataFromCapytale = assignmentData
  // On garde dans le store ce qui était en base de données chez Capytale pour pouvoir le renvoyer avec la modification d'un seul exercice
  capytaleStudentAssignment.set(studentAssignment)
  // mode : create (le prof créé sa séance), assignment (l'élève voit sa copie), review (le prof voit la copie d'un élève), view (le prof voit la séance d'un collègue dans la bibliothèque et pourra la cloner)
  // workflow : current (la copie n'a pas encore été rendue), finished (la copie a été rendue), corrected (la copie a été anotée par l'enseignant)
  // On récupère les paramètres de l'activité
  currentMode = mode
  capytaleMode.set(mode)
  const canOptions = get(canOptionsStore)
  if (activity === null || activity === undefined) return
  const [newExercicesParams, newGlobalOptions, newCanOptions] = [
    activity.exercicesParams,
    activity.globalOptions,
    activity.canOptions,
  ]
  // On met à jour les paramètres des exercices
  exercicesParams.update((l) => {
    Object.assign(l, newExercicesParams)
    return l
  })
  // On met à jour les paramètres globaux
  globalOptions.update((l) => {
    Object.assign(l, newGlobalOptions)
    return l
  })

  if (newCanOptions === null || newCanOptions === undefined) {
    window.notify('Aucun paramètre CAN trouvé', {
      mode,
      activity,
      workflow,
      studentAssignment,
      assignmentData,
    })
  }
  canOptionsStore.update((l) => {
    if (newCanOptions) newCanOptions.state = 'canHomeScreen'
    Object.assign(l, newCanOptions)
    l.state = 'canHomeScreen'
    l.isInteractive = newGlobalOptions.setInteractive === '1'
    return l
  })
  // On charge l'aléa qui a pu être modifié par l'élève
  if (studentAssignment !== null && studentAssignment !== undefined) {
    for (const exercice of studentAssignment) {
      if (
        exercice != null &&
        exercice.alea != null &&
        exercice.indice != null
      ) {
        exercicesParams.update((l) => {
          if (Array.isArray(l)) {
            l[exercice.indice as number].alea = exercice.alea
            l[exercice.indice as number].bestScore = exercice.bestScore
          }
          return l
        })
      }
    }
  }
  if (mode !== 'create') {
    // Vue élève
    if (newCanOptions?.isChoosen) {
      mathaleaGoToView('can')
      globalOptions.update((l) => {
        l.v = 'can'
        return l
      })
    } else {
      mathaleaGoToView('eleve')
      globalOptions.update((l) => {
        l.v = 'eleve'
        return l
      })
    }
  }
  if (mode === 'assignment') {
    // Si la copie a déjà été rendue, on ne peut plus modifier les réponses
    if (workflow !== 'current') {
      globalOptions.update((l) => {
        l.done = '1'
        return l
      })
    }
    // En vue CAN, on efface la graine pour que l'élève ne recommence pas le même exercice
    if (
      newCanOptions?.isChoosen &&
      (newGlobalOptions.isDataRandom === undefined ||
        newGlobalOptions.isDataRandom === true)
    ) {
      exercicesParams.update((l) => {
        for (const param of l) {
          if (param.alea !== undefined) {
            param.alea = undefined
          }
        }
        return l
      })
    }
  } else if (mode === 'review') {
    // Mettre le done à true pour que l'on ne puisse plus modifier les réponses
    globalOptions.update((l) => {
      l.done = '1'
      return l
    })
  }
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (studentAssignment != null) {
    answersFromCapytale = studentAssignment
    console.info('Réponses à charger', studentAssignment)
    if (!newCanOptions?.isChoosen) {
      // On charge les réponses de l'élève (si ce n'est pas la CAN)
      for (const exercice of studentAssignment) {
        if (exercice == null) continue
        if (exercice != null && exercice.answers != null) {
          if (exercice.type === 'app') {
            // On prévient les apps avec un message
            if (exercice != null) {
              const message = {
                type: 'mathaleaHasScore',
                score: exercice?.numberOfPoints,
                numeroExercice: exercice?.indice,
                numberOfQuestions: exercice?.numberOfQuestions,
                finalState: exercice?.answers,
              }
              window.postMessage(message, '*')
            }
          } else {
            const starttime = window.performance.now()
            await Promise.all(
              mathaleaWriteStudentPreviousAnswers(exercice.answers),
            )
            const time = window.performance.now()
          }
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
    // On attend 500 ms pour que les champs texte soient bien remplis
    if (!canOptions.isChoosen) {
      console.info(
        'Maintenant que les réponses sont chargées, clic sur les boutons score',
        studentAssignment,
      )
      for (const exercice of studentAssignment) {
        if (exercice == null) continue
        // Pour les exercices MathALEA, on clique sur le bouton pour recalculer le score
        const buttonScore = document.querySelector(
          `#buttonScoreEx${exercice?.indice}`,
        ) as HTMLButtonElement
        if (buttonScore !== null) {
          // On note dans le bouton que ce sont les réponses sauvegardées et pas de nouvelles réponses de l'élève
          // Cela évite, en cas de problème de chargement, d'effacer les réponses de l'élève
          buttonScore.dataset.capytaleLoadAnswers = '1'
          buttonScore.click()
        } else {
          console.info(
            `Bouton score #buttonScoreEx${exercice.indice} non trouvé`,
          )
        }
      }
    }
  }

  // Gestion du state de la CAN
  if (canOptions.isChoosen) {
    if (canOptions.state !== 'canHomeScreen') return
    let newState: CanState = 'start'
    if (mode === 'review') {
      // Un prof regarde une copie
      newState = 'solutions'
    }
    if (mode === 'assignment' && studentAssignment != null) {
      // Un élève fait une copie mais a déjà été évalué
      if (workflow === 'current') {
        newState = get(globalOptions).oneShot ? 'canHomeScreen' : 'start'
      } else {
        newState = canOptions.solutionsAccess ? 'solutions' : 'canHomeScreen'
      }
    }
    if (newState !== 'canHomeScreen') {
      canOptionsStore.update((l) => {
        l.state = newState
        l.solutionsMode = 'gathered' // Faut-il en faire une option par défaut ?
        return l
      })
    }
  }
}

export async function sendToCapytaleMathaleaHasChanged() {
  if (firstTime) {
    // attendre 1 seconde
    await new Promise((resolve) => setTimeout(resolve, 1000))
    firstTime = false
    return
  }
  // On ne prévient Capytale qu'une fois toutes les demi-secondes
  if (timerId === undefined) {
    timerId = setTimeout(() => {
      rpc.call('hasChanged', {})
      timerId = undefined
    }, 500)
  }
}

export function sendToCapytaleSaveStudentAssignment({
  indiceExercice,
  assignmentData,
}: {
  indiceExercice?: number | 'all'
  assignmentData?: AssignmentData
}) {
  if (indiceExercice === undefined) return
  const results = get(resultsByExercice) || []
  // On récupère les résultats précédents de l'élève en provenance de Capytale
  let newStudentAssignement = get(capytaleStudentAssignment) || []
  let evaluation = 0
  for (const resultExercice of results) {
    if (Number.isFinite(resultExercice?.numberOfPoints)) {
      evaluation += resultExercice.numberOfPoints
    }
  }
  if (currentMode === 'assignment') {
    // exerciceGraded est l'indice du dernier exercice évalué
    // L'information est envoyée à Capytale pour qu'ils sachent quel exercice ajouter en base de données
    // Dans le cas d'une vue Course aux Nombre on envoie all pour forcer de mettre à jour en base de données tous les scores
    if (indiceExercice !== 'all') {
      // On n'est donc pas en vue CAN
      const bestScore = results[indiceExercice]?.bestScore ?? 0
      const newScore = results[indiceExercice]?.numberOfPoints ?? -1
      if (newScore < bestScore) {
        console.info(
          'Exercice non sauvegardé car le score est inférieur au meilleur score',
        )
        return
      }
      // On ne sauvegarde que les données de l'exercice qui vient d'être soumis
      newStudentAssignement[indiceExercice] = results[indiceExercice]
      capytaleStudentAssignment.set(newStudentAssignement)
    } else {
      // Pour la CAN, on ne garde rien des enregistrements précédents
      newStudentAssignement = results
      capytaleStudentAssignment.set(newStudentAssignement)
    }
    const data = {
      // Les réponses de l'élève
      // Le tableau fourni remplace complètement les réponses précédemment sauvegardées.
      studentAssignment: newStudentAssignement,
      // L'évaluation totale
      evaluation: evaluation.toString(),
      // L'index dans le tableau `studentAssignment` de l'exercice qui vient d'être soumis
      // 'all' pour indiquer que tous les exercices sont soumis
      exerciceGraded: indiceExercice,
      // Des données globales concernant le travail de l'élève : temps passé, etc... Format à définir.
      // Les données fournies remplacent complètement les données précédemment sauvegardées.
      assignmentData,
      // Indique que l'activité est terminée et doit être verrouillée pour l'élève : workflow = 'finished'
      final: get(canOptionsStore).isChoosen && get(globalOptions).oneShot,
    }
    console.info('Message envoyé à Capytale', data)
    const promiseSaveStudentAssignment = rpc.call('saveStudentAssignment', data)
    promiseSaveStudentAssignment
      .then(() => {
        console.info('Sauvegarde effectuée')
        // Afficher sauvegarde réussie
      })
      .catch(() => {
        console.error('Problème avec la sauvegarde')
        // Indiquer à l'élève qu'il y a un soucis réseau
      })
  }
}

function sendToCapytaleActivityParams() {
  const params = get(exercicesParams)
  const options = get(globalOptions)
  const canOptions = get(canOptionsStore)
  for (const param of params) {
    if (param.alea !== undefined && get(globalOptions).isDataRandom) {
      param.alea = undefined
    }
  }
  return { exercicesParams: params, globalOptions: options, canOptions }
}

export default async function handleCapytale() {
  rpc.expose('platformGetActivityParams', sendToCapytaleActivityParams)
  try {
    const activityParams = await rpc.call<ActivityParams>(
      'toolGetActivityParams',
      {},
    )
    toolSetActivityParams(activityParams)
  } catch (error) {
    console.error('Problème de communication avec Capytale', error)
  }
}
