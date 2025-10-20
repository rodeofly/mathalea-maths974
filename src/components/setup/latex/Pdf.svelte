<script lang="ts">
  import { afterUpdate, beforeUpdate, onDestroy, onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { Carousel, initTE } from 'tw-elements'
  import type TypeExercice from '../../../exercices/Exercice'
  import Latex, {
      doesLatexNeedsPics,
      type LatexFileInfos,
      type latexFileType
  } from '../../../lib/Latex'
  import {
      mathaleaGetExercicesFromParams,
      mathaleaGoToView,
  } from '../../../lib/mathalea.js'
  import { darkMode, exercicesParams } from '../../../lib/stores/generalStore'
  import { referentielLocale } from '../../../lib/stores/languagesStore'
  import Footer from '../../Footer.svelte'
  import ButtonCompileLatexToPdf from '../../shared/forms/ButtonCompileLatexToPDF.svelte'
  import ButtonTextAction from '../../shared/forms/ButtonTextAction.svelte'
  import FormConfigGlobal from '../../shared/forms/FormConfigGlobal.svelte'
  import FormConfigIndividual from '../../shared/forms/FormConfigIndividual.svelte'
  import NavBar from '../../shared/header/NavBar.svelte'
  import SimpleCard from '../../shared/ui/SimpleCard.svelte'
  import FormConfigSection from './FormConfigSection.svelte'
  import { decodeBase64, encodeBase64 } from './LatexConfig'
  import PdfResult from './PdfResult.svelte'

  
  let showAdvanced = false; // toggle pour les paramètres avancés



  const url = new URL(window.location.href)
  const decoded = decodeBase64(url.searchParams.get("pdfParam") || "") as Partial<LatexFileInfos>

  /**
   * Toutes les variables configurables par l'interface WEB
   * qui adaptent la sortie PDF
   */
  let latexFileInfos: LatexFileInfos = {
    title: '',
    reference: '',
    subtitle: '',
    style: 'ProfMaquette',
    fontOption: 'StandardFont',
    tailleFontOption: 12,
    dysTailleFontOption: 14,
    correctionOption: 'AvecCorrection',
    qrcodeOption: 'SansQrcode',
    typeFiche: 'Fiche',
    durationCanOption: '9 min',
    titleOption: 'SansTitre',
    nbVersions: 1,
    exos: {},      // tu peux garder vide par défaut
    ...decoded     // ⚡ écrase les valeurs par défaut si présente
  }

  let pdfParam = encodeBase64(latexFileInfos)

  url.searchParams.set('pdfParam', pdfParam)

  const imgStylePartialUrls = {
    Coopmaths: 'images/exports/export-coopmaths',
    Classique: 'images/exports/export-classique',
    ProfMaquette: 'images/exports/export-profmaquette',
    ProfMaquetteQrcode: 'images/exports/export-profmaquette-qrcode',
    Can: 'images/exports/export-can',
  }
  let exercices: TypeExercice[]
  let latexFile: latexFileType = {
    contents: { preamble: '', intro: '', content: '', contentCorr: '' },
    latexWithoutPreamble: '',
    latexWithPreamble: '',
  }
  let isExerciceStaticInTheList = false
  let picsWanted: boolean
  let promise: Promise<void>
  let activeTab : "general" | "advanced" | "global" = "general"
  

  const latex = new Latex()

  async function initExercices(indexesToLoad?: number[]) {
    log('initExercices')
    const interfaceParams = get(exercicesParams)
    interfaceParams.forEach((e) => {
      e.interactif = '0'
    })
    exercices = await mathaleaGetExercicesFromParams(interfaceParams)
    latex.addExercices(exercices.filter((ex, index) => ex.typeExercice !== 'html' && (!indexesToLoad || indexesToLoad.includes(index))))
    isExerciceStaticInTheList = latex.isExerciceStaticInTheList()
    latexFile.contents = await latex.getContents(latexFileInfos)
    picsWanted = doesLatexNeedsPics(latexFile.contents)
  }

  async function updateLatexWithAbortController() {
    const clone = UpdateController.update()
    if (clone.signal?.aborted) {
      return Promise.reject(
        new DOMException(
          'Aborted in updateLatexWithAbortController',
          'AbortError',
        ),
      )
    }

    return new Promise<void>(async (resolve, reject) => {
      // Listen for abort event on signal
      const rej = () => {
        log('reject')
        clone.signal?.removeEventListener('abort', rej)
        reject(
          new DOMException(
            'Aborted in updateLatexWithAbortController',
            'AbortError',
          ),
        )
      }
      clone.signal?.addEventListener('abort', rej)
      // Something fake async
      await updateLatex(clone)
        .then(() => {
          clone.signal?.removeEventListener('abort', rej)
          log('Promise resolu')
          resolve()
        })
        .catch((err) => {
          reject(new DOMException(`Aborted : ${err.message}`, 'AbortError'))
        })
    })
  }

  async function updateLatex(clone: LatexFileInfos) {
    try {
      log('updateLatex')
      // await new Promise((resolve) => setTimeout(resolve, 10000))
      latexFile = await latex.getFile(clone)
      log('fin updateLatex')
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // nouvelle demande de fichier LATEX demandée
        throw error
      }
      console.error('Erreur lors de la création du code LaTeX :', error)
      latexFile.latexWithoutPreamble = '% Erreur à signaler'
    }
  }

  class UpdateController {
    static controller: AbortController | undefined
    static update() {
      if (UpdateController.controller === undefined) {
        UpdateController.controller = new AbortController()
      } else {
        UpdateController.controller.abort()
        UpdateController.controller = new AbortController()
      }
      const clone = structuredClone(latexFileInfos)
      clone.signal = UpdateController.controller.signal
      return clone
    }
  }

  const debug = url.searchParams.get('log') === '5' || false
  function log(str: string) {
    if (debug) {
      console.info(str)
    }
  }

  $: {
    if (latex.exercices.length > 0) {
      log('update')
      latexFileInfos = {
        ...latexFileInfos,
        exos: {
          ...latexFileInfos.exos
          // les blocrep sont déjà des sous-objets clonés quand tu les modifies
        }
      }
      const newPdfParam = encodeBase64(latexFileInfos)
      if (newPdfParam !== pdfParam) {
        pdfParam = newPdfParam
         url.searchParams.set('pdfParam', pdfParam)
         history.replaceState(null, "", url)  // change l’URL sans recharger

         promise = updateLatexWithAbortController().catch((err) => {
            if (err.name === 'AbortError') {
              log('Promise Aborted')
            } else {
              log('Promise Rejected')
            }
          })
      }
    }
  }

  async function forceUpdate() {
    log('forceUpdate')
    latexFileInfos.title = latexFileInfos.title
  }

  onMount(async () => {
    initTE({ Carousel })
    promise = initExercices()
      .then(() => updateLatexWithAbortController())
      .catch((err) => {
        if (err.name === 'AbortError') {
          log('Promise Aborted')
        } else {
          log('Promise Rejected')
        }
      })
    document.addEventListener('updateAsyncEx', forceUpdate)
  })

  onDestroy(async () => {
    document.removeEventListener('updateAsyncEx', forceUpdate)
  })

  beforeUpdate(async () => {
    // console.log('beforeUpdate')
  })

  afterUpdate(async () => {
    // console.log('afterUpdate')
  })

 
</script>

<main
  class="bg-coopmaths-canvas dark:bg-coopmathsdark-canvas {$darkMode.isActive
    ? 'dark'
    : ''}"
>
  <NavBar
    subtitle="PDF"
    subtitleType="export"
    handleLanguage="{() => {}}"
    locale="{$referentielLocale}"
  />
  <section class="px-4 py-0 bg-coopmaths-canvas dark:bg-coopmathsdark-canvas">
    <!-- Titre toujours en pleine largeur -->
    <h1
      class="w-full text-center md:text-left text-coopmaths-struct 
             dark:text-coopmathsdark-struct text-2xl md:text-4xl font-bold mb-6"
    >
      Visualisation du PDF     
      <button
        class="mx-2 tooltip tooltip-left tooltip-neutral"
        data-tip="Changer les paramètres du PDF"
        type="button"
        on:click="{() => { showAdvanced = !showAdvanced }}"
      >
        <i
          class="text-coopmaths-action hover:text-coopmaths-action-lightest 
                 dark:text-coopmathsdark-action dark:hover:text-coopmathsdark-action-lightest 
                 bx bx-slider"
        ></i>
      </button>
    </h1>

    <!-- Grille responsive uniquement pour le contenu -->
    <div class="{showAdvanced ? 'grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 items-stretch' : ''}">
      
      {#if showAdvanced}
        <!-- Colonne configuration -->
        <div class="flex flex-col space-y-8">
          
          <!-- Barre d’onglets -->
          <div class="flex space-x-4 border-b border-gray-600 mb-4">
            <button
              class="pb-2 px-2 -mb-px text-sm font-medium transition-colors duration-200"
              class:text-blue-500={activeTab === "general"}
              class:border-b-2={activeTab === "general"}
              class:border-blue-500={activeTab === "general"}
              class:text-gray-400={activeTab !== "general"}
              class:hover:text-gray-200={activeTab !== "general"}
              on:click={() => (activeTab = "general")}
            >
              Général
            </button>
            <button
              class="pb-2 px-2 -mb-px text-sm font-medium transition-colors duration-200"
              class:text-blue-500={activeTab === "global"}
              class:border-b-2={activeTab === "global"}
              class:border-blue-500={activeTab === "global"}
              class:text-gray-400={activeTab !== "global"}
              class:hover:text-gray-200={activeTab !== "global"}
              on:click={() => (activeTab = "global")}
              >
              Global
            </button>

            <button
              class="pb-2 px-2 -mb-px text-sm font-medium transition-colors duration-200"
              class:text-blue-500={activeTab === "advanced"}
              class:border-b-2={activeTab === "advanced"}
              class:border-blue-500={activeTab === "advanced"}
              class:text-gray-400={activeTab !== "advanced"}
              class:hover:text-gray-200={activeTab !== "advanced"}
              on:click={() => (activeTab = "advanced")}
            >
              Avancé
            </button>
          </div>

          <!-- les onglets -->
          {#if activeTab === "general"}
          <div class="mb-6 border rounded-lg p-4 bg-gray-50 mx-auto h-[70vh] overflow-y-auto">
            <div
              class="mb-4 flex flex-col md:flex-row w-full justify-between rounded-lg 
                    bg-coopmaths-canvas-dark shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),
                    0_10px_20px_-2px_rgba(0,0,0,0.04)] 
                    dark:bg-coopmathsdark-canvas-dark"
            >
            <div class="flex flex-col py-4 pl-16 w-2/3">
            <FormConfigSection
              {latex}
              bind:latexFileInfos
              {promise}
            />
            </div>
            <!-- Carousel de vignette pour les aperçus -->
            <div class="flex justify-center w-full md:w-1/3">
              <div
                id="carouselExampleSlidesOnly"
                class="relative w-2/3 md:w-full"
                data-te-carousel-init
                data-te-ride="carousel"
              >
                <div
                  class="relative w-full overflow-hidden after:clear-both after:block after:content-['']"
                >
                  <!-- first item -->
                  <div
                    class="relative float-left -mr-[100%] w-full transition-transform duration-[300ms] ease-in-out motion-reduce:transition-none"
                    data-te-carousel-item
                    data-te-carousel-active
                  >
                    <img
                      src="{`${imgStylePartialUrls[latexFileInfos.style]}-thumb1.png`}"
                      alt="{latexFileInfos.style} image-1"
                      class="block h-auto w-full rounded-r-lg max-w-[200px]"
                    />
                  </div>
                  <!-- second item -->
                  <div
                    class="relative float-left -mr-[100%] hidden w-full transition-transform duration-[300ms] ease-in-out motion-reduce:transition-none"
                    data-te-carousel-item
                  >
                    <img
                      src="{`${imgStylePartialUrls[latexFileInfos.style]}-thumb2.png`}"
                      alt="{latexFileInfos.style} image-2"
                      class="block h-auto w-full rounded-r-lg"
                    />
                  </div>
                </div>
              </div>
            </div> <!-- fin carousel -->
          </div>

          <SimpleCard icon="{''}" title="{'Éléments de titres'}" class="mb-4">
            <input type="text" placeholder="Titre" bind:value="{latexFileInfos.title}" />
            <input type="text" placeholder="Référence" bind:value="{latexFileInfos.reference}" />
            <input type="text" placeholder="Sous-titre" bind:value="{latexFileInfos.subtitle}" />
          </SimpleCard>

          <SimpleCard icon="{''}" title="{'Nombre de versions des exercices'}" class="mb-4">
            <input type="number" min="1" max="20" bind:value="{latexFileInfos.nbVersions}" />
          </SimpleCard>

          <SimpleCard title="{''}" icon="{''}" class="mb-4">
            <ButtonTextAction
                class="px-2 py-1 rounded-md"
                id="vueLatex"
                on:click="{() => {
                  mathaleaGoToView('latex')
                }}"
                text="Basculer vers la vue Latex"
              />

            <ButtonCompileLatexToPdf
              class="px-4 rounded-lg flex gap-3 bg-coopmaths-action justify-center hover:bg-coopmaths-action-lightest dark:bg-coopmathsdark-action dark:hover:bg-coopmathsdark-action-lightest text-white"
              {latex}
              {latexFileInfos}
              id="1"
            />
          </SimpleCard>
        </div>
        {/if}
        {#if activeTab === "global"}
           <div
            class="flex flex-col md:flex-row w-full justify-between rounded-lg 
                  bg-coopmaths-canvas-dark shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),
                  0_10px_20px_-2px_rgba(0,0,0,0.04)] 
                  dark:bg-coopmathsdark-canvas-dark"
          >
          <div class="mb-6 border rounded-lg p-4 bg-gray-50 mx-auto h-[70vh] overflow-y-auto">
            <FormConfigGlobal
                bind:latexFileInfos
                {latex}
              />
            </div>
          </div>
        {/if}
        {#if activeTab === "advanced"}
          <div
              class="flex flex-col md:flex-row w-full justify-between rounded-lg 
                    bg-coopmaths-canvas-dark shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),
                    0_10px_20px_-2px_rgba(0,0,0,0.04)] 
                    dark:bg-coopmathsdark-canvas-dark"
            >
            <div class="mb-6 border rounded-lg p-4 bg-gray-50 mx-auto h-[70vh] overflow-y-auto">
              <FormConfigIndividual
                bind:latexFileInfos
                {latex}
              />
            </div>
          </div>
        {/if}
      </div>
       {/if}
      <!-- Colonne rendu PDF -->
      <div 
        class="shadow-md bg-coopmaths-canvas-dark dark:bg-coopmathsdark-canvas-dark 
              text-coopmaths-corpus dark:text-coopmathsdark-corpus 
              w-full overflow-y-auto overflow-x-scroll text-xs 
              min-h-[70vh]
              {showAdvanced ? 'col-span-1 md:col-span-1 xl:col-span-2 h-full' : 'h-[70vh]'}"
      >
        {#await promise}
          <p>Chargement en cours...</p>
        {:then}
          <PdfResult {latex} {latexFileInfos} />
        {/await}
      </div>
    </div>
  </section>

  <footer>
    <Footer />
  </footer>
</main>

<style>
  footer {
    margin-top: auto;
  }
</style>
