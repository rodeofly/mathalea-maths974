<script lang="ts">
  import * as ace from 'brace'
  import 'brace/ext/searchbox'
  import 'brace/mode/latex'
  import 'brace/theme/monokai'

  import { onDestroy, onMount, tick } from 'svelte'
  import { tweened, type Tweened } from 'svelte/motion'
  import type Latex from '../../../lib/Latex'
  import {
      buildImagesUrlsList,
      doesLatexNeedsPics,
      getExosContentList,
      getPicsNames,
      type LatexFileInfos,
  } from '../../../lib/Latex'
  import ButtonTextAction from './ButtonTextAction.svelte'
  import PdFviewer from './PDFviewer.svelte'

  export let latex: Latex
  export let latexFileInfos: LatexFileInfos
  export let id: string

  let pdfBlob: Blob | null = null;

  let clockAbled: boolean = false

  let downloadFilename: string | null = null;

  let idkey = id || '0'

  const original = 1 * 60 // TYPE NUMBER OF SECONDS HERE
  const timer: Tweened<number> = tweened(original)

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown)
  })
  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
  function handleKeyDown(event: KeyboardEvent) {
    const isSaveShortcut = (event.ctrlKey || event.metaKey) && event.key === 's'
    if (isSaveShortcut) {
      event.preventDefault()
      compileToPDF()
    }
  }

  async function downloadAndExtractPDF(blob: Blob, filename: string) {
    pdfBlob = blob
    // juste stocker blob + filename
    downloadFilename = filename
  }
	
  function generateFilename(prefix = "latex", ext = "pdf") {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    return `${prefix}_${date}_${time}.${ext}`;
  }

  async function compileToPDF() {
    const editor = ace.edit(`editor${idkey}`)
    const t = editor.getValue()

    const formData = new FormData()
    formData.append('name', 'document.tex')
    formData.append('originalname', 'document.tex')
    formData.append('file', new Blob([t]), 'document.tex')

    const contents = await latex.getContents(latexFileInfos)
    const picsWanted = doesLatexNeedsPics(contents)
    const exosContentList = getExosContentList(latex.exercices)
    const picsNames = getPicsNames(exosContentList)
    const imagesUrls: string[] = picsWanted
      ? buildImagesUrlsList(exosContentList, picsNames)
      : []

    for (let im = 0; im < imagesUrls.length; im++) {
      const imaUrl = imagesUrls[im].replace(
        'https://coopmaths.fr',
        window.location.origin,
      )
      const visual = await fetch(imaUrl)
      const blob = await visual.blob()
      // const stringfile = await blob.text()
      formData.append('name', imaUrl.split('/').slice(-1)[0])
      formData.append('originalname', imaUrl.split('/').slice(-1)[0])
      formData.append('file', blob, imaUrl.split('/').slice(-1)[0])
    }

    timer.set(original)
    clockAbled = true
    const timeValue = setInterval(() => {
      if ($timer > 0) {
        $timer--
      } else {
        clearInterval(timeValue)
      }
    }, 1000)

  let resultReq = ''

  await fetch('https://latexcompiler.duckdns.org/generate', {
    method: 'POST',
    body: formData,
    signal: AbortSignal.timeout(60 * 1000)
  }).then((res : Response) => {
    if (res.status === 200) {
      resultReq = 'OK'
    } else {
      resultReq = 'KO'
    }
    return res.blob()
  }).then(blob => {
    clockAbled = false
    return downloadAndExtractPDF(blob, generateFilename("document", "pdf"))
  }).catch((err) => {
    clockAbled = false
    console.error('Error occured' + err)
    resultReq = 'KO'
  })
  }

  /**
   * Affiche ou ferme si déjà ouvert le code Latex dans une boite de dialogue
   */
  async function dialogToDisplayToggle() {
    const dialog = document.getElementById(`editorLatex${idkey}`) as HTMLDialogElement
    if (dialog.open) {
      clockAbled = false
      pdfBlob = null // 🟢 reset PDF quand on ferme
      dialog.close()
    } else {
      const contents = await latex.getContents(latexFileInfos)
      const picsWanted = doesLatexNeedsPics(contents)
      const exosContentList = getExosContentList(latex.exercices)
      const picsNames = getPicsNames(exosContentList)
      const imagesUrls: string[] = picsWanted
        ? buildImagesUrlsList(exosContentList, picsNames)
        : []

      const { latexWithPreamble } = await latex.getFile(latexFileInfos)

      const editor = ace.edit(`editor${idkey}`)
      editor.$blockScrolling = Infinity   // 👈 désactive le warning
      editor.getSession().setMode('ace/mode/latex')
      editor.getSession().setNewLineMode('unix')
      editor.setTheme('ace/theme/monokai')
      // Ouvrir la searchbox avec Ctrl+F
      editor.commands.addCommand({
        name: "showSearchBox",
        bindKey: { win: "Ctrl-F", mac: "Command-F" },
        exec: function(edite: any) {
          edite.execCommand("find");
        }
      })
      editor.setShowPrintMargin(false)
      editor.setValue(latexWithPreamble)
      editor.gotoLine(1)

      const imageLatex = document.getElementById('imagesLatex') as HTMLElement
      imageLatex.innerHTML = "Nombre d'images: " + imagesUrls.length
      dialog.showModal()
      await tick()
      compileToPDF()
    }
  }
</script>

<!--
  @component
  Bouton déclenchant l'exportation vers OverLeaf

  ### Paramètres

  * `latex` : code latex du document
  * `latexFileInfos` : objet contenant les éléments de mise en forme du fichier
  * `disabled` : flag permettant de désactiver le bouton

  ### Exemple
  ```tsx
  <ButtonOverleaf
    {latex}
    latexFileInfos={{ title, reference, subtitle, style, nbVersions }}
    disabled={false}
  />
  ```
 -->

<form
  class="{`${$$props.class || 'flex flex-col md:flex-row mx-4 pb-4 md:pb-8 md:space-x-4 space-y-3 justify-center md:justify-start items-center'}`}"
  target="_blank"
>
  <button
    id="btn_overleaf"
    type="submit"
    on:click|preventDefault="{dialogToDisplayToggle}"
    class="px-2 py-1 rounded-md text-coopmaths-canvas dark:text-coopmathsdark-canvas bg-coopmaths-action hover:bg-coopmaths-action-lightest dark:bg-coopmathsdark-action dark:hover:bg-coopmathsdark-action-lightest"
  >
    Compiler et obtenir le PDF
  </button>
</form>

<dialog
  class="fixed rounded-xl p-6 bg-coopmaths-canvas text-coopmaths-corpus left-[2%] top-[2%] w-[96%] h-[96%] dark:bg-coopmathsdark-canvas-dark dark:text-coopmathsdark-corpus-light shadow-lg"
  id="editorLatex{idkey}"
>
  <div class="mt-3 text-center">
    <div class="text-3xl font-medium text-coopmaths-warn-dark">
      <span class="header">
        <div class="absolute top-2 right-3">
          <button
            type="button"
            on:click="{() => {
              dialogToDisplayToggle()
            }}"
          >
            <i
              class="text-coopmaths-action hover:text-coopmaths-action-lightest dark:text-coopmathsdark-action dark:hover:text-coopmathsdark-action-lightest text-xl bx bx-x"
            ></i>
          </button>
        </div>
      </span>
    </div>
    <div class="font-light">
      <div class="flex h-[80vh] flex-row max-md:portrait:flex-col">
        <div id="editor{idkey}" class="flex flex-grow flex-1"></div>
        <div class="bg-gray-100 flex flex-grow flex-1">
          {#if clockAbled}
            <div class="loader">
              <span
                ><progress value="{$timer / original}"
                ></progress>{$timer.toFixed(0)}s</span
              >
            </div>
          {/if}
          <div class="bg-gray-100 flex flex-grow flex-1 flex-col">
            {#if pdfBlob}
              <!-- Lien téléchargement sous le viewer -->
              {#if downloadFilename}
                <div class="m-2">
                  <a
                    href={URL.createObjectURL(pdfBlob)}
                    download={downloadFilename}
                    class="px-3 py-1 rounded bg-coopmaths-action text-white hover:bg-coopmaths-action-lightest"
                  >
                    Télécharger {downloadFilename}
                  </a>
                </div>
              {/if}

              <!-- PDF viewer -->
              <div class="flex-1 overflow-auto m-2">
                <PdFviewer blob={pdfBlob} />
              </div>
            {/if}
          </div>
        </div>
      </div>
      <div id="imagesLatex"></div>
      <ButtonTextAction
        disabled="{clockAbled}"
        class="px-2 py-1 rounded-md"
        text="Compiler en PDF"
        on:click="{compileToPDF}"
      />
      <form id="form{idkey}"></form>
    </div>
  </div>
</dialog>
