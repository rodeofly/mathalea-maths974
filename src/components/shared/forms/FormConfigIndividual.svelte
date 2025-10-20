<script lang="ts">
  import Latex, { type LatexFileInfos } from '../../../lib/Latex'

  export let latexFileInfos: LatexFileInfos
  export let latex: Latex

</script>

<section class="mb-6 border rounded-lg p-4 bg-gray-50 mx-auto">
<h3 class="text-lg font-semibold mb-3">Configuration individuelle des exercices</h3>
    {#each latex.getExercices() as exo}
      <fieldset style="margin-top:1rem; border-radius:0.5rem; padding:0.5rem; border:1px solid #ccc;">
        <legend class="px-2 text-base font-semibold text-gray-700">Exercice {exo.index + 1}</legend>
        <div class="mt-2 mb-3 space-y-1">
          <div class="text-sm text-gray-600">
            <span class="font-medium text-gray-800">Titre :</span> {exo.titre}
          </div>
          <div class="text-sm text-gray-500 truncate">
            <span class="font-medium text-gray-700">UUID :</span> {exo.uuid}
          </div>
        </div>
        <label class="flex flex-col text-left">
          Numération des questions
          <select class="w-40" value={latexFileInfos.exos?.[exo.index]?.labels} on:change={(e) => {
            // Crée l'objet exo si inexistant
            latexFileInfos.exos = latexFileInfos.exos || {}
            latexFileInfos.exos[exo.index] = latexFileInfos.exos[exo.index] || {}
            // @ts-ignore
            const select = e.target.value
            latexFileInfos.exos[exo.index].labels = select || undefined
          }}>
            <option value="">(aucune)</option>
            <option value="\alph*)">\alph* : a, b, c, ...</option>
            <option value="\Alph*)">\Alph* : A, B, C, ...</option>
            <option value="\roman*)">\roman* : i, ii, iii, ...</option>
            <option value="\Roman*)">\Roman* : I, II, III, ...</option>
            <option value="\arabic*)">\arabic* : 1, 2, 3, ...</option>
          </select>
        </label>
        <label class="flex flex-col text-left">
          Espace entre les questions
          <input
            type="number"
            class="mt-1 border rounded px-2 py-1 w-24"
            min="0"
            max="50"
            on:input={e => {
              latexFileInfos.exos = latexFileInfos.exos || {};
              latexFileInfos.exos[exo.index] = latexFileInfos.exos[exo.index] || {};
              // Récupère la valeur tapée
              // @ts-ignore
              let val = e.target.value
              if (val === ''){
                delete latexFileInfos.exos[exo.index].itemsep
              } else {
                // Force les bornes
                val = Number(val)
                if (val < 0) val = 0
                if (val > 50) val = 50
                if (latexFileInfos.exos[exo.index] !== undefined) {
                  latexFileInfos.exos[exo.index].itemsep = val
                }
              }
            }}
            value={latexFileInfos.exos?.[exo.index]?.itemsep ?? ''}
          />
        </label>
        <label class="flex flex-col text-left">
          Nombre de colonnes pour l'exercice
          <input
            type="number"
            class="mt-1 border rounded px-2 py-1 w-24"
            min="1"
            max="5"
            on:input={e => {
              latexFileInfos.exos = latexFileInfos.exos || {};
              latexFileInfos.exos[exo.index] = latexFileInfos.exos[exo.index] || {};
              // Récupère la valeur tapée
              // @ts-ignore
              let val = e.target.value
              if (val === ''){
                delete latexFileInfos.exos[exo.index].cols
              } else {
                // Force les bornes
                val = Number(val)
                if (val < 1) val = 1
                if (val > 5) val = 5
                if (latexFileInfos.exos[exo.index] !== undefined) {
                  latexFileInfos.exos[exo.index].cols = val
                }
              }
            }}
            value={latexFileInfos.exos?.[exo.index]?.cols ?? ''}
          />
        </label>
        <label class="flex flex-col text-left">
          Nombre de colonnes pour la correction
          <input
            type="number"
            class="mt-1 border rounded px-2 py-1 w-24"
            min="1"
            max="5"
            on:input={e => {
              latexFileInfos.exos = latexFileInfos.exos || {};
              latexFileInfos.exos[exo.index] = latexFileInfos.exos[exo.index] || {};
              // Récupère la valeur tapée
              // @ts-ignore
              let val = e.target.value
              if (val === ''){
                delete latexFileInfos.exos[exo.index].cols_corr
              } else {
                val = Number(val)
                // Force les bornes
                if (val < 1) val = 1
                if (val > 5) val = 5
                if (latexFileInfos.exos[exo.index] !== undefined) {
                  latexFileInfos.exos[exo.index].cols_corr = val
                }
              }
            }}
            value={latexFileInfos.exos?.[exo.index]?.cols_corr ?? ''}
          />
        </label>
        <fieldset>
          <legend class="flex flex-col text-left">Bloc réponse</legend>
          <label class="flex flex-col text-left">
            Nombre de lignes
            <input
              type="number"
              class="mt-1 border rounded px-2 py-1 w-24"
              on:input={e => {
                latexFileInfos.exos = latexFileInfos.exos || {};
                latexFileInfos.exos[exo.index] = latexFileInfos.exos[exo.index] || {};
                latexFileInfos.exos[exo.index].blocrep = latexFileInfos.exos[exo.index].blocrep || { nbligs: 1, nbcols: 1 };  

                // @ts-ignore
                let val = e.target.value
                if (val === ''){
                  delete latexFileInfos.exos[exo.index].blocrep
                } else {
                  // Force les bornes
                  val = Number(val)
                  if (val < 1) val = 1
                  if (val > 20) val = 20
                  if (latexFileInfos.exos[exo.index].blocrep !== undefined) {
                    // @ts-ignore
                    latexFileInfos.exos[exo.index].blocrep.nbligs = val
                  }
                }
              }}
              value={latexFileInfos.exos?.[exo.index]?.blocrep?.nbligs ?? ''}
            />
          </label>
          <label class="flex flex-col text-left">
            Nombre de colonnes
            <input type="number"
            class="mt-1 border rounded px-2 py-1 w-24"
            on:input={e => {
                latexFileInfos.exos = latexFileInfos.exos || {};
                latexFileInfos.exos[exo.index] = latexFileInfos.exos[exo.index] || {};
                latexFileInfos.exos[exo.index].blocrep = latexFileInfos.exos[exo.index].blocrep || { nbligs: 1, nbcols: 1 };
                // @ts-ignore
                let val = e.target.value
                if (val === ''){
                  delete latexFileInfos.exos[exo.index].blocrep
                } else {
                  // Force les bornes
                  val = Number(val)
                  if (val < 1) val = 1
                  if (val > 20) val = 20
                  if (latexFileInfos.exos[exo.index].blocrep !== undefined) {
                    // @ts-ignore
                    latexFileInfos.exos[exo.index].blocrep.nbcols = val
                  }
                }
              }}
              value={latexFileInfos.exos?.[exo.index]?.blocrep?.nbcols ?? ''}
            />
        </fieldset>
      </fieldset>
    {/each}

    <!-- Card JSON -->
    <div class="w-full mt-6 p-4 border rounded-2xl shadow bg-gray-50">
      <h2 class="text-lg font-bold mb-3">Aperçu JSON</h2>
      <pre class="bg-gray-900 text-green-200 p-3 text-left rounded-lg text-sm overflow-x-auto max-h-80">{JSON.stringify(latexFileInfos.exos || {}, null, 2)}
      </pre>
    </div>
</section>