import Bugsnag, { type NotifiableError } from '@bugsnag/js'
import bigInt from 'big-integer'

import { tropDeChiffres } from './modules/outils'
import { showDialogForLimitedTime } from './lib/components/dialogs'
import { get } from 'svelte/store'
import {
  capytaleMode,
  capytaleStudentAssignment,
  exercicesParams,
  globalOptions,
} from './lib/stores/generalStore'
import { canOptions } from './lib/stores/canStore'
import { createURL } from './lib/mathalea'

type Metadatas = Record<string, unknown>

/* global BigInt */
if (typeof BigInt === 'undefined') {
  // @ts-expect-error
  window.BigInt = bigInt
}

function handleBugsnag() {
  // const fileName = '../_private/bugsnagApiKey'
  // PROVISOIRE : MGU
  const getBugsnagApiKey = '6f45f454e2366599256bddc91cd7000b' // await import(/* @vite-ignore */fileName)
  const key = getBugsnagApiKey // .default() || ''
  Bugsnag.start({
    apiKey: key,
    onError: function (event) {
      event.addMetadata('Parametres Exos', get(exercicesParams))
      event.addMetadata('Parametres: ', {
        globalOptions: get(globalOptions),
        canOptions: get(canOptions),
        capytaleMode: get(capytaleMode),
        studentAssignment: get(capytaleStudentAssignment),
      })
      event.addMetadata('Url Exos', {
        url: createURL(get(exercicesParams)).toString(),
      })
    },
  })
}

if (document.location.hostname === 'coopmaths.fr') {
  handleBugsnag()
}

function isDevMode() {
  return window.location.href.startsWith('http://localhost')
}

export function notifyLocal(error: string | Error, metadatas: Metadatas) {
  if (!isDevMode()) return
  if (typeof error === 'string') {
    // @ts-expect-error
    if (error.includes(tropDeChiffres) && !window.Bugsnag) {
      console.error(
        error +
          "\nIl y a un risque d'erreur d'approximation (la limite est de 15 chiffres significatifs)\nnb : " +
          metadatas.nb +
          '\nprecision (= nombre de décimales demandé) : ' +
          metadatas.precision,
      )
    }
    error = Error(error).message
  }
  const message =
    'Ce message ne sera pas envoyé à Bugsnag dans la version en ligne, mais il faut traiter le problème !'
  showDialogForLimitedTime(
    'notifDialog',
    5000,
    message + ' : <br>' + error.toString() + JSON.stringify(metadatas),
  )
  console.error(message, error)
  if (metadatas) console.info('avec les metadatas', metadatas)
  if (metadatas) console.info(JSON.stringify(metadatas))
  console.info('Paramètres des exercices', get(exercicesParams))
  console.trace()
}
/**
 * Une fonction à importer dans les fichiers typescript si on veut faire du window.notify() on utilise notify().
 * @param error
 * @param metadatas
 */
export function notify(error: string | NotifiableError, metadatas: Metadatas) {
  if (typeof error === 'string') {
    // @ts-expect-error
    if (error.includes(tropDeChiffres) && !window.Bugsnag) {
      console.error(
        error +
          "\nIl y a un risque d'erreur d'approximation (la limite est de 15 chiffres significatifs)\nnb : " +
          metadatas.nb +
          '\nprecision (= nombre de décimales demandé) : ' +
          metadatas.precision,
      )
    }
    error = Error(error).message
  }
  // console.error(error)
  // if (metadatas) console.info('Avec les metadatas:', metadatas)
  // console.info('Paramètres des exercices:', get(exercicesParams))
  // return

  if (Bugsnag && !isDevMode()) {
    if (metadatas) Bugsnag.addMetadata('ajouts', metadatas)
    Bugsnag.addMetadata('Paramètres des exercices', get(exercicesParams))
    Bugsnag.notify(error)
    console.error(error)
  } else {
    const message =
      "message qui aurait été envoyé à bugsnag s'il avait été configuré"
    showDialogForLimitedTime(
      'notifDialog',
      5000,
      message + ' : <br>' + error.toString(),
    )
    console.error(message, error)
    if (metadatas) console.info('avec les metadatas', metadatas)
    console.info('Paramètres des exercices', get(exercicesParams))
  }
}

// @ts-expect-error
window.notify = notify

// @ts-expect-error
window.notifyLocal = notifyLocal
