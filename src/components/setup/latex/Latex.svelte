<script lang="ts">
  import { afterUpdate, beforeUpdate, onDestroy, onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { Carousel, initTE } from 'tw-elements'
  import type TypeExercice from '../../../exercices/Exercice'
  import { downloadTexWithImagesZip, downloadZip } from '../../../lib/files'
  import Latex, {
      doesLatexNeedsPics,
      getExosContentList,
      getPicsNames,
      makeImageFilesUrls,
      type Exo,
      type LatexFileInfos,
      type latexFileType,
      type picFile,
  } from '../../../lib/Latex'
  import {
      mathaleaGetExercicesFromParams,
      mathaleaGoToView,
      mathaleaRenderDiv,
      mathaleaUpdateUrlFromExercicesParams
  } from '../../../lib/mathalea.js'
  import { darkMode, exercicesParams } from '../../../lib/stores/generalStore'
  import { referentielLocale } from '../../../lib/stores/languagesStore'
  import Footer from '../../Footer.svelte'
  import ButtonActionInfo from '../../shared/forms/ButtonActionInfo.svelte'
  import ButtonCompileLatexToPDF from '../../shared/forms/ButtonCompileLatexToPDF.svelte'
  import ButtonCompileLatexToPdfLink from '../../shared/forms/ButtonCompileLatexToPDFLink.svelte'
  import ButtonOverleaf from '../../shared/forms/ButtonOverleaf.svelte'
  import ButtonTextAction from '../../shared/forms/ButtonTextAction.svelte'
  import NavBar from '../../shared/header/NavBar.svelte'
  import BasicClassicModal from '../../shared/modal/BasicClassicModal.svelte'
  import SimpleCard from '../../shared/ui/SimpleCard.svelte'
  import FormConfigSection from './FormConfigSection.svelte'
  import { decodeBase64, encodeBase64 } from './LatexConfig'

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
    style: 'Coopmaths',
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

  const imgStylePartialUrls = {
    Coopmaths: 'images/exports/export-coopmaths',
    Classique: 'images/exports/export-classique',
    ProfMaquette: 'images/exports/export-profmaquette',
    ProfMaquetteQrcode: 'images/exports/export-profmaquette-qrcode',
    Can: 'images/exports/export-can',
  }
  let dialogLua: HTMLDialogElement
  let exercices: TypeExercice[]
  let latexFile: latexFileType = {
    contents: { preamble: '', intro: '', content: '', contentCorr: '' },
    latexWithoutPreamble: '',
    latexWithPreamble: '',
  }

  let picsWanted: boolean
  let messageForCopyPasteModal: string
  let picsNames: picFile[][] = []
  let exosContentList: Exo[] = []
  let divText: HTMLDivElement
  let promise: Promise<void>
  let isDownloadPicsModalDisplayed = false
  let pdfParam = ''

  const latex = new Latex()

  async function initExercices() {
    // console.log('initExercices')
    const interfaceParams = get(exercicesParams)
    interfaceParams.forEach((e) => {
      e.interactif = '0'
    })
    mathaleaUpdateUrlFromExercicesParams(interfaceParams)
    exercices = await mathaleaGetExercicesFromParams(interfaceParams)
    latex.addExercices(exercices.filter((ex) => ex.typeExercice !== 'html'))
    latexFile.contents = await latex.getContents(latexFileInfos)
    picsWanted = doesLatexNeedsPics(latexFile.contents)
    messageForCopyPasteModal = buildMessageForCopyPaste(picsWanted)
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

  const debug = false
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

      pdfParam = encodeBase64(latexFileInfos)
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

  async function forceUpdate() {
    log('forceUpdate')
    latexFileInfos.title = latexFileInfos.title
  }

  onMount(async () => {
    initTE({ Carousel })
    // console.log('onMount')
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
    mathaleaRenderDiv(divText)
    // console.log('fin onMount')
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

  /**
   * Gérer le téléchargement des images dans une archive `images.zip` lors du clic sur le bouton du modal
   * @author sylvain
   */
  function handleActionFromDownloadPicsModal() {
    // console.log('handleActionFromDownloadPicsModal')
    const imagesFilesUrls = makeImageFilesUrls(exercices)
    downloadZip(imagesFilesUrls, 'images.zip')
    isDownloadPicsModalDisplayed = false
  }

  /**
   * Gérer l'affichage du modal : on donne la liste des images par exercice
   */
  function handleDownloadPicsModalDisplay() {
    // console.log('handleDownloadPicsModalDisplay')
    exosContentList = getExosContentList(exercices)
    picsNames = getPicsNames(exosContentList)
    isDownloadPicsModalDisplayed = true
  }

  /**
   * Construction d'un message contextualisé indiquant le besoin de télécharger les images si besoin
   */
  export function buildMessageForCopyPaste(picsWanted: boolean) {
    if (picsWanted) {
      return `<p>Le code LaTeX a été copié dans le presse-papier.</p>
      <p class="font-bold text-coopmaths-warn-darkest">Ne pas oublier de télécharger les figures !</p>`
    } else {
      return 'Le code LaTeX a été copié dans le presse-papier.'
    }
  }
</script>

<main
  class="bg-coopmaths-canvas dark:bg-coopmathsdark-canvas {$darkMode.isActive
    ? 'dark'
    : ''}"
>
  <NavBar
    subtitle="LaTeX"
    subtitleType="export"
    handleLanguage="{() => {}}"
    locale="{$referentielLocale}"
  />

  <section
    class="px-4 py-0 md:py-10 bg-coopmaths-canvas dark:bg-coopmathsdark-canvas"
  >
    <h1
      class="mb-4 text-center md:text-left text-coopmaths-struct dark:text-coopmathsdark-struct text-2xl md:text-4xl font-bold"
    >
      Paramétrage
    </h1>
    <div
      class="grid grid-cols-1 grid-rows-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
    >
      <div
        class="flex flex-col w-full md:flex-row justify-between rounded-lg bg-coopmaths-canvas-dark shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-coopmathsdark-canvas-dark"
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
                  class="block h-auto w-full rounded-r-lg"
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
        </div>
      </div>

      <SimpleCard icon="{''}" title="{'Éléments de titres'}">
        <div class="flex flex-col w-full justify-start items-start space-y-2">
          <input
            type="text"
            id="export-latex-titre-input"
            class="border-1 w-full disabled:opacity-20 border-coopmaths-action dark:border-coopmathsdark-action focus:border-coopmaths-action-lightest dark:focus:border-coopmathsdark-action-lightest focus:outline-0 focus:ring-0 focus:border-1 bg-coopmaths-canvas dark:bg-coopmathsdark-canvas text-sm text-coopmaths-corpus-light dark:text-coopmathsdark-corpus-light placeholder:opacity-40"
            placeholder="{latexFileInfos.style === 'Can'
              ? 'Course aux nombres'
              : 'Titre'}"
            bind:value="{latexFileInfos.title}"
          />
          <input
            type="text"
            id="export-latex-reference-input"
            class=" border-1 w-full disabled:opacity-20 border-coopmaths-action dark:border-coopmathsdark-action focus:border-coopmaths-action-lightest dark:focus:border-coopmathsdark-action-lightest focus:outline-0 focus:ring-0 focus:border-1 bg-coopmaths-canvas dark:bg-coopmathsdark-canvas text-sm text-coopmaths-corpus-light dark:text-coopmathsdark-corpus-light placeholder:opacity-40"
            placeholder="{latexFileInfos.style === 'Coopmaths' ||
            latexFileInfos.style === 'ProfMaquetteQrcode' ||
            latexFileInfos.style === 'ProfMaquette'
              ? 'Référence'
              : 'Haut de page gauche'}"
            bind:value="{latexFileInfos.reference}"
            disabled="{latexFileInfos.style === 'Can'}"
          />
          <input
            type="text"
            id="export-latex-soustitre-input"
            class="border-1 w-full disabled:opacity-20 border-coopmaths-action dark:border-coopmathsdark-action focus:border-coopmaths-action-lightest dark:focus:border-coopmathsdark-action-lightest focus:outline-0 focus:ring-0 focus:border-1 bg-coopmaths-canvas dark:bg-coopmathsdark-canvas text-sm text-coopmaths-corpus-light dark:text-coopmathsdark-corpus-light placeholder:opacity-40"
            placeholder="{latexFileInfos.style === 'Coopmaths' ||
            latexFileInfos.style === 'ProfMaquetteQrcode' ||
            latexFileInfos.style === 'ProfMaquette'
              ? 'Sous-titre / Chapitre'
              : 'Pied de page droit'}"
            bind:value="{latexFileInfos.subtitle}"
            disabled="{latexFileInfos.style === 'Can'}"
          />
        </div>
      </SimpleCard>
      <SimpleCard icon="{''}" title="{'Nombre de versions des exercices'}">
        <input
          type="number"
          id="export-latex-nb-versions-input"
          class="min-w-14 border-1 w-1/5 border-coopmaths-action dark:border-coopmathsdark-action focus:border-coopmaths-action-lightest dark:focus:border-coopmathsdark-action-lightest focus:outline-0 focus:ring-0 focus:border-1 bg-coopmaths-canvas dark:bg-coopmathsdark-canvas text-sm text-coopmaths-corpus-light dark:text-coopmathsdark-corpus-light"
          name="numberOfVersions"
          maxlength="2"
          min="1"
          max="20"
          bind:value="{latexFileInfos.nbVersions}"
        />
      </SimpleCard>
    </div>

    <div bind:this="{divText}">
      <h1
        class="mt-12 mb-4 text-center md:text-left text-coopmaths-struct dark:text-coopmathsdark-struct text-2xl md:text-4xl font-bold"
      >
        Exportation
      </h1>
      <div class="pl-4">
        <div
          class="text-coopmaths-struct-light dark:text-coopmathsdark-struct-light md:text-2xl font-bold pb-2"
        >
          Que faire du code $\LaTeX$ ?
        </div>
        <div
          class="grid grid-cols-1 grid-rows-1 md:grid-cols-2 xl:grid-cols-2 gap-8"
        >
          <SimpleCard title="{'Obtenir un PDF'}">
            <div>
              Je souhaite obtenir un fichier PDF à partir du code $\LaTeX$. Je
              vais être redirigé(e) vers le site OverLeaf (qui nécessite d'avoir
              un compte) pour compiler le code en ligne.
            </div>
            <div slot="button1">
              {#await promise}
                <p>Chargement en cours...</p>
              {:then}
                <ButtonOverleaf
                  class="flex w-full flex-col justify-center"
                  {latexFile}
                  {exercices}
                  disabled="{false}"
                />
              {/await}
            </div>
          </SimpleCard>
          <SimpleCard
            title="{'Compiler le code pour avoir un fichier PDF (version encore beta)'}"
          >
            <div>
              Je souhaite obtenir un fichier PDF à partir du code $\LaTeX$.
              J'essaie le nouveau compilateur en ligne (serveur TexLive.net) qui
              ne nécessite pas d'avoir un compte.
            </div>
            <div slot="button1">
              {#await promise}
                <p>Chargement en cours...</p>
              {:then}
                <ButtonCompileLatexToPDF
                  class="flex w-full flex-col justify-center"
                  {latex}
                  {latexFileInfos}
                  id="0"
                />
              {/await}
            </div>
          </SimpleCard>
          <SimpleCard
            title="{'Compiler le code pour avoir un fichier PDF (version encore gamma)'}"
          >
            <div>
              Je souhaite obtenir un fichier PDF à partir du code $\LaTeX$.
              J'essaie le nouveau compilateur en ligne qui
              ne nécessite pas d'avoir un compte.
            </div>
            <div slot="button1">
              {#await promise}
                <p>Chargement en cours...</p>
              {:then}
                <ButtonCompileLatexToPdfLink
                  class="flex w-full flex-col justify-center"
                  {latex}
                  {latexFileInfos}
                  id="3"
                />
              {/await}
            </div>
          </SimpleCard>
          <SimpleCard title="{'Copier le code'}" icon="{'bx-copy-alt'}">
            <div>
              Je souhaite copier le code $\LaTeX$ pour le coller dans un autre
              logiciel.
            </div>
            <div slot="button1">
              {#await promise}
                <p>Chargement en cours...</p>
              {:then}
                <ButtonActionInfo
                  action="copy"
                  textToCopy="{latexFile.latexWithoutPreamble}"
                  text="Code seul"
                  successMessage="{messageForCopyPasteModal}"
                  errorMessage="Impossible de copier le code LaTeX dans le presse-papier"
                  class="px-2 py-1 rounded-md"
                />
              {/await}
            </div>
            <div slot="button2">
              {#await promise}
                <p></p>
              {:then}
                <ButtonActionInfo
                  action="copy"
                  textToCopy="{latexFile.latexWithPreamble}"
                  text="Code + préambule"
                  successMessage="{messageForCopyPasteModal}"
                  errorMessage="Impossible de copier le code LaTeX dans le presse-papier"
                  class="px-2 py-1 rounded-md"
                />
              {/await}
            </div>
          </SimpleCard>
          <SimpleCard title="{'Télécharger le code'}" icon="{'bx-download'}">
            <div>Je souhaite télécharger le matériel sur mon ordinateur.</div>
            <div slot="button1">
              <ButtonTextAction
                class="px-2 py-1 rounded-md"
                id="downloadFullArchive"
                on:click="{async () => {
                  await promise
                  downloadTexWithImagesZip('coopmaths', latexFile, exercices)
                }}"
                text="Archive complète"
              />
            </div>
            <div slot="button2">
              {#await promise}
                <p></p>
              {:then}
                <ButtonTextAction
                  class="inline-block px-2 py-1 rounded-md"
                  id="downloadPicsButton"
                  on:click="{handleDownloadPicsModalDisplay}"
                  text="Uniquement les figures"
                  disabled="{!picsWanted}"
                />
              {/await}
            </div>
          </SimpleCard>
           <SimpleCard title="{'Basculer vers la vue PDF'}" icon="{'bx-download'}">
            <div>Je souhaite basculer vers la vue PDF.</div>
            <div slot="button1">
              <ButtonTextAction
                class="px-2 py-1 rounded-md"
                id="vuePDF"
                on:click="{() => {
                  mathaleaGoToView('pdf')
                }}"
                text="Basculer sur la vue PDF"
              />
            </div>
            </SimpleCard>
        </div>
        <BasicClassicModal
          bind:isDisplayed="{isDownloadPicsModalDisplayed}"
          icon="bx-code"
        >
          <span slot="header"></span>
          <div slot="content" class="flex flex-col justify-start items-start">
            Voici ce dont vous aurez besoin :
            {#each exosContentList as exo, i (exo)}
              <ul
                class="flex flex-col justify-start items-start list-disc pl-6"
              >
                <!-- <li class={picsNames[i].length > 0 ? "container" : "hidden"}>Exercice {i + 1} (<span class="text-italic">{exo.groups.title}</span>) :</li> -->
                {#if picsNames[i].length !== 0}
                  <li>
                    Exercice {i + 1} (<span class="text-italic"
                      >{exo.title}</span
                    >) :
                  </li>
                  <ul
                    class="flex flex-col justify-start items-start list-none pl-4"
                  >
                    {#each picsNames[i] as img}
                      <li class="font-mono text-sm">{img.name}</li>
                    {/each}
                  </ul>
                {/if}
              </ul>
            {/each}
          </div>
          <div slot="footer">
            <ButtonTextAction
              text="Télécharger les figures"
              on:click="{handleActionFromDownloadPicsModal}"
            />
          </div>
        </BasicClassicModal>
      </div>
    </div>

    <dialog
      bind:this="{dialogLua}"
      class="rounded-xl bg-coopmaths-canvas text-coopmaths-corpus dark:bg-coopmathsdark-canvas-dark dark:text-coopmathsdark-corpus-light font-light shadow-lg p-6"
    >
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html messageForCopyPasteModal}
      {#if latexFileInfos.style === 'ProfMaquette'}
        <p class="mt-4">
          Il faut mettre à jour votre distribution LaTeX pour avoir la dernière
          version du package <em
            class="text-coopmaths-warn-darkest dark:text-coopmathsdark-warn-darkest font-bold"
            >ProfMaquette</em
          >.
        </p>
      {:else}
        <p class="mt-4">
          Il faudra utiliser <em
            class="text-coopmaths-warn-darkest dark:text-coopmathsdark-warn-darkest font-bold"
            >LuaLaTeX</em
          > pour compiler le document.
        </p>
      {/if}
    </dialog>

    <h1
      class="mt-12 md:mt-8 text-center md:text-left text-coopmaths-struct dark:text-coopmathsdark-struct text-2xl md:text-4xl font-bold"
    >
      Code
    </h1>
    <pre
      class="my-10 shadow-md bg-coopmaths-canvas-dark dark:bg-coopmathsdark-canvas-dark text-coopmaths-corpus dark:text-coopmathsdark-corpus p-4 w-full overflow-y-auto overflow-x-scroll text-xs">
      {#await promise}
        <p>Chargement en cours...</p>
      {:then}
        {latexFile.latexWithoutPreamble}
      {/await}
    </pre>
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
