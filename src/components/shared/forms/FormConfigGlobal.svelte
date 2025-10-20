<script lang="ts">
  import Latex, { type LatexFileInfos } from '../../../lib/Latex'

  export let latexFileInfos: LatexFileInfos
  export let latex: Latex

  let selectedExos: number[] =  Array.from({ length: latex.exercices.length }, (_, i) => i); // exos sélectionnés pour appliquer config globale
  let globalConfig = {
    labels: '',
    itemsep: { enabled: false, value: 1 },
    cols: { enabled: false, value: 1 },
    cols_corr: { enabled: false, value: 1 },
    blocrep: { enabled: false, nbligs: 5, nbcols: 1 }
  }

   function applyGlobalConfig() {
    latexFileInfos.exos = latexFileInfos.exos || {}
    for (const idx of selectedExos) {
      const exoConfig: any = {
      }

      if (globalConfig.labels !== ''  && globalConfig.labels !== undefined) {
        exoConfig.labels = globalConfig.labels
      }

      if (globalConfig.itemsep.enabled) {
        exoConfig.itemsep = globalConfig.itemsep.value
      }

      if (globalConfig.cols?.enabled) {
        exoConfig.cols = globalConfig.cols.value
      }

      if (globalConfig.cols_corr?.enabled) {
        exoConfig.cols_corr = globalConfig.cols_corr.value
      }

      if (globalConfig.blocrep?.enabled) {
        exoConfig.blocrep = {
          nbligs: globalConfig.blocrep.nbligs,
          nbcols: globalConfig.blocrep.nbcols
        }
      }
      latexFileInfos.exos[idx] = {
        ...latexFileInfos.exos[idx],
        ...exoConfig
      }
    }
  }

  function cancelAllChanges() {
    // Réinitialise toutes les configurations des exercices
    latexFileInfos.exos = {};
    selectedExos = [];
    globalConfig = {
      labels: '',
      itemsep: { enabled: false, value: 1 },
      cols: { enabled: false, value: 1 },
      cols_corr: { enabled: false, value: 1 },
      blocrep: { enabled: false, nbligs: 5, nbcols: 1 }
    };
  }
</script>

<section class="mb-6 border rounded-lg p-4 bg-gray-50 mx-auto">
  <h3 class="text-lg font-semibold mb-3 text-center">
    Configuration globale des exercices
  </h3>
  <div class="flex flex-col gap-3 items-start">
    <!-- Labels -->
    <div class="flex flex-col w-full text-left">
      Numérotation des questions
      <select bind:value={globalConfig.labels} class="mt-1 border rounded px-2 py-1 w-40">
        <option value="">(aucune)</option>
        <option value="\alph*)">a, b, c, ...</option>
        <option value="\Alph*)">A, B, C, ...</option>
        <option value="\roman*)">i, ii, iii, ...</option>
        <option value="\Roman*)">I, II, III, ...</option>
        <option value="\arabic*)">1, 2, 3, ...</option>
      </select>
    </div>

    <!-- Itemsep -->
    <div class="flex flex-col w-full text-left">
      Espace entre les questions
      <div class="flex flex-row items-center gap-2">
        <input type="checkbox" bind:checked={globalConfig.itemsep.enabled} class="h-4 w-4" />
        <input
          type="number"
          class="mt-1 border rounded px-2 py-1 w-24"
          min="1"
          max="50"
          class:opacity-50={!globalConfig.itemsep.enabled}
          class:cursor-not-allowed={!globalConfig.itemsep.enabled}
          class:pointer-events-none={!globalConfig.itemsep.enabled}
          bind:value={globalConfig.itemsep.value}
        />
      </div>
    </div>

    <!-- Colonnes -->
    <div class="flex flex-col w-full text-left">
      Nombre de colonnes pour l'exercice
      <div class="flex flex-row items-center gap-2">
        <input type="checkbox" bind:checked={globalConfig.cols.enabled} class="h-4 w-4" />
        <input
          type="number"
          min="1"
          max="5"
          class="mt-1 border rounded px-2 py-1 w-24"
          class:opacity-50={!globalConfig.cols.enabled}
          class:cursor-not-allowed={!globalConfig.cols.enabled}
          class:pointer-events-none={!globalConfig.cols.enabled}
          bind:value={globalConfig.cols.value}
        />
      </div>
    </div>

    <div class="flex flex-col w-full text-left">
      Nombre de colonnes pour la correction
      <div class="flex flex-row items-center gap-2">
        <input type="checkbox" bind:checked={globalConfig.cols_corr.enabled} class="h-4 w-4" />
        <input
          type="number"
          min="1"
          max="5"
          class="mt-1 border rounded px-2 py-1 w-24"
          class:opacity-50={!globalConfig.cols_corr.enabled}
          class:cursor-not-allowed={!globalConfig.cols_corr.enabled}
          class:pointer-events-none={!globalConfig.cols_corr.enabled}
          bind:value={globalConfig.cols_corr.value}
        />
      </div>
    </div>

    <!-- Bloc réponse -->
    <fieldset class="flex flex-col gap-4 w-full">
      <legend class="text-left font-medium">Bloc réponse</legend>
      <label class="flex flex-row items-center gap-2">
        <input type="checkbox" bind:checked={globalConfig.blocrep.enabled} class="h-4 w-4" />
        <span>Activer le bloc réponse</span>
      </label>

      <div
        class:opacity-50={!globalConfig.blocrep.enabled}
        class:cursor-not-allowed={!globalConfig.blocrep.enabled}
        class:pointer-events-none={!globalConfig.blocrep.enabled}
      >
        <label class="flex flex-row items-center gap-2 w-full">
          <span class="w-32 text-left">Nombre de lignes</span>
          <input type="number" min="1" bind:value={globalConfig.blocrep.nbligs} class="border rounded px-2 py-1 w-20" />
        </label>

        <label class="flex flex-row items-center gap-2 w-full mt-2">
          <span class="w-32 text-left">Nombre de colonnes</span>
          <input type="number" min="1" bind:value={globalConfig.blocrep.nbcols} class="border rounded px-2 py-1 w-20" />
        </label>
      </div>
    </fieldset>

    <!-- Exercices ciblés -->
    <label class="flex flex-col w-full">
      Appliquer aux exercices :
      <select multiple bind:value={selectedExos} class="mt-1 border rounded px-2 py-1 h-24 w-full">
        {#each latex.getExercices() as exo}
          <option value={exo.index}>{exo.index + 1} - {exo.titre}</option>
        {/each}
      </select>
    </label>
  </div>

  <!-- Boutons d’action -->
  <div class="pt-4 flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-start">
    <button type="button" on:click={applyGlobalConfig} class="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-500">
      Appliquer
    </button>

    <button type="button" class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600" on:click={cancelAllChanges}>
      Annuler les changements
    </button>
  </div>
</section>
