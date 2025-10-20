<script lang="ts">
  import { onMount } from 'svelte'
  import { tweened } from 'svelte/motion'
  import type Latex from '../../../lib/Latex'
  import {
      buildImagesUrlsList,
      doesLatexNeedsPics,
      getExosContentList,
      getPicsNames,
      type LatexFileInfos,
  } from '../../../lib/Latex'
  import PdFviewer from '../../shared/forms/PDFviewer.svelte'

  export let latex: Latex
  export let latexFileInfos: LatexFileInfos


  let pdfBlob: Blob | null = null
  let downloadFilename: string | null = null
  let clockAbled = false

  const original = 60 // secondes
  const timer = tweened(original)

  // fabrique un nom de fichier
  function generateFilename(prefix = "document", ext = "pdf") {
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, "0")
    const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
    const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
    return `${prefix}_${date}_${time}.${ext}`
  }

  function downloadAndExtractPDF(blob: Blob, filename: string) {
    pdfBlob = blob
    downloadFilename = filename
  }

  // 🟢 fonction de compilation
  export async function compileToPDF() {
    const contents = await latex.getContents(latexFileInfos)
    if (contents.content === '') {
      pdfBlob = null
      downloadFilename = null
      return
    }
    const { latexWithPreamble } = await latex.getFile(latexFileInfos)
    const picsWanted = doesLatexNeedsPics(contents)
    const exosContentList = getExosContentList(latex.exercices)
    const picsNames = getPicsNames(exosContentList)
    const imagesUrls: string[] = picsWanted
      ? buildImagesUrlsList(exosContentList, picsNames)
      : []

    const formData = new FormData()
    formData.append('name', 'document.tex')
    formData.append('originalname', 'document.tex')
    formData.append('file', new Blob([latexWithPreamble]), 'document.tex')

    for (let im = 0; im < imagesUrls.length; im++) {
      const imaUrl = imagesUrls[im].replace(
        'https://coopmaths.fr',
        window.location.origin,
      )
      const visual = await fetch(imaUrl)
      const blob = await visual.blob()
      formData.append('name', imaUrl.split('/').slice(-1)[0])
      formData.append('originalname', imaUrl.split('/').slice(-1)[0])
      formData.append('file', blob, imaUrl.split('/').slice(-1)[0])
    }

    // timer
    timer.set(original)
    clockAbled = true
    const timeValue = setInterval(() => {
      timer.update(n => {
        if (n > 0) return n - 1
        clearInterval(timeValue)
        return 0
      })
    }, 1000)

    try {
      const res = await fetch('https://latexcompiler.duckdns.org/generate', {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(60 * 1000)
      })
      if (res.status !== 200) throw new Error("Erreur compilation")
      const blob = await res.blob()
      await downloadAndExtractPDF(blob, generateFilename("document", "pdf"))
    } catch (err) {
      console.error("Erreur de compilation:", err)
    } finally {
      clockAbled = false
    }
  }
  
  // auto-lancement
  onMount(() => {
    compileToPDF()
  })
</script>

<div class="flex flex-col h-full">
  {#if clockAbled}
    <div class="loader text-center m-2">
      <progress value={$timer / original}></progress>
      {$timer.toFixed(0)}s
    </div>
  {/if}

  {#if pdfBlob}
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

    <div class="flex-1 overflow-auto m-2">
      <PdFviewer blob={pdfBlob} />
    </div>
  {/if}

  {#if !pdfBlob && !clockAbled}
    <div class="m-2 text-center text-coopmaths-corpus dark:text-coopmathsdark-corpus">
      Aucun PDF généré
    </div>
  {/if}
</div>
