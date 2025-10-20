import type Exercice from '../exercices/Exercice'
import type Figure from 'apigeom'
import { context } from '../modules/context'
import { globalOptions } from '../../src/lib/stores/generalStore'
import { canOptions } from '../../src/lib/stores/canStore'
import { get } from 'svelte/store'

/**
 * - Insère une figure apigeom dans la sortie HTML de l'exercice
 *
 * - defaultAction permet de sélectionner le bouton activé par défaut (bouton qui doit être présent dans la toolbar de la figure)
 *
 * - L'id est générée automatiquement avec le numéro de l'exercice et de la question
 *
 * - Si une même question a plusieurs figures, il faut ajouter un idAddendum (par exemple 'Correction' pour la figure de correction)
 */
export default function figureApigeom({
  exercice,
  figure,
  animation = false,
  i,
  defaultAction,
  idAddendum = '',
  isDynamic,
}: {
  exercice: Exercice
  figure: Figure
  animation?: boolean
  i: number
  /** identifiant supplémentaire pour identifier l'
   * si c'est la figure de la correction ou une 2e figure dans la question
   */
  idAddendum?: string
  /** Action en cours au lancement de l'exercice qui doit obligatoirement être un bouton de la toolbar */
  defaultAction?: string
  /** figure chargé en interactif et pourtant on souhaite qu'elle soit statique => isDynamic = false */
  isDynamic?: boolean
}): string {
  if (!context.isHtml) return ''
  // Styles par défaut
  figure.isDynamic = isDynamic !== undefined ? isDynamic : !!exercice.interactif
  figure.divButtons.style.display = figure.isDynamic ? 'grid' : 'none'
  figure.divUserMessage.style.fontSize = '1em'
  figure.divUserMessage.style.pointerEvents = 'none'
  figure.divUserMessage.style.removeProperty('color')
  figure.divUserMessage.classList.add('text-coopmaths-struct')
  if (!exercice.interactif) {
    figure.divUserMessage.style.display = 'none'
  }
  const idApigeom = `apigeomEx${exercice.numeroExercice}F${i}${idAddendum}`
  figure.id = idApigeom

  // Pour revoir la copie de l'élève dans Capytale
  // Attention, la clé de answers[] doit contenir apigeom, c'est pourquoi l'id est généré par cette fonction
  function idApigeomFunct(event: Event): void {
    if (!figure.container) {
      // figure effacée, donc on annule la mise à jour...
      document.removeEventListener(idApigeom, idApigeomFunct)
      return
    }
    const customEvent = event as CustomEvent
    const json = customEvent.detail
    figure.loadJson(JSON.parse(json))
    if (get(canOptions).isChoosen && get(canOptions).state === 'solutions') {
      // c'est la can et on est en mode solutions
      figure.divButtons.style.display = 'none'
      figure.divUserMessage.style.display = 'none'
    }
  }
  document.addEventListener(idApigeom, idApigeomFunct)

  let oldZoom = 1
  function updateZoom(event: Event): void {
    if (!figure.container || !figure.container.id) {
      // figure effacée, donc on annule la mise à jour...
      document.removeEventListener('zoomChanged', updateZoom)
      return
    }
    // console.log('ExZoom:' + idApigeom)
    const customEvent = event as CustomEvent
    const zoom = Number(customEvent.detail.zoom)
    if (oldZoom !== zoom) {
      oldZoom = zoom
      // console.log('zoom:' + idApigeom + ':' + zoom)
      if (figure != null)
        figure.zoom(zoom, {
          changeHeight: true,
          changeWidth: true,
          changeLeft: false,
          changeBottom: false,
        })
    }
  }
  document.addEventListener('zoomChanged', updateZoom)

  function updateAffichage(): void {
    if (!figure.container || !figure.container.id) {
      // figure effacée, donc on annule la mise à jour...
      document.removeEventListener('exercicesAffiches', updateAffichage)
      document.removeEventListener('zoomChanged', updateZoom)
      document.removeEventListener(idApigeom, idApigeomFunct)
      return
    }
    // console.log('ExAff:' + idApigeom)
    if (!context.isHtml) {
      // document.removeEventListener('exercicesAffiches', updateAffichage)
      return
    }
    const container = document.querySelector(`#${idApigeom}`) as HTMLDivElement
    // alert('container:' + figure.id + ':' + container)
    if (container == null) {
      // document.removeEventListener('exercicesAffiches', updateAffichage)
      return
    }
    container.innerHTML = ''
    figure.setContainer(container)
    if (animation) {
      figure.divUserMessage.innerHTML = ''
      figure.restart()
      setTimeout(() => {
        figure.buttons.get('PLAY')?.click()
      }, 3000)
    }
    if (defaultAction) {
      figure.buttons.get(defaultAction)?.click()
      // MGu que la première fois
      defaultAction = ''
    }
    const zoom = Number(get(globalOptions).z)
    if (oldZoom !== zoom) {
      oldZoom = zoom
      // console.log('ExAff:' + idApigeom + ':' + zoom)
      figure.zoom(zoom, {
        changeHeight: true,
        changeWidth: true,
        changeLeft: false,
        changeBottom: false,
      })
    }
  }
  document.addEventListener('exercicesAffiches', updateAffichage)

  return `<div class="m-6 leading-none" id="${idApigeom}"></div><span id="resultatCheckEx${exercice.numeroExercice}Q${i}"></span><div class="ml-2 py-2 text-coopmaths-warn-darkest dark:text-coopmathsdark-warn-darkest" id="feedbackEx${exercice.numeroExercice}Q${i}"></div>`
}
