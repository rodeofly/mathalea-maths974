<script>
  import katex from 'katex'
  import { ChangeTypes } from 'mathsteps'
  import { afterUpdate } from 'svelte'
  import HeaderExerciceVueProf from '../components/shared/exercice/shared/headerExerciceVueProf/HeaderExerciceVueProf.svelte'
  import Exercice from '../exercices/Exercice'
  import { loadMathLive } from '../modules/loaders'
  import { resoudre } from '../modules/outilsMathjs'

  export let indiceExercice
  export let indiceLastExercice

  export const titre = "Test du solveur d'équations"
  // Cette ressource n'a pas d'uuid ou de ref
  // Son accès est défini dans uuidsRessources.json

  const headerExerciceProps = {
    title: '',
    isInteractif: false,
    settingsReady: false,
    interactifReady: false,
    randomReady: false,
    correctionReady: false,
  }

  const exercice = new Exercice()
  exercice.id = 'EquationSolve'
  exercice.numeroExercice = indiceExercice
  exercice.interactif = true

  // Objet d’options bindé aux champs
  let options = {
    comment: false,
    color: '#ff0000',
    comments: {},
    reduceSteps: false,
    formatSolution: 'decimal',
    substeps: false,
    changeType: [],
    produitsencroix: false,
    verifications: false,
    variables: {},
  }

  // Quelques exemples prédéfinis
  const exemples = [
    { label: 'Choisis un exemple...', value: '' },
    { label: '2x + 5 = 15', value: '2x+5=15' },
    { label: '3x - 7 = 11', value: '3x-7=11' },
    { label: 'x/2 + 4 = 10', value: 'x/2+4=10' },
    { label: '5(x - 1) = 20', value: '5(x-1)=20' },
    { label: '5x - 8 = 10x + 7', value: '5x - 8 = 10x + 7' },
    { label: '5x - 8 >= 8x + 7', value: '5x - 8 >= 8x + 7' },
    { label: '5x - 8 = 10x + 4', value: '5x - 8 = 10x + 4' },
    { label: '5x - 8 >= 10x + 4', value: '5x - 8 >= 10x + 4' },
    { label: '5(x - 8) >= 10x + 7', value: '5(x - 8) >= 10x + 7' },
    { label: '5(x - 8) >= 8x + 7', value: '5(x - 8) >= 8x + 7' },
    { label: '5/x = 7/3', value: '5/x = 7/3' },
    { label: '5/x + 4 = 7/3', value: '5/x + 4 = 7/3' },
  ]

  let types = Object.values(ChangeTypes).sort((a, b) => a.localeCompare(b))

  function selectTypes(event) {
    const selected = Array.from(event.target.selectedOptions).map(
      (opt) => opt.value,
    )
    options.changeType = selected // ⬅️ ça remplace la variable
  }

  let saisie = ''
  let resultat1 = ''
  let resultat2 = ''

  function choisirExemple(event) {
    const value = event.target.value
    if (value) {
      saisie = value // ⬅️ ça remplace la variable
    }
  }

  function valider() {
    const resu = resoudre(saisie, options)
    resultat1 = katex.renderToString(resu.equation)
    resultat2 = katex.renderToString(
      `\\begin{aligned}\n${resu.printSteps.join('\\\\\n')}\n\\end{aligned}`,
    )
    // resultat2 = katex.renderToString(resu.texteCorr);
  }

  afterUpdate(() => {
    loadMathLive()
  })
</script>

<HeaderExerciceVueProf
  {indiceExercice}
  {indiceLastExercice}
  id="EquationSolve"
  {...headerExerciceProps}
/>

<br />
<form
  on:submit|preventDefault="{valider}"
  style="display:flex; gap:0.5rem; align-items:center;"
>
  <input
    type="text"
    bind:value="{saisie}"
    placeholder="Tape quelque chose…"
    aria-label="Champ de saisie"
  />
  <button type="submit" disabled="{!saisie.trim()}"> Valider </button>
</form>
<!-- Liste déroulante d’exemples -->
<label>
  Exemple :
  <select on:change="{choisirExemple}">
    {#each exemples as ex}
      <option value="{ex.value}">{ex.label}</option>
    {/each}
  </select>
</label>
<!-- Options -->
<h3>Options de résolution</h3>
<div
  style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; max-width:600px;"
>
  <label>
    <input type="checkbox" bind:checked="{options.comment}" />
    comment
  </label>

  <label>
    Couleur : <input type="color" bind:value="{options.color}" />
  </label>

  <label>
    <input type="checkbox" bind:checked="{options.reduceSteps}" />
    reduceSteps
  </label>

  <label>
    formatSolution :
    <select bind:value="{options.formatSolution}">
      <option value="decimal">decimal</option>
      <option value="fraction">fraction</option>
      <option value="2">2 (base n°)</option>
      <option value="5">5 (base n°)</option>
    </select>
  </label>

  <label>
    <input type="checkbox" bind:checked="{options.substeps}" />
    substeps
  </label>

  <label>
    changeType (séparés par ,) :
    <input
      type="text"
      on:input="{(e) =>
        (options.changeType = e.currentTarget.value
          .split(',')
          .map((x) => x.trim())
          .filter(Boolean))}"
    />
  </label>

  <label>
    changeType (sélection multiple) :
    <select multiple size="4" on:change="{selectTypes}">
      {#each types as type}
        <option value="{type}">{type}</option>
      {/each}
    </select>
  </label>
  <label>
    <input type="checkbox" bind:checked="{options.produitsencroix}" />
    produitsencroix
  </label>

  <label>
    <input type="checkbox" bind:checked="{options.verifications}" />
    verifications
  </label>
</div>

<!-- Affichage du résultat -->
<section style="margin-top:1rem;">
  <h3 style="margin:0 0 .25rem 0;">Equation :</h3>
  <div style="padding:.5rem; border:1px solid #ddd; border-radius:.5rem;">
    {@html resultat1}
  </div>

  <!-- Si tu veux interpréter la saisie comme du HTML, utilise {@html} -->
  <!-- ⚠️ Attention : n'utilise pas {@html} avec du contenu non fiable (XSS). -->
  <h3 style="margin:.75rem 0 .25rem 0;">Résolution :</h3>
  <div style="padding:.5rem; border:1px solid #ddd; border-radius:.5rem;">
    {@html resultat2}
  </div>
</section>
