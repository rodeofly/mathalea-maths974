<script lang="ts">
  import type Latex from '../../../lib/Latex'
  import type { LatexFileInfos } from '../../../lib/Latex'
  import ButtonConfig from '../../shared/forms/ButtonConfig.svelte'
  import FormRadio from '../../shared/forms/FormRadio.svelte'

  export let latexFileInfos: LatexFileInfos
  export let latex: Latex
  export let promise: Promise<any> | null = null

   const isExerciceStaticInTheList = latex.isExerciceStaticInTheList()
</script>

<h5
class="mb-2 text-3xl font-black leading-tight text-coopmaths-struct-light dark:text-coopmathsdark-struct-light"
>
Mise en page
</h5>
<h6
class="mb-2 text-lg font-black leading-tight text-coopmaths-struct-light dark:text-coopmathsdark-struct-light"
>
Modèle
</h6>
<FormRadio
title="Style"
bgColor="bg-coopmaths-canvas-dark"
orientation="{'col'}"
bind:valueSelected="{latexFileInfos.style}"
labelsValues="{[
    { label: 'Coopmaths', value: 'Coopmaths' },
    { label: 'Classique', value: 'Classique' },
    { label: 'ProfMaquette', value: 'ProfMaquette' },
    {
    label: 'ProfMaquette avec QrCode',
    value: 'ProfMaquetteQrcode',
    },
    {
    label: 'Course aux nombres',
    value: 'Can',
    isDisabled: isExerciceStaticInTheList,
    },
]}"
/>
{#if latexFileInfos.style === 'Coopmaths' || latexFileInfos.style === 'Classique' || latexFileInfos.style === 'ProfMaquetteQrcode'}
<h6
    class="mb-2 text-lg font-black leading-tight text-coopmaths-struct-light dark:text-coopmathsdark-struct-light"
>
    Police de caractères
</h6>
<FormRadio
    title="fontOption"
    bgColor="bg-coopmaths-canvas-dark"
    orientation="{'col'}"
    bind:valueSelected="{latexFileInfos.fontOption}"
    labelsValues="{[
    { label: 'Standard', value: 'StandardFont' },
    { label: 'Dys', value: 'DysFont' },
    ]}"
/>
{#if latexFileInfos.fontOption === 'StandardFont'}
    <span>
    Taille:
    <input
        type="number"
        id="export-latex-taille-input"
        class="min-w-14 border-1 w-1/5 border-coopmaths-action dark:border-coopmathsdark-action focus:border-coopmaths-action-lightest dark:focus:border-coopmathsdark-action-lightest focus:outline-0 focus:ring-0 focus:border-1 bg-coopmaths-canvas dark:bg-coopmathsdark-canvas text-sm text-coopmaths-corpus-light dark:text-coopmathsdark-corpus-light"
        name="tailleFontOption"
        maxlength="2"
        min="8"
        max="20"
        bind:value="{latexFileInfos.tailleFontOption}"
    />
    </span>
{/if}
{#if latexFileInfos.fontOption === 'DysFont'}
    <span>
    Taille:
    <input
        type="number"
        id="export-latex-dys-taille-input"
        class="min-w-14 border-1 w-1/5 border-coopmaths-action dark:border-coopmathsdark-action focus:border-coopmaths-action-lightest dark:focus:border-coopmathsdark-action-lightest focus:outline-0 focus:ring-0 focus:border-1 bg-coopmaths-canvas dark:bg-coopmathsdark-canvas text-sm text-coopmaths-corpus-light dark:text-coopmathsdark-corpus-light"
        name="dysTailleFontOption"
        maxlength="2"
        min="8"
        max="20"
        bind:value="{latexFileInfos.dysTailleFontOption}"
    />
    </span>
{/if}
{/if}
{#if latexFileInfos.style === 'Can'}
<h6
    class="mb-2 text-lg font-black leading-tight text-coopmaths-struct-light dark:text-coopmathsdark-struct-light"
>
    Options
</h6>
<FormRadio
    title="durationCanOption"
    bgColor="bg-coopmaths-canvas-dark"
    orientation="{'col'}"
    bind:valueSelected="{latexFileInfos.correctionOption}"
    labelsValues="{[
    { label: 'Avec correction', value: 'AvecCorrection' },
    { label: 'Sans correction', value: 'SansCorrection' },
    ]}"
/>
<h6
    class="mb-2 text-lg font-black leading-tight text-coopmaths-struct-light dark:text-coopmathsdark-struct-light"
>
    Police de caractères
</h6>
<FormRadio
    title="fontOption"
    bgColor="bg-coopmaths-canvas-dark"
    orientation="{'col'}"
    bind:valueSelected="{latexFileInfos.fontOption}"
    labelsValues="{[
    { label: 'Standard', value: 'StandardFont' },
    { label: 'Dys', value: 'DysFont' },
    ]}"
/>
{#if latexFileInfos.fontOption === 'StandardFont'}
    <span>
    Taille:
    <input
        type="number"
        id="export-latex-taille-input"
        class="min-w-14 border-1 w-1/5 border-coopmaths-action dark:border-coopmathsdark-action focus:border-coopmaths-action-lightest dark:focus:border-coopmathsdark-action-lightest focus:outline-0 focus:ring-0 focus:border-1 bg-coopmaths-canvas dark:bg-coopmathsdark-canvas text-sm text-coopmaths-corpus-light dark:text-coopmathsdark-corpus-light"
        name="tailleFontOption"
        maxlength="2"
        min="8"
        max="20"
        bind:value="{latexFileInfos.tailleFontOption}"
    />
    </span>
{/if}
{#if latexFileInfos.fontOption === 'DysFont'}
    <span>
    Taille:
    <input
        type="number"
        id="export-latex-dys-taille-input"
        class="min-w-14 border-1 w-1/5 border-coopmaths-action dark:border-coopmathsdark-action focus:border-coopmaths-action-lightest dark:focus:border-coopmathsdark-action-lightest focus:outline-0 focus:ring-0 focus:border-1 bg-coopmaths-canvas dark:bg-coopmathsdark-canvas text-sm text-coopmaths-corpus-light dark:text-coopmathsdark-corpus-light"
        name="dysTailleFontOption"
        maxlength="2"
        min="8"
        max="20"
        bind:value="{latexFileInfos.dysTailleFontOption}"
    />
    </span>
{/if}
<h6
    class="mb-2 text-lg font-black leading-tight text-coopmaths-struct-light dark:text-coopmathsdark-struct-light"
>
    Durée
</h6>
<input
    type="text"
    id="export-latex-duree-input"
    class="border-1 w-full disabled:opacity-20 border-coopmaths-action dark:border-coopmathsdark-action focus:border-coopmaths-action-lightest dark:focus:border-coopmathsdark-action-lightest focus:outline-0 focus:ring-0 focus:border-1 bg-coopmaths-canvas dark:bg-coopmathsdark-canvas text-sm text-coopmaths-corpus-light dark:text-coopmathsdark-corpus-light placeholder:opacity-40"
    placeholder="9 min"
    bind:value="{latexFileInfos.durationCanOption}"
/>
{/if}
{#if latexFileInfos.style === 'ProfMaquette'}
<h6
    class="mb-2 text-lg font-black leading-tight text-coopmaths-struct-light dark:text-coopmathsdark-struct-light"
>
    Options
</h6>
<FormRadio
    title="correctionOption"
    bgColor="bg-coopmaths-canvas-dark"
    orientation="{'col'}"
    bind:valueSelected="{latexFileInfos.correctionOption}"
    labelsValues="{[
    { label: 'Avec correction', value: 'AvecCorrection' },
    { label: 'Sans correction', value: 'SansCorrection' },
    ]}"
/>
<h6
    class="mb-2 text-lg font-black leading-tight text-coopmaths-struct-light dark:text-coopmathsdark-struct-light"
>
    Format
</h6>
<FormRadio
    title="typeFiche"
    bgColor="bg-coopmaths-canvas-dark"
    orientation="{'col'}"
    bind:valueSelected="{latexFileInfos.typeFiche}"
    labelsValues="{[
    { label: 'Fiche', value: 'Fiche' },
    { label: 'Évaluation', value: 'Eval' },
    ]}"
/>
<h6
    class="mb-2 text-lg font-black leading-tight text-coopmaths-struct-light dark:text-coopmathsdark-struct-light"
>
    Configuration
</h6>
{#await promise}
    <p>Chargement en cours...</p>
{:then}
    <ButtonConfig
        class=""
        {latex}
        {latexFileInfos}
        callback={() => {
        latexFileInfos = { ...latexFileInfos } // force la réactivité
        }}
    />    
{/await}
<h6
    class="mb-2 text-lg font-black leading-tight text-coopmaths-struct-light dark:text-coopmathsdark-struct-light"
>
    Exercices
</h6>
<FormRadio
    title="titlenOption"
    bgColor="bg-coopmaths-canvas-dark"
    orientation="{'col'}"
    bind:valueSelected="{latexFileInfos.titleOption}"
    labelsValues="{[
    { label: 'Avec titre', value: 'AvecTitre' },
    { label: 'Sans titre', value: 'SansTitre' },
    ]}"
/>
<h6
    class="mb-2 text-lg font-black leading-tight text-coopmaths-struct-light dark:text-coopmathsdark-struct-light"
>
    Police de caractères
</h6>
<FormRadio
    title="fontOption"
    bgColor="bg-coopmaths-canvas-dark"
    orientation="{'col'}"
    bind:valueSelected="{latexFileInfos.fontOption}"
    labelsValues="{[
    { label: 'Standard', value: 'StandardFont' },
    { label: 'Dys', value: 'DysFont' },
    ]}"
/>
{#if latexFileInfos.fontOption === 'StandardFont'}
    <span>
    Taille:
    <input
        type="number"
        id="export-latex-taille-input"
        class="min-w-14 border-1 w-1/5 border-coopmaths-action dark:border-coopmathsdark-action focus:border-coopmaths-action-lightest dark:focus:border-coopmathsdark-action-lightest focus:outline-0 focus:ring-0 focus:border-1 bg-coopmaths-canvas dark:bg-coopmathsdark-canvas text-sm text-coopmaths-corpus-light dark:text-coopmathsdark-corpus-light"
        name="tailleFontOption"
        maxlength="2"
        min="8"
        max="20"
        bind:value="{latexFileInfos.tailleFontOption}"
    />
    </span>
{/if}
{#if latexFileInfos.fontOption === 'DysFont'}
    <span>
    Taille:
    <input
        type="number"
        id="export-latex-dys-taille-input"
        class="min-w-14 border-1 w-1/5 border-coopmaths-action dark:border-coopmathsdark-action focus:border-coopmaths-action-lightest dark:focus:border-coopmathsdark-action-lightest focus:outline-0 focus:ring-0 focus:border-1 bg-coopmaths-canvas dark:bg-coopmathsdark-canvas text-sm text-coopmaths-corpus-light dark:text-coopmathsdark-corpus-light"
        name="dysTailleFontOption"
        maxlength="2"
        min="8"
        max="20"
        bind:value="{latexFileInfos.dysTailleFontOption}"
    />
    </span>
{/if}
<h6
    class="mb-2 text-lg font-black leading-tight text-coopmaths-struct-light dark:text-coopmathsdark-struct-light"
>
    Qrcode
</h6>
<FormRadio
    title="qrcodeOption"
    bgColor="bg-coopmaths-canvas-dark"
    orientation="{'col'}"
    bind:valueSelected="{latexFileInfos.qrcodeOption}"
    labelsValues="{[
    { label: 'Avec', value: 'AvecQrcode' },
    { label: 'Sans', value: 'SansQrcode' },
    ]}"
/>
{/if}

