import Decimal from 'decimal.js'
import renderMathInElement from 'katex/contrib/auto-render'
import 'katex/dist/katex.min.css'
import seedrandom from 'seedrandom'
import { get } from 'svelte/store'
import type TypeExercice from '../exercices/Exercice'
import Exercice from '../exercices/Exercice'
import ExerciceSimple from '../exercices/ExerciceSimple'
import referentielStaticCH from '../json/referentielStaticCH.json'
import referentielStaticFR from '../json/referentielStaticFR.json'
import uuidToUrl from '../json/uuidsToUrlFR.json'
import {
  ajouteChampTexteMathLive,
  remplisLesBlancs,
} from '../lib/interactif/questionMathLive'
import FractionEtendue from '../modules/FractionEtendue'
import Grandeur from '../modules/Grandeur'
import { contraindreValeur } from '../modules/outils'
import {
  showDialogForLimitedTime,
  showPopupAndWait,
} from './components/dialogs'
import { isStatic, isSvelte } from './components/exercisesUtils'
import { resizeContent } from './components/sizeTools'
import { delay } from './components/time'
import { decrypt, isCrypted } from './components/urls'
import { checkForServerUpdate } from './components/version'
import { sendToCapytaleMathaleaHasChanged } from './handleCapytale'
import { fonctionComparaison } from './interactif/comparisonFunctions'
import {
  handleAnswers,
  isAnswerValueType,
  setReponse,
  type AnswerValueType,
  type MathaleaSVG,
  type ReponseComplexe,
  type Valeur,
} from './interactif/gestionInteractif'
import type ListeDeroulanteElement from './interactif/listeDeroulante/ListeDeroulanteElement'
import { propositionsQcm } from './interactif/qcm'
import { shuffle } from './outils/arrayOutils'
import { formaterReponse } from './outils/ecritures'
import renderScratch from './renderScratch'
import { canOptions } from './stores/canStore'
import {
  exercicesParams,
  freezeUrl,
  globalOptions,
  presModeId,
  previousView,
  updateGlobalOptionsInURL,
} from './stores/generalStore'
import {
  getLang,
  localisedIDToUuid,
  referentielLocale,
  updateURLFromReferentielLocale,
} from './stores/languagesStore'
import type { MySpreadsheetElement } from './tableur/MySpreadSheet'
import {
  convertVueType,
  type InterfaceGlobalOptions,
  type InterfaceParams,
  type VueType,
} from './types'
import {
  isIntegerInRange0to2,
  isIntegerInRange0to4,
  isIntegerInRange1to4,
} from './types/integerInRange'

const ERROR_MESSAGE =
  'Erreur - Veuillez actualiser la page et nous contacter si le problème persiste.'

function getExerciceByUuid(
  root: { [key: string]: any },
  targetUUID: string,
): object | null {
  if ('uuid' in root) {
    if (root.uuid === targetUUID) {
      return root
    }
  }
  for (const child in root) {
    if (typeof root[child] !== 'object') continue
    const foundObject = getExerciceByUuid(root[child], targetUUID)
    if (foundObject) {
      return foundObject
    }
  }

  return null
}

/*
 Chargement d'un composant SVELTE
 ATTENTION : oliger d'être daans ce répertoire, sinon différence entre le serveur de test et de production
*/
export async function getSvelteComponent(paramsExercice: InterfaceParams) {
  const urlExercice = uuidToUrl[paramsExercice.uuid as keyof typeof uuidToUrl]

  let filename, directory
  if (urlExercice) {
    ;[filename, directory] = urlExercice
      .replaceAll('\\', '/')
      .split('/')
      .reverse()
  }
  try {
    if (filename && filename.includes('.svelte')) {
      return (
        await import(
          `../exercicesInteractifs/${directory === undefined ? '' : `${directory}/`}${filename.replace('.svelte', '')}.svelte`
        )
      ).default
    }
  } catch (err) {
    console.error(
      `Chargement de l'exercice ${paramsExercice.uuid} impossible. Vérifier  ${directory === undefined ? '' : `${directory}/`}${filename}`,
    )
  }
  throw new Error(
    `Chargement de l'exercice ${paramsExercice.uuid} impossible. Vérifier ${directory === undefined ? '' : `${directory}/`}${filename}`,
  )
}

/**
 * Charge un svelte exercice depuis son uuid
 * Exemple : mathaleaLoadSvelteExerciceFromUuid('clavier')
 * @param {string} uuid
 * @returns {Promise<Exercice>} exercice
 */
export async function mathaleaLoadSvelteExerciceFromUuid(uuid: string) {
  const url = uuidToUrl[uuid as keyof typeof uuidToUrl]
  let filename, directory, isCan
  if (url) {
    ;[filename, directory, isCan] = url
      .replaceAll('\\', '/')
      .split('/')
      .reverse()
  }
  let attempts = 0
  const maxAttempts = 3
  while (attempts < maxAttempts) {
    try {
      // L'import dynamique ne peut descendre que d'un niveau, les sous-répertoires de directory ne sont pas pris en compte
      // cf https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#globs-only-go-one-level-deep
      // L'extension doit-être visible donc on l'enlève avant de la remettre...
      let module: any
      if (isCan === 'can') {
        if (filename != null && filename.includes('.ts')) {
          module = await import(
            `../exercices/can/${directory}/${filename.replace('.ts', '')}.ts`
          )
        } else if (filename != null) {
          module = await import(
            `../exercices/can/${directory}/${filename.replace('.js', '')}.js`
          )
        }
      } else {
        if (filename != null && filename.includes('.ts')) {
          module = await import(
            `../exercices/${directory}/${filename.replace('.ts', '')}.ts`
          )
        } else if (filename != null) {
          module = await import(
            `../exercices/${directory}/${filename.replace('.js', '')}.js`
          )
        }
      }
      const ClasseExercice = module.default
      const exercice = new ClasseExercice()
      ;[
        'titre',
        'amcReady',
        'amcType',
        'interactifType',
        'interactifReady',
      ].forEach((p) => {
        if (module[p] !== undefined) exercice[p] = module[p]
      })
      ;(await exercice).id = filename
      return exercice
    } catch (error) {
      attempts++
      window.notify(`Un exercice ne s'est pas affiché ${attempts} fois`, {})
      if (attempts === maxAttempts) {
        console.error(
          `Chargement de l'exercice ${uuid} impossible. Vérifier ${directory}/${filename}`,
        )
        console.error(error)
        const exercice = new Exercice()
        exercice.titre = ERROR_MESSAGE
        exercice.nouvelleVersion = () => {}
        return exercice
      } else {
        await delay(1000)
      }
    }
  }
}

/**
 * Charge un exercice depuis son uuid
 * Exemple : const exercice = loadExercice('3cvng')
 * @param {string} url
 * @returns {Promise<Exercice>} exercice
 */
export async function mathaleaLoadExerciceFromUuid(uuid: string) {
  const url = uuidToUrl[uuid as keyof typeof uuidToUrl]
  let filename, directory, isCan
  if (url) {
    ;[filename, directory, isCan] = url
      .replaceAll('\\', '/')
      .split('/')
      .reverse()
  }
  let attempts = 0
  const maxAttempts = 3
  while (attempts < maxAttempts) {
    try {
      // L'import dynamique ne peut descendre que d'un niveau, les sous-répertoires de directory ne sont pas pris en compte
      // cf https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#globs-only-go-one-level-deep
      // L'extension doit-être visible donc on l'enlève avant de la remettre...
      let module
      if (isCan === 'can') {
        // D'après ChatGPT, avec vite, il faudrait comme ça pour charger les modules dynamiquement
        // un import direct avec safari plante aléatoirement, et je ne sais pas pourquoi
        const modules = import.meta.glob('../exercices/can/**/*.{ts,js}')
        if (filename != null && filename.includes('.ts')) {
          const path = `../exercices/can/${directory}/${filename.replace('.ts', '')}.ts`
          const loader = modules[path]
          if (!loader) throw new Error(`Module "${path}" introuvable`)
          module = await loader()
          // module = await import(`../exercices/can/${directory}/${filename.replace('.ts', '')}.ts`)
        } else if (filename != null) {
          const path = `../exercices/can/${directory}/${filename.replace('.js', '')}.js`
          const loader = modules[path]
          if (!loader) throw new Error(`Module "${path}" introuvable`)
          module = await loader()
          // module = await import(`../exercices/can/${directory}/${filename.replace('.js', '')}.js`)
        }
      } else if (isCan === 'QCMBrevet') {
        if (filename != null && filename.includes('.ts')) {
          module = await import(
            `../exercices/QCMBrevet/${directory}/${filename.replace('.ts', '')}.ts`
          )
        } else if (filename != null) {
          module = await import(
            `../exercices/QCMBrevet/${directory}/${filename.replace('.js', '')}.js`
          )
        }
      } else if (isCan === 'QCMBac') {
        if (filename != null && filename.includes('.ts')) {
          module = await import(
            `../exercices/QCMBac/${directory}/${filename.replace('.ts', '')}.ts`
          )
        } else if (filename != null) {
          module = await import(
            `../exercices/QCMBac/${directory}/${filename.replace('.js', '')}.js`
          )
        }
      } else {
        if (filename != null && filename.includes('.ts')) {
          module = await import(
            `../exercices/${directory}/${filename.replace('.ts', '')}.ts`
          )
        } else if (filename != null) {
          module = await import(
            `../exercices/${directory}/${filename.replace('.js', '')}.js`
          )
        }
      }
      const ClasseExercice = module.default
      const exercice = new ClasseExercice()
      ;[
        'titre',
        'amcReady',
        'amcType',
        'interactifType',
        'interactifReady',
      ].forEach((p) => {
        if (module[p] !== undefined) exercice[p] = module[p]
      })
      ;(await exercice).id = filename
      return exercice
    } catch (error) {
      attempts++
      const serverUpdated = await checkForServerUpdate()
      if (serverUpdated) {
        await showPopupAndWait()
      }
      window.notify(
        `Un exercice ne s'est pas affiché ${attempts} fois: uuid:${uuid} ,filename: ${directory}/${filename}, serverUpdated: ${serverUpdated}`,
        { error },
      )
      if (attempts === maxAttempts) {
        console.error(
          `Chargement de l'exercice ${uuid} impossible. Vérifier ${directory}/${filename}`,
        )
        console.error(error)
        const exercice = new Exercice()
        exercice.titre = ERROR_MESSAGE
        exercice.nouvelleVersion = () => {}
        return exercice
      } else {
        await delay(1000)
      }
    }
  }
}

/**
 * Charge tous les exercices et les paramètres
 * en fonction du store exercicesParams.
 */
export async function mathaleaGetExercicesFromParams(
  params: InterfaceParams[],
): Promise<TypeExercice[]> {
  const exercices = []
  for (const param of params) {
    if (
      param.uuid.substring(0, 4) === 'crpe' ||
      param.uuid.substring(0, 4) === 'dnb_' ||
      param.uuid.startsWith('dnbpro_') ||
      param.uuid.substring(0, 4) === 'e3c_' ||
      param.uuid.substring(0, 4) === 'bac_' ||
      param.uuid.startsWith('sti2d_') ||
      param.uuid.substring(0, 7) === 'evacom_' ||
      param.uuid.startsWith('2nd_')
    ) {
      const infosExerciceStatique =
        param.uuid.substring(0, 7) === 'evacom_'
          ? getExerciceByUuid(referentielStaticCH, param.uuid)
          : getExerciceByUuid(referentielStaticFR, param.uuid)
      let content = ''
      let contentCorr = ''
      const sujet = param.uuid.split('_')[0]
      if (
        sujet === 'dnb' ||
        sujet === 'dnbpro' ||
        sujet === 'bac' ||
        sujet === 'sti2d'
      ) {
        let response = await window.fetch(
          `static/${sujet}/${infosExerciceStatique.annee}/tex/${param.uuid}.tex`,
        )
        if (response.status === 200) {
          const text = await response.clone().text()
          if (!text.trim().startsWith('<!DOCTYPE html>')) {
            content = text
          } else {
            content = '\n\n\t%Exercice non disponible\n\n'
          }
        }
        response = await window.fetch(
          `static/${sujet}/${infosExerciceStatique.annee}/tex/${param.uuid}_cor.tex`,
        )
        if (response.status === 200) {
          const text = await response.clone().text()
          if (!text.trim().startsWith('<!DOCTYPE html>')) {
            contentCorr = text
          } else {
            contentCorr = '\n\n\t%Pas de correction disponible\n\n'
          }
        }
      } else {
        if (infosExerciceStatique?.url) {
          const response = await window.fetch(infosExerciceStatique.url)
          if (response.status === 200) {
            const text = await response.clone().text()
            if (!text.trim().startsWith('<!DOCTYPE html>')) {
              content = text
            } else {
              content = '\n\n\t%Exercice non disponible\n\n'
            }
          }
        }
        if (infosExerciceStatique?.urlcor) {
          const response = await window.fetch(infosExerciceStatique.urlcor)
          if (response.status === 200) {
            const text = await response.clone().text()
            if (!text.trim().startsWith('<!DOCTYPE html>')) {
              contentCorr = text
            } else {
              contentCorr = '\n\n\t%Pas de correction disponible\n\n'
            }
          }
        }
      }
      const annee = infosExerciceStatique?.annee
      const lieu = infosExerciceStatique?.lieu
      const mois = infosExerciceStatique?.mois
      const numeroInitial = infosExerciceStatique?.numeroInitial
      let examen: string = ''
      if (param.uuid.substring(0, 4) === 'crpe') examen = 'CRPE'
      if (param.uuid.substring(0, 4) === 'dnb_') examen = 'DNB'
      if (param.uuid.startsWith('dnbpro_')) examen = 'DNBPRO'
      if (param.uuid.substring(0, 4) === 'e3c_') examen = 'E3C'
      if (param.uuid.substring(0, 4) === 'bac_') examen = 'BAC'
      if (param.uuid.startsWith('sti2d_')) examen = 'STI2D'
      if (param.uuid.substring(0, 7) === 'evacom_') examen = 'EVACOM'
      exercices.push({
        typeExercice: 'statique',
        uuid: param.uuid,
        content,
        contentCorr,
        annee,
        lieu,
        mois,
        numeroInitial,
        examen,
      })
    } else {
      const exercice = await mathaleaLoadExerciceFromUuid(param.uuid)
      if (typeof exercice === 'undefined') continue
      mathaleaHandleParamOfOneExercice(exercice, param)
      exercices.push(exercice)
    }
  }
  return exercices
}

/**
 * Applique les paramètres sauvegardés dans un élément de exercicesParams à un exercice.
 */
export function mathaleaHandleParamOfOneExercice(
  exercice: TypeExercice,
  param: InterfaceParams,
) {
  exercice.uuid = param.uuid
  if (param.nbQuestions) exercice.nbQuestions = param.nbQuestions
  exercice.duration = param.duration ?? 10
  if (param.id) exercice.id = param.id
  if (param.sup) exercice.sup = mathaleaHandleStringFromUrl(param.sup)
  if (param.sup2) exercice.sup2 = mathaleaHandleStringFromUrl(param.sup2)
  if (param.sup3) exercice.sup3 = mathaleaHandleStringFromUrl(param.sup3)
  if (param.sup4) exercice.sup4 = mathaleaHandleStringFromUrl(param.sup4)
  if (param.sup5) exercice.sup5 = mathaleaHandleStringFromUrl(param.sup5)
  if (param.versionQcm !== undefined && exercice instanceof ExerciceSimple)
    exercice.versionQcm = param.versionQcm === '1'
  if (param.interactif) exercice.interactif = param.interactif === '1'
  if (param.alea) exercice.seed = param.alea
  if (param.cols !== undefined && param.cols > 1) exercice.nbCols = param.cols
  if (param.cd !== undefined) exercice.correctionDetaillee = param.cd === '1'
  if (exercice.seed === undefined) {
    exercice.seed = mathaleaGenerateSeed()
  }
}

/**
 * sup, sup2, sup3 et sup4 permettent de sauvegarder les formulaires modifiées par
 * les enseignants pour pparamétrer les exercices.
 * Ces paramètres peuvent être des strings, des booléens ou des number mais que ce soit dans l'url
 * ou dans le store exercicesParams, ils sont sauvegardés sous forme de string d'où cette fonction de conversion
 * d'un des trois types vers string.
 */
export function mathaleaHandleSup(param: boolean | string | number): string {
  if (typeof param === 'string') {
    return param
  } else if (typeof param === 'number') {
    return param.toString()
  } else if (typeof param === 'boolean') {
    return param ? 'true' : 'false'
  }
}

/**
 * sup, sup2, sup3 et sup4 permettent de sauvegarder les formulaires modifiés par
 * les enseignants pour paramétrer les exercices.
 * Ces paramètres peuvent être des strings, des booléens ou des numbers mais que ce soit dans l'url
 * ou dans le store exercicesParams, ils sont sauvegardés sous forme de string d'où cette fonction de conversion
 * du string vers booléen ou number.
 */
export function mathaleaHandleStringFromUrl(
  text: string,
): boolean | number | string {
  if (text === 'true' || text === 'false') {
    // "true"=>true
    return text === 'true'
  } else if (/^\d+$/.test(text)) {
    // "17"=>17
    return parseInt(text)
  } else {
    return text
  }
}

export function mathaleaRenderDiv(
  div: HTMLElement | null,
  zoom?: number,
): void {
  if (!div) return
  const params = get(globalOptions)
  zoom = zoom ?? Number(params.z)

  renderKatex(div)
  renderScratch('body')
  if (zoom !== -1) {
    resizeContent(div, zoom)
  }
}

function renderKatex(element: HTMLElement) {
  renderMathInElement(element, {
    delimiters: [
      { left: '\\[', right: '\\]', display: true },
      { left: '$', right: '$', display: false },
    ],
    // Les accolades permettent d'avoir une formule non coupée
    preProcess: (chaine: string) =>
      '{' + chaine.replaceAll(String.fromCharCode(160), '\\,') + '}',
    throwOnError: true,
    errorColor: '#CC0000',
    strict: 'warn',
    trust: false,
  })
  document.dispatchEvent(new window.Event('katexRendered'))
}

export function createURL(params: InterfaceParams[]) {
  const url = new URL(
    window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname,
  )
  for (const ex of params) {
    url.searchParams.append('uuid', ex.uuid)
    if (ex.id != null) url.searchParams.append('id', ex.id)
    if (ex.nbQuestions !== undefined)
      url.searchParams.append('n', ex.nbQuestions.toString())
    if (ex.duration != null)
      url.searchParams.append('d', ex.duration.toString())
    if (ex.sup != null) url.searchParams.append('s', ex.sup)
    if (ex.sup2 != null) url.searchParams.append('s2', ex.sup2)
    if (ex.sup3 != null) url.searchParams.append('s3', ex.sup3)
    if (ex.sup4 != null) url.searchParams.append('s4', ex.sup4)
    if (ex.sup5 != null) url.searchParams.append('s5', ex.sup5)
    if (ex.versionQcm != null) url.searchParams.append('qcm', ex.versionQcm)
    if (ex.interactif === '1') url.searchParams.append('i', '1')
    if (ex.cd != null) url.searchParams.append('cd', ex.cd)
    if (ex.cols != null) url.searchParams.append('cols', ex.cols.toString())
    if (ex.alea != null) url.searchParams.append('alea', ex.alea)
  }
  return url
}
/**
 * Modifie l'url courante avec le store exercicesParams ou un tableau similaire
 * sauf si le store freezeUrl est à true (utile sur un site externe)
 */
export function mathaleaUpdateUrlFromExercicesParams(
  params?: InterfaceParams[],
) {
  if (get(globalOptions).recorder === 'capytale') {
    sendToCapytaleMathaleaHasChanged()
  }
  if (get(freezeUrl) === true) return
  if (params === undefined) {
    params = get(exercicesParams)
  }
  const url = createURL(params)
  updateURLFromReferentielLocale(url)
  updateGlobalOptionsInURL(url)
}

/**
 * Analyse l'url courante de la fenêtre
 * pour mettre à jour exercicesParams
 * avec tous les exercices et les options
 * @returns vue
 */
export function mathaleaUpdateExercicesParamsFromUrl(
  urlString = window.location.href,
): InterfaceGlobalOptions {
  const currentRefToUuid = localisedIDToUuid[get(referentielLocale)]
  let urlNeedToBeFreezed = false
  let v: VueType | undefined
  let z = '1'
  let durationGlobal = 0
  let ds
  let nbVues: 1 | 2 | 3 | 4 = 1
  let flow: 0 | 1 | 2 = 0
  let screenBetweenSlides
  let pauseAfterEachQuestion
  let isImagesOnSides = false
  let sound: 0 | 1 | 2 | 3 | 4 = 0
  let shuffle = false
  let manualMode
  let select: number[] = []
  let order: number[] = []
  let title = ''
  let iframe = ''
  let answers = ''
  let recorder: 'capytale' | 'moodle' | 'labomep' | 'anki'
  let done: '1'
  let es
  let presMode:
    | 'liste_exos'
    | 'un_exo_par_page'
    | 'une_question_par_page'
    | 'recto'
    | 'verso' = 'liste_exos'
  let setInteractive = '2'
  let isSolutionAccessible = true
  let isInteractiveFree = true
  let oneShot = false
  let twoColumns = false
  let isTitleDisplayed = true
  let beta = false
  let url: URL
  let canDuration = 540
  let canTitle = ''
  let canSolAccess = true
  let canSolMode = 'gathered'
  let canIsInteractive = true
  try {
    url = new URL(urlString)
  } catch (error) {
    return {}
  }
  // let url = new URL(urlString)
  if (isCrypted(url)) {
    urlNeedToBeFreezed = true
    url = decrypt(url)
  }
  const entries = url.searchParams.entries()
  let indiceExercice = -1
  const newExercisesParams: InterfaceParams[] = []
  let previousEntryWasUuid = false
  try {
    for (const entry of entries) {
      if (entry[0] === 'uuid') {
        indiceExercice++
        const uuid = entry[1]
        const id = (
          Object.keys(currentRefToUuid) as (keyof typeof currentRefToUuid)[]
        ).find((key) => {
          return currentRefToUuid[key] === uuid
        })
        if (!newExercisesParams[indiceExercice])
          newExercisesParams[indiceExercice] = { uuid, id }
        newExercisesParams[indiceExercice].uuid = uuid // string
        newExercisesParams[indiceExercice].id = id // string
        newExercisesParams[indiceExercice].interactif = '0' // par défaut
      } else if (entry[0] === 'id' && !previousEntryWasUuid) {
        // En cas de présence d'un uuid juste avant, on ne tient pas compte de l'id
        indiceExercice++
        const id = entry[1]
        const uuid = currentRefToUuid[id as keyof typeof currentRefToUuid]
        if (!newExercisesParams[indiceExercice])
          newExercisesParams[indiceExercice] = { id, uuid }
      } else if (entry[0] === 'n') {
        newExercisesParams[indiceExercice].nbQuestions = parseInt(entry[1]) // int
      } else if (entry[0] === 'd') {
        newExercisesParams[indiceExercice].duration = parseInt(entry[1]) // int
      } else if (entry[0] === 's') {
        newExercisesParams[indiceExercice].sup = entry[1]
      } else if (entry[0] === 's2') {
        newExercisesParams[indiceExercice].sup2 = entry[1]
      } else if (entry[0] === 's3') {
        newExercisesParams[indiceExercice].sup3 = entry[1]
      } else if (entry[0] === 's4') {
        newExercisesParams[indiceExercice].sup4 = entry[1]
      } else if (entry[0] === 's5') {
        newExercisesParams[indiceExercice].sup5 = entry[1]
      } else if (entry[0] === 'qcm' && (entry[1] === '0' || entry[1] === '1')) {
        newExercisesParams[indiceExercice].versionQcm = entry[1]
      } else if (entry[0] === 'alea') {
        newExercisesParams[indiceExercice].alea = entry[1]
      } else if (entry[0] === 'cols') {
        newExercisesParams[indiceExercice].cols = parseInt(entry[1])
      } else if (entry[0] === 'i' && (entry[1] === '0' || entry[1] === '1')) {
        newExercisesParams[indiceExercice].interactif = entry[1]
      } else if (entry[0] === 'cd' && (entry[1] === '0' || entry[1] === '1')) {
        newExercisesParams[indiceExercice].cd = entry[1]
      } else if (entry[0] === 'v') {
        v = convertVueType(entry[1])
      } else if (entry[0] === 'recorder') {
        if (
          entry[1] === 'capytale' ||
          entry[1] === 'moodle' ||
          entry[1] === 'labomep' ||
          entry[1] === 'anki'
        ) {
          recorder = entry[1]
        }
      } else if (entry[0] === 'done' && entry[1] === '1') {
        done = '1'
      } else if (entry[0] === 'z') {
        z = entry[1]
      } else if (entry[0] === 'dGlobal') {
        durationGlobal = parseInt(entry[1])
      } else if (entry[0] === 'shuffle') {
        shuffle = true
      } else if (entry[0] === 'select') {
        select = entry[1].split('-').map((e) => parseInt(e))
      } else if (entry[0] === 'order') {
        order = entry[1].split('-').map((e) => parseInt(e))
      } else if (entry[0] === 'ds') {
        ds = entry[1]
      } else if (entry[0] === 'es') {
        es = entry[1]
      } else if (entry[0] === 'title') {
        title = decodeURIComponent(entry[1])
      } else if (entry[0] === 'iframe') {
        iframe = entry[1]
      } else if (entry[0] === 'answers') {
        answers = entry[1]
      } else if (entry[0] === 'beta') {
        beta = true
      } else if (entry[0] === 'canD') {
        canDuration = parseInt(entry[1])
      } else if (entry[0] === 'canT') {
        canTitle = entry[1]
      } else if (entry[0] === 'canSA') {
        canSolAccess = entry[1] === '1'
      } else if (entry[0] === 'canSM') {
        canSolMode = entry[1]
      } else if (entry[0] === 'canI') {
        canIsInteractive = entry[1] === '1'
      }

      if (entry[0] === 'uuid') previousEntryWasUuid = true
      else previousEntryWasUuid = false
    }
  } catch (error) {
    // MOUCHARD SUR LES URLS FANTAISISTES
    window.notify(`Erreur d'URL : ${error} `, {
      err: error,
      urlString,
      url: window.location.href.toString(),
      referrer: document.referrer,
    })
    console.error(error)
    showDialogForLimitedTime(
      'notifUrlIncorrecte',
      5000,
      "L'URL présente une erreur. Veuillez réessayer et nous contacter si le problème persiste.",
    )
    return {}
  }

  const newExercisesParamsFiltered = newExercisesParams.filter(
    (e) => e.uuid || e.id,
  )

  if (
    JSON.stringify(get(exercicesParams)) !==
    JSON.stringify(newExercisesParamsFiltered)
  ) {
    exercicesParams.set(newExercisesParamsFiltered)
  }

  if (urlNeedToBeFreezed) {
    freezeUrl.set(true)
  }

  if (v === 'can' || get(globalOptions).recorder === 'capytale') {
    canOptions.update((e) => {
      e.durationInMinutes = canDuration
      e.isInteractive = canIsInteractive
      e.solutionsAccess = canSolAccess
      if (canSolMode === 'gathered') e.solutionsMode = 'gathered'
      else e.solutionsMode = 'split'
      e.subTitle = canTitle
      return e
    })
  }

  if (ds) {
    const nbVuesCandidate = contraindreValeur(1, 4, ds.charAt(0), 1)
    const flowCandidate = contraindreValeur(0, 2, ds.charAt(1), 0)
    const soundCandidate = contraindreValeur(0, 4, ds.charAt(3), 0)
    if (isIntegerInRange1to4(nbVuesCandidate)) nbVues = nbVuesCandidate
    if (isIntegerInRange0to2(flowCandidate)) flow = flowCandidate
    if (isIntegerInRange0to4(soundCandidate)) sound = soundCandidate
    screenBetweenSlides = ds.charAt(2) === '1'
    shuffle = ds.charAt(4) === '1'
    manualMode = ds.charAt(5) === '1'
    pauseAfterEachQuestion = ds.charAt(6) === '1'
    isImagesOnSides = ds.charAt(7) === '1'
  }

  /**
   * es permet de résumer les réglages de la vue élève
   * Il est de la forme 210110
   * Avec un caractère par réglage presMode|setInteractive|isSolutionAccessible|isInteractiveFree|oneShot|twoColumns|isTitleDisplayed
   */
  if (es && es.length === 6) {
    presMode = presModeId[parseInt(es.charAt(0))]
    setInteractive = es.charAt(1)
    isSolutionAccessible = es.charAt(2) === '1'
    isInteractiveFree = es.charAt(3) === '1'
    oneShot = es.charAt(4) === '1'
    twoColumns = es.charAt(5) === '1'
  } else if (es && es.length === 7) {
    presMode = presModeId[parseInt(es.charAt(0))]
    setInteractive = es.charAt(1)
    isSolutionAccessible = es.charAt(2) === '1'
    isInteractiveFree = es.charAt(3) === '1'
    oneShot = es.charAt(4) === '1'
    twoColumns = es.charAt(5) === '1'
    isTitleDisplayed = es.charAt(6) === '1'
  }
  v = v ?? ''
  return {
    v,
    z,
    durationGlobal,
    ds,
    nbVues,
    flow,
    screenBetweenSlides,
    pauseAfterEachQuestion,
    isImagesOnSides,
    sound,
    shuffle,
    manualMode,
    select,
    order,
    title,
    presMode,
    setInteractive,
    isSolutionAccessible,
    isInteractiveFree,
    oneShot,
    twoColumns,
    isTitleDisplayed,
    recorder,
    done,
    beta,
    iframe,
    answers,
  }
}

/**
 * Les exercice qui ont le paramètre typeExercice égale à 'simple'
 * ne définissent qu'une seule question.
 * Avec cette fonction, on permet la création de plusieurs questions.
 */
export function mathaleaHandleExerciceSimple(
  exercice: TypeExercice,
  isInteractif: boolean,
  numeroExercice?: number,
) {
  if (numeroExercice !== undefined) exercice.numeroExercice = numeroExercice
  exercice.reinit()
  exercice.interactif = isInteractif
  for (
    let i = 0, cptSecours = 0;
    i < exercice.nbQuestions && cptSecours < 50;

  ) {
    const compare =
      exercice.compare == null ? fonctionComparaison : exercice.compare
    // Rémi : On devrait mettre cette comparaison par défaut mais cela ne convient pas aux expressions littérales
    // const options = exercice.optionsDeComparaison == null ? { nombreDecimalSeulement: true } : exercice.optionsDeComparaison
    const options =
      exercice.optionsDeComparaison == null ? {} : exercice.optionsDeComparaison
    seedrandom(String(exercice.seed) + i + cptSecours, { global: true })
    if (
      exercice.nouvelleVersion &&
      typeof exercice.nouvelleVersion === 'function'
    )
      exercice.nouvelleVersion(numeroExercice)
    if (exercice.questionJamaisPosee(i, String(exercice.correction))) {
      if (exercice.reponse != null) {
        if (compare != null) {
          /// DE LA AU PROCHAIN LA, ce sera à supprimer quand il n'y aura plus de this.compare
          let reponse = {}
          if (
            typeof exercice.reponse !== 'string' &&
            typeof exercice.reponse !== 'number'
          ) {
            if (exercice.reponse instanceof FractionEtendue) {
              reponse = {
                reponse: {
                  value: exercice.reponse.texFraction,
                  compare,
                  options,
                },
              }
            } else if (exercice.reponse instanceof Decimal) {
              reponse = {
                reponse: {
                  value: exercice.reponse.toString(),
                  compare,
                  options,
                },
              }
            } else if (exercice.reponse instanceof Grandeur) {
              reponse = {
                reponse: { value: exercice.reponse, compare, options },
              }
            } else if (
              typeof exercice.reponse === 'object' &&
              !Array.isArray(exercice.reponse)
            ) {
              // Si c'est handleAnswer qu'on veut utiliser directement avec un fillInTheBlank par exemple, on met l'objet reponse complet dans this.reponse
              reponse = exercice.reponse
            } else if (Array.isArray(exercice.reponse)) {
              reponse = {
                reponse: { value: exercice.reponse, compare, options },
              }
            } else {
              window.notify(
                `MathaleaHandleExerciceSimple n'a pas réussi à déterminer le type de exercice.reponse, dans ${exercice?.numeroExercice + 1} - ${exercice.titre} ${JSON.stringify(exercice.reponse)}, on Stingifie, mais c'est sans doute une erreur à rectifier`,
                { exercice: JSON.stringify(exercice) },
              )
              reponse = {
                reponse: { value: String(exercice.reponse), compare, options },
              }
            }
          } else {
            reponse = {
              reponse: {
                value:
                  typeof exercice.reponse === 'number'
                    ? String(exercice.reponse)
                    : exercice.reponse,
                compare,
                options,
              },
            }
          }
          handleAnswers(exercice, i, reponse, {
            formatInteractif: exercice.formatInteractif ?? 'mathlive',
          }) /// // PROCHAIN LA : La partie ci-dessus sera à supprimer quand il n'y aura plus de this.compare
        } else if (
          exercice.reponse instanceof Object &&
          exercice.reponse.reponse != null &&
          exercice.reponse.reponse.value != null &&
          typeof exercice.reponse.reponse.value === 'string'
        ) {
          handleAnswers(exercice, i, exercice.reponse)
        } else {
          setReponse(exercice, i, String(exercice.reponse), {
            formatInteractif: exercice.formatInteractif ?? 'calcul',
          })
        }
      } else {
        if (exercice.formatInteractif !== 'qcm')
          window.notify(
            "Un exercice simple doit avoir un this.reponse sauf si c'est un qcm",
            { exercice: JSON.stringify(exercice) },
          )
      }
      if (exercice.formatInteractif !== 'fillInTheBlank') {
        if (
          exercice.formatInteractif === 'qcm' ||
          (exercice instanceof ExerciceSimple &&
            exercice.distracteurs.length > 0 &&
            exercice.versionQcm)
        ) {
          if (
            exercice instanceof ExerciceSimple &&
            exercice.distracteurs.length > 0
          ) {
            exercice.distracteurs = getDistracteurs(exercice)
            exercice.autoCorrection[i] = {
              options: { radio: true },
              enonce: exercice.question,
              propositions: [
                {
                  texte: formaterReponse(exercice.reponse),
                  statut: true,
                },
                ...exercice.distracteurs.map((distracteur) => ({
                  texte: formaterReponse(distracteur),
                  statut: false,
                })),
              ],
            }
            const qcm = propositionsQcm(exercice, i)
            exercice.question += qcm.texte
          }
          exercice.listeQuestions.push(exercice.question || '')
        } else if (exercice.formatInteractif === 'listeDeroulante') {
          const n = exercice.numeroExercice
          exercice.question = exercice.question?.replace(
            `id="ex${n}Q0"`,
            `id="ex${n}Q${i}"`,
          )
          exercice.question = exercice.question?.replace(
            `CheckEx${n}Q0"`,
            `CheckEx${n}Q${i}"`,
          )
          exercice.listeQuestions.push(exercice.question ?? '')
        } else {
          exercice.listeQuestions.push(
            exercice.question +
              ajouteChampTexteMathLive(
                exercice,
                i,
                String(exercice.formatChampTexte),
                exercice.optionsChampTexte || {},
              ),
          )
        }
      } else {
        // La question doit contenir une unique variable %{champ1} On est en fillInTheBlank
        // Ou bien, on fait appel à un callback
        exercice.listeQuestions.push(
          remplisLesBlancs(
            exercice,
            i,
            String(exercice.question),
            'fillInTheBlank ' + exercice.formatChampTexte,
            '\\ldots',
          ),
        )
        if (
          typeof exercice.reponse === 'object' &&
          'callback' in exercice.reponse
        ) {
          // Cas d'un callback dans un exercice simple
          handleAnswers(exercice, i, exercice.reponse)
        } else if (
          typeof exercice.reponse === 'object' &&
          'champ1' in exercice.reponse
        ) {
          handleAnswers(exercice, i, exercice.reponse as Valeur, {
            formatInteractif: 'fillInTheBlank',
          })
        } else {
          handleAnswers(
            exercice,
            i,
            { champ1: { value: exercice.reponse ?? '' } },
            { formatInteractif: 'fillInTheBlank' },
          )
        }
      }
      exercice.listeCorrections.push(exercice.correction ?? '')
      exercice.listeCanEnonces?.push(exercice.canEnonce ?? '')
      exercice.listeCanReponsesACompleter?.push(
        exercice.canReponseACompleter ?? '',
      )
      exercice.listeCanLiees?.push(exercice.canLiee ?? '')
      exercice.listeCanNumerosLies?.push(exercice.canNumeroLie ?? '')

      cptSecours = 0
      i++
    } else {
      cptSecours++
    }
  }
}

export function getDistracteurs(
  exerciceSimple: ExerciceSimple,
): (string | number)[] {
  const distracteursUniques = [...new Set(exerciceSimple.distracteurs)]
  const distracteursNonSolutions = distracteursUniques.filter((distracteur) => {
    const reponse: ReponseComplexe | undefined = exerciceSimple.reponse
    if (reponse == null) {
      return true // Si pas de réponse, on garde tous les distracteurs
    }
    let value: AnswerValueType | undefined
    if (isAnswerValueType(reponse)) {
      value = reponse
    } else {
      // Si reponse n'est pas un AnswerValueType, alors c'est un Valeur dont on va récupérer le AnswerValueType
      const reponseReponse = reponse.reponse
      if (reponseReponse !== undefined) value = reponseReponse.value
    }
    if (value === undefined) {
      // Si pas de valeur, on garde tous les distracteurs
      return true
    }
    if (Array.isArray(value)) {
      return !value.some((v) => {
        if (v instanceof FractionEtendue) {
          return v.texFraction !== distracteur.toString()
        }
        return distracteur.toString() !== v.toString()
      })
    }
    if (value instanceof FractionEtendue) {
      return value.texFraction !== distracteur.toString()
    }
    return distracteur.toString() !== value.toString()
  })
  return shuffle(distracteursNonSolutions).slice(0, 3)
}

/**
 * Génère un string de 4 caractères qui sera utilisé comme seed pour l'aléatoire
 */
export function mathaleaGenerateSeed({
  includeUpperCase = true,
  includeNumbers = true,
  length = 4,
  startsWithLowerCase = false,
}: {
  includeUpperCase?: boolean
  includeNumbers?: boolean
  length?: number
  startsWithLowerCase?: boolean
} = {}) {
  let a = 10
  const b = 'abcdefghijklmnopqrstuvwxyz'
  let c = ''
  let d = 0
  let e = '' + b
  if (startsWithLowerCase) {
    c = b[Math.floor(Math.random() * b.length)]
    d = 1
  }
  if (length) {
    a = length
  }
  if (includeUpperCase) {
    e += b.toUpperCase()
  }
  if (includeNumbers) {
    e += '1234567890'
  }

  for (; d < a; d++) {
    c += e[Math.floor(Math.random() * e.length)]
  }
  return c
}

/**
 * Pour la sortie HTML, il faut modifier certains codages LaTeX non pris en charge par KaTeX
 * @param {string} texte
 * @returns string
 */
// Define the function with the condition check
export function mathaleaFormatExercice(texte = ' ') {
  const lang = getLang()
  // Replace symbols based on general rules
  let formattedText = texte
    .replace(/\\dotfill/g, '..............................')
    .replace(/\\not=/g, '≠')
    .replace(/\\ldots/g, '....')
    .replaceAll(' ?', '&nbsp;?')
    .replaceAll(' !', '&nbsp;!')
    .replaceAll(' ;', '&nbsp;;')
    .replaceAll(' :', '&nbsp;:')

  // Check if the language is 'fr-CH' and replace \times with \cdot if true
  if (lang === 'fr-CH') {
    formattedText = formattedText.replace(/\\times/g, '\\cdot')
    formattedText = formattedText.replace(/un antécédent/g, 'une préimage')
    formattedText = formattedText.replace(/l'antécédent/g, 'la préimage')
    formattedText = formattedText.replace(/des antécédents/g, 'des préimages')
    formattedText = formattedText.replace(/les antécédents/g, 'les préimages')
    formattedText = formattedText.replace(/pour antécédents/g, 'pour préimages')
    formattedText = formattedText.replace(/pour antécédent/g, 'pour préimage')
    formattedText = formattedText.replace(/d'antécédent/g, 'de préimage')
    formattedText = formattedText.replace(/antécédent/g, 'préimage')
    formattedText = formattedText.replace(
      /s'il existe et en l'expliquant, le coefficient directeur/g,
      'si elle existe, la pente',
    )
    formattedText = formattedText.replace(
      /le coefficient directeur/g,
      'la pente',
    )
    formattedText = formattedText.replace(
      /coefficients directeurs/g,
      'les pentes',
    )
    formattedText = formattedText.replace(
      /coefficient directeur respectif/g,
      'pente respective',
    )
    formattedText = formattedText.replace(
      /le même coefficient directeur/g,
      'la même pente',
    )
    formattedText = formattedText.replace(
      /aucun coefficient directeur/g,
      'aucune pente',
    )
    formattedText = formattedText.replace(/coefficient directeur/g, 'pente')
  }

  return formattedText
}

export function mathaleaGoToView(destinationView: '' | VueType) {
  const originView = get(globalOptions).v ?? ''
  const oldPart = '&v=' + originView
  const newPart = destinationView === '' ? '' : '&v=' + destinationView
  const urlString = window.location.href.replace(oldPart, newPart)
  previousView.set(originView)
  globalOptions.update((l) => {
    l.v = destinationView
    return l
  })
}

/**
 * On attend un élément ou des éléments du DOM en fonction d'un selecteur
 * @param elementId selecteur
 * @param timeWait temps en secondes
 * @returns une promise sur l'élément ou les éléments en question
 */
const waitForElement = async (
  elementId: string,
  timeWait = 4,
): Promise<NodeListOf<HTMLElement>> => {
  return new Promise((resolve, reject) => {
    const ele = document.querySelectorAll<HTMLElement>(elementId)
    if (ele.length) {
      // pas besoin d'attendre
      resolve(ele)
      return
    }

    let tempTime = 0
    const timeWait1000 = timeWait * 10
    const checkExist = setInterval(function () {
      const ele = document.querySelectorAll<HTMLElement>(elementId)
      if (ele.length) {
        // console.log(`Exists ${elementId}`)
        clearInterval(checkExist)
        resolve(ele)
      } else if (ele.length === 0 && tempTime > timeWait1000) {
        // console.log('Doesn\'t exist...')
        clearInterval(checkExist)
        reject(new Error(`Element not found ${elementId}`))
      } else {
        tempTime++
        // console.log(`Waiting for ${elementId}`, tempTime)
      }
    }, 100) // check every 100ms
  })
}

function log(message: string) {
  // console.log(message)
}

export function mathaleaWriteStudentPreviousAnswers(answers?: {
  [key: string]: string
}): Promise<Boolean>[] {
  const promiseAnswers: Promise<Boolean>[] = []
  const starttime = window.performance.now()
  for (const answer in answers) {
    if (answer.includes('sheet')) {
      const p = new Promise<Boolean>((resolve) => {
        waitForElement('#' + answer)
          .then(() => {
            // La réponse correspond à une figure apigeom
            const sheetElement = document.getElementById(
              answer,
            ) as MySpreadsheetElement
            if (sheetElement != null) {
              sheetElement.setData(JSON.parse(answers[answer]))
            }
            const time = window.performance.now()
            log(`duration ${answer}: ${time - starttime}`)
            resolve(true)
          })
          .catch((reason) => {
            console.error(reason)
            window.notify(`Erreur dans la réponse ${answer} : ${reason}`, {})
            resolve(true)
          })
      })
      promiseAnswers.push(p)
    } else if (
      answer.includes('apigeom') ||
      answers[answer].includes('apiGeomVersion')
    ) {
      const p = new Promise<Boolean>((resolve) => {
        waitForElement('#' + answer)
          .then(() => {
            // La réponse correspond à une figure apigeom
            const event = new CustomEvent(answer, { detail: answers[answer] })
            document.dispatchEvent(event)
            const time = window.performance.now()
            log(`duration ${answer}: ${time - starttime}`)
            resolve(true)
          })
          .catch((reason) => {
            console.error(reason)
            window.notify(`Erreur dans la réponse ${answer} : ${reason}`, {})
            resolve(true)
          })
      })
      promiseAnswers.push(p)
    } else if (answer.includes('cliquefigure')) {
      const p = new Promise<Boolean>((resolve) => {
        waitForElement('#' + answer)
          .then(() => {
            // La réponse correspond à une figure cliquefigures
            const ele = document.querySelector(`#${answer}`) as MathaleaSVG
            if (ele) {
              ele.etat = true
              ele.style.border = '3px solid #f15929'
              const time = window.performance.now()
              log(`duration ${answer}: ${time - starttime}`)
              resolve(true)
            }
          })
          .catch((reason) => {
            console.error(reason)
            window.notify(`Erreur dans la réponse ${answer} : ${reason}`, {})
            resolve(true)
          })
      })
      promiseAnswers.push(p)
    } else if (answer.includes('rectangleDND')) {
      const p = new Promise<Boolean>((resolve) => {
        waitForElement(`div#${answer.replace('DND', '')}`)
          .then(() => {
            const rectangle = document.querySelector(
              `div#${answer.replace('DND', '')}`,
            )
            if (rectangle !== null) {
              const listeOfIds = answers[answer].split(';')
              for (const id of listeOfIds) {
                // attention ! on a peut-être à faire à des clones ! qu'il faut recréer !
                if (!id.includes('-clone-')) {
                  // Non, c'est un original
                  const etiquette = document.querySelector(`div#${id}`)
                  if (etiquette !== null) {
                    // Remet l'étiquette à la bonne réponse
                    rectangle.appendChild(etiquette)
                  }
                } else {
                  // Là, on doit recloner l'original !
                  const idOriginalAndDate = id.split('-clone-')
                  const etiquetteOriginale = document.querySelector(
                    `div#${idOriginalAndDate[0]}`,
                  )
                  if (etiquetteOriginale != null) {
                    const clonedEtiquette = etiquetteOriginale.cloneNode(
                      true,
                    ) as HTMLDivElement
                    clonedEtiquette.id = `${idOriginalAndDate[0]}-clone-${idOriginalAndDate[1]}`
                    rectangle.appendChild(clonedEtiquette)
                  }
                }
              }
              const time = window.performance.now()
              log(`duration ${answer}: ${time - starttime}`)
              resolve(true)
            }
          })
          .catch((reason) => {
            console.error(reason)
            window.notify(`Erreur dans la réponse ${answer} : ${reason}`, {})
            resolve(true)
          })
      })
      promiseAnswers.push(p)
    } else if (answer.includes('clockEx')) {
      const p = new Promise<Boolean>((resolve) => {
        waitForElement('#' + answer)
          .then(() => {
            // La réponse correspond à une horloge
            const clock = document.querySelector(`#${answer}`)
            if (clock !== null) {
              const [hour, minute] = answers[answer].split('h')
              clock.setAttribute('hour', hour)
              clock.setAttribute('minute', minute)
              if (
                'updateHandHour' in clock &&
                typeof clock.updateHandHour === 'function'
              ) {
                clock.updateHandHour()
              }
              if (
                'updateHandMinute' in clock &&
                typeof clock.updateHandMinute === 'function'
              ) {
                clock.updateHandMinute()
              }
              const time = window.performance.now()
              log(`duration ${answer}: ${time - starttime}`)
              resolve(true)
            }
          })
          .catch((reason) => {
            console.error(reason)
            window.notify(`Erreur dans la réponse ${answer} : ${reason}`, {})
            resolve(true)
          })
      })
      promiseAnswers.push(p)
    } else if (answer.includes('sheet-')) {
      const p = new Promise<Boolean>((resolve) => {
        waitForElement('#' + answer)
          .then(() => {
            // La réponse correspond à une feuille de calcul univer
            const ele = document.querySelector(
              `#${answer}`,
            ) as MySpreadsheetElement
            if (ele) {
              const actions = answers[answer].split('&')
              for (const action of actions) {
                const [cell, formula] = action.split('->')
                console.info(cell, formula)
              }
              ele.style.pointerEvents = 'none' // Plus possible de modifier la feuille
              resolve(true)
            }
          })
          .catch((reason) => {
            console.error(reason)
            window.notify(`Erreur dans la réponse ${answer} : ${reason}`, {})
            resolve(true)
          })
      })
      promiseAnswers.push(p)
    } else {
      const p = new Promise<Boolean>((resolve) => {
        waitForElement(`[id$='${answer}']`)
          .then((eles) => {
            eles.forEach((ele) => {
              if (ele.tagName === 'LISTE-DEROULANTE') {
                // La réponse correspond à un select
                ;(ele as ListeDeroulanteElement).value = answers[answer]
                const time = window.performance.now()
                log(`duration ${answer}: ${time - starttime}`)
                resolve(true)
              } else if (ele.id.includes('check')) {
                // La réponse correspond à une case à cocher qui doit être cochée
                if (answers[answer] === '1') {
                  ;(ele as HTMLInputElement).checked = true
                }
                const time = window.performance.now()
                log(`duration ${answer}: ${time - starttime}`)
                resolve(true)
              } else if (
                ele.tagName === 'MATH-FIELD' &&
                'setValue' in ele &&
                typeof (ele as any).setValue === 'function'
              ) {
                // La réponse correspond à un champs texte
                ;(ele as any).setValue(answers[answer])
                const time = window.performance.now()
                log(`duration ${answer}: ${time - starttime}`)
                resolve(true)
              } else if (ele.tagName === 'INPUT') {
                ;(ele as HTMLInputElement).value = answers[answer]
                const time = window.performance.now()
                log(`duration ${answer}: ${time - starttime}`)
                resolve(true)
              }
            })
          })
          .catch((reason) => {
            console.error(reason)
            window.notify(`Erreur dans la réponse ${answer} : ${reason}`, {})
            resolve(true)
          })
      })
      promiseAnswers.push(p)
    }
  }
  return promiseAnswers
}

export async function getExercisesFromExercicesParams() {
  const exercises = []
  for (const paramsExercice of get(exercicesParams)) {
    if (isStatic(paramsExercice.uuid) || isSvelte(paramsExercice.uuid)) {
      continue
    }
    const exercise: TypeExercice = await mathaleaLoadExerciceFromUuid(
      paramsExercice.uuid,
    )
    mathaleaHandleParamOfOneExercice(exercise, paramsExercice)
    exercise.duration = paramsExercice.duration ?? 10
    exercises.push(exercise)
  }
  return exercises
}
